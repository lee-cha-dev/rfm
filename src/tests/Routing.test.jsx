import { fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import App from '../App.jsx'
import { CLINIC_CONFIG } from '../config/clinic.js'
import { EMPLOYEES } from '../config/employees.js'
import { ROUTE_DEFINITIONS } from '../config/routes.js'

/**
 * Renders the declarative route table at one direct request path. Sprint 8
 * routing tests use it to exercise the same App consumed by BrowserRouter.
 *
 * @param {string} path The initial memory-history entry.
 * @returns {import('@testing-library/react').RenderResult} The rendered route.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
function renderRoute(path) {
  return render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>)
}

describe('application routing', () => {
  const dedicatedRoutes = ROUTE_DEFINITIONS.filter((route) => route.id !== 'home')

  it.each(dedicatedRoutes)('renders $path directly with intentional metadata', (route) => {
    renderRoute(route.path)

    expect(screen.getByRole('heading', {
      level: 1,
      name: CLINIC_CONFIG.pageContent[route.id].heading,
    })).toBeInTheDocument()
    expect(document.title).toBe(`${route.title} | Ro's Family Medicine`)
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      'content',
      route.description,
    )
    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'index, follow')
    expect(document.querySelector('meta[property="og:title"]')).toHaveAttribute(
      'content',
      `${route.title} | Ro's Family Medicine`,
    )
    expect(document.querySelector('meta[property="og:description"]')).toHaveAttribute(
      'content',
      route.description,
    )
    expect(document.querySelector('meta[name="twitter:title"]')).toHaveAttribute(
      'content',
      `${route.title} | Ro's Family Medicine`,
    )
    expect(document.querySelector('meta[name="twitter:description"]')).toHaveAttribute(
      'content',
      route.description,
    )
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('keeps the shared layout mounted during client-side navigation', () => {
    renderRoute('/')
    const header = screen.getByRole('banner')
    const footer = screen.getByRole('contentinfo')
    const privacyLink = within(
      screen.getByRole('navigation', { name: 'Footer navigation' }),
    ).getByRole('link', { name: 'Privacy' })

    fireEvent.click(privacyLink)

    expect(screen.getByRole('heading', {
      level: 1,
      name: CLINIC_CONFIG.pageContent.privacy.heading,
    })).toBeInTheDocument()
    expect(screen.getByRole('banner')).toBe(header)
    expect(screen.getByRole('contentinfo')).toBe(footer)
  })

  it('moves scroll and focus to main after changing routes', () => {
    renderRoute('/')
    const privacyLink = within(
      screen.getByRole('navigation', { name: 'Footer navigation' }),
    ).getByRole('link', { name: 'Privacy' })

    fireEvent.click(privacyLink)

    expect(window.scrollTo).toHaveBeenLastCalledWith({ top: 0, left: 0, behavior: 'auto' })
    expect(screen.getByRole('main')).toHaveFocus()
  })

  it('preserves native initial focus so the skip link remains first in tab order', () => {
    renderRoute('/')

    expect(screen.getByRole('main')).not.toHaveFocus()
    expect(window.scrollTo).not.toHaveBeenCalled()
  })

  it('scrolls recovery fragment links to their rendered Home target', () => {
    renderRoute('/missing')

    fireEvent.click(screen.getByRole('link', { name: 'Contact' }))

    expect(document.getElementById('contact').scrollIntoView).toHaveBeenCalledWith({
      behavior: 'auto',
      block: 'start',
    })
    expect(screen.getByRole('main')).toHaveFocus()
  })

  it('renders an intentional wildcard 404 inside the shared layout', () => {
    renderRoute('/not-a-declared-route')

    expect(screen.getByRole('heading', { level: 1, name: 'Page Not Found' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Try again' })).not.toBeInTheDocument()
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    expect(document.title).toBe("Page Not Found | Ro's Family Medicine")
    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow')
  })

  it('renders all categorized FAQs from shared configuration', () => {
    renderRoute('/faq')

    CLINIC_CONFIG.faqCategories.forEach(({ label }) => {
      expect(screen.getByRole('heading', { level: 2, name: label })).toBeInTheDocument()
    })
    CLINIC_CONFIG.faqs.forEach(({ question }) => {
      expect(screen.getByText(question)).toBeInTheDocument()
    })
  })

  it('renders the About roster from employee configuration without repeating the home story', () => {
    renderRoute('/about')

    expect(screen.getByRole('heading', { level: 2, name: 'Mission Statement' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'Vision Statement' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'Core Values' })).toBeInTheDocument()
    const coreValues = screen.getByRole('list', { name: 'Core values' })
    CLINIC_CONFIG.pageContent.about.coreValues.items.forEach((value) => {
      expect(within(coreValues).getByText(value.name)).toBeInTheDocument()
      expect(within(coreValues).getByText(value.description)).toBeInTheDocument()
    })
    expect(screen.getByRole('heading', { level: 2, name: 'Meet the practice' })).toBeInTheDocument()
    const employeeHeadings = screen.getAllByRole('heading', { level: 3 })
    expect(employeeHeadings).toHaveLength(EMPLOYEES.length)
    expect(new Set(EMPLOYEES.map(({ id }) => id)).size).toBe(EMPLOYEES.length)

    EMPLOYEES.forEach((employee, index) => {
      const employeeRow = employeeHeadings[index].closest('.practice-team__employee')

      expect(employeeHeadings[index]).toHaveTextContent(employee.name)
      expect(within(employeeRow).getByText(employee.role)).toBeInTheDocument()
      expect(within(employeeRow).getByRole('img', { name: employee.photoAlt })).toHaveAttribute('src', employee.photo.src)
    })
    expect(screen.queryByRole('heading', {
      name: CLINIC_CONFIG.homeSections.about.heading,
    })).not.toBeInTheDocument()
  })

  it('identifies the current route in desktop, mobile, and footer navigation', () => {
    renderRoute('/faq')

    const primaryNavigation = screen.getByRole('navigation', {
      name: 'Primary navigation',
      hidden: true,
    })
    const mobileNavigation = document.getElementById('mobile-navigation')
    const footerNavigation = screen.getByRole('navigation', { name: 'Footer navigation' })

    expect(within(primaryNavigation).getByRole('link', { name: 'FAQ' })).toHaveAttribute('aria-current', 'page')
    expect(within(mobileNavigation).getByRole('link', { name: 'FAQ', hidden: true })).toHaveAttribute('aria-current', 'page')
    expect(within(footerNavigation).getByRole('link', { name: 'FAQ' })).toHaveAttribute('aria-current', 'page')
    expect(within(primaryNavigation).getByRole('link', { name: 'About' })).not.toHaveAttribute('aria-current')
  })

  it.each(['/services', '/hours'])('treats the removed %s page as not found', (path) => {
    renderRoute(path)

    expect(screen.getByRole('heading', { level: 1, name: 'Page Not Found' })).toBeInTheDocument()
  })

  it('links to Tebra and HHS source policies from the privacy route', () => {
    renderRoute('/privacy')

    CLINIC_CONFIG.pageContent.privacy.resources.forEach((resource) => {
      expect(screen.getByRole('link', { name: resource.label })).toHaveAttribute('href', resource.href)
    })
  })
})
