import {
  Footer,
  Image,
  Layout,
  Link,
  Navigation,
  Shell,
} from './base/index.js'
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
  return (
    <Footer className="site-footer">
      <Shell>
        <Layout variant="grid" className="site-footer__grid">
          <Image
            {...clinic.assets.logos.primary}
            alt={clinic.brand.name}
            variant="brand"
            className="site-footer__logo"
          />
          <Navigation
            ariaLabel="Footer navigation"
            variant="footer"
            className="site-footer__navigation"
          >
            {clinic.navigation.footer.map((item) => (
              <Link href={item.href} external={item.external} key={item.id}>
                {item.label}
              </Link>
            ))}
          </Navigation>
        </Layout>
      </Shell>
    </Footer>
  )
}

export default SiteFooter
