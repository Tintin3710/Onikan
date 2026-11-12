# final-screens-16px (2026-11-11, 2026-11-12 갱신)

Figma에서 좌우 여백 16px 기준으로 다시 내보낸 화면. 옛 `final-screens/`(20px, Onikan `fa259e7`)를 대체해 갈 예정.
앱 캡처 비교(visual regression)는 아래 핵심 5장만 쓰기로 했다(2026-11-12). 나머지 15장은 다시 내보내지 않는다.

모두 폭 390px(1x)로 맞춰 저장했다. 01·08은 전달받은 이미지가 축소본이라 390폭으로 다시 키웠다 — 글자 가장자리가 약간 흐릴 수 있다.

| 파일 | 크기 | 대응 fixture | 그림 데이터 vs fixture 데이터 |
|---|---|---|---|
| `01-home-study-before.png` | 390×1025 | `01-home-study-before` | 그림: 재료 0/4(밥·참치·마요네즈·김), 오늘 단어 22개·약 5분, 메뉴판 0%, 최근 획득 카드 있음 / fixture: 재료 2/5, 20개·약 6분, 메뉴판 60% |
| `02-study-front.png` | 390×844 | `02-study-front` | 그림: 過剰 かじょう / fixture: 勉強 べんきょう |
| `03-study-reveal.png` | 390×844 | `03-study-reveal` | 그림: 過剰 · 과잉, 과다 (예문은 勉強 문장) / fixture: 勉強 · 공부, 학습 |
| `05-study-result.png` | 390×844 | `05-study-result` | 그림: 새 재료 김 4/4, '아직이라고 표시한 단어 3', 상태바 '5G · 92%', 확인 버튼이 채워지는 중간 프레임 / fixture: 참치마요 4/4 |
| `08-home-review-done.png` | 390×1138 | `08-home-review-done` | 그림: 오늘 학습 완료·단어 20개, 참치마요 주먹밥 1/4, 이어서 회독(챕터 1 · 0/51), 메뉴판 0% / fixture: 복습까지 마친 상태 |
| `first-pass-result.png` | 390×844 | 없음 | 첫 확인 결과 화면(12/12). fixture 새로 필요 |

## 기준 이미지로 쓸 때 주의
- 그림 데이터가 fixture와 달라 그대로 비교하면 글자·숫자 부분이 전부 차이로 잡힌다. 쓰려면 fixture를 그림에 맞추거나, 그림을 fixture에 맞춰 다시 내보내야 한다.
- 01·08은 홈 긴 화면이라 비교 도구가 위 756px + 아래 탭바 88px만 잘라 쓴다.
- `ui/manifest.json`의 designRoot가 다른 컴퓨터 경로(`/Users/tyoung/...`)라 이 컴퓨터에서 `ui:approve --from-design`은 그대로 돌지 않는다.
