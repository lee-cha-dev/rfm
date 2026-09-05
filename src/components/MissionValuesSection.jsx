import { Disclosure, Heading, Layout, List, Section, Shell, Text } from './base/index.js'
import './MissionValuesSection.css'

/**
 * Groups the practice mission, vision, and expandable core values before the
 * provider roster on the dedicated About page.
 *
 * @param {object} props The mission-and-values properties.
 * @param {Readonly<object>} props.content Configuration-owned About-page content.
 * @returns {import('react').JSX.Element} The About-page mission and values section.
 * @author Lee Charles
 * @since 20260905
 * @company Lazy Software
 */
function MissionValuesSection({ content }) {
  const values = content.coreValues.items.map((value) => (
    <Disclosure key={value.id} summary={value.name} className="mission-values__value">
      <Text>{value.description}</Text>
    </Disclosure>
  ))

  return (
    <Section variant="flush" ariaLabel="Practice mission, vision, and core values" className="mission-values">
      <Shell className="mission-values__statements-shell">
        <Layout variant="grid" className="mission-values__statements">
          <Layout className="mission-values__statement">
            <Text variant="eyebrow">Why we are here</Text>
            <Heading level={2}>{content.mission.heading}</Heading>
            <Text className="mission-values__statement-body">{content.mission.body}</Text>
          </Layout>

          <Layout className="mission-values__statement">
            <Text variant="eyebrow">Where we are going</Text>
            <Heading level={2}>{content.vision.heading}</Heading>
            <Text className="mission-values__statement-body">{content.vision.body}</Text>
          </Layout>
        </Layout>
      </Shell>

      <Layout className="mission-values__core-panel">
        <Shell>
          <Layout variant="grid" className="mission-values__core">
            <Layout className="mission-values__core-heading">
              <Text variant="eyebrow">What guides us</Text>
              <Heading level={2}>{content.coreValues.heading}</Heading>
            </Layout>
            <List items={values} ariaLabel="Core values" className="mission-values__list" />
          </Layout>
        </Shell>
      </Layout>
    </Section>
  )
}

export default MissionValuesSection
