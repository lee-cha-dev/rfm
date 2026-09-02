import FaqDirectory from '../components/FaqDirectory.jsx'
import InteriorPageHeader from '../components/InteriorPageHeader.jsx'
import { Layout } from '../components/base/index.js'
import { CLINIC_CONFIG } from '../config/clinic.js'
import './FaqPage.css'

/**
 * Composes the complete categorized FAQ route from the same records used by
 * the home preview, preventing question or answer copy from drifting.
 *
 * @returns {import('react').JSX.Element} The FAQ-page interface.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
function FaqPage() {
  return (
    <Layout className="faq-page">
      <InteriorPageHeader {...CLINIC_CONFIG.pageContent.faq} />
      <FaqDirectory clinic={CLINIC_CONFIG} />
    </Layout>
  )
}

export default FaqPage
