---
version: alpha
name: Onikan-design-system
description: The design language for Onikan (오니칸) — a restrained Japanese-vocabulary study game. A cool-neutral "Onikan Grey" ramp (hue 228, ~2.6% saturation) carried by Pretendard holds ~85% of the UI. Colour roles (2026-08): the one primary action per screen is an INK-filled pill ({colors.ink}, label {colors.on-ink}); orange {colors.primary} is the brand/status accent (active tab, 단골 stamps, section overlines, status badges, a chart's "you are here" mark) — not the primary button; lime/green {colors.secondary} marks progress & reward (N5 arc gauge, completion card, earned check). Card-based mobile layout, one line-art mascot ("사장"), first-class light and dark themes.

colors:
  # ─── Onikan Grey ramp (hue 228, ~2.6% sat — a chosen cool neutral) ───
  grey-99: "#FAFAFB"
  grey-98: "#F7F7F9"            # dark-theme ink / on-ink
  grey-97: "#F2F2F4"
  grey-96: "#EDEDF1"
  grey-95: "#E8E8EC"
  grey-90: "#DCDCE2"
  grey-80: "#C4C4CC"
  grey-70: "#A9A9B2"            # dark-theme body
  grey-60: "#8E8E97"
  grey-50: "#71717A"
  grey-40: "#56565E"
  grey-30: "#3E3E45"
  grey-22: "#2B2B31"
  grey-15: "#1D1D21"
  grey-10: "#131316"

  # ─── Semantic (light) — reference the ramp above ───
  ink: "#1D1D21"                # grey-15 — headings, body, progress fill
  body: "#56565E"               # grey-40 — captions, secondary text, inactive tab (8.3:1)
  mute: "#8E8E97"               # grey-60 — LOCKED / placeholder ONLY (3.4:1)
  canvas: "#FFFFFF"             # card surface
  softer: "#F2F2F4"             # grey-97 — page background, tab bar
  soft: "#E8E8EC"               # grey-95 — pills, example block, segment track
  pressed: "#DCDCE2"            # grey-90 — hairline dividers, incomplete progress cell
  plate: "#EDEDF1"              # grey-96 — illustration backing tile (FIXED in both themes)
  bar-fill: "#71717A"           # grey-50 — progress-bar fill in BROWSING contexts (FIXED in both themes)
  shadow: "rgba(0,0,0,0.05)"

  # ─── Brand accents (sparse) ───
  # 2026-08: PRIMARY ACTION = INK ({ink}+{on-ink}), NOT orange. Orange = brand/status accent.
  primary: "#EF5112"            # bright brand orange — BRAND/STATUS accent (tab, 단골 stamps, overlines, 진행 중 badge, chart "you are here", 음독 pills). NOT the primary button.
  primary-pressed: "#D2460E"    # pressed orange (when orange is an interactive accent)
  on-ink: "#F7F7F9"             # grey-98 — label on an INK fill = the PRIMARY BUTTON label (15.8:1)
  on-primary: "#FFFFFF"         # white on orange — only if orange is ever used as a fill (badge/stamp); check contrast per use. (Primary CTAs no longer use orange.)
  tab-active: "#C2410C"         # orange-700 — active tab icon+label (AA 4.63:1). NOT primary — #EF5112 is only 3.21:1 as a 12px tint on the light tab bar
  secondary: "#A3E635"          # lime-400 — PROGRESS & REWARD (N5 arc gauge, 복습 완료 card, earned check, 완성 badge)
  on-secondary: "#1D1D21"
  link: "#C2410C"               # orange-700 — on-brand text links (5.18:1)

  # ─── Semantic status (functional — NOT brand accents) ───
  # Mode-aware like {colors.primary}: darker in light, lighter in dark, so each clears AA in BOTH themes.
  success: "#15803D"            # green-700 — kept distinct from lime reward (5.02:1)
  warning: "#B45309"            # amber-700 (5.02:1 — amber-500 was only 2.15:1 on canvas)
  danger: "#DC2626"             # red-600 (4.83:1)
  info: "#2563EB"               # blue-600 (5.17:1)

# Dark theme is first-class — values below OVERRIDE the light tokens under dark appearance.
dark:
  ink: "#F7F7F9"
  body: "#A9A9B2"               # 7.2:1
  mute: "#71717A"               # grey-50
  canvas: "#1D1D21"             # grey-15 — card surface
  softer: "#131316"             # grey-10 — page background, tab bar
  soft: "#2B2B31"               # grey-22 — pills, example, segment track
  pressed: "#3E3E45"            # grey-30 — hairline, incomplete progress
  plate: "#EDEDF1"              # FIXED — same tile as light
  bar-fill: "#71717A"           # FIXED — same in both themes
  shadow: "rgba(0,0,0,0.4)"
  primary: "#F97316"            # orange-500 — pops on dark
  primary-pressed: "#FA8432"    # pressed = one step LIGHTER in dark
  on-primary: "#1D1D21"         # INK label in dark — white on #F97316 is only 2.80:1 (fails even large-AA); ink = 5.99:1
  on-ink: "#1D1D21"             # inverts with ink — a fixed value would put white on a white chip
  tab-active: "#F97316"         # = dark primary (6.62:1 on dark tab bar). NOT #EF5112 (that is the LIGHT primary — cross-theme)
  secondary: "#A3E635"
  link: "#F97316"               # orange-500
  success: "#22C55E"            # green-500 (7.37:1 on dark canvas)
  warning: "#F59E0B"            # amber-500 (7.82:1)
  danger: "#F87171"             # red-400 (6.07:1 — red-600 was 3.48:1 here)
  info: "#60A5FA"               # blue-400 (6.61:1 — blue-600 was 3.25:1 here)

typography:
  # One family carries the whole system: Pretendard JP (Korean + Japanese + Latin), weights 400–800.
  # JP cut is REQUIRED, not a preference: plain Pretendard ships 14,336 glyphs with kana and
  # hangul but NO kanji, so {components.kanji-tile} renders empty. Pretendard JP (22,059 glyphs)
  # is the same typeface with the kanji set added — same design, same metrics.
  display-xxl:
    # 700/56 to match the confirmed prototype (handoff README), not 800/60.
    fontFamily: '"Pretendard JP", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif'
    fontSize: 52px
    fontWeight: 700
    lineHeight: 56px
  display-word:
    # The Japanese word on the study card — the largest thing in the product.
    fontFamily: '"Pretendard JP", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif'
    fontSize: 44px
    fontWeight: 700
    lineHeight: 53px
  display-meaning:
    # The revealed meaning, directly under the word.
    fontFamily: '"Pretendard JP", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif'
    fontSize: 26px
    fontWeight: 700
    lineHeight: 34px
  display-xl:
    fontFamily: '"Pretendard JP", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif'
    fontSize: 36px
    fontWeight: 700
    lineHeight: 44px
  display-lg:
    fontFamily: '"Pretendard JP", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif'
    fontSize: 32px
    fontWeight: 700
    lineHeight: 40px
  display-md:
    fontFamily: '"Pretendard JP", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif'
    fontSize: 24px
    fontWeight: 700
    lineHeight: 32px
  display-sm:
    fontFamily: '"Pretendard JP", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif'
    fontSize: 20px
    fontWeight: 600
    lineHeight: 28px
  body-lg:
    fontFamily: '"Pretendard JP", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif'
    fontSize: 18px
    fontWeight: 500
    lineHeight: 26px
  body-md:
    fontFamily: '"Pretendard JP", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif'
    fontSize: 16px
    fontWeight: 400
    lineHeight: 24px
  body-base:
    # THE default body/caption size in product screens. 15px is the accessibility
    # floor stated in the handoff ("본문 최소 15px") — do not go below it.
    fontFamily: '"Pretendard JP", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif'
    fontSize: 15px
    fontWeight: 400
    lineHeight: 22px
  body-lg-strong:
    # Recurring 18/600 name role — ingredient names, in-progress recipe name, next reward.
    fontFamily: '"Pretendard JP", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif'
    fontSize: 18px
    fontWeight: 600
    lineHeight: 24px
  body-base-strong:
    # Recurring 15/600 counter role — "3 / 24", "1 / 4" in headers.
    fontFamily: '"Pretendard JP", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif'
    fontSize: 15px
    fontWeight: 600
    lineHeight: 22px
  card-title:
    # Title inside a compact list/progress card.
    fontFamily: '"Pretendard JP", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif'
    fontSize: 17px
    fontWeight: 600
    lineHeight: 24px
  body-md-strong:
    fontFamily: '"Pretendard JP", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif'
    fontSize: 16px
    fontWeight: 600
    lineHeight: 22px
  body-sm:
    fontFamily: '"Pretendard JP", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif'
    fontSize: 14px
    fontWeight: 400
    lineHeight: 20px
  body-sm-strong:
    # Mirrors body-md-strong at 14px. Referenced by {components.reward-chip}.
    fontFamily: '"Pretendard JP", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif'
    fontSize: 14px
    fontWeight: 600
    lineHeight: 20px
  label:
    # Replaces Uber's monospaced eyebrow. Pretendard 500, uppercase, tracked.
    fontFamily: '"Pretendard JP", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif'
    fontSize: 12px
    fontWeight: 500
    lineHeight: 16px
    letterSpacing: 1.4px
    textTransform: uppercase
  code:
    # Numeric codes & indices (001, N5, 0/4). Tabular figures for alignment.
    fontFamily: '"Pretendard JP", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif'
    fontSize: 13px
    fontWeight: 500
    lineHeight: 18px
    fontVariantNumeric: tabular-nums
  button-large:
    fontFamily: '"Pretendard JP", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif'
    fontSize: 18px
    fontWeight: 600
    lineHeight: 24px
  button-md:
    fontFamily: '"Pretendard JP", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif'
    fontSize: 16px
    fontWeight: 600
    lineHeight: 20px
  tab-label:
    # Bottom tab bar. NOT uppercase and NOT tracked — `label` is the eyebrow role,
    # this is a navigation label. Negative tracking tightens it at 12px.
    fontFamily: '"Pretendard JP", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif'
    fontSize: 12px
    fontWeight: 500
    lineHeight: 16px
    letterSpacing: -0.1px
  tab-label-active:
    fontFamily: '"Pretendard JP", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif'
    fontSize: 12px
    fontWeight: 600
    lineHeight: 16px
    letterSpacing: -0.1px

rounded:
  none: 0px
  receipt: 4px   # THE receipt, and nothing else — this one radius carries the "paper" signal
  sm: 12px       # small tiles (kanji tile)
  md: 18px       # secondary cards / inputs
  lg: 22px       # standard content card
  card: 24px     # hero / feature card
  pill: 999px    # every interactive control (buttons, chips, badges)
  full: 9999px   # circular icon containers

spacing:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 20px
  2xl: 24px      # hero/reward card vertical padding; the tight end of a group gap
  xxl: 28px
  huge: 40px

components:
  # ─── Actions ───
  button-primary:
    description: "THE single primary action of a screen (e.g. Start Study). INK pill (2026-08: was orange). At most one per visible screen; a competing action is a white outline."
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"
    typography: "{typography.button-large}"
    rounded: "{rounded.pill}"
    padding: "{spacing.lg} {spacing.xl}"   # 16 + 24 lineHeight + 16 = 56px, the confirmed CTA height
  button-secondary:
    description: "Paired or standalone non-primary action. Surface pill, ink text."
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
    rounded: "{rounded.pill}"
    padding: "{spacing.md} {spacing.xl}"
  button-subtle:
    description: "Tertiary / in-card action (e.g. 단어 상세). Soft grey pill."
    backgroundColor: "{colors.soft}"
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
    rounded: "{rounded.pill}"
    padding: "{spacing.md} {spacing.lg}"
  grade-button:
    description: "The study self-rating set (모름·어려움·앎·쉬움). A NEUTRAL escalation, not orange — a set has no single primary. Ramps outline → soft → tinted → solid ink."
    typography: "{typography.button-md}"
    rounded: "{rounded.pill}"
    padding: "{spacing.xl}"
    variants:
      unknown: "outline {colors.pressed}"
      hard: "fill {colors.soft} @ 60%"
      known: "fill {colors.soft}"
      easy: "fill {colors.ink}, text {colors.on-ink}"

  # ─── Surfaces ───
  card:
    description: "Standard content card (learning card, kanji card, example, now-making). Flat by default; Level 1 shadow optional."
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.card}"
    padding: "{spacing.2xl} {spacing.xl}"   # 24 vertical / 20 horizontal, per the confirmed screens
  card-tinted:
    description: "Sub-region card on a page. Grey-soft fill, no shadow."
    backgroundColor: "{colors.soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xl}"
  kanji-tile:
    description: "The single large-kanji square inside a card. Soft grey fill. Requires the JP font cut — see typography."
    backgroundColor: "{colors.soft}"
    textColor: "{colors.ink}"
    typography: "{typography.display-xxl}"
    rounded: "{rounded.md}"
    size: 104x104

  # ─── Reward system (lime lives here, and ONLY here) ───
  reward-chip:
    description: "An earned/next ingredient (e.g. RICE). Grey tile pill; the icon carries the lime reward accent."
    backgroundColor: "{colors.soft}"
    textColor: "{colors.ink}"
    accent: "{colors.secondary}"
    typography: "{typography.body-sm-strong}"
    rounded: "{rounded.pill}"
    padding: "{spacing.sm} {spacing.md}"
  ingredient-earned:
    description: "A collected ingredient row / checkmark. Lime check = the achievement cue."
    icon: "{colors.secondary}"
    textColor: "{colors.ink}"
  progress-dots:
    description: "Onigiri ingredient progress (◻︎◻︎◻︎◻︎). Outlined = empty, ink-filled = earned. Filled state MAY use lime for a just-earned pulse."
    empty: "outline {colors.ink}"
    filled: "{colors.ink}"

  # ─── Labels & badges ───
  section-label:
    description: "Eyebrow / group label (오늘의 학습, INGREDIENTS). Uppercase, tracked, muted."
    textColor: "{colors.body}"
    typography: "{typography.label}"
  badge:
    description: "JLPT level / meta tag. NEUTRAL by default (never orange — orange is reserved for actions)."
    backgroundColor: "{colors.soft}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "{spacing.xs} {spacing.md}"
  stat-block:
    description: "Big-number metric + stacked caption (12 / 새 단어). One hero number per card."
    valueTypography: "{typography.display-xxl}"
    captionTypography: "{typography.label}"

  # ─── Navigation ───
  tab-bar:
    description: "Bottom tab bar (오늘·메뉴·기록·설정). Text tabs; active = ink + underline, inactive = body."
    backgroundColor: "{colors.softer}"
    activeColor: "{colors.ink}"
    inactiveColor: "{colors.body}"
    typography: "{typography.body-md-strong}"
    topBorder: "{colors.pressed}"
  list-row:
    description: "Collection / index row (001 TUNA MAYO / LOCKED). Locked rows drop to mute."
    textColor: "{colors.ink}"
    mutedColor: "{colors.mute}"
    typography: "{typography.display-sm}"
    codeTypography: "{typography.code}"
    divider: "{colors.pressed}"

  # ─── Feedback ───
  toast:
    description: "Transient confirmation (e.g. 재료 획득!). Reward toasts carry a lime accent mark; plain ones do not."
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"
    accent: "{colors.secondary}"
    rounded: "{rounded.pill}"
    padding: "{spacing.md} {spacing.lg}"
    typography: "{typography.body-sm}"
    variants:
      reward: "lime check mark + label"
      plain: "label only — keeps lime gated to the earn moment"

---


## Overview

Onikan (오니칸) is a Japanese-vocabulary study game: finish a daily study set, earn an onigiri ingredient, complete recipes. The design language has to hold two feelings at once — the **calm focus** a study tool needs, and the **small reward rush** a game runs on. It resolves that tension with restraint: a quiet cool-neutral "Onikan Grey" canvas carried by Pretendard, and a clear split of colour roles — ink for the action, orange for identity, lime/green for progress. *(2026-08 리디자인: 주요 액션이 오렌지 → 잉크로 바뀌었다. 아래는 그 기준.)*

- **Ink `{colors.ink}` = action.** The one primary action of a screen is an **ink-filled** pill (label `{colors.on-ink}` `#F7F7F9`). When you see the dark button, you know what to tap.
- **Orange `{colors.primary}` = identity & status.** The brand mark — active tab, 단골 streak stamps, section overlines, a status badge (진행 중), the "you are here" bar in a chart, 음독 bridge pills. It signals *where / what*, never *tap here*.
- **Lime/green `{colors.secondary}` = progress & reward.** The taste of progress — the N5 arc gauge, a completion card, an ingredient-earned check, a 완성 badge.

Everything else is neutral grey. The system stays **quiet by default, loud only where it means something** — the "loud" primary is now ink, and orange has stepped back to brand/status.

**Key Characteristics:**
- Primary action is **ink** — one ink-filled CTA per screen; a competing action becomes a white outline, never a second ink pill. Restraint is the brand's confidence.
- Orange is the **brand / status** accent (active tab, 단골 stamps, overlines, 진행 중 badge, chart "you are here") — never a primary button.
- Lime/green marks **progress & reward** (arc gauge, completion card, earned check) — a semantic of achievement, not decoration.
- A single type family — Pretendard — from the 52px hero down to the 12px label. No second face, no mono.
- Card-based mobile layout: information groups into rounded grey/white cards; spacing between cards carries the rhythm.
- A hand-drawn line-art mascot ("사장") is the only illustration system — warm, personal, never a stock graphic.
- First-class light **and** dark themes; every token has a dark value, tuned (not inverted).

## Brand Personality

### Tone & Keywords
**게임적 재미 · 보상감 (playful, reward-driven)** on a **calm, restrained** foundation. Onikan should feel like a tidy little shop where a slightly gruff-but-kind boss ("사장") hands you an ingredient when you've done your reps. Warm, low-key, quietly satisfying — never loud, never childish, never gamified-to-the-point-of-noise.

- **Is:** 따뜻함, 절제, 성취의 리듬, 손그림 감성, 명확한 위계.
- **Is not:** 화려함, 그라데이션 범벅, 요란한 축하 애니메이션, 무채색 무표정.

### Voice
Copy speaks in the boss's warm, terse Korean ("왔네. 처음 보는 얼굴이네.", "학습을 마치면 첫 재료가 들어와."). Short, human, a little dry. UI labels are plain nouns (오늘의 학습, 재료, 보상). Buttons say exactly what happens (Start Study → a study session begins).

### Reference Points
- **Brick / Wispr Flow** — card-based mobile layout, generous whitespace, one clear primary action, big confident numerals.
- **Toss-grade restraint** — a neutral system that lets a single accent do all the talking.
- **Onikan's own game loop** — the onigiri/ingredient reward is the brand's signature; the lime accent exists to serve it.

## Colors

### Brand & Accent
- **Primary action = ink** (`{colors.ink}` — light `#1D1D21` / dark surfaces use the ink ramp): The one primary CTA per screen is an **ink-filled pill**, label `{colors.on-ink}` `#F7F7F9` (light-on-dark, 15.8:1 — passes at any size). Pressed: a hair lighter. A competing action is a **white outline** (1.5px `pressed`, ink label), never a second ink pill. *(2026-08: primary CTAs moved orange → ink. The old white-on-orange large-text AA caveat no longer applies to CTAs.)*
- **Brand orange** (`{colors.primary}` — light `#EF5112` / dark `#F97316`): The **brand & status** accent — active tab, **단골 streak stamps** (orange onigiri), section overlines (오늘 학습 완료 · 이어서 회독해요), status badges (진행 중), the single "you are here" bar in a chart, 음독 bridge pills. **Not the primary button.** The active tab icon+label use `{colors.tab-active}` — a separate token: `#C2410C` on light (4.63:1 at 12px; `#EF5112` is only 3.21:1 as a tint on the light tab bar) and `#F97316` on dark (6.62:1). An orange fill used as a badge/stamp must clear contrast for its own text.
- **Lime 400 / green** (`{colors.secondary}` — `#A3E635`): **Progress & reward** — the N5 arc gauge (lime→green), the 오늘 복습 완료 card (light-green tint + green check), the check badge on a new ingredient, a 완성 badge, a just-filled progress cell. Text on lime is always `{colors.on-secondary}` `#1D1D21`. (System validation still uses `success #15803D`, kept distinct from brand lime.)

> **Decision logic — which colour?**
> 1. *Is this the primary action on the screen?* → **ink fill** (label `on-ink`). One per screen; a competing action becomes a **white outline**, not a second ink pill.
> 2. *Is this brand identity, current location, or a status?* → **orange** — active tab (`{colors.tab-active}`), 단골 stamps, a section overline, a 진행 중 badge, or the single "you are here" bar in a chart.
> 3. *Is this progress or a reward earned?* → **lime/green** — an arc gauge, a completion card, an earned check.
> 4. *None of the above?* → **no accent.** Ink / grey. ~85% of the UI lives here.

### Surface — the "Onikan Grey" ramp (cool neutral)
Neutrals are the **Onikan Grey** ramp: hue 228 fixed, ~2.6% saturation — a deliberately *chosen* cool-leaning neutral, midway between pure grey (0%) and cool-neutral (~5%). Everything rides one axis (page `#F2F2F4`, cards, dividers, text) so nothing feels borrowed from another system.
- **Canvas** (`{colors.canvas}` — `#FFFFFF` / dark `#1D1D21`): Card surfaces.
- **Softer** (`{colors.softer}` — `#F2F2F4` / dark `#131316`, grey-97/10): Page background and tab bar.
- **Soft** (`{colors.soft}` — `#E8E8EC` / dark `#2B2B31`, grey-95/22): Pills, example blocks, segment-toggle track.
- **Pressed** (`{colors.pressed}` — `#DCDCE2` / dark `#3E3E45`, grey-90/30): Hairline dividers and incomplete progress cells.
- **Plate** (`{colors.plate}` — `#EDEDF1`, grey-96): The tile behind an illustration — **fixed in both themes**. The illustrations are black line art; if the tile darkened too, the drawing would disappear. Revisit when white-line-art assets exist.
- **Bar fill** (`{colors.bar-fill}` — `#71717A`, grey-50): Progress-bar fill in **browsing** contexts (home, menu, recipe detail) — fixed in both themes. These bars are reference information, so filling them with `ink` would give them the same weight as the hero element. The result screen's bar is the one exception and *does* use `ink`, because that is the reward moment.

### Text
- **Ink** (`{colors.ink}` — `#1D1D21` / dark `#F7F7F9`, grey-15): Headings, body, progress fill.
- **Body** (`{colors.body}` — `#56565E` / dark `#A9A9B2`, grey-40 / grey-70): Captions, secondary text, inactive tab (7.27:1 / 7.20:1 on canvas — both clear the ≥7:1 bar).
- **Mute** (`{colors.mute}` — `#8E8E97` / dark `#71717A`, grey-60/50): **LOCKED and placeholder only** (3.4:1). Never a regular caption — to quiet something, drop size/weight, not colour.

### Semantic (functional, not brand)
Kept deliberately separate from the two brand accents so they never collide.

Each status colour is **mode-aware**, following the same rule as `{colors.primary}`: darker in light, lighter in dark. A single fixed hex cannot clear AA against both a white card and a `#1D1D21` card — every one of these failed in one theme or the other before the split.

| Token | Light | Dark |
|---|---|---|
| **Success** `{colors.success}` | green-700 `#15803D` (5.02:1) | green-500 `#22C55E` (7.37:1) |
| **Warning** `{colors.warning}` | amber-700 `#B45309` (5.02:1) | amber-500 `#F59E0B` (7.82:1) |
| **Danger** `{colors.danger}` | red-600 `#DC2626` (4.83:1) | red-400 `#F87171` (6.07:1) |
| **Info** `{colors.info}` | blue-600 `#2563EB` (5.17:1) | blue-400 `#60A5FA` (6.61:1) |

Success stays *green, NOT lime.* Lime = brand reward; success = system validation. Different hues prevent "which green means what?" — and green-700 sits even further from lime `#A3E635` than green-600 did.

- **Link** `{colors.link}` `#C2410C` (orange-700) — on-brand inline text links (5.18:1).

### Dark Theme
Dark is a designed theme, not an inversion. Page drops to grey-10 `#131316`, cards to grey-15 `#1D1D21`. The **primary button inverts** — an ink fill on a light page becomes a light (`grey-98`) fill with ink label on dark, so it stays the loudest action. Orange brightens to orange-500 for its accent jobs (tab, stamps, status), lime holds `#A3E635`, and the illustration `plate` stays fixed. Contrast holds in both themes (body ≥ 7:1, mute ~3.4:1 by design).

Two tokens **must** invert rather than hold a fixed value:
- `{colors.on-ink}` — foreground on an ink fill. `ink` itself flips (`#1D1D21` → `#F7F7F9`), so a fixed light `on-ink` would put white text on a white chip. It flips with it: `#F7F7F9` → `#1D1D21`.
- The four status colours above, for the AA reason already given.

Everything that legitimately stays fixed in both themes: `plate`, `secondary`, `on-secondary`, `bar-fill`. (`on-primary` is **not** fixed — white in light, ink in dark.)

## Typography

### Font Family
**Pretendard JP** carries the entire system — Korean, Japanese and Latin, weights 400–800. It replaces Uber's two proprietary faces with one open-source family (SIL OFL) that renders Korean beautifully and pairs its Latin glyphs cleanly. There is no second face and no monospace: the old mono "eyebrow / code" role is handled by Pretendard with letter-spacing (labels) and tabular figures (codes).

**Use the JP cut, not plain Pretendard.** This is a hard requirement for a Japanese-vocabulary app, not a preference. Plain Pretendard carries 14,336 glyphs — kana and hangul are present, but **kanji are entirely absent** (漢, 字, 運 all missing), so `{components.kanji-tile}` renders empty and no font fallback rescues it. Pretendard JP is the same typeface with the kanji set added (22,059 glyphs): identical design, identical metrics, complete coverage.

Fallback stack: `"Pretendard JP", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif`.

### Hierarchy

| Token | Size | Weight | Line H | Use |
|---|---|---|---|---|
| `{typography.display-xxl}` | 52px | 700 | 56px | Hero number / screen wordmark (TODAY, a hero metric). |
| `{typography.display-word}` | 44px | 700 | 53px | The Japanese word on the study card. |
| `{typography.display-meaning}` | 26px | 700 | 34px | The revealed meaning. |
| `{typography.display-xl}` | 36px | 700 | 44px | Screen titles (ONIGIRI INDEX). |
| `{typography.display-lg}` | 32px | 700 | 40px | Feature / recipe name (TUNA MAYO). |
| `{typography.display-md}` | 24px | 700 | 32px | Card titles. |
| `{typography.display-sm}` | 20px | 600 | 28px | List-row title, sub-headings. |
| `{typography.body-lg}` | 18px | 500 | 26px | Lead paragraph, mascot line. |
| `{typography.body-md}` | 16px | 400 | 24px | Default body in the design system. |
| `{typography.body-base}` | 15px | 400 | 22px | **Default body/caption in product screens.** 15px is the accessibility floor. |
| `{typography.body-base-strong}` | 15px | 600 | 22px | Counters in headers — "3 / 24", "1 / 4". |
| `{typography.body-lg-strong}` | 18px | 600 | 24px | Ingredient names, in-progress recipe name, next reward. |
| `{typography.card-title}` | 17px | 600 | 24px | Title inside a compact list / progress card. |
| `{typography.body-md-strong}` | 16px | 600 | 22px | Emphasis, tab labels. |
| `{typography.body-sm}` | 14px | 400 | 20px | Captions, secondary meta. |
| `{typography.body-sm-strong}` | 14px | 600 | 20px | Reward-chip label. |
| `{typography.label}` | 12px | 500 | 16px | Eyebrows / group labels — uppercase, +1.4 tracking. |
| `{typography.code}` | 13px | 500 | 18px | Codes & indices (001, N5, 0/4) — tabular figures. |
| `{typography.button-large}` | 18px | 600 | 24px | Primary button label. |
| `{typography.button-md}` | 16px | 600 | 20px | Default button label. |
| `{typography.tab-label}` | 12px | 500 | 16px | Bottom tab label — **not** uppercase, −0.1 tracking. |
| `{typography.tab-label-active}` | 12px | 600 | 16px | Bottom tab label, active. |

### Principles
- **One family, many weights.** Hierarchy comes from size + weight, never from a second typeface.
- **Sentence-case headings; UPPERCASE only for `label` eyebrows.** The tracked uppercase label is the one place caps appear.
- **Numbers align.** Any digits that stack or compare (progress, counts, codes) use tabular figures.
- **No tracking flourish on display** — only the `label` role is letter-spaced.

## Layout

### Spacing Philosophy
Base unit **4px**. Grouping is done with spacing, not borders — *proximity is the primary grouping device.*

- **Within a component** (label → value → caption): tight, `{spacing.sm}`–`{spacing.md}` (8–12px). Elements that belong together sit close.
- **Between components / cards**: `{spacing.xxl}` (28px). The gap between two cards is what makes them read as separate groups.
- **Section / screen padding**: horizontal gutter `{spacing.xl}` (20px); top of screen `{spacing.huge}` (40px) to let the first headline breathe.
- **Card interior**: `{spacing.2xl} {spacing.xl}` (24 vertical / 20 horizontal) on hero and reward cards; compact progress and list cards tighten to `{spacing.lg}`.

> **Decision logic — how much gap?** If two things are *the same idea*, use 8–12px. If they are *different groups*, jump to 28px. Never use an in-between 18–20px gap between groups — it blurs the boundary and is the #1 cause of "everything feels equally important."

### Grid & Container
Single-column mobile. Content aligns to one **left spine** at the 20px gutter (strong reading edge); the primary button intentionally breaks that spine by going full-width to signal "action." Bottom tab bar is fixed; screen content reserves space for it via a safe-area inset (never overlaps).

### Whitespace
Top-load information (title + hero card), bottom-anchor personality + action (mascot → primary button). The empty middle is intentional — it is the calm the study tool needs.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| Level 0 — Flat | No shadow, no border. | Default for nearly everything; cards separate from the grey page by fill contrast alone. |
| Level 1 — Soft Card | `rgba(0,0,0,0.05) 0 6px 14px` | Standard content cards, the reward chip. The *only* shadow in the system. |

Depth cues are **fill polarity** (white card on grey page; ink card for a dark promo moment) and **proximity**, not stacked shadows. There is no Level 2/3 — see Don'ts.

## Shapes

| Token | Value | Use |
|---|---|---|
| `{rounded.none}` | 0px | Full-bleed bands, raw dividers. |
| `{rounded.receipt}` | 4px | **The receipt, and nothing else.** This single radius carries the "paper" signal, so it must not appear anywhere else. |
| `{rounded.sm}` | 12px | Small tiles (kanji tile). |
| `{rounded.md}` | 18px | Secondary cards, inputs, kanji tile. |
| `{rounded.lg}` | 22px | Sub-region card (`card-tinted`). |
| `{rounded.card}` | 24px | Standard content card (`card`) and hero / feature card. |
| `{rounded.pill}` | 999px | Every interactive control — buttons, chips, badges. |
| `{rounded.full}` | 9999px | Circular icon containers. |

The signature is a **soft, generous radius**: cards at 22–24px, every control a full pill. Nothing in the UI is a hard rectangle except full-bleed edges and dividers.

## Components

### Actions

**`button-primary`** — the **ink** action pill. Background `{colors.ink}`, label `{colors.on-ink}` `#F7F7F9`, `{typography.button-large}`, `{rounded.pill}`, padding `{spacing.xl}`, full-width at screen bottom. *(2026-08: primary CTA is ink, was orange.)*
- **When to use:** the single most important action on the screen (학습 시작하기 · 회독하기 · 외웠어요 · 지금 연습하기 · 오늘 학습 시작 · 영수증 받고 마치기 · 확인). If a second action competes, it becomes a **white outline**, not a second ink pill.

**`button-secondary`** — **white outline** pill (1.5px `{colors.pressed}`, ink label) for a non-primary action beside a primary, or a de-emphasised CTA (아직이에요 · 백업 내보내기 · 완료-state 회독하러 가기 · 발음 듣기·사전). A `{colors.soft}`-filled variant exists for in-card use.

**`button-subtle`** — soft grey pill (`{colors.soft}`) for tertiary / in-card actions (e.g. 단어 상세).

**`grade-button`** — the study self-rating set (모름 · 어려움 · 앎 · 쉬움). A **neutral escalation**, because a set of peers has no single primary: outline → soft grey @ 60% → soft grey → solid ink. Orange is *not* used here. The Easy chip's label is `{colors.on-ink}`, which inverts with the fill so the step reads in both themes.

### Surfaces

**`card`** — the standard content card. `{colors.canvas}`, `{rounded.card}`, `{spacing.xl}` padding, flat (Level 0) or Level 1 soft shadow. The workhorse.

**`card-tinted`** — grey-soft sub-region card, no shadow. Use for a callout *inside* a screen — never nested inside another card (see composition rules).

**`kanji-tile`** — the large-kanji square, grey-soft fill, `{rounded.md}`.

### Progress & Reward (lime / green)

**`arc-gauge`** — macro progress ring/arc (N5 전체 진척도, 반원). A lime→green sweep on a `{colors.soft}` track; the % and label read *before* the arc. Small — under half the card. Linear bars are for *current-task* progress; the arc is for *whole-level* progress (never both in the same role). *(2026-08 신규.)*

**`reward-chip`** — an earned/next ingredient (RICE). Grey-soft pill with a **lime-accented icon**. The chip body stays neutral; only the reward mark is lime.

**`ingredient-earned`** — a collected ingredient: **green/lime check** + ink label. Uncollected = mute outline + mute label.

**`completion-card`** — a done-state callout (오늘 복습 완료): **light-green tint** surface + green check + short line. No CTA (or a de-emphasised outline).

**`progress-dots`** — outlined squares fill with ink as ingredients are earned; the *just-earned* dot may pulse lime briefly, then settle to ink.

**`streak-stamp` (단골 도장)** — the loyalty stamp: an **orange** onigiri stamp for each kept day, grey dashed for unfilled. This is the one place a warm brand fill (orange) marks a streak — brand identity, not a reward check. *(2026-08: 단골 = orange, not lime.)*

### Labels, Badges, Metrics

**`section-label`** — uppercase tracked eyebrow (`{typography.label}`), `{colors.body}`. Groups a card's content (오늘의 학습, INGREDIENTS).

**`badge`** — JLPT / meta tag = **neutral** grey pill (`{colors.soft}`). **Status** badges are the deliberate exception: `진행 중` = orange-soft pill (`#FCE8DE`/primary), `완료` = green-soft pill (`#E7F4D9`/`success-deep`), `잠김` = mute text. Status badges carry colour because they signal state, not because they are actions.

**`stat-block`** — one hero number (`display-xxl`) + a stacked `label` caption. **One hero number per card**; secondary metrics drop to a small pill, never a second giant number.

### Navigation

**`tab-bar`** — bottom tabs (오늘·메뉴·기록·설정). Icon + label; **active = `{colors.tab-active}` (orange) tint** on both, inactive = `{colors.mute}`. No underline / fill / badge. Sits on `{colors.softer}` with a `{colors.pressed}` top hairline. (The active-tab orange is one of orange's few jobs now.)

**`list-row`** — collection/index row: `{typography.code}` index + `display-sm` title, `{colors.pressed}` divider. Locked rows drop title + trailing to `{colors.mute}` with a lock glyph.

### Feedback

**`toast`** — transient confirmation on ink; **reward toasts (재료 획득!) carry a lime accent mark**, plain ones (저장했어) do not. Pill shape, Level 1 shadow. The two variants exist precisely so lime stays gated to the earn moment instead of riding along on every toast.

## Component Composition Rules

These are the "how pieces combine" guarantees — an AI or dev can self-check against them.

- **No card inside a card.** A `card` never contains another `card`. For a sub-region, use `card-tinted`, a divider, or plain spacing. Nested rounded surfaces read as a bug.
- **One `button-primary` (ink) per screen.** If two actions both feel primary, demote one to a `button-secondary` white outline. The ink pill is the spotlight — never two.
- **One hero number per card.** Additional metrics become pills / inline text (see the home card: `12` is hero, `복습 0` is a pill).
- **Lime/green = progress or reward.** It belongs on the arc gauge, a completion card, or an earned check — a progress/achievement semantic, not decoration. **Orange never means "tap here."** If orange is about to sit on a primary button, it's wrong — the primary is ink.
- **Badges/labels stay neutral.** Never color a JLPT badge or section label with orange or lime.
- **Group by gap, not by box.** Prefer spacing (8–12 within, 28 between) over adding borders/cards to separate content.
- **Shadow is a rarity.** Only `card` (Level 1) and `toast` may cast one. Everything else is flat.
- **Full-pill controls, soft-radius cards.** Controls = `{rounded.pill}`; surfaces = `{rounded.lg}`/`{rounded.card}`. Don't mix (no rectangular buttons, no pill-shaped cards).

## Do's and Don'ts

### Do
- Make the single primary action per screen an **ink** pill (`{colors.ink}` + `{colors.on-ink}`); a competing action is a white outline.
- Keep orange `{colors.primary}` for **brand/status** only — active tab, 단골 stamps, section overlines, 진행 중 badge, a chart's "you are here" mark. Its scarcity as an accent *is* the brand signal.
- Use lime/green `{colors.secondary}` for **progress & reward** — the arc gauge, a completion card, an earned check, a 완성 badge.
- Let the Onikan Grey neutrals and Pretendard carry ~85% of the UI; accents are the exception, not the rhythm.
- Group information by proximity: tight inside a group, a clear 28px jump between groups.
- Give every token a dark value and check contrast in both themes.
- Use tabular figures wherever numbers align or compare.
- Keep one hero number per card; demote the rest.

### Don't
- **No gradients.** Not on buttons, cards, backgrounds, or text. Flat fills only.
- **No text shadows**, and no drop shadow beyond the single Level 1 card shadow.
- **No orange on a primary button** — the primary is ink. Orange is brand/status only (tab, 단골 stamps, overlines, 진행 중 badge, chart "you are here"); don't spread it onto plain labels or icons.
- **No lime/green as decoration** — if it's not progress or a reward, it's not lime.
- **No card nested in a card**, and no rectangular (hard-corner) buttons.
- **No warm or true-grey neutral** — neutrals are the Onikan Grey ramp (cool, hue 228, ~2.6% sat). Don't swap in stone, zinc, or a pure 0%-saturation grey.
- **`mute` is not a caption colour** — it's for LOCKED / placeholder only (3.4:1). To quiet a caption, lower size/weight, not colour.
- **Lime only at the earn moment** — the check badge or a just-filled progress cell's fade-out. Never as steady-state decoration.
- **No second typeface or monospace** — Pretendard does every role; labels get tracking, codes get tabular figures.
- **No all-caps headlines** — uppercase is only the tracked `label` eyebrow.

## Implemented Variant Axes

The Figma library ships 16 components. Only these carry variants — everything else is a single component, because a variant axis is only justified where the spec actually defines alternate states.

| Component | Axis | Values |
|---|---|---|
| `grade-button` | `State` | Unknown · Hard · Known · Easy |
| `card` | `Elevation` | Flat · Level 1 |
| `ingredient-earned` | `State` | Earned · Locked |
| `progress-dots` | `State` | Empty · Filled |
| `tab-bar` | `Active` | 오늘 · 메뉴 · 기록 · 설정 |
| `list-row` | `State` | Default · Locked |
| `toast` | `Type` | Reward · Plain |

`button-primary`, `button-secondary` and `button-subtle` are deliberately **three separate components, not one variant set** — they differ in typography *and* padding (`button-large` + 20/20 vs `button-md` + 12/20 vs `button-md` + 12/16), so a shared variant set would force one padding scheme and break the spec.

## Changelog

### alpha.1 — Figma library build

Every change below came out of building the system in Figma and measuring it; each is a fix to a gap or an error in `alpha`, not a redesign.

**Undefined tokens that components referenced**
- `{colors.on-dark}` → defined as **`{colors.on-ink}`** and made mode-aware. Referenced by `grade-button.easy` and `toast` but absent from the colours block. A fixed value puts white text on the white Easy chip in dark mode.
- `{typography.body-sm-strong}` → **defined** (14/600/20). Referenced by `reward-chip`, previously undefined. Typography is now **14 roles, not 13**.

**Ramp additions** — the dark theme used two greys that were not in the ramp: **`grey-98` `#F7F7F9`** (dark ink / on-ink) and **`grey-70` `#A9A9B2`** (dark body).

**Accessibility** — every foreground/background pair now clears AA in both themes.
- **Primary button = ink** (`{colors.ink}` + `{colors.on-ink}` `#F7F7F9`, 15.8:1 — passes at any size, so the old white-on-orange large-text caveat is gone). `primary` (orange, light `#EF5112` / dark `#F97316`) is now a brand/status **accent**; where it fills a badge/stamp, verify that element's own text contrast (`tab-active #C2410C` gives the text-safe orange).
- Status colours had no dark values, so each failed AA in one theme. Now mode-aware — see the Semantic table.

**Typeface** — **Pretendard → Pretendard JP.** Plain Pretendard has no kanji at all, so the kanji tile rendered empty.

**Corrections to stated figures** — `body` on canvas is **7.27:1** in light, not 8.3:1. `tab-active` on dark is now `#F97316` = **6.62:1**. All figures verified against WCAG.

**Clarification** — the Shapes table listed `rounded.lg` (22px) as the standard content card while `components.card` specified `rounded.card` (24px). The component definition wins: `card` = 24px, `card-tinted` = 22px.

**Known manual step** — the `code` role needs tabular figures enabled by hand in Figma (Type settings → Details → `tnum`). The Figma Plugin API can read OpenType features but cannot set them.
