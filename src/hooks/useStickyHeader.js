import { useEffect, useState } from 'react'

/**
 * Tracks whether the page has moved beyond the transparent hero-header state.
 * The header owns this presentation state so page composition stays stateless,
 * and the passive listener is removed whenever the header unmounts.
 *
 * @param {number} [threshold] The vertical distance before the solid treatment appears.
 * @returns {boolean} Whether the document is scrolled beyond the threshold.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
export function useStickyHeader(threshold = 16) {
  const [isScrolled, setIsScrolled] = useState(() => window.scrollY > threshold)

  useEffect(() => {
    const updateScrolledState = () => setIsScrolled(window.scrollY > threshold)

    updateScrolledState()
    window.addEventListener('scroll', updateScrolledState, { passive: true })

    return () => window.removeEventListener('scroll', updateScrolledState)
  }, [threshold])

  return isScrolled
}
