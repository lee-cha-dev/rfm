import { useEffect, useRef, useState } from 'react'

/**
 * Owns mobile-menu disclosure state and its keyboard/focus behavior without
 * querying or manually mutating the rendered DOM.
 *
 * @param {string} navigationKey The active location key that owns an open panel.
 * @returns {{isOpen: boolean, buttonRef: import('react').RefObject<HTMLButtonElement|null>, firstLinkRef: import('react').RefObject<HTMLAnchorElement|null>, toggleMenu: () => void, closeMenu: () => void, handleKeyDown: (event: import('react').KeyboardEvent) => void}} Menu behavior.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
export function useMobileNavigation(navigationKey) {
  const [openLocation, setOpenLocation] = useState(null)
  const isOpen = openLocation === navigationKey
  const buttonRef = useRef(null)
  const firstLinkRef = useRef(null)

  useEffect(() => {
    if (isOpen) firstLinkRef.current?.focus()
  }, [isOpen])

  const toggleMenu = () => setOpenLocation((current) => (
    current === navigationKey ? null : navigationKey
  ))
  const closeMenu = () => setOpenLocation(null)
  const handleKeyDown = (event) => {
    if (event.key !== 'Escape' || !isOpen) return

    event.preventDefault()
    setOpenLocation(null)
    buttonRef.current?.focus()
  }

  return {
    isOpen,
    buttonRef,
    firstLinkRef,
    toggleMenu,
    closeMenu,
    handleKeyDown,
  }
}
