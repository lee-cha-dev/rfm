import './Header.css'

/**
 * Renders a page header landmark for the shared site chrome.
 * It exists so header markup stays in the base layer while feature components
 * supply branding, navigation, and controls.
 *
 * @param {object} props The header properties.
 * @param {import('react').ReactNode} props.children The header content.
 * @param {string} [props.className] An optional composition class.
 * @returns {import('react').JSX.Element} The header landmark.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
function Header({ children, className = '' }) {
  const classes = ['header', className].filter(Boolean).join(' ')

  return <header className={classes}>{children}</header>
}

export default Header
