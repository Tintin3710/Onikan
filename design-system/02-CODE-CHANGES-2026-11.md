# 2026-11 정본 정렬 — 코드·Figma 변경 목록

> 근거: [`00-DECISIONS-2026-11.md`](./00-DECISIONS-2026-11.md) · [`DESIGN.md` beta.1](../DESIGN.md)
> 개발 저장소 기준: `taiyoungkim/AshitaKanji` `upstream/main@7ed887e`. 파일 경로는 그 저장소 기준.
> 이 목록은 **개발자가 Figma 없이 읽고 적용할 수 있게** 쓴다. fork(`Tintin3710/AshitaKanji`)에서 PR로 보내거나 개발자에게 그대로 전달한다.

## A. 코드 — 값만 바뀌는 것 (위험 낮음)

| # | 파일 | 지금 | 바꿀 값 | 근거 |
|---|---|---|---|---|
| C-1 | `src/design/tokens.ts` `lightColors.softer` | `grey.g97` (#F2F2F4) | `'#F5F5F5'` | D0-2 |
| C-2 | `src/design/tokens.ts` `HTML_FLOW_PAGE` | `'#F4F2EF'` | **삭제** → 사용처 5곳을 `colors.softer`로: `features/reading/ReadingStudyScreen.tsx` · `features/reading/ReadingChaptersScreen.tsx` · `features/home/TodayWordsScreen.tsx` · `features/home/components/HomeSections.tsx` · `features/weakness/WeaknessScreen.tsx` | D0-2 (페이지 배경은 하나) |
| C-3 | `darkColors.tabActive` | `'#EA580C'` | `'#F97316'` | D0-9 |
| C-4 | `darkColors.primaryPressed` | `'#FB923C'` | `'#FA8432'` | D0-10 |
| C-5 | `radius.receipt` | `4` | `10` (주석 "radius 4"도 수정) | D0-11 |
| C-6 | `layout.gutter` | `20` | `16` | D0-1 |
| C-7 | `layout.gapGroup` | `28` | `24`, 그리고 `gapSection: 40` 추가 | D0-4 |
| C-8 | `layout.gradeButtonHeight` | `60` | `56` | D0-5 |
| C-9 | `spacing` | 24 없음, 이름 `xs…huge` | `x6: 24` 추가하고 이름을 `x1 x2 x3 x4 x5 x6 x7 x10`으로 변경 (값 그대로, 사용처 함께 변경) | D0-4 · N-1 |
| C-9b | `radius` | `card 24` · `tile 18` · `tileMd 14` · `tileSm 12` · `pill 999` · `receipt 4` | SEED 단계로: `r2_5: 10` · `r3: 12` · `r3_5: 14` · `r4: 16` · `r5: 20` · `r6: 24` · `full: 9999` + 별칭 `card`(=r6) · `cardTinted`(=r5) · `receipt`(=r2_5) · `pill`(=full). `tile` 18 → `r4` **16**, `tileMd` → `r3_5`, `tileSm` → `r3`. 화면에 직접 쓴 `borderRadius: 18` → 16, `22`(회색 카드) → 20 | N-3 |
| C-10 | `src/design/tokens.test.ts` | softer 기대값 없음/옛값 | C-1·C-3·C-4 값으로 기대값 추가·갱신 | 회귀 방지 |

## B. 코드 — 화면에 영향 있는 것

| # | 범위 | 할 일 | 근거 |
|---|---|---|---|
| C-11 | 평가 버튼 (`features/study/components/StudyActions.tsx`·`StudyActionBar.tsx`) | 두 버튼 같은 폭(flex 1), 높이 56, 사이 8 | D0-5 |
| C-12 | 흰 카드 반경 | 화면에 직접 쓴 `borderRadius: 22` 3곳 → `radius.card`(24) | D0-3 |
| C-13 | 타이포 토큰 추가 | `displayMd 24/32 700` · `bodyMd 16/24 400` · `bodyMdStrong 16/22 600` · `bodySm 14/20 400` · `bodySmStrong 14/20 600` · `buttonMd 16/20 600` | 감사표 §1 |
| C-14 | 직접 쓴 글자 크기 | `fontSize: 16`(8곳)·`14`(5곳) → C-13 토큰. 많은 곳: `WordDetailScreen` 7 · `StudyCard` 4 · `ScanScreen` 4 · `Receipt` 4 | 감사표 §2 |
| C-15 | 직접 쓴 간격 `24`(8곳) | C-9 토큰으로 | 감사표 §2 |
| C-16 | 좌우 여백 16 반영 확인 | C-6 이후 홈·학습·결과·회독·설정 화면이 모두 `layout.gutter`를 쓰는지 확인 (직접 쓴 20 없는지) | D0-1 |
| C-17 | 타이포 이름 통일 | `screenTitle`→`displayXl` 식으로 DESIGN.md 이름에 맞춰 변경 (N-5 확정 후) | D0-13 |

| C-18 | 탭바 (`MainTabBar.tsx`) | 실제 코드 값(fork `d7d9011`): padding 위 16 · 아래 24 · 좌우 20, 탭 72×54 · gap 8, 라벨 14 Regular, 배경 `canvas`(이미 맞음). → 위 8 / 아래 12(+안전 영역) · 좌우 0, 탭 4칸 같은 폭 × 44 · gap 2, 아이콘 **24**, 라벨 `tab-label` 12/500 · 활성 600, 비활성 `body`, 활성 아이콘 채움형. 상세: [03 §3](./03-COMPONENT-SPECS-2026-11.md) | 2026-11-11 Figma 탭바 재구성 |
| C-19 | 버튼 크기 (`components/ui/Button.tsx`) | `size: 'large' | 'medium'`(56 / 44) 추가, `tall`(60)·`compact`(48) 삭제. `tall` 6곳(`StudyActionBar` 2 · `RecallStage` 2 · `TutorialScreen` 2) → large, `compact` 2곳(`HomeSections:89` · `StatsScreen:175`) → large(카드 안이면 medium). `secondary` 기본 높이 56 → **44**(medium) | C3-2 |
| C-20 | 오렌지 버튼 삭제 | `variant="brand"` 3곳 → `primary`: `ReadingChaptersScreen:165` · `RecallStage:52`("뜻 보기") · `WeaknessScreen:228`("오늘로 돌아가기"). 이후 `brand` variant 삭제 | C3-3 |
| C-21 | 토스트 (`components/Toast.tsx`) | 좌우 여백 20 → 16, 글자 `bodyStrong` 15/600 → `bodySm` 14/400 (C3-7), `type: 'plain' | 'reward'` 추가 — reward면 14 라임 체크(선 2, `secondary`) | 03 §8 |
| C-22 | 카드 여백 | `Card`에 `padding: 'compact' | 'default' | 'spacious'`(16·20·24) 추가, 화면에 직접 쓴 18 등은 가까운 단계로 (C3-5) | 03 §4 |
| C-23 | 목록 줄 (`ListRow`) | 최소 높이 64/68 삭제 → 여백 16/20으로 높이 결정, gap 14 → 12 | C3-6 · 03 §7 |

**C-6·C-12·C-1은 거의 모든 화면에 보이는 변화**다. 적용 후 `npm run ui:capture` → `ui:diff`를 다시 돌리고, 기준 이미지는 갱신된 Figma 화면으로 `ui:approve -- --from-design` 해야 한다(옛 기준 이미지는 여백 20 시절).

## C. Figma — 디자이너 쪽 할 일

| # | 대상 | 할 일 | 근거 |
|---|---|---|---|
| F-1 | `softer` 변수 | Foundations 견본(#F2F2F4)과 화면(#F5F5F5)이 다름 → 변수 중복 여부 확인, 하나로 합쳐 #F5F5F5 | D0-2 |
| F-2 | 텍스트 스타일 `button/md` | 굵기 500 → 600 | D0-14 |
| F-3 | 색 변수·견본 추가 | `primary-pressed` · `bar-fill` · `primary-soft` · `secondary-soft` · `ink-pressed` (라이트·다크) | D0-12 |
| F-4 | 반경 변수 | `radius-receipt = 10` 추가 | D0-11 |
| F-5 | 학습완료 화면 (`615:1611`) | 좌우 여백 20 → 16, 요약 카드 반경 22 → 24, 제목→카드 24·이미지→제목 30 → 24, 카드→안내문 14 → 12 | D0-1·3·4 |
| F-6 | 학습 카드 화면 (`615:1527`) | 소수점 값 정리(오토 레이아웃 + 정수 토큰), 텍스트 스타일 연결, 평가 버튼 같은 폭·높이 56·사이 8 | D0-5·16 |
| F-7 | 두 화면 공통 | 외부 변수(`Labels/Primary`, `Background/Elevated/Normal`, `Margin/Action/Normal Horizontal`) → 오니칸 변수 | D0-15 |
| F-8 | 라이브러리 | `button-primary` 잉크 · `tab-bar` 아이콘형 · `grade-button` 2버튼 (2단계 본작업) | D0-7·8, 감사표 P6 |
| F-9 | 간격·반경 변수 | 간격 `xs…huge` → `x1…x10`. 반경을 SEED 단계(`r2_5` `r3` `r3_5` `r4` `r5` `r6` `full`)로 바꾸고 `md` 18→**16**, `lg` 22→**20**(`card-tinted`), `pill` 999→`full` 9999 (표는 01-NAMING) | N-1 · N-3 확정 |

## D. 2단계 진행 기록 — Figma (2026-11-10)

Figma API로 직접 고친 것과, 글꼴 제약 때문에 **디자이너가 손으로 해야 하는 것**을 나눠 적는다.
API 실행 환경에 `Pretendard JP`가 설치돼 있지 않아 **글자 내용·텍스트 스타일 변경은 스크립트로 불가**하다(색 변경은 가능).

### 완료 (API)

| # | 내용 | 결과 |
|---|---|---|
| F-1 | `softer` | 원시값 `grey/97`이 #F5F5F5로 덮여 있던 것을 **#F2F2F4로 복구**. 새 원시값 `neutral/page #F5F5F5`를 만들고 `softer`(라이트)가 이것을 가리키게 함 → DESIGN.md와 같은 구조(그레이 단계는 그대로, 페이지 배경만 예외) |
| F-3 | 색 변수 추가 | `primary-soft`(#FCE8DE / 다크 #3A2216) · `secondary-soft`(#EAF6DD / #26301A) · `ink-pressed`(grey/10 / white). 원시값 `orange/soft(-dark)` · `lime/soft(-dark)` 추가. `primary-pressed` · `bar-fill`은 이미 있었음 |
| F-4 · F-9 | 반경 | SEED 단계 `r2_5 10` · `r3 12` · `r3_5 14` · `r4 16` · `r5 20` · `r6 24` · `full`. 기존 역할 변수는 **이름·ID 유지**(연결된 레이어 보존)하고 값만 별칭으로: `card`→r6, `card-tinted`(옛 `lg` 22)→r5 **20**, `receipt` 4→r2_5 **10**, `pill`→full. `sm`→`r3`, `md` 18→`r4` **16** |
| F-9 | 간격 | `xs…huge` → `x1…x10` 이름 변경(ID 유지, 값 그대로). `layout/*` 역할 변수 7개 추가: gutter→x4 · gap-tight→x3 · gap-group→x6 · gap-section→x10 · touch-target 44 · cta-height 56 · session-top-bar 52 |
| F-8 | `button-primary` | 채움 `primary`(주황) → **`ink`**, 라벨 → `on-ink`. 인스턴스 242개 중 239개는 이미 잉크로 덮어써 있어 변화 없음. **원본을 따르던 3개만 주황→잉크로 바뀜**: 포폴 페이지 `온보딩`·`회독`, Screens `회독 상세` |
| F-8 | `grade-button` | 4단계 → **2버튼**: `State=Again`(canvas + 1.5 `pressed` 테두리, `ink` 라벨) · `State=Good`(`ink` 채움, `on-ink` 라벨). 175×56, 높이 `layout/cta-height`, 반경 `pill` 연결. 옛 `Hard`·`Known`은 지우지 않고 `_legacy grade-button 4-step` 프레임으로 옮김(컴포넌트 데모 페이지에서만 쓰임) |

| F-11 | `grade-button` 여백 (2026-11-11) | 위아래 여백 20 → `x4` **16** (높이 56 고정 안에 20+24+20이 들어가 있던 것). 좌우 `x5` 20 그대로 |
| F-10 | 컬러 스타일 (2026-11-11) | 스타일 0개 → **39개 등록**, 모두 `Color` 변수에 연결(라이트·다크 자동 전환). 이름은 SEED의 속성 묶음 `bg/` · `fg/` · `stroke/` + 오니칸 역할 이름(N-4 유지). 어느 묶음에 넣을지는 변수 사용 범위(scope)로 정함: 채움 → `bg/`, 글자 → `fg/`, 테두리 → `stroke/`. 여러 용도 색(`ink` · `secondary` · 상태 4색 등)은 쓰이는 묶음마다 스타일이 있음. 원시값(`grey/*` 등)과 `shadow`(그림자 전용)는 스타일로 만들지 않음 |

### 손으로 할 것 (글꼴 필요)

| # | 위치 | 할 일 |
|---|---|---|
| M-1 ✅ | 텍스트 스타일 `button/md` | 굵기 Medium → **SemiBold** (F-2) — 2026-11-11 완료 |
| M-2 ✅ | `grade-button` 라벨 | `모름` → **다시 볼래요**, `쉬움` → **한 번 익혔어요** (2026-11-10 문구 변경, `handoff/study-first-tap-feedback-SPEC.md`), 두 라벨 스타일 → `card-title`(17/600). 2026-11-11 완료 (화면 B 인스턴스 반영 확인) |
| M-3 ✅ | `tab-bar` (Navigation 페이지) | 텍스트+밑줄 → 아이콘 + 라벨, 활성 `tab-active` (D0-8). 2026-11-11: 디자이너가 아이콘형으로 다시 그리고, API로 구조 정리 — `icon`(name × style line·fill, 색 변수 연결, `Fill` 불리언 삭제, 설정 아이콘의 빈 `Ratio` 삭제) · `tab-item`(Tab × Active 8개, 높이 44) · `Bottom Navigation`(Active 4개, 배경 `canvas`, 활성 `primary` → `tab-active`). 옛 `Container` 삭제, 리뷰 프레임 탭바 8개 교체. **남은 것: 라벨 스타일 `code` → `tab-label` / `tab-label-active` (M-7)** |
| M-4 | Foundations 페이지 견본 | `softer` 표기 #F2F2F4 → #F5F5F5, 새 색 3개·반경·간격 이름 견본 갱신 |

### 화면 정리 (F-5 · F-6 · F-7, 2026-11-10)

| # | 화면 | 바꾼 것 |
|---|---|---|
| F-5 | 학습완료 `615:1611` | 좌우 여백 20 → **16** (콘텐츠·CTA 358 폭). 요약 카드 반경을 `radius/card`(**24**)에 연결 — 옛 `radius/lg`에 연결돼 있어 22 → 20으로 같이 바뀌었던 것을 바로잡음. 이미지→제목 30 → **24**(`x6`), 제목→카드 **24**(`x6`), 카드→안내문 14 → **12**(`x3`) 변수 연결 |
| F-6 | 학습 카드 `615:1527` | 소수점 값 정리: 본문 위 22.75 → 24, 좌우 = `layout/gutter`, 카드 안쪽 40/24/24/24 · 간격 28 · 단어 블록 13 → 12 · 발음 10 → 8 모두 변수 연결. 학습 카드는 남은 높이를 채우게(FILL), 아래 34 홈 인디케이터 여백. "단어 상세" 버튼 92.25×37.75 → 높이 **36**, 좌 16 · 우 12. **평가 버튼을 손으로 그린 프레임 → `grade-button` 라이브러리 인스턴스 2개**로 교체(175 + 8 + 175, 높이 56) |
| F-7 | 두 화면 | 상태바의 외부 변수 `Labels/Primary` → `ink` (화면당 6곳). **보이는 레이어에 남은 외부 변수 0개** (A의 숨김 레이어 3곳에만 남음) |
| — | Screens 페이지 | 흰 카드인데 옛 `radius/lg`에 연결돼 있던 카드 2개(`2b.주먹밥 완성`, `04-중간결과-첫학습완료`)도 `radius/card` 24로 다시 연결. 포폴 페이지는 이 변수들을 쓰지 않아 영향 없음 |

### 손으로 할 것 (추가)

| # | 위치 | 할 일 |
|---|---|---|
| M-5 ✅ | 화면 A·B | 텍스트 스타일 연결 — 상태바 `9:41`(iOS 목업)은 제외, A 1개 · B 8개. 카운터 `12 / 12`(A, 14) · `1 / 10`(B, 15) → 둘 다 `body/base-strong`(15/22)로 통일. `過剰` → `display/word` · `かじょう` → `body/lg` · `과잉, 과다` → `display/meaning` · `예문을 들어보세요`(12/20) → `label`(12/16) · 예문 → `body/md` · 번역 → `body/sm` · `단어 상세`(13) → `body/sm-strong`(14/20). 2026-11-11 완료 확인 (스타일 없는 글자는 상태바 시계와 숨긴 레이어뿐) |
| M-7 | `tab-item` 라벨 8개 | 텍스트 스타일 `code`(13) → 비활성 `tab-label`(12 Medium) · 활성 `tab-label-active`(12 SemiBold). 원본 8개만 바꾸면 탭바 4개 변형·리뷰 프레임에 반영 |
| M-6 | Screens `설정`·`QA`의 `stepper` 5개 | 흰 배경인데 옛 `radius/lg`에 연결돼 22 → 20이 됨. 카드로 볼지(24) 컨트롤로 볼지 판단 필요 |

### 남은 한계
- 상태바(61.22 높이 등)는 iOS 목업이라 소수점 값을 그대로 둠 → 학습 카드 높이가 576.78로 계산됨.
- A의 숨김 레이어(옛 hero-card 등)는 지우지 않음.

## E. 주먹밥 완성 화면 — 앱을 디자인에 맞춤 (2026-11-11)

기준: Figma `638:7977` (Screens — Light › 주먹밥 완성) + 모션 시안 `주먹밥 완성.mp4`. 코드: fork `feat/learning-flow-home-ux`, 커밋 전.

### 앱 vs 디자인 차이와 수정

| # | 항목 | 앱 (수정 전) | 디자인 | 코드 |
|---|---|---|---|---|
| E-1 | 배경 | `softer` 회색 | **흰색** `canvas` | `DoneScreen` 완성 상태에서 `rootCrafted` |
| E-2 | 오버라인 `새 메뉴 완성` | 있음(오렌지) | 없음 | 삭제 |
| E-3 | 일러스트 | 176 회색 접시 + 148 이미지 | 접시 없이 140 | `Image` 140 |
| E-4 | `완성` 뱃지 | 라임, 접시 우하단에 겹침 | 오렌지 소프트 + `link` 글자, 이름 바로 위 가운데 | `StatusBadge kind="crafted"` 추가 |
| E-5 | 메뉴 이름 | `연어` 26/34 | `참치마요 오니기리` 24/32 | `{name} 오니기리`, 24/32 700 |
| E-6 | 지표 | 왼쪽 정렬 숫자 + 라벨, 배경 없음, `학습 시간(분)` | 가운데 정렬 타일 3개(66, 테두리), 값에 단위 `6분`·`5일` | `StatTile variant="summary"` 추가 |
| E-7 | 사장님 한마디 | 가운데 인용문 한 줄 `“오늘 것도 잘 만들었네.” · 사장님` | CTA 위 카드: 고양이 + `참치마요는 내 최애야.` + `- 사장님` | `OwnerQuoteCard` 신규, 메뉴 데이터에 `ownerLine` 추가 |
| E-8 | CTA 아래 여백 | 홈 인디케이터 + 28 | 홈 인디케이터만 (화면 끝 32) | `ctaCrafted` |
| E-9 | 색종이 | 없음 | 43조각·4색·네 번 터짐(2.5초) | `CraftedConfetti` 신규 — Figma 키프레임을 데이터로 생성해 그대로 재생, 한 번만 (처음엔 온보딩 색종이를 재사용했으나 조각 수·색·터짐 횟수가 달라 교체) |
| E-10 | 사장님 카드 모션 | 없음 | (디자인엔 없음, 2026-11-11 추가 결정) | 0.6초 뒤 16px 올라오며 등장(약한 스프링) → 고양이 6px 한 번 폴짝. 카드 바운스는 하지 않음 |

확인: `tsc` · `eslint` 통과, 단위 테스트 303개 통과, iPhone 17 Pro 시뮬레이터 캡처(`06-onigiri-complete`)로 배치 확인. 시뮬레이터 화면 녹화로 색종이 네 번 터짐과 카드 등장·고양이 폴짝을 확인함.

| E-10 | 메뉴 24종 이후 | 96세션 뒤 보상이 조용히 멈춤 | (디자인 없음, 기획 결정 A) | **순환**: 1번부터 다시 만들기, `n번째 완성` · `완성 ×n` · `다시 만드는 중`. 상세는 `handoff/onigiri-menu-SPEC.md` §6 |

### 정해야 할 것

| # | 질문 | 지금 적용한 것 |
|---|---|---|
| E-Q1 | 완성 화면만 흰 배경으로 둘까? (D0-2 "페이지 배경은 `softer` 하나"의 예외) | 디자인대로 흰색. DESIGN.md에 예외로 적음 |
| E-Q2 | 메뉴별 사장님 한마디 문구 (24개) | `참치마요`만 디자인 문구. 나머지는 기본 `오늘 것도 잘 만들었네.` |
| E-Q3 ✅ | 요약 타일 라벨 14/500에 맞는 텍스트 스타일이 없음 | **`body/sm`(14/20 400)으로 맞춤** (2026-11-11). 코드 반영. Figma 타일 라벨 3개는 손으로 `body/sm` 연결 필요 |
| E-Q4 | 코드 좌우 여백은 아직 20 (D0-1 16은 4단계) | 사장님 카드·CTA가 디자인보다 좌우 4씩 좁음. 4단계에서 같이 해결 |

### Figma 쪽 남은 것
- `hero-card`·`progress-card`가 화면 안 일반 프레임 → 라이브러리 컴포넌트(`stat-tile/summary`, `owner-quote-card`)로 만들기.
- 타일 글자에 텍스트 스타일 연결 (손으로): 값 `20`·`6분`·`5일` → `body/md-strong`, 라벨 `학습 단어`·`학습 시간`·`단골 기록` → `body/sm`.
