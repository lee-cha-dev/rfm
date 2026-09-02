import { describe, expect, it, vi } from 'vitest'
import {
  CLINIC_CONFIG,
  VERIFICATION_FIELDS,
  createClinicConfig,
  isClinicContentConfirmed,
  validateClinicConfig,
} from '../config/clinic.js'

describe('clinic configuration', () => {
  it('centralizes the complete POC content contract as immutable data', () => {
    expect(CLINIC_CONFIG.navigation.primary).toHaveLength(3)
    expect(CLINIC_CONFIG.navigation.footer).toHaveLength(4)
    expect(CLINIC_CONFIG.weeklyHours).toHaveLength(7)
    expect(CLINIC_CONFIG.homeSections.about.photos).toHaveLength(2)
    expect(CLINIC_CONFIG.services).toHaveLength(3)
    expect(CLINIC_CONFIG.services.flatMap((group) => group.items)).toHaveLength(9)
    expect(CLINIC_CONFIG.insuranceCarriers).toHaveLength(8)
    expect(CLINIC_CONFIG.faqs).toHaveLength(6)
    expect(CLINIC_CONFIG.assets.logos.header.src).toMatch(/^\/assets\/logos\//)
    expect(CLINIC_CONFIG.navigation.portal).toMatchObject({
      href: 'https://www.tebra.com/',
      external: true,
    })
    expect(Object.isFrozen(CLINIC_CONFIG)).toBe(true)
    expect(Object.isFrozen(CLINIC_CONFIG.services[0].items)).toBe(true)
    expect(validateClinicConfig(CLINIC_CONFIG)).toEqual([])
    expect(Object.keys(CLINIC_CONFIG.verification.fields)).toEqual(VERIFICATION_FIELDS)
    VERIFICATION_FIELDS.forEach((field) => {
      expect(isClinicContentConfirmed(CLINIC_CONFIG, field)).toBe(false)
    })
  })

  it('preserves the wording and facts excluded from the Sprint 11 copy pass', () => {
    expect(CLINIC_CONFIG.brand.tagline).toEqual([
      'Your Health.',
      'Your Story.',
      'Our Focus.',
    ])
    expect(CLINIC_CONFIG.homeSections.insurance).toEqual({
      eyebrow: 'Insurances Accepted',
      heading: 'We take most major insurance carriers.',
      lede: "Don't see yours? Call the office and we'll verify your coverage before you book.",
      matrixLabel: 'Accepted Insurances',
      matrixNote: 'Coverage varies by plan',
    })
    expect(CLINIC_CONFIG.insuranceCarriers).toEqual([
      'Aetna',
      'Cigna',
      'Humana',
      'Medicare',
      'Medicaid',
      'Centene Plans',
      'UnitedHealthcare',
      'Blue Cross Blue Shield',
    ])
    expect(CLINIC_CONFIG.services).toEqual([
      {
        id: 'preventive-care',
        label: 'Preventive care',
        items: [
          'Annual physicals & wellness visits',
          'Immunizations & vaccines',
          'Preventive screenings & lab work',
        ],
      },
      {
        id: 'everyday-care',
        label: 'Everyday care',
        items: [
          'Sick visits & minor injuries',
          'Chronic condition management',
          'School, sports, work, and DOT physicals',
        ],
      },
      {
        id: 'family-care',
        label: 'Family care',
        items: ["Women’s health", "Men’s health", 'Pediatric & adolescent care'],
      },
    ])
    expect(CLINIC_CONFIG.homeSections.hours).toMatchObject({
      eyebrow: 'Hours & location',
      scheduleLabel: 'Clinic hours',
      scheduleNote: 'Hours are subject to change.',
      directionsLabel: 'Get directions',
      contactLabel: 'Contact clinic',
    })
    expect(CLINIC_CONFIG.weeklyHours).toEqual([
      { dayIndex: 0, day: 'Sunday', hours: 'Closed' },
      { dayIndex: 1, day: 'Monday', hours: '8:00 AM - 5:00 PM' },
      { dayIndex: 2, day: 'Tuesday', hours: '8:00 AM - 5:00 PM' },
      { dayIndex: 3, day: 'Wednesday', hours: '8:00 AM - 5:00 PM' },
      { dayIndex: 4, day: 'Thursday', hours: '8:00 AM - 5:00 PM' },
      { dayIndex: 5, day: 'Friday', hours: '8:00 AM - 5:00 PM' },
      { dayIndex: 6, day: 'Saturday', hours: 'Closed' },
    ])
    expect(CLINIC_CONFIG.contact.address).toEqual({
      display: "1898 Hunter's Ridge, Fayetteville, AR 72701",
      mapsQuery: "1898 Hunter's Ridge, Fayetteville, AR 72701",
    })
    expect(CLINIC_CONFIG.homeSections.about.link.label).toBe('Meet the practice →')
    expect(CLINIC_CONFIG.homeSections.faq.link.label).toBe('View all patient questions →')
    expect(CLINIC_CONFIG.homeSections.contact.submitLabel).toBe('Send message')
  })

  it('reports malformed fields and returns safe defaults with a development warning', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const invalidConfig = { contact: { phone: { href: 'not-a-phone' } } }

    expect(validateClinicConfig(invalidConfig)).toContain('brand.name must be non-empty text')

    const config = createClinicConfig(invalidConfig, { warn: true })
    expect(config.brand.name).toBe("Ro's Family Medicine")
    expect(config.contact.phone.href).toBe('+14795550142')
    expect(Object.isFrozen(config)).toBe(true)
    expect(warn).toHaveBeenCalledOnce()

    warn.mockRestore()
  })
})
