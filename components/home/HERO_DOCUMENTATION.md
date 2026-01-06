# Luxury Technical Hero Section - Technical Documentation

## Overview
A high-end, architectural Hero section designed for elite software engineering benchmarks. It focuses on **Visual Weight**, **Kinetic Hierarchy**, and **Architectural Depth**.

---

## Design Philosophy

### 1. Visual Hierarchy
- **Primary Focus:** The "value statement" (H1) using a multi-tonal typographic approach (60% opacity prefix, 100% active brand).
- **Secondary Focus:** The "Architectural Validation" (Tech Sculpture) providing visual weight and technical proof-of-concept.
- **Actionable:** High-contrast CTA with a fluid glow effect.

### 2. Kinetic System (The Motion)
- **Entrance:** Uses **Quintic Easing** (`[0.16, 1, 0.3, 1]`) to simulate weight and precise control.
- **Sequence:** 
  1. `0.2s` - Tagline reveal (The Hook)
  2. `0.3s` - Main Headline (The Statement)
  3. `0.4s` - Subtext (The Validation)
  4. `0.6s` - CTA & Sculpture (The Action & Proof)
- **Sustainability:** Respects `prefers-reduced-motion` by collapsing animation durations to near-zero via CSS.

### 3. Layers & Depth
- **Cinematic Layer:** Atmospheric glows + film grain noise + precision micro-grid.
- **Technical Layer:** A multi-layered rotating glass structure representing stack architecture.
- **Content Layer:** Oversized typography with overflow-hidden mask reveals.

---

## Technical Features

### Cinematic Mesh (`cinematic-mesh.tsx`)
- **Atmospheric Glow:** Two massive radial gradients with slow, non-synchronized floating patterns.
- **Film Grain:** SVG turbulance filter injected into a 200x200 pixel pattern for a "high-end camera" look.
- **Micro-Grid:** 80px grid with a radial mask to guide focus to the center.

### Tech Sculpture (`tech-sculpture.tsx`)
- **Responsive Geometry:** Scales from 300px (mobile) to 600px (desktop) with varying opacities.
- **Layers:** 4 rounded-rect layers with independent rotation and vertical floating intervals.
- **Core Node:** High-blur glass background with mono-spaced diagnostic data.
- **Data Streams:** 8 orbiting particles with scale-pulsing and connecting lines.

### Hero Logic (`hero-section.tsx`)
- **Reveal Masking:** Titles emerge from `overflow-hidden` containers, a staple of high-end Swiss design.
- **Fluid CTA:** The "Contact" button features a hidden background glow that expands and intensifies on hover.
- **Scroll Indicator:** Minimalist vertical line with animated text (luxury signature).

---

## Performance Matrix

| Metric | Goal | Implementation |
| :--- | :--- | :--- |
| **CLS** | 0.0 | Static layout containers with fixed aspect ratios. |
| **LCP** | < 1.0s | CSS-driven background animations (GPU optimized). |
| **Framerate** | 60 FPS | `transform` and `opacity` only. No paint-heavy properties. |
| **Accessibility**| Grade A | Correct H1 → P hierarchy + ARIA support. |

---

## Configuration

### Primary Colors
Colors are derived from the Tailwind theme:
- `primary`: Used for accents and data nodes.
- `foreground`: Used for high-contrast headers.
- `muted-foreground`: Used for subtext and prefixes.

### Easing Curve
```typescript
transition: {
  ease: [0.16, 1, 0.3, 1], // Quintic
  duration: 1.0 // Intentional and weighty
}
```

### Adding New Sections
To add or modify the sequence, update the `custom={i}` index in `hero-section.tsx`.

---

**Version:** 2.0.0 (Luxury Technical Edition)
**Status:** Validated
