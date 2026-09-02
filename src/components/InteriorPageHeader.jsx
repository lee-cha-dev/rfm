import { Heading, Section, Shell, Text } from './base/index.js'
import './InteriorPageHeader.css'

/**
 * Opens dedicated routes with one branded heading treatment and a short,
 * page-specific introduction. Routed interfaces supply configuration-owned
 * copy while this component keeps the visual treatment consistent.
 *
 * @param {object} props The interior-page header properties.
 * @param {string} props.eyebrow The short page label.
 * @param {string} props.heading The route's unique level-one heading.
 * @param {string} props.lede The concise page introduction.
 * @returns {import('react').JSX.Element} The dedicated-page introduction.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
function InteriorPageHeader({ eyebrow, heading, lede }) {
  return (
    <Section ariaLabelledby="interior-page-heading" className="interior-page-header">
      <Shell className="interior-page-header__shell">
        <Text variant="eyebrow">{eyebrow}</Text>
        <Heading level={1} variant="display" id="interior-page-heading">
          {heading}
        </Heading>
        <Text variant="lede" className="interior-page-header__lede">{lede}</Text>
      </Shell>
    </Section>
  )
}

export default InteriorPageHeader
