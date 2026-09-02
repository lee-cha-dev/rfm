import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { CLINIC_CONFIG } from '../config/clinic.js'
import { getRouteMetadata } from '../config/routes.js'

/**
 * Moves scroll and keyboard focus to the shared main landmark after a route
 * change. SiteLayout consumes it so client-side navigation behaves like a new
 * document for sighted keyboard and screen-reader users.
 *
 * @returns {null} This behavior component has no visual output.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
function RouteChangeEffects() {
  const { pathname } = useLocation()

  useEffect(() => {
    const metadata = getRouteMetadata(pathname, CLINIC_CONFIG.brand.name)
    document.title = metadata.documentTitle
    let descriptionElement = document.querySelector('meta[name="description"]')
    if (!descriptionElement) {
      descriptionElement = document.createElement('meta')
      descriptionElement.setAttribute('name', 'description')
      document.head.append(descriptionElement)
    }
    descriptionElement.setAttribute('content', metadata.description)
    const frame = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      document.getElementById('main-content')?.focus({ preventScroll: true })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [pathname])

  return null
}

export default RouteChangeEffects
