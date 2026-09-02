import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import ErrorBoundary from '../components/ErrorBoundary.jsx'

let shouldThrow

/**
 * Throws only while the test-controlled flag is active so boundary recovery
 * can prove that retry renders descendants again.
 *
 * @returns {import('react').JSX.Element} A recovered descendant.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
function ControlledFailure() {
  if (shouldThrow) throw Object.assign(new Error('private patient detail'), { status: 500 })

  return <span>Recovered content</span>
}

describe('ErrorBoundary', () => {
  beforeEach(() => {
    shouldThrow = true
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  it('renders catalog-owned fallback copy without exposing raw details', () => {
    render(
      <MemoryRouter>
        <ErrorBoundary><ControlledFailure /></ErrorBoundary>
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { level: 1, name: 'Internal Server Error' })).toBeInTheDocument()
    expect(screen.getByText("Ro's Family Medicine")).toBeInTheDocument()
    expect(screen.queryByText(/private patient detail/i)).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument()
  })

  it('clears the fallback for an intentional retry', () => {
    render(
      <MemoryRouter>
        <ErrorBoundary><ControlledFailure /></ErrorBoundary>
      </MemoryRouter>,
    )

    shouldThrow = false
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }))

    expect(screen.getByText('Recovered content')).toBeInTheDocument()
  })

  it('clears a trapped error when the navigation reset key changes', () => {
    const { rerender } = render(
      <MemoryRouter>
        <ErrorBoundary resetKey="/failed"><ControlledFailure /></ErrorBoundary>
      </MemoryRouter>,
    )

    shouldThrow = false
    rerender(
      <MemoryRouter>
        <ErrorBoundary resetKey="/recovered"><ControlledFailure /></ErrorBoundary>
      </MemoryRouter>,
    )

    expect(screen.getByText('Recovered content')).toBeInTheDocument()
  })
})
