import { describe, expect, it } from 'vitest'
import { ERROR_CODES } from '../utils/errorCodes.js'
import { resolveErrorDisplay } from '../utils/normalizeError.js'

describe('resolveErrorDisplay', () => {
  it('resolves supported direct and error-object numeric codes', () => {
    expect(resolveErrorDisplay(404)).toBe(ERROR_CODES[404])
    expect(resolveErrorDisplay({ status: 403 })).toBe(ERROR_CODES[403])
    expect(resolveErrorDisplay({ statusCode: 503 })).toBe(ERROR_CODES[503])
    expect(resolveErrorDisplay({ code: 429 })).toBe(ERROR_CODES[429])
  })

  it('uses the safe default for unknown, symbolic, and unsafe inputs', () => {
    expect(resolveErrorDisplay(599)).toBe(ERROR_CODES.default)
    expect(resolveErrorDisplay({ code: 'ECONNRESET' })).toBe(ERROR_CODES.default)
    expect(resolveErrorDisplay({ status: '404' })).toBe(ERROR_CODES.default)
    expect(resolveErrorDisplay(Object.create({ status: 404 }))).toBe(ERROR_CODES.default)
    expect(resolveErrorDisplay(new Error('private diagnostic detail'))).toBe(ERROR_CODES.default)
    expect(resolveErrorDisplay(null)).toBe(ERROR_CODES.default)
  })

  it('uses the safe default when an error accessor throws', () => {
    const unsafe = Object.defineProperty({}, 'status', {
      get() {
        throw new Error('unsafe accessor')
      },
    })

    expect(resolveErrorDisplay(unsafe)).toBe(ERROR_CODES.default)
  })
})
