import { Disclosure, Heading, Layout, Section, Shell, Text } from './base/index.js'
import './FaqDirectory.css'

/**
 * Renders every configured FAQ once beneath its configured category. The
 * dedicated FAQ route uses this directory while the home page keeps a shorter
 * preview from the same question and answer records.
 *
 * @param {object} props The FAQ-directory properties.
 * @param {Readonly<import('../config/clinic.js').ClinicConfig>} props.clinic The validated clinic configuration.
 * @returns {import('react').JSX.Element} The categorized patient-question directory.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
function FaqDirectory({ clinic }) {
  const faqById = new Map(clinic.faqs.map((faq) => [faq.id, faq]))

  return (
    <Section ariaLabel="All patient questions" className="faq-directory">
      <Shell className="faq-directory__shell">
        {clinic.faqCategories.map((category) => (
          <Layout className="faq-directory__category" key={category.id}>
            <Heading level={2} className="faq-directory__heading">{category.label}</Heading>
            <Layout ariaLabel={`${category.label} questions`} className="faq-directory__questions">
              {category.faqIds.map((faqId) => {
                const faq = faqById.get(faqId)

                return (
                  <Disclosure key={faq.id} summary={faq.question} className="faq-directory__item">
                    <Text>{faq.answer}</Text>
                  </Disclosure>
                )
              })}
            </Layout>
          </Layout>
        ))}
      </Shell>
    </Section>
  )
}

export default FaqDirectory
