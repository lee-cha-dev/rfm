import { Outlet, useLocation } from 'react-router'
import { Main, Page } from './base/index.js'
import RouteChangeEffects from './RouteChangeEffects.jsx'
import SiteFooter from './SiteFooter.jsx'
import SiteHeader from './SiteHeader.jsx'
import { CLINIC_CONFIG } from '../config/clinic.js'
import { ROUTES } from '../config/routes.js'

/**
 * Composes the persistent header, main outlet, and footer for every route.
 * App uses this layout route to keep shared landmarks mounted across
 * client-side navigation while route interfaces replace only outlet content.
 *
 * @returns {import('react').JSX.Element} The shared routed site shell.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
function SiteLayout() {
  const { pathname } = useLocation()

  return (
    <Page>
      <SiteHeader clinic={CLINIC_CONFIG} solid={pathname !== ROUTES.home} />
      <RouteChangeEffects />
      <Main>
        <Outlet />
      </Main>
      <SiteFooter clinic={CLINIC_CONFIG} />
    </Page>
  )
}

export default SiteLayout
