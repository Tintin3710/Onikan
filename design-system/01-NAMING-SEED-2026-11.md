# 1단계 — 토큰 이름 정리안 (SEED 참고, 2026-11)

> 상태: **확정** — N-1·N-4 2026-11-09, N-3 2026-11-10(SEED 반경 단계와 대조 후). `DESIGN.md` beta.1에 반영 완료. 값은 이미 [`DESIGN.md` beta.1](../DESIGN.md)에 확정했다. 이 문서는 **이름**만 다룬다.
> 왜 필요한가: 같은 값을 문서·Figma는 `display/md`, 코드는 `screenTitle`처럼 다르게 부르고(감사표 §1), 간격은 `xxl 28`과 `2xl 24`가 나란히 있어 헷갈린다. 이름이 하나여야 Figma 없이 저장소만 보는 개발자에게도 정확히 전달된다.

## SEED에서 확인한 것 (seed-design.io, 2026-11-09)

| 범주 | SEED 방식 | 예시 (공식 문서 표기 그대로) |
|---|---|---|
| 색 | **팔레트 → 역할** 2단계. 역할 이름 = `속성.역할-변형-상태` | `$color.bg.brand-solid` · `$color.bg.brand-solid-pressed` · `$color.fg.brand-contrast` · `$color.stroke.neutral-muted` · `$color.bg.layer-default` |
| 색 역할 단어 | brand · neutral · positive · warning · critical · informative | `$color.bg.warning-weak` · `$color.fg.positive-contrast` |
| 간격 | 이름 = 값 ÷ 4: `x1` = 4px, `x4` = 16px, `x0_5` = 2px | `$dimension.x4` |
| 레이아웃 간격 | 값과 별도로 **용도 이름** | `$dimension.spacing-x.global-gutter`(= x4, 16px) · `spacing-y.nav-to-title` · `spacing-y.screen-bottom` |
| 반경 | 이름 = 값 ÷ 4, 16까지는 2px 반단계(`_5`). 전체: `r0_5` 2 · `r1` 4 · `r1_5` 6 · `r2` 8 · `r2_5` 10 · `r3` 12 · `r3_5` 14 · `r4` 16 · `r5` 20 · `r6` 24 · `full` 9999. 사용 규칙은 비공개(확인된 것: `r1` = 뱃지·체크마크) | `$radius.r6`(24px) · `$radius.full` — 출처 `packages/rootage/radius.yaml` |
| 타이포 | 크기 단계 `t1`~`t14` + 용도 이름 텍스트 스타일 | `t4Regular` · 용도 스타일 `screenTitle`, `articleBody` |
| 컴포넌트 문서 | 소개 · 구조(Anatomy) · 속성(변형·크기·상태) · 가이드라인 · 명세 표(상태·슬롯·속성·값) | Chip 페이지 기준 (다른 페이지는 미확인) |

참고: SEED의 화면 좌우 여백 `global-gutter`도 **16px**이다. D0-1(여백 16)과 같은 결론.

## 제안 — 무엇을 가져오고 무엇을 남기나

| # | 범주 | 지금 | 제안 | 가져오는 이유 / 남기는 이유 |
|---|---|---|---|---|
| N-1 | 간격 단계 | `xs sm md lg xl 2xl xxl huge` | **`x1 x2 x3 x4 x5 x6 x7 x10`** (4·8·12·16·20·24·28·40) | `xxl`/`2xl` 혼동이 사라지고, 이름만 봐도 값이 보임. 단계 추가도 쉬움 |
| N-2 | 레이아웃 간격 | `layout.gutter` 등 (beta.1에서 신설) | **유지** — `gutter` · `gap-tight` · `gap-group` · `gap-section` · `cta-height` | SEED도 값과 용도를 분리. 화면에는 용도 이름만 쓰게 하면 "30, 14" 같은 임의 값이 줄어듦 |
| N-3 | 반경 | `sm md lg card pill receipt` | **SEED 단계 그대로: `r2_5`(10) · `r3`(12) · `r3_5`(14) · `r4`(16) · `r5`(20) · `r6`(24) · `full`** + 용도 별칭 `card`(=r6) · `card-tinted`(=r5) · `receipt`(=r2_5) · `pill`(=full) | 오니칸 값 중 SEED에 없는 건 18·22뿐 → 각각 16·20으로 맞추면 전부 SEED 단계 안에 들어감 |
| N-4 | 색 역할 | `ink body mute canvas softer soft pressed primary secondary …` | **2단계로 정리하되 오니칸 이름은 유지.** ① 팔레트 = 이미 있는 `grey-99…grey-10` + `orange-*` · `lime-*` 추가 ② 역할 = 지금 이름 그대로 | SEED식 `bg.brand-solid`로 전부 바꾸면 문서·Figma·코드·결정 기록(D-n, O-n)을 다 고쳐야 함. **비용 대비 이득이 작음.** 대신 SEED의 "상태 접미사" 규칙만 가져옴: `-pressed` · `-soft` (이미 `primary-pressed`, `primary-soft`로 맞춰짐) |
| N-5 | 타이포 | 문서·Figma `display/md` · 코드 `screenTitle` | **문서·Figma 이름으로 통일** (D0-13). 코드가 이름 변경 | 22개 스타일이 이미 Figma에 같은 이름으로 있음. SEED `t1~t14` 숫자 체계로 바꾸는 건 이점이 적음 |
| N-6 | 컴포넌트 문서 형식 | COMPONENTS.md: 언제·해부·정확값·상태 | **SEED 형식 차용**: 구조(슬롯 이름) · 속성(변형·크기·상태) · 가이드라인 · **명세 표(상태 × 슬롯 × 속성 × 값)** | 개발자가 Figma 없이 만들려면 "상태별 정확값 표"가 가장 필요함. 3단계에서 적용 |

### 바꾸는 범위 요약
- **이름이 바뀜:** 간격(N-1), 반경 값 이름(N-3), 코드의 타이포 이름(N-5)
- **이름이 그대로:** 색 역할 이름(N-4), 레이아웃 용도 이름(N-2), 문서·Figma의 타이포 이름

## 결정 (2026-11-09 확정)

| # | 질문 | 결정 | 반영 |
|---|---|---|---|
| N-1 | 간격 이름을 `x1…x10`으로 바꿀까? | ✅ **바꾼다.** `xs→x1` `sm→x2` `md→x3` `lg→x4` `xl→x5` `2xl→x6` `xxl→x7` `huge→x10`. 값은 그대로 | DESIGN.md `spacing`·`layout`·본문 참조 전부 |
| N-3 | 반경을 SEED 단계에 맞출까? | ✅ **SEED 단계 그대로 사용.** 단계 밖 값 **18 → 16(`r4`)**, **22 → 20(`r5`, 회색 `card-tinted`)** — 흰 카드 24보다 한 단계 작아 구분은 유지. 14는 `r3_5`로 유지. `pill` 999는 `full` 9999로 합침 | DESIGN.md `rounded`·Shapes 표·규칙, COMPONENTS.md 반경 요약·타일 |
| N-4 | 색을 SEED식 `bg/fg/stroke` 이름으로 전부 바꿀까? | ✅ **바꾸지 않는다.** 상태 접미사(`-pressed`·`-soft`) 규칙만 가져온다 | 변경 없음 |
| N-4b | Figma 컬러 스타일 이름 (2026-11-11) | ✅ **SEED 속성 묶음 + 오니칸 역할 이름**: `bg/softer` · `fg/ink` · `stroke/pressed`. 묶음은 변수 사용 범위(채움·글자·테두리)로 정하고, 스타일은 변수에 연결. 변수 이름은 N-4대로 그대로 | Figma 컬러 스타일 39개 |

### 옛 이름 → 새 이름 (Figma·코드 이름 변경용)

| 범주 | 옛 이름 | 새 이름 | 값 |
|---|---|---|---|
| 간격 | `xs` `sm` `md` `lg` `xl` `2xl` `xxl` `huge` | `x1` `x2` `x3` `x4` `x5` `x6` `x7` `x10` | 4 8 12 16 20 24 28 40 |
| 반경 | `receipt` | `r2_5` (별칭 `receipt` 유지) | 10 |
| 반경 | `sm` | `r3` | 12 |
| 반경 | (코드 `tileMd`) | `r3_5` | 14 |
| 반경 | `md` | `r4` | 18 → **16** (값 변경) |
| 반경 | `lg` | `r5` (별칭 `card-tinted`) | 22 → **20** (값 변경) |
| 반경 | `card` | `r6` (별칭 `card` 유지) | 24 |
| 반경 | `pill` · `full` | `full` (별칭 `pill` 유지) | 999 · 9999 → **9999** |

## 다음 (2단계로 넘길 일)

1. 확정된 이름으로 Figma 변수 이름 변경 (값은 그대로) + `softer` #F5F5F5, `button/md` 600, 견본 누락분 추가
2. Figma 라이브러리 컴포넌트 갱신 (`button-primary` 잉크, `tab-bar` 아이콘형, `grade-button` 2버튼) — 감사표 P6
3. 코드 변경 목록: [`02-CODE-CHANGES-2026-11.md`](./02-CODE-CHANGES-2026-11.md)
