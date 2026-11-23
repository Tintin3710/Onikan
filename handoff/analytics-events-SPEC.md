# 사용 데이터 수집 스펙 — 이벤트 3개 · 지표 3개 · 가드레일 (2026-11)

> 상태: **Draft** · 근거: 앱 레포 `taiyoungkim/AshitaKanji-app` `origin/main@c55be75`(v1.0.8) — `SessionEngine.start/end`(src/features/study/SessionEngine.ts), `SessionRecord`·`SessionEndReason`(src/types/Session.ts), `isReturnBoostDay`(src/features/study/learnerProfile.ts), 개인정보처리방침(docs/release/PRIVACY_POLICY.md, 2026-10-26) · 배경: 출시 후 개선(v1.0.6) 효과를 보려 했으나 **사용 데이터 수집이 없음**(광고 수익만 확인 중, 2026-11-23 개발자 확인)
> 관련: [`study-first-tap-feedback-SPEC.md`](./study-first-tap-feedback-SPEC.md)(문제 1) · [`study-daily-load-SPEC.md`](./study-daily-load-SPEC.md)(문제 2) · 출시 코드 시뮬레이션 [`../research/sim/README.md`](../research/sim/README.md)
> 토큰 정본 `../DESIGN.md`, 컴포넌트 계약 `../COMPONENTS.md`가 최종. 충돌 시 정본이 이긴다. (이 스펙은 화면 변경이 설정 토글 1줄뿐 — 기존 `list-row` 사용)

**남은 것 (⚠️ 4개):** O-6 수집 도구 · O-7 개인정보처리방침·스토어 표기 · O-8 토글 기본값 · 오늘의 학습 `mode` 값(조건표) — **모두 출시 전에 정해야 함**

## 핵심 변경 요약
1. 앱에 **이벤트 3개**를 심는다: `app_open` · `study_start` · `study_complete`. 처음 요청한 4개 중 "평가 버튼"은 탭마다 보내지 않고 **`study_complete`의 속성(버튼별 횟수)**으로 합친다(O-2).
2. 이 3개로 **지표 3개 + 가드레일 1개**를 모두 계산한다 — 세션 완주율 · 복귀 후 3일 재학습률 · 주간 학습일 수 / '한 번 익혔어요' 비율.
3. **학습 내용(단어·뜻·FSRS 일정)은 보내지 않는다.** 사람을 특정하지 않는 기기별 무작위 ID만 쓴다(O-3·O-4).
4. 지금 개인정보처리방침은 "자체 분석 SDK를 쓰지 않는다 · 학습 데이터를 서버로 보내지 않는다"고 적혀 있다 → **방침·App Store 개인정보 라벨·Play 데이터 보안 섹션을 함께 고쳐야 출시 가능**(O-7 ⚠️).
5. 설정에 **"사용 통계 보내기" 토글**을 둔다(O-5).

## 조건 → 결과
| 조건 | 결과 |
|---|---|
| 앱이 포그라운드로 열림 (콜드 스타트 · 백그라운드에서 복귀) | `app_open` 1건. 같은 로컬 날짜에 여러 번 열어도 매번 보냄 (일별 중복 제거는 분석 쪽에서) |
| 오늘의 학습 세션 시작 (`SessionEngine.start` 성공) | `study_start` 1건 — 계획 수(`planned_new`·`planned_review`), 복귀 보장 여부(`return_boost`) 포함 |
| 1차 학습 큐를 다 비움 (`end('completed')`, 앱의 "오늘 완료" 기준) | `study_complete` 1건 — 실제 수, 평가 버튼별 횟수, 걸린 시간 포함 |
| 1차 도중 나감 · 앱 종료 (`abandoned` · `app_killed`) | **보내지 않음.** `study_start`는 있고 같은 `session_id`의 `study_complete`가 없으면 미완주로 계산 |
| 2차 기억 확인 도중 나감 | 이미 `study_complete`를 보냈으므로 추가 없음 (세션 레코드도 completed 유지 — SessionEngine 규칙과 같음) |
| 약점 복습 · 오늘 복습 · 스캔 세션 | 같은 이벤트를 보내되 `mode`로 구분. 지표는 오늘의 학습만 계산 — ⚠️ 확인 필요: 오늘의 학습이 `mode` 값(`review`·`new`·`scan`·`weakness`) 중 무엇으로 저장되는지 |
| 설정 "사용 통계 보내기" 꺼짐 | 아무 이벤트도 보내지 않음. 쌓인 미전송 이벤트도 버림 |
| 개발 빌드(`__DEV__`) · 내부 테스트 기기 | `is_internal: true`를 붙여 보냄 → 분석에서 제외 |
| 오프라인 | 수집 도구의 로컬 큐에 쌓았다가 연결되면 전송 (도구 기본 동작). 시각은 발생 시각 기준 |
| 수집 도구 초기화 실패 | 이벤트만 버리고 학습·광고는 그대로 진행. 사용자에게 아무것도 표시하지 않음 |

## 동작 명세
| # | 상황 | 동작 |
|---|---|---|
| 1 | 공통 속성 (모든 이벤트) | `install_id`(앱 첫 실행 때 만든 무작위 UUID, 로컬 저장) · `local_date`(기기 현지 `YYYY-MM-DD` — 복귀 판정 `localDayKey`와 같은 기준) · `ts`(ms) · `app_version` · `platform`(ios/android) · `is_internal` |
| 2 | `study_start` 속성 | `session_id`(로컬 session 레코드 id) · `mode` · `planned_new` · `planned_review` · `daily_new_limit`(설정값) · `return_boost`(`isReturnBoostDay` 결과) |
| 3 | `study_complete` 속성 | `session_id` · `mode` · `done_new` · `done_review` · `grade_again`(다시 볼래요 횟수) · `grade_good`(한 번 익혔어요 횟수) · `duration_sec` |
| 4 | 평가 횟수 출처 | SessionEngine이 이미 세는 `againCount` · `goodEasyCount`를 그대로 쓴다. 1차(FSRS 기록) 채점만 — 2차 기억 확인은 세지 않음 |
| 5 | 보내지 않는 것 | 단어 ID·글자·뜻, 카드별 등급, FSRS 일정, 광고 ID(IDFA·광고 ID), 기기 이름, 이메일 |
| 6 | 설정 토글 | 설정 > 일반에 `list-row` + 스위치 "사용 통계 보내기", 보조 문구 "어떤 단어를 공부했는지는 보내지 않아요". 끄면 즉시 중단 |
| 7 | `install_id` 초기화 | 앱 삭제 후 재설치하면 새 ID (같은 사람이 두 명으로 잡힘 — 소규모라 감수). 백업 복원으로는 바뀌지 않음 |

### 지표 계산 (분석 쪽, 오늘의 학습 `mode`만, `is_internal` 제외)
| 지표 | 계산 | 초기 성공 기준 (2026-11, 사용자 약 10명) |
|---|---|---|
| 세션 완주율 | `study_complete` 수 ÷ `study_start` 수 (같은 `session_id` 기준, 세션 단위) | 80% 이상 |
| 복귀 후 3일 재학습률 | `install_id`별 `study_start`가 있는 `local_date`를 학습일로 본다. 학습일 사이에 학습 없는 날이 3일 이상이면 다음 학습일 = 복귀일. 복귀일 다음 3일 안에 학습일이 또 있으면 재학습. 기간 끝 3일 안의 복귀는 제외 | 복귀 사례의 과반 |
| 주간 학습일 수 | 주(월~일)마다, 그 주에 학습일이 1일 이상인 사람 중 3일 이상인 사람 비율 | 과반 |
| 가드레일: '한 번 익혔어요' 비율 | Σ`grade_good` ÷ Σ(`grade_again` + `grade_good`) | 90%를 넘지 않음 (넘으면 의미 모르고 누르는지 재확인) |
| 참고: 열고 학습 안 함 | `app_open`은 있는데 그날 `study_start`가 없는 사람·날 | 기준 없음 (홈에서 이탈하는지 보는 용도) |

> 사용자가 적어 비율보다 **"n명 중 m명"**으로 본다. 사용자 50명 · 8주가 되면 % 기준과 전후 비교로 바꾼다.

## 상태 · 예외
- 이벤트 흐름: `app_open` → `study_start` → (`study_complete` | 없음 = 미완주). 같은 날 세션 여러 번 가능.
- 엣지케이스:
  - 자정을 넘긴 세션: `study_start`의 `local_date`를 그 세션의 날로 본다.
  - 기기 시간대 변경: 현지 날짜 기준이라 하루가 겹치거나 빌 수 있음 — 앱 복귀 판정과 같은 한계.
  - `study_complete`만 있고 `study_start`가 없음(전송 유실): 완주율 계산에서 제외.
  - 광고 제거 구매자: 광고와 무관하게 같은 이벤트를 보냄 (토글로만 끔).
- 빈: 수집 도구 응답 없음 → 버림. 오류: 학습 흐름에 영향 없음. 로딩: 해당 없음.

## 정책 결정
| ID | 사안 | 결정 |
|---|---|---|
| O-1 | 이벤트 범위 | **`app_open` · `study_start` · `study_complete` 3개**로 확정. 탭·화면 조회 이벤트는 넣지 않는다 — 지표 3개 + 가드레일 계산에 필요한 최소 |
| O-2 | 평가 버튼 | **탭마다 보내지 않고 `study_complete`에 버튼별 횟수로** 확정. 하루 36탭 × 사용자 수만큼 이벤트가 늘고, 카드별 등급은 학습 내용에 가까워서 |
| O-3 | 사용자 식별 | **앱이 만든 무작위 `install_id`만** 확정. 광고 ID·계정 없음. 재설치 시 새 ID |
| O-4 | 학습 내용 | **단어·뜻·카드별 등급·FSRS 일정은 보내지 않음** 확정 (지금 방침의 "학습 데이터는 기기에" 약속을 최대한 유지) |
| O-5 | 사용자 선택권 | **설정에 "사용 통계 보내기" 토글** 확정 |
| O-6 | 수집 도구 | ⚠️ 확인 필요 — 개발자 판단. 후보: Firebase Analytics(무료, 이미 Google AdMob 사용 중. 광고 ID 수집은 끄고 써야 O-3과 맞음) · PostHog(자체 이벤트 중심, 무료 구간). 조건: Expo 빌드에서 동작, 오프라인 큐, 광고 ID 미수집 설정 가능 |
| O-7 | 개인정보처리방침 · 스토어 표기 | ⚠️ 확인 필요 — 방침 Summary의 "We do not use a first-party analytics … SDK" 문장 교체, "Data Stored On Your Device" 아래 "보내는 사용 통계" 절 추가(항목은 동작 명세 #1~3, 안 보내는 것은 #5), App Store 개인정보 라벨(사용 데이터 · 제품 상호작용, 추적 아님) · Play 데이터 보안 섹션 갱신. **도구(O-6)가 정해져야 문장을 확정할 수 있음** |
| O-8 | 토글 기본값 | ⚠️ 확인 필요 — 기본 켜짐(데이터가 모임, 방침에 명시 필요) vs 기본 꺼짐(동의한 사람만, 10명 규모에선 거의 안 모임). 제안: **기본 켜짐 + 방침 명시 + 토글** |

## 변경 델타
| ID | 항목 | 변경 |
|---|---|---|
| N-1 | 이벤트 `app_open` · `study_start` · `study_complete` | 추가 (앱 코드) |
| N-2 | 설정 "사용 통계 보내기" 행 | 추가 — 기존 `list-row` + 스위치, 새 컴포넌트 없음 |
| N-3 | 로컬 `install_id` | 추가 (AsyncStorage) |
| D-1 | 개인정보처리방침 "자체 분석 SDK 없음" | 교체 예정 (O-7) — 정본 반영 여부: ⬜ 아직 |

## 관련 화면 · 컴포넌트
- 화면: 설정 > 일반 (토글 1행)
- 컴포넌트: `list-row` (COMPONENTS.md)
- 코드: `src/features/study/SessionEngine.ts`(start · end) · `src/features/study/learnerProfile.ts`(`isReturnBoostDay`, `localDayKey`) · `docs/release/PRIVACY_POLICY.md`
- 관련 문서: 포트폴리오 3장 "다음에 확인할 것" (`portfolio/onikan-deck-2026-11.html`)
