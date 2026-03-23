// Feature: shadcn-dark-mode-migration, Property 2: ThemeToggle round-trip
// Validates: Requirements 2.1, 2.2, 2.3, 2.4

import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import * as fc from 'fast-check'
import ThemeToggle from './ThemeToggle'

describe('Property 2: ThemeToggle round-trip', () => {
  afterEach(() => {
    cleanup()
    document.documentElement.classList.remove('dark')
    localStorage.clear()
  })

  it('clicking ThemeToggle flips dark class, persists to localStorage, shows correct icon, and updates aria-label', () => {
    fc.assert(
      fc.property(
        fc.boolean(),
        (startDark) => {
          // Clean up from previous iteration
          cleanup()
          document.documentElement.classList.remove('dark')
          localStorage.clear()

          // Set up initial theme state
          if (startDark) {
            document.documentElement.classList.add('dark')
          }

          // Render ThemeToggle
          render(<ThemeToggle />)

          // Verify initial state before click
          const button = screen.getByRole('button')

          if (startDark) {
            // Dark mode: should show Sun icon, aria-label to switch to light
            expect(button.getAttribute('aria-label')).toBe('Switch to light mode')
            expect(button.querySelector('.lucide-sun')).toBeTruthy()
          } else {
            // Light mode: should show Moon icon, aria-label to switch to dark
            expect(button.getAttribute('aria-label')).toBe('Switch to dark mode')
            expect(button.querySelector('.lucide-moon')).toBeTruthy()
          }

          // Click the toggle
          fireEvent.click(button)

          // Assert: dark class is flipped
          const expectedDarkAfterClick = !startDark
          expect(document.documentElement.classList.contains('dark')).toBe(expectedDarkAfterClick)

          // Assert: localStorage matches new state
          const storedTheme = localStorage.getItem('theme')
          expect(storedTheme).toBe(expectedDarkAfterClick ? 'dark' : 'light')

          // Assert: correct icon is displayed after click
          if (expectedDarkAfterClick) {
            // Now in dark mode: should show Sun icon
            expect(button.querySelector('.lucide-sun')).toBeTruthy()
          } else {
            // Now in light mode: should show Moon icon
            expect(button.querySelector('.lucide-moon')).toBeTruthy()
          }

          // Assert: aria-label is updated
          if (expectedDarkAfterClick) {
            expect(button.getAttribute('aria-label')).toBe('Switch to light mode')
          } else {
            expect(button.getAttribute('aria-label')).toBe('Switch to dark mode')
          }

          // Clean up for next iteration
          cleanup()
          document.documentElement.classList.remove('dark')
          localStorage.clear()
        }
      ),
      { numRuns: 100 }
    )
  })
})
