# Implementation Plan: shadcn Dark Mode Migration

## Overview

Migrate the Exalter Students landing page from hardcoded-color `.astro` section components to shadcn UI-based React `.tsx` components with full light/dark theme support. The migration installs shadcn primitives, updates the CSS variable system with brand-accurate oklch values, creates a ThemeToggle, converts 9 `.astro` sections to `.tsx`, updates 3 existing React components, wires everything into the 3 Astro pages, and verifies with property-based tests and a production build.

## Tasks

- [x] 1. Install shadcn Card and Badge components and update global.css
  - [x] 1.1 Install shadcn Card component (`npx shadcn@latest add card`) and Badge component (`npx shadcn@latest add badge`) from the `client/` directory
    - Verify `client/src/components/ui/card.tsx` and `client/src/components/ui/badge.tsx` are created
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8_
  - [x] 1.2 Update `client/src/styles/global.css` with brand-accurate oklch CSS variables
    - Replace `:root` variables with brand color mappings from the design (--primary → oklch(0.327 0.115 264), --background → oklch(0.984 0.003 247), --foreground → oklch(0.178 0.028 265), etc.)
    - Add `--cta`, `--cta-foreground`, `--whatsapp`, `--whatsapp-foreground` to both `:root` and `.dark` scopes
    - Replace `.dark` variables with dark-mode brand values from the design
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_
  - [x] 1.3 Register `--color-cta`, `--color-cta-foreground`, `--color-whatsapp`, `--color-whatsapp-foreground` in the `@theme inline` block
    - Enables Tailwind utility classes `bg-cta`, `text-cta`, `bg-whatsapp`, `text-whatsapp`, etc.
    - _Requirements: 1.7_

- [x] 2. Create ThemeToggle component and FOWT prevention script
  - [x] 2.1 Create `client/src/components/ThemeToggle.tsx`
    - Render shadcn `Button variant="ghost" size="icon"` with Sun/Moon icons from `lucide-react`
    - On click: toggle `dark` class on `document.documentElement`, persist to `localStorage` under key `'theme'`
    - Read initial state from `<html>` class list (set by FOWT script)
    - Include dynamic `aria-label` (e.g. "Switch to dark mode" / "Switch to light mode")
    - Accept optional `className` prop
    - _Requirements: 2.1, 2.2, 2.3, 2.4_
  - [x] 2.2 Write property test for ThemeToggle round-trip
    - **Property 2: ThemeToggle round-trip**
    - For any initial theme state (light or dark), clicking ThemeToggle flips the `dark` class, persists to localStorage, displays correct icon, and updates aria-label
    - **Validates: Requirements 2.1, 2.2, 2.3, 2.4**
  - [x] 2.3 Add FOWT prevention inline script to all 3 Astro pages (`index.astro`, `program.astro`, `berita.astro`)
    - Add `<script is:inline>` block in `<head>` that reads `localStorage.getItem('theme')` and applies `dark` class before content renders
    - Falls back to `prefers-color-scheme: dark` if no stored preference, defaults to light mode otherwise
    - _Requirements: 3.1, 3.2, 3.3, 3.4_
  - [x] 2.4 Write property test for FOWT script logic
    - **Property 3: FOWT script applies correct theme from localStorage**
    - For any localStorage value ('dark', 'light', absent) × OS preference (dark, light, none), verify correct `dark` class presence/absence
    - **Validates: Requirements 3.1, 3.2, 3.3**

- [x] 3. Convert section components to React TSX — batch 1 (HeroSection, AboutSection, ServiceBriefSection)
  - [x] 3.1 Convert `HeroSection.astro` to `HeroSection.tsx`
    - Accept same props `{ title: string; subtitle: string }`
    - Replace hardcoded colors with CSS variable classes (bg-cta for CTA button, text-foreground, etc.)
    - Use CSS variable-based gradient/overlay that adapts to dark mode
    - Keep the scrolling background image marquee with `@keyframes` animation
    - _Requirements: 4.1, 4.2, 4.3, 6.1, 6.7, 6.9, 6.10, 8.3_
  - [x] 3.2 Convert `AboutSection.astro` to `AboutSection.tsx`
    - Accept same props `{ about: AboutContent }`
    - Use shadcn Card (Card, CardHeader, CardContent) for value cards and summary card
    - Replace hardcoded colors with CSS variable classes
    - Use `dangerouslySetInnerHTML` for inline SVG icons
    - _Requirements: 4.1, 4.2, 4.3, 5.1, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.9_
  - [x] 3.3 Convert `ServiceBriefSection.astro` to `ServiceBriefSection.tsx`
    - Accept same props `{ title: string; cards: ServiceCard[] }`
    - Use shadcn Card for service cards and shadcn Button for CTA link
    - Replace hardcoded colors with CSS variable classes (bg-cta for CTA button)
    - Use `dangerouslySetInnerHTML` for inline SVG icons
    - _Requirements: 4.1, 4.2, 4.3, 5.2, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.9_

- [x] 4. Checkpoint — Verify batch 1 components compile
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Convert section components to React TSX — batch 2 (ServiceFullSection, MetricsSection, TestimonialSection)
  - [x] 5.1 Convert `ServiceFullSection.astro` to `ServiceFullSection.tsx`
    - Accept same props `{ title: string; subtitle: string; cards: ServiceCard[] }`
    - Use shadcn Card for service cards
    - Replace hardcoded colors with CSS variable classes
    - Use `dangerouslySetInnerHTML` for inline SVG icons
    - _Requirements: 4.1, 4.2, 4.3, 5.3, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.9_
  - [x] 5.2 Convert `MetricsSection.astro` to `MetricsSection.tsx`
    - Accept same props `{ metrics: MetricsContent }`
    - Use shadcn Card for achievement cards, Badge for metric values
    - Replace gradient background with CSS variable-based gradient that adapts to dark mode
    - _Requirements: 4.1, 4.2, 4.3, 5.4, 6.5, 6.6, 6.9, 6.10, 8.4_
  - [x] 5.3 Convert `TestimonialSection.astro` to `TestimonialSection.tsx`
    - Accept same props `{ testimonials: TestimonialCard[] }`
    - Use shadcn Card for testimonial cards
    - Replace hardcoded colors with CSS variable classes
    - _Requirements: 4.1, 4.2, 4.3, 5.5, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.9_

- [x] 6. Convert section components to React TSX — batch 3 (NewsSection, EventsSection, Footer)
  - [x] 6.1 Convert `NewsSection.astro` to `NewsSection.tsx`
    - Accept same props `{ news: NewsCard[] }`
    - Use shadcn Card for news cards, shadcn Button for "Baca Selengkapnya" link
    - Replace `bg-[#F59E0B]` with `bg-cta`
    - _Requirements: 4.1, 4.2, 4.3, 5.6, 6.1, 6.2, 6.3, 6.5, 6.6, 6.7, 6.9_
  - [x] 6.2 Convert `EventsSection.astro` to `EventsSection.tsx`
    - Accept same props `{ events: EventCard[] }`
    - Use shadcn Card for event cards
    - Replace hardcoded colors with CSS variable classes
    - _Requirements: 4.1, 4.2, 4.3, 5.7, 6.1, 6.2, 6.3, 6.5, 6.6, 6.9_
  - [x] 6.3 Convert `Footer.astro` to `Footer.tsx`
    - No props (self-contained)
    - Replace `style="background: #0F172A"` with CSS variable-based dark background
    - Replace hardcoded text colors with CSS variable classes
    - _Requirements: 4.1, 4.2, 4.3, 6.1, 6.2, 6.3, 6.8, 6.9, 8.5_

- [x] 7. Checkpoint — Verify batch 2 and 3 components compile
  - Ensure all tests pass, ask the user if questions arise.

- [x] 8. Update existing React components (Navigation, ScrollToTop, MarqueeSection)
  - [x] 8.1 Update `Navigation.tsx`
    - Replace all hardcoded `style={{ color: '...' }}` and `style={{ background: '...' }}` with CSS variable classes
    - Import and render `ThemeToggle` in the nav bar (visible on desktop and mobile)
    - Use shadcn `Button` for WhatsApp CTA and mobile hamburger toggle
    - Replace `bg-white` with `bg-background`, border colors with `border-border`
    - _Requirements: 2.5, 5.10, 6.1, 6.2, 6.3, 6.4, 6.8, 6.9, 8.6_
  - [x] 8.2 Update `ScrollToTop.tsx`
    - Replace `style={{ background: '#1E3A8A' }}` with `bg-primary`
    - Use shadcn `Button` for the scroll-to-top control
    - _Requirements: 5.9, 6.9_
  - [x] 8.3 Update `MarqueeSection.tsx`
    - Replace hardcoded colors (`bg-[#F8FAFC]`, `text-[#1E3A8A]`, `text-slate-600`, `bg-white`, `border-slate-200`) with CSS variable classes
    - Wrap partner logo items in shadcn `Card`
    - _Requirements: 5.8, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.9_

- [x] 9. Update Astro pages and remove old .astro section files
  - [x] 9.1 Update `index.astro` to import all converted `.tsx` section components with `client:load`
    - Import HeroSection, AboutSection, ServiceBriefSection, MetricsSection, MarqueeSection, TestimonialSection, Footer as `.tsx`
    - Add `client:load` to HeroSection, AboutSection, ServiceBriefSection, MetricsSection, TestimonialSection, Footer
    - Pass same content data props
    - _Requirements: 7.1, 7.4, 7.5_
  - [x] 9.2 Update `program.astro` to import `.tsx` section components with `client:load`
    - Import ServiceFullSection, MetricsSection, Footer as `.tsx`
    - Add `client:load` to ServiceFullSection, MetricsSection, Footer
    - _Requirements: 7.2, 7.4, 7.5_
  - [x] 9.3 Update `berita.astro` to import `.tsx` section components with `client:load`
    - Import NewsSection, EventsSection, Footer as `.tsx`
    - Add `client:load` to NewsSection, EventsSection, Footer
    - _Requirements: 7.3, 7.4, 7.5_
  - [x] 9.4 Remove old `.astro` section component files
    - Delete: HeroSection.astro, AboutSection.astro, ServiceBriefSection.astro, ServiceFullSection.astro, MetricsSection.astro, TestimonialSection.astro, NewsSection.astro, EventsSection.astro, Footer.astro
    - _Requirements: 4.5_

- [x] 10. Write property-based tests for correctness properties
  - [x] 10.1 Write property test for dark palette contrast ratios
    - **Property 1: Dark palette contrast ratios meet readability threshold**
    - For any foreground/background CSS variable pair in `.dark` scope, WCAG 2.1 contrast ratio ≥ 4.5:1
    - **Validates: Requirements 1.6**
  - [x] 10.2 Write property test for shadcn primitives in section components
    - **Property 4: Section components render shadcn primitives**
    - For any section component with valid content data, output HTML contains `data-slot="card"` elements
    - **Validates: Requirements 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7**
  - [x] 10.3 Write property test for no hardcoded color values
    - **Property 5: No hardcoded color values in rendered component output**
    - For any section component with valid content data, output HTML contains zero inline style color attributes and zero banned Tailwind color classes
    - **Validates: Requirements 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9**
  - [x] 10.4 Write property test for dark mode class application
    - **Property 6: Dark mode applies dark backgrounds and light text**
    - For any section component rendered with `.dark` on root, CSS variable-based classes are present
    - **Validates: Requirements 8.1, 8.2**

- [x] 11. Final checkpoint — Build verification
  - Run `npx astro build` from `client/` directory to verify production build succeeds
  - Run `npx vitest --run` from `client/` directory to verify all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property tests use `fast-check` library (already in devDependencies) with `vitest` + `jsdom`
- Checkpoints ensure incremental validation after each batch of component conversions
- The content-loader types remain unchanged; `.tsx` components import them directly
- Build command: `npx astro build` (from `client/` directory)
- Test command: `npx vitest --run` (from `client/` directory)
