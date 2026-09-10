# Conversor de Temperaturas Surface Brief

## Scope

Single-screen static web tool for quick, occasional temperature conversions. Mode: Operate. Audience: anyone who needs a Celsius/Fahrenheit conversion, with an academic-quality demonstration context.

## Task and constraints

The visitor enters a number, chooses origin and destination units, converts, reads the result, and can clear the flow. Result and error states must be obvious within seconds. Preserve the existing product facts, Portuguese language, semantic form controls, no backend, and no external API.

## Direction contract

### THESIS

Treat the conversion as a precise step sequence: the temperature value is the live signal, and the two unit choices are a compact row of armed controls around it. Refuse the category-default centered white form by making the main readout and the conversion path one instrument-like composition.

### OWN-WORLD

An early-80s rhythm-machine grammar translated into a focused measurement console: deep charcoal surface, paper-white labels, disciplined red, amber, yellow, and cool-white control states, segmented numerals for the live value, and one continuous step rail as the visual spine. Controls are rectangular, tactile, and purposeful; glow belongs only to active result and focus states.

### STORY

The visitor sees the tool as soon as it opens, enters one value, selects the two units, and presses Converter. The interface makes the source-to-target path legible before action, then turns the result into the brightest and most stable state on the page. Invalid input interrupts the sequence with a precise recovery instruction, never a vague warning.

### FIRST VIEWPORT

At desktop, a narrow top bar names the tool and shows the conversion family, while the main workspace uses a broad left readout panel for the current value and result, and a right control bay for the form. A horizontal four-step rail bridges the panels and echoes the selected source, transform, and target. On mobile, the readout leads, followed by the rail and the controls in one column; the primary action remains full-width and immediately reachable.

### FORM

Assigned direction 6 from seed `1178241d`: an early-80s rhythm machine step row, adapted as a temperature conversion instrument. Signature interaction is the active step rail and result pulse on successful conversion; errors use a stopped rail and preserve the input context. Seed key: `1178241d`.

### FINISH

unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved decisions

No photographic or illustrative assets are required. Exact typeface, color values, responsive breakpoints, and motion timing are implementation decisions constrained by the direction above.
