---
version: alpha
name: Onikan-design-system
description: The design language for Onikan (오니칸) — a warm, restrained Japanese-vocabulary study game. The surface is a stone-neutral canvas carried by Pretendard, where a single orange {colors.primary} owns conversion (one primary action per screen) and a lime {colors.secondary} is reserved strictly for reward and achievement moments (earning an onigiri ingredient, completing a recipe). Card-based mobile layout, line-art mascot ("사장"), first-class light and dark themes.

colors:
  # ─── Brand ───
  primary: "#EA580C"            # orange-600 — the single conversion accent
  primary-pressed: "#C2410C"    # orange-700 — pressed / active state
  on-primary: "#FFFFFF"
  secondary: "#A3E635"          # lime-400 — REWARD / achievement only
  secondary-pressed: "#84CC16"  # lime-500
  on-secondary: "#1C1917"       # dark text on the light lime fill

  # ─── Text (on light) ───
  ink: "#1C1917"                # stone-900 — headings & primary body
  body: "#57534E"               # stone-600 — secondary text
  hairline-mid: "#44403C"       # stone-700 — muted links, stronger dividers
  mute: "#A8A29E"               # stone-400 — placeholder, fine print, locked

  # ─── Surface (light) ───
  canvas: "#FFFFFF"             # default card surface
  canvas-soft: "#F5F5F4"        # stone-100 — tiles, chips, tinted cards
  canvas-softer: "#FAFAF9"      # stone-50 — page background / nested fill
  surface-pressed: "#E7E5E4"    # stone-200 — pressed fill, hairlines
  black-elevated: "#292524"     # stone-800 — elevated near-black
  on-dark: "#FFFFFF"

  # ─── Semantic (functional — NOT brand accents) ───
  success: "#16A34A"            # green-600 — kept distinct from lime reward
  warning: "#F59E0B"            # amber-500
  danger: "#DC2626"             # red-600
  info: "#2563EB"               # blue-600
  link: "#C2410C"               # orange-700 — on-brand text links

# Dark theme is first-class. Tokens below OVERRIDE the light values above under dark appearance.
dark:
  primary: "#F97316"            # orange-500 — brighter, pops on dark
  secondary: "#A3E635"
  ink: "#FAF9F7"
  body: "#A8A29E"               # stone-400
  hairline-mid: "#78716C"       # stone-500
  mute: "#57534E"               # stone-600
  canvas: "#1C1917"             # stone-900 — card surface on dark
  canvas-soft: "#292524"        # stone-800 — tiles
  canvas-softer: "#0C0A09"      # stone-950 — page background
  surface-pressed: "#44403C"    # stone-700
  black-elevated: "#292524"
  link: "#FB923C"               # orange-400

typography:
  # One family carries the whole system: Pretendard (Korean + Latin), weights 400–800.
  display-xxl:
    fontFamily: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif
    fontSize: 52px
    fontWeight: 800
    lineHeight: 60px
  display-xl:
    fontFamily: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif
    fontSize: 36px
    fontWeight: 700
    lineHeight: 44px
  display-lg:
    fontFamily: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif
    fontSize: 32px
    fontWeight: 700
    lineHeight: 40px
  display-md:
    fontFamily: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif
    fontSize: 24px
    fontWeight: 700
    lineHeight: 32px
  display-sm:
    fontFamily: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif
    fontSize: 20px
    fontWeight: 600
    lineHeight: 28px
  body-lg:
    fontFamily: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif
    fontSize: 18px
    fontWeight: 500
    lineHeight: 26px
  body-md:
    fontFamily: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif
    fontSize: 16px
    fontWeight: 400
    lineHeight: 24px
  body-md-strong:
    fontFamily: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif
    fontSize: 16px
    fontWeight: 600
    lineHeight: 22px
  body-sm:
    fontFamily: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif
    fontSize: 14px
    fontWeight: 400
    lineHeight: 20px
  label:
    # Replaces Uber's monospaced eyebrow. Pretendard 500, uppercase, tracked.
    fontFamily: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif
    fontSize: 12px
    fontWeight: 500
    lineHeight: 16px
    letterSpacing: 1.4px
    textTransform: uppercase
  code:
    # Numeric codes & indices (001, N5, 0/4). Tabular figures for alignment.
    fontFamily: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif
    fontSize: 13px
    fontWeight: 500
    lineHeight: 18px
    fontVariantNumeric: tabular-nums
  button-large:
    fontFamily: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif
    fontSize: 18px
    fontWeight: 600
    lineHeight: 24px
  button-md:
    fontFamily: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif
    fontSize: 16px
    fontWeight: 600
    lineHeight: 20px

rounded:
  none: 0px
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
  xxl: 28px
  huge: 40px

components:
  # ─── Actions ───
  button-primary:
    description: "THE single primary action of a screen (e.g. Start Study). Orange pill. At most one per visible screen."
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-large}"
    rounded: "{rounded.pill}"
    padding: "{spacing.xl} {spacing.xl}"
  button-secondary:
    description: "Paired or standalone non-primary action. Surface pill, ink text."
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
    rounded: "{rounded.pill}"
    padding: "{spacing.md} {spacing.xl}"
  button-subtle:
    description: "Tertiary / in-card action (e.g. 단어 상세). Soft stone pill."
    backgroundColor: "{colors.canvas-soft}"
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
      unknown: "outline {colors.surface-pressed}"
      hard: "fill {colors.canvas-soft} @ 60%"
      known: "fill {colors.canvas-soft}"
      easy: "fill {colors.ink}, text {colors.on-dark}"

  # ─── Surfaces ───
  card:
    description: "Standard content card (learning card, kanji card, example, now-making). Flat by default; Level 1 shadow optional."
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.card}"
    padding: "{spacing.xl}"
  card-tinted:
    description: "Sub-region card on a page. Stone-soft fill, no shadow."
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xl}"
  kanji-tile:
    description: "The single large-kanji square inside a card. Soft stone fill."
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"

  # ─── Reward system (lime lives here, and ONLY here) ───
  reward-chip:
    description: "An earned/next ingredient (e.g. RICE). Stone tile pill; the icon carries the lime reward accent."
    backgroundColor: "{colors.canvas-soft}"
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
    backgroundColor: "{colors.canvas-soft}"
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
    backgroundColor: "{colors.canvas-softer}"
    activeColor: "{colors.ink}"
    inactiveColor: "{colors.body}"
    typography: "{typography.body-md-strong}"
    topBorder: "{colors.surface-pressed}"
  list-row:
    description: "Collection / index row (001 TUNA MAYO / LOCKED). Locked rows drop to mute."
    textColor: "{colors.ink}"
    mutedColor: "{colors.mute}"
    typography: "{typography.display-sm}"
    codeTypography: "{typography.code}"
    divider: "{colors.surface-pressed}"

  # ─── Feedback ───
  toast:
    description: "Transient confirmation (e.g. 재료 획득!). Reward toasts may carry a lime accent."
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-dark}"
    accent: "{colors.secondary}"
    rounded: "{rounded.pill}"
    padding: "{spacing.md} {spacing.lg}"
    typography: "{typography.body-sm}"

---


## Overview

Onikan (오니칸) is a Japanese-vocabulary study game: finish a daily study set, earn an onigiri ingredient, complete recipes. The design language has to hold two feelings at once — the **calm focus** a study tool needs, and the **small reward rush** a game runs on. It resolves that tension with restraint: a quiet stone-neutral canvas carried by Pretendard, and exactly two brand colours that each mean one specific thing.

- **Orange `{colors.primary}` = conversion.** It appears on the one primary action of a screen and almost nowhere else. When you see orange, you know what to tap.
- **Lime `{colors.secondary}` = reward.** It is the taste of progress — an ingredient earned, a recipe completed, a streak kept. It never decorates; it only celebrates.

Everything between those two moments is monochrome-stone. That is the whole system: **quiet by default, loud only where it means something.**

**Key Characteristics:**
- One conversion colour (orange), used at most once per visible screen. Restraint is the brand's confidence.
- One reward colour (lime), gated strictly to achievement moments. It is a *semantic* of joy, not a palette slot to fill.
- A single type family — Pretendard — from the 52px hero down to the 12px label. No second face, no mono.
- Card-based mobile layout: information groups into rounded stone/white cards; spacing between cards carries the rhythm.
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
- **Orange 600** (`{colors.primary}` — `#EA580C`): The single conversion colour. Primary CTA fills, the active/earned emphasis when a screen has one unambiguous primary. **One per visible screen.** On dark, brightens to orange-500 `#F97316`.
- **Lime 400** (`{colors.secondary}` — `#A3E635`): The reward colour. Earned-ingredient checks, recipe-complete states, reward toasts, a just-earned progress pulse. Text on lime is always `{colors.on-secondary}` `#1C1917` (lime is a light fill).

> **Decision logic — which accent, if any?**
> 1. *Is this the one primary action on the screen?* → **orange** fill. If a second action competes, it becomes `button-secondary` (neutral), not a second orange.
> 2. *Is this a moment of achievement/reward for the user?* → **lime** accent is allowed.
> 3. *Neither?* → **no accent.** Use ink / stone. Most of the UI is here.

### Surface (Stone — warm neutral)
Neutrals are **stone** (warm grey), chosen to sit under the orange accent — not a default cool grey.
- **Canvas** (`{colors.canvas}` — `#FFFFFF`): Card surfaces.
- **Canvas Soft** (`{colors.canvas-soft}` — `#F5F5F4`, stone-100): Tiles, chips, tinted cards, soft pills.
- **Canvas Softer** (`{colors.canvas-softer}` — `#FAFAF9`, stone-50): The page background.
- **Surface Pressed** (`{colors.surface-pressed}` — `#E7E5E4`, stone-200): Pressed fills and hairline dividers.

### Text
- **Ink** (`{colors.ink}` — `#1C1917`, stone-900): Headings and primary body.
- **Body** (`{colors.body}` — `#57534E`, stone-600): Secondary text, captions, labels.
- **Hairline Mid** (`{colors.hairline-mid}` — `#44403C`, stone-700): Muted links, stronger dividers.
- **Mute** (`{colors.mute}` — `#A8A29E`, stone-400): Placeholder, fine print, LOCKED / disabled.

### Semantic (functional, not brand)
Kept deliberately separate from the two brand accents so they never collide.
- **Success** `{colors.success}` `#16A34A` (green-600) — *note: green, NOT lime.* Lime = brand reward; success = system validation. Keeping them different prevents "which green means what?" confusion.
- **Warning** `{colors.warning}` `#F59E0B` · **Danger** `{colors.danger}` `#DC2626` · **Info** `{colors.info}` `#2563EB`.
- **Link** `{colors.link}` `#C2410C` (orange-700) — on-brand inline text links, distinct from the orange-600 CTA fill.

### Dark Theme
Dark is a designed theme, not an inversion. Page drops to stone-950 `#0C0A09`, cards to stone-900 `#1C1917`, orange brightens to orange-500 so it still reads as the loudest thing on the screen, lime stays put (it already pops on dark). Contrast targets hold in both themes (body text ≥ 4.5:1).

## Typography

### Font Family
**Pretendard** carries the entire system — Korean and Latin, weights 400–800. It replaces Uber's two proprietary faces with one open-source family (SIL OFL) that renders Korean beautifully and pairs its Latin glyphs cleanly. There is no second face and no monospace: the old mono "eyebrow / code" role is handled by Pretendard with letter-spacing (labels) and tabular figures (codes).

Fallback stack: `Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif`.

### Hierarchy

| Token | Size | Weight | Line H | Use |
|---|---|---|---|---|
| `{typography.display-xxl}` | 52px | 800 | 60px | Hero number / screen wordmark (TODAY, a hero metric). |
| `{typography.display-xl}` | 36px | 700 | 44px | Screen titles (ONIGIRI INDEX). |
| `{typography.display-lg}` | 32px | 700 | 40px | Feature / recipe name (TUNA MAYO). |
| `{typography.display-md}` | 24px | 700 | 32px | Card titles. |
| `{typography.display-sm}` | 20px | 600 | 28px | List-row title, sub-headings. |
| `{typography.body-lg}` | 18px | 500 | 26px | Lead paragraph, mascot line. |
| `{typography.body-md}` | 16px | 400 | 24px | Default body. |
| `{typography.body-md-strong}` | 16px | 600 | 22px | Emphasis, tab labels. |
| `{typography.body-sm}` | 14px | 400 | 20px | Captions, secondary meta. |
| `{typography.label}` | 12px | 500 | 16px | Eyebrows / group labels — uppercase, +1.4 tracking. |
| `{typography.code}` | 13px | 500 | 18px | Codes & indices (001, N5, 0/4) — tabular figures. |
| `{typography.button-large}` | 18px | 600 | 24px | Primary button label. |
| `{typography.button-md}` | 16px | 600 | 20px | Default button label. |

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
- **Card interior**: `{spacing.xl}` (20px) padding on standard cards.

> **Decision logic — how much gap?** If two things are *the same idea*, use 8–12px. If they are *different groups*, jump to 28px. Never use an in-between 18–20px gap between groups — it blurs the boundary and is the #1 cause of "everything feels equally important."

### Grid & Container
Single-column mobile. Content aligns to one **left spine** at the 20px gutter (strong reading edge); the primary button intentionally breaks that spine by going full-width to signal "action." Bottom tab bar is fixed; screen content reserves space for it via a safe-area inset (never overlaps).

### Whitespace
Top-load information (title + hero card), bottom-anchor personality + action (mascot → primary button). The empty middle is intentional — it is the calm the study tool needs.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| Level 0 — Flat | No shadow, no border. | Default for nearly everything; cards separate from the stone page by fill contrast alone. |
| Level 1 — Soft Card | `rgba(0,0,0,0.05) 0 6px 14px` | Standard content cards, the reward chip. The *only* shadow in the system. |

Depth cues are **fill polarity** (white card on stone page; ink card for a dark promo moment) and **proximity**, not stacked shadows. There is no Level 2/3 — see Don'ts.

## Shapes

| Token | Value | Use |
|---|---|---|
| `{rounded.none}` | 0px | Full-bleed bands, raw dividers. |
| `{rounded.sm}` | 12px | Small tiles (kanji tile). |
| `{rounded.md}` | 18px | Secondary cards, inputs. |
| `{rounded.lg}` | 22px | Standard content card. |
| `{rounded.card}` | 24px | Hero / feature card. |
| `{rounded.pill}` | 999px | Every interactive control — buttons, chips, badges. |
| `{rounded.full}` | 9999px | Circular icon containers. |

The signature is a **soft, generous radius**: cards at 22–24px, every control a full pill. Nothing in the UI is a hard rectangle except full-bleed edges and dividers.

## Components

### Actions

**`button-primary`** — the orange conversion pill. Background `{colors.primary}`, text `{colors.on-primary}`, `{typography.button-large}`, `{rounded.pill}`, padding `{spacing.xl} {spacing.xl}`, full-width at screen bottom.
- **When to use:** the single most important action on the screen. If you're about to add a second orange pill, stop — one of them is secondary.

**`button-secondary`** — surface pill, ink text. Non-primary actions that still deserve a button.

**`button-subtle`** — soft stone pill (`{colors.canvas-soft}`) for tertiary / in-card actions (e.g. 단어 상세).

**`grade-button`** — the study self-rating set (모름 · 어려움 · 앎 · 쉬움). A **neutral escalation**, because a set of peers has no single primary: outline → soft stone → stone → solid ink. Orange is *not* used here.

### Surfaces

**`card`** — the standard content card. `{colors.canvas}`, `{rounded.card}`, `{spacing.xl}` padding, flat (Level 0) or Level 1 soft shadow. The workhorse.

**`card-tinted`** — stone-soft sub-region card, no shadow. Use for a callout *inside* a screen — never nested inside another card (see composition rules).

**`kanji-tile`** — the large-kanji square, stone-soft fill, `{rounded.md}`.

### Reward System (lime lives here, and only here)

**`reward-chip`** — an earned/next ingredient (RICE). Stone-soft pill with a **lime-accented icon**. The chip body stays neutral; only the reward mark is lime.

**`ingredient-earned`** — a collected ingredient: **lime check** + ink label. Uncollected = mute outline + mute label.

**`progress-dots`** — outlined squares fill with ink as ingredients are earned; the *just-earned* dot may pulse lime briefly, then settle to ink.

### Labels, Badges, Metrics

**`section-label`** — uppercase tracked eyebrow (`{typography.label}`), `{colors.body}`. Groups a card's content (오늘의 학습, INGREDIENTS).

**`badge`** — JLPT / meta tag. **Neutral** stone pill (`{colors.canvas-soft}`), never orange — orange belongs to actions, not labels.

**`stat-block`** — one hero number (`display-xxl`) + a stacked `label` caption. **One hero number per card**; secondary metrics drop to a small pill, never a second giant number.

### Navigation

**`tab-bar`** — bottom tabs (오늘·메뉴·기록·설정). Text only; active = ink + 2px underline, inactive = body. Sits on `{colors.canvas-softer}` with a `{colors.surface-pressed}` top hairline.

**`list-row`** — collection/index row: `{typography.code}` index + `display-sm` title, `{colors.surface-pressed}` divider. Locked rows drop title + trailing to `{colors.mute}` with a lock glyph.

### Feedback

**`toast`** — transient confirmation on ink; **reward toasts (재료 획득!) carry a lime accent mark.** Pill shape, Level 1 shadow.

## Component Composition Rules

These are the "how pieces combine" guarantees — an AI or dev can self-check against them.

- **No card inside a card.** A `card` never contains another `card`. For a sub-region, use `card-tinted`, a divider, or plain spacing. Nested rounded surfaces read as a bug.
- **One `button-primary` per screen.** If two actions both feel primary, demote one to `button-secondary`. The orange is a spotlight, not a paint.
- **One hero number per card.** Additional metrics become pills / inline text (see the home card: `12` is hero, `복습 0` is a pill).
- **Lime only on reward.** If lime is about to appear and no ingredient/achievement is involved, it's wrong — use ink or stone.
- **Badges/labels stay neutral.** Never color a JLPT badge or section label with orange or lime.
- **Group by gap, not by box.** Prefer spacing (8–12 within, 28 between) over adding borders/cards to separate content.
- **Shadow is a rarity.** Only `card` (Level 1) and `toast` may cast one. Everything else is flat.
- **Full-pill controls, soft-radius cards.** Controls = `{rounded.pill}`; surfaces = `{rounded.lg}`/`{rounded.card}`. Don't mix (no rectangular buttons, no pill-shaped cards).

## Do's and Don'ts

### Do
- Keep orange `{colors.primary}` for the single primary action per screen — that scarcity *is* the conversion signal.
- Reserve lime `{colors.secondary}` strictly for reward/achievement — earning an ingredient, completing a recipe.
- Let the stone neutrals and Pretendard carry 90% of the UI; accents are the exception, not the rhythm.
- Group information by proximity: tight inside a group, a clear 28px jump between groups.
- Give every token a dark value and check contrast in both themes.
- Use tabular figures wherever numbers align or compare.
- Keep one hero number per card; demote the rest.

### Don't
- **No gradients.** Not on buttons, cards, backgrounds, or text. Flat fills only.
- **No text shadows**, and no drop shadow beyond the single Level 1 card shadow.
- **No second orange** on a screen, and no orange on labels, badges, or icons that aren't the primary action.
- **No lime as decoration** — if it's not a reward, it's not lime.
- **No card nested in a card**, and no rectangular (hard-corner) buttons.
- **No cool default grey** — neutrals are warm stone, chosen to match the orange.
- **No second typeface or monospace** — Pretendard does every role; labels get tracking, codes get tabular figures.
- **No all-caps headlines** — uppercase is only the tracked `label` eyebrow.
