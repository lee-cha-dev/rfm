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
    expect(CLINIC_CONFIG.faqs).toHaveLength(4)
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
