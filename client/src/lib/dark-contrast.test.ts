// Feature: shadcn-dark-mode-migration, Property 1: Dark palette contrast ratios meet readability threshold
// Validates: Requirements 1.6

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';

/**
 * oklch color representation.
 */
interface OklchColor {
  L: number; // Lightness 0–1
  C: number; // Chroma
  h: number; // Hue in degrees
}

/**
 * Dark mode foreground/background CSS variable pairs with their oklch values.
 * Sourced from .dark scope in global.css / design doc.
 */
const darkPairs: Array<{ name: string; fg: OklchColor; bg: OklchColor }> = [
  {
    name: '--foreground over --background',
    fg: { L: 0.984, C: 0.003, h: 247 },
    bg: { L: 0.178, C: 0.028, h: 265 },
  },
  {
    name: '--card-foreground over --card',
    fg: { L: 0.984, C: 0.003, h: 247 },
    bg: { L: 0.235, C: 0.030, h: 265 },
  },
  {
    name: '--muted-foreground over --muted',
    fg: { L: 0.708, C: 0.010, h: 265 },
    bg: { L: 0.279, C: 0.030, h: 265 },
  },
  {
    name: '--cta-foreground over --cta',
    fg: { L: 1, C: 0, h: 0 },
    bg: { L: 0.795, C: 0.184, h: 86 },
  },
  {
    name: '--whatsapp-foreground over --whatsapp',
    fg: { L: 1, C: 0, h: 0 },
    bg: { L: 0.745, C: 0.198, h: 155 },
  },
  {
    name: '--primary-foreground over --primary',
    fg: { L: 1, C: 0, h: 0 },
    bg: { L: 0.623, C: 0.214, h: 259 },
  },
  {
    name: '--accent-foreground over --accent',
    fg: { L: 1, C: 0, h: 0 },
    bg: { L: 0.623, C: 0.214, h: 259 },
  },
  {
    name: '--secondary-foreground over --secondary',
    fg: { L: 0.984, C: 0.003, h: 247 },
    bg: { L: 0.279, C: 0.030, h: 265 },
  },
];

// --- oklch → linear sRGB → relative luminance conversion ---

/**
 * Convert oklch → oklab.
 */
function oklchToOklab(color: OklchColor): { L: number; a: number; b: number } {
  const hRad = (color.h * Math.PI) / 180;
  return {
    L: color.L,
    a: color.C * Math.cos(hRad),
    b: color.C * Math.sin(hRad),
  };
}

/**
 * Convert oklab → linear sRGB.
 * Uses the standard OKLab → LMS → linear sRGB matrix pipeline.
 */
function oklabToLinearSrgb(lab: { L: number; a: number; b: number }): {
  r: number;
  g: number;
  b: number;
} {
  // OKLab → LMS (cube-root domain)
  const l_ = lab.L + 0.3963377774 * lab.a + 0.2158037573 * lab.b;
  const m_ = lab.L - 0.1055613458 * lab.a - 0.0638541728 * lab.b;
  const s_ = lab.L - 0.0894841775 * lab.a - 1.2914855480 * lab.b;

  // Undo cube root
  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  // LMS → linear sRGB
  return {
    r: +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    g: -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    b: -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s,
  };
}

/**
 * Clamp a value to [0, 1].
 */
function clamp01(v: number): number {
  return Math.min(1, Math.max(0, v));
}

/**
 * Convert a linear sRGB channel to sRGB gamma-encoded, then compute
 * the WCAG relative luminance contribution for that channel.
 *
 * Per WCAG 2.1: if sRGB ≤ 0.04045 → channel/12.92, else ((channel+0.055)/1.055)^2.4
 * But since we already have linear values, we just need to clamp and use them directly
 * for luminance (the WCAG formula converts *from* gamma-encoded sRGB back to linear).
 * So we can use the linear values directly.
 */
function relativeLuminance(color: OklchColor): number {
  const lab = oklchToOklab(color);
  const lin = oklabToLinearSrgb(lab);

  // Clamp to gamut
  const r = clamp01(lin.r);
  const g = clamp01(lin.g);
  const b = clamp01(lin.b);

  // WCAG relative luminance from linear sRGB
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * WCAG 2.1 contrast ratio between two relative luminance values.
 * Returns ratio as L_lighter + 0.05 / L_darker + 0.05.
 */
function contrastRatio(lum1: number, lum2: number): number {
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

describe('Property 1: Dark palette contrast ratios meet readability threshold', () => {
  it('all dark mode fg/bg pairs have WCAG 2.1 contrast ratio ≥ 4.5:1', () => {
    fc.assert(
      fc.property(fc.constantFrom(...darkPairs), (pair) => {
        const fgLum = relativeLuminance(pair.fg);
        const bgLum = relativeLuminance(pair.bg);
        const ratio = contrastRatio(fgLum, bgLum);

        expect(ratio).toBeGreaterThanOrEqual(4.5);
      }),
      { numRuns: 100 },
    );
  });
});
