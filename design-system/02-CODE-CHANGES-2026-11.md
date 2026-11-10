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
