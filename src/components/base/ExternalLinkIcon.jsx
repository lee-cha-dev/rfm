/**
 * Renders the standard external-link symbol as a decorative inline icon.
 * The surrounding link supplies the accessible destination name.
 *
 * @param {object} props The icon properties.
 * @param {string} [props.className] An optional composition class.
 * @returns {import('react').JSX.Element} A decorative external-link SVG.
 * @author Lee Charles
 * @since 20260905
 * @company Lazy Software
 */
function ExternalLinkIcon({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
    >
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  )
}

export default ExternalLinkIcon
