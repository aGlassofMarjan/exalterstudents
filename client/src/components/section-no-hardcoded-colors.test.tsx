// Feature: shadcn-dark-mode-migration, Property 5: No hardcoded color values in rendered component output
// **Validates: Requirements 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9**

import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import * as fc from 'fast-check'

import HeroSection from './HeroSection'
import AboutSection from './AboutSection'
import ServiceBriefSection from './ServiceBriefSection'
import ServiceFullSection from './ServiceFullSection'
import MetricsSection from './MetricsSection'
import TestimonialSection from './TestimonialSection'
import NewsSection from './NewsSection'
import EventsSection from './EventsSection'
import Footer from './Footer'
import Navigation from './Navigation'

// Mock ThemeToggle to avoid document.documentElement issues
vi.mock('./ThemeToggle', () => ({
  default: ({ className }: { className?: string }) => (
    <button data-testid="theme-toggle" className={className} aria-label="Switch to dark mode">
      Toggle
    </button>
  ),
}))

// --- Banned patterns ---

// Banned className patterns
const BANNED_CLASS_PATTERNS = [
  /\bbg-white\b/,
  /\bbg-\[#[0-9a-fA-F]+\]/,
  /\btext-\[#[0-9a-fA-F]+\]/,
  /\btext-slate-\d+/,
  /\bborder-slate-\d+/,
]

// Banned inline style patterns (only check on element style attributes, not <style> tags)
const BANNED_STYLE_PATTERNS = [
  /color\s*:/i,
  /background(-color)?\s*:/i,
  /border-color\s*:/i,
]

// --- Arbitraries ---

const nonEmptyStr = fc.string({ minLength: 1, maxLength: 30 }).filter((s) => s.trim().length > 0)

const valueCardArb = fc.record({
  name: nonEmptyStr,
  description: nonEmptyStr,
})

const aboutContentArb = fc.record({
  title: nonEmptyStr,
  subtitle: nonEmptyStr,
  valueCards: fc.array(valueCardArb, { minLength: 1, maxLength: 5 }),
  summaryTitle: nonEmptyStr,
  summaryDescription: nonEmptyStr,
})

const serviceCardArb = fc.record({
  name: nonEmptyStr,
  description: nonEmptyStr,
})

const achievementCardArb = fc.record({
  title: nonEmptyStr,
  description: nonEmptyStr,
})

const metricItemArb = fc.record({
  value: nonEmptyStr,
  label: nonEmptyStr,
})

const metricsContentArb = fc.record({
  title: nonEmptyStr,
  description: nonEmptyStr,
  metrics: fc.array(metricItemArb, { minLength: 1, maxLength: 5 }),
  achievementCards: fc.array(achievementCardArb, { minLength: 1, maxLength: 5 }),
})

const testimonialCardArb = fc.record({
  name: nonEmptyStr,
  role: nonEmptyStr,
  quote: nonEmptyStr,
})

const newsCardArb = fc.record({
  date: nonEmptyStr,
  title: nonEmptyStr,
  url: fc.webUrl(),
})

const eventCardArb = fc.record({
  name: nonEmptyStr,
  date: nonEmptyStr,
  url: fc.webUrl(),
})

const navPathArb = fc.constantFrom('/', '/program', '/berita')

// --- Component variant type ---

type ComponentVariant =
  | { tag: 'hero'; data: { title: string; subtitle: string } }
  | { tag: 'about'; data: Parameters<typeof AboutSection>[0]['about'] }
  | { tag: 'serviceBrief'; data: { title: string; cards: { name: string; description: string }[] } }
  | { tag: 'serviceFull'; data: { title: string; subtitle: string; cards: { name: string; description: string }[] } }
  | { tag: 'metrics'; data: Parameters<typeof MetricsSection>[0]['metrics'] }
  | { tag: 'testimonial'; data: { name: string; role: string; quote: string }[] }
  | { tag: 'news'; data: { date: string; title: string; url: string }[] }
  | { tag: 'events'; data: { name: string; date: string; url: string }[] }
  | { tag: 'footer' }
  | { tag: 'navigation'; data: string }

const componentArb: fc.Arbitrary<ComponentVariant> = fc.oneof(
  fc.record({ title: nonEmptyStr, subtitle: nonEmptyStr }).map((data) => ({ tag: 'hero' as const, data })),
  aboutContentArb.map((data) => ({ tag: 'about' as const, data })),
  fc.record({ title: nonEmptyStr, cards: fc.array(serviceCardArb, { minLength: 1, maxLength: 5 }) }).map((data) => ({
    tag: 'serviceBrief' as const,
    data,
  })),
  fc.record({
    title: nonEmptyStr,
    subtitle: nonEmptyStr,
    cards: fc.array(serviceCardArb, { minLength: 1, maxLength: 5 }),
  }).map((data) => ({ tag: 'serviceFull' as const, data })),
  metricsContentArb.map((data) => ({ tag: 'metrics' as const, data })),
  fc.array(testimonialCardArb, { minLength: 1, maxLength: 5 }).map((data) => ({ tag: 'testimonial' as const, data })),
  fc.array(newsCardArb, { minLength: 1, maxLength: 5 }).map((data) => ({ tag: 'news' as const, data })),
  fc.array(eventCardArb, { minLength: 1, maxLength: 5 }).map((data) => ({ tag: 'events' as const, data })),
  fc.constant({ tag: 'footer' as const }),
  navPathArb.map((path) => ({ tag: 'navigation' as const, data: path })),
)

function renderVariant(variant: ComponentVariant): HTMLElement {
  switch (variant.tag) {
    case 'hero':
      return render(<HeroSection title={variant.data.title} subtitle={variant.data.subtitle} />).container
    case 'about':
      return render(<AboutSection about={variant.data} />).container
    case 'serviceBrief':
      return render(<ServiceBriefSection title={variant.data.title} cards={variant.data.cards} />).container
    case 'serviceFull':
      return render(
        <ServiceFullSection title={variant.data.title} subtitle={variant.data.subtitle} cards={variant.data.cards} />,
      ).container
    case 'metrics':
      return render(<MetricsSection metrics={variant.data} />).container
    case 'testimonial':
      return render(<TestimonialSection testimonials={variant.data} />).container
    case 'news':
      return render(<NewsSection news={variant.data} />).container
    case 'events':
      return render(<EventsSection events={variant.data} />).container
    case 'footer':
      return render(<Footer />).container
    case 'navigation':
      return render(<Navigation currentPath={variant.data} />).container
  }
}

function checkNoBannedClasses(container: HTMLElement): void {
  const allElements = container.querySelectorAll('*')
  for (const el of allElements) {
    const className = (el as HTMLElement).getAttribute('class') ?? ''
    for (const pattern of BANNED_CLASS_PATTERNS) {
      const match = className.match(pattern)
      expect(
        match,
        `Found banned class "${match?.[0]}" on <${el.tagName.toLowerCase()}> with classes: "${className}"`,
      ).toBeNull()
    }
  }
}

function checkNoBannedInlineStyles(container: HTMLElement): void {
  // Only check inline style attributes on HTML elements, not <style> tag content
  const allElements = container.querySelectorAll('*:not(style)')
  for (const el of allElements) {
    const style = (el as HTMLElement).getAttribute('style')
    if (!style) continue
    for (const pattern of BANNED_STYLE_PATTERNS) {
      const match = style.match(pattern)
      expect(
        match,
        `Found banned inline style "${match?.[0]}" on <${el.tagName.toLowerCase()}> with style: "${style}"`,
      ).toBeNull()
    }
  }
}

describe('Property 5: No hardcoded color values in rendered component output', () => {
  it('output HTML contains zero banned inline style color attributes and zero banned Tailwind color classes', () => {
    fc.assert(
      fc.property(componentArb, (variant) => {
        const container = renderVariant(variant)
        checkNoBannedClasses(container)
        checkNoBannedInlineStyles(container)
      }),
      { numRuns: 100 },
    )
  })
})
