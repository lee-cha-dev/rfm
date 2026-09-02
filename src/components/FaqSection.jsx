import { Disclosure, Heading, Layout, RouteLink, Section, Shell, Text } from './base/index.js'
import './FaqSection.css'

/**
 * Renders a concise preview of the configured patient questions with native
 * disclosure semantics and no custom interaction state.
 *
 * @param {object} props The FAQ-section properties.
 * @param {Readonly<import('../config/clinic.js').ClinicConfig>} props.clinic The validated clinic configuration.
 * @returns {import('react').JSX.Element} The home-page FAQ preview.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
function FaqSection({ clinic, limit = 3 }) {
  const content = clinic.homeSections.faq
  const previewFaqs = clinic.faqs.slice(0, limit)

  return (
    <Section id="faq" ariaLabelledby="faq-heading" className="faq-section">
      <Shell>
        <Layout variant="grid" className="faq-section__grid">
          <Layout>
            <Text variant="eyebrow">{content.eyebrow}</Text>
            <Heading level={2} id="faq-heading">{content.heading}</Heading>
            <Text variant="lede" className="faq-section__lede">{content.lede}</Text>
            <RouteLink to={content.link.href} variant="text">{content.link.label}</RouteLink>
          </Layout>
          <Layout ariaLabel="Frequently asked questions" className="faq-section__list">
            {previewFaqs.map((faq) => (
              <Disclosure key={faq.id} summary={faq.question} className="faq-section__item">
                <Text>{faq.answer}</Text>
              </Disclosure>
            ))}
          </Layout>
        </Layout>
      </Shell>
    </Section>
  )
}

export default FaqSection
