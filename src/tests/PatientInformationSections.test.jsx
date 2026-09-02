import { fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router'
import ContactSection from '../components/ContactSection.jsx'
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

  it('labels contact fields, exposes input hints, and uses configured reason options', () => {
    render(<ContactSection clinic={CLINIC_CONFIG} />)

    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveAttribute('autocomplete', 'name')
    expect(screen.getByRole('textbox', { name: 'Phone' })).toHaveAttribute('inputmode', 'tel')
    expect(screen.getByRole('textbox', { name: 'Phone' })).toHaveAttribute('autocomplete', 'tel')
    expect(screen.getByRole('textbox', { name: 'Email' })).toHaveAttribute('inputmode', 'email')
    expect(screen.getByRole('textbox', { name: 'Email' })).toHaveAttribute('autocomplete', 'email')
    expect(screen.getByRole('textbox', { name: 'Message' })).toHaveAttribute('autocomplete', 'off')

    const reason = screen.getByRole('combobox', { name: 'Reason for contact' })
    expect(within(reason).getAllByRole('option').map((option) => option.textContent)).toEqual(
      CLINIC_CONFIG.contactReasons,
    )
    expect(screen.getByText(CLINIC_CONFIG.homeSections.contact.privacyWarning)).toBeInTheDocument()
    expect(screen.getByText(/not a secure patient-messaging channel/i)).toBeInTheDocument()
  })

  it('validates locally, focuses the first invalid field, and never attempts delivery', () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response())
    render(<ContactSection clinic={CLINIC_CONFIG} />)

    const form = screen.getByRole('form', { name: 'Contact clinic' })
    fireEvent.submit(form)

    expect(screen.getAllByRole('alert')).toHaveLength(4)
    expect(screen.getByRole('status')).toHaveTextContent('Nothing was sent')
    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveFocus()

    fireEvent.change(screen.getByRole('textbox', { name: 'Name' }), { target: { value: 'Lee Charles' } })
    fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), { target: { value: 'lee@example.com' } })
    fireEvent.change(screen.getByRole('textbox', { name: 'Message' }), { target: { value: 'Please call me about becoming a patient.' } })
    fireEvent.submit(form)

    expect(screen.queryAllByRole('alert')).toHaveLength(0)
    expect(screen.getByRole('status')).toHaveTextContent('nothing was sent or saved')
    expect(fetchSpy).not.toHaveBeenCalled()
  })
})
