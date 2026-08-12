# Onikan (오니칸)

일본어 단어 학습 게임. 매일 학습을 완료하면 오니기리 재료를 얻어 레시피를 완성하는 보상형 학습 앱.

이 저장소는 **개발자에게 전달하는 디자인·스펙 문서**를 담습니다.

## 문서

- [**DESIGN.md**](./DESIGN.md) — 오니칸 디자인 시스템 (Onikan Design Language)
  - 브랜드 성격 · 색상 사용 의사결정 로직 · 타이포그래피 · 스페이싱 철학 · 컴포넌트 조합 규칙 · Do/Don't
  - 폰트 **Pretendard**, 중립 **Onikan Grey**(hue 228·채도 2.6%), 포인트 **orange-600 `#EA580C`**(전환), 보조 **lime-400 `#A3E635`**(보상 순간 전용), 라이트·다크 1급 지원.
- [**COMPONENTS.md**](./COMPONENTS.md) — 컴포넌트 계약. 재사용 부품을 이름·토큰·정확값으로 고정해 **디자인=개발 일치**를 강제(토큰 SSOT + 컴포넌트 계약 + Code Connect).
- [**handoff/**](./handoff) — 확정 5화면(홈 · 학습 세션 · 완료+영수증 · 도감 · 레시피 상세) 핸드오프 패키지 (README 스펙 · 프로토타입 HTML · 화면 PNG · 토큰)
  - [**handoff/interactions/**](./handoff/interactions) — 인터랙션 프로토타입: 학습 완료 시 **재료 노출**과 **기록 페이지**의 구성·모션 ([MOTION.md](./handoff/interactions/MOTION.md) 스펙 · 프로토타입 HTML)

## 핵심 원칙 한 줄 요약

> 기본은 조용한 **Onikan Grey**(쿨 뉴트럴) + Pretendard. **오렌지는 화면당 단 하나의 주요 행동에만**, **라임은 보상 획득 순간에만**. 나머지는 전부 뉴트럴.
