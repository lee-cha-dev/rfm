import './Navigation.css'

/**
 * Renders a labeled navigation landmark around supplied base links.
 * Desktop, mobile, and footer navigation share this semantic owner while
 * retaining their limited POC layout variants.
 *
 * @param {object} props The navigation properties.
 * @param {import('react').ReactNode} props.children The navigation links.
 * @param {string} props.ariaLabel The landmark's accessible name.
 * @param {'inline'|'panel'|'footer'} [props.variant] The established layout.
 * @param {string} [props.id] An optional controlled-region identifier.
 * @param {string} [props.className] An optional composition class.
 * @param {boolean} [props.hidden] Whether this controlled navigation is hidden.
 * @param {(event: import('react').KeyboardEvent<HTMLElement>) => void} [props.onKeyDown] A keyboard handler.
 * @returns {import('react').JSX.Element} A navigation landmark.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
function Navigation({
  children,
  ariaLabel,
  variant = 'inline',
  id,
  className = '',
  hidden,
  onKeyDown,
}) {
  const supportedVariants = ['inline', 'panel', 'footer']
  const safeVariant = supportedVariants.includes(variant) ? variant : 'inline'
  const classes = ['navigation', `navigation--${safeVariant}`, className].filter(Boolean).join(' ')

  return (
    <nav
      className={classes}
      id={id}
      aria-label={ariaLabel}
      hidden={hidden}
      onKeyDown={onKeyDown}
    >
      {children}
    </nav>
  )
}

export default Navigation
