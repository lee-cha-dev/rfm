import {
  Button,
  Header,
  Image,
  Link,
  Navigation,
  Shell,
  Text,
} from './base/index.js'
import { useMobileNavigation } from '../hooks/useMobileNavigation.js'
import './SiteHeader.css'

/**
 * Renders the skip link and responsive site header using clinic configuration.
 * The mobile disclosure owns its state and returns focus to the trigger on
 * Escape while every activated navigation link closes the panel.
 *
 * @param {object} props The site-header properties.
 * @param {Readonly<import('../config/clinic.js').ClinicConfig>} props.clinic The validated clinic configuration.
 * @returns {import('react').JSX.Element} Responsive site navigation.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
function SiteHeader({ clinic }) {
  const {
    isOpen,
    buttonRef,
    firstLinkRef,
    toggleMenu,
    closeMenu,
    handleKeyDown,
  } = useMobileNavigation()

  return (
    <>
      <Link href="#main-content" className="site-header__skip-link">
        Skip to main content
      </Link>
      <Header className="site-header">
        <Shell className="site-header__nav">
          <Link href="#top" ariaLabel={`${clinic.brand.name} home`} className="site-header__brand">
            <Image
              {...clinic.assets.logos.header}
              alt={clinic.brand.name}
              variant="brand"
              loading="eager"
              className="site-header__logo"
            />
          </Link>
          <Navigation ariaLabel="Primary navigation" className="site-header__desktop-navigation">
            {clinic.navigation.primary.map((item) => (
              <Link href={item.href} key={item.id}>{item.label}</Link>
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
              <Link
                href={item.href}
                key={item.id}
                onClick={closeMenu}
                elementRef={index === 0 ? firstLinkRef : undefined}
              >
                {item.label}
              </Link>
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
