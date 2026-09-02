import './Image.css'

/**
 * Renders an image with intrinsic sizing and explicit alternative text.
 * It reserves layout space from the shared asset manifest and centralizes
 * native image defaults for logos and clinic photography.
 *
 * @param {object} props The image properties.
 * @param {string} props.src The public asset path.
 * @param {string} props.alt The accessible alternative, or an empty string when decorative.
 * @param {number} props.width The intrinsic width.
 * @param {number} props.height The intrinsic height.
 * @param {'content'|'brand'} [props.variant] The established image treatment.
 * @param {'eager'|'lazy'} [props.loading] The loading priority.
 * @param {string} [props.className] An optional composition class.
 * @returns {import('react').JSX.Element} A native image.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
function Image({
  src,
  alt,
  width,
  height,
  variant = 'content',
  loading = 'lazy',
  className = '',
}) {
  const safeVariant = variant === 'brand' ? 'brand' : 'content'
  const classes = ['image', `image--${safeVariant}`, className].filter(Boolean).join(' ')

  return (
    <img
      className={classes}
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
    />
  )
}

export default Image
