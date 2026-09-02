import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import {
  Button,
  Disclosure,
  Figure,
  Footer,
  Form,
  FormField,
  Header,
  Heading,
  Image,
  Layout,
  Link,
  List,
  Main,
  Navigation,
  Page,
  Section,
  Shell,
  Text,
} from '../components/base/index.js'

describe('base component system', () => {
  it('composes labeled page landmarks and shared layout without losing semantics', () => {
    render(
      <Page>
        <Header>
          <Navigation ariaLabel="Primary navigation">
            <Link href="#care">Care</Link>
          </Navigation>
        </Header>
        <Main>
          <Section ariaLabelledby="care-heading" id="care">
            <Shell>
              <Layout variant="stack" ariaLabel="Care introduction">
                <Text variant="eyebrow">Clinic care</Text>
                <Heading level={1} variant="display" id="care-heading">Care that listens</Heading>
              </Layout>
            </Shell>
          </Section>
        </Main>
        <Footer>Clinic footer</Footer>
      </Page>,
    )

    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toBeInTheDocument()
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content')
    expect(screen.getByRole('region', { name: 'Care that listens' })).toHaveAttribute('id', 'care')
    expect(screen.getByRole('heading', { level: 1 })).toHaveClass('heading--display')
    expect(screen.getByRole('contentinfo')).toHaveTextContent('Clinic footer')
  })

  it('hardens external links and preserves button native behavior', () => {
    const handleClick = vi.fn()
    render(
      <Layout variant="actions">
        <Link href="https://www.tebra.com/" variant="primary" external>Patient Portal</Link>
        <Button ariaLabel="Open menu" ariaControls="mobile-nav" ariaExpanded={false} onClick={handleClick}>
          Menu
        </Button>
      </Layout>,
    )

    const portal = screen.getByRole('link', { name: 'Patient Portal' })
    expect(portal).toHaveAttribute('target', '_blank')
    expect(portal).toHaveAttribute('rel', 'noopener noreferrer')

    const menu = screen.getByRole('button', { name: 'Open menu' })
    expect(menu).toHaveAttribute('type', 'button')
    expect(menu).toHaveAttribute('aria-controls', 'mobile-nav')
    expect(menu).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(menu)
    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('renders accessible media, list, disclosure, and form-control structures', () => {
    render(
      <Layout>
        <Figure caption="Clinic entrance">
          <Image src="/clinic.jpg" alt="Exterior view" width={800} height={600} />
        </Figure>
        <List ariaLabel="Accepted plans" variant="matrix" items={['Aetna', 'Cigna']} />
        <Disclosure summary="What should I bring?">
          <Text>Identification and insurance information.</Text>
        </Disclosure>
        <Form ariaLabel="Contact clinic">
          <FormField id="patient-name" label="Name" autoComplete="name" required />
          <FormField id="patient-phone" label="Phone" control="tel" />
          <FormField id="reason" label="Reason" control="select" options={['General question', 'New patient question']} />
          <FormField id="message" label="Message" control="textarea" hint="Do not include private medical information." />
          <Button type="submit">Send message</Button>
        </Form>
      </Layout>,
    )

    expect(screen.getByRole('img', { name: 'Exterior view' })).toHaveAttribute('width', '800')
    expect(screen.getByText('Clinic entrance')).toBeInTheDocument()
    expect(screen.getByRole('list', { name: 'Accepted plans' })).toHaveClass('list--matrix')
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
    expect(screen.getByText('What should I bring?').closest('details')).not.toHaveAttribute('open')
    expect(screen.getByRole('form', { name: 'Contact clinic' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Name' })).toBeRequired()
    expect(screen.getByRole('textbox', { name: 'Phone' })).toHaveAttribute('inputmode', 'tel')
    expect(screen.getByRole('combobox', { name: 'Reason' })).toHaveValue('General question')
    expect(screen.getByRole('textbox', { name: 'Message' })).toHaveAccessibleDescription('Do not include private medical information.')
    expect(screen.getByRole('button', { name: 'Send message' })).toHaveAttribute('type', 'submit')
  })
})
