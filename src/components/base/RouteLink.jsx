import { Link as ReactRouterLink } from 'react-router'
import './Link.css'

/**
 * Renders an internal link with the established base-link treatments while
 * delegating history updates to React Router. Shared shell and recovery
 * interfaces use it to navigate without reloading the document.
 *
 * @param {object} props The routed-link properties.
 * @param {string} props.to The internal route or fragment destination.
 * @param {import('react').ReactNode} props.children The visible link content.
 * @param {'plain'|'primary'|'ghost'|'text'} [props.variant] The visual treatment.
 * @param {string} [props.ariaLabel] An accessible name when content is insufficient.
 * @param {'page'} [props.ariaCurrent] Whether this link identifies the active page.
 * @param {string} [props.className] An optional composition class.
 * @param {(event: import('react').MouseEvent<HTMLAnchorElement>) => void} [props.onClick] An optional activation handler.
 * @param {import('react').Ref<HTMLAnchorElement>} [props.elementRef] An optional native-anchor ref.
 * @returns {import('react').JSX.Element} A client-side routed link.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
function RouteLink({
  to,
  children,
  variant = 'plain',
  ariaLabel,
  ariaCurrent,
  className = '',
  onClick,
  elementRef,
}) {
  const supportedVariants = ['plain', 'primary', 'ghost', 'text']
  const safeVariant = supportedVariants.includes(variant) ? variant : 'plain'
  const classes = ['link', `link--${safeVariant}`, className].filter(Boolean).join(' ')

  return (
    <ReactRouterLink
      ref={elementRef}
      className={classes}
      to={to}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
      onClick={onClick}
    >
      {children}
    </ReactRouterLink>
  )
}

export default RouteLink
