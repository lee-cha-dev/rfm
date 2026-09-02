import {
  Figure,
  Heading,
  Image,
  Layout,
  Link,
  Section,
  Shell,
  Text,
} from './base/index.js'
import './AboutSection.css'

/**
 * Presents the practice story with the real clinic exterior and waiting-room
 * photography selected by the validated home-page content model.
 *
 * @param {object} props The about-section properties.
 * @param {Readonly<import('../config/clinic.js').ClinicConfig>} props.clinic The validated clinic configuration.
 * @returns {import('react').JSX.Element} The home-page practice story.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
function AboutSection({ clinic }) {
  const content = clinic.homeSections.about

  return (
    <Section id="about" ariaLabelledby="about-heading" className="about-section">
      <Shell>
        <Layout variant="grid" className="about-section__grid">
          <Layout
            ariaLabel={`${clinic.brand.name} clinic photography`}
            className="about-section__photo-stack"
          >
            {content.photos.map((photo, index) => (
              <Figure
                key={photo.id}
                className={`about-section__photo about-section__photo--${index === 0 ? 'main' : 'small'}`}
              >
                <Image {...clinic.assets.photos[photo.assetKey]} alt={photo.alt} />
              </Figure>
            ))}
          </Layout>
          <Layout className="about-section__copy">
            <Text variant="eyebrow">{content.eyebrow}</Text>
            <Heading level={2} id="about-heading">{content.heading}</Heading>
            <Text variant="lede" className="about-section__lede">{content.lede}</Text>
            <Text>{content.body}</Text>
            <Text variant="quote" className="about-section__quote">{content.quote}</Text>
            <Link href={content.link.href} variant="text">{content.link.label}</Link>
          </Layout>
        </Layout>
      </Shell>
    </Section>
  )
}

export default AboutSection
