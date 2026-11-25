---
version: beta.1
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
  softer: "#F5F5F5"             # page background, tab bar — OFF-RAMP neutral by decision D0-2 (2026-11): warmer than grey-97 to sit with the illustrations. grey-97 stays in the ramp.
  soft: "#E8E8EC"               # grey-95 — pills, example block, segment track
  pressed: "#DCDCE2"            # grey-90 — hairline dividers, incomplete progress cell
  plate: "#EDEDF1"              # grey-96 — illustration backing tile (FIXED in both themes)
  bar-fill: "#71717A"           # grey-50 — progress-bar fill in BROWSING contexts (FIXED in both themes)
  shadow: "rgba(0,0,0,0.05)"

  # ─── Brand accents (sparse) ───
  # 2026-08: PRIMARY ACTION = INK ({ink}+{on-ink}), NOT orange. Orange = brand/status accent.
  primary: "#EF5112"            # bright brand orange — BRAND/STATUS accent (tab, 단골 stamps, overlines, 진행 중 badge, chart "you are here", 음독 pills). NOT the primary button.
  primary-pressed: "#D2460E"    # pressed orange (when orange is an interactive accent)
  primary-soft: "#FCE8DE"       # orange-soft surface — 진행 중 status badge background
  ink-pressed: "#131316"        # grey-10 — pressed state of the ink primary button
  on-ink: "#F7F7F9"             # grey-98 — label on an INK fill = the PRIMARY BUTTON label (15.8:1)
  on-primary: "#FFFFFF"         # white on orange — only if orange is ever used as a fill (badge/stamp); check contrast per use. (Primary CTAs no longer use orange.)
  tab-active: "#C2410C"         # orange-700 — active tab icon+label (AA 4.63:1). NOT primary — #EF5112 is only 3.21:1 as a 12px tint on the light tab bar
  secondary: "#A3E635"          # lime-400 — PROGRESS & REWARD (N5 arc gauge, 복습 완료 card, earned check, 완성 badge)
  on-secondary: "#1D1D21"
  secondary-soft: "#EAF6DD"     # light-green surface — completion card, 완료 status badge
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
  primary-soft: "#3A2216"       # tone only — no bright surface on dark
  ink-pressed: "#FFFFFF"        # ink inverts to light in dark, so pressed goes one step lighter
  secondary-soft: "#26301A"
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
    letterSpacing: 0px
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
  # ─── 2026-11-16 added to match code (AshitaKanji-app PR #14). Figma styles created 2026-11-16. ───
  body-example:
    # Japanese example sentence on the study card.
    fontSize: 16px
    fontWeight: 500
    lineHeight: 26px
  code-strong:
    # Emphasised tabular number.
    fontSize: 13px
    fontWeight: 600
    lineHeight: 18px
    fontVariantNumeric: tabular-nums
  receipt-title:
    # Receipt wordmark only (ONIGIRI SHOP). ls 4 (2026-11-16). Figma family should be Pretendard JP.
    fontSize: 15px
    fontWeight: 600
    lineHeight: 22px
    letterSpacing: 4px
  receipt-footer:
    # Receipt last line only.
    fontSize: 12px
    fontWeight: 500
    lineHeight: 16px
    letterSpacing: 3px
  receipt-body:
    # Receipt rows (mono replacement).
    fontSize: 13px
    fontWeight: 400
    lineHeight: 20px
    fontVariantNumeric: tabular-nums

rounded:
  # SEED radius scale as-is (N-3, 2026-11-10): name = value ÷ 4, half steps "_5" up to 16.
  # Onikan uses only the steps below. Components reference the ROLE aliases (card, card-tinted, receipt, pill).
  none: 0px
  r1: 4px           # small bars, chart bars (2026-11-16, C-24)
  r1_5: 6px         # ~22px marks (calendar day mark)
  r2: 8px           # photos inside a card, skeletons
  r2_5: 10px        # receipt
  r3: 12px          # small tiles (kanji tile, 44px-and-under thumbnails)
  r3_5: 14px        # medium tiles (44–48px thumbnails)
  r4: 16px          # secondary cards / inputs / large tiles (was 18 — not on the SEED scale)
  r5: 20px          # grey card-tinted (was 22 — not on the SEED scale)
  r6: 24px          # white cards
  full: 9999px      # every interactive control + circular icon containers (pill and full merged, as in SEED)
  # Role aliases
  card: "{rounded.r6}"          # 24 — EVERY white card (D0-3)
  card-tinted: "{rounded.r5}"   # 20 — grey sub-region card, one step under the white card
  receipt: "{rounded.r2_5}"     # 10 — THE receipt, and nothing else; this one radius carries the "paper" signal
  pill: "{rounded.full}"        # buttons, chips, badges

spacing:
  # Names = multiples of 4px (SEED-style, N-1 2026-11). Old names in brackets.
  x1: 4px        # [xs]
  x2: 8px        # [sm]
  x3: 12px       # [md]
  x4: 16px       # [lg]
  x5: 20px       # [xl]
  x6: 24px       # [2xl] gap BETWEEN groups (D0-4)
  x7: 28px       # [xxl]
  x10: 40px      # [huge] gap between major sections · top of screen

# Layout roles (2026-11, D0-1/D0-4/D0-5). Reference spacing — never a raw number in a screen.
layout:
  gutter: "{spacing.x4}"          # 16 — screen left/right margin (Figma 2026-09-01 decision; was 20)
  gap-tight: "{spacing.x3}"       # 12 — inside one group (8–12)
  gap-group: "{spacing.x6}"       # 24 — between groups
  gap-section: "{spacing.x10}"    # 40 — between major sections
  touch-target: 44px
  cta-height: 56px                # button-primary and grade-button share it
  session-top-bar: 52px           # 44 nav (close 48×44 + counter) + 4px progress bar under it

components:
  # ─── Actions ───
  button-primary:
    description: "THE single primary action of a screen (e.g. Start Study). INK pill (2026-08: was orange). At most one per visible screen; a competing action is a white outline."
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"
    typography: "{typography.button-large}"
    rounded: "{rounded.pill}"
    padding: "{spacing.x4} {spacing.x5}"   # 16 + 24 lineHeight + 16 = 56px, the confirmed CTA height
  button-secondary:
    description: "Paired or standalone non-primary action. Surface pill, ink text."
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
    rounded: "{rounded.pill}"
    padding: "{spacing.x3} {spacing.x5}"
  button-subtle:
    description: "Tertiary / in-card action (e.g. 단어 상세). Soft grey pill."
    backgroundColor: "{colors.soft}"
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
    rounded: "{rounded.pill}"
    padding: "{spacing.x3} {spacing.x4}"
  button-outline:
    description: "Weak action beside a primary at the same height (C3-1). White pill + 1.5 pressed border."
    backgroundColor: "{colors.canvas}"
    borderColor: "{colors.pressed}"   # 1.5px, inside
    textColor: "{colors.ink}"
    typography: "{typography.button-large}"
    rounded: "{rounded.pill}"
    padding: "{spacing.x4} {spacing.x5}"   # 56
  grade-button:
    description: "The study self-rating PAIR (2026-11, D0-5: was 4-step). Two equal-width buttons side by side: 다시 볼래요 (outline) · 한 번 익혔어요 (ink), each with a consequence sublabel (C3-8, 2026-11-26): 오늘 한 번 더 · 며칠 뒤 다시. 회독 variant relabels to 모름 · 안다. Figma 847:13042."
    typography: "{typography.card-title}"   # 17/24 600 — label
    sublabelTypography: "{typography.code}" # 13/18 500 — consequence line. Exception to the 15px body floor (C3-8): a 2-word line inside a 72-high button, never body copy
    rounded: "{rounded.r5}"                 # 20 — answer buttons, NOT pill (C3-8). Exception to "Full-pill controls"
    height: 72                              # C3-8 (was {layout.cta-height} 56): two lines need 24 + 2 + 18 + 12×2
    gap: "{spacing.x2}"             # 8 between the two buttons; 2 between label and sublabel
    padding: "{spacing.x3} {spacing.x5}"   # 12 / 20
    variants:
      again: "outline 1px {colors.pressed} on {colors.canvas}, label {colors.ink}, sublabel {colors.body} (Figma has mute — 3.4:1 on white fails AA for 13px, so body)"
      good: "fill {colors.ink}, label {colors.on-ink}, sublabel {colors.mute} (5.2:1 on ink — passes AA; the mute 'locked only' rule is about light surfaces)"

  # ─── Surfaces ───
  card:
    description: "Standard content card (learning card, kanji card, example, now-making). Flat by default; Level 1 shadow optional."
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.card}"
    padding: "{spacing.x4}"   # 16 for EVERY white card — C3-5 revised 2026-11-16 (was 3 steps 16/20/24)
  card-tinted:
    description: "Sub-region card on a page. Grey-soft fill, no shadow."
    backgroundColor: "{colors.soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card-tinted}"
    padding: "{spacing.x5}"
  kanji-tile:
    description: "The single large-kanji square inside a card. Soft grey fill. Requires the JP font cut — see typography."
    backgroundColor: "{colors.soft}"
    textColor: "{colors.ink}"
    typography: "{typography.display-xxl}"
    rounded: "{rounded.r4}"
    size: 104x104

  # ─── Reward system (lime lives here, and ONLY here) ───
  reward-chip:
    description: "An earned/next ingredient (e.g. RICE). Grey tile pill; the icon carries the lime reward accent."
    backgroundColor: "{colors.soft}"
    textColor: "{colors.ink}"
    accent: "{colors.secondary}"
    typography: "{typography.body-sm-strong}"
    rounded: "{rounded.pill}"
    padding: "{spacing.x2} {spacing.x3}"
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
    description: "JLPT level / meta tag. NEUTRAL by default. Status badges are the exception: 진행 중 = {colors.primary-soft} + primary, 완료(챕터) = {colors.secondary-soft}, 완성(새 주먹밥) = {colors.primary-soft} + {colors.link} (Figma `badge` default, 2026-11-11)."
    backgroundColor: "{colors.soft}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "{spacing.x1} {spacing.x3}"
  stat-block:
    description: "Big-number metric + stacked caption (12 / 새 단어). One hero number per card."
    valueTypography: "{typography.display-xxl}"
    captionTypography: "{typography.label}"
  stat-tile-summary:
    description: "Result-screen summary tile, used in a row of three (학습 단어 · 학습 시간 · 단골 기록). Value carries its unit (6분, 5일). Figma `hero-card` in 주먹밥 완성 `638:7977`; code `<StatTile variant=\"summary\">`."
    backgroundColor: "{colors.softer}"
    borderColor: "{colors.pressed}"   # 0.8px
    rounded: "{rounded.r3}"           # 12
    height: 66px
    padding: "0 {spacing.x2}"
    gap: 6px
    valueTypography: "{typography.body-md-strong}"   # 16/22 600
    labelTypography: "{typography.body-sm}"          # 14/20 400 (2026-11-11, was 14/500 in Figma)
  owner-quote-card:
    description: "사장님 한마디 — bottom of the 주먹밥 완성 screen, 20 above the CTA. Cat 48 + per-menu line (`card-title`) + '- 사장님' (`body-base`, {colors.body}). Figma `progress-card` in `638:7977`; code `OwnerQuoteCard`."
    backgroundColor: "{colors.softer}"
    rounded: "{rounded.card-tinted}"  # 20
    shadow: "0 6px 14px {colors.shadow}"
    padding: "16px 16px 16px 18px"
    gap: 14px
    motion: "Enters 0.6s after the screen: rises 16px with a light spring (≈2px overshoot), then the cat hops 6px once. Once only; none under reduced motion."

  # ─── Navigation ───
  tab-bar:
    description: "Bottom tab bar (오늘·메뉴·기록·설정). Icon 24 + label 12, gap 2, item 44 high; active = {colors.tab-active} tint on both (line → fill icon), no underline/fill/badge. Padding 8 top / 12 bottom."
    backgroundColor: "{colors.canvas}"   # 2026-11-11: white bar (was softer) — follows the rebuilt Figma tab bar; flips in dark
    activeColor: "{colors.tab-active}"
    inactiveColor: "{colors.body}"
    typography: "{typography.tab-label}"
    activeTypography: "{typography.tab-label-active}"
    topBorder: "{colors.pressed}"
  list-row:
    description: "Collection / index row (001 TUNA MAYO / LOCKED). Locked rows drop to mute."
    textColor: "{colors.ink}"
    mutedColor: "{colors.mute}"
    typography: "{typography.display-sm}"
    codeTypography: "{typography.code}"
    divider: "{colors.pressed}"
    padding: "{spacing.x4} {spacing.x5}"   # 16 / 20 — height follows content (60), C3-6
    gap: "{spacing.x3}"                    # 12 (was 14 in COMPONENTS.md)

  # ─── Feedback ───
  toast:
    description: "Transient confirmation (e.g. 재료 획득!). Reward toasts carry a lime accent mark; plain ones do not."
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"
    accent: "{colors.secondary}"
    rounded: "{rounded.pill}"
    padding: "{spacing.x3} {spacing.x4}"
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
Neutrals are the **Onikan Grey** ramp: hue 228 fixed, ~2.6% saturation — a deliberately *chosen* cool-leaning neutral, midway between pure grey (0%) and cool-neutral (~5%). Everything rides one axis (cards, dividers, text) so nothing feels borrowed from another system. **One deliberate exception: the page background `softer` is `#F5F5F5`**, a plain neutral picked to sit with the warm illustrations (D0-2, 2026-11).
- **Canvas** (`{colors.canvas}` — `#FFFFFF` / dark `#1D1D21`): Card surfaces.
- **Softer** (`{colors.softer}` — `#F5F5F5` / dark `#131316`): Page background and tab bar. Light value is off-ramp by decision (D0-2); dark stays grey-10. The only page background — no screen-specific page colours. **One exception: the 주먹밥 완성 celebration screen sits on `{colors.canvas}` (white)** so the illustration and confetti read clean; its grey tiles and owner card then carry `{colors.softer}` (2026-11-11, Figma `638:7977`).
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
| `{typography.label}` | 12px | 500 | 16px | Eyebrows / group labels — uppercase, no tracking (2026-11-16). |
| `{typography.code}` | 13px | 500 | 18px | Codes & indices (001, N5, 0/4) — tabular figures. |
| `{typography.button-large}` | 18px | 600 | 24px | Primary button label. |
| `{typography.button-md}` | 16px | 600 | 20px | Default button label. |
| `{typography.tab-label}` | 12px | 500 | 16px | Bottom tab label — **not** uppercase, −0.1 tracking. |
| `{typography.tab-label-active}` | 12px | 600 | 16px | Bottom tab label, active. |
| `{typography.body-example}` | 16px | 500 | 26px | Japanese example sentence (study card). |
| `{typography.code-strong}` | 13px | 600 | 18px | Emphasised tabular number. |
| `{typography.receipt-title}` | 15px | 600 | 22px | Receipt wordmark only — +4 tracking. |
| `{typography.receipt-footer}` | 12px | 500 | 16px | Receipt last line only — +3 tracking. |
| `{typography.receipt-body}` | 13px | 400 | 20px | Receipt rows — tabular figures. |

Code names are the camelCase of these names (`display-md` → `typography.displayMd`, D0-13).

### Principles
- **One family, many weights.** Hierarchy comes from size + weight, never from a second typeface.
- **Sentence-case headings; UPPERCASE only for `label` eyebrows.** The tracked uppercase label is the one place caps appear.
- **Numbers align.** Any digits that stack or compare (progress, counts, codes) use tabular figures.
- **No tracking flourish on display** — only the `label` role is letter-spaced.

## Layout

### Spacing Philosophy
Base unit **4px**. Grouping is done with spacing, not borders — *proximity is the primary grouping device.*

- **Within a component** (label → value → caption): tight, `{spacing.x2}`–`{spacing.x3}` (8–12px). Elements that belong together sit close.
- **Between components / cards**: `{layout.gap-group}` (24px). The gap between two cards is what makes them read as separate groups.
- **Section / screen padding**: horizontal gutter `{layout.gutter}` (16px, D0-1 — was 20); top of screen `{spacing.x10}` (40px) to let the first headline breathe.
- **Card interior**: `{spacing.x6} {spacing.x5}` (24 vertical / 20 horizontal) on hero and reward cards; compact progress and list cards tighten to `{spacing.x4}`.

> **Decision logic — how much gap?** *Same idea* → 8–12px (`gap-tight`). *Different groups* → 24px (`gap-group`, `{spacing.x6}`). *Different sections* → 40px (`gap-section`). Use only these three; values like 14, 18, 30 are snapped to the nearest role. (D0-4, 2026-11: group gap 28 → 24, matching the latest screens.)

### Grid & Container
Single-column mobile. Content aligns to one **left spine** at the 16px gutter (strong reading edge); the primary button intentionally breaks that spine by going full-width to signal "action." Bottom tab bar is fixed; screen content reserves space for it via a safe-area inset (never overlaps).

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
| `{rounded.r1}` | 4px | Small bars, chart bars. *(2026-11-16, C-24.)* |
| `{rounded.r1_5}` | 6px | Marks around 22px (calendar day mark). |
| `{rounded.r2}` | 8px | Photos inside a card, loading skeletons. |
| `{rounded.r2_5}` · `{rounded.receipt}` | 10px | **The receipt, and nothing else.** This single radius carries the "paper" signal, so it must not appear anywhere else. *(Figma 2026-08: 4→10.)* |
| `{rounded.r3}` | 12px | Small tiles (kanji tile, small thumbnails). |
| `{rounded.r3_5}` | 14px | Medium thumbnails (44–48px). |
| `{rounded.r4}` | 16px | Secondary cards, inputs, large tiles. *(N-3: 18→16.)* |
| `{rounded.r5}` · `{rounded.card-tinted}` | 20px | Grey sub-region card (`card-tinted`). *(N-3: 22→20.)* |
| `{rounded.r6}` · `{rounded.card}` | 24px | Every white card (`card`), including hero / feature cards. |
| `{rounded.full}` · `{rounded.pill}` | 9999px | Every interactive control — buttons, chips, badges — and circular icon containers. |

Every value sits on the SEED radius scale (`r` + value ÷ 4); nothing off-scale is allowed.

The signature is a **soft, generous radius**: cards at 20–24px, every control a full pill. Nothing in the UI is a hard rectangle except full-bleed edges and dividers.

## Components

### Actions

**`button-primary`** — the **ink** action pill. Background `{colors.ink}`, label `{colors.on-ink}` `#F7F7F9`, `{typography.button-large}`, `{rounded.pill}`, padding `{spacing.x5}`, full-width at screen bottom. *(2026-08: primary CTA is ink, was orange.)*
- **When to use:** the single most important action on the screen (학습 시작하기 · 회독하기 · 한 번 익혔어요 · 지금 연습하기 · 오늘 학습 시작 · 영수증 받고 마치기 · 확인). If a second action competes, it becomes a **white outline**, not a second ink pill.

**`button-outline`** — **white outline** pill (`{colors.canvas}` + 1.5px `{colors.pressed}`, ink label, 56 high) for a weak action beside a primary, or a de-emphasised CTA (나중에 · 백업 내보내기 · 완료-state 회독하러 가기). Pressed → `{colors.soft}`. The grade pair's 다시 볼래요 uses the same colours, but its own shape (72 high, `r5` 20, 1px border — C3-8). **`button-secondary`** is the borderless white pill (`{colors.canvas}`, 44 high) for small actions on a grey page or overlay (확인했어 · 공유). *(C3-1, 2026-11-11: the docs used to call both "secondary".)*

**`button-subtle`** — soft grey pill (`{colors.soft}`) for tertiary / in-card actions (e.g. 단어 상세).

**`grade-button`** — the study self-rating **pair** (다시 볼래요 · 한 번 익혔어요; 회독: 모름 · 안다). Two equal-width pills, height 56 (= `button-primary`), 8 apart: outline → ink. Orange is *not* used here. *(2026-11, D0-5: the 4-step 모름·어려움·앎·쉬움 set is retired.)*

### Surfaces

**`card`** — the standard content card. `{colors.canvas}`, `{rounded.card}` (24 — **every white card**, D0-3), `{spacing.x4}` (16) padding — one value for every card, flat (Level 0) or Level 1 soft shadow. The workhorse.

**`card-tinted`** — grey-soft sub-region card, no shadow. Use for a callout *inside* a screen — never nested inside another card (see composition rules).

**`kanji-tile`** — the large-kanji square, grey-soft fill, `{rounded.r4}`.

### Progress & Reward (lime / green)

**`arc-gauge`** — macro progress ring/arc (N5 전체 진척도, 반원). A lime→green sweep on a `{colors.soft}` track; the % and label read *before* the arc. Small — under half the card. Linear bars are for *current-task* progress; the arc is for *whole-level* progress (never both in the same role). *(2026-08 신규.)*

**`reward-chip`** — an earned/next ingredient (RICE). Grey-soft pill with a **lime-accented icon**. The chip body stays neutral; only the reward mark is lime.

**`ingredient-earned`** — a collected ingredient: **green/lime check** + ink label. Uncollected = mute outline + mute label.

**`completion-card`** — a done-state callout (오늘 복습 완료): **light-green tint** surface + green check + short line. No CTA (or a de-emphasised outline).

**`progress-dots`** — outlined squares fill with ink as ingredients are earned; the *just-earned* dot may pulse lime briefly, then settle to ink.

**`streak-stamp` (단골 도장)** — the loyalty stamp: an **orange** onigiri stamp for each kept day, grey dashed for unfilled. This is the one place a warm brand fill (orange) marks a streak — brand identity, not a reward check. *(2026-08: 단골 = orange, not lime.)*

### Labels, Badges, Metrics

**`section-label`** — uppercase tracked eyebrow (`{typography.label}`), `{colors.body}`. Groups a card's content (오늘의 학습, INGREDIENTS).

**`badge`** — JLPT / meta tag = **neutral** grey pill (`{colors.soft}`). **Status** badges are the deliberate exception: `진행 중` = orange-soft pill (`{colors.primary-soft}` `#FCE8DE` + primary text), `완료` (chapter) = green-soft pill (`{colors.secondary-soft}` `#EAF6DD`), `완성` (a new onigiri) = orange-soft pill + `{colors.link}` text, 12/500, padding 4/12, centred above the menu name, `잠김` = mute text. Status badges carry colour because they signal state, not because they are actions.

**`stat-block`** — one hero number (`display-xxl`) + a stacked `label` caption. **One hero number per card**; secondary metrics drop to a small pill, never a second giant number.

**`stat-tile-summary`** — three equal tiles in a row on a result screen: value with its unit (`20` · `6분` · `5일`, 16/600) over a `body-sm` (14/20 400) `{colors.body}` label, centred, 66 high, `{colors.softer}` + 0.8px `{colors.pressed}` border, radius 12, gap 8. Units go in the value, not the label (`학습 시간`, not `학습 시간(분)`).

**`owner-quote-card`** — the owner's one-liner that closes a celebration screen: cat 48 · per-menu line in `card-title` · `- 사장님` in `body-base`. `{colors.softer}`, radius 20, Level-1 shadow, padding 16/16/16/18, gap 14; sits 20 above the CTA. Lines live with the menu (`ownerLine`); default `오늘 것도 잘 만들었네.` Motion: rises 16px with a light spring 0.6s after the screen opens, then **only the cat** hops 6px once — the card itself never bounces (it would compete with the confetti and the CTA).

### Navigation

**`tab-bar`** — bottom tabs (오늘·메뉴·기록·설정). Icon + label; **active = `{colors.tab-active}` (orange) tint** on both, inactive = `{colors.body}`; the active icon switches from the line to the fill shape. Icon 24, label 12, gap 2. No underline / fill / badge. Sits on `{colors.canvas}` with a `{colors.pressed}` top hairline. Figma: `tab-bar` = `Bottom Navigation` (`Active` = today·menu·record·setting) built from `tab-item` (`Tab` × `Active`) and the `icon` set (`name` × `style` = line·fill). (The active-tab orange is one of orange's few jobs now.)

**`list-row`** — collection/index row: `{typography.code}` index + `display-sm` title, `{colors.pressed}` divider. Locked rows drop title + trailing to `{colors.mute}` with a lock glyph.

### Feedback

**`toast`** — transient confirmation on ink; **reward toasts (재료 획득!) carry a lime accent mark**, plain ones (저장했어) do not. Pill shape, Level 1 shadow. The two variants exist precisely so lime stays gated to the earn moment instead of riding along on every toast.

## Component Composition Rules

These are the "how pieces combine" guarantees — an AI or dev can self-check against them.

- **No card inside a card.** A `card` never contains another `card`. For a sub-region, use `card-tinted`, a divider, or plain spacing. Nested rounded surfaces read as a bug.
- **One `button-primary` (ink) per screen.** If two actions both feel primary, demote one to a `button-outline` white outline. The ink pill is the spotlight — never two.
- **One hero number per card.** Additional metrics become pills / inline text (see the home card: `12` is hero, `복습 0` is a pill).
- **Lime/green = progress or reward.** It belongs on the arc gauge, a completion card, or an earned check — a progress/achievement semantic, not decoration. **Orange never means "tap here."** If orange is about to sit on a primary button, it's wrong — the primary is ink.
- **Badges/labels stay neutral.** Never color a JLPT badge or section label with orange or lime.
- **Group by gap, not by box.** Prefer spacing (8–12 within, 24 between, 40 between sections) over adding borders/cards to separate content.
- **Shadow is a rarity.** Only `card` (Level 1) and `toast` may cast one. Everything else is flat.
- **Full-pill controls, soft-radius cards.** Controls = `{rounded.pill}`; white cards = `{rounded.card}` (24); grey `card-tinted` = `{rounded.card-tinted}` (20). Don't mix (no rectangular buttons, no pill-shaped cards). **One exception: `grade-button` = `{rounded.r5}` 20, 72 high (C3-8)** — the self-rating pair is an *answer choice* with a two-line label, not an action; a 72-high pill reads as a giant CTA and squeezes the text.

## Do's and Don'ts

### Do
- Make the single primary action per screen an **ink** pill (`{colors.ink}` + `{colors.on-ink}`); a competing action is a white outline.
- Keep orange `{colors.primary}` for **brand/status** only — active tab, 단골 stamps, section overlines, 진행 중 badge, a chart's "you are here" mark. Its scarcity as an accent *is* the brand signal.
- Use lime/green `{colors.secondary}` for **progress & reward** — the arc gauge, a completion card, an earned check, a 완성 badge.
- Let the Onikan Grey neutrals and Pretendard carry ~85% of the UI; accents are the exception, not the rhythm.
- Group information by proximity: tight inside a group, a clear 24px jump between groups, 40px between sections.
- Give every token a dark value and check contrast in both themes.
- Use tabular figures wherever numbers align or compare.
- Keep one hero number per card; demote the rest.

### Don't
- **No gradients.** Not on buttons, cards, backgrounds, or text. Flat fills only.
- **No text shadows**, and no drop shadow beyond the single Level 1 card shadow.
- **No orange on a primary button** — the primary is ink. Orange is brand/status only (tab, 단골 stamps, overlines, 진행 중 badge, chart "you are here"); don't spread it onto plain labels or icons.
- **No lime/green as decoration** — if it's not progress or a reward, it's not lime.
- **No card nested in a card**, and no rectangular (hard-corner) buttons.
- **No other neutrals** — neutrals are the Onikan Grey ramp (cool, hue 228, ~2.6% sat), plus the single page background `softer #F5F5F5` (D0-2). Don't add stone, zinc or screen-specific page colours.
- **`mute` is not a caption colour** — it's for LOCKED / placeholder only (3.4:1). To quiet a caption, lower size/weight, not colour.
- **Lime only at the earn moment** — the check badge or a just-filled progress cell's fade-out. Never as steady-state decoration.
- **No second typeface or monospace** — Pretendard does every role; labels get tracking, codes get tabular figures.
- **No all-caps headlines** — uppercase is only the tracked `label` eyebrow.

## Implemented Variant Axes

> ⚠️ **2026-11:** the Figma library below is still the alpha.1 build — `button-primary` is orange and `tab-bar` is text + underline there, and the redesign components are missing. Refresh is step 2 of the 2026-11 plan; until then **this document wins** over the library.

The Figma library ships 16 components. Only these carry variants — everything else is a single component, because a variant axis is only justified where the spec actually defines alternate states.

| Component | Axis | Values |
|---|---|---|
| `grade-button` | `State` | Unknown · Hard · Known · Easy *(retired 2026-11 → Again · Good pair, D0-5)* |
| `card` | `Elevation` | Flat · Level 1 |
| `ingredient-earned` | `State` | Earned · Locked |
| `progress-dots` | `State` | Empty · Filled |
| `tab-bar` | `Active` | 오늘 · 메뉴 · 기록 · 설정 |
| `list-row` | `State` | Default · Locked |
| `toast` | `Type` | Reward · Plain |

`button-primary`, `button-secondary` and `button-subtle` are deliberately **three separate components, not one variant set** — they differ in typography *and* padding (`button-large` + 20/20 vs `button-md` + 12/20 vs `button-md` + 12/16), so a shared variant set would force one padding scheme and break the spec.

## Changelog

### beta.2 — 2026-11-26 grade-button consequence line
- **C3-8 `grade-button` shows what happens** — sublabel 오늘 한 번 더 · 며칠 뒤 다시 (same words as the first-tap bottom sheet), height 56 → **72**, radius pill → **`r5` 20**, label 17/24 600 + sublabel 13/18 500 (`code`), gap 2, padding 12/20, outline border 1.5 → 1. Two documented exceptions: control radius (not pill) and the 15px floor (13px sublabel). Why: post-launch quick test 2026-11-24 — 1 of 3 still read 한 번 익혔어요 as "next" *after* seeing the one-time sheet. Source: Figma `847:13042`, prototype `handoff/redesign-2026-08/prototypes/grade-button-consequence.html`. App code: not yet.

### beta.1 — 2026-11 source-of-truth alignment

Decisions from [`design-system/00-DECISIONS-2026-11.md`](./design-system/00-DECISIONS-2026-11.md), taken against the latest Figma screens (학습완료 `615:1611`, 학습 카드 `615:1527`). This file is the value source of truth; Figma and code follow it.

- **D0-1 Gutter 16** (was 20) — new `layout.gutter`.
- **D0-2 `softer` → `#F5F5F5`** — page background leaves the cool ramp on purpose to sit with the illustrations; dark unchanged. Screen-specific page colours (code `#F4F2EF`) are retired.
- **D0-3 White cards = radius 24**; grey `card-tinted` goes one step under (20, see N-3).
- **D0-4 Group gap 24 (`x6`, was `2xl`)** — three gap roles: 12 / 24 / 40 (`layout.gap-*`). Replaces "28 between groups".
- **D0-5 `grade-button` = 2-button pair**, height 56, gap 8.
- **New tokens** already used by the app: `primary-soft`, `secondary-soft`, `ink-pressed` (+ dark values); `layout.*` roles.
- **N-1 Spacing names = value ÷ 4** (SEED `$dimension` style): `xs sm md lg xl 2xl xxl huge` → `x1 x2 x3 x4 x5 x6 x7 x10`. Values unchanged; removes the `xxl` 28 / `2xl` 24 mix-up. See [`01-NAMING-SEED-2026-11.md`](./design-system/01-NAMING-SEED-2026-11.md).
- **N-3 Radius = SEED scale as-is** (`r` + value ÷ 4, half steps `_5`): 10 `r2_5` · 12 `r3` · 14 `r3_5` · 16 `r4` · 20 `r5` · 24 `r6` · `full`. Two off-scale values snapped: **18 → 16**, **22 → 20** (`card-tinted`). `pill` 999 merged into `full` 9999. Role aliases `card` · `card-tinted` · `receipt` · `pill` stay.
- **N-4 Colour role names unchanged** — only SEED's state-suffix rule (`-pressed`, `-soft`) is adopted.
- **Figma colour styles (2026-11-11)** — 39 paint styles, each bound to its `Color` variable. Named SEED-style by property group + Onikan role: `bg/{role}` (fills), `fg/{role}` (text), `stroke/{role}` (borders), e.g. `bg/softer`, `fg/ink`, `stroke/pressed`. The group comes from the variable's scope; multi-use roles appear in each group they are scoped for.
- **Tab bar (2026-11-11)** — rebuilt in Figma: icon **24** (was 26 in the spec; icons are drawn on a 24 grid), background **`canvas`** (was `softer`), inactive `body`, active `tab-active` with fill icon. Components `icon` · `tab-item` · `Bottom Navigation`.
- **Buttons (2026-11-11, C3-1~4)** — `button-outline` split out from `button-secondary` (outline = border, 56; secondary = borderless white, 44). Two sizes only: `large` 56 · `medium` 44 (code `tall` 60 / `compact` 48 retire). Orange `brand` button retires → `primary`. Tabs have no pressed state. Specs: [`03-COMPONENT-SPECS-2026-11.md`](./design-system/03-COMPONENT-SPECS-2026-11.md).
- **Surfaces & feedback (2026-11-11, C3-5~7)** — card padding = 3 steps (revised 2026-11-16 → **16 only**). `list-row` height follows content (16 + 28 + 16 = 60), gap 12. `toast` label = `body-sm` 14/400.
- **주먹밥 완성 screen (2026-11-11)** — app aligned to Figma `638:7977`: white page (`canvas`, the one exception to `softer`), no overline, illustration 140 without a plate, orange `완성` badge above `{menu} 오니기리` (24/32 700), three `stat-tile-summary` tiles, `owner-quote-card` above the CTA, confetti replayed from the Figma keyframes (43 pieces, four bursts, once). New entries: `stat-tile-summary`, `owner-quote-card`, `badge` 완성.
- **Grade labels (2026-11-10)** — 아직이에요 / 외웠어요 → **다시 볼래요 / 한 번 익혔어요** (see `handoff/study-first-tap-feedback-SPEC.md`).
- **Fixed stale text** — `badge` no longer says "orange is for actions"; `tab-bar` frontmatter now matches the icon + label + `tab-active` spec; 완료 badge uses `secondary-soft #EAF6DD` (was an undefined `#E7F4D9`).

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
