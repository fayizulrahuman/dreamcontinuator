# Design System Strategy: The Celestial Archive

## 1. Overview & Creative North Star
The North Star for this design system is **"The Celestial Archive."** We are not building a standard utility; we are crafting a digital reliquary for the subconscious. This system balances the heavy, ink-stained soul of an ancient dream journal with the ethereal, weightless precision of a cosmic observatory.

To move beyond a "template" look, designers must embrace **Intentional Asymmetry**. Do not center everything. Let elements breathe and drift, much like thoughts in a dream state. Overlap "frosted glass" containers to create a sense of physical depth, and use high-contrast typography scales to establish a sophisticated, luxury editorial hierarchy.

---

## 2. Color & Atmospheric Depth
Our palette is rooted in the infinite void of `background` (#0d0d19), using a tiered system of luminosity to guide the eye.

### The "No-Line" Rule
**Explicit Instruction:** Prohibit the use of 1px solid borders for sectioning or containment. 
Boundaries must be defined solely through background color shifts. Use `surface_container_low` to sit against the `background`, or `surface_container_high` to define a primary interaction area. If a container needs to stand out, use tonal transitions, not structural lines.

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked sheets of vellum. 
- **Base:** `surface_dim` (#0d0d19)
- **Nested Content:** Place `surface_container_lowest` cards on top of `surface_container_low` sections to create a soft, natural lift. 
- **Glass & Gradient Rule:** For floating elements (modals, popovers), use the signature glass effect: `rgba(255,255,255,0.05)` with a `20px backdrop-filter blur`. 

### Mood Accents (The Tonal Compass)
Use the following tokens for mood-specific interactions and status indicators:
- **Surreal:** `#c084fc` (Primary/Euphoric)
- **Warm:** `#f4a460` (Secondary/Nostalgic)
- **Eerie:** `#7ecec4` (Tertiary/Unsettling)
- **Melancholic:** `#93c5fd` (Calm/Deep)
- **Wondrous:** `#fcd34d` (Vibrant/Discovery)

---

## 3. Typography
The typographic soul of the system lies in the tension between the "Dream" (Serif) and the "Data" (Monospace).

- **The Dream (Cormorant Garamond):** Use for all `display`, `headline`, and `body` text. This font carries the weight of history and the fluidity of prose. 
    - *Directorial Tip:* Set `display-lg` with slight negative letter-spacing (-0.02em) to evoke high-end fashion mastheads.
- **The Data (Courier Prime):** Use for all `label`, `input`, `tag`, and functional UI text. This represents the observer—the conscious mind cataloging the dream. 
    - *Directorial Tip:* Set all labels in `label-sm` to Uppercase with `0.1em` letter-spacing to enhance the "technical log" aesthetic.

---

## 4. Elevation & Depth
We eschew traditional material shadows in favor of **Tonal Layering**.

- **The Layering Principle:** Depth is achieved by stacking `surface_container` tiers. A card should never have a border; it should simply be a slightly lighter or darker "slice" of the atmosphere.
- **Ambient Shadows:** When an element must "float" (e.g., a primary action button), use a shadow tinted with `surface_tint` (#c890ff) at 8% opacity. The blur should be expansive (`30px` to `60px`) to mimic a soft glow rather than a harsh drop shadow.
- **The "Ghost Border" Fallback:** For accessibility in high-density areas, use a "Ghost Border": the `outline_variant` token at **15% opacity**. Never use a 100% opaque stroke.

---

## 5. Components

### Buttons (The Pillars)
- **Primary:** Pill-shaped (`rounded-full`). Use a gradient transition from `primary` (#c890ff) to `primary_dim` (#be83fa). Text should be `label-md` in Courier Prime.
- **Secondary:** Frosted glass background with a "Ghost Border."
- **States:** On hover, increase the `backdrop-filter blur` from 20px to 40px and slightly increase the `surface_bright` luminosity.

### Inputs & Fields
- **Styling:** Forgo the "box" look. Use a `surface_container_lowest` background with a bottom-only `outline_variant` (20% opacity). 
- **Typography:** Courier Prime for both the input text and the floating label.

### Cards & Lists
- **Forbid Dividers:** Do not use horizontal rules to separate list items. Use vertical whitespace (from our `lg` spacing scale) or subtle alternate-row shading using `surface_container_low`.
- **Composition:** Asymmetric padding. A card might have `2rem` padding on the left and `3rem` on the right to create a "journal margin" feel.

### Dream Tags (Chips)
- **Style:** Pill-shaped with a 10% opacity fill of the Mood Accent colors. The text should be the 100% opaque version of that mood color in `label-sm` Courier Prime.

---

## 6. Do's and Don'ts

### Do
- **Embrace the Dark:** Keep 90% of the UI in the `surface_dim` and `surface_container` range to protect the midnight atmosphere.
- **Generous Spacing:** Use the `xl` (3rem) and `lg` (2rem) scales for margins. Luxury is defined by wasted space.
- **Mix Type:** Always pair a `display-lg` serif headline with a `label-sm` monospace sub-header.

### Don't
- **No Sharp Corners:** Never use the `none` or `sm` roundedness tokens for containers. Use `DEFAULT` (1rem) as the minimum.
- **No Pure Grays:** Every "neutral" color must be tinted with navy or violet to maintain the cosmic depth.
- **No Default Grids:** Avoid perfectly symmetrical 3-column grids. Try a 2-column layout where one column is 65% width and the other is 35%.

### Accessibility Note
While we prioritize atmosphere, ensure that all `on_surface` text vs `surface` background maintains a contrast ratio of at least 4.5:1. Use the `primary_fixed` and `secondary_fixed` tokens for critical information that must remain legible against the dark void.