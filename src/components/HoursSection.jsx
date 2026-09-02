import { Heading, Layout, Link, RouteLink, Section, Shell, Text } from './base/index.js'
import { useMapDirections } from '../hooks/useMapDirections.js'
import './HoursSection.css'

/**
 * Presents the clinic location actions and the same seven-day schedule used by
 * the current-hours hook so operational hours cannot drift between sections.
 *
 * @param {object} props The hours-section properties.
 * @param {Readonly<import('../config/clinic.js').ClinicConfig>} props.clinic The validated clinic configuration.
 * @param {string} [props.userAgent] An optional deterministic user agent.
 * @returns {import('react').JSX.Element} The home-page hours and location section.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
function HoursSection({ clinic, userAgent, headingLevel = 2, contactHref = '#contact' }) {
  const content = clinic.homeSections.hours
  const directionsHref = useMapDirections(clinic.contact.address.mapsQuery, userAgent)

  return (
    <Section id="hours" ariaLabelledby="hours-heading" className="hours-section">
      <Shell>
        <Layout variant="grid" className="hours-section__grid">
          <Layout className="hours-section__copy">
            <Text variant="eyebrow">{content.eyebrow}</Text>
            <Heading level={headingLevel} id="hours-heading">{content.heading}</Heading>
            <Text className="hours-section__body">{content.body}</Text>
            <Text className="hours-section__address">{clinic.contact.address.display}</Text>
            <Layout variant="actions" className="hours-section__actions">
              <Link href={directionsHref} variant="primary" external>{content.directionsLabel}</Link>
              <RouteLink to={contactHref} variant="ghost">{content.contactLabel}</RouteLink>
            </Layout>
          </Layout>
          <Layout ariaLabel={content.scheduleLabel} className="hours-section__schedule">
            {clinic.weeklyHours.map((entry) => (
              <Layout variant="row" className="hours-section__row" key={entry.dayIndex}>
                <Text as="strong" className="hours-section__day">{entry.day}</Text>
                <Text as="span" className="hours-section__time">{entry.hours}</Text>
              </Layout>
            ))}
            <Text variant="note" className="hours-section__note">{content.scheduleNote}</Text>
          </Layout>
        </Layout>
      </Shell>
    </Section>
  )
}

export default HoursSection
