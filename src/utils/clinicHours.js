/**
 * Converts a 12-hour clock value into minutes after midnight.
 *
 * @param {unknown} value A value such as "8:00 AM".
 * @returns {number|null} Minutes after midnight, or null for invalid input.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
export function parse12HourTime(value) {
  if (typeof value !== 'string') return null

  const match = value.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
  if (!match) return null

  const rawHour = Number(match[1])
  const minute = Number(match[2])
  if (rawHour < 1 || rawHour > 12 || minute < 0 || minute > 59) return null

  const normalizedHour = rawHour % 12 + (match[3].toUpperCase() === 'PM' ? 12 : 0)
  return normalizedHour * 60 + minute
}

/**
 * Determines whether a date falls inside a display-hours range. Opening is
 * inclusive and closing is exclusive, matching the approved POC behavior.
 *
 * @param {unknown} hoursText A display range or closed-day label.
 * @param {Date} date The local date and time to evaluate.
 * @returns {boolean} Whether the clinic is open at the supplied time.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
export function isClinicOpen(hoursText, date) {
  if (typeof hoursText !== 'string' || !(date instanceof Date) || Number.isNaN(date.getTime())) {
    return false
  }

  const normalizedHours = hoursText.trim()
  if (!normalizedHours || /^(closed|call for hours)$/i.test(normalizedHours)) return false

  const parts = normalizedHours.split(/\s*[—–-]\s*/)
  if (parts.length !== 2) return false

  const opensAt = parse12HourTime(parts[0])
  const closesAt = parse12HourTime(parts[1])
  if (opensAt === null || closesAt === null || closesAt <= opensAt) return false

  const currentMinutes = date.getHours() * 60 + date.getMinutes()
  return currentMinutes >= opensAt && currentMinutes < closesAt
}

/**
 * Resolves today's configured hours and open/closed label using the browser's
 * local weekday and clock.
 *
 * @param {readonly object[]} weeklyHours Ordered or keyed clinic hours.
 * @param {Date} date The local date and time to evaluate.
 * @returns {{day: string, hours: string, isOpen: boolean, status: string}} Display-ready status.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
export function getClinicStatus(weeklyHours, date) {
  const safeDate = date instanceof Date && !Number.isNaN(date.getTime())
    ? date
    : new Date(1970, 0, 4, 12)
  const dayIndex = safeDate.getDay()
  const entry = Array.isArray(weeklyHours)
    ? weeklyHours.find((candidate) => candidate?.dayIndex === dayIndex)
    : undefined
  const fallbackDay = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(safeDate)
  const day = typeof entry?.day === 'string' && entry.day.trim() ? entry.day : fallbackDay
  const hours = typeof entry?.hours === 'string' && entry.hours.trim()
    ? entry.hours
    : 'Call for hours'
  const isOpen = isClinicOpen(hours, safeDate)

  return {
    day,
    hours,
    isOpen,
    status: isOpen ? 'Currently Open' : 'Currently Closed',
  }
}
