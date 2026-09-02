import { useEffect, useMemo, useState } from 'react'
import { getClinicStatus } from '../utils/clinicHours.js'

/**
 * Keeps the quick-information clinic status current while allowing callers to
 * inject a fixed date for deterministic tests and non-live rendering.
 *
 * @param {readonly object[]} weeklyHours The configured seven-day schedule.
 * @param {Date} [now] An optional fixed local date and time.
 * @returns {{day: string, hours: string, isOpen: boolean, status: string}} Current clinic status.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
export function useClinicHours(weeklyHours, now) {
  const [liveNow, setLiveNow] = useState(() => new Date())

  useEffect(() => {
    if (now) return undefined

    const timer = window.setInterval(() => setLiveNow(new Date()), 60_000)
    return () => window.clearInterval(timer)
  }, [now])

  return useMemo(
    () => getClinicStatus(weeklyHours, now ?? liveNow),
    [weeklyHours, now, liveNow],
  )
}
