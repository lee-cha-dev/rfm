import InteriorPageHeader from '../components/InteriorPageHeader.jsx'
import {
  Heading,
  Layout,
  Link,
  Section,
  Shell,
  Text,
} from '../components/base/index.js'
import { CLINIC_CONFIG } from '../config/clinic.js'
import './PrivacyPage.css'

/**
 * Presents only the approved public-form behavior and the explicit unresolved
 * policy status. It avoids inventing legal terms or unsupported data claims.
 *
 * @returns {import('react').JSX.Element} The privacy-information page interface.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
function PrivacyPage() {
  const content = CLINIC_CONFIG.pageContent.privacy
  const resourceCards = content.resources.map((resource) => (
    <Link
      href={resource.href}
      external
      ariaLabel={resource.label}
      className="privacy-page__resource"
      key={resource.id}
    >
      <Text as="strong" className="privacy-page__resource-title">{resource.label}</Text>
      <Text as="span" variant="note" className="privacy-page__resource-description">
        {resource.description}
      </Text>
    </Link>
  ))

  return (
    <Layout className="privacy-page">
      <InteriorPageHeader {...content} />
      <Section ariaLabel="Website privacy information" className="privacy-page__content">
        <Shell className="privacy-page__shell">
          <Heading level={2} className="privacy-page__heading">Which policy applies?</Heading>
          <Text>{content.websiteNotice}</Text>
          <Text>{content.portalNotice}</Text>
          <Text>{content.clinicNotice}</Text>
          <Layout variant="actions" className="privacy-page__actions">
            <Link href={CLINIC_CONFIG.navigation.portal.href} variant="primary" external>
              Open {CLINIC_CONFIG.navigation.portal.label}
            </Link>
            <Link href={`tel:${CLINIC_CONFIG.contact.phone.href}`} variant="ghost">
              Call {CLINIC_CONFIG.contact.phone.display}
            </Link>
          </Layout>
          <Heading level={2} className="privacy-page__resources-heading">Patient Portal Policies</Heading>
          <Layout variant="grid" className="privacy-page__resources">
            {resourceCards}
          </Layout>
        </Shell>
      </Section>
    </Layout>
  )
}

export default PrivacyPage
