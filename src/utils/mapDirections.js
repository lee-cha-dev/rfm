/**
 * Identifies Apple mobile user agents supported by the POC's native-map path.
 *
 * @param {unknown} userAgent The browser user-agent string.
 * @returns {boolean} Whether Apple Maps should be preferred.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
export function isAppleMobileUserAgent(userAgent) {
  return typeof userAgent === 'string' && /iPad|iPhone|iPod/i.test(userAgent)
}

/**
 * Creates a platform-aware directions link from the configured destination.
 * Google Maps is the general path and Apple Maps is used for Apple mobile UAs.
 *
 * @param {unknown} destination The configured map destination.
 * @param {unknown} userAgent The browser user-agent string.
 * @returns {string} A fully encoded directions URL.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
export function createMapDirectionsUrl(destination, userAgent = '') {
  const encodedDestination = encodeURIComponent(
    typeof destination === 'string' ? destination.trim() : '',
  )

  return isAppleMobileUserAgent(userAgent)
    ? `https://maps.apple.com/?daddr=${encodedDestination}`
    : `https://www.google.com/maps/dir/?api=1&destination=${encodedDestination}`
}
