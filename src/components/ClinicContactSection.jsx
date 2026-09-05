import { ExternalLinkIcon, Heading, Layout, Link, Section, Shell, Text } from './base/index.js'
import './ClinicContactSection.css'

/**
 * Presents the clinic's public contact information without a website message
 * form. Patients can call the office or use the secure patient portal.
 *
 * @param {object} props The contact-section properties.
 * @param {Readonly<import('../config/clinic.js').ClinicConfig>} props.clinic The validated clinic configuration.
 * @returns {import('react').JSX.Element} The home-page contact section.
 * @author Lee Charles
 * @since 20260905
 * @company Lazy Software
 */
function ClinicContactSection({ clinic }) {
  const content = clinic.homeSections.contact

  return (
    <Section id="contact" ariaLabelledby="contact-heading" className="clinic-contact-section">
      <Shell>
        <Layout variant="grid" className="clinic-contact-section__grid">
          <Layout className="clinic-contact-section__copy">
            <Text variant="eyebrow">{content.eyebrow}</Text>
            <Heading level={2} id="contact-heading">{content.heading}</Heading>
            <Text className="clinic-contact-section__body">{content.body}</Text>
          </Layout>
          <Layout ariaLabel="Clinic contact options" className="clinic-contact-section__options">
            <Link
              href={`tel:${clinic.contact.phone.href}`}
              ariaLabel={clinic.contact.phone.display}
              className="clinic-contact-section__option"
            >
              <Text as="span" className="clinic-contact-section__label">Phone</Text>
              <Text as="strong" className="clinic-contact-section__value">{clinic.contact.phone.display}</Text>
            </Link>
            <Link
              href={clinic.navigation.portal.href}
              external
              ariaLabel={clinic.navigation.portal.label}
              className="clinic-contact-section__option"
            >
              <Text as="span" className="clinic-contact-section__label">Secure patient communication</Text>
              <Text as="strong" className="clinic-contact-section__value">{clinic.navigation.portal.label}</Text>
              <ExternalLinkIcon className="clinic-contact-section__external-icon" />
            </Link>
          </Layout>
        </Layout>
      </Shell>
    </Section>
  )
}

export default ClinicContactSection
