import { ErrorState, Main, Page, RouteLink } from '../components/base/index.js'
import { CLINIC_CONFIG } from '../config/clinic.js'
import { ROUTES } from '../config/routes.js'
import { resolveErrorDisplay } from '../utils/normalizeError.js'

/**
 * Composes safe route and render-error recovery from catalog-owned display
 * data. The wildcard route and root boundary share it without ever rendering
 * raw exceptions, stack traces, or patient-entered content.
 *
 * @param {object} props The error-page properties.
 * @param {unknown} [props.error] A supported status or safely ignored error.
 * @param {Readonly<{title: string, message: string}>} [props.display] Pre-normalized catalog display data.
 * @param {() => void} [props.onReset] An optional root-boundary reset handler.
 * @param {boolean} [props.standalone] Whether to supply a minimal root canvas.
 * @returns {import('react').JSX.Element} The patient-safe error interface.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
function ErrorPage({ error = 500, display: suppliedDisplay, onReset, standalone = false }) {
  const display = suppliedDisplay ?? resolveErrorDisplay(error)
  const actions = (
    <>
      <RouteLink to={ROUTES.home} variant="ghost" onClick={onReset}>Home</RouteLink>
      <RouteLink to={ROUTES.contact} variant="text" onClick={onReset}>Contact</RouteLink>
    </>
  )
  const errorState = (
    <ErrorState
      brandName={CLINIC_CONFIG.brand.name}
      title={display.title}
      message={display.message}
      actions={actions}
      onRetry={onReset}
    />
  )

  if (!standalone) return errorState

  return (
    <Page>
      <Main>{errorState}</Main>
    </Page>
  )
}

export default ErrorPage
