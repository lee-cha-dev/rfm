import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import QuickInformation from '../components/QuickInformation.jsx'
import { CLINIC_CONFIG } from '../config/clinic.js'

describe('QuickInformation', () => {
  it('renders deterministic hours and contact links from clinic configuration', () => {
    const phoneName = new RegExp(
      CLINIC_CONFIG.contact.phone.display.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
      'i',
    )

    render(
      <MemoryRouter>
        <QuickInformation
          clinic={CLINIC_CONFIG}
          now={new Date(2026, 8, 7, 8, 0)}
          userAgent="Mozilla/5.0 (iPhone)"
        />
      </MemoryRouter>,
    )

    expect(screen.getByText('Monday · 8:00 AM - 5:00 PM')).toBeInTheDocument()
    expect(screen.getByText('Currently Open')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: phoneName })).toHaveAttribute(
      'href',
      `tel:${CLINIC_CONFIG.contact.phone.href}`,
    )
    expect(screen.getByRole('link', { name: /1898 Hunter's Ridge,/i })).toHaveAttribute(
      'href',
      "https://maps.apple.com/?daddr=1898%20Hunter's%20Ridge%2C%20Fayetteville%2C%20AR%2072701",
    )
  })
})
