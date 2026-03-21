import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import * as fc from 'fast-check'
import Navigation from './Navigation'

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
})

/**
 * Property 1: Active Navigation Link
 * Validates: Requirements 1.3
 *
 * For any page path, the corresponding nav link has active styling (bold + primary color),
 * while the other links do not.
 */
describe('Property 1: Active Navigation Link', () => {
  const links = [
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

          // Find all desktop nav links (inside the hidden md:flex container)
          // We check the inline style color to distinguish active vs inactive
          const allLinks = container.querySelectorAll('a[href]')

          // Filter to nav links (not the logo)
          const navLinks = Array.from(allLinks).filter((a) =>
            links.some((l) => l.href === a.getAttribute('href') && a.textContent === l.label)
          )

          // There should be nav links rendered (desktop + mobile when open)
          // At minimum the desktop links are always present
          const desktopLinks = navLinks.slice(0, 3)

          for (const link of desktopLinks) {
            const href = link.getAttribute('href')
            const style = (link as HTMLElement).style
            if (href === path) {
              // Active link: primary color and bold
              expect(style.color).toBe('rgb(30, 58, 138)') // #1E3A8A
              expect(style.fontWeight).toBe('700')
            } else {
              // Inactive link: text color, not bold
              expect(style.color).toBe('rgb(15, 23, 42)') // #0F172A
              expect(style.fontWeight).toBe('500')
            }
          }

          unmount()
        }
      ),
      { numRuns: 100 }
    )
  })
})
