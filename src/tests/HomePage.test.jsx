import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import HomePage from '../interfaces/HomePage.jsx'

describe('HomePage', () => {
  it('renders the complete POC section order and both brand logo variants', () => {
    const { container } = render(<HomePage />)

    expect(
      screen.getByRole('heading', { level: 1, name: 'Your care should feel personal.' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content')
    expect(screen.getByRole('main')).toHaveAttribute('tabindex', '-1')
    const brandImages = screen.getAllByRole('img', { name: "Ro's Family Medicine" })
    expect(brandImages).toHaveLength(2)
    expect(brandImages[0]).toHaveAttribute(
      'src',
      '/assets/logos/ros-family-medicine-logo-header.png',
    )
    expect(brandImages[1]).toHaveAttribute(
      'src',
      '/assets/logos/ros-family-medicine-logo.png',
    )
    expect(screen.getByRole('region', { name: 'Quick clinic information' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Care for real life.' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'We take most major insurance carriers.' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Come see us.' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Questions should be easy to answer.' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Need to reach the clinic?' })).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    expect(
      [...container.querySelectorAll('main > section')].map((section) => (
        section.id || section.getAttribute('aria-label') || section.getAttribute('aria-labelledby')
      )),
    ).toEqual([
      'top',
      'Quick clinic information',
      'about',
      'services',
      'insurance-heading',
      'hours',
      'faq',
      'contact',
    ])
    expect(screen.getByRole('link', { name: 'Skip to main content' })).toHaveAttribute(
      'href',
      '#main-content',
    )

    const portalLinks = screen.getAllByRole('link', { name: 'Patient Portal', hidden: true })
    expect(portalLinks).toHaveLength(5)
    portalLinks.forEach((portal) => {
      expect(portal).toHaveAttribute('href', 'https://www.tebra.com/')
      expect(portal).toHaveAttribute('target', '_blank')
      expect(portal).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  it('keeps primary and footer navigation synchronized with live page targets', () => {
    const { container } = render(<HomePage />)
    const primaryNavigation = screen.getByRole('navigation', { name: 'Primary navigation' })
    const footerNavigation = screen.getByRole('navigation', { name: 'Footer navigation' })
    const primaryLinks = within(primaryNavigation).getAllByRole('link')
    const footerLinks = within(footerNavigation).getAllByRole('link')

    expect(primaryLinks.map((link) => link.textContent)).toEqual([
      'About',
      'Services',
      'Hours & location',
      'FAQ',
      'Contact',
      'Patient Portal',
    ])
    expect(footerLinks.map((link) => link.textContent)).toEqual(
      primaryLinks.map((link) => link.textContent),
    )

    for (const link of [...primaryLinks, ...footerLinks]) {
      const href = link.getAttribute('href')

      if (href.startsWith('#')) {
        expect(container.querySelector(href)).toBeInTheDocument()
      }
    }

    expect(screen.getAllByRole('link', { name: /\(479\) 555-0142/i })).not.toHaveLength(0)
    const directionsLinks = screen.getAllByText('Get directions').map((label) => label.closest('a'))
    expect(directionsLinks).toHaveLength(2)
    directionsLinks.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  it('does not retain Vite starter presentation', () => {
    render(<HomePage />)

    expect(screen.queryByText('Vite + React')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /count is/i })).not.toBeInTheDocument()
  })
})
