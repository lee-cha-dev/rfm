import { describe, expect, it } from 'vitest'
import { createMapDirectionsUrl, isAppleMobileUserAgent } from '../utils/mapDirections.js'

describe('map-directions utilities', () => {
  const destination = "1898 Hunter's Ridge, Fayetteville, AR 72701"
  const encoded = "1898%20Hunter's%20Ridge%2C%20Fayetteville%2C%20AR%2072701"

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
