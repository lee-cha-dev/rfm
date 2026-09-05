import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router'
import SiteHeader from '../components/SiteHeader.jsx'
import { CLINIC_CONFIG } from '../config/clinic.js'

describe('SiteHeader', () => {
  it('renders config-driven desktop navigation and the skip link', () => {
    render(<MemoryRouter><SiteHeader clinic={CLINIC_CONFIG} /></MemoryRouter>)

    expect(screen.getByRole('link', { name: 'Skip to main content' })).toHaveAttribute(
      'href',
      '#main-content',
    )
    const desktopNavigation = screen.getByRole('navigation', {
      name: 'Primary navigation',
      hidden: true,
    })
    expect(within(desktopNavigation).queryByRole('link', { name: 'Services' })).not.toBeInTheDocument()
    expect(within(desktopNavigation).queryByRole('link', { name: 'Hours & location' })).not.toBeInTheDocument()
    expect(within(desktopNavigation).queryByRole('link', { name: 'Contact' })).not.toBeInTheDocument()
    expect(within(desktopNavigation).getByRole('link', { name: 'Privacy' })).toHaveAttribute('href', '/privacy')
    const patientPortal = within(desktopNavigation).getByRole('link', { name: 'Patient Portal' })
    expect(patientPortal).toHaveAttribute('href', CLINIC_CONFIG.navigation.portal.href)
    expect(patientPortal).toHaveAttribute('target', '_blank')
    expect(patientPortal).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('opens, focuses, closes on link activation, and reports accurate state', () => {
    render(<MemoryRouter><SiteHeader clinic={CLINIC_CONFIG} /></MemoryRouter>)
    const trigger = screen.getByRole('button', { name: 'Open menu' })

    fireEvent.click(trigger)

    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(trigger).toHaveAccessibleName('Close menu')
    const mobileNavigation = screen.getByRole('navigation', { name: 'Mobile navigation' })
    const aboutLink = within(mobileNavigation).getByRole('link', { name: 'About' })
    expect(aboutLink).toHaveFocus()

    fireEvent.click(aboutLink)
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(trigger).toHaveAccessibleName('Open menu')
    expect(mobileNavigation).toHaveAttribute('hidden')
  })

  it('closes on Escape and returns focus to the trigger', () => {
    render(<MemoryRouter><SiteHeader clinic={CLINIC_CONFIG} /></MemoryRouter>)
    const trigger = screen.getByRole('button', { name: 'Open menu' })
    fireEvent.click(trigger)
    const mobileNavigation = screen.getByRole('navigation', { name: 'Mobile navigation' })

    fireEvent.keyDown(mobileNavigation, { key: 'Escape' })

    expect(trigger).toHaveFocus()
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('closes when browser history changes the active location', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <SiteHeader clinic={CLINIC_CONFIG} />
      </MemoryRouter>,
    )
    const trigger = screen.getByRole('button', { name: 'Open menu' })
    fireEvent.click(trigger)

    fireEvent.click(screen.getByRole('link', { name: "Ro's Family Medicine home" }))

    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(document.getElementById('mobile-navigation')).toHaveAttribute('hidden')
  })

  it('adds a readable surface after the transparent header leaves the hero top', () => {
    const { container } = render(
      <MemoryRouter><SiteHeader clinic={CLINIC_CONFIG} /></MemoryRouter>,
    )
    const header = container.querySelector('header')

    expect(header).not.toHaveClass('site-header--scrolled')

    Object.defineProperty(window, 'scrollY', { configurable: true, value: 24 })
    fireEvent.scroll(window)
    expect(header).toHaveClass('site-header--scrolled')

    Object.defineProperty(window, 'scrollY', { configurable: true, value: 0 })
    fireEvent.scroll(window)
    expect(header).not.toHaveClass('site-header--scrolled')
  })
})
