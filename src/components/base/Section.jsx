import './Section.css'

/**
 * Renders a semantic page section with optional shared vertical spacing.
 * It owns section landmark markup and the padded/flush variants found in the
 * POC so section-specific components need only compose content.
 *
 * @param {object} props The section properties.
 * @param {import('react').ReactNode} props.children The section content.
 * @param {'padded'|'flush'} [props.variant] The vertical-spacing treatment.
 * @param {string} [props.id] An optional navigation target.
 * @param {string} [props.ariaLabel] A direct accessible name.
 * @param {string} [props.ariaLabelledby] The id of a visible heading.
 * @param {string} [props.className] An optional composition class.
 * @returns {import('react').JSX.Element} A semantic section.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
function Section({ children, variant = 'padded', id, ariaLabel, ariaLabelledby, className = '' }) {
  const safeVariant = variant === 'flush' ? 'flush' : 'padded'
  const classes = ['section', `section--${safeVariant}`, className].filter(Boolean).join(' ')

  return <section className={classes} id={id} aria-label={ariaLabel} aria-labelledby={ariaLabelledby}>{children}</section>
}

export default Section
