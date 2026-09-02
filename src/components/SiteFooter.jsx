import {
  Footer,
  Layout,
  Link,
  Navigation,
  RouteLink,
  Shell,
  Text,
} from './base/index.js'
import { useLocation } from 'react-router'
import { isRouteActive } from '../config/routes.js'
import './SiteFooter.css'

/**
 * Renders the POC footer with the primary logo treatment and the shared footer
 * navigation configuration. External destinations retain their hardened link
 * behavior through the base Link contract.
 *
 * @param {object} props The site-footer properties.
 * @param {Readonly<import('../config/clinic.js').ClinicConfig>} props.clinic The validated clinic configuration.
 * @returns {import('react').JSX.Element} The shared site footer.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
function SiteFooter({ clinic }) {
  const { pathname } = useLocation()

  return (
    <Footer className="site-footer">
      <Shell>
        <Layout variant="row" className="site-footer__bar">
          <Text variant="note" className="site-footer__copyright">
            © 2026 {clinic.brand.name}. All rights reserved.
          </Text>
          <Navigation
            ariaLabel="Footer navigation"
            variant="footer"
            className="site-footer__navigation"
          >
            {clinic.navigation.footer.map((item) => (
              item.external ? (
                <Link href={item.href} external key={item.id}>{item.label}</Link>
              ) : (
                <RouteLink
                  to={item.href}
                  ariaCurrent={isRouteActive(item.href, pathname) ? 'page' : undefined}
                  key={item.id}
                >
                  {item.label}
                </RouteLink>
              )
            ))}
          </Navigation>
        </Layout>
      </Shell>
    </Footer>
  )
}

export default SiteFooter
