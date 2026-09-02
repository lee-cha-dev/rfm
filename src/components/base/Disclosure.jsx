import './Disclosure.css'

/**
 * Renders a native details/summary disclosure for patient questions.
 * Native state preserves keyboard and no-script behavior, so this component
 * remains stateless and needs no custom click handling.
 *
 * @param {object} props The disclosure properties.
 * @param {import('react').ReactNode} props.summary The always-visible prompt.
 * @param {import('react').ReactNode} props.children The revealed content.
 * @param {boolean} [props.open] Whether the item starts expanded.
 * @param {string} [props.className] An optional composition class.
 * @returns {import('react').JSX.Element} A native disclosure.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
function Disclosure({ summary, children, open = false, className = '' }) {
  const classes = ['disclosure', className].filter(Boolean).join(' ')

  return (
    <details className={classes} open={open}>
      <summary className="disclosure__summary">{summary}</summary>
      <div className="disclosure__content">{children}</div>
    </details>
  )
}

export default Disclosure
