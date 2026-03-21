# Implementation Tasks — Exalter Students Landing Page

- [x] 1. Setup testing infrastructure
  - Install vitest, @testing-library/react, jsdom, fast-check as dev dependencies
  - Create vitest.config.ts with jsdom environment
  - **References:** design.md Testing Strategy

- [x] 2. Implement content-loader.ts
  - Create `client/src/lib/content-loader.ts` that reads and parses `client/public/contents/Beranda-page.md`
  - Export typed `SiteContent` object with all interfaces: HeroContent, AboutContent, ServiceCard[], MetricsContent, TestimonialCard[], NewsCard[], EventCard[]
  - Implement Indonesian date parsing and event sorting (newest to oldest)
  - **References:** Requirements 11.1, 11.2, 11.3; design.md Data Models

- [x] 3. Configure global styles and fonts
  - Update `client/src/styles/global.css` with Inter variable font import and CSS custom properties for color palette
  - Set color variables: `#1E3A8A` (primary), `#3B82F6` (accent blue), `#0F172A` (text), `#F8FAFC` (background), `#F59E0B` (amber CTA)
  - **References:** Requirements 1.7, 1.8

- [x] 4. Implement Navigation component
  - Create `client/src/components/Navigation.tsx` as React component with props `{ currentPath: string }`
  - Display logo + links to /, /program, /berita; highlight active link based on currentPath
  - Implement hamburger menu for mobile (< 768px) with open/close toggle
  - Ensure keyboard navigability (tab + enter/space)
  - **References:** Requirements 1.2, 1.3, 1.4, 1.5, 10.5

- [x] 5. Implement Footer component
  - Create `client/src/components/Footer.astro`
  - Display contact info, social media links, and copyright
  - **References:** Requirements 1.6

- [x] 6. Implement HeroSection component
  - Create `client/src/components/HeroSection.astro` accepting hero content props
  - Display title, subtitle, amber CTA button, and visual element (above the fold)
  - **References:** Requirements 2.1, 2.2, 2.3, 2.4, 2.5

- [x] 7. Implement AboutSection component
  - Create `client/src/components/AboutSection.astro` accepting about content props
  - Display title, subtitle, three value cards (Innovation, Collaboration, Acceleration) with icons, and brief summary
  - Responsive grid: 1 col mobile, 3 col ≥1024px
  - **References:** Requirements 3.1, 3.2, 3.3, 3.4, 3.5

- [x] 8. Implement ServiceBriefSection component
  - Create `client/src/components/ServiceBriefSection.astro` accepting serviceBrief content props
  - Display section title, three service cards with icons, and CTA link to /program
  - Responsive grid: 1 col mobile, 3 col ≥1024px
  - **References:** Requirements 4.1, 4.2, 4.3, 4.4

- [x] 9. Implement MetricsSection component
  - Create `client/src/components/MetricsSection.astro` accepting metrics content props
  - Display section title, description, three metric items with large typography, and two achievement cards
  - **References:** Requirements 5.1, 5.2, 5.3, 5.4

- [x] 10. Implement MarqueeSection component
  - Create `client/src/components/MarqueeSection.tsx` as React component
  - Implement CSS-only seamless marquee animation with pause-on-hover
  - Display section title and description
  - **References:** Requirements 6.1, 6.2, 6.3, 6.4

- [x] 11. Implement TestimonialSection component
  - Create `client/src/components/TestimonialSection.astro` accepting testimonials array prop
  - Display three testimonial cards with name, role, and quote
  - Responsive grid: 1 col mobile, 3 col ≥1024px
  - **References:** Requirements 7.1, 7.2, 7.3

- [x] 12. Implement ServiceFullSection component
  - Create `client/src/components/ServiceFullSection.astro` accepting serviceFull content props
  - Display section title, subtitle, and six service cards (Incubation, Mentorship, Competition, Conference, Summit, Community) with icons
  - Responsive grid: 1 col mobile, 2 col ≥768px, 3 col ≥1024px
  - **References:** Requirements 8.2, 8.3, 8.4

- [x] 13. Implement NewsSection component
  - Create `client/src/components/NewsSection.astro` accepting news array prop
  - Display five news cards with date, title, and "Baca Selengkapnya" button opening in new tab (target="_blank" rel="noopener noreferrer")
  - Responsive grid: 1 col mobile, 2 col ≥768px, 3 col ≥1024px
  - **References:** Requirements 9.2, 9.3, 9.6

- [x] 14. Implement EventsSection component
  - Create `client/src/components/EventsSection.astro` accepting events array prop (pre-sorted)
  - Display twelve events with name, date, and link opening in new tab
  - **References:** Requirements 9.4, 9.5, 9.7

- [x] 15. Assemble Beranda page (index.astro)
  - Update `client/src/pages/index.astro` to import content-loader and all section components
  - Set `lang="id"` on html element and add meta description
  - Compose: Navigation, HeroSection, AboutSection, ServiceBriefSection, MetricsSection, MarqueeSection, TestimonialSection, Footer
  - **References:** Requirements 1.1, 10.1, 10.2, 10.3

- [x] 16. Create Program page (program.astro)
  - Create `client/src/pages/program.astro`
  - Set `lang="id"` and meta description
  - Compose: Navigation, ServiceFullSection, MetricsSection, Footer
  - **References:** Requirements 8.1, 8.5, 10.2, 10.3

- [x] 17. Create Berita page (berita.astro)
  - Create `client/src/pages/berita.astro`
  - Set `lang="id"` and meta description
  - Compose: Navigation, NewsSection, EventsSection, Footer
  - **References:** Requirements 9.1, 10.2, 10.3

- [x] 18. Write unit tests
  - Test content-loader.ts: verify all fields parsed correctly from Beranda-page.md
  - Test Navigation: logo + three links present, active link detection
  - Test each section component renders expected content
  - Test NewsSection and EventsSection: correct counts (5 news, 12 events)
  - **References:** design.md Unit Tests

- [ ]* 19. Write property-based tests
  - Property 1: Active navigation link (fc.constantFrom paths)
  - Property 2: Testimonial card completeness (name/role/quote non-empty)
  - Property 3: External links have target="_blank" and rel="noopener noreferrer"
  - Property 4: Events chronological order (adjacent pairs)
  - Property 5: Page metadata completeness (lang="id" + meta description)
  - Property 6: Image alt attributes non-empty
  - Property 7: Content sourced from markdown matches rendered output
  - **References:** design.md Correctness Properties, Property-Based Tests

- [x] 20. Build verification
  - Run `npx astro build` and verify no errors
  - Verify all three routes generate static HTML
  - **References:** Requirements 10.1
