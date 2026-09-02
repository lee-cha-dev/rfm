import './Heading.css'

/**
 * Renders one level of the document heading hierarchy.
 * The level remains semantic while display and section variants provide only
 * the two heading treatments established by the POC.
 *
 * @param {object} props The heading properties.
 * @param {import('react').ReactNode} props.children The heading content.
 * @param {1|2|3|4|5|6} [props.level] The semantic heading level.
 * @param {'display'|'section'} [props.variant] The visual treatment.
 * @param {string} [props.id] An optional labeling target.
 * @param {string} [props.className] An optional composition class.
 * @returns {import('react').JSX.Element} A native heading.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
function Heading({ children, level = 2, variant = 'section', id, className = '' }) {
  const safeLevel = [1, 2, 3, 4, 5, 6].includes(level) ? level : 2
  const safeVariant = variant === 'display' ? 'display' : 'section'
  const HeadingTag = `h${safeLevel}`
  const classes = ['heading', `heading--${safeVariant}`, className].filter(Boolean).join(' ')

  return <HeadingTag className={classes} id={id}>{children}</HeadingTag>
}

export default Heading
