import { Layout, Link, Section, Shell, Text } from './base/index.js'
import { useClinicHours } from '../hooks/useClinicHours.js'
import { useMapDirections } from '../hooks/useMapDirections.js'
import './QuickInformation.css'

/**
 * Renders the POC's selected quick-information card from shared configuration
 * and focused time/map hooks.
 *
 * @param {object} props The quick-information properties.
 * @param {Readonly<import('../config/clinic.js').ClinicConfig>} props.clinic The validated clinic configuration.
 * @param {Date} [props.now] An optional deterministic local date and time.
 * @param {string} [props.userAgent] An optional deterministic user agent.
 * @returns {import('react').JSX.Element} The current hours and contact card.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
function QuickInformation({ clinic, now, userAgent }) {
  const currentHours = useClinicHours(clinic.weeklyHours, now)
  const directionsHref = useMapDirections(clinic.contact.address.mapsQuery, userAgent)

  return (
    <Section variant="flush" ariaLabel="Quick clinic information" className="quick-information">
      <Shell>
        <Layout className="quick-information__card">
          <Link href="#hours" className="quick-information__hours">
            <Layout>
              <Text as="span" variant="kicker" className="quick-information__kicker">
                Our Current Hours
              </Text>
              <Text as="span" className="quick-information__hours-value">
                {currentHours.day} · {currentHours.hours}
              </Text>
            </Layout>
            <Text
              as="span"
              className={`quick-information__status quick-information__status--${currentHours.isOpen ? 'open' : 'closed'}`}
            >
              {currentHours.status}
            </Text>
          </Link>
          <Layout variant="row" className="quick-information__contact">
            <Link href={`tel:${clinic.contact.phone.href}`} className="quick-information__link">
              <Text as="span" variant="kicker" className="quick-information__kicker">Call</Text>
              <Text as="span" className="quick-information__title">{clinic.contact.phone.display}</Text>
              <Text as="span" className="quick-information__value">Tap to call</Text>
            </Link>
            <Link href={directionsHref} external className="quick-information__link">
              <Text as="span" variant="kicker" className="quick-information__kicker">Location</Text>
              <Text as="span" className="quick-information__title">{clinic.contact.address.display}</Text>
              <Text as="span" className="quick-information__value">Get directions</Text>
            </Link>
          </Layout>
        </Layout>
      </Shell>
    </Section>
  )
}

export default QuickInformation
