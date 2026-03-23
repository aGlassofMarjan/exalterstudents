# Requirements Document

## Introduction

Migrate the Exalter Students landing page from hardcoded colors and raw HTML/Astro section components to shadcn UI primitives (Card, Button, Badge) with React, and add dark/light theme switching. The visual design and layout remain identical; only the underlying component library and color system change. All `.astro` section components convert to `.tsx` React components; `.astro` pages stay as-is and mount the new React components via `client:load`.

## Glossary

- **Landing_Page**: The Exalter Students static site built with Astro 6, React 19, and Tailwind CSS v4, consisting of three pages (index, program, berita).
- **Section_Component**: A self-contained UI section (e.g. HeroSection, AboutSection, Footer) that renders a visual block of the page.
- **shadcn_UI**: A collection of accessible, composable React UI primitives (Card, Button, Badge, etc.) built on Radix UI and styled with Tailwind CSS variables.
- **CSS_Variable_System**: The set of CSS custom properties defined in `global.css` (e.g. `--background`, `--foreground`, `--card`, `--primary`) that shadcn components reference for theming.
- **Theme_Toggle**: A UI control that switches the site between light and dark color schemes.
- **Theme_Preference**: The user's chosen color scheme (light or dark) persisted in `localStorage`.
- **Flash_Of_Wrong_Theme (FOWT)**: A visual flicker where the page briefly renders in the wrong theme before JavaScript applies the stored preference.
- **Brand_Colors**: The fixed color palette — Primary #1E3A8A, Accent Blue #3B82F6, CTA Amber #F59E0B, WhatsApp Green #25D366, Text #0F172A, Background #F8FAFC.
- **Astro_Page**: A `.astro` file in `src/pages/` that serves as a route and composes Section_Components.

## Requirements

### Requirement 1: CSS Variable System Update for Brand Colors

**User Story:** As a developer, I want the shadcn CSS variable system in `global.css` to reflect the Exalter Students brand colors for both light and dark themes, so that all shadcn components automatically use the correct brand palette.

#### Acceptance Criteria

1. THE CSS_Variable_System SHALL map `--primary` to the Brand_Colors primary value (#1E3A8A equivalent in oklch) in the `:root` (light) scope.
2. THE CSS_Variable_System SHALL map `--background` to the Brand_Colors background value (#F8FAFC equivalent) in the `:root` scope.
3. THE CSS_Variable_System SHALL map `--foreground` to the Brand_Colors text value (#0F172A equivalent) in the `:root` scope.
4. THE CSS_Variable_System SHALL define a `--cta` custom property set to the Brand_Colors CTA amber value (#F59E0B equivalent) in both `:root` and `.dark` scopes.
5. THE CSS_Variable_System SHALL define a `--whatsapp` custom property set to the Brand_Colors WhatsApp green value (#25D366 equivalent) in both `:root` and `.dark` scopes.
6. THE CSS_Variable_System SHALL define appropriate dark-mode values for `--primary`, `--background`, `--foreground`, `--card`, `--card-foreground`, `--muted`, `--muted-foreground`, `--border`, and `--accent` in the `.dark` scope that maintain readable contrast against the Brand_Colors.
7. THE CSS_Variable_System SHALL register `--color-cta` and `--color-whatsapp` in the `@theme inline` block so Tailwind utility classes `bg-cta`, `text-cta`, `bg-whatsapp`, and `text-whatsapp` are available.

### Requirement 2: Theme Toggle Component

**User Story:** As a site visitor, I want a toggle button to switch between light and dark themes, so that I can view the site in my preferred color scheme.

#### Acceptance Criteria

1. THE Theme_Toggle SHALL render a button displaying a sun icon in dark mode and a moon icon in light mode.
2. WHEN the user activates the Theme_Toggle, THE Theme_Toggle SHALL add or remove the `dark` class on the `<html>` element.
3. WHEN the user activates the Theme_Toggle, THE Theme_Toggle SHALL persist the selected Theme_Preference to `localStorage` under a consistent key.
4. THE Theme_Toggle SHALL be keyboard accessible and include an `aria-label` describing the current action (e.g. "Switch to dark mode").
5. THE Theme_Toggle SHALL be placed in the Navigation component, visible on both desktop and mobile viewports.

### Requirement 3: Theme Persistence and FOWT Prevention

**User Story:** As a returning visitor, I want my theme preference to be remembered and applied instantly on page load, so that I do not see a flash of the wrong theme.

#### Acceptance Criteria

1. WHEN the Landing_Page loads, THE Landing_Page SHALL execute an inline blocking script in the `<head>` that reads Theme_Preference from `localStorage` and applies the `dark` class to `<html>` before any content renders.
2. IF no Theme_Preference exists in `localStorage`, THEN THE Landing_Page SHALL respect the user's operating system color scheme preference via `prefers-color-scheme`.
3. IF no Theme_Preference exists and no OS preference is detected, THEN THE Landing_Page SHALL default to light mode.
4. THE inline blocking script SHALL be present in all three Astro_Pages (index, program, berita).

### Requirement 4: Astro Section Component to React TSX Migration

**User Story:** As a developer, I want all `.astro` section components converted to `.tsx` React components, so that they can use shadcn UI primitives and participate in the React-based theme system.

#### Acceptance Criteria

1. THE Landing_Page SHALL have the following components converted from `.astro` to `.tsx` React components: HeroSection, AboutSection, ServiceBriefSection, ServiceFullSection, MetricsSection, TestimonialSection, NewsSection, EventsSection, Footer.
2. WHEN a Section_Component is converted to `.tsx`, THE Section_Component SHALL accept the same props as the original `.astro` component.
3. WHEN a Section_Component is converted to `.tsx`, THE Section_Component SHALL produce visually identical output to the original `.astro` component in light mode.
4. THE converted Section_Components SHALL use `client:load` directive in all Astro_Pages where they are referenced.
5. THE original `.astro` Section_Component files SHALL be removed after successful conversion.

### Requirement 5: shadcn UI Primitive Adoption

**User Story:** As a developer, I want section components to use shadcn Card, Button, and Badge primitives instead of raw `<div>` elements, so that the UI is consistent, accessible, and theme-aware.

#### Acceptance Criteria

1. THE AboutSection SHALL use shadcn Card (Card, CardHeader, CardContent) for value cards and the summary card.
2. THE ServiceBriefSection SHALL use shadcn Card for service cards and shadcn Button for the CTA link.
3. THE ServiceFullSection SHALL use shadcn Card for service cards.
4. THE MetricsSection SHALL use shadcn Card for achievement cards.
5. THE TestimonialSection SHALL use shadcn Card for testimonial cards.
6. THE NewsSection SHALL use shadcn Card for news cards and shadcn Button for the "Baca Selengkapnya" link.
7. THE EventsSection SHALL use shadcn Card for event cards.
8. THE MarqueeSection SHALL use shadcn Card for partner logo items.
9. THE ScrollToTop SHALL use shadcn Button for the scroll-to-top control.
10. THE Navigation SHALL use shadcn Button for the WhatsApp CTA and the mobile hamburger toggle.

### Requirement 6: Hardcoded Color Replacement with CSS Variables

**User Story:** As a developer, I want all hardcoded color values (inline `style=` attributes and Tailwind color classes like `bg-white`, `text-slate-600`, `bg-[#F8FAFC]`) replaced with shadcn CSS variable-based classes, so that all components respond to theme changes.

#### Acceptance Criteria

1. THE Section_Components SHALL use `bg-background` instead of `bg-white`, `bg-[#F8FAFC]`, or `style="background: #F8FAFC"`.
2. THE Section_Components SHALL use `text-foreground` instead of `text-[#0F172A]` or `text-slate-800/900`.
3. THE Section_Components SHALL use `text-muted-foreground` instead of `text-slate-500`, `text-slate-600`, or `text-slate-400`.
4. THE Section_Components SHALL use `text-primary` instead of `text-[#1E3A8A]` for headings.
5. THE Section_Components SHALL use `bg-card` and `text-card-foreground` for card container backgrounds and text.
6. THE Section_Components SHALL use `border-border` instead of `border-slate-200` or `border-blue-100`.
7. THE Section_Components SHALL use `bg-cta` instead of `bg-[#F59E0B]` for call-to-action elements.
8. THE Section_Components SHALL use `bg-whatsapp` instead of inline `style="background: #25D366"` for WhatsApp buttons.
9. THE Section_Components SHALL contain zero inline `style=` attributes that set color, background-color, or border-color values.
10. THE HeroSection and MetricsSection SHALL use CSS variable-based gradient backgrounds that adapt to dark mode.

### Requirement 7: Page Integration

**User Story:** As a developer, I want all three Astro pages updated to import and mount the new React section components with `client:load`, so that the migrated components render correctly.

#### Acceptance Criteria

1. THE index Astro_Page SHALL import all converted Section_Components as `.tsx` modules and mount them with `client:load`.
2. THE program Astro_Page SHALL import ServiceFullSection, MetricsSection, and Footer as `.tsx` modules and mount them with `client:load`.
3. THE berita Astro_Page SHALL import NewsSection, EventsSection, and Footer as `.tsx` modules and mount them with `client:load`.
4. WHEN any Astro_Page is loaded, THE Astro_Page SHALL render all Section_Components with the same content data as before the migration.
5. THE Astro_Pages SHALL include the FOWT-prevention inline script in their `<head>` section.

### Requirement 8: Dark Mode Visual Correctness

**User Story:** As a site visitor using dark mode, I want all sections to display with appropriate dark backgrounds, light text, and sufficient contrast, so that the content is readable and visually cohesive.

#### Acceptance Criteria

1. WHILE the `dark` class is present on `<html>`, THE Section_Components SHALL render with dark background colors and light foreground text.
2. WHILE the `dark` class is present on `<html>`, THE Card components SHALL render with the `--card` dark value background and `--card-foreground` dark value text.
3. WHILE the `dark` class is present on `<html>`, THE HeroSection SHALL maintain readable text over the dark background image marquee.
4. WHILE the `dark` class is present on `<html>`, THE MetricsSection gradient background SHALL adapt to use darker tones while preserving the brand blue identity.
5. WHILE the `dark` class is present on `<html>`, THE Footer SHALL render with appropriate dark background and muted text colors.
6. WHILE the `dark` class is present on `<html>`, THE Navigation SHALL render with a dark background and appropriately contrasting link and button colors.
