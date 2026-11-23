// 복귀일 학습량 시뮬레이션 — 출시 코드 재현 (2026-11-23)
// 실행: 앱 레포(AshitaKanji-app) main의 src/ 옆에 sim/ 폴더로 두고, '~' → src 별칭 vitest 설정으로 실행.
//       결과는 같은 폴더 result.json (여기서는 returnDay.result.json으로 보관).
// 문서: ./README.md
// 출시 코드(origin/main) 그대로: planDailyStudy · isReturnBoostDay · FsrsScheduler(schedulerParams)
import { test } from 'vitest';
import { writeFileSync } from 'node:fs';
import { fsrs } from 'ts-fsrs';
import { planDailyStudy } from '~/features/study/dailyStudyPolicy';
import { isReturnBoostDay } from '~/features/study/learnerProfile';
import { FsrsScheduler, schedulerParams } from '~/srs/FsrsScheduler';
import { toFsrsCard } from '~/srs/fsrsMap';
import type { UserCard } from '~/types/Card';

const DAY = 86_400_000;
const START = new Date(2026, 0, 1, 9, 0, 0).getTime(); // 매일 오전 9시 학습
const LIMIT = 12, DAYS = 60, BREAK_FROM = 15;

function rng(seed: number) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 2 ** 32; }; }

// 이전 정책(v1.0.6 이전): 상한 없음, 복습 전부 + 신규 min(설정, 설정×3 − 복습)
function planOld(limit: number, due: number) {
  return { reviewCount: due, newCount: Math.min(limit, Math.max(0, limit * 3 - due)), deferredReviewCount: 0 };
}

function run(policy: 'old' | 'new', breakDays: number, seed: number) {
  const r = rng(seed);
  const sched = new FsrsScheduler(schedulerParams(0.9));
  const curve = fsrs(schedulerParams(0.9));
  let cards: UserCard[] = []; let nextId = 0; const studyTimes: number[] = [];
  const days: { day: number; total: number; review: number; fresh: number; deferred: number; boost: boolean }[] = [];
  for (let d = 0; d < DAYS; d++) {
    if (breakDays > 0 && d >= BREAK_FROM && d < BREAK_FROM + breakDays) continue;
    const now = START + d * DAY;
    const due = cards.filter((c) => c.due <= endOfDay(now)).sort((a, b) => a.due - b.due);
    const boost = policy === 'new' && isReturnBoostDay(studyTimes, now);
    const plan = policy === 'new' ? planDailyStudy({ dailyNewLimit: LIMIT, dueReviewCount: due.length, returnBoost: boost }) : planOld(LIMIT, due.length);
    const todayReviews = due.slice(0, plan.reviewCount);
    const updated = new Map<string, UserCard>();
    for (const c of todayReviews) {
      const p = curve.get_retrievability(toFsrsCard(c), new Date(now), false) as number;
      const { next } = sched.review(c, r() < p ? 3 : 1, now);
      updated.set(c.word_id, next);
    }
    cards = cards.map((c) => updated.get(c.word_id) ?? c);
    for (let i = 0; i < plan.newCount; i++) {
      const c = sched.initNew(`w${nextId++}`, now);
      const { next } = sched.review(c, r() < 0.15 ? 1 : 3, now);
      cards.push(next);
    }
    studyTimes.push(now);
    days.push({ day: d + 1, total: plan.reviewCount + plan.newCount, review: plan.reviewCount, fresh: plan.newCount, deferred: plan.deferredReviewCount, boost });
  }
  return days;
}
function endOfDay(ms: number) { const d = new Date(ms); return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999).getTime(); }

test('return-day simulation on shipped code', () => {
  const SEEDS = 30; const out: Record<string, unknown> = {};
  for (const brk of [0, 3, 7]) for (const policy of ['old', 'new'] as const) {
    const runs = Array.from({ length: SEEDS }, (_, i) => run(policy, brk, 1000 + i));
    const key = `${policy}-break${brk}`;
    if (brk === 0) {
      const max = runs.map((x) => Math.max(...x.map((y) => y.total)));
      const avg = runs.map((x) => x.reduce((s, y) => s + y.total, 0) / x.length);
      out[key] = { maxMedian: med(max), maxWorst: Math.max(...max), avg: +med(avg).toFixed(1) };
    } else {
      const ret = runs.map((x) => x.find((y) => y.day === BREAK_FROM + brk + 1)!);
      const after = runs.map((x) => {
        const i = x.findIndex((y) => y.day === BREAK_FROM + brk + 1);
        const nextDays = x.slice(i, i + 4).map((y) => `${y.review}+${y.fresh}${y.boost ? '*' : ''}`);
        const clear = x.slice(i).findIndex((y) => y.deferred === 0);
        return { nextDays, clearDays: clear };
      });
      out[key] = {
        returnDay: { total: med(ret.map((y) => y.total)), review: med(ret.map((y) => y.review)), fresh: med(ret.map((y) => y.fresh)), deferred: med(ret.map((y) => y.deferred)), totalRange: [Math.min(...ret.map((y) => y.total)), Math.max(...ret.map((y) => y.total))] },
        daysUntilNoDeferredMedian: med(after.map((a) => a.clearDays)),
        sampleFirst4Days_seed1000: after[0]!.nextDays,
      };
    }
  }
  writeFileSync(new URL('./result.json', import.meta.url), JSON.stringify(out, null, 2));
});
function med(a: number[]) { const s = [...a].sort((x, y) => x - y); const m = s.length >> 1; return s.length % 2 ? s[m]! : (s[m - 1]! + s[m]!) / 2; }
