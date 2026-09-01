/* ============================================================
   Onikan 온보딩 프로토타입 — app.js
   SPA: 하나의 central state로 화면 전환. Figma 298-44943 기준.

   역할 구분(중요):
     data-screen           = 화면 root
     data-interaction      = 사용자 행동에 반응하는 UI (예: 화면2 CTA fill)
     data-interaction-target = interaction으로 변하는 내부 element (fill layer)
     data-motion           = 별도 Motion Reference(MP4)로 움직일 영역 (지금은 비워둠)

   이번 단계에서는 어떤 animation도 만들지 않는다. 정적 UI + Flow + State만.
   추후 화면5(particle)/화면7(receipt)/화면2(fill)의 모션은
   기존 구조 수정 없이 위 hook에만 붙이면 되도록 설계.
   ============================================================ */

'use strict';

/* 화면5(학습완료)는 자동 전환하지 않는다 — 이동은 오직 사용자 [계속] 클릭.
   (과거 AUTO_ADVANCE_DELAY 자동전환은 학습완료.mp4 스펙에 따라 제거됨) */

/* 테스트용 단어 10개. sim*(발음 유사)는 있을 때만 노출(화면 뒷면). */
const WORDS = [
  { id:1,  w:'勉強', r:'べんきょう', m:'공부, 학습', simA:'しんど', simB:'진도', exJa:'毎日 日本語を 勉強します。', exKo:'매일 일본어를 공부합니다.' },
  { id:2,  w:'時間', r:'じかん',     m:'시간',      exJa:'時間が ありません。',        exKo:'시간이 없습니다.' },
  { id:3,  w:'学校', r:'がっこう',   m:'학교',      exJa:'学校へ 行きます。',          exKo:'학교에 갑니다.' },
  { id:4,  w:'電車', r:'でんしゃ',   m:'전철',      exJa:'電車に 乗ります。',          exKo:'전철을 탑니다.' },
  { id:5,  w:'天気', r:'てんき',     m:'날씨',      exJa:'今日は いい 天気です。',      exKo:'오늘은 좋은 날씨입니다.' },
  { id:6,  w:'名前', r:'なまえ',     m:'이름',      exJa:'名前を 書いて ください。',    exKo:'이름을 써 주세요.' },
  { id:7,  w:'友達', r:'ともだち',   m:'친구',      exJa:'友達と 話します。',          exKo:'친구와 이야기합니다.' },
  { id:8,  w:'料理', r:'りょうり',   m:'요리',      exJa:'料理を 作ります。',          exKo:'요리를 만듭니다.' },
  { id:9,  w:'会社', r:'かいしゃ',   m:'회사',      exJa:'会社に 行きます。',          exKo:'회사에 갑니다.' },
  { id:10, w:'旅行', r:'りょこう',   m:'여행',      exJa:'旅行が 好きです。',          exKo:'여행을 좋아합니다.' },
];

/* central state (화면 로직은 여기만 참조. 화면별 임시 state 만들지 않는다.) */
const state = {
  currentPage: 'onboarding',       // 'onboarding' | 'home'
  onboardingStep: 'intro',         // intro | guide | study | studyComplete | result | finish
  studyIndex: 0,
  isMeaningRevealed: false,
  studyAnswers: [],                // [{ wordId, result:'known'|'again' }]
  isStudyCompleted: false,
  isReceiptOpen: false,
  onboardingExitType: null,        // 'start-learning' | 'later'
};

const app = document.getElementById('app');
let autoAdvanceTimer = null;
let isTransitioning = false;       // 더블클릭/중복 전환 방어

/* ── icons ── */
const icoSpeaker = '<svg viewBox="0 0 18 15" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 5.5v4h2.5L8 12.5v-10L4.5 5.5H2Z"/><path d="M11 4.5a4 4 0 0 1 0 6M13.2 2.5a7 7 0 0 1 0 10"/></svg>';
const icoSpeakerSm = '<svg viewBox="0 0 13 10" fill="var(--secondary-deep)"><path d="M1 4v2h1.6L5 8V2L2.6 4H1Z"/><path d="M7.5 2.8a3 3 0 0 1 0 4.4" stroke="var(--secondary-deep)" stroke-width="1.1" fill="none" stroke-linecap="round"/></svg>';
const icoClose = '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#1D1D21" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
const icoCheck = '<svg viewBox="0 0 24 24" fill="none" stroke="#1D1D21" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7"/></svg>';
const icoChevR = '<svg viewBox="0 0 12 12" width="12" height="12" fill="none" stroke="#8E8E97" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 2.5 8 6l-3.5 3.5"/></svg>';
/* 잠긴 오니기리 타일 — Figma의 둥근 삼각형(오니기리 실루엣) + "?". 색·경로 Figma 실측(320:858/859). */
const icoOnigiriQ = '<svg class="onigiri-q" viewBox="0 0 35.3433 33.1813" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M9.27446 4.84813C13.0066 -1.61604 22.3368 -1.61605 26.0689 4.84813L34.0298 18.6369C37.7619 25.101 33.0968 33.1813 25.6326 33.1813H9.71073C2.24655 33.1813 -2.41857 25.1011 1.31352 18.6369L9.27446 4.84813Z" fill="#CACACE" fill-opacity="0.4"/><path transform="translate(12.07 10.6)" d="M2.41527 14.9618V11.9695H5.27939V14.9618H2.41527ZM5.27939 10.174H2.41527V6.96794L8.33588 5.47176V2.65038H0V0H8.84885L11.2 2.35115V7.28855L5.27939 8.8916V10.174Z" fill="#929299" fill-opacity="0.6"/></svg>';

function statusBar(){ return `<div class="status-bar"><span>9:41</span><span class="r">5G · 92%</span></div>`; }

/* ============================ 화면 렌더 함수 ============================ */

/* 01. 온보딩 시작 */
function renderIntro(){
  return `
  <section class="screen illust-screen" data-screen="onboarding-intro">
    ${statusBar()}
    <div class="body">
      <img class="illust intro-illust" src="assets/intro-mascot.png" alt="사장">
      <div class="intro-copy">
        <p class="lead-title">왔네.<br>여긴 오니기리 가게야.<br>단어를 외우면 재료가 쌓여.</p>
        <p class="lead-byline">-사장</p>
      </div>
    </div>
    <div class="actions">
      <button class="btn btn-primary" data-action="intro-start"><span class="label">시작하기</span></button>
    </div>
  </section>`;
}

/* 02. 시작 전 안내 — CTA에 추후 Button Fill Interaction(hook만 준비) */
function renderGuide(){
  return `
  <section class="screen illust-screen" data-screen="onboarding-guide">
    ${statusBar()}
    <div class="body">
      <img class="illust guide-illust" src="assets/guide-mascot.png" alt="">
      <div class="guide-copy">
        <p class="lead-title">먼저 10개만.</p>
        <p class="lead-sub">짧게 공부하고, 재료를 얻는<br>흐름을 먼저 연습해보자.</p>
      </div>
    </div>
    <div class="actions">
      <button class="btn btn-primary btn-fill-host" data-interaction="guide-continue">
        <span class="btn-fill" data-interaction-target="guide-continue-fill"></span>
        <span class="label">계속</span>
      </button>
    </div>
  </section>`;
}

/* 03~04. 학습 세션 (한 화면, isMeaningRevealed로 앞/뒤 전환) */
function revealContent(word){
  const similar = word.simA
    ? `<div class="similar"><span class="tag">발음이 유사한 단어</span>
         <div class="pair"><span class="w">${word.simA}</span><span class="div"></span><span class="w">${word.simB}</span></div></div>`
    : '';
  return `
    <div class="meaning">${word.m}</div>
    <div class="reveal-blocks">
      ${similar}
      <div class="example">
        <div class="hd">${icoSpeakerSm} 예문을 들어보세요</div>
        <div class="ja">${word.exJa}</div>
        <div class="ko">${word.exKo}</div>
      </div>
      <button class="word-detail" data-action="word-detail">단어 상세 ${icoChevR}</button>
    </div>`;
}
function renderStudy(){
  const word = WORDS[state.studyIndex];
  const rev = state.isMeaningRevealed;
  const pct = Math.round((state.studyIndex / WORDS.length) * 100);
  return `
  <section class="screen" data-screen="study-session">
    ${statusBar()}
    <div class="study-topbar">
      <div class="row"><button class="close" data-action="close-study" aria-label="닫기">${icoClose}</button>
        <div class="num">${state.studyIndex + 1} / ${WORDS.length}</div></div>
      <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
    </div>
    <div class="study-body">
      <div class="study-card">
        <div class="word">${word.w}</div>
        <div class="reading-row"><span class="reading">${word.r}</span>
          <button class="tts" data-action="tts" aria-label="발음 듣기">${icoSpeaker}</button></div>
        ${ rev
            ? revealContent(word)
            : `<div class="spacer"></div><div class="tap-hint"><div class="tap-dot"></div>탭해서 뜻 확인</div><div class="spacer"></div>` }
      </div>
    </div>
    <div class="actions">
      ${ rev
          ? `<div class="grade">
               <button class="g g-again" data-action="grade" data-result="again">아직이에요</button>
               <button class="g g-known" data-action="grade" data-result="known">외웠어요</button>
             </div>`
          : `<button class="btn btn-primary" data-action="reveal">뜻 보기</button>` }
    </div>
  </section>`;
}

/* 05. 학습 완료 — Particle Motion은 추후. 빈 motion layer만 준비, 자동 전환. */
function renderStudyComplete(){
  return `
  <section class="screen" data-screen="study-complete">
    ${statusBar()}
    <div class="motion-layer" data-motion="study-complete-particles"></div>
    <div class="body complete-body">
      <h1 class="complete-title">학습 완료!</h1>
      <p class="complete-sub">학습 1회를 마치면 재료 1개를 받아요.</p>
      <div class="reward-card">
        <div class="reward-tile"><img src="../../ingredients/tuna.png" alt="참치">
          <span class="chk">${icoCheck}</span></div>
        <div class="reward-text"><div class="ov">새 재료</div><div class="nm">참치</div>
          <div class="ds">참치마요의 킥이라 할 수 있지.</div></div>
      </div>
      <div class="spacer"></div>
      <div class="locked-recipe">
        <div class="onigiri-tile lg">${icoOnigiriQ}</div>
        <div class="t"><div class="nm">참치마요 주먹밥</div><div class="ds">완성까지 재료 3개가 남았어.</div></div>
      </div>
    </div>
    <div class="actions">
      <button class="btn btn-primary btn-fill-host" data-interaction="study-complete-continue" data-action="complete-continue">
        <span class="btn-fill" data-interaction-target="study-complete-continue-fill"></span>
        <span class="label">계속</span>
      </button>
    </div>
  </section>`;
}

/* 06. 학습 완료 결과 (+ 07 영수증 modal은 이 화면 위에) */
function renderResult(){
  const known = state.studyAnswers.filter(a => a.result === 'known').length;
  const again = state.studyAnswers.filter(a => a.result === 'again').length;
  return `
  <section class="screen" data-screen="study-result">
    ${statusBar()}
    <div class="body result-body">
      <div class="result-ov">오늘의 학습</div>
      <h1 class="result-h1">다 했어요</h1>
      <div class="reward-card" style="margin-top:28px">
        <div class="reward-tile"><img src="../../ingredients/tuna.png" alt="참치">
          <span class="chk">${icoCheck}</span></div>
        <div class="reward-text"><div class="ov">새 재료</div><div class="nm">참치</div>
          <div class="ds">사장이 재료를 하나 건넸어요</div></div>
      </div>
      <div class="recipe-progress">
        <div class="head"><span class="nm">참치마요</span><span class="fr">1 / 4</span></div>
        <div class="seg-row"><span class="seg on"></span><span class="seg"></span><span class="seg"></span><span class="seg"></span></div>
        <div class="rem">완성까지 세 번 남았어요</div>
      </div>
      <div class="sum-rows">
        <div class="sum-row"><span class="k">새로 배운 단어</span><span class="v">${known}</span></div>
        <div class="sum-row"><span class="k">아직이라고 표시한 단어</span><span class="v">${again}</span></div>
      </div>
      <div class="result-note">오늘 외운 ${known}개는 내일 다시 확인해요.</div>
      <div class="spacer"></div>
    </div>
    <div class="actions">
      <button class="btn btn-primary" data-action="open-receipt">영수증 받고 마치기</button>
    </div>
    ${ state.isReceiptOpen ? renderReceipt(known, again) : '' }
  </section>`;
}

/* 07. 영수증 — result 위 Modal(overlay). entrance motion은 추후 hook에만 추가. */
function renderReceipt(known, again){
  return `
  <div class="receipt-overlay" data-motion="receipt-overlay">
    <div class="receipt-title">영수증을 받으세요</div>
    <div class="receipt-slot">
    <div class="receipt-card" data-motion="receipt-card-entrance">
      <div class="shop">ONIGIRI SHOP</div>
      <div class="date">2026. 8. 7</div>
      <div class="dash"></div>
      <div class="rc-row"><span class="k">새로 배운 단어</span><span class="v">${known}</span></div>
      <div class="rc-row"><span class="k">다시 배울 단어</span><span class="v">${again}</span></div>
      <div class="rc-row"><span class="k">받은 재료</span><span class="got"><span class="chk">${icoCheck}</span>참치</span></div>
      <div class="dash"></div>
      <div class="rc-locked"><div class="onigiri-tile">${icoOnigiriQ}</div>
        <div class="t"><div class="nm">참치마요 주먹밥</div><div class="ds">완성까지 재료 3개가 남았어.</div></div></div>
      <div class="thanks">ありがとう · 연습</div>
    </div>
    </div>
    <div class="receipt-help">연습 중이라 결과는 저장되지 않아요.<br>실제 학습 후 보상과 기록이 남아요.</div>
    <div class="receipt-actions">
      <button class="btn btn-outline" data-action="close-receipt">확인했어</button>
    </div>
  </div>`;
}

/* 08. 온보딩 마침 */
function renderFinish(){
  return `
  <section class="screen illust-screen" data-screen="onboarding-finish">
    ${statusBar()}
    <div class="body">
      <img class="illust finish-illust" src="assets/finish-mascot.png" alt="">
      <div class="finish-copy">
        <p class="lead-title">그럼 이제 시작해볼까.</p>
        <p class="lead-sub">오늘의 학습을 시작해요.</p>
      </div>
    </div>
    <div class="actions">
      <button class="btn btn-primary" data-action="finish-start">오늘 학습 시작</button>
      <button class="btn-text" data-action="finish-later">나중에</button>
    </div>
  </section>`;
}

/* 09. Home (Figma "1.학습 전"). 이번 범위: 진입만, 내부 기능 X. */
function ingChip(name, locked){
  return `<div class="ing-chip"><span>${name}</span>${ locked ? '<span class="qt">?</span>' : '' }</div>`;
}
function navTab(label, on, path){
  return `<div class="tab ${on ? 'on' : ''}">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${path}</svg>
    <span>${label}</span></div>`;
}
function renderHome(){
  return `
  <section class="screen" data-screen="home">
    ${statusBar()}
    <div class="home-body">
      <div class="home-head">
        <div><div class="date">8월 7일 목요일</div><div class="place">오니기리 가게</div></div>
        <button class="level-pill">N5 <span>▾</span></button>
      </div>
      <div class="home-hero">
        <div class="top">
          <div class="copy">오늘의 한 단어,<br>천천히 눌러 담아보자.</div>
          <img class="hero-cat" src="assets/home-mascot.png" alt="사장">
        </div>
        <div class="meta">오늘 단어 20개 · 약 6분</div>
        <div class="divider"></div>
        <div class="ing-head">모은 재료 <span>0/5</span></div>
        <div class="ing-row">${ingChip('밥',true)}${ingChip('참치',true)}${ingChip('마요네즈',true)}${ingChip('김',true)}</div>
        <button class="home-cta">학습 시작하기</button>
      </div>
      <div class="home-card">
        <div class="t1">단골 0일차</div>
        <img class="regular-empty" src="assets/regular-empty.png" alt="아직 단골이 아니에요">
        <div class="regular-caption">학습을 시작하면 단골 혜택을 받아요</div>
      </div>
      <div class="home-card">
        <div class="t1">8월 N5 메뉴판</div>
        <div class="sub">기초 단어 320개 중 0% 완료</div>
      </div>
    </div>
    <nav class="home-nav">
      ${navTab('오늘', true,  '<path d="M12 4c.5 0 .96.26 1.22.7l6.5 11.1c.6 1.03-.14 2.3-1.32 2.3H5.6c-1.18 0-1.92-1.27-1.32-2.3l6.5-11.1C11.04 4.26 11.5 4 12 4Z"/>')}
      ${navTab('메뉴', false, '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 4v16"/>')}
      ${navTab('기록', false, '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>')}
      ${navTab('설정', false, '<circle cx="7" cy="8" r="2"/><path d="M9 8h11M4 8h1"/><circle cx="16" cy="16" r="2"/><path d="M14 16H4M18 16h2"/>')}
    </nav>
  </section>`;
}

/* ============================ main render ============================ */
function render(){
  if (autoAdvanceTimer){ clearTimeout(autoAdvanceTimer); autoAdvanceTimer = null; }

  let html;
  if (state.currentPage === 'home'){
    html = renderHome();
  } else {
    switch (state.onboardingStep){
      case 'intro':         html = renderIntro(); break;
      case 'guide':         html = renderGuide(); break;
      case 'study':         html = renderStudy(); break;
      case 'studyComplete': html = renderStudyComplete(); break;
      case 'result':        html = renderResult(); break;
      case 'finish':        html = renderFinish(); break;
      default:              html = renderIntro();
    }
  }
  app.innerHTML = html + `<div class="dev-badge">step: ${state.currentPage === 'home' ? 'home' : state.onboardingStep}${state.isReceiptOpen ? ' · receipt' : ''}</div>`;
  isTransitioning = false;

  /* 화면5: 진입 시 particle(Motion) + 버튼 fill(Interaction) 1회 자동 재생.
     자동 화면 전환 없음 — 다음 화면 이동은 오직 사용자 [계속] 클릭(아래 handler). */
  if (state.currentPage === 'onboarding' && state.onboardingStep === 'studyComplete'){
    startStudyCompleteMotion();
  }

  /* 화면2: 진입 시 Fill Interaction 1회 자동 재생. navigation과 완전 분리(순수 시각 효과). */
  if (state.currentPage === 'onboarding' && state.onboardingStep === 'guide'){
    startGuideFill();
  }

  /* 화면7: 영수증이 열릴 때 Entrance(printOut) 1회만 재생.
     re-render로 반복 실행되지 않도록 receiptEntrancePlayed 플래그로 가드.
     이미 재생됐으면 클래스 미부여 → 카드는 최종 위치(translateY 0)로 렌더. */
  if (state.currentPage === 'onboarding' && state.onboardingStep === 'result' && state.isReceiptOpen){
    if (!receiptEntrancePlayed){ startReceiptEntrance(); receiptEntrancePlayed = true; }
  }
}

/* ── 화면2 [계속] Fill Interaction ──
   timing은 CSS 변수(--guide-fill-*)에서 관리. 이 함수는 재생 트리거만 담당.
   Fill은 진행률/카운트다운이 아니며, 완료돼도 자동 이동하지 않는다(navigation과 독립). */
function startGuideFill(){
  const fill = app.querySelector('[data-interaction-target="guide-continue-fill"]');
  if (!fill) return;
  fill.classList.remove('guide-fill--run');
  void fill.offsetWidth;                 // reflow → 진입/replay마다 0%부터 재생
  fill.classList.add('guide-fill--run');
}
/* dev 검수용: 콘솔에서 window.replayGuideFill() 로 반복 재생. 실제 UI엔 버튼 노출 안 함. */
window.replayGuideFill = function(){ startGuideFill(); };

/* ── 화면5 학습완료: Particle(Motion) + 하단 [계속] Fill(Interaction) ──
   레퍼런스 학습완료.mp4 계측을 Source of Truth로 사용.
   ⚠️ 노출 정책(O-7): 이 재료 획득 버스트는 *온보딩 전용*이다.
      실사용(프로덕션)에선 confettiBurst를 *오니기리 완성(재료 4/4) 시에만* 노출하고,
      재료만 획득한 경우엔 노출하지 않는다. 이 코드를 프로덕션에 그대로 옮길 때 트리거 조건 주의.
   ⚠️ 둘은 분리된 동작이다(같은 로직으로 묶지 않는다):
     · Particle  = Motion — 상단중앙 방사형 버스트 → 공기저항 감속 낙하 → 페이드. 진입 1회, loop 없음.
     · 버튼 Fill = Interaction — 화면2와 동일한 ButtonFillProgress(회색 트랙→잉크, 좌→우).
   ⚠️ Fill은 순수 시각 효과다. 100%가 돼도 자동 전환 없음 — 다음 화면 이동은 오직 [계속] 클릭.
   타이밍은 여기 STUDY_COMPLETE_MOTION 한 곳(+버튼 duration은 CSS --sc-fill-duration)에서만 관리. */
const STUDY_COMPLETE_MOTION = {
  particles: {
    delay: 140,          // ms — 진입 후 particle 최초 등장(영상 t≈0.14s, fill보다 늦음)
    stagger: 70,         // ms — 방출 산포(단발 버스트, 연속 emitter 아님)
    count: 34,           // 영상 최고 밀도 근사
    seed: 20260830,      // 고정 시드 → 새로고침·Replay 시 동일 패턴(seeded random)
    // 영상 계측: 등장 즉시(t≈0.2s) 상단 영역 전면에 이미 확산 → 점 폭발이 아니라
    // '상단 영역에 분포 spawn 후 낙하'. spawn box(390×844 기준) + 약한 초기속도.
    spawn: { xCenter: 195, xSpread: 176, yCenter: 214, ySpread: 194 },
    vBurstMax: 240,      // px/s — 등장 시 약한 초기 속도(대부분 아래로, 일부 위로 팝)
    vyBias: 46,          // px/s — 하향 편향(전체적으로 낙하)
    vTermMin: 190, vTermMax: 360,           // px/s — 종단(낙하) 속도
    spinMin: 60, spinMax: 340,              // deg/s — particle별 회전(부호 랜덤)
    lifeMin: 2200, lifeMax: 2650,           // ms — 수명(영상 소멸 ~2.8s)
    fadeIn: 70, fadeOut: 620,               // ms — 등장/소멸 페이드
    sizeMin: 6, sizeMax: 14,                // px
    colors: ['#FAB815', '#EB4308', '#F164AD'] // 영상 계측 3색(그 외 추가 금지)
  }
  // buttonFill: duration = CSS --sc-fill-duration(1800ms), easing = --guide-fill-easing, delay 0
};

let scRaf = null;          // particle rAF 핸들(중복 방지)
let scParticles = null;    // {el, ...물리 파라미터}[]

/* 결정적 PRNG(mulberry32) — 시드 고정 시 항상 같은 수열 → 반복 검수 가능 */
function mulberry32(a){
  return function(){
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* seeded 파라미터로 particle DOM 생성(레이어에 append). 위치/색/회전 모두 시드 결정. */
function buildScParticles(layer){
  const P = STUDY_COMPLETE_MOTION.particles;
  const rnd = mulberry32(P.seed);
  const rng = (a, b) => a + rnd() * (b - a);
  const arr = [];
  for (let i = 0; i < P.count; i++){
    const bar = rnd() < 0.55;                          // 55% 길쭉한 막대 / 45% 사각형
    const w = bar ? rng(4, 8)  : rng(7, P.sizeMax);
    const h = bar ? rng(10, 18) : w;
    // spawn: 상단 영역에 분포(x는 중앙 편향 위해 두 난수 평균, y는 균등)
    const xr = (rnd() + rnd()) - 1;                     // -1..1, 중앙 편향(삼각분포)
    const yr = rnd() * 2 - 1;                           // -1..1 균등
    const el = document.createElement('span');
    el.className = 'sc-particle';
    el.style.width  = w.toFixed(1) + 'px';
    el.style.height = h.toFixed(1) + 'px';
    el.style.background = P.colors[(rnd() * P.colors.length) | 0];
    el.style.opacity = '0';
    layer.appendChild(el);
    arr.push({
      el,
      x0: P.spawn.xCenter + xr * P.spawn.xSpread - w / 2,
      y0: P.spawn.yCenter + yr * P.spawn.ySpread - h / 2,
      vx0: (rnd() * 2 - 1) * P.vBurstMax,               // 좌우 drift
      vy0: (rnd() * 2 - 1) * P.vBurstMax + P.vyBias,    // 대부분 아래, 일부 위로 팝
      vTerm: rng(P.vTermMin, P.vTermMax),
      kH: rng(1.8, 2.2),
      kV: rng(1.8, 2.2),
      rot0: rng(0, 360),
      spin: rng(P.spinMin, P.spinMax) * (rnd() < 0.5 ? -1 : 1),
      birth: P.delay + rnd() * P.stagger,
      life: rng(P.lifeMin, P.lifeMax)
    });
  }
  return arr;
}

/* 특정 경과시간(ms)에서 particle 위치/투명도 계산·적용. 닫힌형(closed-form)이라
   프레임 누적오차 없음 → Replay·정지프레임(dev scrub)이 항상 동일하게 재현. 반환=생존 수. */
function paintScParticles(elapsed){
  if (!scParticles) return 0;
  const P = STUDY_COMPLETE_MOTION.particles;
  let alive = 0;
  for (const p of scParticles){
    const t = (elapsed - p.birth) / 1000;             // 개별 수명 기준 초
    if (t < 0){ p.el.style.opacity = '0'; alive++; continue; }
    const ms = t * 1000;
    if (ms > p.life){ p.el.style.opacity = '0'; continue; }
    alive++;
    // 수평: 초기속도가 감쇠하며 유한 변위(vx0/kH)만큼 확산 후 정지
    const x = p.x0 + (p.vx0 / p.kH) * (1 - Math.exp(-p.kH * t));
    // 수직: 종단속도로 수렴하는 낙하(자유낙하 아님) — 위로 튄 것은 잠깐 상승 후 낙하
    const y = p.y0 + p.vTerm * t + ((p.vy0 - p.vTerm) / p.kV) * (1 - Math.exp(-p.kV * t));
    const rot = p.rot0 + p.spin * t;
    let op = 1;
    if (ms < P.fadeIn) op = ms / P.fadeIn;
    else if (ms > p.life - P.fadeOut) op = Math.max(0, (p.life - ms) / P.fadeOut);
    p.el.style.opacity = op.toFixed(3);
    p.el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) rotate(${rot.toFixed(1)}deg)`;
  }
  return alive;
}

/* 화면5 진입 시 호출: 버튼 Fill(Interaction) + particle(Motion)을 각자 타이밍으로 1회 재생.
   자동 화면 전환은 하지 않는다(Motion completion ≠ Navigation). */
function startStudyCompleteMotion(){
  const fill  = app.querySelector('[data-interaction-target="study-complete-continue-fill"]');
  const layer = app.querySelector('[data-motion="study-complete-particles"]');

  // 1) 버튼 Fill(Interaction) — delay 0, 화면2와 동일 컴포넌트(순수 시각). 완료돼도 자동 이동 없음.
  if (fill){
    fill.classList.remove('sc-fill--run');
    void fill.offsetWidth;                 // reflow → 진입/replay마다 0%부터
    fill.classList.add('sc-fill--run');
  }

  // 2) Particle(Motion)
  if (!layer) return;
  if (scRaf){ cancelAnimationFrame(scRaf); scRaf = null; }   // 중복 rAF/누적 방지
  layer.innerHTML = '';
  scParticles = null;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; // 모션 최소화 → particle 생략(버튼은 위에서 즉시 100%)

  scParticles = buildScParticles(layer);
  const P = STUDY_COMPLETE_MOTION.particles;
  const end = P.delay + P.stagger + P.lifeMax + 120;
  const start = performance.now();
  function frame(now){
    const el = now - start;
    const alive = paintScParticles(el);
    if (el < end && alive > 0){ scRaf = requestAnimationFrame(frame); }
    else { layer.innerHTML = ''; scParticles = null; scRaf = null; }   // 종료 시 DOM 정리
  }
  scRaf = requestAnimationFrame(frame);
}
/* dev 검수용: 콘솔에서 반복 재생(리스너/DOM 누적 없이 리셋). 실제 UI엔 버튼 노출 안 함. */
window.replayStudyCompleteMotion = function(){ startStudyCompleteMotion(); };
/* dev 검수용: 특정 경과시간(ms) 정지 프레임으로 particle 표시(영상 대조용). */
window._scMotionScrub = function(ms){
  const layer = app.querySelector('[data-motion="study-complete-particles"]');
  if (!layer) return;
  if (scRaf){ cancelAnimationFrame(scRaf); scRaf = null; }
  if (!scParticles){ layer.innerHTML = ''; scParticles = buildScParticles(layer); }
  paintScParticles(ms);
};

/* ── 화면7 영수증 Entrance(printOut) ──
   레퍼런스 "영수증 출력.mp4" 계측을 Source of Truth로.
   메커니즘: 상단 슬롯(overflow:hidden)에 고정된 clip 안에서 카드가
   translateY -100%(카드 높이) → 0 으로 출력(=인쇄되어 나오는 느낌).
   ⚠️ Motion completion ≠ Navigation: 모션이 끝나도 자동 이동 없음.
      다음 화면(finish) 이동은 오직 사용자 [확인했어] 클릭.
   타이밍/토큰은 CSS 변수 한 곳(--receipt-entrance-*, --receipt-dimmer-*)에서만 관리.
   (참고값: duration 1350ms · delay 60ms · easing cubic-bezier(0.5,0,0.25,1) ease-in-out
            · dimmer rgba(0,0,0,.6) + backdrop blur 7px, fade 없음(영상 frame0부터 full).) */
let receiptEntrancePlayed = false;   // 진입 시 1회만 재생하도록 가드(re-render 반복 방지)
function startReceiptEntrance(){
  const card = app.querySelector('[data-motion="receipt-card-entrance"]');
  if (!card) return;
  card.classList.remove('printout--run');
  void card.offsetWidth;               // reflow → from(-100%)부터 재생
  card.classList.add('printout--run');
}
/* dev 검수용: 콘솔에서 Entrance 재생. 실제 사용자 Flow에선 자동 Replay 없음. */
window.replayReceiptEntrance = function(){ startReceiptEntrance(); };

/* ============================ flow / actions ============================ */
function startGuide(){ state.onboardingStep = 'guide'; render(); }
function startStudy(){
  state.onboardingStep = 'study';
  state.studyIndex = 0;
  state.isMeaningRevealed = false;
  render();
}
function revealMeaning(){
  if (state.isMeaningRevealed) return;
  state.isMeaningRevealed = true;
  render();
}
function answer(result){
  if (isTransitioning || !state.isMeaningRevealed) return;   // 중복/미공개 방어
  isTransitioning = true;
  const word = WORDS[state.studyIndex];
  state.studyAnswers.push({ wordId: word.id, result });

  if (state.studyIndex + 1 >= WORDS.length){
    state.isStudyCompleted = true;
    state.onboardingStep = 'studyComplete';
  } else {
    state.studyIndex += 1;
    state.isMeaningRevealed = false;
  }
  render();
}
function goToResult(){
  if (state.onboardingStep === 'result') return;             // 중복 전환 방어
  if (autoAdvanceTimer){ clearTimeout(autoAdvanceTimer); autoAdvanceTimer = null; }
  state.onboardingStep = 'result';
  render();
}
function openReceipt(){ if (state.isReceiptOpen) return; receiptEntrancePlayed = false; state.isReceiptOpen = true; render(); }
function closeReceipt(){
  if (!state.isReceiptOpen) return;
  state.isReceiptOpen = false;
  receiptEntrancePlayed = false;             // 다음 open 시 다시 1회 재생
  state.onboardingStep = 'finish';
  render();
}
function exitOnboarding(type){
  if (state.currentPage === 'home') return;
  state.onboardingExitType = type;                           // 'start-learning' | 'later'
  state.currentPage = 'home';
  render();
}

/* ============================ event delegation ============================ */
app.addEventListener('click', (e) => {
  const el = e.target.closest('[data-action],[data-interaction]');
  if (!el) return;

  /* 화면2 CTA는 interaction으로 취급(추후 fill). 지금은 클릭 = 다음 단계. */
  if (el.dataset.interaction === 'guide-continue'){ startStudy(); return; }

  switch (el.dataset.action){
    case 'intro-start':       startGuide(); break;
    case 'reveal':            revealMeaning(); break;
    case 'grade':             answer(el.dataset.result); break;
    case 'complete-continue': goToResult(); break;            // 자동 전환 전 수동 스킵
    case 'open-receipt':      openReceipt(); break;
    case 'close-receipt':     closeReceipt(); break;
    case 'finish-start':      exitOnboarding('start-learning'); break;
    case 'finish-later':      exitOnboarding('later'); break;
    case 'tts':               /* 발음 재생 — 이후 연결 */ break;
    case 'word-detail':       /* 단어 상세 시트 — 이후 연결 */ break;
    case 'close-study':       /* 온보딩 중 닫기 — 정책 확정 후 연결 */ break;
  }
});

/* ============================ dev mode (?step= / ?page=) ============================ */
function applyDevMode(){
  const q = new URLSearchParams(location.search);
  const page = q.get('page');
  const step = q.get('step');
  if (page === 'home'){ state.currentPage = 'home'; return; }
  if (!step) return;
  // 임의 진입 시 그럴듯한 studyAnswers 채워두기(결과/영수증 숫자 계산용)
  const seed = () => { state.studyAnswers = WORDS.map((w,i) => ({ wordId:w.id, result: i < 7 ? 'known' : 'again' })); };
  switch (step){
    case 'intro':    state.onboardingStep = 'intro'; break;
    case 'guide':    state.onboardingStep = 'guide'; break;
    case 'study':    startStudyState(); break;
    case 'complete': seed(); state.isStudyCompleted = true; state.onboardingStep = 'studyComplete'; break;
    case 'result':   seed(); state.onboardingStep = 'result'; break;
    case 'receipt':  seed(); state.onboardingStep = 'result'; state.isReceiptOpen = true; break;
    case 'finish':   seed(); state.onboardingStep = 'finish'; break;
  }
}
function startStudyState(){ state.onboardingStep = 'study'; state.studyIndex = 0; state.isMeaningRevealed = false; }

/* ============================ init ============================ */
applyDevMode();
render();
