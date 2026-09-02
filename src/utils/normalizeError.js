import { ERROR_CODES } from './errorCodes.js'

/**
 * Reads one candidate error-code property without trusting arbitrary input.
 * Error display normalization uses it so malformed objects and throwing
 * accessors cannot escape the patient-safe default message.
 *
 * @param {unknown} value The possible error-like input.
 * @param {'status'|'statusCode'|'code'} property The supported property name.
 * @returns {unknown} The property value or undefined when it is unsafe.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
function readErrorProperty(value, property) {
  try {
    return value
      && typeof value === 'object'
      && Object.prototype.hasOwnProperty.call(value, property)
      ? value[property]
      : undefined
  } catch {
    return undefined
  }
}

/**
 * Identifies a numeric code only when the project catalog explicitly supports
 * it. The public normalizer uses this check to reject symbolic, fractional,
 * inherited, and otherwise unknown values.
 *
 * @param {unknown} value The candidate numeric code.
 * @returns {value is number} Whether the catalog owns the integer code.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
function isSupportedErrorCode(value) {
  return Number.isSafeInteger(value)
    && Object.prototype.hasOwnProperty.call(ERROR_CODES, value)
}

/**
 * Resolves supported status, statusCode, or numeric code values to the
 * authoritative patient-safe catalog entry. Error interfaces and the root
 * boundary consume this utility so unknown failures never expose raw details.
 *
 * @param {unknown} error The status number or error-like value to normalize.
 * @returns {Readonly<{title: string, message: string}>} Safe display data.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
export function resolveErrorDisplay(error) {
  const candidates = [
    error,
    readErrorProperty(error, 'status'),
    readErrorProperty(error, 'statusCode'),
    readErrorProperty(error, 'code'),
  ]
  const supportedCode = candidates.find(isSupportedErrorCode)

  return supportedCode === undefined ? ERROR_CODES.default : ERROR_CODES[supportedCode]
}
