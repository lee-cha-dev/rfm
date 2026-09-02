import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import HomePage from '../interfaces/HomePage.jsx'

describe('HomePage', () => {
  it('renders the Sprint 5 home-page sections through feature and base components', () => {
    render(<HomePage />)

    expect(
      screen.getByRole('heading', { level: 1, name: 'Your care should feel personal.' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content')
    expect(screen.getByRole('img', { name: "Ro's Family Medicine" })).toHaveAttribute(
      'src',
      '/assets/logos/ros-family-medicine-logo-header.png',
    )
    expect(screen.getByRole('region', { name: 'Quick clinic information' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Care for real life.' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'We take most major insurance carriers.' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Come see us.' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Questions should be easy to answer.' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Need to reach the clinic?' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Skip to main content' })).toHaveAttribute(
      'href',
      '#main-content',
    )

    const portalLinks = screen.getAllByRole('link', { name: 'Patient Portal', hidden: true })
    expect(portalLinks).toHaveLength(4)
    portalLinks.forEach((portal) => {
      expect(portal).toHaveAttribute('href', 'https://www.tebra.com/')
      expect(portal).toHaveAttribute('target', '_blank')
      expect(portal).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  it('does not retain Vite starter presentation', () => {
    render(<HomePage />)

    expect(screen.queryByText('Vite + React')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /count is/i })).not.toBeInTheDocument()
  })
})
