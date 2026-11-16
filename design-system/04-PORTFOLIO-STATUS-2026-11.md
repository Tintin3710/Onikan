# 오니칸 디자인 시스템 — 진행 현황과 포트폴리오 정리 (2026-11-16)

> 근거: [AUDIT-2026-11.md](./AUDIT-2026-11.md) · [00-DECISIONS](./00-DECISIONS-2026-11.md) · [01-NAMING-SEED](./01-NAMING-SEED-2026-11.md) · [02-CODE-CHANGES](./02-CODE-CHANGES-2026-11.md) · [03-COMPONENT-SPECS](./03-COMPONENT-SPECS-2026-11.md) · [`DESIGN.md` beta.1](../DESIGN.md)
> 앱 코드 기준: `taiyoungkim/AshitaKanji-app` `origin/main@f5ae6e4` (2026-11-16 확인 — 디자인 시스템 PR #14 → #15 → #17 → #18 머지 반영, 앱 버전 1.0.7)
> 표기: ✅ 완료·근거 있음 · 🟡 일부 · ⬜ 아직

## 한 줄 요약

출시된 앱에 쓰던 디자인 시스템을 **감사 → 기준값 결정 → 이름 체계 정리(SEED 참고) → Figma·코드 반영 → 컴포넌트 명세**의 순서로 다시 정렬했다. **토큰은 문서·Figma·코드 세 곳에서 같은 값과 이름을 갖게 됐고, 테스트가 Figma와 코드의 차이를 자동으로 잡는다(차이 0).** 컴포넌트 명세는 코드에 반영했고, Figma 컴포넌트 28개는 코드 매핑표로 연결했다(11-16 머지). 화면 코드의 글자 크기·반경 직접 값은 lint로 막는다. 남은 일은 Figma 쪽 정리(임시 글꼴 6곳, 카드 여백 4곳)다.

---

## 1. 단계별 진행

| 단계 | 한 일 | 상태 | 근거 |
|---|---|---|---|
| 0. 감사 (11-09) | 문서 ↔ Figma ↔ 코드를 토큰 18개, 컴포넌트 31개, 화면 인스턴스 303개 기준으로 대조. 불일치의 뿌리를 "시안을 라이브러리가 아닌 직접 그린 프레임으로 만든 것"으로 진단 | ✅ | AUDIT §0·§3-b |
| 0. 기준값 결정 (11-09) | 최신 화면 두 장을 기준으로 결정 16개(D0-1~16). 화면 좌우 여백 16, 페이지 배경 #F5F5F5, 흰 카드 반경 24, 간격 24 추가, 평가 버튼 2개(56) | ✅ | 00-DECISIONS |
| 1. 이름 체계 (11-10) | 당근 SEED와 비교해 가져올 것만 가져옴. 간격 `x1…x10`, 반경 `r2_5…r6`(값÷4) + 용도 별칭(`card`·`receipt`). 색 이름은 바꾸는 비용이 커서 유지 | ✅ | 01-NAMING, `DESIGN.md` beta.1 |
| 2. Figma 반영 (11-10~11) | 변수 이름 변경(ID를 유지해 연결된 레이어 보존). 레이아웃 변수 7개, 색 변수 3개 추가. **컬러 스타일 0 → 39개**(bg/fg/stroke). `button-primary` 잉크, `grade-button` 2버튼, `tab-bar` 아이콘형으로 다시 만듦. 기준 화면 2장의 외부 변수 0개, 텍스트 스타일 연결 완료 | ✅ | 02 §D |
| 2. 코드 반영 — 토큰 (11-12, PR #6) | `softer` #F5F5F5, 여백 16, 간격 `x6 24`, 반경 SEED 단계와 별칭, 다크 `tabActive`·`primaryPressed`, 평가 버튼 56. 시스템 밖 색 `#F4F2EF` 삭제 | ✅ | `src/design/tokens.ts`, 회귀 테스트 `tokens.test.ts` 13개 |
| 3. 컴포넌트 명세 (11-11) | SEED 문서 형식(구조 · 속성 · 상태별 명세 표 · 가이드라인)으로 **8종 확정**: button, grade-button, tab-bar, card, card-tinted, kanji-tile, list-row, toast. 결정 C3-1~7 | ✅ | 03-COMPONENT-SPECS |
| 3. 코드 반영 — 컴포넌트 | 버튼 크기 `large`/`medium`, 오렌지 `brand` 버튼 삭제, 토스트 14/400, 카드 여백 16 하나로 통일(C3-5 개정), 타이포 이름 통일 | ✅ | 02 C-13·17·19~23. **PR #14(타이포 C-13·14·17) · PR #15(C-19~23 + GradeButton·ListRow·TextButton·SessionTopBar·SummaryCard 공용화) 11-16 머지**, 시뮬레이터(iPhone 17, 라이트) 확인 |
| 4. 운영 | 디자인 QA 문서로 시안 → 앱 반영을 건별로 기록(11-13~15: 화면 10여 개). 정책 결정 ID(O-n) 유지 | 🟡 | `handoff/design-qa-2026-11-13.md` |
| — | Figma ↔ 코드 연결 (Code Connect 대체, B 경로) | ✅ | Professional 요금제라 Code Connect 불가(11-16 레포 확인: 매핑 파일 없음). 대신 **PR #17(11-16 머지)**: ① 토큰 스냅샷 `figma-tokens.json` + 자동 대조 테스트(색 25×라이트·다크, 간격·레이아웃·반경, 텍스트 스타일 27 — 양방향, 일부러 값을 바꾸면 실패하는 것 확인) ② 컴포넌트 매핑표 `component-map.json` 28개(24 매핑 · 4 코드 없음 = card-tinted·kanji-tile·reward-chip·ingredient-earned) + export 존재 테스트 ③ 스냅샷 갱신용 읽기 전용 Figma 개발 플러그인 ④ **Figma 라이브러리 컴포넌트 28개 설명에 `— Code —`(import·props 대응·예시) 추가** — 라이브러리 재publish 완료(11-16), 설명 표시 확인. **토큰 차이 0** (`receipt/title`을 Figma도 Pretendard JP SemiBold로 맞춤, 11-16) |
| — | 신규 컴포넌트 Figma화 (2026-11-15) | 🟡 | **9종 생성**: Reward `plate-tile`(Size 40·48 × Filled·Locked) · `progress-segments`(0~4) · `receipt`(Crafted·Ingredient) · `owner-quote-card` / Labels `status-badge`(5종) · `stat-tile` / Feedback `done-notice`(Stats Two·None) / Actions `text-button` / Navigation `session-top-bar`(Stacked·Inline). 추가로 Surfaces `study-card`(State Front·Revealed × Example On·Off) · `summary-card`(709:112354 전환). 색·반경·간격 변수 연결, 설명 작성. **남은 것(11-16 재확인): 임시 글꼴 Noto Sans KR로 남은 글자 레이어 6곳** — 레이어 이름 `역할 → 스타일`대로 텍스트 스타일 연결 (§5 표 7번) |
| — | 화면 직접 값 정리 + lint (11-16, PR #18): 화면 코드의 글자 크기·반경 숫자를 토큰으로 교체(38파일). 반경 `r1`·`r1_5`·`r2` 추가. 새 직접 값은 lint 에러, 꼭 필요한 곳은 이유를 단 예외 | ✅ | `eslint.config.js`, 02 C-24. **11-16 머지**, 시뮬레이터 확인(홈·기록·도감·고양이 카드·가나 표·학습 카드·단어 상세·설정) — 이 과정에서 고양이 카드 사진 넘침도 수정 |
| — | Figma 카드 여백 16 맞추기 (C3-5 개정) | ⬜ | 코드는 16으로 통일됐는데 Figma 카드 4종이 아직 20(또는 왼쪽 18) — §5 표 8번 |
| — | 라이브러리 정리 (2026-11-15) | ✅ | 사용처 조사 후: `도장`(사용 157곳)을 포폴 페이지 → Components — Reward `stamp`로 편입 · 아카이브 전용 컴포넌트 3개(`Caret Down/Up`, 추후 배포 `card`)는 `_` 접두어로 퍼블리시 제외 · 화면 사용처 없는 `stat-block` · `progress-dots`는 `_legacy`(대체 stat-tile · progress-segments) · `badge`는 `_legacy`(Screens 1곳은 텍스트 스타일 연결 후 status-badge Crafted로 교체 예정) · Screens 숨김 조각 21개 → `🗂 정리 대기` 섹션 |

---

## 2. 수치 — 전후 비교

| 지표 | 감사 시점 (11-09) | 지금 (11-16) | 메모 |
|---|---:|---:|---|
| 토큰 대조 일치 | 18개 중 7 ✅ · 6 ❌ | 결정 16개 모두 문서·Figma·코드 반영, **토큰 차이 0** | 테스트(`figmaParity.test.ts`)가 색·간격·반경·텍스트 스타일을 자동 대조 |
| Figma 컬러 스타일 | 0 | **39** | 모두 변수에 연결, 라이트·다크 자동 전환 |
| Figma 텍스트 스타일 | 22 | 22 (`button/md` 굵기 수정) | 기준 화면 2장은 시계 외 전부 연결 |
| 기준 화면의 외부 디자인 시스템 변수 | 화면당 6곳+ | **0** (보이는 레이어) | |
| 시스템 밖 색 (`#F4F2EF`) | 화면 5곳 | **0** | |
| 코드 `fontSize` 직접 값 | 47 | 98 (11-16 main) → 62 (PR #14) → **18** (PR #18, 11-16 머지) | 남은 18 = 이유 단 lint 예외 17(아이콘 글자·학습 글자 견본·고양이 카드 손글씨 글꼴·도장 숫자) + 그림 비례 `13 * k` 1. **lint 규칙으로 새 직접 값은 에러.** 측정: `git grep "fontSize: [0-9]" -- 'src/**/*.tsx'` |
| 코드 `borderRadius` 직접 값 | 15 | 35 (11-16 main) → **9** (PR #18, 11-16 머지) | 남은 9 = 예외 1(종이 조각) + 익힘 시트 그림 비례 `* k` 8. 반경 `r1`·`r1_5`·`r2` 추가 |
| 시안의 라이브러리 인스턴스 비율 | 9% | 재측정 안 함 | 재측정해야 쓸 수 있음 |

> 포트폴리오에서 숫자를 쓸 때는 위 표의 "지금" 열 중 ✅ 항목만 쓴다. 직접 값이 늘어난 것은 숨기지 말고 "다음 단계"로 쓰는 편이 설득력 있다.

---

## 3. 포트폴리오에 쓸 수 있는 문장 / 아직 쓰면 안 되는 문장

| ✅ 지금 근거 있음 | ⬜ 아직 근거 없음 (쓰지 않기) |
|---|---|
| 출시 앱의 디자인 시스템을 문서·Figma·코드 3곳에서 감사하고, 불일치 원인을 **시안 제작 방식까지 추적**했다 | "Figma ↔ 코드 1:1 일치" (토큰은 일치, 컴포넌트 여백·글꼴은 Figma 쪽 남은 일 있음) |
| 최신 화면을 기준으로 결정 16개를 내리고 **문서·Figma·코드에 모두 반영**했다 | "Code Connect로 연결" (11-16 레포 확인 결과 매핑 파일 없음) |
| 당근 SEED와 비교해 **간격·반경 이름 체계만 선택적으로 도입**했다. 색 이름은 바꾸는 비용(문서·Figma·코드·결정 기록 전부)이 커서 유지 | "공용 컴포넌트로 화면 전체를 구성" |
| Figma 변수 이름을 바꾸면서 **ID를 유지해 연결된 레이어를 끊지 않았다** | "라이브러리 사용률 n% 향상" (재측정 전) |
| 컬러 스타일 39개를 변수에 연결해 **라이트·다크가 자동으로 전환**되게 했다 | |
| 주요 버튼을 오렌지에서 잉크로 바꿔 **액션·브랜드·상태 색의 역할을 분리**했다(D-3, AA 기준) | |
| 컴포넌트 8종을 **개발자가 Figma 없이 만들 수 있는 명세 표**(상태 × 슬롯 × 속성 → 토큰)로 정리했다 | |
| 결정마다 ID(D-n · O-n · C3-n)를 붙여 **근거를 추적할 수 있게** 했다 | |
| **디자인 시스템과 코드 연결 완료** — 토큰은 테스트로 자동 대조(차이 0), Figma 컴포넌트 28개를 코드에 매핑 (Code Connect 없이, 11-16 머지) | |
| 화면 코드의 글자 크기 직접 값 **98 → 18**, 반경 **35 → 9** — 남은 것은 모두 이유를 단 예외·그림 비례 값이고, **lint가 새 직접 값을 막는다** | |

**기존 포트폴리오 페이지 수정 필요:** `portfolio/onikan-02-design-system.html`의 "Figma ↔ 코드 **1:1 · Code Connect**" 카드는 지금 근거가 없다. → "토큰 3곳 일치(자동 대조) · 컴포넌트 28개 매핑"으로 바꾼다. Code Connect는 요금제상 쓰지 않으므로 그 단어는 빼고, 대신 쓴 방법(B 경로)을 적는다.

---

## 4. 포트폴리오 구성안 (케이스 스터디 흐름)

1. **문제** — 출시 앱인데 디자인과 화면이 계속 어긋났다. 개발자는 PNG를 보고 눈으로 맞추고 있었다.
2. **진단** — 감사표. 토큰은 대체로 맞는데, 시안이 라이브러리를 거의 쓰지 않았다(인스턴스 9%, 직접 그린 `hero-card` 102개). → 문제는 개발이 아니라 시안 제작 방식.
3. **기준 세우기** — "가장 최근 화면이 기준" 원칙과 결정 16개. 결정표 한 장(Before/After)으로 보여 주기.
4. **이름 체계** — SEED 비교표: 가져온 것(간격·반경 값÷4)과 남긴 것(색 이름)의 이유. "무조건 따르지 않았다"가 포인트.
5. **반영** — Figma(변수 ID 유지, 스타일 39개, 컴포넌트 3종 재구성) + 코드(PR #6 토큰). 전후 수치.
6. **컴포넌트 명세** — 버튼 명세 표 한 장을 예시로.
7. **운영** — 디자인 QA 문서: 시안 하나가 앱에 들어가기까지(근거 노드 → 조건 → 결과 → 미확정 ⚠️ 표시).
8. **연결과 유지** — Code Connect 없이 연결한 방법(토큰 자동 대조 테스트 · 매핑표 · Figma 설명), 직접 값 98 → 18과 lint. **다음 단계:** 라이브러리 사용률 재측정.

---

## 5. 남은 일 (포트폴리오 문장을 늘리려면)

| 순서 | 할 일 | 끝나면 쓸 수 있는 문장 |
|---|---|---|
| 1 | ~~컴포넌트 명세를 코드에 반영 (C-19~23)~~ — ✅ PR #15, 11-16 머지 | "명세 8종을 코드 컴포넌트에 반영" |
| 2 | ~~타이포 토큰 보강·이름 통일 (C-13·17)~~ — ✅ PR #14, 11-16 머지 | "직접 쓴 글자 크기 98 → 62" |
| 3 | ~~신규 컴포넌트 Figma화~~ — ✅ 11종 생성. 글꼴 연결만 7번에 남음 | "자주 쓰는 화면 블록 11종 라이브러리화" |
| 4 | 시안 라이브러리 사용률 재측정 | "9% → n%" |
| 5 | ~~Figma ↔ 코드 연결~~ — ✅ PR #17, 11-16 머지, 토큰 차이 0 | "디자인 시스템과 코드 연결 완료 — 토큰은 테스트로 자동 대조, 컴포넌트 28개 매핑" |
| 6 | ~~화면 직접 값 정리 + lint~~ — ✅ PR #18, 11-16 머지, 시뮬레이터 확인 | "글자 크기 직접 값 98 → 18(남은 것은 모두 이유 단 예외), lint로 새 직접 값 차단" |
| 7 | **Figma 임시 글꼴 6곳 → 텍스트 스타일 연결** (레이어 이름의 `→` 뒤가 연결할 스타일). [study-card](https://www.figma.com/design/UiXc63pKkJr8WpkKqFVGBr/?node-id=713-110): [hint-label (Revealed·Example On)](https://www.figma.com/design/UiXc63pKkJr8WpkKqFVGBr/?node-id=713-62) · [hint-label (Revealed·Example Off)](https://www.figma.com/design/UiXc63pKkJr8WpkKqFVGBr/?node-id=713-86) → `body/base` / [plate-tile](https://www.figma.com/design/UiXc63pKkJr8WpkKqFVGBr/?node-id=707-22): [mark (40·Locked)](https://www.figma.com/design/UiXc63pKkJr8WpkKqFVGBr/?node-id=707-17) · [mark (48·Locked)](https://www.figma.com/design/UiXc63pKkJr8WpkKqFVGBr/?node-id=707-21) → `button/md` / [session-top-bar](https://www.figma.com/design/UiXc63pKkJr8WpkKqFVGBr/?node-id=707-545): [count (Inline)](https://www.figma.com/design/UiXc63pKkJr8WpkKqFVGBr/?node-id=707-544) → `body/base-strong` · [count (Stacked)](https://www.figma.com/design/UiXc63pKkJr8WpkKqFVGBr/?node-id=707-535) → 맞는 스타일 없음(13/18 SemiBold) — 새 스타일을 만들지, 가까운 스타일로 맞출지 정해야 함 | "신규 컴포넌트 글자 전부 텍스트 스타일 연결" |
| 8 | **Figma 카드 여백 16 맞추기** (코드 `Card` = `spacing.x4` 16, C3-5 개정). [card](https://www.figma.com/design/UiXc63pKkJr8WpkKqFVGBr/?node-id=106-2565) 20 → 16 · [card-tinted](https://www.figma.com/design/UiXc63pKkJr8WpkKqFVGBr/?node-id=106-2566) 20 → 16 · [summary-card](https://www.figma.com/design/UiXc63pKkJr8WpkKqFVGBr/?node-id=712-1702) 20 → 16 · [owner-quote-card](https://www.figma.com/design/UiXc63pKkJr8WpkKqFVGBr/?node-id=707-112) 왼쪽 18 → 16. `study-card`(24)는 별도 명세라 제외 | "카드 여백 Figma·코드 일치" |
| 9 | 새 반경 변수 `r1`·`r1_5`·`r2` 라이브러리 재publish | — |
