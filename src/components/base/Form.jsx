import './Form.css'

/**
 * Renders a native form around base-owned fields and actions.
 * Submission behavior is supplied by the owning contact feature so this
 * primitive remains stateless and reusable on the later contact route.
 *
 * @param {object} props The form properties.
 * @param {import('react').ReactNode} props.children The form fields and actions.
 * @param {(event: import('react').FormEvent<HTMLFormElement>) => void} [props.onSubmit] The submit callback.
 * @param {string} [props.ariaLabel] An accessible name when no visible heading labels the form.
 * @param {boolean} [props.noValidate] Whether feature-owned validation replaces browser messages.
 * @param {string} [props.className] An optional composition class.
 * @returns {import('react').JSX.Element} A native form.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
export function Form({ children, onSubmit, ariaLabel, noValidate = false, className = '' }) {
  const classes = ['form', className].filter(Boolean).join(' ')

  return <form className={classes} onSubmit={onSubmit} aria-label={ariaLabel} noValidate={noValidate}>{children}</form>
}

/**
 * Renders one labeled text, telephone, email, select, or textarea control.
 * Pairing label and control in one primitive guarantees an accessible name and
 * prevents duplicated native form markup in contact features.
 *
 * @param {object} props The field properties.
 * @param {string} props.id The label/control association identifier.
 * @param {string} props.label The visible accessible label.
 * @param {string} [props.name] The submitted field name.
 * @param {'text'|'tel'|'email'|'select'|'textarea'} [props.control] The control kind.
 * @param {readonly (string|{value: string, label: string})[]} [props.options] Select choices.
 * @param {string} [props.autoComplete] The browser autocomplete token.
 * @param {boolean} [props.required] Whether a value is required.
 * @param {string} [props.hint] Optional descriptive guidance.
 * @param {string} [props.value] A controlled field value.
 * @param {(event: import('react').ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) => void} [props.onChange] A controlled value callback.
 * @param {string} [props.error] A validation message.
 * @param {string} [props.className] An optional composition class.
 * @returns {import('react').JSX.Element} A labeled native form control.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
export function FormField({
  id,
  label,
  name = id,
  control = 'text',
  options = [],
  autoComplete,
  required = false,
  hint,
  value,
  onChange,
  error,
  className = '',
}) {
  const supportedControls = ['text', 'tel', 'email', 'select', 'textarea']
  const safeControl = supportedControls.includes(control) ? control : 'text'
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined
  const classes = ['form__field', className].filter(Boolean).join(' ')
  let controlElement

  if (safeControl === 'select') {
    controlElement = (
      <select
        id={id}
        name={name}
        required={required}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        aria-describedby={describedBy}
        aria-invalid={error ? 'true' : undefined}
      >
        {options.map((option) => {
          const value = typeof option === 'string' ? option : option.value
          const optionLabel = typeof option === 'string' ? option : option.label
          return <option key={value} value={value}>{optionLabel}</option>
        })}
      </select>
    )
  } else if (safeControl === 'textarea') {
    controlElement = (
      <textarea
        id={id}
        name={name}
        required={required}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        aria-describedby={describedBy}
        aria-invalid={error ? 'true' : undefined}
      />
    )
  } else {
    controlElement = (
      <input
        id={id}
        name={name}
        type={safeControl}
        inputMode={safeControl === 'tel' || safeControl === 'email' ? safeControl : undefined}
        autoComplete={autoComplete}
        required={required}
        value={value}
        onChange={onChange}
        aria-describedby={describedBy}
        aria-invalid={error ? 'true' : undefined}
      />
    )
  }

  return (
    <div className={classes}>
      <label htmlFor={id}>{label}</label>
      {controlElement}
      {hint ? <span className="form__hint" id={hintId}>{hint}</span> : null}
      {error ? <span className="form__error" id={errorId} role="alert">{error}</span> : null}
    </div>
  )
}
