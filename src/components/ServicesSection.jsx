import {
  Heading,
  Layout,
  List,
  Section,
  Shell,
  Text,
} from './base/index.js'
import './ServicesSection.css'

/**
 * Renders the service introduction and config-driven grouped directories with
 * nested list semantics and a meaningful heading for every care category.
 *
 * @param {object} props The services-section properties.
 * @param {Readonly<import('../config/clinic.js').ClinicConfig>} props.clinic The validated clinic configuration.
 * @returns {import('react').JSX.Element} The home-page services directory.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
function ServicesSection({ clinic, headingLevel = 2 }) {
  const content = clinic.homeSections.services
  const groups = clinic.services.map((group) => (
    <Layout className="services-section__group" key={group.id}>
      <Heading level={3} className="services-section__label">{group.label}</Heading>
      <List
        items={group.items}
        ariaLabel={`${group.label} services`}
        className="services-section__items"
      />
    </Layout>
  ))

  return (
    <Section id="services" ariaLabelledby="services-heading" className="services-section">
      <Shell>
        <Layout variant="grid" className="services-section__grid">
          <Layout className="services-section__intro">
            <Text variant="eyebrow">{content.eyebrow}</Text>
            <Heading level={headingLevel} id="services-heading">{content.heading}</Heading>
            <Text variant="lede" className="services-section__lede">{content.lede}</Text>
          </Layout>
          <List
            items={groups}
            ariaLabel="Family medicine services grouped by type"
            className="services-section__directory"
          />
        </Layout>
      </Shell>
    </Section>
  )
}

export default ServicesSection
