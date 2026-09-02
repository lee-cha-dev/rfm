import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { ASSETS } from '../config/assets.js'

describe('asset manifest', () => {
  it('references all seven copied web assets from the public directory', () => {
    const assets = [...Object.values(ASSETS.logos), ...Object.values(ASSETS.photos)]

    expect(assets).toHaveLength(7)

    for (const asset of assets) {
      expect(asset.src).toMatch(/^\/assets\/(logos|photos)\//)
      expect(asset.width).toBeGreaterThan(0)
      expect(asset.height).toBeGreaterThan(0)
      expect(existsSync(resolve('public', asset.src.slice(1)))).toBe(true)
    }
  })
})
