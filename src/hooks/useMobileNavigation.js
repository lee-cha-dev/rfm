import { useEffect, useRef, useState } from 'react'

/**
 * Owns mobile-menu disclosure state and its keyboard/focus behavior without
 * querying or manually mutating the rendered DOM.
 *
 * @returns {{isOpen: boolean, buttonRef: import('react').RefObject<HTMLButtonElement|null>, firstLinkRef: import('react').RefObject<HTMLAnchorElement|null>, toggleMenu: () => void, closeMenu: () => void, handleKeyDown: (event: import('react').KeyboardEvent) => void}} Menu behavior.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
export function useMobileNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef(null)
  const firstLinkRef = useRef(null)

  useEffect(() => {
    if (isOpen) firstLinkRef.current?.focus()
  }, [isOpen])

  const toggleMenu = () => setIsOpen((current) => !current)
  const closeMenu = () => setIsOpen(false)
  const handleKeyDown = (event) => {
    if (event.key !== 'Escape' || !isOpen) return

    event.preventDefault()
    setIsOpen(false)
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
