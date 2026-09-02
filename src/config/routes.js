/**
 * Defines every application path in one immutable catalog so navigation,
 * routing, recovery actions, and tests never scatter URL literals.
 *
 * @type {Readonly<Record<string, string>>}
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
export const ROUTES = Object.freeze({
  home: '/',
  about: '/about',
  faq: '/faq',
  privacy: '/privacy',
  contact: '/#contact',
  notFound: '*',
})

/**
 * Supplies route labels and provisional Sprint 10 metadata from one catalog.
 * Sprint 12 owns final metadata wording and sign-off.
 *
 * @type {ReadonlyArray<Readonly<{id: string, path: string, title: string, description: string, indexable: boolean}>>}
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
export const ROUTE_DEFINITIONS = Object.freeze([
  Object.freeze({
    id: 'home',
    path: ROUTES.home,
    title: '',
    description: 'Warm, personal primary care information for individuals and families.',
    indexable: true,
  }),
  Object.freeze({
    id: 'about',
    path: ROUTES.about,
    title: 'About',
    description: "Read the mission of Ro's Family Medicine and meet the provider behind the practice.",
    indexable: true,
  }),
  Object.freeze({
    id: 'faq',
    path: ROUTES.faq,
    title: 'Frequently Asked Questions',
    description: 'Review patient information about visits, the portal, and insurance.',
    indexable: true,
  }),
  Object.freeze({
    id: 'privacy',
    path: ROUTES.privacy,
    title: 'Privacy',
    description: 'Read Tebra patient-portal privacy terms, security information, and HIPAA notice guidance.',
    indexable: true,
  }),
])

const NOT_FOUND_METADATA = Object.freeze({
  id: 'not-found',
  path: ROUTES.notFound,
  title: 'Page Not Found',
  description: 'The requested page could not be found.',
  indexable: false,
})

/**
 * Resolves display metadata for a known route or the wildcard interface.
 *
 * @param {string} pathname The active location pathname.
 * @param {string} brandName The clinic brand name.
 * @returns {Readonly<{id: string, path: string, title: string, description: string, indexable: boolean, documentTitle: string}>} Route metadata.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
export function getRouteMetadata(pathname, brandName) {
  const route = ROUTE_DEFINITIONS.find((candidate) => candidate.path === pathname)
    ?? NOT_FOUND_METADATA

  return Object.freeze({
    ...route,
    documentTitle: route.id === 'home' ? brandName : `${route.title} | ${brandName}`,
  })
}

/**
 * Produces an intentional document title for every declared or wildcard route.
 *
 * @param {string} pathname The active location pathname.
 * @param {string} brandName The clinic brand name.
 * @returns {string} The route-specific document title.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
export function getRouteTitle(pathname, brandName) {
  return getRouteMetadata(pathname, brandName).documentTitle
}

/**
 * Reports whether a configured routed destination identifies the active page.
 * Hash recovery links remain useful without claiming page-level currency.
 *
 * @param {string} href The configured internal destination.
 * @param {string} pathname The active route pathname.
 * @returns {boolean} Whether the destination is the active page.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
export function isRouteActive(href, pathname) {
  const routePath = href.split('#')[0] || ROUTES.home
  return !href.includes('#') && routePath === pathname
}
