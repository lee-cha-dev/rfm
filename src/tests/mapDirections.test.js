import { describe, expect, it } from 'vitest'
import { createMapDirectionsUrl, isAppleMobileUserAgent } from '../utils/mapDirections.js'

describe('map-directions utilities', () => {
  const destination = '18 Chesapeake Drive, Austin, AR 72007'
  const encoded = '18%20Chesapeake%20Drive%2C%20Austin%2C%20AR%2072007'

  it.each(['iPhone', 'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X)', 'iPod touch'])(
    'recognizes supported Apple mobile agent %s',
    (userAgent) => expect(isAppleMobileUserAgent(userAgent)).toBe(true),
  )

  it('uses Apple Maps on supported Apple mobile browsers', () => {
    expect(createMapDirectionsUrl(destination, 'Mozilla/5.0 (iPhone)')).toBe(
      `https://maps.apple.com/?daddr=${encoded}`,
    )
  })

  it.each(['Mozilla/5.0 (Macintosh)', 'Mozilla/5.0 (Android)', '', undefined])(
    'uses Google Maps for the general user-agent path',
    (userAgent) => {
      expect(createMapDirectionsUrl(destination, userAgent)).toBe(
        `https://www.google.com/maps/dir/?api=1&destination=${encoded}`,
      )
    },
  )
})
