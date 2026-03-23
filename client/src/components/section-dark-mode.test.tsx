// Feature: shadcn-dark-mode-migration, Property 6: Dark mode applies dark backgrounds and light text
// **Validates: Requirements 8.1, 8.2**

import { describe, it, expect, afterEach } from 'vitest'
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

// --- Valid CSS variable-based class patterns ---

// Background classes that resolve through CSS variables (theme-aware)
const VALID_BG_CLASSES = [
  'bg-background',
  'bg-card',
  'bg-foreground',
]

// A gradient using oklch values is also valid (CSS variable-based via design)
const OKLCH_GRADIENT_PATTERN = /bg-\[linear-gradient\([^)]*oklch\(/

// Text classes that resolve through CSS variables (theme-aware)
const VALID_TEXT_CLASS_PATTERNS = [
  /\btext-foreground\b/,
  /\btext-card-foreground\b/,
  /\btext-muted-foreground\b/,
  /\btext-primary\b/,
  /\btext-primary-foreground\b/,
  /\btext-accent\b/,
  /\btext-cta\b/,
  /\btext-cta-foreground\b/,
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
  }
}

function hasValidBgClass(className: string): boolean {
  // Check for standard CSS variable-based bg classes
  for (const cls of VALID_BG_CLASSES) {
    if (className.split(/\s+/).some((c) => c === cls || c === `dark:${cls}`)) {
      return true
    }
  }
  // Check for oklch gradient pattern (MetricsSection uses this)
  if (OKLCH_GRADIENT_PATTERN.test(className)) {
    return true
  }
  return false
}

function hasValidTextClass(className: string): boolean {
  for (const pattern of VALID_TEXT_CLASS_PATTERNS) {
    if (pattern.test(className)) {
      return true
    }
  }
  // Also accept opacity variants like text-primary-foreground/70
  if (/\btext-(foreground|card-foreground|muted-foreground|primary|primary-foreground|accent|cta|cta-foreground)(\/\d+)?\b/.test(className)) {
    return true
  }
  return false
}

describe('Property 6: Dark mode applies dark backgrounds and light text', () => {
  afterEach(() => {
    document.documentElement.classList.remove('dark')
  })

  it('section root uses CSS variable-based background and text classes when dark class is present', () => {
    fc.assert(
      fc.property(componentArb, (variant) => {
        // Apply dark class before rendering
        document.documentElement.classList.add('dark')

        const container = renderVariant(variant)

        // Find the root section or footer element
        const rootEl = container.querySelector('section') ?? container.querySelector('footer')
        expect(rootEl, `Expected a <section> or <footer> element for variant "${variant.tag}"`).not.toBeNull()

        const rootClassName = rootEl!.getAttribute('class') ?? ''

        // Assert: root element uses a CSS variable-based background class
        expect(
          hasValidBgClass(rootClassName),
          `Expected CSS variable-based bg class on <${rootEl!.tagName.toLowerCase()}> for "${variant.tag}", got: "${rootClassName}"`,
        ).toBe(true)

        // Assert: at least one text element in the component uses a CSS variable-based text class
        const allElements = container.querySelectorAll('*')
        let foundValidText = false
        for (const el of allElements) {
          const cls = (el as HTMLElement).getAttribute('class') ?? ''
          if (hasValidTextClass(cls)) {
            foundValidText = true
            break
          }
        }
        expect(
          foundValidText,
          `Expected at least one element with CSS variable-based text class for "${variant.tag}"`,
        ).toBe(true)

        // Cleanup dark class for next iteration
        document.documentElement.classList.remove('dark')
      }),
      { numRuns: 100 },
    )
  })
})
