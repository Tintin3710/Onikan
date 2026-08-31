# 오니칸 컴포넌트 계약 (Component Contract)

> 목적: **디자인 = 개발이 정확히 일치**하도록, 재사용 부품을 이름·토큰·정확값으로 고정한다.
> 이 문서는 Figma 컴포넌트와 코드(RN) 컴포넌트가 **함께 구현하는 단일 계약**이다.
> 기준: [`DESIGN.md`](./DESIGN.md) 토큰 · [`handoff/README.md`](./handoff/README.md) 5화면 스펙.

---

## 왜 이 문서가 필요한가 — 관측된 불일치

디자인과 현재 개발 구현이 어긋나는 건 "누가 틀려서"가 아니라 **강제되는 공통 계약이 없어서**다. 실제로 관측된 예:

| 항목 | 디자인(정본) | 현재 개발 구현 | 원인 |
|---|---|---|---|
| 카드 층 구분 | **그림자만** (`0 6px 14px shadow`), 테두리 없음 | **테두리**(borderStrong)로 구분 | `tokens.ts`에 shadow 토큰이 없어 border로 대체 |
| 카드 반경 | `radius 24` | `radius.card = 28` | 토큰 값 불일치 |
| 아이콘 | 라인 글리프(예: `icon-today.svg`) | **이모지**(🔊 등) | 공용 아이콘 세트/계약 부재 |
| 라벨 | "사전 ↗"(추상화) | "네이버 사전" | 카피 소스가 하나로 안 정해짐 |
| 색 | Onikan Grey + orange/lime | 옛 순수 모노톤 | 토큰 미이행 |
| 컴포넌트 | 공통 부품 재사용 | **화면마다 수제** | 공용 라이브러리 부재 |
| 중간 그레이 라벨 | 램프 내 값으로 통일 | `Semantic/Label/Alternative #37383C`(신규·미문서화, 기록 라벨) | (T-1) 램프에 없는 값 — `body`로 통일 권장 |
| 폰트 패밀리 | 전 텍스트 `Pretendard JP` | 오버라인/영수증 캡션이 `Pretendard`(비-JP) 혼용 | (T-2) `Pretendard JP`로 통일 |

> T-1·T-2는 [2026-08 리디자인 실측](./handoff/redesign-2026-08/README.md#실측-토큰타이포-figma-변수-대조)에서 확인된 편차. 정본은 `body`/`Pretendard JP`로 통일한다.

**해결 = 3단 정렬을 강제한다:**

1. **토큰 = 단일 소스** — `DESIGN.md` ↔ **Figma Variables** ↔ 코드 `tokens.ts` 를 **같은 값**으로. (radius 24 / shadow `0 6px 14px` / Onikan Grey)
2. **컴포넌트 계약(이 문서)** — 아래 부품을 이름·props·정확값으로 고정. Figma 컴포넌트 1개 ↔ RN 컴포넌트 1개.
3. **Code Connect** — 그 둘을 매핑. 개발자가 Figma에서 요소를 고르면 대응 코드 컴포넌트가 뜨게.

---

## 글로벌 규칙 (모든 컴포넌트 공통)

- **층은 그림자 유무로만.** 흰 카드가 둘 이상이면 색·테두리·반경은 동일하게 두고 **shadow 유무**로만 위계. 테두리로 카드를 나누지 않는다.
- **주요 액션 = 잉크** (`ink` 채움 + `on-ink` 라벨). 화면당 하나. 경쟁 액션은 **화이트 아웃라인**(2번째 잉크 pill 금지). *(D-3, 2026-08: 주요 CTA 오렌지→잉크.)*
- **오렌지(`primary`) = 브랜드·상태 악센트** — 활성 탭(`tab-active`) · **단골 도장(오렌지)** · 섹션 오버라인(오늘 학습 완료·이어서 회독해요) · 상태 뱃지(진행 중) · 차트 '나' 강조 1개소(D-2) · 음독 브리지 필. **주요 버튼엔 쓰지 않는다.**
- **라임/그린(`secondary`) = 진척·완료** — N5 아크 게이지 · 오늘 복습 완료 카드(연녹+그린 체크) · 재료 획득 체크 · 완성 뱃지. 학습 보조(발음유사·예문)엔 쓰지 않는다(뉴트럴 `soft`, D-1).
- **홈은 세그먼트 토글을 쓰지 않는다** — 상태(학습전/학습완료/회독전/회독완료)에 따라 `hero-card`의 단일 CTA 라벨이 바뀐다. (R-1)
- **모드 3어 고정**: `학습`(신규·FSRS) · `복습`(오늘 "아직이에요" 단어만·FSRS) · `회독`(빈출 챕터 정주행). 이름을 섞지 않는다 — 챕터 정주행을 '복습'이라 부르거나, 틀린 단어 재시험을 '회독'이라 부르지 않는다. 각 진입점에 범위 부제. (O-3)
- **`mute`는 잠김·플레이스홀더 전용.** 읽는 텍스트에 쓰지 않는다.
- **`plate`(#EDEDF1)는 라이트/다크 고정** — 검정 선화 일러스트가 다크에서 사라지지 않게.
- **아이콘은 공용 글리프**(26px 박스·1.7px 스트로크·라운드 캡). **이모지 금지.** '오늘' 탭은 제공된 `assets/icon-today.svg`를 그대로 사용(viewBox 유지).
- **카드 안 카드(중첩) 금지**, 그라데이션·텍스트 그림자 금지.
- **모든 숫자에 `tabular-nums`.**

---

## 컴포넌트 카탈로그

각 항목: **Figma 이름 / RN 이름** · 언제 · 해부 · 정확값(토큰) · 상태 · Code Connect.

### Foundations

**Tokens** — `DESIGN.md`가 정본. Figma Variables·`tokens.ts`는 이 값을 미러링만 한다.
`ink #1D1D21` · `body #56565E` · `mute #8E8E97` · `canvas #FFF` · `softer #F2F2F4` · `soft #E8E8EC` · `pressed #DCDCE2` · `plate #EDEDF1` · `primary #EF5112` · `primary-pressed #D2460E` · `on-primary #FFF` · `tab-active #C2410C` · `secondary #A3E635` · `bar-fill #71717A` · `shadow rgba(0,0,0,.05)` (다크 값은 DESIGN.md).
> 위 값은 2026-08 Figma 실측(`get_variable_defs`)과 일치 확인됨. (구 `primary #EA580C`는 폐기 — `#EF5112`.)
반경: `card 24` · 타일 12/14/16/18 · 컨트롤 pill(999) · **영수증 10**(Figma 2026-08: 4→10). 좌우 여백 20. 그룹 간격: 한 덩어리 12 / 다른 그룹 24–28.

---

### `Card` / `<Card>`
- **언제**: 히어로·보상·메뉴·요약 등 모든 내용 카드.
- **해부**: 배경 `canvas`, 반경 `24`, 그림자 `0 6px 14px shadow`, 패딩(히어로/보상 `24 20`, 진행/리스트 `16 16 16 18`).
- **변형**: `elevated`(그림자 O) / `flat`(그림자 X — 진행 카드처럼 "누를 수 있으나 히어로 아님"). **테두리 변형 없음.**
- **Code Connect**: `Card` → `<Card variant="elevated|flat" padding=...>`

### `Overline` / `<Overline>`
- **언제**: 카드·섹션 머리말("오늘의 학습", "만드는 중", "재료 4").
- **정확값**: 12px / 500 / `body`, uppercase, letter-spacing 1.4px.

### `SegmentedControl` / `<SegmentedControl>` — ⚠️ 홈에서 폐기 (2026-08)
- **언제**: ~~홈 오늘 학습↔회독~~ → **폐기.** 홈은 상태 머신 `hero-card`의 단일 CTA 라벨 전환으로 대체(아래 §리디자인 신규 · R-1). 다른 화면에서 세그먼트가 필요할 때만 이 스펙을 유지한다.
- **해부**(유지 시): 트랙 `soft`, 반경 pill, padding 4, gap 4. 각 버튼 flex:1, min-h **44**, 16/600. 활성 `canvas`+글자 `ink`+`0 1px 3px shadow` / 비활성 투명+`body`.

### `PrimaryButton` / `<PrimaryButton>`
- **언제**: **화면당 유일한** 주요 액션 (학습 시작하기·회독하기·외웠어요·지금 연습하기·확인·이어서·오늘 학습 시작…).
- **정확값**: 전체폭, min-h **56**, 반경 pill, 18/600.
- **색(2026-08: 오렌지→잉크, D-3)**: 배경 **`ink` `#1D1D21`**, 라벨 **`on-ink` `#F7F7F9`**(15.8:1, 전 사이즈 AA — 구 흰라벨 large-text 제약 폐기). **다크에선 반전**: 밝은 fill(`grey-98`) + `ink` 라벨. press: 살짝 밝게(스케일·투명도 금지).
- **경쟁 액션**: 오렌지 2번째 버튼 만들지 말 것 → `SecondaryButton`(화이트 아웃라인).

### `SecondaryButton` / `<SecondaryButton>`
- **변형**: `outline`(투명+1.5px `pressed`, 글자 `ink`) · `soft`(`soft` 배경). 학습 "아직이에요", 영수증 "이미지로 저장/공유" 등.

### `GradeButtons` / `<GradeButtons variant>`
- **언제**: 학습·회독 공개 후 2단계 평가.
- **해부**: gap 10, 각 flex:1 min-h **60** pill 17/600.
- **변형 `study`(기본)**: `아직이에요`=outline(`pressed`) → FSRS **Again** · `외웠어요`=`ink` 채움/글자 `softer` → **Good**.
- **변형 `review`(회독)**: `모름`=outline(`pressed`) · `안다`=`ink` 채움/글자 `softer`. 구조 동일, 라벨만 다름. (C-1)
- **4단계 아님.**

### `Chip` / `<Chip>`
- **변형**: `range`(테두리 1.5 `pressed`, 9/14 padding — 회독 범위) · `next`(배경 `soft` — 재료 "다음") · `level`(N5 필).

### `IconButton` / `<IconButton>`
- **언제**: 닫기·TTS·뒤로·뷰전환.
- **해부**: 44×44, 배경 투명(또는 `soft` 원형), 아이콘 24(또는 20), 색 `body`/`ink`. **접근성 라벨 필수.** **이모지 아님.**

### `ProgressSegments` / `<ProgressSegments>`
- **언제**: 재료 4칸 / 학습 12칸.
- **해부**: n칸 flex:1, gap(4/6/8), 높이(4/5/6/8), 반경 pill. 빈칸 `pressed`.
- **채움 규칙**: 탐색 맥락(홈·메뉴·상세)=`bar-fill #71717A` · **결과/영수증만 `ink`**(보상 순간).

### `PlateTile` / `<PlateTile>`
- **언제**: 오니기리·재료·마스코트 일러스트 담는 타일.
- **해부**: 배경 **`plate`(양테마 고정)**, 반경(크기별 12/14/16/18), 이미지 `contain` 타일의 ~74%.
- **상태(재료/오니기리)**: `earned/done`(실물) · `making`(실물 + `inset 0 0 0 2px ink`) · `locked/next`(투명 + `inset 0 0 0 1.5px pressed` + "?").

### `TabBar` / `<TabBar>` + `TabItem`
- **해부**: 배경 `softer`, 위 1px `pressed`, padding `8 8 26`. 각 탭 flex:1 min-h 52, 세로, gap 5. 아이콘 26px·1.7 스트로크·라운드캡, 라벨 12px(활성 600/비활성 500, letter-spacing −0.1). **활성 `tab-active` 틴트만**(면·배지·밑줄 없음).
- **아이콘**: 오늘=**`icon-today.svg`(제공, 오니기리)** · 메뉴=책 · 기록=시계 · 설정=슬라이더(원은 `softer`로 채움). viewBox 값 유지.
- **`tab-active`는 primary와 별개 토큰**(12px 틴트라 탭바 배경 위 4.5:1 필요): 라이트 `#C2410C`(4.63:1) / 다크 `#F97316`(6.62:1). 라이트에서 primary `#EF5112`를 그대로 쓰면 near-white 탭바 위 **3.21:1로 미달** ✗ — 반드시 어두운 `#C2410C`.

### `ListRow` / `<ListRow>`
- **해부**: min-h 64(메뉴)/68(재료), 아래 1px `pressed`, gap 14. 인덱스 13/500 `body` width 28, 이름 20/600(메뉴)·18/600(재료).

### `IngredientRow` / `<IngredientRow>`
- **상태**: `earned`(PlateTile 실물 + 이름 `ink` + "받았어요") · `next`(?링 + 이름 `ink` + `Chip.next` "다음") · `locked`(?링 + 이름 `mute`).

### `OnigiriCell` / `<OnigiriCell>` (그리드)
- **해부**: 정사각 `aspect-ratio:1` 타일 radius 18 + 라벨 14/600 gap 8.
- **상태**: `done`(plate+실물) · `making`(plate+실물+2px ink) · `locked`(투명+1.5 `pressed` 링 + "?" 22/700 `mute`, 라벨=인덱스).

### `RewardCard` / `RewardBadge`
- **RewardCard**: 88 PlateTile(재료 65) + 오버라인 "새 재료" / 이름 26/700 / 설명. 진입 `riseIn`.
- **RewardBadge**: 우하단 −6/−6, 30×30 원 `secondary`(라임/그린), 안에 체크(색 `ink`). 진입 `pop`. **라임/그린 사용처(진척·완료)** = 여기(재료 체크) + N5 아크 게이지 + 오늘 복습 완료 카드 + 완성 뱃지. **단골 `도장`은 오렌지로 이동**(D-3).

### `Receipt` / `<Receipt>`
- **해부**: 배경 `canvas`, **반경 10**(종이 신호 전용 · Figma 2026-08: 4→10), padding `30 24 36`, width **338**. "ONIGIRI SHOP" 15/600 tracking 3. 행 사이 1px `soft`, 섹션 경계 1px dashed `pressed`. 잠긴 오니기리 타일 = **둥근 삼각형**(`icoOnigiriQ`, 폴리곤 `#CACACE`@.4 + `?` `#929299`@.6), locked 서브카드 `#fafafa`·radius 16.
- **Receipt Overlay (Dimmer) — Receipt 전용 스타일:** `background rgba(0,0,0,.6)`(#000/60%, 일반 오버레이보다 어둡게) + `backdrop-filter: blur(7px)`(Figma Dev export). **Result 화면 위 dimmer 레이어의 backdrop-filter로만** 적용(Result DOM·카드에 직접 `filter:blur` 금지). 토큰 `--receipt-dimmer-bg`·`--receipt-dimmer-blur`(Receipt namespace).
  - **Do**: 영수증 출력 시에만 · 카드 뒤 · Result 위 overlay. **Don't**: 일반 Bottom Sheet/Level Selector/Global Modal Dimmer로 승격, 공통 overlay 토큰(`--modal-overlay` 등) 덮어쓰기. → **"Modal Dimmer 토큰"이 아니라 "Receipt 전용 Overlay Style".**
- **Entrance `printOut` (레퍼런스 `영수증 출력.mp4` 계측):** 상단 고정 슬롯(`.receipt-slot`, `overflow:hidden` clip) 안에서 카드가 **`translateY −100%(카드 높이) → 0`** 으로 출력. **opacity·scale 변화 없음, overshoot/bounce 없음.** `duration 1350ms · delay 60ms · easing cubic-bezier(0.5, 0, 0.25, 1)`(ease-in-out). Dimmer는 **fade 없이 즉시 full**(영상 frame0부터). 토큰 `--receipt-entrance-*`.
  - **Trigger** `isReceiptOpen`. **Playback 진입 시 1회 · Loop 없음.** re-render로 반복 재생 금지(`receiptEntrancePlayed` 가드 — 이미 재생됐으면 카드는 최종 위치로 렌더). **⚠️ Motion completion ≠ Navigation** — 완료돼도 자동 이동 없음, `finish` 이동은 오직 [확인했어] 클릭. **Exit 모션은 별도 정의 없음**(닫힘은 기존 navigation 그대로, slide/fade-out 추가 금지). `prefers-reduced-motion` → 카드 최종 위치 즉시(dimmer 정상). dev: `window.replayReceiptEntrance()`(실 UI 미노출).
  - 구현: `onboarding/styles.css`(`.receipt-slot`·`@keyframes printOut`·`.receipt-overlay` 토큰) + `app.js`(`startReceiptEntrance`·가드). [ref](./handoff/redesign-2026-08/motion/receipt-entrance.mp4)

### `TopNav` (상세) / `BottomSheetHeader` (단어 상세 11c)
- **TopNav**: 44 뒤로 셰브론(`ink`) + 가운데 워드마크 15/600 `body` tracking 1.4 (오른쪽 44 패딩 광학중앙). **'＜ 뒤로' 알약 금지.**
- **BottomSheetHeader(11c)**: 좌 44 닫기(✕) + 가운데 "단어 상세". 단어 상세는 **바텀시트** 패턴.

### `WordDetailCards` (11c)
- `HeaderCard`(N5 필 + 단어 44/700 + 읽기 18/500 + `발음 듣기`·`사전 ↗` 필), `MeaningCard`(오버라인 "뜻" + 뜻 + 품사), `KanjiCard`(오버라인 "한자 N" + KanjiRow[한자 글리프 + 뜻 + 음/훈/부수·획]). 모두 `Card`(그림자, **테두리 없음**), 사전 라벨은 하나로 확정해 공유.
- **음독≈한국음 브리지**: KanjiRow 음독 하이라이트는 **orange 아웃라인 필**(기존 한자 브리지). 학습 카드가 아니라 상세 시트 전용.

---

### 리디자인 신규 (2026-08)

> Figma 섹션 "ui 최신화"(`254-6477`) 실측. **가칭 → Figma 실측 이름**. 상세·화면은 [redesign-2026-08](./handoff/redesign-2026-08/README.md).

#### `hero-card` / `<HomeHero>` — 홈 상태 머신 히어로
- **언제**: 홈 오늘 학습 영역. 세그먼트 토글을 대체(R-1).
- **해부**: `Card(elevated)`. `Overline`(상태 라벨) + 카피 + 지표행(`hero-number` = `Ratio` 타일 3) + 진행바(`progress`) + CTA 슬롯 **`┗ Main Action`**(=`button-primary`) + **`┗ Sub Action`/`┗ Alternative Action`**(텍스트 링크).
- **상태(4)**: `study-before`(학습 시작하기) · `study-done`(회독 시작하기 + "학습 단어 다시 보기") · `review-before`(N5-1 시작하기 + 진행율) · `review-done`(이어서 N5-2 + "학습 단어 다시 보기"). 상태별로 **오버라인·카피·지표·CTA 라벨만** 바뀌고 골격 동일.

#### `도장` / `<StreakStamps>` — 단골 스탬프
- **언제**: 홈·기록의 "단골 N일차". 연속 학습일 보상.
- **해부**: 오니기리 스탬프 나열. `earned`=**오렌지(`primary`) 오니기리 스탬프** · `locked`=점선 회색(`pressed`) · 마지막 칸(7일 마일스톤) = **단골 보호권(스트릭 프리즈) — 방패/보호 아이콘**(구 `P`, O-4). *(2026-08: 단골=오렌지, 라임 아님 — D-3. 브랜드/충성 신호이지 보상 체크가 아니므로 오렌지.)*
- **보호권**: 7일 연속 시 1개 지급, 하루 결석해도 단골 유지. 상시 혜택(재료 2배)과 별개.

#### `progress-card` + `ChapterRow` / `<ChapterRow>` — 회독 빈출단어
- **언제**: 홈 회독 전/후의 "빈출 단어" 리스트.
- **해부**(행): 좌 인덱스 배지 + 이름(`N5-1`) + `0/50 단어` + 우측 상태 버튼. `열기`=`ink` 필 pill · `잠김`=`mute` 텍스트 · `완료`=`body` 텍스트. 행 사이 spacing 구분(테두리 X).
- **트랙 규칙(O-1)**: 회독은 상설·이어보기. N5-x 완료 → N5-(x+1) 언락, 완료 챕터는 `다시 외우기` 재방문, 진행률 영구 저장. 리스트는 항상 접근 가능하고, `hero-card`의 `이어서 N5-x`는 **오늘 학습 완료 후에만** 승격.
- **진도 정의(O-6)**: 챕터 진도(`n/50`)는 **coverage=새로 학습한 단어 수**(mastery 아님). **새 단어 학습으로만 증가**하며, `복습`(틀린 단어 SRS) 완료로는 **변하지 않는다**(중복 카운트 방지).

#### `<ReviewTopCard>` — 오늘 학습 복습
- **언제**: 홈 회독 전/후 최상단. **학습에서 "아직이에요"로 표시한 단어만** 모은 FSRS 복습.
- **해부**: `Card(flat)`, 좌 `あ` 타일 + 제목/설명 + 우측 `열기`(`ink` pill). 라벨은 **"복습"**(틀린 단어)으로 고정 — 챕터 정주행 "회독"과 구분(O-3).

#### `<ScoreDistribution>` — 기록 점수 분포
- **언제**: 기록 화면 "내 학습 점수 분포".
- **해부**: 히스토그램 막대 다수(`pressed`) + **내 위치 1개 막대 orange**(D-2 예외) + "나" 라벨(`pop`) + 축 `0% · 평균 N% · 100%`. 숫자 `tabular-nums`.

#### `<ArcGauge>` — N5 전체 진척도 (회독 홈 Summary)
- **언제**: 회독 허브 Summary의 매크로 진척도. 화면당 진척 표현 3종을 **다른 시각언어**로: 전체=**아크 게이지**, 현재 챕터=**Linear 바**, 챕터 리스트=**텍스트+뱃지**(진행바 없음).
- **해부**: 반원 아크, 트랙 `soft`, 채움 **`secondary`(라임→그린)**. % + `N5 전체` 라벨이 아크보다 먼저 읽히게. 카드 절반 미만 크기. 원형 도넛/큰 반원 차트 금지.

#### `<CompletionCard>` — 완료 상태 콜아웃
- **언제**: 오늘 복습 완료 등 done 상태. **연녹(`#EAF6DD` 계열) 틴트 배경 + 그린 체크 + 짧은 문장**. Primary CTA 없음(또는 약한 아웃라인). 카드 안 서브영역이면 `Card` 중첩 금지 → 틴트 서브카드.

#### `StatusBadge` (진행 중 / 완료 / 잠김 / 새로 열림)
- **진행 중**=오렌지 소프트(`#FCE8DE`/`primary`) · **완료**=그린 소프트(`#E7F4D9`/`secondary-deep`) · **잠김**=`mute` 텍스트 · **새로 열림**=오렌지 솔리드 pill(주의 환기, 액션 아님) + `시작하기 ›`. 상태 뱃지는 색을 갖되 **액션 아님**(주요 액션은 잉크 버튼).

#### 학습 카드 추가 요소 (`FlashCard` 내)
- **`PhoneticHintCard`(조건부)**: 발음이 유사한 단어가 있을 때만. 배경 **`soft`(뉴트럴, 라임 아님 — D-1)** + `발음이 유사한 단어` 필 + 2열 유사어.
- **`ExampleCard`**: `🔊 예문을 들어보세요`(스피커·라벨 `body`) + 일문/국문. **카드 탭 → 예문 TTS.**

#### 인터랙션 (신규) — 모션과 구분

- **`ButtonFillProgress`** (온보딩 화면2 guide + 화면5 학습완료 **공용**): 하단 `계속` 버튼의 **진행 표시 fill**. 회색 트랙(`--track #9A9AA1`) 위로 **잉크(`--ink`) fill이 좌→우 `width 0%→100%`**(왼쪽 edge 고정, keyframe `guideFill`). 라벨은 fill 위 중앙 고정(z-index). 두 인스턴스는 **easing·keyframe·구조 동일, duration만 다름.**
  - **인스턴스 1 — 화면2 guide**(hooks `data-interaction="guide-continue"` / `data-interaction-target="guide-continue-fill"`): `--guide-fill-duration: 2000ms` · `--guide-fill-easing: cubic-bezier(0.25,0.46,0.45,0.94)`(ease-out) · `--guide-fill-delay: 0ms`. 레퍼런스 `온보딩2.mp4` 계측(0.5s→45% · 1.0s→77% · 1.5s→94% · 2.0s→100%). dev: `window.replayGuideFill()`.
  - **인스턴스 2 — 화면5 학습완료**(hooks `data-interaction="study-complete-continue"` / `data-interaction-target="study-complete-continue-fill"`): 동일 컴포넌트·keyframe·easing, **duration만 `--sc-fill-duration: 1800ms`**, delay 0. 레퍼런스 `학습완료.mp4` 계측(0.36s→37% · 0.9s→77% · 1.4s→95% · 1.8s→100%). 진입 시 particle(`confettiBurst`)과 함께 재생되지만 **별개 동작**(같은 로직으로 묶지 않음). dev: `window.replayStudyCompleteMotion()`.
  - **타이밍은 한 곳(CSS 변수)에서만 관리.** **화면 진입 시 1회 자동 재생.** `prefers-reduced-motion` → 애니메이션 없이 **즉시 100%**.
  - **navigation과 완전 독립.** fill이 100%가 돼도 **자동 이동 없음** — 화면 이동은 오직 사용자 `계속` 클릭. fill 진행 중에도 클릭하면 즉시 이동. **fill 완료 여부를 버튼 활성/네비 조건으로 쓰지 않는다.** 금지: gradient/scaleX(center)/shine/bounce/spring/overshoot/loop.
  - **⚠️ `buttonAutoFill`과 구분:** `buttonAutoFill`(영수증 `확인`)은 fill = **카운트다운 → 자동 push**. `ButtonFillProgress`(guide)는 fill = **순수 시각 진행 표시(자동 이동 없음)**. 두 인터랙션을 같은 로직으로 구현하지 않는다.
  - dev: `window.replayGuideFill()`(실 UI 미노출). 구현: `handoff/redesign-2026-08/onboarding/styles.css`(`--guide-fill-*`·`.btn-fill`·`@keyframes guideFill`) + `app.js`(`startGuideFill()`). [ref 영상 원본은 디자이너 보관]

#### 모션 (신규)
- **`buttonAutoFill`**: 재료 획득 영수증 `확인`이 2s 선형 fill 후 자동 push(ink fill/회색 트랙). **탭 = 즉시 전환**(남은 fill 100% 스냅 + 햅틱 후 push). `prefers-reduced-motion` 시 자동 fill·자동 전환 비활성(일반 탭 버튼). 요약은 `영수증 다시 보기`로 재열람. (O-5, cf. `ButtonFillProgress`) [ref](./handoff/redesign-2026-08/motion/button-autofill.mp4)
- **`confettiBurst`** — 축하 파티클 버스트. **노출 정책은 맥락별로 다르다 (O-7):**
  - **실사용(프로덕션): 오니기리 완성 시에만.** 재료만 획득하고 끝나면 **미노출** — 재료 4/4로 오니기리가 완성되는 순간에만 버스트(README ①~④ 흐름과 일치, 더 큰 스케일 가능 · ref onigiri-complete.mp4).
  - **온보딩(첫 사이클 체험): 재료 획득 시 노출.** 온보딩은 보상 루프를 **처음 가르치는** 가이드 경험이라, 레시피가 미완성이어도 학습완료(재료 획득) 화면5에서 축하 버스트를 보여준다 — **의도된 예외**. hooks `data-motion="study-complete-particles"`, ref `학습완료.mp4`.
  - 두 경우 **같은 `confettiBurst` 컴포넌트**, **트리거(노출 조건)만** 맥락에 따라 다르다. 아래 계측값은 온보딩 인스턴스(`학습완료.mp4`) 기준.
  - **계측(학습완료.mp4, 390×844)**: 진입 후 delay **~140ms**에 등장(버튼 fill보다 늦음 — 동시 아님). **단발**(연속 emitter/loop 아님).
  - **분포 spawn**: 점 폭발이 아니라 **상단 영역 전면(full-width, 상단~중앙)에 분포 spawn 후 낙하**. 각 particle: 약한 초기속도(좌우 drift + 대부분 하향, 일부 위로 팝) → **공기저항으로 종단속도 수렴(플러터, 자유낙하 아님)** + 개별 회전. 수명 ~**2.2–2.65s**, 끝에서 opacity 페이드, 전체 소멸 ~2.8s. 밀도 최고 ~0.9–1.3s. **bounce/turbulence 추가 금지.**
  - **형태**: 소형 사각형 + 길쭉한 막대 혼합(~6–18px). **색 3종(계측): 골드 `#FAB815` · 버밀리언 `#EB4308` · 핑크 `#F164AD`.** 임의 색 추가 금지.
  - **결정적**: seeded PRNG(mulberry32, 고정 시드) → 새로고침·Replay 시 동일 패턴. 매회 다른 `Math.random()` 모션 금지. 파라미터 한 곳: `STUDY_COMPLETE_MOTION.particles`.
  - **레이어**: `.motion-layer`(overlay · `pointer-events:none` · z-index 50) — 버튼 클릭 방해 없음, layout 영향 없음.
  - **`prefers-reduced-motion`** → particle 생략(버튼 fill은 즉시 100%). dev: 재생 `window.replayStudyCompleteMotion()` · 정지프레임 `window._scMotionScrub(ms)`(실 UI 미노출).
  - ⚠️ **Motion completion ≠ Navigation** — particle·fill이 끝나도 자동 전환 없음. 화면 이동은 오직 [계속] 클릭. (학습완료 화면은 과거 auto-advance 제거됨.)
  - 구현: `onboarding/app.js`(`STUDY_COMPLETE_MOTION`·`startStudyCompleteMotion`·`buildScParticles`·`paintScParticles`) + `styles.css`(`.sc-particle`·`--sc-fill-duration`). [ref](./handoff/redesign-2026-08/motion/confetti-burst.mp4)
- **`printOut` (영수증 Entrance)** — 영수증 출력 시 카드가 상단 슬롯에서 `translateY −100%→0`(clip). 1350ms·delay 60ms·`cubic-bezier(0.5,0,0.25,1)` ease-in-out, opacity/scale/overshoot 없음. 진입 1회·loop 없음·**Motion completion ≠ Navigation**. Dimmer는 **Receipt 전용**(`#000/60%`+blur 7px). 전체 스펙·Do/Don't은 위 **`Receipt`** 컴포넌트 항목 참조.

---

## 명명 매핑 (Figma ↔ 코드)

| Figma 컴포넌트 | RN 컴포넌트 | 제안 경로 |
|---|---|---|
| Card | `<Card>` | `src/components/ui/Card.tsx` |
| PrimaryButton / SecondaryButton | `<Button variant>` | `src/components/ui/Button.tsx` |
| SegmentedControl | `<SegmentedControl>` | `src/components/ui/SegmentedControl.tsx` |
| ProgressSegments | `<ProgressSegments>` | `src/components/ui/ProgressSegments.tsx` |
| PlateTile | `<PlateTile>` | `src/components/ui/PlateTile.tsx` |
| TabBar | `<TabBar>` | `src/components/ui/TabBar.tsx` (icon-today.svg 포함) |
| ListRow / IngredientRow / OnigiriCell | 동명 | `src/components/collection/*` |
| RewardCard / RewardBadge / Receipt | 동명 | `src/features/done/components/*` |
| GradeButtons / FlashCard | 동명 | `src/features/study/components/*` |
| **hero-card** | `<HomeHero>` | `src/features/home/components/HomeHero.tsx` |
| **도장** | `<StreakStamps>` | `src/features/home/components/StreakStamps.tsx` |
| **progress-card** / ChapterRow | `<ChapterRow>` | `src/features/review/components/ChapterRow.tsx` |
| ReviewTopCard | `<ReviewTopCard>` | `src/features/home/components/ReviewTopCard.tsx` |
| ScoreDistribution | `<ScoreDistribution>` | `src/features/stats/components/ScoreDistribution.tsx` |
| Ratio | `<StatTile>` | `src/components/ui/StatTile.tsx` |

> **Code Connect**: 각 Figma 컴포넌트에 `.figma.tsx` 매핑을 붙여 Dev Mode에서 코드 스니펫이 뜨게 한다.
> RN 경로·컴포넌트 이름은 제안 — 개발 레포(`taiyoungkim/AshitaKanji`)의 feature-first 구조 관례를 따름.

---

## Do / Don't 요약

**Do** — 주요 액션은 **잉크 버튼**, 오렌지는 브랜드·상태(탭·단골·오버라인·상태뱃지·차트 '나')로만, 라임/그린은 진척·완료로, 층은 그림자로, 아이콘은 공용 글리프로, 값은 이 문서/토큰에서만, 숫자 tabular-nums, plate 고정, 홈은 상태 머신(`hero-card`).
**Don't** — **주요 버튼에 오렌지(주요=잉크)**, 화면당 잉크 버튼 2개, lime/green을 진척·완료 아닌 곳에 장식, 카드에 테두리로 위계, 이모지 아이콘, `mute`로 본문, 카드 중첩, 라벨/카피를 화면마다 다르게, 홈에 세그먼트 토글.
