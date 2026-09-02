import './Link.css'

/**
 * Renders an accessible navigation action using the POC's link treatments.
 * External destinations are hardened automatically when opened in a new tab.
 *
 * @param {object} props The link properties.
 * @param {string} props.href The destination URL or fragment.
 * @param {import('react').ReactNode} props.children The visible link content.
 * @param {'plain'|'primary'|'ghost'|'text'} [props.variant] The visual treatment.
 * @param {boolean} [props.external] Whether the destination opens in a new tab.
 * @param {string} [props.ariaLabel] An accessible name when content is insufficient.
 * @param {string} [props.className] An optional composition class.
 * @param {string} [props.id] An optional anchor identifier.
 * @param {(event: import('react').MouseEvent<HTMLAnchorElement>) => void} [props.onClick] An optional activation handler.
 * @param {import('react').Ref<HTMLAnchorElement>} [props.elementRef] An optional native-anchor ref.
 * @returns {import('react').JSX.Element} A native anchor.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
function Link({
  href,
  children,
  variant = 'plain',
  external = false,
  ariaLabel,
  className = '',
  id,
  onClick,
  elementRef,
}) {
  const supportedVariants = ['plain', 'primary', 'ghost', 'text']
  const safeVariant = supportedVariants.includes(variant) ? variant : 'plain'
  const classes = ['link', `link--${safeVariant}`, className].filter(Boolean).join(' ')

  return (
    <a
      ref={elementRef}
      className={classes}
      href={href}
      id={id}
      aria-label={ariaLabel}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      onClick={onClick}
    >
      {children}
    </a>
  )
}

export default Link
