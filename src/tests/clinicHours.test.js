import { describe, expect, it } from 'vitest'
import { getClinicStatus, isClinicOpen, parse12HourTime } from '../utils/clinicHours.js'

describe('clinic-hours utilities', () => {
  it('parses valid 12-hour times including midnight and noon', () => {
    expect(parse12HourTime('12:00 AM')).toBe(0)
    expect(parse12HourTime('8:05 am')).toBe(485)
    expect(parse12HourTime('12:00 PM')).toBe(720)
    expect(parse12HourTime('5:30 PM')).toBe(1050)
  })

  it.each([
    undefined,
    '',
    '0:00 AM',
    '13:00 PM',
    '8:60 AM',
    '08 AM',
    'noon',
  ])('rejects invalid clock value %s', (value) => {
    expect(parse12HourTime(value)).toBeNull()
  })

  it('uses an inclusive opening and exclusive closing boundary', () => {
    const atOpening = new Date(2026, 8, 7, 8, 0)
    const beforeClosing = new Date(2026, 8, 7, 16, 59)
    const atClosing = new Date(2026, 8, 7, 17, 0)

    expect(isClinicOpen('8:00 AM - 5:00 PM', atOpening)).toBe(true)
    expect(isClinicOpen('8:00 AM - 5:00 PM', beforeClosing)).toBe(true)
    expect(isClinicOpen('8:00 AM - 5:00 PM', atClosing)).toBe(false)
  })

  it.each([undefined, '', 'Closed', 'Call for hours', 'bad range', '5:00 PM - 8:00 AM'])(
    'treats missing, closed, or invalid hours as closed: %s',
    (hours) => {
      expect(isClinicOpen(hours, new Date(2026, 8, 7, 10, 0))).toBe(false)
    },
  )

  it('resolves configured weekdays and safely falls back when a day is missing', () => {
    const schedule = [
      { dayIndex: 0, day: 'Sunday', hours: 'Closed' },
      { dayIndex: 1, day: 'Monday', hours: '8:00 AM - 5:00 PM' },
    ]

    expect(getClinicStatus(schedule, new Date(2026, 8, 7, 8, 0))).toEqual({
      day: 'Monday',
      hours: '8:00 AM - 5:00 PM',
      isOpen: true,
      status: 'Currently Open',
    })
    expect(getClinicStatus(schedule, new Date(2026, 8, 8, 10, 0))).toEqual({
      day: 'Tuesday',
      hours: 'Call for hours',
      isOpen: false,
      status: 'Currently Closed',
    })
  })
})
