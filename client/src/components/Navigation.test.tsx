import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import * as fc from 'fast-check'
import Navigation from './Navigation'

// Mock ThemeToggle to avoid document.documentElement access in jsdom
vi.mock('./ThemeToggle', () => ({
  default: ({ className }: { className?: string }) => (
    <button data-testid="theme-toggle" className={className} aria-label="Switch to dark mode">
      Toggle
    </button>
  ),
}))

describe('Navigation', () => {
  it('renders logo text', () => {
    render(<Navigation currentPath="/" />)
    expect(screen.getByText('Exalter Students')).toBeTruthy()
  })

  it('renders all three nav links', () => {
    render(<Navigation currentPath="/" />)
    expect(screen.getAllByText('Beranda').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Program').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Berita').length).toBeGreaterThan(0)
  })

  it('hamburger button has correct aria attributes when closed', () => {
    render(<Navigation currentPath="/" />)
    const btn = screen.getByRole('button', { name: /toggle menu/i })
    expect(btn.getAttribute('aria-expanded')).toBe('false')
    expect(btn.getAttribute('aria-label')).toBe('Toggle menu')
  })

  it('toggles mobile menu open and closed on click', () => {
    render(<Navigation currentPath="/" />)
    const btn = screen.getByRole('button', { name: /toggle menu/i })
    fireEvent.click(btn)
    expect(btn.getAttribute('aria-expanded')).toBe('true')
    fireEvent.click(btn)
    expect(btn.getAttribute('aria-expanded')).toBe('false')
  })

  it('toggles mobile menu on Enter key', () => {
    render(<Navigation currentPath="/" />)
    const btn = screen.getByRole('button', { name: /toggle menu/i })
    fireEvent.keyDown(btn, { key: 'Enter' })
    expect(btn.getAttribute('aria-expanded')).toBe('true')
  })

  it('toggles mobile menu on Space key', () => {
    render(<Navigation currentPath="/" />)
    const btn = screen.getByRole('button', { name: /toggle menu/i })
    fireEvent.keyDown(btn, { key: ' ' })
    expect(btn.getAttribute('aria-expanded')).toBe('true')
  })

  it('renders ThemeToggle in the nav bar', () => {
    render(<Navigation currentPath="/" />)
    const toggles = screen.getAllByTestId('theme-toggle')
    expect(toggles.length).toBeGreaterThanOrEqual(1)
  })

  it('uses shadcn Button for WhatsApp CTA (data-slot="button")', () => {
    render(<Navigation currentPath="/" />)
    const waLinks = screen.getAllByText('Hubungi Kami')
    // At least one WhatsApp button should have data-slot="button" (shadcn Button)
    const hasShadcnButton = waLinks.some(
      (el) => el.closest('[data-slot="button"]') !== null
    )
    expect(hasShadcnButton).toBe(true)
  })

  it('uses shadcn Button for hamburger toggle (data-slot="button")', () => {
    render(<Navigation currentPath="/" />)
    const btn = screen.getByRole('button', { name: /toggle menu/i })
    expect(btn.getAttribute('data-slot')).toBe('button')
  })

  it('has zero inline style attributes that set color values', () => {
    const { container } = render(<Navigation currentPath="/" />)
    const allElements = container.querySelectorAll('*')
    for (const el of allElements) {
      const style = (el as HTMLElement).getAttribute('style')
      if (style) {
        expect(style).not.toMatch(/\bcolor\b/i)
        expect(style).not.toMatch(/\bbackground\b/i)
        expect(style).not.toMatch(/\bborder-color\b/i)
      }
    }
  })

  it('uses bg-background instead of bg-white on the nav element', () => {
    const { container } = render(<Navigation currentPath="/" />)
    const nav = container.querySelector('nav')
    expect(nav?.className).toContain('bg-background')
    expect(nav?.className).not.toContain('bg-white')
  })

  it('uses border-border instead of hardcoded border colors', () => {
    const { container } = render(<Navigation currentPath="/" />)
    const nav = container.querySelector('nav')
    expect(nav?.className).toContain('border-border')
  })
})

/**
 * Property 1: Active Navigation Link
 * Validates: Requirements 1.3
 *
 * For any page path, the corresponding nav link has active styling (CSS variable classes),
 * while the other links do not.
 */
describe('Property 1: Active Navigation Link', () => {
  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/program', label: 'Program' },
    { href: '/berita', label: 'Berita' },
  ]

  it('active link is styled differently from inactive links for all paths', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('/', '/program', '/berita'),
        (path) => {
          const { container, unmount } = render(<Navigation currentPath={path} />)

          const allLinks = container.querySelectorAll('a[href]')

          // Filter to nav links (not the logo or WhatsApp)
          const filteredNavLinks = Array.from(allLinks).filter((a) =>
            navLinks.some((l) => l.href === a.getAttribute('href') && a.textContent === l.label)
          )

          // Desktop links are the first 3
          const desktopLinks = filteredNavLinks.slice(0, 3)

          for (const link of desktopLinks) {
            const href = link.getAttribute('href')
            const classes = (link as HTMLElement).className
            if (href === path) {
              // Active link: primary background, primary-foreground text, semibold
              expect(classes).toContain('bg-primary')
              expect(classes).toContain('text-primary-foreground')
              expect(classes).toContain('font-semibold')
            } else {
              // Inactive link: foreground text, medium weight
              expect(classes).toContain('text-foreground')
              expect(classes).toContain('font-medium')
              expect(classes).not.toContain('bg-primary')
            }
          }

          unmount()
        }
      ),
      { numRuns: 100 }
    )
  })
})
