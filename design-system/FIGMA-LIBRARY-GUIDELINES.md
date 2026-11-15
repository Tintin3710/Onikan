# Onikan Design System — Library Guidelines for Figma AI

> Upload to: Figma › Libraries › Manage guidelines. Source of truth for values is `DESIGN.md` (beta.1, 2026-11). This file covers what the library assets alone cannot tell you: intent, rules, anti-patterns, copy voice.

## 1. Product context
- **Onikan (오니칸)** — a Japanese vocabulary study app for Korean adults (30–40s office workers). iOS / Android, phone only, 390pt-wide frames.
- World: a small **onigiri shop**. Finishing a daily study set earns **one ingredient**; 4 ingredients complete an **onigiri menu** (24 menus). The shop owner **"사장님"** is a hand-drawn calico cat.
- Two feelings at once: **calm focus** (study tool) + **small reward rush** (game). Resolve with restraint: quiet neutral canvas, accents only where they mean something.
- All UI copy is **Korean**. Japanese appears only as study content (words, readings, example sentences).

## 2. Color roles (most important rule)
| Role | Variable | Use | Never |
|---|---|---|---|
| Action | `ink` (+ `on-ink` label) | The **one** primary button per screen (ink pill) | Two ink buttons on one screen |
| Identity / status | `primary` (orange) | Active tab, 단골 stamps, section overlines, 진행 중 badge, "you are here" mark | **Any button.** Orange never means "tap here" |
| Progress / reward | `secondary` (lime), `success` | Earned-ingredient check, completion card, 완성 badge, progress fill moment | Decoration, steady-state backgrounds |
| Neutrals | Onikan Grey ramp, `canvas`, `softer` (page bg #F5F5F5) | ~85% of the UI | Other greys (stone, zinc, warm greys), screen-specific page colors |
| Locked / placeholder | `mute` | Locked items, placeholders only | Regular captions — quiet a caption with size/weight, not `mute` |

- A competing secondary action = **white outline pill** (`button-outline`, 1.5 `pressed` border, ink label).
- Always bind color variables; never paste hex. Every token has a tuned Dark value.

## 3. Layout & spacing
- Screen gutter **16** (`layout/gutter`). Bottom CTA area in completion screens: side 26, bottom 32.
- Spacing is chosen by meaning, only three steps: **same idea 8–12** (`gap-tight`), **different group 24** (`gap-group`), **different section 40** (`gap-section`). Snap 14/18/30 to the nearest.
- Group with proximity, not borders. Use a 1px `soft` divider only inside a card's row list (e.g. `summary-card`).
- Top-load information (title + hero card), bottom-anchor personality + action (mascot → primary button). Empty middle is intentional.

## 4. Shape & elevation
- Controls (buttons, chips, badges) = **full pill**. White cards = **24** (`radius/card`). Grey sub-region card = **20** (`card-tinted`). Thumbnails 12–16.
- `radius/receipt` (10) is **only** for the receipt paper. Do not reuse it.
- One shadow only: **Elevation/Level 1** (0 6 14, 5%). No Level 2/3, no text shadow, no gradients anywhere.
- No card inside a card. Use `card-tinted`, a divider, or spacing instead.

## 5. Typography
- One family: **Pretendard JP**, all roles. No second face, no monospace, no all-caps headlines.
- Always apply a text style. Common mapping:
  - Screen title `display/md` (24/32 Bold) · card/section title `body/md-strong` · owner line `card-title`
  - Body `body/base` (15/22) · secondary `body/sm` (14/20) · small label `label` (12/16)
  - Big study word `display/word`, meaning `display/meaning`
  - Receipt only: `receipt/title`, `receipt/footer` (letter-spacing 3px)
- Numbers that compare or align use tabular figures. One hero number per card.

## 6. Which component when
| Need | Use |
|---|---|
| Primary action | `button-primary` (ink). One per screen |
| Secondary action | `button-outline` (white + border) or `button-secondary` |
| Small inline link-button ("단어 상세 ›") | `text-button` |
| Study grading (2 choices) | `grade-button` Again "다시 볼래요" / Good "한 번 익혔어요" |
| Study session header | `session-top-bar` Stacked (counter center + 4px bar) or Inline |
| Flashcard | `study-card` State Front / Revealed × Example On / Off |
| Result summary rows | `summary-card` |
| Two stat numbers (완료 / 넘김) | `stat-tile` ×2, gap 8 |
| Study / review done screen body | `done-notice` + one `button-primary` |
| Ingredient progress (n/4) | `progress-segments` |
| Menu / ingredient thumbnail | `plate-tile` (Locked = not yet earned) |
| Owner's one-liner on celebration | `owner-quote-card` |
| Completion receipt | `receipt` Crafted (menu completed) / Ingredient (ingredient only) |
| Status chip | `status-badge` (InProgress orange-soft, Complete lime-soft, Locked, New, Crafted) |
| Visit streak stamp | `stamp` |
| Bottom navigation | `Bottom Navigation` (4 tabs: 오늘 · 메뉴 · 기록 · 설정) |
| Transient message | `toast` (reward variant with lime check only for earned ingredients) |

- **Do not use** components prefixed `_legacy` or `_` (deprecated / archive only): `_legacy badge` → `status-badge` Crafted, `_legacy stat-block` → `stat-tile`, `_legacy progress-dots` → `progress-segments`.

## 7. Copy voice
- UI labels: plain nouns (오늘의 학습, 재료, 메뉴). Buttons say exactly what happens.
- The owner (사장님) speaks **반말, short, warm but a little dry**: "왔네.", "참치마요는 내 최애야.", "오늘 것도 잘 만들었네."
- Shop-flavored button copy at the end of a session: review done "잘 먹었다!", review with skipped cards "나머진 다음에 먹을게!", result "영수증 받고 마치기".
- Don't promise exact timing for spaced repetition ("내일" → prefer "며칠 뒤", "다음에").
- No exclamation spam, no emoji in UI copy, no childish tone.

## 8. Anti-patterns (reject these)
- Orange primary button · two ink buttons · gradient fills · extra shadows
- Lime used as decoration · `mute` used for captions
- Hard-corner buttons · pill-shaped cards · nested cards
- Raw hex / raw spacing numbers instead of variables
- Detached copies of library components drawn as plain frames (e.g. a hand-drawn "button-primary" frame) — use the instance
- English UI labels in Korean screens (only the `ONIGIRI SHOP` wordmark stays English)
- Stock illustrations or emoji as art — the hand-drawn cat owner and onigiri art are the only illustration system
