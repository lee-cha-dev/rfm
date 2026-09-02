import {
  Figure,
  Heading,
  Image,
  Layout,
  Section,
  Shell,
  Text,
} from './base/index.js'
import './PracticeTeamSection.css'

/**
 * Renders the configuration-owned practice roster. Desktop rows alternate
 * their media and copy positions; compact layouts keep every portrait before
 * its related biography for a predictable reading order.
 *
 * @param {object} props The practice-team properties.
 * @param {ReadonlyArray<Readonly<object>>} props.employees The employees to introduce.
 * @returns {import('react').JSX.Element} The Meet the Practice section.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
function PracticeTeamSection({ employees }) {
  return (
    <Section ariaLabelledby="practice-team-heading" className="practice-team">
      <Shell>
        <Layout className="practice-team__intro">
          <Text variant="eyebrow">The people behind your care</Text>
          <Heading level={2} id="practice-team-heading">Meet the practice</Heading>
          <Text variant="lede" className="practice-team__lede">
            Our team looks forward to meeting you! We are here to listen, explain, and provide the care you need.
          </Text>
        </Layout>

        <Layout variant="stack" className="practice-team__list">
          {employees.map((employee, index) => (
            <Layout
              className={`practice-team__employee${index % 2 === 1 ? ' practice-team__employee--reversed' : ''}`}
              key={employee.id}
            >
              <Figure className="practice-team__portrait">
                <Image {...employee.photo} alt={employee.photoAlt} />
              </Figure>
              <Layout className="practice-team__copy">
                <Text variant="kicker">{employee.role}</Text>
                <Heading level={3} className="practice-team__name">{employee.name}</Heading>
                {employee.biography.map((paragraph) => (
                  <Text key={paragraph}>{paragraph}</Text>
                ))}
              </Layout>
            </Layout>
          ))}
        </Layout>
      </Shell>
    </Section>
  )
}

export default PracticeTeamSection
