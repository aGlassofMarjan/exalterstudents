// Feature: shadcn-dark-mode-migration, Property 4: Section components render shadcn primitives
// **Validates: Requirements 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7**

import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import * as fc from 'fast-check'

import AboutSection from './AboutSection'
import ServiceBriefSection from './ServiceBriefSection'
import ServiceFullSection from './ServiceFullSection'
import MetricsSection from './MetricsSection'
import TestimonialSection from './TestimonialSection'
import NewsSection from './NewsSection'
import EventsSection from './EventsSection'

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

// Each component variant with its arbitrary and expected card count
type ComponentVariant =
  | { tag: 'about'; data: Parameters<typeof AboutSection>[0]['about'] }
  | { tag: 'serviceBrief'; data: { title: string; cards: { name: string; description: string }[] } }
  | { tag: 'serviceFull'; data: { title: string; subtitle: string; cards: { name: string; description: string }[] } }
  | { tag: 'metrics'; data: Parameters<typeof MetricsSection>[0]['metrics'] }
  | { tag: 'testimonial'; data: { name: string; role: string; quote: string }[] }
  | { tag: 'news'; data: { date: string; title: string; url: string }[] }
  | { tag: 'events'; data: { name: string; date: string; url: string }[] }

const componentArb: fc.Arbitrary<ComponentVariant> = fc.oneof(
  aboutContentArb.map((data) => ({ tag: 'about' as const, data })),
  fc.record({ title: nonEmptyStr, cards: fc.array(serviceCardArb, { minLength: 1, maxLength: 5 }) }).map((data) => ({
    tag: 'serviceBrief' as const,
    data,
  })),
  fc
    .record({
      title: nonEmptyStr,
      subtitle: nonEmptyStr,
      cards: fc.array(serviceCardArb, { minLength: 1, maxLength: 5 }),
    })
    .map((data) => ({ tag: 'serviceFull' as const, data })),
  metricsContentArb.map((data) => ({ tag: 'metrics' as const, data })),
  fc.array(testimonialCardArb, { minLength: 1, maxLength: 5 }).map((data) => ({ tag: 'testimonial' as const, data })),
  fc.array(newsCardArb, { minLength: 1, maxLength: 5 }).map((data) => ({ tag: 'news' as const, data })),
  fc.array(eventCardArb, { minLength: 1, maxLength: 5 }).map((data) => ({ tag: 'events' as const, data })),
)

function renderVariant(variant: ComponentVariant): { container: HTMLElement; expectedCards: number } {
  switch (variant.tag) {
    case 'about': {
      const { container } = render(<AboutSection about={variant.data} />)
      return { container, expectedCards: variant.data.valueCards.length + 1 }
    }
    case 'serviceBrief': {
      const { container } = render(<ServiceBriefSection title={variant.data.title} cards={variant.data.cards} />)
      return { container, expectedCards: variant.data.cards.length }
    }
    case 'serviceFull': {
      const { container } = render(
        <ServiceFullSection title={variant.data.title} subtitle={variant.data.subtitle} cards={variant.data.cards} />,
      )
      return { container, expectedCards: variant.data.cards.length }
    }
    case 'metrics': {
      const { container } = render(<MetricsSection metrics={variant.data} />)
      return { container, expectedCards: variant.data.achievementCards.length }
    }
    case 'testimonial': {
      const { container } = render(<TestimonialSection testimonials={variant.data} />)
      return { container, expectedCards: variant.data.length }
    }
    case 'news': {
      const { container } = render(<NewsSection news={variant.data} />)
      return { container, expectedCards: variant.data.length }
    }
    case 'events': {
      const { container } = render(<EventsSection events={variant.data} />)
      return { container, expectedCards: variant.data.length }
    }
  }
}

describe('Property 4: Section components render shadcn primitives', () => {
  it('rendered HTML contains data-slot="card" elements matching content item count', () => {
    fc.assert(
      fc.property(componentArb, (variant) => {
        const { container, expectedCards } = renderVariant(variant)
        const cards = container.querySelectorAll('[data-slot="card"]')
        expect(cards.length).toBe(expectedCards)
      }),
      { numRuns: 100 },
    )
  })
})
