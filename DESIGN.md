---
version: alpha
name: Onikan-design-system
description: The design language for Onikan (오니칸) — a restrained Japanese-vocabulary study game. A cool-neutral "Onikan Grey" ramp (hue 228, ~2.6% saturation) carried by Pretendard holds ~90% of the UI, where a single orange {colors.primary} owns conversion (one primary action per screen) and a lime {colors.secondary} is reserved strictly for the reward moment (earning an ingredient, completing a recipe). Card-based mobile layout, one line-art mascot ("사장"), first-class light and dark themes.

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
  shadow: "rgba(0,0,0,0.05)"

  # ─── Brand accents (sparse) ───
  primary: "#EA580C"            # orange-600 — the single conversion action per screen
  on-primary: "#1D1D21"         # ink — white on orange-600 is only 3.56:1 (fails AA); ink is 4.72:1
  on-ink: "#F7F7F9"             # grey-98 — foreground on an INK fill (toast, grade-button Easy)
  tab-active: "#C2410C"         # orange-700 — active tab icon+label (AA 4.63:1 on light)
  secondary: "#A3E635"          # lime-400 — the reward moment ONLY
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
  shadow: "rgba(0,0,0,0.4)"
  primary: "#F97316"            # orange-500 — pops on dark
  on-primary: "#1D1D21"
  on-ink: "#1D1D21"             # inverts with ink — a fixed value would put white on a white chip
  tab-active: "#EA580C"         # orange-600 (5.21:1 on dark)
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
    fontFamily: '"Pretendard JP", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif'
    fontSize: 52px
    fontWeight: 800
    lineHeight: 60px
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
    padding: "{spacing.xl}"
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

Onikan (오니칸) is a Japanese-vocabulary study game: finish a daily study set, earn an onigiri ingredient, complete recipes. The design language has to hold two feelings at once — the **calm focus** a study tool needs, and the **small reward rush** a game runs on. It resolves that tension with restraint: a quiet cool-neutral "Onikan Grey" canvas carried by Pretendard, and exactly two brand colours that each mean one specific thing.

- **Orange `{colors.primary}` = conversion.** It appears on the one primary action of a screen and almost nowhere else. When you see orange, you know what to tap.
- **Lime `{colors.secondary}` = reward.** It is the taste of progress — an ingredient earned, a recipe completed, a streak kept. It never decorates; it only celebrates.

Everything between those two moments is neutral grey. That is the whole system: **quiet by default, loud only where it means something.**

**Key Characteristics:**
- One conversion colour (orange), used at most once per visible screen. Restraint is the brand's confidence.
- One reward colour (lime), gated strictly to achievement moments. It is a *semantic* of joy, not a palette slot to fill.
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
- **Orange 600** (`{colors.primary}` — `#EA580C`): The single conversion colour — the one primary CTA per screen; on dark, brightens to orange-500 `#F97316`. Its label is `{colors.on-primary}` = ink `#1D1D21` in **both** themes: white on orange-600 measures only 3.56:1 and fails AA, while ink measures 4.72:1 — and dark mode already used ink, so the token is now consistent. The brand orange itself is unchanged. The active tab icon+label use `{colors.tab-active}` — orange-700 `#C2410C` on light (AA 4.63:1 at 12px), orange-600 `#EA580C` on dark (5.21:1).
- **Lime 400** (`{colors.secondary}` — `#A3E635`): The reward colour, used only at the *moment of earning* — the check badge on a new ingredient, the fade-out of a just-filled progress cell. Nowhere else. Text on lime is always `{colors.on-secondary}` `#1D1D21`.

> **Decision logic — which accent, if any?**
> 1. *Is this the one primary action on the screen?* → **orange** fill. If a second action competes, it becomes neutral (grey), not a second orange.
> 2. *Is this the moment the user earns a reward?* → **lime** is allowed — briefly.
> 3. *Neither?* → **no accent.** Use ink / grey. ~90% of the UI lives here.

### Surface — the "Onikan Grey" ramp (cool neutral)
Neutrals are the **Onikan Grey** ramp: hue 228 fixed, ~2.6% saturation — a deliberately *chosen* cool-leaning neutral, midway between pure grey (0%) and cool-neutral (~5%). Everything rides one axis (page `#F2F2F4`, cards, dividers, text) so nothing feels borrowed from another system.
- **Canvas** (`{colors.canvas}` — `#FFFFFF` / dark `#1D1D21`): Card surfaces.
- **Softer** (`{colors.softer}` — `#F2F2F4` / dark `#131316`, grey-97/10): Page background and tab bar.
- **Soft** (`{colors.soft}` — `#E8E8EC` / dark `#2B2B31`, grey-95/22): Pills, example blocks, segment-toggle track.
- **Pressed** (`{colors.pressed}` — `#DCDCE2` / dark `#3E3E45`, grey-90/30): Hairline dividers and incomplete progress cells.
- **Plate** (`{colors.plate}` — `#EDEDF1`, grey-96): The tile behind an illustration — **fixed in both themes**.

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
Dark is a designed theme, not an inversion. Page drops to grey-10 `#131316`, cards to grey-15 `#1D1D21`, orange brightens to orange-500 so it stays the loudest thing on screen, lime holds `#A3E635`, and the illustration `plate` stays fixed. Contrast holds in both themes (body ≥ 7:1, mute ~3.4:1 by design).

Two tokens **must** invert rather than hold a fixed value:
- `{colors.on-ink}` — foreground on an ink fill. `ink` itself flips (`#1D1D21` → `#F7F7F9`), so a fixed light `on-ink` would put white text on a white chip. It flips with it: `#F7F7F9` → `#1D1D21`.
- The four status colours above, for the AA reason already given.

Everything that legitimately stays fixed in both themes: `plate`, `secondary`, `on-secondary`, `on-primary`.

## Typography

### Font Family
**Pretendard JP** carries the entire system — Korean, Japanese and Latin, weights 400–800. It replaces Uber's two proprietary faces with one open-source family (SIL OFL) that renders Korean beautifully and pairs its Latin glyphs cleanly. There is no second face and no monospace: the old mono "eyebrow / code" role is handled by Pretendard with letter-spacing (labels) and tabular figures (codes).

**Use the JP cut, not plain Pretendard.** This is a hard requirement for a Japanese-vocabulary app, not a preference. Plain Pretendard carries 14,336 glyphs — kana and hangul are present, but **kanji are entirely absent** (漢, 字, 運 all missing), so `{components.kanji-tile}` renders empty and no font fallback rescues it. Pretendard JP is the same typeface with the kanji set added (22,059 glyphs): identical design, identical metrics, complete coverage.

Fallback stack: `"Pretendard JP", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif`.

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
| `{typography.body-sm-strong}` | 14px | 600 | 20px | Reward-chip label. |
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
| Level 0 — Flat | No shadow, no border. | Default for nearly everything; cards separate from the grey page by fill contrast alone. |
| Level 1 — Soft Card | `rgba(0,0,0,0.05) 0 6px 14px` | Standard content cards, the reward chip. The *only* shadow in the system. |

Depth cues are **fill polarity** (white card on grey page; ink card for a dark promo moment) and **proximity**, not stacked shadows. There is no Level 2/3 — see Don'ts.

## Shapes

| Token | Value | Use |
|---|---|---|
| `{rounded.none}` | 0px | Full-bleed bands, raw dividers. |
| `{rounded.sm}` | 12px | Small tiles (kanji tile). |
| `{rounded.md}` | 18px | Secondary cards, inputs, kanji tile. |
| `{rounded.lg}` | 22px | Sub-region card (`card-tinted`). |
| `{rounded.card}` | 24px | Standard content card (`card`) and hero / feature card. |
| `{rounded.pill}` | 999px | Every interactive control — buttons, chips, badges. |
| `{rounded.full}` | 9999px | Circular icon containers. |

The signature is a **soft, generous radius**: cards at 22–24px, every control a full pill. Nothing in the UI is a hard rectangle except full-bleed edges and dividers.

## Components

### Actions

**`button-primary`** — the orange conversion pill. Background `{colors.primary}`, text `{colors.on-primary}`, `{typography.button-large}`, `{rounded.pill}`, padding `{spacing.xl} {spacing.xl}`, full-width at screen bottom.
- **When to use:** the single most important action on the screen. If you're about to add a second orange pill, stop — one of them is secondary.

**`button-secondary`** — surface pill, ink text. Non-primary actions that still deserve a button.

**`button-subtle`** — soft grey pill (`{colors.soft}`) for tertiary / in-card actions (e.g. 단어 상세).

**`grade-button`** — the study self-rating set (모름 · 어려움 · 앎 · 쉬움). A **neutral escalation**, because a set of peers has no single primary: outline → soft grey @ 60% → soft grey → solid ink. Orange is *not* used here. The Easy chip's label is `{colors.on-ink}`, which inverts with the fill so the step reads in both themes.

### Surfaces

**`card`** — the standard content card. `{colors.canvas}`, `{rounded.card}`, `{spacing.xl}` padding, flat (Level 0) or Level 1 soft shadow. The workhorse.

**`card-tinted`** — grey-soft sub-region card, no shadow. Use for a callout *inside* a screen — never nested inside another card (see composition rules).

**`kanji-tile`** — the large-kanji square, grey-soft fill, `{rounded.md}`.

### Reward System (lime lives here, and only here)

**`reward-chip`** — an earned/next ingredient (RICE). Grey-soft pill with a **lime-accented icon**. The chip body stays neutral; only the reward mark is lime.

**`ingredient-earned`** — a collected ingredient: **lime check** + ink label. Uncollected = mute outline + mute label.

**`progress-dots`** — outlined squares fill with ink as ingredients are earned; the *just-earned* dot may pulse lime briefly, then settle to ink.

### Labels, Badges, Metrics

**`section-label`** — uppercase tracked eyebrow (`{typography.label}`), `{colors.body}`. Groups a card's content (오늘의 학습, INGREDIENTS).

**`badge`** — JLPT / meta tag. **Neutral** grey pill (`{colors.soft}`), never orange — orange belongs to actions, not labels.

**`stat-block`** — one hero number (`display-xxl`) + a stacked `label` caption. **One hero number per card**; secondary metrics drop to a small pill, never a second giant number.

### Navigation

**`tab-bar`** — bottom tabs (오늘·메뉴·기록·설정). Text only; active = ink + 2px underline, inactive = body. Sits on `{colors.softer}` with a `{colors.pressed}` top hairline.

**`list-row`** — collection/index row: `{typography.code}` index + `display-sm` title, `{colors.pressed}` divider. Locked rows drop title + trailing to `{colors.mute}` with a lock glyph.

### Feedback

**`toast`** — transient confirmation on ink; **reward toasts (재료 획득!) carry a lime accent mark**, plain ones (저장했어) do not. Pill shape, Level 1 shadow. The two variants exist precisely so lime stays gated to the earn moment instead of riding along on every toast.

## Component Composition Rules

These are the "how pieces combine" guarantees — an AI or dev can self-check against them.

- **No card inside a card.** A `card` never contains another `card`. For a sub-region, use `card-tinted`, a divider, or plain spacing. Nested rounded surfaces read as a bug.
- **One `button-primary` per screen.** If two actions both feel primary, demote one to `button-secondary`. The orange is a spotlight, not a paint.
- **One hero number per card.** Additional metrics become pills / inline text (see the home card: `12` is hero, `복습 0` is a pill).
- **Lime only on reward.** If lime is about to appear and no ingredient/achievement is involved, it's wrong — use ink or grey.
- **Badges/labels stay neutral.** Never color a JLPT badge or section label with orange or lime.
- **Group by gap, not by box.** Prefer spacing (8–12 within, 28 between) over adding borders/cards to separate content.
- **Shadow is a rarity.** Only `card` (Level 1) and `toast` may cast one. Everything else is flat.
- **Full-pill controls, soft-radius cards.** Controls = `{rounded.pill}`; surfaces = `{rounded.lg}`/`{rounded.card}`. Don't mix (no rectangular buttons, no pill-shaped cards).

## Do's and Don'ts

### Do
- Keep orange `{colors.primary}` for the single primary action per screen — that scarcity *is* the conversion signal.
- Reserve lime `{colors.secondary}` strictly for reward/achievement — earning an ingredient, completing a recipe.
- Let the Onikan Grey neutrals and Pretendard carry ~90% of the UI; accents are the exception, not the rhythm.
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
- `on-primary` was white on orange-600: **3.56:1, failing**. Now ink in both modes (**4.72:1** / 5.99:1). The brand orange is untouched; darkening `primary` to orange-700 was rejected because it would collide with `tab-active`.
- Status colours had no dark values, so each failed AA in one theme. Now mode-aware — see the Semantic table.

**Typeface** — **Pretendard → Pretendard JP.** Plain Pretendard has no kanji at all, so the kanji tile rendered empty.

**Corrections to stated figures** — `body` on canvas is **7.27:1** in light, not 8.3:1. `tab-active` on dark is **5.21:1**, not 5.55:1. Both still satisfy their principles; the numbers were simply wrong.

**Clarification** — the Shapes table listed `rounded.lg` (22px) as the standard content card while `components.card` specified `rounded.card` (24px). The component definition wins: `card` = 24px, `card-tinted` = 22px.

**Known manual step** — the `code` role needs tabular figures enabled by hand in Figma (Type settings → Details → `tnum`). The Figma Plugin API can read OpenType features but cannot set them.
