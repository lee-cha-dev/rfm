import InteriorPageHeader from '../components/InteriorPageHeader.jsx'
import MissionValuesSection from '../components/MissionValuesSection.jsx'
import PracticeTeamSection from '../components/PracticeTeamSection.jsx'
import { Layout } from '../components/base/index.js'
import { CLINIC_CONFIG } from '../config/clinic.js'
import { EMPLOYEES } from '../config/employees.js'
import './AboutPage.css'

/**
 * Composes the dedicated practice page from its concise mission, configured
 * employee roster, and practical contact card.
 *
 * @returns {import('react').JSX.Element} The about-page interface.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
function AboutPage() {
  const content = CLINIC_CONFIG.pageContent.about

  return (
    <Layout className="about-page">
      <InteriorPageHeader
        {...content}
        headingEmphasis={CLINIC_CONFIG.brand.tagline[1]}
      />
      <MissionValuesSection content={content} />
      <PracticeTeamSection employees={EMPLOYEES} />
    </Layout>
  )
}

export default AboutPage
