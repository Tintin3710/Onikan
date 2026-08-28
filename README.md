# Onikan (오니칸)

일본어 단어 학습 게임. 매일 학습을 완료하면 오니기리 재료를 얻어 레시피를 완성하는 보상형 학습 앱.

이 저장소는 **개발자에게 전달하는 디자인·스펙 문서**를 담습니다.

## 문서

- [**DESIGN.md**](./DESIGN.md) — 오니칸 디자인 시스템 (Onikan Design Language)
  - 브랜드 성격 · 색상 사용 의사결정 로직 · 타이포그래피 · 스페이싱 철학 · 컴포넌트 조합 규칙 · Do/Don't
  - 폰트 **Pretendard**, 중립 **Onikan Grey**(hue 228·채도 2.6%). **주요 액션 = 잉크 `#1D1D21`**, **오렌지 `#EF5112` = 브랜드·상태**(탭·단골·오버라인·상태), **라임/그린 `#A3E635` = 진척·완료**. 라이트·다크 1급 지원. *(2026-08 색 역할 재정의 D-3)*
- [**COMPONENTS.md**](./COMPONENTS.md) — 컴포넌트 계약. 재사용 부품을 이름·토큰·정확값으로 고정해 **디자인=개발 일치**를 강제(토큰 SSOT + 컴포넌트 계약 + Code Connect).
- [**handoff/**](./handoff) — 확정 5화면(홈 · 학습 세션 · 완료+영수증 · 도감 · 레시피 상세) **+ 단어 상세(11c)** 핸드오프 패키지 (README 스펙 · 프로토타입 HTML · 화면 PNG · 토큰)
  - [**handoff/interactions/**](./handoff/interactions) — 인터랙션 프로토타입: 학습 완료 시 **재료 노출**과 **기록 페이지**의 구성·모션 ([MOTION.md](./handoff/interactions/MOTION.md) 스펙 · 프로토타입 HTML)

## 폰에서 프로토타입 써보기 (개발과 별개)

GitHub Pages로 호스팅돼요. **폰 브라우저로 아래를 열고 탭**하세요:

> **https://tintin3710.github.io/Onikan/**

- 홈 · 학습 완료+영수증 · 도감 · 레시피 상세, **학습 세션(1b)**, **단어 상세(11c)** 를 실제로 탭·전환 (라이트/다크 포함)
- **온보딩 여정(연습)**, **회독(연습)** — 처음 접속 흐름과 회독(스탯·기록·카드 반복 학습) 전체 플로우를 탭으로 체험
- **공유 → 홈 화면에 추가** 하면 주소창 없이 **전체화면 앱**처럼 실행돼요
- 소스: [`handoff/prototypes/`](./handoff/prototypes)

## 저장소 구조

```text
Onikan/                       # 디자인·스펙 문서 저장소 (개발 앱은 별도: taiyoungkim/AshitaKanji)
├─ README.md                  # (이 문서)
├─ DESIGN.md                  # 디자인 시스템 — 토큰·타이포·규칙 (단일 소스)
├─ COMPONENTS.md              # 컴포넌트 계약 — 디자인=개발 일치
├─ index.html                 # 모바일 프로토타입 랜딩(리다이렉트)
└─ handoff/                   # 개발 전달 패키지
   ├─ Onikan Study.dc.html    # 마스터 인터랙티브 프로토타입(확정 5화면·생성형 — 손대지 않음)
   ├─ 11c-word-detail.html    # 단어 상세 단독 프로토타입(오프라인·라이트/다크)
   ├─ README.md               # 5화면 + 11c 스펙 (레이아웃·수치·인터랙션·상태·애니메이션)
   ├─ prototypes/             # 폰에서 탭하는 앱형 프로토타입 + 랜딩(index.html)
   ├─ screens/                # 모든 화면 2x PNG (라이트/다크 + 주요 상태)
   ├─ interactions/           # 재료 노출·기록 모션 프로토타입 + MOTION.md
   └─ assets/ · ingredients/ · onigiri/ · _ds/ · support.js
```

## 핵심 원칙 한 줄 요약

> 기본은 조용한 **Onikan Grey**(쿨 뉴트럴) + Pretendard. **주요 행동은 화면당 잉크 버튼 하나**, **오렌지는 브랜드·상태**(탭·단골·상태 뱃지), **라임/그린은 진척·완료**. 나머지는 전부 뉴트럴.
