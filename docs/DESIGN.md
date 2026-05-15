# NG Analytics Design System

This document outlines the design system derived from the web and mobile
applications of the NG Analytics platform. It serves as a single source of
truth for design tokens, components, and interactive patterns across the
monorepo.

## 1. Color Palette

The platform employs a rich, dark-themed aesthetic on the web, focusing on
glassmorphism and vivid accent glows. The mobile app supports both light
and dark modes with a more native-feeling palette.

### Web Colors

* **Backgrounds:**
  * App Background: `#0d0f14`
  * Glass Surfaces: `rgba(255, 255, 255, 0.02)`, `rgba(255, 255, 255, 0.04)`
  * Overlay Background: `rgba(19, 22, 31, 0.9)` (`#13161f`)
* **Accents:**
  * Primary Gradient: `#f0a500` to `#e05c00`
  * Primary Solid/Text Accent: `#f0a500`
  * Subtle Accent Background: `rgba(240, 165, 0, 0.05)`, `rgba(240, 165, 0, 0.1)`
* **Text:**
  * Primary: `#eef0f4`
  * Secondary/Muted: `#c8cdd8`, `#8a94a6`, `#6b7280`
* **Borders:**
  * Default: `rgba(255, 255, 255, 0.05)`
  * Subtle/Hover: `rgba(255, 255, 255, 0.10)`
  * Accent Hover: `rgba(240, 165, 0, 0.30)`, `rgba(240, 165, 0, 0.50)`

### Mobile Colors

#### Light Mode

* **Background:** `#fff`
* **Text:** `#11181C`
* **Tint/Primary:** `#0a7ea4`
* **Icon:** `#687076`
* **Tab Icon Selected:** `#0a7ea4`

#### Dark Mode

* **Background:** `#151718`
* **Text:** `#ECEDEE`
* **Tint/Primary:** `#fff`
* **Icon:** `#9BA1A6`
* **Tab Icon Selected:** `#fff`

## 2. Typography

### Web Typography

* **Fonts:** System Sans-serif (`font-sans`) and Monospace (`font-mono`)
* **Styles:**
  * **Hero / Page Title:** 4xl to 5xl, Bold, Tight Tracking
    (`text-4xl md:text-5xl font-bold tracking-tight`)
  * **Card / Section Title:** 2xl (24px), Bold (`text-2xl font-bold`)
  * **Body Large:** 18px (`text-lg`)
  * **Body Default:** 14px, Relaxed Line Height (`text-[14px] leading-relaxed`)
  * **Overline / Utilities:** 11px, Bold, Uppercase, Wider Tracking
    (`text-[11px] font-bold uppercase tracking-wider`)

### Mobile Typography

* **Fonts:** Platform-specific system fonts
  (System UI, Rounded, Serif, Monospace fallback)
* **Styles:**
  * **Title:** 32px, Bold, Line Height 32px
  * **Subtitle:** 20px, Bold
  * **Default / Body:** 16px, Line Height 24px
  * **Default Semi-Bold:** 16px, Semi-Bold (600), Line Height 24px
  * **Link:** 16px, Line Height 30px, Color: `#0a7ea4`

## 3. UI Elements & Layout

### Border Radius (Web)

* **Buttons:** `rounded-md` (standard), `rounded-full` (floating action buttons)
* **Icons & Small Containers:** `rounded-xl`, `rounded-2xl`
* **Cards & Panels:** `rounded-3xl`

### Shadows & Depth (Web)

* **Card Base:** Deep ambient shadow `shadow-[0_8px_32px_rgba(0,0,0,0.4)]` or `shadow-[0_4px_24px_rgba(0,0,0,0.4)]`
* **Accent Glow (Buttons/Icons):** Primary orange glow `shadow-[0_0_15px_rgba(240,165,0,0.3)]`
* **Hover/Active Glow:** Intense orange glow `shadow-[0_0_24px_rgba(240,165,0,0.35)]`

### Effects & Interactions

* **Glassmorphism:** Widespread use of `backdrop-blur-sm` and
  `backdrop-blur-md` on low-opacity white/dark backgrounds to create depth
  and hierarchy.
* **Micro-interactions:**
  * Cards scale down slightly on click (`whileTap={{ scale: 0.98 }}`).
  * Icons inside cards scale up on card hover (`group-hover:scale-110`).
  * Smooth color transitions for borders and backgrounds (`transition-colors`).
* **Page Transitions:** Opacity fading and subtle Y-axis translations
  (`initial={{ opacity: 0, y: 20 }}`) using Framer Motion.

## 4. Component Tokens

### Primary Button (Web)

* **Background:** Gradient from `#f0a500` to `#e05c00`
* **Text Color:** White
* **Shadow:** Glow `rgba(240,165,0,0.3)`
* **Border:** None (`border-0`)

### Outline Button (Web)

* **Background:** `rgba(255, 255, 255, 0.05)`
* **Text Color:** `#c8cdd8`
* **Border:** `1px solid rgba(255, 255, 255, 0.1)`
* **Hover:** Background `rgba(255, 255, 255, 0.1)`, Text `#eef0f4`,
  Border `rgba(240, 165, 0, 0.5)`

### Base Card (Web)

* **Background:** `rgba(255, 255, 255, 0.02)`
* **Border:** `1px solid rgba(255, 255, 255, 0.05)`
* **Text:** `#c8cdd8`
* **Shadow:** `0 4px 24px rgba(0,0,0,0.4)`
* **Filter:** `backdrop-blur-sm`
* **Border Radius:** 12px (`rounded-xl`) or 24px (`rounded-3xl` for main menu cards)
