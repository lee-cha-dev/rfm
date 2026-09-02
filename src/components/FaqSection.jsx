import { Disclosure, Heading, Layout, Link, Section, Shell, Text } from './base/index.js'
import './FaqSection.css'

/**
 * Renders the four configured patient questions with native disclosure
 * semantics and no custom interaction state.
 *
 * @param {object} props The FAQ-section properties.
 * @param {Readonly<import('../config/clinic.js').ClinicConfig>} props.clinic The validated clinic configuration.
 * @returns {import('react').JSX.Element} The home-page FAQ preview.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
function FaqSection({ clinic }) {
  const content = clinic.homeSections.faq

  return (
    <Section id="faq" ariaLabelledby="faq-heading" className="faq-section">
      <Shell>
        <Layout variant="grid" className="faq-section__grid">
          <Layout>
            <Text variant="eyebrow">{content.eyebrow}</Text>
            <Heading level={2} id="faq-heading">{content.heading}</Heading>
            <Text variant="lede" className="faq-section__lede">{content.lede}</Text>
            <Link href={content.link.href} variant="text">{content.link.label}</Link>
          </Layout>
          <Layout ariaLabel="Frequently asked questions" className="faq-section__list">
            {clinic.faqs.map((faq) => (
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
