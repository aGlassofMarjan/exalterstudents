// Feature: shadcn-dark-mode-migration, Property 3: FOWT script applies correct theme from localStorage
// **Validates: Requirements 3.1, 3.2, 3.3**

import { describe, it, expect, afterEach, vi } from 'vitest'
import * as fc from 'fast-check'

/**
 * Extracted FOWT script logic — mirrors the inline script in Astro pages:
 *
 *   (function() {
 *     var t = localStorage.getItem('theme');
 *     if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
 *       document.documentElement.classList.add('dark');
 *     }
 *   })();
 */
function applyFowtTheme(): void {
  const t = localStorage.getItem('theme')
  if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  }
}

describe('Property 3: FOWT script applies correct theme from localStorage', () => {
  afterEach(() => {
    document.documentElement.classList.remove('dark')
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('applies dark class if and only if localStorage is "dark" OR (absent AND OS prefers dark)', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('dark' as const, 'light' as const, null),
        fc.boolean(),
        (themeValue, osPrefDark) => {
          // Clean up from previous iteration
          document.documentElement.classList.remove('dark')
          localStorage.clear()

          // Set up localStorage
          if (themeValue !== null) {
            localStorage.setItem('theme', themeValue)
          }

          // Mock window.matchMedia to return the generated OS preference
          window.matchMedia = vi.fn((query: string) => ({
            matches: query === '(prefers-color-scheme: dark)' ? osPrefDark : false,
            media: query,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
          })) as unknown as typeof window.matchMedia

          // Execute the FOWT script logic
          applyFowtTheme()

          // Expected: dark class present iff localStorage is 'dark' OR (null AND OS prefers dark)
          const expectedDark = themeValue === 'dark' || (themeValue === null && osPrefDark)
          expect(document.documentElement.classList.contains('dark')).toBe(expectedDark)

          // Clean up for next iteration
          document.documentElement.classList.remove('dark')
          localStorage.clear()
          vi.restoreAllMocks()
        }
      ),
      { numRuns: 100 }
    )
  })
})
