# 3단계 — 컴포넌트 명세 (SEED 형식, 2026-11)

> 상태: **1차 묶음 확정** (버튼 · 평가 버튼 · 탭바, C3-1~4 2026-11-11). 값의 정본은 [`DESIGN.md`](../DESIGN.md), 이 문서는 **개발자가 Figma 없이 만들 수 있게** 컴포넌트마다 구조·속성·상태별 값을 한곳에 모은 것이다.
> 근거: Figma 라이브러리 실측(2026-11-11, 파일 `UiXc63pKkJr8WpkKqFVGBr`) + 앱 코드(`AshitaKanji` fork `d7d9011`의 `src/components/ui/Button.tsx` · `MainTabBar.tsx`).
> 형식: [01-NAMING-SEED N-6](./01-NAMING-SEED-2026-11.md) — SEED 컴포넌트 문서의 **개요 · 구조 · 속성 · 명세 표 · 가이드라인**을 따른다.

## 읽는 법

- **구조**: 컴포넌트를 이루는 부분(슬롯) 이름. 명세 표의 "슬롯" 칸이 이 이름을 쓴다.
- **속성**: Figma 변형·속성 = 코드 prop. 이름을 맞춰 둔다.
- **명세 표**: `상태 × 슬롯 × 속성 → 토큰 (라이트 값)`. 다크 값은 토큰이 알아서 바꾼다 — 코드에 hex를 쓰지 않는다.
- **상태 이름**: `enabled`(기본) · `pressed`(누르는 중) · `disabled`. SEED와 같은 이름.
- 결정 기록은 맨 아래 [결정](#결정-2026-11-11-확정--추천안대로)에 있다.

---

## 1. `button`

### 개요
화면에서 행동을 시작하는 알약 버튼. **화면당 주요 버튼(`primary`)은 하나.** 같은 자리에 두 번째 행동이 필요하면 `secondary`나 `outline`을 쓴다. 오렌지 버튼(`brand`)은 없앤다(C3-3).

### 구조
| 슬롯 | 설명 |
|---|---|
| `root` | 알약 모양 면. 누르는 영역 전체 |
| `label` | 가운데 글자 한 줄 |

### 속성
| 속성 | 값 | 기본 | Figma | 코드 |
|---|---|---|---|---|
| `variant` | `primary` · `outline` · `secondary` · `subtle` | `primary` | 컴포넌트 이름 `button-primary` · `button-outline` · `button-secondary` · `button-subtle` | `variant` (`brand` 삭제 C3-3, `ink`는 `primary`와 같음) |
| `size` | `large` 56 · `medium` 44 | variant마다 다름(아래) | 없음 — 컴포넌트마다 고정 | `size` 추가, `tall`(60) · `compact`(48) 삭제 (C3-2) |
| `label` | 글자 | — | `Label` 텍스트 속성 | `label` |
| `disabled` | true · false | false | 없음 | `disabled` |

### 명세 표 — 공통
| 슬롯 | 속성 | `large` | `medium` |
|---|---|---|---|
| `root` | 높이 | `layout.cta-height` **56** | `layout.touch-target` **44** |
| `root` | 좌우 여백 | `x5` 20 | `x5` 20 (`subtle`은 `x4` 16) |
| `root` | 위아래 여백 | `x4` 16 | `x3` 12 |
| `root` | 반경 | `pill`(= `full` 9999) | `pill` |
| `label` | 글자 | `button/large` 18/24 600 | `button/md` 16/20 600 |
| `root` | 폭 | 화면 하단 CTA는 꽉 채움(좌우 `gutter` 16 안쪽), 그 밖은 글자에 맞춤 | 글자에 맞춤 |

### 명세 표 — variant × 상태
| variant | 기본 크기 | 상태 | `root` 배경 | `root` 테두리 | `label` 색 |
|---|---|---|---|---|---|
| `primary` | large | enabled | `ink` #1D1D21 | 없음 | `on-ink` #F7F7F9 |
| | | pressed | `ink-pressed` #131316 | 없음 | `on-ink` |
| `secondary` | medium | enabled | `canvas` #FFFFFF | 없음 | `ink` |
| | | pressed | `soft` #E8E8EC | 없음 | `ink` |
| `subtle` | medium | enabled | `soft` #E8E8EC | 없음 | `ink` |
| | | pressed | `pressed` #DCDCE2 | 없음 | `ink` |
| `outline` | large | enabled | `canvas` | 1.5 `pressed`, 안쪽 | `ink` |
| | | pressed | `soft` | 1.5 `pressed` | `ink` |
| 모두 | — | disabled | enabled와 같음 + **투명도 0.4** | — | — |

- 눌림은 **색만 바꾼다.** 크기 줄이기·투명도 변화 금지 (DESIGN.md "press: 살짝 밝게/어둡게").
- 다크 모드에서 `ink`는 밝은 색으로 뒤집히고 `on-ink`는 어두워진다. `ink-pressed`도 한 단계 밝은 쪽(#FFFFFF)으로 간다.

### 가이드라인
- ✅ 화면 아래 CTA = `primary` large, 꽉 채움.
- ✅ 주요 버튼 옆 약한 행동 = `outline` large (예: "나중에"), 카드 안 작은 행동 = `subtle` medium (예: "단어 상세").
- ❌ `primary` 두 개 나란히. ❌ 오렌지 버튼을 주요 액션으로 (주요 = 잉크, D-3).
- ❌ 라벨 두 줄. 넘치면 문구를 줄인다.

---

## 2. `grade-button`

### 개요
학습 카드 뒷면에서 스스로 평가하는 **버튼 한 쌍**. 왼쪽 약한 버튼(`Again`) + 오른쪽 강한 버튼(`Good`). 4단계 평가는 없다(D0-5).

### 구조
| 슬롯 | 설명 |
|---|---|
| `group` | 두 버튼을 가로로 놓는 줄 (화면 쪽에서 만든다) |
| `root` | 버튼 하나 |
| `label` | 글자 |

### 속성
| 속성 | 값 | Figma | 코드 |
|---|---|---|---|
| `state` | `Again` · `Good` | `State` 변형 | `outline` · `ink` variant (`Button`) |
| `label` | 학습: `다시 볼래요` · `한 번 익혔어요` / 회독: `모름` · `안다` | `Label` 텍스트 속성 | `label` |

### 명세 표
| 슬롯 | 속성 | `Again` | `Good` |
|---|---|---|---|
| `group` | 배치 | 가로, 사이 `x2` **8**, 두 버튼 **같은 폭** (390 화면: 175 + 8 + 175) | ← |
| `root` | 높이 | `layout.cta-height` **56** | 56 |
| `root` | 여백 | 좌우 `x5` 20 · 위아래 `x4` 16 | ← |
| `root` | 반경 | `pill` | `pill` |
| `root` | 배경 (enabled) | `canvas` | `ink` |
| `root` | 배경 (pressed) | `soft` | `ink-pressed` |
| `root` | 테두리 | 1.5 `pressed`, 안쪽 | 없음 |
| `label` | 글자 | `card-title` 17/24 600 | `card-title` |
| `label` | 색 | `ink` | `on-ink` |
| — | FSRS 결과 | **Again** — 오늘 줄 맨 뒤로 | **Good** — 며칠 뒤 복습 |

- 처음 누를 때 결과 안내(바텀시트·토스트)는 [`study-first-tap-feedback-SPEC.md`](../handoff/study-first-tap-feedback-SPEC.md).
- 코드 `tall`(60)은 D0-5로 **56**이 됐다 → [02 C-11](./02-CODE-CHANGES-2026-11.md).

### 가이드라인
- ✅ 항상 둘이 한 쌍. 약한 쪽 왼쪽, 강한 쪽 오른쪽.
- ❌ `다시 볼래요`에 빨강·경고색. 실패가 아니다 (O-4).
- ❌ 오렌지 사용.

---

## 3. `tab-bar`

### 개요
메인 4개 화면(오늘·메뉴·기록·설정)을 오가는 하단 탭. 활성 탭만 `tab-active`(진한 오렌지)로 칠하고, 아이콘은 채움형으로 바뀐다. 밑줄·배경·뱃지 없음.

### 구조
| 슬롯 | 설명 | Figma 컴포넌트 |
|---|---|---|
| `bar` | 탭 4개를 담는 줄 | `Bottom Navigation` |
| `item` | 탭 한 칸 (누르는 영역) | `tab-item` |
| `icon` | 24 아이콘, 선형 / 채움형 | `icon` (`name` × `style`) |
| `label` | 탭 이름 | — |

### 속성
| 컴포넌트 | 속성 | 값 |
|---|---|---|
| `Bottom Navigation` | `Active` | `today` · `menu` · `record` · `setting` |
| `tab-item` | `Tab` | `today` · `menu` · `record` · `setting` |
| `tab-item` | `Active` | `false` · `true` |
| `icon` | `name` | `today`(오니기리) · `menu`(책) · `record`(시계) · `setting`(슬라이더) |
| `icon` | `style` | `line`(비활성) · `fill`(활성) |

### 명세 표
| 슬롯 | 속성 | 값 |
|---|---|---|
| `bar` | 배경 | `canvas` (다크에서 어두워짐) |
| `bar` | 위 테두리 | 1px `pressed` |
| `bar` | 여백 | 위 8 · 아래 12 (+ 기기 하단 안전 영역) · 좌우 0 |
| `bar` | 배치 | 가로, 4칸 **같은 폭** (390 화면: 97.5) |
| `item` | 크기 | 높이 **44** (= `touch-target`), 세로 배치, 가운데 정렬, 사이 **2** |
| `icon` | 크기 | **24** |
| `label` | 글자 | 비활성 `tab-label` 12/16 500 · 활성 `tab-label-active` 12/16 600 |

| `Active` | `icon` style | `icon` 색 | `label` 색 |
|---|---|---|---|
| false | `line` | `body` #56565E | `body` |
| true | `fill` | `tab-active` #C2410C | `tab-active` |

- `tab-active`는 `primary`와 다른 토큰이다. 흰 배경 위 12px 글자는 4.5:1이 필요해서 라이트 #C2410C(대비 4.63:1 이상), 다크 #F97316. `primary` #EF5112는 3.2:1로 미달.
- 눌림 상태는 따로 없다 — 누르면 바로 화면이 바뀐다 (C3-4).

### 가이드라인
- ✅ 탭 이름은 두 글자 고정: 오늘 · 메뉴 · 기록 · 설정.
- ❌ 뱃지·빨간 점. ❌ 활성 탭 배경 칠하기. ❌ 활성 색에 `primary` 사용.

### 코드와 다른 점 (→ [02 C-18](./02-CODE-CHANGES-2026-11.md))
| 항목 | 코드 지금 (`MainTabBar.tsx`) | 명세 |
|---|---|---|
| 여백 | 위 16 · 아래 24 · 좌우 20 | 위 8 · 아래 12 · 좌우 0 |
| 탭 크기 | 72 × 54, 사이 8 | 같은 폭 4칸 × 44, 사이 2 |
| 라벨 | 14 Regular | 12/16 500 · 활성 600 |
| 아이콘 | 선형 하나, 색만 바뀜 | 활성은 채움형 |

---

## 결정 (2026-11-11 확정 — 추천안대로)

| # | 질문 | 선택지 | **확정** | 이유 |
|---|---|---|---|---|
| C3-1 | `secondary`에 테두리를 둘까? | A. 흰 면만 (지금 Figma·코드) / B. 흰 면 + 1.5 `pressed` 테두리 (DESIGN.md·COMPONENTS.md 본문) | ✅ **A + `outline`을 따로 둔다** — Figma `button-outline` 추가(`656:30`) | 코드는 이미 `secondary`(테두리 없음)와 `outline`(테두리)이 나뉘어 있다. 문서 본문만 둘을 섞어 썼다. Figma에 `button-outline`(large)을 추가하고 문서 본문을 고친다 |
| C3-2 | 버튼 크기 단계 | 지금 코드 56 · 60(`tall`) · 48(`compact`) · 44(`subtle`) | ✅ **`large` 56 · `medium` 44 두 개** | 60은 D0-5로 56이 됐고, 48은 다른 단계와 겹친다. SEED처럼 크기를 속성으로 둔다 |
| C3-3 | 오렌지 `brand` 버튼 | 남김 / 없앰 | ✅ **없애고 `primary`로** | 주요 = 잉크(D-3). 코드 주석상 오늘 복습 HTML 화면의 `.cta`에만 남아 있다 — 해당 화면 확인 후 정리 |
| C3-4 | 탭 눌림 상태 | 없음 / 아이콘·라벨 `body` → `ink` | ✅ **없음** | 누르면 바로 화면이 바뀐다 |

## 다음 묶음

`card` · `card-tinted` · `kanji-tile` · `list-row` · `toast` · `stepper` — 2026-11 Figma 라이브러리에 있는 나머지. 그다음 0단계 후보(`SessionTopBar` · `SummaryCard` · `StudyCard`)는 Figma 컴포넌트를 먼저 만든 뒤 명세를 쓴다.
