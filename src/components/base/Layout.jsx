import './Layout.css'

/**
 * Renders a non-semantic layout grouping for feature compositions.
 * It is the base-layer owner of the POC's native div structures and exposes
 * only the block, row, grid, stack, and actions arrangements the POC needs.
 *
 * @param {object} props The layout properties.
 * @param {import('react').ReactNode} props.children The grouped content.
 * @param {'block'|'row'|'grid'|'stack'|'actions'} [props.variant] The arrangement.
 * @param {string} [props.className] An optional composition class.
 * @param {string} [props.id] An optional anchor identifier.
 * @param {string} [props.ariaLabel] An accessible label for meaningful groups.
 * @returns {import('react').JSX.Element} A native layout grouping.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
export function Layout({ children, variant = 'block', className = '', id, ariaLabel }) {
  const supportedVariants = ['block', 'row', 'grid', 'stack', 'actions']
  const safeVariant = supportedVariants.includes(variant) ? variant : 'block'
  const classes = ['layout', `layout--${safeVariant}`, className].filter(Boolean).join(' ')

  return <div className={classes} id={id} aria-label={ariaLabel}>{children}</div>
}

/**
 * Constrains content to the shared responsive page width.
 * It exists so all sections use the same POC gutters and maximum width.
 *
 * @param {object} props The shell properties.
 * @param {import('react').ReactNode} props.children The constrained content.
 * @param {string} [props.className] An optional composition class.
 * @returns {import('react').JSX.Element} The shared content shell.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
export function Shell({ children, className = '' }) {
  const classes = ['layout__shell', className].filter(Boolean).join(' ')

  return <div className={classes}>{children}</div>
}

/**
 * Renders the primary-content landmark used by every page interface.
 * It centralizes the skip-link destination and prevents interfaces from
 * owning native main markup.
 *
 * @param {object} props The main landmark properties.
 * @param {import('react').ReactNode} props.children The page content.
 * @param {string} [props.id] The skip-link destination.
 * @param {string} [props.className] An optional composition class.
 * @returns {import('react').JSX.Element} The main landmark.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
export function Main({ children, id = 'main-content', className = '' }) {
  const classes = ['layout__main', className].filter(Boolean).join(' ')

  return <main className={classes} id={id} tabIndex={-1}>{children}</main>
}
