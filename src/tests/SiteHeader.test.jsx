import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import SiteHeader from '../components/SiteHeader.jsx'
import { CLINIC_CONFIG } from '../config/clinic.js'

describe('SiteHeader', () => {
  it('renders config-driven desktop navigation and the skip link', () => {
    render(<SiteHeader clinic={CLINIC_CONFIG} />)

    expect(screen.getByRole('link', { name: 'Skip to main content' })).toHaveAttribute(
      'href',
      '#main-content',
    )
    const desktopNavigation = screen.getByRole('navigation', {
      name: 'Primary navigation',
      hidden: true,
    })
    expect(within(desktopNavigation).getByRole('link', { name: 'Hours & location' })).toHaveAttribute(
      'href',
      '#hours',
    )
    const patientPortal = within(desktopNavigation).getByRole('link', { name: 'Patient Portal' })
    expect(patientPortal).toHaveAttribute('href', 'https://www.tebra.com/')
    expect(patientPortal).toHaveAttribute('target', '_blank')
    expect(patientPortal).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('opens, focuses, closes on link activation, and reports accurate state', () => {
    render(<SiteHeader clinic={CLINIC_CONFIG} />)
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
    render(<SiteHeader clinic={CLINIC_CONFIG} />)
    const trigger = screen.getByRole('button', { name: 'Open menu' })
    fireEvent.click(trigger)
    const mobileNavigation = screen.getByRole('navigation', { name: 'Mobile navigation' })

    fireEvent.keyDown(mobileNavigation, { key: 'Escape' })

    expect(trigger).toHaveFocus()
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('adds a readable surface after the transparent header leaves the hero top', () => {
    const { container } = render(<SiteHeader clinic={CLINIC_CONFIG} />)
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
