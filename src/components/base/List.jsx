import './List.css'

/**
 * Renders ordered or unordered list semantics from an item collection.
 * It keeps both list containers and list items inside the base layer while
 * allowing feature components to supply plain text or composed item content.
 *
 * @param {object} props The list properties.
 * @param {readonly import('react').ReactNode[]} props.items The item content.
 * @param {boolean} [props.ordered] Whether sequence is meaningful.
 * @param {'plain'|'matrix'} [props.variant] The POC list treatment.
 * @param {string} [props.ariaLabel] An accessible name for the collection.
 * @param {string} [props.className] An optional composition class.
 * @returns {import('react').JSX.Element} A semantic list.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
function List({ items, ordered = false, variant = 'plain', ariaLabel, className = '' }) {
  const ListTag = ordered ? 'ol' : 'ul'
  const safeVariant = variant === 'matrix' ? 'matrix' : 'plain'
  const classes = ['list', `list--${safeVariant}`, className].filter(Boolean).join(' ')

  return (
    <ListTag className={classes} aria-label={ariaLabel}>
      {items.map((item, index) => <li key={index}>{item}</li>)}
    </ListTag>
  )
}

export default List
