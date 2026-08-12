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

**해결 = 3단 정렬을 강제한다:**

1. **토큰 = 단일 소스** — `DESIGN.md` ↔ **Figma Variables** ↔ 코드 `tokens.ts` 를 **같은 값**으로. (radius 24 / shadow `0 6px 14px` / Onikan Grey)
2. **컴포넌트 계약(이 문서)** — 아래 부품을 이름·props·정확값으로 고정. Figma 컴포넌트 1개 ↔ RN 컴포넌트 1개.
3. **Code Connect** — 그 둘을 매핑. 개발자가 Figma에서 요소를 고르면 대응 코드 컴포넌트가 뜨게.

---

## 글로벌 규칙 (모든 컴포넌트 공통)

- **층은 그림자 유무로만.** 흰 카드가 둘 이상이면 색·테두리·반경은 동일하게 두고 **shadow 유무**로만 위계. 테두리로 카드를 나누지 않는다.
- **화면당 orange는 하나** (주요 액션). 탭바 활성 표시(`tab-active`)만 예외.
- **lime은 보상 획득 순간에만** (체크 배지, 방금 채워진 진행 칸 페이드).
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
`ink #1D1D21` · `body #56565E` · `mute #8E8E97` · `canvas #FFF` · `softer #F2F2F4` · `soft #E8E8EC` · `pressed #DCDCE2` · `plate #EDEDF1` · `primary #EA580C` · `on-primary #FFF` · `tab-active #C2410C` · `secondary #A3E635` · `bar-fill #71717A` · `shadow rgba(0,0,0,.05)` (다크 값은 DESIGN.md).
반경: `card 24` · 타일 12/14/16/18 · 컨트롤 pill(999) · **영수증 4**. 좌우 여백 20. 그룹 간격: 한 덩어리 12 / 다른 그룹 24–28.

---

### `Card` / `<Card>`
- **언제**: 히어로·보상·메뉴·요약 등 모든 내용 카드.
- **해부**: 배경 `canvas`, 반경 `24`, 그림자 `0 6px 14px shadow`, 패딩(히어로/보상 `24 20`, 진행/리스트 `16 16 16 18`).
- **변형**: `elevated`(그림자 O) / `flat`(그림자 X — 진행 카드처럼 "누를 수 있으나 히어로 아님"). **테두리 변형 없음.**
- **Code Connect**: `Card` → `<Card variant="elevated|flat" padding=...>`

### `Overline` / `<Overline>`
- **언제**: 카드·섹션 머리말("오늘의 학습", "만드는 중", "재료 4").
- **정확값**: 12px / 500 / `body`, uppercase, letter-spacing 1.4px.

### `SegmentedControl` / `<SegmentedControl>`
- **언제**: 홈 오늘 학습↔회독.
- **해부**: 트랙 `soft`, 반경 pill, padding 4, gap 4. 각 버튼 flex:1, min-h **44**, 16/600. 활성 `canvas`+글자 `ink`+`0 1px 3px shadow` / 비활성 투명+`body`.

### `PrimaryButton` / `<PrimaryButton>`
- **언제**: **화면당 유일한** 주요 액션.
- **정확값**: 전체폭, min-h **56**, 반경 pill, `primary` / `on-primary`, 18/600. press = 배경 한 단 어둡게(스케일·투명도 금지).

### `SecondaryButton` / `<SecondaryButton>`
- **변형**: `outline`(투명+1.5px `pressed`, 글자 `ink`) · `soft`(`soft` 배경). 학습 "아직이에요", 영수증 "이미지로 저장/공유" 등.

### `GradeButtons` / `<GradeButtons>` (학습 전용)
- **언제**: 학습 세션 공개 후 2단계 평가.
- **해부**: gap 10, 각 flex:1 min-h **60** pill 17/600. `아직이에요`=outline(`pressed`) → FSRS **Again** · `외웠어요`=`ink` 채움/글자 `softer` → **Good**. **4단계 아님.**

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

### `ListRow` / `<ListRow>`
- **해부**: min-h 64(메뉴)/68(재료), 아래 1px `pressed`, gap 14. 인덱스 13/500 `body` width 28, 이름 20/600(메뉴)·18/600(재료).

### `IngredientRow` / `<IngredientRow>`
- **상태**: `earned`(PlateTile 실물 + 이름 `ink` + "받았어요") · `next`(?링 + 이름 `ink` + `Chip.next` "다음") · `locked`(?링 + 이름 `mute`).

### `OnigiriCell` / `<OnigiriCell>` (그리드)
- **해부**: 정사각 `aspect-ratio:1` 타일 radius 18 + 라벨 14/600 gap 8.
- **상태**: `done`(plate+실물) · `making`(plate+실물+2px ink) · `locked`(투명+1.5 `pressed` 링 + "?" 22/700 `mute`, 라벨=인덱스).

### `RewardCard` / `RewardBadge`
- **RewardCard**: 88 PlateTile(재료 65) + 오버라인 "새 재료" / 이름 26/700 / 설명. 진입 `riseIn`.
- **RewardBadge**: 우하단 −6/−6, 30×30 원 `secondary`(라임), 안에 체크(색 `ink`). 진입 `pop`. **라임의 유일 사용처.**

### `Receipt` / `<Receipt>`
- **해부**: 배경 `canvas`, **반경 4**(종이 신호 전용), padding `30 24 26`. "ONIGIRI SHOP" 15/600 tracking 3. 행 사이 1px `soft`, 섹션 경계 1px dashed `pressed`. 진입 `printOut`(translateY −101%→0, 0.9s).

### `TopNav` (상세) / `BottomSheetHeader` (단어 상세 11c)
- **TopNav**: 44 뒤로 셰브론(`ink`) + 가운데 워드마크 15/600 `body` tracking 1.4 (오른쪽 44 패딩 광학중앙). **'＜ 뒤로' 알약 금지.**
- **BottomSheetHeader(11c)**: 좌 44 닫기(✕) + 가운데 "단어 상세". 단어 상세는 **바텀시트** 패턴.

### `WordDetailCards` (11c)
- `HeaderCard`(N5 필 + 단어 44/700 + 읽기 18/500 + `발음 듣기`·`사전 ↗` 필), `MeaningCard`(오버라인 "뜻" + 뜻 + 품사), `KanjiCard`(오버라인 "한자 N" + KanjiRow[한자 글리프 + 뜻 + 음/훈/부수·획]). 모두 `Card`(그림자, **테두리 없음**), 사전 라벨은 하나로 확정해 공유.

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

> **Code Connect**: 각 Figma 컴포넌트에 `.figma.tsx` 매핑을 붙여 Dev Mode에서 코드 스니펫이 뜨게 한다.

---

## Do / Don't 요약

**Do** — 층은 그림자로, 아이콘은 공용 글리프로, 값은 이 문서/토큰에서만, 숫자는 tabular-nums, plate 고정.
**Don't** — 카드에 테두리로 위계 주기, 이모지 아이콘, 화면당 orange 2개, lime 장식, `mute`로 본문, 카드 중첩, 라벨/카피를 화면마다 다르게.
