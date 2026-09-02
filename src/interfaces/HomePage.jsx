import { Main, Page } from '../components/base/index.js'
import AboutSection from '../components/AboutSection.jsx'
import ContactSection from '../components/ContactSection.jsx'
import FaqSection from '../components/FaqSection.jsx'
import HeroSection from '../components/HeroSection.jsx'
import HoursSection from '../components/HoursSection.jsx'
import InsuranceSection from '../components/InsuranceSection.jsx'
import QuickInformation from '../components/QuickInformation.jsx'
import ServicesSection from '../components/ServicesSection.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import SiteHeader from '../components/SiteHeader.jsx'
import { CLINIC_CONFIG } from '../config/clinic.js'

/**
 * Composes the home route from Sprint 5 feature components without owning raw
 * document markup or lifting state that belongs to a single feature.
 *
 * @returns {import('react').JSX.Element} The home-page interface.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
function HomePage() {
  return (
    <Page>
      <SiteHeader clinic={CLINIC_CONFIG} />
      <Main>
        <HeroSection clinic={CLINIC_CONFIG} />
        <QuickInformation clinic={CLINIC_CONFIG} />
        <AboutSection clinic={CLINIC_CONFIG} />
        <ServicesSection clinic={CLINIC_CONFIG} />
        <InsuranceSection clinic={CLINIC_CONFIG} />
        <HoursSection clinic={CLINIC_CONFIG} />
        <FaqSection clinic={CLINIC_CONFIG} />
        <ContactSection clinic={CLINIC_CONFIG} />
      </Main>
      <SiteFooter clinic={CLINIC_CONFIG} />
    </Page>
  )
}

export default HomePage
