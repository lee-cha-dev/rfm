import './Figure.css'

/**
 * Renders a figure containing base-owned media and an optional caption.
 * It provides the semantic wrapper needed by the clinic photo stack without
 * prescribing section-specific dimensions or positioning.
 *
 * @param {object} props The figure properties.
 * @param {import('react').ReactNode} props.children The image or media content.
 * @param {import('react').ReactNode} [props.caption] Optional visible caption text.
 * @param {string} [props.className] An optional composition class.
 * @returns {import('react').JSX.Element} A native figure.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
function Figure({ children, caption, className = '' }) {
  const classes = ['figure', className].filter(Boolean).join(' ')

  return (
    <figure className={classes}>
      {children}
      {caption ? <figcaption className="figure__caption">{caption}</figcaption> : null}
    </figure>
  )
}

export default Figure
