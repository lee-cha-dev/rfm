import { readFileSync } from 'node:fs'
import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router'
import App from '../App.jsx'
import { ROUTE_DEFINITIONS } from '../config/routes.js'

describe('Sprint 7 accessibility and metadata baseline', () => {
  it('keeps a complete, ordered heading outline and named landmarks', () => {
    render(<MemoryRouter><App /></MemoryRouter>)

    const headings = screen.getAllByRole('heading')
    const levels = headings.map((heading) => Number(heading.tagName.slice(1)))

    expect(levels[0]).toBe(1)
    levels.slice(1).forEach((level, index) => {
      expect(level - levels[index]).toBeLessThanOrEqual(1)
    })
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('main')).toHaveAttribute('tabindex', '-1')
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Footer navigation' })).toBeInTheDocument()
  })

  it('keeps every rendered fragment target live and hardens new-tab links', () => {
    const { container } = render(<MemoryRouter><App /></MemoryRouter>)

    for (const link of screen.getAllByRole('link', { hidden: true })) {
      const href = link.getAttribute('href')

      if (href?.startsWith('#') && href.length > 1) {
        expect(container.querySelector(href)).toBeInTheDocument()
      }

      if (link.getAttribute('target') === '_blank') {
        expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      }
    }
  })

  it('supports the skip path, mobile-menu escape path, and native disclosures', () => {
    const { container } = render(<MemoryRouter><App /></MemoryRouter>)

    const skipLink = screen.getByRole('link', { name: 'Skip to main content' })
    const main = screen.getByRole('main')
    expect(skipLink).toHaveAttribute('href', `#${main.id}`)

    const menuButton = screen.getByRole('button', { name: 'Open menu' })
    fireEvent.click(menuButton)
    expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true')
    expect(within(screen.getByRole('navigation', { name: 'Mobile navigation' })).getByRole('link', { name: 'About' })).toHaveFocus()
    fireEvent.keyDown(screen.getByRole('navigation', { name: 'Mobile navigation' }), { key: 'Escape' })
    expect(menuButton).toHaveFocus()
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')

    container.querySelectorAll('summary').forEach((summary) => {
      expect(summary.tagName).toBe('SUMMARY')
      expect(summary.closest('details')).toBeTruthy()
    })
  })

  it('provides the favicon, theme color, and mirrored social metadata structure', () => {
    const html = readFileSync('index.html', 'utf8')
    const document = new DOMParser().parseFromString(html, 'text/html')
    const description = document.querySelector('meta[name="description"]')?.content

    expect(document.title).toBe("Ro's Family Medicine")
    expect(description).toBeTruthy()
    expect(document.querySelector('link[rel="icon"]')?.getAttribute('href')).toBe(
      '/assets/logos/ros-family-medicine-logo.png',
    )
    expect(document.querySelector('meta[name="theme-color"]')?.getAttribute('content')).toBe('#2b103b')
    expect(document.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe('index, follow')
    expect(document.querySelector('meta[property="og:title"]')?.getAttribute('content')).toBe(document.title)
    expect(document.querySelector('meta[property="og:description"]')?.getAttribute('content')).toBe(description)
    expect(document.querySelector('meta[name="twitter:title"]')?.getAttribute('content')).toBe(document.title)
    expect(document.querySelector('meta[name="twitter:description"]')?.getAttribute('content')).toBe(description)
  })

  it.each([...ROUTE_DEFINITIONS.map(({ path }) => path), '/unknown'])('keeps %s structurally accessible', (path) => {
    const { container } = render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>)
    const ids = [...container.querySelectorAll('[id]')].map((element) => element.id)
    const headings = screen.getAllByRole('heading')
    const levels = headings.map((heading) => Number(heading.tagName.slice(1)))

    expect(new Set(ids).size).toBe(ids.length)
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    levels.slice(1).forEach((level, index) => {
      expect(level - levels[index]).toBeLessThanOrEqual(1)
    })
  })
})
