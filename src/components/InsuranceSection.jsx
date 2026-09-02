import {
  Heading,
  Layout,
  List,
  Section,
  Shell,
  Text,
} from './base/index.js'
import './InsuranceSection.css'

/**
 * Presents the accepted-carrier matrix from validated configuration while
 * retaining the POC's four-, two-, and one-column responsive transitions.
 *
 * @param {object} props The insurance-section properties.
 * @param {Readonly<import('../config/clinic.js').ClinicConfig>} props.clinic The validated clinic configuration.
 * @returns {import('react').JSX.Element} The home-page insurance matrix.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
function InsuranceSection({ clinic }) {
  const content = clinic.homeSections.insurance

  return (
    <Section ariaLabelledby="insurance-heading" className="insurance-section">
      <Shell>
        <Layout className="insurance-section__copy">
          <Text variant="eyebrow">{content.eyebrow}</Text>
          <Heading level={2} id="insurance-heading">{content.heading}</Heading>
          <Text variant="lede" className="insurance-section__lede">{content.lede}</Text>
        </Layout>
        <Layout className="insurance-section__matrix">
          <Layout className="insurance-section__matrix-head">
            <Text as="span">{content.matrixLabel}</Text>
            <Text as="span">{content.matrixNote}</Text>
          </Layout>
          <List
            items={clinic.insuranceCarriers}
            variant="matrix"
            ariaLabel="Accepted insurance plans"
            className="insurance-section__list"
          />
        </Layout>
      </Shell>
    </Section>
  )
}

export default InsuranceSection
