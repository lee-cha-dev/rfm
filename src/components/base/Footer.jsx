import './Footer.css'

/**
 * Renders the content-information landmark shared by site pages.
 * It keeps native footer markup inside the base component boundary.
 *
 * @param {object} props The footer properties.
 * @param {import('react').ReactNode} props.children The footer content.
 * @param {string} [props.className] An optional composition class.
 * @returns {import('react').JSX.Element} The footer landmark.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
function Footer({ children, className = '' }) {
  const classes = ['footer', className].filter(Boolean).join(' ')

  return <footer className={classes}>{children}</footer>
}

export default Footer
