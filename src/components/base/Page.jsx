import './Page.css'

/**
 * Renders the outer document canvas shared by routed page interfaces.
 * It keeps the top-level native wrapper in the base layer while allowing each
 * interface to compose its own header, main content, and footer.
 *
 * @param {object} props The page properties.
 * @param {import('react').ReactNode} props.children The page landmarks.
 * @param {string} [props.className] An optional composition class.
 * @returns {import('react').JSX.Element} The page canvas.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
function Page({ children, className = '' }) {
  const classes = ['page', className].filter(Boolean).join(' ')

  return <div className={classes}>{children}</div>
}

export default Page
