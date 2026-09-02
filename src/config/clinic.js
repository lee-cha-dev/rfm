import { ASSETS } from './assets.js'

/**
 * @typedef {object} ClinicLink
 * @property {string} id Stable link identifier.
 * @property {string} label Visible link label.
 * @property {string} href Route, fragment, or external destination.
 * @property {boolean} [external] Whether the link opens in a new browsing context.
 */

/**
 * @typedef {object} ClinicHoursEntry
 * @property {number} dayIndex JavaScript weekday index, Sunday through Saturday.
 * @property {string} day Display weekday name.
 * @property {string} hours Display hours or "Closed".
 */

/**
 * @typedef {object} ClinicConfig
 * @property {{name: string, tagline: readonly string[]}} brand Clinic identity.
 * @property {{primary: readonly ClinicLink[], footer: readonly ClinicLink[], portal: ClinicLink}} navigation Shared links.
 * @property {{phone: {display: string, href: string}, address: {display: string, mapsQuery: string}}} contact Public contact details.
 * @property {{about: object, services: object, insurance: object, hours: object, faq: object, contact: object}} homeSections Home-page section copy and media choices.
 * @property {{about: object, faq: object, privacy: object}} pageContent Dedicated-route introduction and privacy-resource copy.
 * @property {readonly ClinicHoursEntry[]} weeklyHours Seven daily schedule entries.
 * @property {readonly {id: string, label: string, items: readonly string[]}[]} services Service groups.
 * @property {readonly string[]} insuranceCarriers Accepted carrier names.
 * @property {readonly {id: string, question: string, answer: string}[]} faqs Patient questions.
 * @property {readonly {id: string, label: string, faqIds: readonly string[]}[]} faqCategories Patient-question groups.
 * @property {readonly string[]} contactReasons Public form choices.
 * @property {{reviewDate: string, fields: Record<string, 'confirmed'|'unresolved'>}} verification Owner-review state for release-sensitive content.
 * @property {typeof ASSETS} assets Runtime image metadata.
 */

export const VERIFICATION_FIELDS = [
  'phone',
  'address',
  'weeklyHours',
  'insuranceCarriers',
  'newPatientStatus',
  'portalUrl',
  'directionsBehavior',
  'clinicalClaims',
  'privacyLanguage',
  'destinationLinks',
]

const ABOUT_LINK = { id: 'about', label: 'About', href: '/about' }
const FAQ_LINK = { id: 'faq', label: 'FAQ', href: '/faq' }
const PRIVACY_LINK = { id: 'privacy', label: 'Privacy', href: '/privacy' }

const PRIMARY_NAVIGATION = [ABOUT_LINK, FAQ_LINK, PRIVACY_LINK]

const PORTAL_LINK = {
  id: 'portal',
  label: 'Patient Portal',
  href: 'https://www.tebra.com/',
  external: true,
}

/** @type {ClinicConfig} */
const DEFAULTS = {
  brand: {
    name: "Ro's Family Medicine",
    tagline: ['Your Health.', 'Your Story.', 'Our Focus.'],
  },
  navigation: {
    primary: PRIMARY_NAVIGATION,
    footer: [
      ABOUT_LINK,
      FAQ_LINK,
      PRIVACY_LINK,
      PORTAL_LINK,
    ],
    portal: PORTAL_LINK,
  },
  contact: {
    phone: { display: '(479) 555-0142', href: '+14795550142' },
    address: {
      display: "1898 Hunter's Ridge, Fayetteville, AR 72701",
      mapsQuery: "1898 Hunter's Ridge, Fayetteville, AR 72701",
    },
  },
  homeSections: {
    about: {
      eyebrow: 'A familiar clinic in Fayetteville',
      heading: 'Your story belongs in the room.',
      lede: 'A useful appointment begins with listening. Tell us what changed, what you have tried, what worries you, and what you need from the visit.',
      body: 'Family medicine works best when care builds over time. Seeing the same clinic for a wellness visit or a stubborn cough helps put today’s concern in context. So do the questions that come up between visits.',
      quote: '“Your Health. Your Story. Our Focus.” means we listen before we make a plan.',
      link: { id: 'meet-practice', label: 'Meet the practice →', href: '/about' },
      photos: [
        {
          id: 'clinic-front',
          assetKey: 'clinicFront',
          alt: 'Exterior view of the clinic entrance',
        },
        {
          id: 'waiting-room',
          assetKey: 'waitingRoom',
          alt: 'Warm seating area inside the clinic',
        },
      ],
    },
    services: {
      eyebrow: 'How we care for you',
      heading: 'Care through every stage.',
      lede: 'Come in for routine care or an illness that caught you off guard. We also help manage conditions that need attention over time, with a plan built for the life you are actually living.',
    },
    insurance: {
      eyebrow: 'Insurances Accepted',
      heading: 'We take most major insurance carriers.',
      lede: "Don't see yours? Call the office and we'll verify your coverage before you book.",
      matrixLabel: 'Accepted Insurances',
      matrixNote: 'Coverage varies by plan',
    },
    hours: {
      eyebrow: 'Hours & location',
      heading: 'Plan your visit.',
      body: 'Check the schedule before you plan the drive to our Fayetteville clinic. Around holidays or bad-weather days, please call before heading over.',
      scheduleLabel: 'Clinic hours',
      scheduleNote: 'Hours are subject to change.',
      directionsLabel: 'Get directions',
      contactLabel: 'Contact clinic',
    },
    faq: {
      eyebrow: 'Before your visit',
      heading: 'A few things patients ask us.',
      lede: 'Appointments come with practical questions. Check these answers before you grab your keys, then visit the full FAQ page when you need more detail.',
      link: { id: 'all-questions', label: 'View all patient questions →', href: '/faq' },
    },
    contact: {
      eyebrow: 'Contact Us',
      heading: 'Need to reach the clinic?',
      body: 'For appointments, call the clinic. Use the secure Patient Portal for medical questions or private details. The form beside this note is only a website preview. It does not contact the office.',
      localOnlyNotice: 'This preview form checks entries only in this browser. It does not send a message to the clinic.',
      privacyWarning: 'Please do not include private medical information.',
      privacyDetail: 'This public form is not a secure patient-messaging channel and should not be used for urgent medical concerns.',
      submitLabel: 'Send message',
      localAcknowledgement: 'Your entry passed the local checks, but nothing was sent or saved. Please call the clinic or use the secure Patient Portal to get in touch.',
    },
  },
  pageContent: {
    about: {
      eyebrow: 'Our mission',
      heading: 'Listen closely. Care personally.',
      lede: 'We give each patient time to be heard and explain their care in plain language.',
    },
    faq: {
      eyebrow: 'Patient questions',
      heading: 'Straight answers before the appointment.',
      lede: 'Start here for first-visit guidance, portal access, and the insurance information currently available in this preview.',
    },
    privacy: {
      eyebrow: 'Privacy',
      heading: 'Privacy, the portal, and your records.',
      lede: 'Tebra runs the patient portal. Its policies cover information handled inside that platform; the clinic’s own Notice of Privacy Practices covers how the practice may use and share protected health information.',
      websiteNotice: 'Please do not put medical details in the public website form. It only checks fields in your browser, and nothing is sent or saved.',
      portalNotice: 'Use the Tebra Patient Portal for patient communication. Tebra says information provided through its platform may be protected health information and is handled under federal and state law plus its agreement with the healthcare provider.',
      clinicNotice: 'Ro’s Family Medicine has not supplied its approved Notice of Privacy Practices for this preview. HHS requires a HIPAA-covered provider with a website to post its current notice there, so this page cannot stand in for the clinic’s signed policy.',
      resources: [
        {
          id: 'tebra-platform-privacy',
          label: 'Tebra Platform Privacy Policy',
          href: 'https://www.tebra.com/platform-privacy-policy',
          description: 'Covers the EHR, Patient Portal, telehealth, billing, and related Tebra platform services.',
        },
        {
          id: 'tebra-portal-terms',
          label: 'Tebra Patient Portal Terms of Service',
          href: 'https://www.tebra.com/patient-portal-terms-service',
          description: 'Explains portal use, account responsibilities, patient information, and limits of the service.',
        },
        {
          id: 'tebra-security',
          label: 'Tebra Security Notice',
          href: 'https://www.tebra.com/security-notice',
          description: 'Describes sign-in controls, encryption, role-based access, and other platform safeguards.',
        },
        {
          id: 'tebra-baa',
          label: 'Tebra Business Associate Agreement',
          href: 'https://www.tebra.com/business-associate-agreement',
          description: 'Sets the HIPAA terms between Tebra and a healthcare customer when Tebra handles protected health information.',
        },
        {
          id: 'hhs-privacy-notice',
          label: 'HHS Notice of Privacy Practices guidance',
          href: 'https://www.hhs.gov/hipaa/for-individuals/notice-privacy-practices/index.html',
          description: 'Explains what a provider’s clinic-specific notice must tell patients and where that notice must be available.',
        },
      ],
    },
  },
  weeklyHours: [
    { dayIndex: 0, day: 'Sunday', hours: 'Closed' },
    { dayIndex: 1, day: 'Monday', hours: '8:00 AM — 5:00 PM' },
    { dayIndex: 2, day: 'Tuesday', hours: '8:00 AM — 5:00 PM' },
    { dayIndex: 3, day: 'Wednesday', hours: '8:00 AM — 5:00 PM' },
    { dayIndex: 4, day: 'Thursday', hours: '8:00 AM — 5:00 PM' },
    { dayIndex: 5, day: 'Friday', hours: '8:00 AM — 5:00 PM' },
    { dayIndex: 6, day: 'Saturday', hours: 'Closed' },
  ],
  services: [
    {
      id: 'preventive-care',
      label: 'Preventive care',
      items: [
        'Annual physicals & wellness visits',
        'Immunizations & vaccines',
        'Preventive screenings & lab work',
      ],
    },
    {
      id: 'everyday-care',
      label: 'Everyday care',
      items: [
        'Sick visits & minor injuries',
        'Chronic condition management',
        'School, sports, work, and DOT physicals',
      ],
    },
    {
      id: 'family-care',
      label: 'Family care',
      items: ["Women’s health", "Men’s health", 'Pediatric & adolescent care'],
    },
  ],
  insuranceCarriers: [
    'Aetna',
    'Cigna',
    'Humana',
    'Medicare',
    'Medicaid',
    'Centene Plans',
    'UnitedHealthcare',
    'Blue Cross Blue Shield',
  ],
  faqs: [
    {
      id: 'new-patients',
      question: 'Are you accepting new patients?',
      answer: 'New-patient availability can change. Call the clinic before choosing us as your primary care office, and staff can tell you what appointments are open and what information they need.',
    },
    {
      id: 'first-visit',
      question: 'What should I bring to my first visit?',
      answer: 'Bring a photo ID, your current insurance card, and a complete list of the prescription medicines, over-the-counter medicines, vitamins, and supplements you take. Add the dose when you know it, along with any records or forms the clinic asked you to complete.',
    },
    {
      id: 'patient-portal',
      question: 'How do I access the Patient Portal?',
      answer: 'Use the Patient Portal link on this site to reach the clinic’s Tebra portal. Sign in there for secure patient communication, and keep medical details out of the public contact form.',
    },
    {
      id: 'insurance-payment',
      question: 'Where can I find insurance and payment information?',
      answer: 'The insurance section on the home page lists the carriers currently shown for the clinic. Networks can vary by plan, so call the number on your insurance card and the clinic before your appointment to confirm coverage and ask about your expected cost.',
    },
    {
      id: 'prescription-refills',
      question: 'How do I request a prescription refill?',
      answer: 'Contact your pharmacy before you run out and ask it to send the clinic a refill request. Some medicines may require an appointment or monitoring before another refill; the clinic will let you know if anything else is needed.',
    },
    {
      id: 'test-results',
      question: 'How will I receive my test results?',
      answer: 'Ask how and when to expect your results when a test is ordered. If that time passes and you have not heard from the clinic, check the Patient Portal or call. A missing message does not mean the result was normal.',
    },
  ],
  faqCategories: [
    { id: 'getting-started', label: 'Getting started', faqIds: ['new-patients', 'first-visit'] },
    {
      id: 'patient-resources',
      label: 'Patient resources',
      faqIds: ['patient-portal', 'insurance-payment', 'prescription-refills', 'test-results'],
    },
  ],
  contactReasons: [
    'General question',
    'New patient question',
    'Website / administrative question',
  ],
  verification: {
    reviewDate: '2026-09-02',
    fields: {
      phone: 'unresolved',
      address: 'unresolved',
      weeklyHours: 'unresolved',
      insuranceCarriers: 'unresolved',
      newPatientStatus: 'unresolved',
      portalUrl: 'unresolved',
      directionsBehavior: 'unresolved',
      clinicalClaims: 'unresolved',
      privacyLanguage: 'unresolved',
      destinationLinks: 'unresolved',
    },
  },
  assets: ASSETS,
}

/**
 * Recursively freezes clinic data so sections cannot accidentally mutate the
 * shared source of truth during rendering.
 *
 * @template T
 * @param {T} value The object or primitive to protect.
 * @returns {Readonly<T>} The deeply frozen value.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
function deepFreeze(value) {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.values(value).forEach(deepFreeze)
    Object.freeze(value)
  }

  return value
}

/**
 * Checks a value for non-empty display/configuration text.
 * It supports concise validators without coercing malformed clinic data.
 *
 * @param {unknown} value The candidate value.
 * @returns {value is string} Whether usable text was supplied.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
function isText(value) {
  return typeof value === 'string' && value.trim().length > 0
}

/**
 * Validates the clinic configuration contract before hooks or sections use it.
 * The returned messages are deterministic for tests and can be surfaced as
 * development warnings without breaking production rendering.
 *
 * @param {unknown} candidate The configuration to inspect.
 * @returns {string[]} Contract violations using stable property paths.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
export function validateClinicConfig(candidate) {
  const issues = []
  const config = candidate && typeof candidate === 'object' ? candidate : {}

  if (!isText(config.brand?.name)) issues.push('brand.name must be non-empty text')
  if (!Array.isArray(config.brand?.tagline) || config.brand.tagline.length !== 3 || !config.brand.tagline.every(isText)) {
    issues.push('brand.tagline must contain three non-empty lines')
  }

  for (const group of ['primary', 'footer']) {
    const links = config.navigation?.[group]
    if (!Array.isArray(links) || links.length === 0 || !links.every((link) => isText(link?.id) && isText(link?.label) && isText(link?.href))) {
      issues.push(`navigation.${group} must contain valid links`)
    }
  }

  if (!isText(config.navigation?.portal?.href)) issues.push('navigation.portal.href must be non-empty text')
  if (!isText(config.contact?.phone?.display)) issues.push('contact.phone.display must be non-empty text')
  if (!/^\+\d{7,15}$/.test(config.contact?.phone?.href ?? '')) issues.push('contact.phone.href must use international digits')
  if (!isText(config.contact?.address?.display)) issues.push('contact.address.display must be non-empty text')
  if (!isText(config.contact?.address?.mapsQuery)) issues.push('contact.address.mapsQuery must be non-empty text')

  const about = config.homeSections?.about
  const validAboutCopy = ['eyebrow', 'heading', 'lede', 'body', 'quote'].every((field) => isText(about?.[field]))
  const validAboutLink = isText(about?.link?.id) && isText(about?.link?.label) && isText(about?.link?.href)
  const validAboutPhotos = Array.isArray(about?.photos)
    && about.photos.length === 2
    && about.photos.every((photo) => (
      isText(photo?.id)
      && isText(photo?.assetKey)
      && isText(photo?.alt)
      && Boolean(config.assets?.photos?.[photo.assetKey])
    ))
  if (!validAboutCopy || !validAboutLink || !validAboutPhotos) {
    issues.push('homeSections.about must contain complete copy, link, and two valid photos')
  }

  for (const sectionName of ['services', 'insurance', 'faq']) {
    const section = config.homeSections?.[sectionName]
    if (!['eyebrow', 'heading', 'lede'].every((field) => isText(section?.[field]))) {
      issues.push(`homeSections.${sectionName} must contain complete heading copy`)
    }
  }

  if (!isText(config.homeSections?.insurance?.matrixLabel) || !isText(config.homeSections?.insurance?.matrixNote)) {
    issues.push('homeSections.insurance must contain matrix labels')
  }

  const hoursSection = config.homeSections?.hours
  if (!['eyebrow', 'heading', 'body', 'scheduleLabel', 'scheduleNote', 'directionsLabel', 'contactLabel'].every((field) => isText(hoursSection?.[field]))) {
    issues.push('homeSections.hours must contain complete copy and action labels')
  }

  const faqLink = config.homeSections?.faq?.link
  if (!isText(faqLink?.id) || !isText(faqLink?.label) || !isText(faqLink?.href)) {
    issues.push('homeSections.faq must contain a valid link')
  }

  const contactSection = config.homeSections?.contact
  if (!['eyebrow', 'heading', 'body', 'localOnlyNotice', 'privacyWarning', 'privacyDetail', 'submitLabel', 'localAcknowledgement'].every((field) => isText(contactSection?.[field]))) {
    issues.push('homeSections.contact must contain complete form and privacy copy')
  }

  for (const pageName of ['about', 'faq']) {
    const page = config.pageContent?.[pageName]
    if (!['eyebrow', 'heading', 'lede'].every((field) => isText(page?.[field]))) {
      issues.push(`pageContent.${pageName} must contain complete introduction copy`)
    }
  }

  const privacyPage = config.pageContent?.privacy
  const validPrivacyResources = Array.isArray(privacyPage?.resources)
    && privacyPage.resources.length > 0
    && privacyPage.resources.every((resource) => (
      isText(resource?.id)
      && isText(resource?.label)
      && /^https:\/\//.test(resource?.href ?? '')
      && isText(resource?.description)
    ))
  if (!['eyebrow', 'heading', 'lede', 'websiteNotice', 'portalNotice', 'clinicNotice'].every((field) => isText(privacyPage?.[field])) || !validPrivacyResources) {
    issues.push('pageContent.privacy must contain complete notices and external resources')
  }

  const hours = config.weeklyHours
  const validHours = Array.isArray(hours)
    && hours.length === 7
    && hours.every((entry, index) => entry?.dayIndex === index && isText(entry.day) && isText(entry.hours))
  if (!validHours) issues.push('weeklyHours must contain ordered entries for day indexes 0 through 6')

  const validServices = Array.isArray(config.services)
    && config.services.length > 0
    && config.services.every((group) => isText(group?.id) && isText(group?.label) && Array.isArray(group?.items) && group.items.length > 0 && group.items.every(isText))
  if (!validServices) issues.push('services must contain valid labeled groups')

  if (!Array.isArray(config.insuranceCarriers) || config.insuranceCarriers.length === 0 || !config.insuranceCarriers.every(isText)) {
    issues.push('insuranceCarriers must contain non-empty names')
  }

  const validFaqs = Array.isArray(config.faqs)
    && config.faqs.length > 0
    && config.faqs.every((faq) => isText(faq?.id) && isText(faq?.question) && isText(faq?.answer))
  if (!validFaqs) issues.push('faqs must contain valid questions and answers')

  const faqIds = new Set(Array.isArray(config.faqs) ? config.faqs.map((faq) => faq?.id) : [])
  const categorizedFaqIds = Array.isArray(config.faqCategories)
    ? config.faqCategories.flatMap((category) => category?.faqIds ?? [])
    : []
  const validFaqCategories = Array.isArray(config.faqCategories)
    && config.faqCategories.length > 0
    && config.faqCategories.every((category) => (
      isText(category?.id)
      && isText(category?.label)
      && Array.isArray(category?.faqIds)
      && category.faqIds.length > 0
      && category.faqIds.every((faqId) => faqIds.has(faqId))
    ))
    && categorizedFaqIds.length === faqIds.size
    && new Set(categorizedFaqIds).size === faqIds.size
  if (!validFaqCategories) issues.push('faqCategories must categorize every FAQ exactly once')

  if (!Array.isArray(config.contactReasons) || config.contactReasons.length === 0 || !config.contactReasons.every(isText)) {
    issues.push('contactReasons must contain non-empty choices')
  }

  const verification = config.verification
  const validVerification = isText(verification?.reviewDate)
    && VERIFICATION_FIELDS.every((field) => ['confirmed', 'unresolved'].includes(verification?.fields?.[field]))
  if (!validVerification) issues.push('verification must record every release-sensitive field')

  if (!config.assets?.logos || !config.assets?.photos) issues.push('assets must contain logo and photo manifests')

  return issues
}

/**
 * Creates an immutable clinic configuration and falls back atomically when an
 * override violates the public contract. It is used at module startup and by
 * tests that protect future CMS or environment-backed configuration work.
 *
 * @param {unknown} [candidate] A complete candidate configuration.
 * @param {object} [options] Development diagnostics.
 * @param {boolean} [options.warn] Whether validation failures should warn.
 * @returns {Readonly<ClinicConfig>} Valid configuration safe for consumers.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
export function createClinicConfig(candidate = DEFAULTS, { warn = false } = {}) {
  const issues = validateClinicConfig(candidate)

  if (issues.length > 0) {
    if (warn) console.warn(`Invalid clinic configuration; using defaults. ${issues.join('; ')}`)
    return deepFreeze(structuredClone(DEFAULTS))
  }

  return deepFreeze(structuredClone(candidate))
}

/**
 * Supplies the single validated content source consumed by clinic hooks and
 * rendered sections throughout the application.
 *
 * @type {Readonly<ClinicConfig>}
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
export const CLINIC_CONFIG = createClinicConfig(DEFAULTS, { warn: import.meta.env.DEV })

/**
 * Reports whether the clinic owner has confirmed one release-sensitive field.
 * Sprint 12 can use this gate while replacing prototype values after SME sign-off.
 *
 * @param {Readonly<ClinicConfig>} clinic The validated clinic configuration.
 * @param {string} field A key from VERIFICATION_FIELDS.
 * @returns {boolean} Whether the field is confirmed for public presentation.
 * @author Lee Charles
 * @since 20260902
 * @company Lazy Software
 */
export function isClinicContentConfirmed(clinic, field) {
  return clinic.verification.fields[field] === 'confirmed'
}
