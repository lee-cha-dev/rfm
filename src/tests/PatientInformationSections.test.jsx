import { fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router'
import ClinicContactSection from '../components/ClinicContactSection.jsx'
import FaqSection from '../components/FaqSection.jsx'
import HoursSection from '../components/HoursSection.jsx'
import { CLINIC_CONFIG } from '../config/clinic.js'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('Sprint 5 patient-information sections', () => {
  it('renders every shared weekly-hours entry and a computed directions destination', () => {
    render(
      <MemoryRouter>
        <HoursSection clinic={CLINIC_CONFIG} userAgent="Mozilla/5.0 (iPhone)" />
      </MemoryRouter>,
    )

    const schedule = screen.getByLabelText('Clinic hours')
    CLINIC_CONFIG.weeklyHours.forEach(({ day, hours }) => {
      const row = within(schedule).getByText(day).parentElement
      expect(row).toHaveTextContent(hours)
    })

    expect(screen.getByRole('link', { name: 'Get directions' })).toHaveAttribute(
      'href',
      "https://maps.apple.com/?daddr=1898%20Hunter's%20Ridge%2C%20Fayetteville%2C%20AR%2072701",
    )
    expect(screen.getByRole('link', { name: 'Contact clinic' })).toHaveAttribute('href', '/#contact')
  })

  it('uses native keyboard-operable disclosure semantics for the home preview', () => {
    render(<MemoryRouter><FaqSection clinic={CLINIC_CONFIG} /></MemoryRouter>)

    CLINIC_CONFIG.faqs.slice(0, 3).forEach(({ question, answer }) => {
      const summary = screen.getByText(question)
      const disclosure = summary.closest('details')

      expect(summary.tagName).toBe('SUMMARY')
      expect(summary.tabIndex).toBe(0)
      expect(disclosure).not.toHaveAttribute('open')
      fireEvent.click(summary)
      expect(disclosure).toHaveAttribute('open')
      expect(within(disclosure).getByText(answer)).toBeInTheDocument()
    })
    expect(screen.queryByText(CLINIC_CONFIG.faqs[3].question)).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'View all patient questions →' })).toHaveAttribute(
      'href',
      '/faq',
    )
  })

  it('shows clinic contact information without a website message form', () => {
    render(<ClinicContactSection clinic={CLINIC_CONFIG} />)

    expect(screen.getByRole('link', { name: CLINIC_CONFIG.contact.phone.display })).toHaveAttribute(
      'href',
      `tel:${CLINIC_CONFIG.contact.phone.href}`,
    )
    expect(screen.getByRole('link', { name: CLINIC_CONFIG.navigation.portal.label })).toHaveAttribute(
      'href',
      CLINIC_CONFIG.navigation.portal.href,
    )
    expect(screen.queryByRole('form')).not.toBeInTheDocument()
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
  })
})
