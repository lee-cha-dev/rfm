import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'

beforeEach(() => {
  window.scrollTo = vi.fn()
  window.Element.prototype.scrollIntoView = vi.fn()
  window.requestAnimationFrame = vi.fn((callback) => {
    callback()
    return 1
  })
  window.cancelAnimationFrame = vi.fn()
})

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})
