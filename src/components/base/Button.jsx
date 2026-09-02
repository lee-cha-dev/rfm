import './Button.css'

/**
 * Renders a native button for form and locally controlled interface actions.
 * Its variants mirror the primary, ghost, and menu controls present in the POC.
 *
 * @param {object} props The button properties.
 * @param {import('react').ReactNode} props.children The button content.
 * @param {'primary'|'ghost'|'menu'} [props.variant] The visual treatment.
 * @param {'button'|'submit'|'reset'} [props.type] The native button behavior.
 * @param {() => void} [props.onClick] The local action callback.
 * @param {boolean} [props.disabled] Whether interaction is unavailable.
 * @param {string} [props.ariaLabel] An accessible name for icon-only controls.
 * @param {boolean} [props.ariaExpanded] A controlled-region state.
 * @param {string} [props.ariaControls] The controlled region identifier.
 * @param {(event: import('react').KeyboardEvent<HTMLButtonElement>) => void} [props.onKeyDown] A keyboard handler.
 * @param {import('react').Ref<HTMLButtonElement>} [props.elementRef] An optional native-button ref.
 * @param {string} [props.className] An optional composition class.
 * @returns {import('react').JSX.Element} A native button.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
function Button({
  children,
  variant = 'primary',
  type = 'button',
  onClick,
  disabled = false,
  ariaLabel,
  ariaExpanded,
  ariaControls,
  onKeyDown,
  elementRef,
  className = '',
}) {
  const supportedVariants = ['primary', 'ghost', 'menu']
  const safeVariant = supportedVariants.includes(variant) ? variant : 'primary'
  const classes = ['button', `button--${safeVariant}`, className].filter(Boolean).join(' ')

  return (
    <button
      ref={elementRef}
      className={classes}
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      onKeyDown={onKeyDown}
    >
      {children}
    </button>
  )
}

export default Button
