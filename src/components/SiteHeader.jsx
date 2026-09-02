import {
  Button,
  Header,
  Image,
  Link,
  Navigation,
  RouteLink,
  Shell,
  Text,
} from './base/index.js'
import { useLocation } from 'react-router'
import { isRouteActive, ROUTES } from '../config/routes.js'
import { useMobileNavigation } from '../hooks/useMobileNavigation.js'
import { useStickyHeader } from '../hooks/useStickyHeader.js'
import './SiteHeader.css'

/**
 * Renders the skip link and responsive site header using clinic configuration.
 * The mobile disclosure owns its state and returns focus to the trigger on
 * Escape while every activated navigation link closes the panel.
 *
 * @param {object} props The site-header properties.
 * @param {Readonly<import('../config/clinic.js').ClinicConfig>} props.clinic The validated clinic configuration.
 * @param {boolean} [props.solid] Whether the route requires an opaque header surface.
 * @returns {import('react').JSX.Element} Responsive site navigation.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
function SiteHeader({ clinic, solid = false }) {
  const { pathname, hash } = useLocation()
  const isScrolled = useStickyHeader()
  const {
    isOpen,
    buttonRef,
    firstLinkRef,
    toggleMenu,
    closeMenu,
    handleKeyDown,
  } = useMobileNavigation(`${pathname}${hash}`)

  return (
    <>
      <Link href="#main-content" className="site-header__skip-link">
        Skip to main content
      </Link>
      <Header className={`site-header${isScrolled ? ' site-header--scrolled' : ''}${solid ? ' site-header--solid' : ''}`}>
        <Shell className="site-header__nav">
          <RouteLink
            to={ROUTES.home}
            ariaLabel={`${clinic.brand.name} home`}
            className="site-header__brand"
          >
            <Image
              {...clinic.assets.logos.header}
              alt={clinic.brand.name}
              variant="brand"
              loading="eager"
              className="site-header__logo"
            />
          </RouteLink>
          <Navigation ariaLabel="Primary navigation" className="site-header__desktop-navigation">
            {clinic.navigation.primary.map((item) => (
              <RouteLink
                to={item.href}
                ariaCurrent={isRouteActive(item.href, pathname) ? 'page' : undefined}
                key={item.id}
              >
                {item.label}
              </RouteLink>
            ))}
            <Link
              href={clinic.navigation.portal.href}
              external={clinic.navigation.portal.external}
              variant="primary"
              className="site-header__portal"
            >
              {clinic.navigation.portal.label}
            </Link>
          </Navigation>
          <Button
            variant="menu"
            ariaLabel={isOpen ? 'Close menu' : 'Open menu'}
            ariaControls="mobile-navigation"
            ariaExpanded={isOpen}
            onClick={toggleMenu}
            onKeyDown={handleKeyDown}
            elementRef={buttonRef}
            className="site-header__menu-button"
          >
            <Text as="span" className="site-header__menu-icon">Menu</Text>
          </Button>
          <Navigation
            ariaLabel="Mobile navigation"
            variant="panel"
            id="mobile-navigation"
            hidden={!isOpen}
            onKeyDown={handleKeyDown}
            className={`site-header__mobile-navigation${isOpen ? ' site-header__mobile-navigation--open' : ''}`}
          >
            {clinic.navigation.primary.map((item, index) => (
              <RouteLink
                to={item.href}
                ariaCurrent={isRouteActive(item.href, pathname) ? 'page' : undefined}
                key={item.id}
                onClick={closeMenu}
                elementRef={index === 0 ? firstLinkRef : undefined}
              >
                {item.label}
              </RouteLink>
            ))}
            <Link
              href={clinic.navigation.portal.href}
              external={clinic.navigation.portal.external}
              variant="primary"
              className="site-header__portal"
              onClick={closeMenu}
            >
              {clinic.navigation.portal.label}
            </Link>
          </Navigation>
        </Shell>
      </Header>
    </>
  )
}

export default SiteHeader
