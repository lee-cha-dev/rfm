import Button from './Button.jsx'
import Heading from './Heading.jsx'
import { Layout, Shell } from './Layout.jsx'
import Section from './Section.jsx'
import Text from './Text.jsx'
import './ErrorState.css'

/**
 * Renders reusable, patient-safe error presentation through the base layer.
 * Route-level and boundary-level error interfaces supply recovery actions
 * without passing exception objects or patient-entered values into the view.
 *
 * @param {object} props The safe error-state properties.
 * @param {string} props.brandName The clinic name shown as the branded context.
 * @param {string} props.title The catalog-owned error title.
 * @param {string} props.message The catalog-owned safe explanation.
 * @param {import('react').ReactNode} props.actions Safe navigation actions.
 * @param {() => void} [props.onRetry] An optional boundary reset action.
 * @returns {import('react').JSX.Element} A safe error-state region.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
function ErrorState({ brandName, title, message, actions, onRetry }) {
  return (
    <Section className="error-state" ariaLabelledby="error-state-heading">
      <Shell className="error-state__shell">
        <Text variant="eyebrow">{brandName}</Text>
        <Heading level={1} variant="display" id="error-state-heading">
          {title}
        </Heading>
        <Text variant="lede">{message}</Text>
        <Layout variant="actions" className="error-state__actions">
          {onRetry ? <Button onClick={onRetry}>Try again</Button> : null}
          {actions}
        </Layout>
      </Shell>
    </Section>
  )
}

export default ErrorState
