# JSDoc template

Every exported component, hook, utility, class, and non-trivial function or
method uses this project signature. Describe what the symbol does, why it
exists, and where it is consumed before the signature.

```javascript
/**
 * Performs one focused responsibility for the application.
 * It exists to keep that responsibility encapsulated and is consumed by the
 * owning component or interface.
 *
 * @param {string} value The value being processed.
 * @returns {string} The processed value.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
export function example(value) {
  return value
}
```
