import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'
import { CLINIC_CONFIG } from '../config/clinic.js'
import { getRouteMetadata } from '../config/routes.js'

/**
 * Returns an existing metadata element or creates the missing declaration.
 * Route changes use it to keep document and social descriptions synchronized.
 *
 * @param {'name'|'property'} attributeName The metadata selector attribute.
 * @param {string} attributeValue The metadata selector value.
 * @returns {HTMLMetaElement} The metadata element owned by the active route.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
function ensureMetaElement(attributeName, attributeValue) {
  let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attributeName, attributeValue)
    document.head.append(element)
  }

  return element
}

/**
 * Synchronizes route metadata and moves scroll and keyboard focus after
 * client-side navigation. Initial document loads retain their native focus so
 * the skip link remains the first keyboard destination.
 *
 * @returns {null} This behavior component has no visual output.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
function RouteChangeEffects() {
  const { pathname, hash } = useLocation()
  const previousLocation = useRef(`${pathname}${hash}`)

  useEffect(() => {
    const metadata = getRouteMetadata(pathname, CLINIC_CONFIG.brand.name)
    document.title = metadata.documentTitle

    const metadataValues = [
      ['name', 'description', metadata.description],
      ['name', 'robots', metadata.indexable ? 'index, follow' : 'noindex, nofollow'],
      ['property', 'og:title', metadata.documentTitle],
      ['property', 'og:description', metadata.description],
      ['name', 'twitter:title', metadata.documentTitle],
      ['name', 'twitter:description', metadata.description],
    ]

    metadataValues.forEach(([attributeName, attributeValue, content]) => {
      ensureMetaElement(attributeName, attributeValue).setAttribute('content', content)
    })

    const locationKey = `${pathname}${hash}`
    const isClientNavigation = previousLocation.current !== locationKey
    previousLocation.current = locationKey

    if (!isClientNavigation && !hash) return undefined

    const frame = window.requestAnimationFrame(() => {
      const main = document.getElementById('main-content')
      const fragmentTarget = hash ? document.getElementById(hash.slice(1)) : null

      main?.focus({ preventScroll: true })
      if (fragmentTarget) {
        fragmentTarget.scrollIntoView({ behavior: 'auto', block: 'start' })
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      }
    })

    return () => window.cancelAnimationFrame(frame)
  }, [hash, pathname])

  return null
}

export default RouteChangeEffects
