import AboutSection from '../components/AboutSection.jsx'
import ClinicContactSection from '../components/ClinicContactSection.jsx'
import FaqSection from '../components/FaqSection.jsx'
import HeroSection from '../components/HeroSection.jsx'
import HoursSection from '../components/HoursSection.jsx'
import InsuranceSection from '../components/InsuranceSection.jsx'
import QuickInformation from '../components/QuickInformation.jsx'
import ServicesSection from '../components/ServicesSection.jsx'
import { CLINIC_CONFIG } from '../config/clinic.js'

/**
 * Composes the home outlet from completed feature sections without owning raw
 * document markup or lifting state that belongs to a single feature. SiteLayout
 * supplies the persistent header, main landmark, and footer around this page.
 *
 * @returns {import('react').JSX.Element} The home-page interface.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
function HomePage() {
  return (
    <>
      <HeroSection clinic={CLINIC_CONFIG} />
      <QuickInformation clinic={CLINIC_CONFIG} />
      <AboutSection clinic={CLINIC_CONFIG} />
      <ServicesSection clinic={CLINIC_CONFIG} />
      <InsuranceSection clinic={CLINIC_CONFIG} />
      <HoursSection clinic={CLINIC_CONFIG} />
      <FaqSection clinic={CLINIC_CONFIG} />
      <ClinicContactSection clinic={CLINIC_CONFIG} />
    </>
  )
}

export default HomePage
