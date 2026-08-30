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

/* 화면5 → 화면6 자동 전환 지연. 추후 Motion Reference에 맞춰 값만 조정. */
const AUTO_ADVANCE_DELAY = 1500;

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
        <p class="lead-title">먼저 5개만.</p>
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
        <div class="q-tile">?</div>
        <div class="t"><div class="nm">참치마요 주먹밥</div><div class="ds">완성까지 재료 3개가 남았어.</div></div>
      </div>
    </div>
    <div class="actions">
      <button class="btn btn-primary" data-action="complete-continue">계속</button>
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
    <div class="receipt-card" data-motion="receipt-card-entrance">
      <div class="shop">ONIGIRI SHOP</div>
      <div class="date">2026. 8. 7</div>
      <div class="dash"></div>
      <div class="rc-row"><span class="k">새로 배운 단어</span><span class="v">${known}</span></div>
      <div class="rc-row"><span class="k">다시 배울 단어</span><span class="v">${again}</span></div>
      <div class="rc-row"><span class="k">받은 재료</span><span class="got"><span class="chk">${icoCheck}</span>참치</span></div>
      <div class="dash"></div>
      <div class="rc-locked"><div class="q-tile" style="width:36px;height:36px">?</div>
        <div class="t"><div class="nm">참치마요 주먹밥</div><div class="ds">완성까지 재료 3개가 남았어.</div></div></div>
      <div class="thanks">ありがとう · 연습</div>
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
        <div class="t2">학습을 시작하고 단골 혜택을 받아보세요!</div>
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

  /* 화면5: 사용자 입력 없이 자동으로 결과 화면으로 (지연값은 상수로 관리) */
  if (state.currentPage === 'onboarding' && state.onboardingStep === 'studyComplete'){
    autoAdvanceTimer = setTimeout(() => { goToResult(); }, AUTO_ADVANCE_DELAY);
  }

  /* 화면2: 진입 시 Fill Interaction 1회 자동 재생. navigation과 완전 분리(순수 시각 효과). */
  if (state.currentPage === 'onboarding' && state.onboardingStep === 'guide'){
    startGuideFill();
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
function openReceipt(){ if (state.isReceiptOpen) return; state.isReceiptOpen = true; render(); }
function closeReceipt(){
  if (!state.isReceiptOpen) return;
  state.isReceiptOpen = false;
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
