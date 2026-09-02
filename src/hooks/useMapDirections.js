import { useMemo } from 'react'
import { createMapDirectionsUrl } from '../utils/mapDirections.js'

/**
 * Resolves the configured clinic destination for the current browser platform.
 *
 * @param {string} destination The configured map destination.
 * @param {string} [userAgent] An optional deterministic user-agent override.
 * @returns {string} The platform-aware directions URL.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
export function useMapDirections(destination, userAgent) {
  const resolvedUserAgent = userAgent ?? globalThis.navigator?.userAgent ?? ''

  return useMemo(
    () => createMapDirectionsUrl(destination, resolvedUserAgent),
    [destination, resolvedUserAgent],
  )
}
