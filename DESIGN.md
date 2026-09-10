---
name: Conversor de Temperaturas
description: Instrumento visual compacto para conversoes Celsius e Fahrenheit com leitura imediata.
colors:
  charcoal: "#17191b"
  panel: "#222527"
  panel-light: "#2b2f31"
  ink: "#f5f1e8"
  muted: "#a6a69f"
  line: "#414548"
  signal-red: "#ff806e"
  signal-amber: "#ffb547"
  signal-yellow: "#f2d24b"
  signal-cyan: "#9fd7d2"
  danger: "#ff806e"
typography:
  display:
    fontFamily: "Bahnschrift SemiCondensed, Arial Narrow, sans-serif"
    fontSize: "clamp(86px, 13vw, 170px)"
    fontWeight: 700
    lineHeight: 0.8
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Bahnschrift SemiCondensed, Arial Narrow, sans-serif"
    fontSize: "clamp(24px, 3vw, 38px)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.01em"
  body:
    fontFamily: "Trebuchet MS, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "Trebuchet MS, sans-serif"
    fontSize: "10px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.14em"
rounded:
  sharp: "2px"
  mark: "50%"
spacing:
  xs: "8px"
  sm: "14px"
  md: "24px"
  lg: "30px"
  xl: "42px"
components:
  button-primary:
    backgroundColor: "{colors.signal-red}"
    textColor: "{colors.charcoal}"
    rounded: "{rounded.sharp}"
    padding: "0 16px"
    height: "50px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.sharp}"
    padding: "0 16px"
    height: "50px"
  field:
    backgroundColor: "{colors.charcoal}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sharp}"
    padding: "10px 14px"
    height: "52px"
---

# Design System: Conversor de Temperaturas

## Overview

**Creative North Star: "The Temperature Rhythm Console"**

The interface treats a conversion as a short, precise sequence rather than a generic form. It borrows the discipline of an early-80s rhythm machine: a dark instrument panel, a continuous step rail, tactile rectangular controls, and a single live readout that becomes the strongest visual signal when the task completes.

The system is compact and operational. Paper-white text carries the task, amber marks readiness, cyan confirms a completed state, and signal red identifies the primary action and the current unit marker. Surfaces are layered by tone rather than by floating cards or decorative shadows.

**Key Characteristics:**
- Instrument-like dark charcoal composition.
- Large tabular readout with restrained colored states.
- Rectangular controls with crisp 2px corners.
- Four-step rail for input, origin, conversion, and result.
- One responsive workspace that stacks cleanly on mobile.

## Colors

The palette uses charcoal as the physical panel, warm ink as the instrument legend, and a small set of signal colors for state communication.

### Primary
- **Signal Coral** (`#ff806e`): Primary conversion action, degree marker, and attention state.
- **Signal Amber** (`#ffb547`): Ready state, active rail step, and control metadata.

### Secondary
- **Signal Cyan** (`#9fd7d2`): Completed conversion state and confirmed scale.
- **Signal Yellow** (`#f2d24b`): Reserved for secondary active indicators.

### Neutral
- **Charcoal** (`#17191b`): Page ground and input surface.
- **Panel** (`#222527`): Readout surface.
- **Panel Light** (`#2b2f31`): Control surface.
- **Warm Ink** (`#f5f1e8`): Primary readable text.
- **Muted Alloy** (`#a6a69f`): Supporting copy and labels.
- **Control Line** (`#414548`): Dividers and inactive rail rules.

### Named Rules

**The Signal Economy Rule.** Color is state information, not decoration. Amber means ready, cyan means complete, coral means action or attention, and muted values stay neutral.

## Typography

**Display Font:** Bahnschrift SemiCondensed (with Arial Narrow, sans-serif)
**Body Font:** Trebuchet MS (with sans-serif)
**Label Font:** Trebuchet MS with uppercase tracking
**Measurement Font:** Courier New for the numeric input

**Character:** The condensed display face gives the instrument its assertive panel lettering, while the body face keeps instructions approachable and readable. Numeric input uses a mono face because it is a measured value, not a decorative headline.

### Hierarchy
- **Display** (700, `clamp(86px, 13vw, 170px)`, 0.8): Current converted value.
- **Headline** (700, `clamp(24px, 3vw, 38px)`, 1): Product name and key panel titles.
- **Title** (700, 22px to 32px, 1): Readout state and control bay heading.
- **Body** (400, 14px, 1.5): Instructions, recovery copy, and supporting context.
- **Label** (700, 10px, 1.2, tracked uppercase): Panel metadata, field labels, and rail steps.

### Named Rules

**The Readout Rule.** Numbers are allowed to be large; explanatory copy remains short and subordinate so the task can be understood at a glance.

## Layout

The page uses a centered container capped at 1180px with 48px horizontal breathing room on desktop. A 1.25fr / 0.75fr workspace gives the output panel visual priority while keeping the control bay compact. The panels share a 2px seam and consistent 30px interior padding.

The four-step rail runs beneath the workspace as one continuous horizontal line. Each step owns a clear state: active, done, error, or inactive. At widths below 720px, the workspace becomes a single column, the readout comes first, controls follow, and the rail remains horizontal at reduced label size. The page has no horizontal overflow and supports a 320px minimum viewport.

The spacing rhythm is based on 8px increments, with 14px, 24px, 30px, and 42px used for the primary jumps.

## Elevation & Depth

The system is flat by default. Depth comes from tonal panel layering, hairline rules, a partial circular instrument trace in the readout panel, and controlled state color. It does not use drop shadows or glass effects. Focus uses a 2px cyan ring; result motion changes text color briefly instead of adding a glow.

### Named Rules

**The Panel Rule.** Use tonal separation and rules before elevation. A surface should never look like a floating generic card.

## Shapes

Controls and panels use crisp 2px corners. The only circular form is the small status light and the partial instrument trace, both inherited from the rhythm-console language. Inputs and selects share the same charcoal fill, 1px control line, and 52px height. Buttons are rectangular with a clear primary/secondary hierarchy.

## Components

### Buttons
- **Shape:** Rectangular with 2px corners.
- **Primary:** Signal coral background, charcoal text, 50px height, compact icon-like directional mark.
- **Hover / Focus:** Coral lightens on hover; keyboard focus inherits the cyan 2px ring from fields.
- **Secondary:** Transparent charcoal surface with a control-line border and muted text.

### Cards / Containers
- **Readout panel:** Dark panel surface with 30px padding, dominant numeric output, and a quiet partial circular trace.
- **Control panel:** Slightly lighter tonal surface with the form and action group.
- **Rail:** Full-width rule with small state lights and terse labels; not a card.

### Form fields
- **Input:** Mono numerals, 52px height, explicit degree suffix, charcoal fill.
- **Select:** Native semantic select with a small amber chevron and matching 52px height.
- **Error:** Coral-tinted inline message with explicit recovery copy; the rail stops at the input step.

## Do's and Don'ts

- Do keep the readout and primary action visible in the first viewport.
- Do use the signal colors only for their named states.
- Do preserve semantic labels, keyboard focus, and native form controls.
- Do let the rail communicate progress without competing with the result.
- Do keep mobile as a stacked instrument, not a shrunken desktop.
- Don't add generic floating cards, gradients, or decorative glow.
- Don't use all-caps for explanatory sentences.
- Don't introduce extra units, history, or invented product claims without a product decision.
