import './Text.css'

/**
 * Renders body copy using the small set of POC typography roles.
 * Paragraph is the default semantic element; span, strong, and em support
 * inline quick-information, warning, and hero copy without markup leakage.
 *
 * @param {object} props The text properties.
 * @param {import('react').ReactNode} props.children The text content.
 * @param {'body'|'eyebrow'|'lede'|'note'|'quote'|'kicker'} [props.variant] The role.
 * @param {'p'|'span'|'strong'|'em'} [props.as] The semantic text element.
 * @param {string} [props.className] An optional composition class.
 * @param {string} [props.id] An optional identifier.
 * @param {'status'|'alert'} [props.role] An optional live-feedback role.
 * @param {'polite'|'assertive'} [props.ariaLive] An optional announcement priority.
 * @returns {import('react').JSX.Element} A native text element.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
function Text({ children, variant = 'body', as = 'p', className = '', id, role, ariaLive }) {
  const supportedVariants = ['body', 'eyebrow', 'lede', 'note', 'quote', 'kicker']
  const safeVariant = supportedVariants.includes(variant) ? variant : 'body'
  const TextTag = ['p', 'span', 'strong', 'em'].includes(as) ? as : 'p'
  const classes = ['text', `text--${safeVariant}`, className].filter(Boolean).join(' ')

  return <TextTag className={classes} id={id} role={role} aria-live={ariaLive}>{children}</TextTag>
}

export default Text
