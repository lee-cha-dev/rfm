import { useEffect, useRef, useState } from 'react'
import { Button, Form, FormField, Heading, Layout, Link, Section, Shell, Text } from './base/index.js'
import './ContactSection.css'

const EMPTY_VALUES = {
  name: '',
  phone: '',
  email: '',
  reason: '',
  message: '',
}

/**
 * Validates public contact fields without transmitting or persisting their
 * values. A phone or email is required so the local review remains useful.
 *
 * @param {typeof EMPTY_VALUES} values Current controlled values.
 * @returns {Record<string, string>} Field-specific validation messages.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
function validateContactValues(values) {
  const errors = {}
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const phoneDigits = values.phone.replace(/\D/g, '')

  if (!values.name.trim()) errors.name = 'Enter your name.'
  if (!values.phone.trim() && !values.email.trim()) {
    errors.phone = 'Enter a phone number or email address.'
    errors.email = 'Enter an email address or phone number.'
  } else {
    if (values.phone.trim() && phoneDigits.length < 7) errors.phone = 'Enter a complete phone number.'
    if (values.email.trim() && !emailPattern.test(values.email.trim())) errors.email = 'Enter a valid email address.'
  }
  if (!values.message.trim()) errors.message = 'Enter a message for the local review.'

  return errors
}

/**
 * Presents the public contact guidance and a controlled, front-end-only form.
 * Successful submission is only a local acknowledgement and never implies
 * delivery, storage, analytics capture, or a backend dependency.
 *
 * @param {object} props The contact-section properties.
 * @param {Readonly<import('../config/clinic.js').ClinicConfig>} props.clinic The validated clinic configuration.
 * @returns {import('react').JSX.Element} The home-page contact section.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
function ContactSection({ clinic }) {
  const content = clinic.homeSections.contact
  const formRef = useRef(null)
  const shouldFocusErrorRef = useRef(false)
  const [values, setValues] = useState(() => ({
    ...EMPTY_VALUES,
    reason: clinic.contactReasons[0],
  }))
  const [errors, setErrors] = useState({})
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    if (!shouldFocusErrorRef.current || Object.keys(errors).length === 0) return

    formRef.current?.querySelector('[aria-invalid="true"]')?.focus()
    shouldFocusErrorRef.current = false
  }, [errors])

  function handleChange(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
    setFeedback('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validateContactValues(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      shouldFocusErrorRef.current = true
      setFeedback('Please correct the highlighted fields. Nothing was sent.')
      return
    }

    setFeedback(content.localAcknowledgement)
  }

  return (
    <Section id="contact" ariaLabelledby="contact-heading" variant="flush" className="contact-section">
      <Shell>
        <Layout variant="grid" className="contact-section__wrap">
          <Layout className="contact-section__intro">
            <Text variant="eyebrow">{content.eyebrow}</Text>
            <Heading level={2} id="contact-heading">{content.heading}</Heading>
            <Text>{content.body}</Text>
            <Link href={`tel:${clinic.contact.phone.href}`} className="contact-section__phone">
              {clinic.contact.phone.display}
            </Link>
            <Link href={clinic.navigation.portal.href} external className="contact-section__portal">
              {clinic.navigation.portal.label}
            </Link>
          </Layout>
          <Form
            onSubmit={handleSubmit}
            noValidate
            ariaLabel="Contact clinic"
            elementRef={formRef}
            className="contact-section__form"
          >
            <Text className="contact-section__local-notice">{content.localOnlyNotice}</Text>
            <Layout variant="grid" className="contact-section__field-grid">
              <FormField
                id="contact-name"
                name="name"
                label="Name"
                autoComplete="name"
                required
                value={values.name}
                onChange={handleChange}
                error={errors.name}
              />
              <FormField
                id="contact-phone"
                name="phone"
                label="Phone"
                control="tel"
                autoComplete="tel"
                value={values.phone}
                onChange={handleChange}
                error={errors.phone}
              />
              <FormField
                id="contact-email"
                name="email"
                label="Email"
                control="email"
                autoComplete="email"
                value={values.email}
                onChange={handleChange}
                error={errors.email}
              />
              <FormField
                id="contact-reason"
                name="reason"
                label="Reason for contact"
                control="select"
                autoComplete="off"
                options={clinic.contactReasons}
                value={values.reason}
                onChange={handleChange}
              />
            </Layout>
            <FormField
              id="contact-message"
              name="message"
              label="Message"
              control="textarea"
              autoComplete="off"
              required
              value={values.message}
              onChange={handleChange}
              error={errors.message}
              className="contact-section__message"
            />
            <Text variant="note" className="contact-section__privacy">
              <Text as="strong" variant="note">{content.privacyWarning}</Text>{' '}
              {content.privacyDetail}
            </Text>
            <Button type="submit">{content.submitLabel}</Button>
            <Text
              role="status"
              ariaLive="polite"
              className="contact-section__feedback"
            >
              {feedback}
            </Text>
          </Form>
        </Layout>
      </Shell>
    </Section>
  )
}

export default ContactSection
