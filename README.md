# Ro's Family Medicine

A Vite 6 and React 19 conversion of the Ro's Family Medicine proof of concept.
The completed Sprint 5 experience includes the responsive site header and
mobile navigation, first-viewport hero, live clinic-hours status, contact
shortcuts, platform-aware directions, practice story, grouped services, and
accepted-insurance matrix on top of the shared foundation. It now also includes
the full weekly schedule and location actions, a native-disclosure FAQ preview,
and a responsive, front-end-only contact form with local validation and explicit
non-delivery feedback.

## Requirements

- Node.js ^20.19.0, ^22.13.0, or >=24.0.0 (validated with Node 24.1.0)
- npm 11 or newer

## Commands

```bash
npm install
npm run dev
npm run lint
npm test
npm run build
npm run preview
```

`npm run dev` starts the development server. `npm run build` creates the
production bundle in `dist`, and `npm run preview` serves that bundle locally.

## Source architecture

Dependencies flow inward from composition to native markup:

```text
main.jsx -> App -> interfaces -> feature components -> hooks/config -> base components -> HTML
```

- `src/interfaces` owns routed page composition. Interfaces coordinate state
  only when multiple children genuinely share it and do not render native HTML.
- `src/components` owns section and feature presentation. Every component has
  adjacent CSS and owns its local state.
- `src/components/base` is the only presentation layer that renders native HTML.
- `src/hooks` owns reusable stateful behavior; single-use hooks stay beside
  their component.
- `src/config` owns shared clinic content, paths, and route-ready configuration.
- `src/styles/tokens.css` owns design values; `global.css` contains only the
  reset, document defaults, focus treatment, and reduced-motion foundation.
- `src/tests` contains shared setup and cross-layer foundation tests. Focused
  component tests may live beside their component as the application grows.
- `src/utils/errorCodes.js` remains the authoritative error-message catalog.

Components and files use PascalCase (`HomePage.jsx`, `Page.jsx`), hooks use a
`use` prefix, and utilities/configuration use descriptive camelCase names.
Styles use component-prefixed BEM-like classes. Native markup, inline styles,
component libraries, backend scaffolding, and duplicated clinic literals are
outside this architecture.

The required documentation signature and a complete example live in
[`docs/jsdoc-template.md`](docs/jsdoc-template.md).

## Base component contracts

`src/components/base/index.js` is the public entry point for the native-markup
layer. It exports page and layout wrappers; header, main, footer, navigation,
and section landmarks; links and buttons; headings and text roles; images and
figures; lists and native disclosures; and labeled form controls. Feature and
interface components compose these exports instead of rendering HTML directly.

Variants are deliberately limited to treatments present in the POC. Links use
`plain`, `primary`, `ghost`, or `text`; external links opt in with `external`,
which applies a new browsing context plus `noopener noreferrer`. Headings keep
their semantic `level` independent of their `display` or `section` treatment.
`FormField` owns every label/control association and supports the POC's text,
telephone, email, select, and textarea fields.

## Shared clinic content

`src/config/clinic.js` is the single source for brand copy, navigation, portal
destination, phone, address, seven-day hours, service groups, insurance
carriers, FAQs, contact reasons, and runtime assets. `CLINIC_CONFIG` is deeply
frozen. `validateClinicConfig` reports contract issues, while
`createClinicConfig` returns an immutable candidate or atomically falls back to
the known-safe POC defaults and can warn during development.

The phone, address, hours, insurance list, clinical copy, and operational claims
are still POC placeholders awaiting clinic-owner review. The Patient Portal
destination is the confirmed Tebra homepage and opens in a new tab with referrer
protection. Components must consume these values from configuration even while
unverified; they must not duplicate or silently “correct” them locally.

## First-viewport behavior

`SiteHeader`, `HeroSection`, and `QuickInformation` reproduce the POC through
the 760px layout and 980px navigation transitions. Mobile navigation owns its
disclosure and focus behavior in `useMobileNavigation`. Clinic status uses the
browser's local weekday and clock, updates once per minute, and treats opening
as inclusive and closing as exclusive. Directions use Apple Maps on supported
Apple mobile user agents and Google Maps otherwise.

## Core practice sections

`AboutSection`, `ServicesSection`, and `InsuranceSection` reproduce the POC's
paper, cream, and white sequence using only validated clinic configuration. The
about section layers the real clinic-front and waiting-room photos with intrinsic
dimensions and intentional cover crops. Service categories use semantic nested
lists and level-three group headings. The insurance matrix uses four columns at
760px and above, two columns from 621–759px, and one column at 620px and below.
None of these presentational sections owns state.

## Patient information and contact

`HoursSection` renders all seven entries from the same deeply frozen weekly
schedule consumed by the current-status hook and reuses the platform-aware
directions hook. `FaqSection` maps the four configured questions to native
`details` and `summary` disclosures, preserving browser keyboard and expanded
state behavior without custom state.

`ContactSection` owns only its controlled field values, local validation, and
submission feedback. It has no action, request client, storage, analytics, or
backend dependency. A valid submission is acknowledged only as a successful
local review and explicitly states that nothing was sent or saved. Patients are
directed to the configured phone number or secure Patient Portal for real clinic
communication, and the public-form privacy warning remains visible.

## Public assets

The seven runtime assets are exact copies of the POC files. The editable XCF
source remains in the POC and is intentionally not shipped.

| Asset | Location | Intrinsic size |
| --- | --- | ---: |
| Header logo | `public/assets/logos/ros-family-medicine-logo-header.png` | 1637 x 807 |
| Primary logo | `public/assets/logos/ros-family-medicine-logo.png` | 1637 x 807 |
| Covered entrance | `public/assets/photos/clinic-covered-entrance.jpg` | 600 x 450 |
| Clinic front | `public/assets/photos/clinic-front.jpg` | 800 x 588 |
| Reception | `public/assets/photos/clinic-reception.jpg` | 1600 x 900 |
| Waiting room | `public/assets/photos/clinic-waiting-room.jpg` | 1800 x 1201 |
| Family care | `public/assets/photos/family-care.jpg` | 1800 x 1200 |

Runtime paths and dimensions are centralized in `src/config/assets.js`. Keep
that manifest and this table synchronized when an approved asset changes.

## Foundation constraints

- React is pinned to 19.2.8 and Vite to 6.4.3. Vite remains on major version 6
  to honor the supplied scaffold while using the latest stable 6.x release.
- Vitest, Testing Library, jest-dom, and jsdom are the only test additions.
- No component library, backend, network data layer, or POC runtime dependency
  is included.
