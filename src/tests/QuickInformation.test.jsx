import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import QuickInformation from '../components/QuickInformation.jsx'
import { CLINIC_CONFIG } from '../config/clinic.js'

describe('QuickInformation', () => {
  it('renders deterministic hours and contact links from clinic configuration', () => {
    render(
      <QuickInformation
        clinic={CLINIC_CONFIG}
        now={new Date(2026, 8, 7, 8, 0)}
        userAgent="Mozilla/5.0 (iPhone)"
      />,
    )

    expect(screen.getByText('Monday · 8:00 AM — 5:00 PM')).toBeInTheDocument()
    expect(screen.getByText('Currently Open')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /\(479\) 555-0142/i })).toHaveAttribute(
      'href',
      `tel:${CLINIC_CONFIG.contact.phone.href}`,
    )
    expect(screen.getByRole('link', { name: /18 Chesapeake Drive/i })).toHaveAttribute(
      'href',
      'https://maps.apple.com/?daddr=18%20Chesapeake%20Drive%2C%20Austin%2C%20AR%2072007',
    )
  })
})
