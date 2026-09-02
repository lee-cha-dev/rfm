import {
  Heading,
  Image,
  Layout,
  Link,
  Section,
  Shell,
  Text,
} from './base/index.js'
import './HeroSection.css'

/**
 * Renders the complete first-viewport hero from validated clinic content and
 * the locally owned family-care asset.
 *
 * @param {object} props The hero properties.
 * @param {Readonly<import('../config/clinic.js').ClinicConfig>} props.clinic The validated clinic configuration.
 * @returns {import('react').JSX.Element} The home-page hero.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
function HeroSection({ clinic }) {
  return (
    <Section id="top" variant="flush" ariaLabelledby="hero-title" className="hero">
      <Image
        {...clinic.assets.photos.familyCare}
        alt=""
        loading="eager"
        className="hero__media"
      />
      <Layout className="hero__veil" />
      <Shell className="hero__shell">
        <Layout variant="grid" className="hero__grid">
          <Layout className="hero__copy">
            <Text variant="eyebrow" className="hero__eyebrow">Primary care in Fayetteville</Text>
            <Heading level={1} variant="display" id="hero-title" className="hero__title">
              Care that starts with a real <Text as="em" className="hero__emphasis">conversation.</Text>
            </Heading>
            <Text variant="lede" className="hero__lede">
              We make room for the whole story, whether you are here for a yearly physical, a sudden cough, school paperwork, or help managing a condition over time.
            </Text>
            <Layout variant="actions" className="hero__actions">
              <Link href="#contact" variant="primary" className="hero__primary-action">
                Contact the clinic
              </Link>
              <Link
                href={clinic.navigation.portal.href}
                external={clinic.navigation.portal.external}
                id="portal"
                variant="ghost"
                className="hero__portal-action"
              >
                {clinic.navigation.portal.label}
              </Link>
            </Layout>
            <Layout
              variant="row"
              ariaLabel={clinic.brand.tagline.join(' ')}
              className="hero__tagline"
            >
              {clinic.brand.tagline.map((line) => (
                <Text as="span" key={line}>{line}</Text>
              ))}
            </Layout>
          </Layout>
        </Layout>
      </Shell>
    </Section>
  )
}

export default HeroSection
