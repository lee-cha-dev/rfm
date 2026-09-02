import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import AboutSection from '../components/AboutSection.jsx'
import InsuranceSection from '../components/InsuranceSection.jsx'
import ServicesSection from '../components/ServicesSection.jsx'
import { CLINIC_CONFIG } from '../config/clinic.js'

describe('Sprint 4 core sections', () => {
  it('renders the configured practice story and reserves both image dimensions', () => {
    render(<AboutSection clinic={CLINIC_CONFIG} />)

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Care begins with knowing who walked through the door.',
      }),
    ).toBeInTheDocument()
    const clinicFront = screen.getByRole('img', { name: 'Exterior view of the clinic entrance' })
    expect(clinicFront).toHaveAttribute('src', '/assets/photos/clinic-front.jpg')
    expect(clinicFront).toHaveAttribute('width', '800')
    expect(clinicFront).toHaveAttribute('height', '588')

    const waitingRoom = screen.getByRole('img', { name: 'Warm seating area inside the clinic' })
    expect(waitingRoom).toHaveAttribute('src', '/assets/photos/clinic-waiting-room.jpg')
    expect(waitingRoom).toHaveAttribute('width', '1800')
    expect(waitingRoom).toHaveAttribute('height', '1201')
    expect(screen.getByRole('link', { name: 'Meet the practice →' })).toHaveAttribute('href', '#')
  })

  it('renders service groups and their items from configuration with nested list semantics', () => {
    const clinic = {
      ...CLINIC_CONFIG,
      services: [{ id: 'custom-care', label: 'Custom care', items: ['First service', 'Second service'] }],
    }

    render(<ServicesSection clinic={clinic} />)

    const section = screen.getByRole('region', { name: 'Care for real life.' })
    expect(within(section).getByRole('heading', { level: 3, name: 'Custom care' })).toBeInTheDocument()
    const serviceList = within(section).getByRole('list', { name: 'Custom care services' })
    expect(within(serviceList).getAllByRole('listitem')).toHaveLength(2)
    expect(serviceList).toHaveTextContent('First service')
    expect(serviceList).toHaveTextContent('Second service')
  })

  it('renders only the carrier names supplied by configuration', () => {
    const clinic = { ...CLINIC_CONFIG, insuranceCarriers: ['Plan Alpha', 'Plan Beta'] }

    render(<InsuranceSection clinic={clinic} />)

    const carrierList = screen.getByRole('list', { name: 'Accepted insurance plans' })
    expect(within(carrierList).getAllByRole('listitem')).toHaveLength(2)
    expect(carrierList).toHaveTextContent('Plan Alpha')
    expect(carrierList).toHaveTextContent('Plan Beta')
    expect(carrierList).not.toHaveTextContent('Aetna')
  })
})
