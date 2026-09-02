# Ro's Family Medicine React Conversion — Sprint Plan

## Project objective

Convert the rendered experience in `../ros-family-medicine/index.html` into a maintainable, multi-page Vite + stable React marketing application. The React application must preserve the POC's home-page content, layout, imagery, responsive behavior, accessibility affordances, and client-side interactions while replacing the prototype's monolithic HTML, CSS, and JavaScript with encapsulated components, hooks, and routed page interfaces.

The first implementation target is visual and behavioral parity with the current POC on the `/` route. After the reusable home-page system is complete, it will support dedicated routes including `/privacy`, `/faq`, and `/contact`, plus the other primary navigation destinations described below. Unverified clinical or legal copy, real form delivery, and backend services remain outside the conversion scope.

## POC findings

- The source is a single `index.html` file with embedded CSS and JavaScript.
- The rendered page contains a skip link, header/navigation, hero, quick clinic information, about, services, insurance, hours/location, FAQ, contact, and footer.
- The responsive layout has meaningful transitions near 620px, 760px, and 980px.
- Client-side behavior consists of the mobile menu, today's hours/open-state calculation, telephone link population, and Apple Maps/Google Maps destination selection.
- The FAQ uses native `details`/`summary` disclosure behavior.
- The contact form intentionally does not submit. It warns patients not to enter private medical information.
- Current assets consist of two PNG logo variants, five JPG clinic/family images, and one editable XCF source. Only the appropriate web assets belong in `public/assets`; the XCF source should remain in the POC unless it becomes a production requirement.
- The POC contains obsolete and experimental CSS variants that are not represented in the current DOM. Only rules needed to reproduce the rendered page will be ported.
- The POC still contains placeholder phone, address, portal, directions, practice, and patient-information links, plus copy and operational claims that require owner verification before release.
- `utils/errorCodes.js` is the project-owned catalog of HTTP-style error titles and messages. It will be consumed as application data, with a safe default for unknown failures; it does not alter the project requirements or architecture.

## Architecture and coding contract

### Dependency direction

```text
App entry
  -> ErrorBoundary
    -> Router
      -> shared SiteLayout
        -> routed Page interface
          -> section-level child components
            -> focused custom hooks and configuration
            -> base components
              -> native HTML elements
```

- `src/interfaces` owns routed page-level composition and only coordinates state that multiple children genuinely share.
- `src/components` owns section-level and feature-level presentation. Each component owns its local state and has its own adjacent CSS file.
- `src/components/base` is the only presentation layer that renders native HTML elements. Interfaces and feature components compose these primitives rather than introducing raw page markup.
- `src/hooks` owns reusable stateful behavior such as menu state, clinic status, and map-link selection. A hook remains beside its component instead when it has only one consumer.
- `src/config` owns verified or replaceable clinic content and route definitions so phone, address, hours, navigation, insurance, and service data do not become duplicated literals. `utils/errorCodes.js` remains the authoritative error-message catalog.
- `src/styles/tokens.css` owns design tokens. A small global reset may live in `src/styles/global.css`; component-specific rules must not.
- React components and hooks will use functional React patterns. OOP goals will be enforced through encapsulation, explicit interfaces, single responsibility, and dependency direction. The application-level `ErrorBoundary` is the intentional class-component exception because React error boundaries use class lifecycle methods; it must still render its fallback through base/feature components.
- Every exported component, hook, utility, class, and non-trivial method/function must have a JSDoc block explaining what it does, why it exists, and where it is used, followed by:

```javascript
@author Lee Charles
@since 20260902
@company Lazy Software
```

- Styling is CSS-only: no component library, CSS-in-JS, CSS modules unless later approved, or React `style` props. The POC's inline styles must be converted into owned CSS classes.
- No backend, server state, or API layer will be introduced. No dependency should be added without a conversion requirement.

## Definition of done for every sprint

- The sprint's acceptance criteria are satisfied without knowingly changing completed POC behavior.
- New components have their own CSS file and use base components for native markup.
- State lives at the lowest owner that can correctly manage it; lifting state requires a documented cross-child need.
- New exports and non-trivial functions include the required JSDoc and author signature.
- No inline styles or component-library code are introduced.
- New or changed routes render directly on refresh, have an intentional document title, and expose a useful not-found or failure state where applicable.
- Keyboard use, focus behavior, semantic labeling, reduced-motion behavior, and responsive states affected by the sprint are checked.
- Relevant build, lint, and test commands pass once those commands exist.
- The sprint status is updated and its retrospective is replaced with concise, concrete outcomes, decisions, carryover, and risks for the next contributor.

---

## Sprint 1 — Project foundation and asset migration

**Status:** Complete

**Goal:** Produce a clean, runnable Vite + stable React foundation with the architecture, assets, and global design values required by all later work.

### Work

- Scaffold the Vite React application directly in RFM, preserving any planning or repository files already present.
- Use the current stable React and Vite releases available at implementation time and commit the resulting lockfile.
- Define `dev`, `build`, `preview`, `lint`, and test scripts; add only the minimum development dependencies needed for linting and component/hook tests.
- Establish the agreed directories: `interfaces`, `components/base`, `components`, `hooks`, `config`, `styles`, and tests.
- Copy the two PNG logos and five JPG images from the POC into a predictable `public/assets` structure. Preserve original files and verify names, dimensions, and references after copying.
- Create `tokens.css` with the POC palette, typography families, content width, spacing scale, type scale, borders, radii, shadows, motion timing, and breakpoint documentation.
- Create the minimal global reset and application entry styles needed to match the POC defaults, including focus-visible and reduced-motion foundations.
- Add the initial base `Page`/document-shell component and a `HomePage` interface so the app renders a recognizable empty structural shell rather than starter content.
- Add a shared JSDoc template/example and document architecture and naming conventions in the project README.
- Remove Vite demo assets and starter presentation after the replacement shell renders.

### Acceptance criteria

- A clean install starts the Vite development server and the production build succeeds.
- The app uses stable React, contains no component library, and has no backend scaffolding.
- All required web assets load from `public/assets`; no source file depends on the POC at runtime.
- Tokens reproduce the POC's core purple, gold, yellow, paper, cream, white, ink, muted, line, max-width, serif, and sans values.
- The initial interface renders through base components and contains no inline styles.

### Sprint retrospective

- **Delivered:** React 19.2.8 and Vite 6.4.3 foundation with `dev`, `build`, `preview`, `lint`, and Vitest `test` commands, a branded `HomePage`/base `Page` shell, tokens, global defaults, documentation, and a locked dependency tree.
- **Decisions:** Preserved the supplied Vite 6 major constraint at its latest 6.x release; native markup begins in `components/base`, interface composition stays markup-free, and public asset paths/dimensions live in `config/assets.js`.
- **Validation:** `npm run lint`, 3 component/config tests, and `npm run build` pass; browser checks at 1280x900 and 375x812 confirmed semantic landmarks, the 1637px source logo loading, no console warnings/errors, and no horizontal overflow.
- **Carryover:** None from Sprint 1; Sprint 2 can begin with the remaining base primitives and shared clinic content model.
- **Risks/data needed:** Seven PNG/JPG files were hash-verified as exact POC copies and the XCF was excluded; clinic copy, operational facts, and external destinations remain intentionally unverified for later owner review.

---

## Sprint 2 — Base component system and shared content model

**Status:** Complete

**Goal:** Build the reusable HTML-owning primitives and typed-by-contract configuration that all page sections will consume.

### Work

- Implement focused base components for the native structures required by the POC, including layout/page, header, footer, navigation, section, link/button, text/headings, image/figure, list, disclosure, and form controls.
- Keep base APIs narrow: variants describe established POC presentation needs rather than becoming a speculative design system.
- Give every base component an adjacent CSS file and required JSDoc block.
- Create clinic configuration for navigation, contact details, address, weekly hours, services, insurance carriers, FAQs, and asset paths.
- Add development-time validation/default handling for configuration consumed by hooks and rendered sections.
- Create reusable layout primitives for `shell`, section padding, eyebrow text, display headings, lede copy, buttons, and text links without leaking section-specific layout into global CSS.
- Add component tests for semantic output, accessible names, safe external-link attributes, and supported variants.

### Acceptance criteria

- Feature and interface layers can compose every native element needed by the current POC without raw HTML markup.
- Repeated clinic content has one source of truth.
- Base components remain stateless unless native behavior requires local state.
- Tests demonstrate semantic and accessible base output.

### Sprint retrospective

- **Delivered:** A base-only native markup system covering the page canvas, layout/shell/main wrappers, header, footer, navigation, sections, links, buttons, headings, text roles, images, figures, lists, native disclosures, forms, and labeled input/select/textarea controls; every component has adjacent CSS and the required documentation signature.
- **Content model:** Added one deeply immutable, JSDoc-typed clinic configuration for brand content, primary/footer navigation, portal, phone, address, seven-day hours, nine services in three groups, eight insurers, four FAQs, contact reasons, and all seven asset records. Full-contract validation supports deterministic diagnostics and atomic safe-default fallback with optional development warnings.
- **Decisions:** Kept semantic level separate from heading presentation, made external-link safety opt-in and automatic, left disclosure state to native `details`, and used one focused `FormField` contract rather than separate wrappers for each nearly identical control. Rejected speculative theme, size, polymorphic-element, controlled-disclosure, and form-state APIs.
- **API constraints:** Feature and interface layers compose exports from `components/base/index.js` and do not render native markup. New variants require a demonstrated POC need; shared clinic literals come only from `CLINIC_CONFIG`; external new-tab links use the `external` contract; form labels and controls stay paired through `FormField`.
- **Validation:** `npm run lint`, 8 tests across 4 files, and `npm run build` pass. Tests cover landmark and heading semantics, accessible names, supported presentation classes, external-link protections, native button behavior, media dimensions/alternatives, list/disclosure output, labeled controls, immutable content, validation, and fallback handling. Browser checks at 1280x900 and 375x812 confirm the expected landmark tree, loaded logo at its responsive 205px/178px widths, no warning/error logs, and no horizontal overflow.
- **Carryover/risks:** No implementation carryover into Sprint 3. The POC phone, address, portal target, hours, insurance carriers, clinical copy, and operational claims remain explicitly unverified and must be owner-confirmed before release.

---

## Sprint 3 — Header, hero, and quick-information experience

**Status:** Complete

**Goal:** Reproduce the complete first viewport and its responsive interactions.

### Work

- Build the skip link, sticky header, desktop navigation, mobile menu, hero, hero actions, tagline, and quick-information section.
- Implement a locally owned mobile-navigation hook with open/close state, accurate `aria-expanded`/label values, link-click close behavior, and appropriate focus/escape behavior.
- Implement focused time parsing and clinic-status utilities plus a clinic-hours hook for today's weekday, today's hours, and current open/closed state.
- Implement platform-aware map directions as a focused utility/hook with Google Maps as the general path and Apple Maps for supported Apple mobile user agents, matching the POC.
- Populate phone, address, hours, and directions only from clinic configuration.
- Match the hero's `family-care.jpg` treatment, logo sizing, gradients, type hierarchy, action styling, and breakpoint behavior.
- Add deterministic tests for 12-hour time parsing, closed days, open/close boundaries, missing/invalid hours, menu behavior, and map-link generation.

### Acceptance criteria

- Desktop and mobile first viewports match the rendered POC at representative widths around the 760px and 980px transitions.
- Menu and quick-information behaviors work without direct DOM queries or manual class mutation.
- The status calculation is deterministic under tests and preserves the POC's inclusive opening/exclusive closing rule.
- Header, hero, and utility content remain usable by keyboard and with reduced motion enabled.

### Sprint retrospective

- **Outcomes:** Delivered the skip link, sticky overlaid header, config-driven desktop and mobile navigation, responsive hero and actions, three-part tagline, and selected purple-ribbon quick-information experience.
- **Visual parity:** Browser checks at 375px, 759–760px, 979–980px, and 1024px confirmed the POC image crop, gradients, logo scale, typography, section overlap, navigation switches, layout transitions, and absence of horizontal overflow.
- **Hook ownership:** `useMobileNavigation` owns only menu state and focus behavior; `useClinicHours` owns its minute refresh; and `useMapDirections` owns platform selection. `HomePage` only composes features.
- **Time assumptions:** Clinic status uses the visitor device's local weekday and clock. Opening is inclusive, closing is exclusive, and closed, missing, reversed, or malformed ranges safely report closed.
- **Interaction fixes:** Opening the menu focuses its first link, every mobile link closes it, Escape closes it and restores trigger focus, ARIA state/labels stay synchronized, and reduced-motion behavior remains global.
- **Carryover/risks:** The phone, address, portal target, weekly hours, and operational copy remain POC placeholders awaiting owner confirmation. Navigation fragments for later-page sections will gain destinations as Sprints 4 and 5 land.

---

## Sprint 4 — About, services, and insurance sections

**Status:** Complete

**Goal:** Convert the core practice-story and care-offering content with one-to-one responsive presentation.

### Work

- Build the about/story section with the real clinic-front and waiting-room photo stack, accessible alternative text, editorial copy, quotation treatment, and practice link.
- Build the services introduction and three grouped service directories from configuration data.
- Build the accepted-insurance heading and responsive carrier matrix from configuration data.
- Match the POC's alternating paper/cream/white surfaces, typography, borders, spacing, photo crops, and grid collapse behavior.
- Ensure list semantics and heading hierarchy remain meaningful even though base components own the native tags.
- Add focused render tests for configuration-driven groups and list content.

### Acceptance criteria

- All three sections reproduce the current POC content and imagery without duplicated data literals.
- Layouts match the POC at desktop, tablet, and narrow-mobile widths, including the 620px insurance transition and 760px service transition.
- Images reserve stable space and do not distort.
- Section components contain no independent state because none is required.

### Sprint retrospective

- **Outcomes:** Delivered the config-driven practice story, two-photo clinic stack, three grouped service directories, and eight-carrier insurance matrix with semantic section labels and heading hierarchy.
- **Image/crop decisions:** The clinic-front and waiting-room assets retain their intrinsic dimensions to reserve space, fill fixed stack frames with `object-fit: cover`, and use the POC's 500px desktop/tablet and 430px narrow-mobile stack heights without distortion.
- **Responsive adjustments:** Browser checks at 375px, 620–621px, 759–760px, and 1024px confirmed the service and insurance transitions, photo-stack resize, surface sequence, borders, typography, and zero horizontal overflow. The decorative photo ring is clipped by the about section at narrow widths so it cannot widen the document.
- **Content model:** Added validated `homeSections` copy, about-link metadata, image selections, image alternatives, and insurance matrix labels to the immutable clinic configuration. Service groups and carrier names remain their existing single sources of truth.
- **Semantics and state:** Service categories render as labeled nested lists with level-three headings, carrier names render as one labeled list, images have specific alternatives, and all three sections remain stateless.
- **Portal verification:** Every Patient Portal action now uses the confirmed `https://www.tebra.com/` destination in a new tab with `noopener noreferrer` protection.
- **Carryover/risks:** The POC's “Meet the practice” link still uses its placeholder `#` destination pending the dedicated practice-page route, and clinic story/service/insurance claims still await owner review.

---

## Sprint 5 — Hours, FAQ, and contact experience

**Status:** Complete

**Goal:** Complete the practical patient-information sections and front-end-only contact interaction.

### Work

- Build hours/location from the same weekly-hours configuration used by the quick-information hook.
- Reuse the computed directions destination and contact anchor behavior without lifting unrelated state.
- Build the FAQ preview with native disclosure semantics through the base disclosure component; preserve the four POC questions and answers.
- Build the contact section and form fields with owned CSS classes replacing every POC inline style.
- Implement locally owned form state only where needed for controlled validation and submission feedback.
- Keep submission on-device and non-networked. Clearly preserve the public-form privacy warning and avoid implying that a message was delivered to the clinic.
- Decide and document the parity-safe submit interaction: disabled/informational behavior or local acknowledgement, pending owner confirmation.
- Add tests for field labels, select options, privacy notice, validation behavior, non-network submission, and disclosure keyboard behavior.

### Acceptance criteria

- Hours displayed here cannot drift from the values used for current clinic status.
- FAQ controls are keyboard operable and expose native expanded/collapsed semantics.
- Contact fields have explicit labels, autocomplete/input-mode attributes, and clear front-end-only behavior.
- No network request, patient data storage, analytics capture, or backend dependency exists.

### Sprint retrospective

- **Outcomes:** Delivered the hours/location, four-question FAQ preview, and responsive contact panel in the home-page sequence. Each feature owns adjacent styling and composes native markup exclusively through the base layer.
- **Submit UX:** Chose a local-review interaction. The controlled form validates in memory, prevents native submission, makes no network request, clears stale feedback as fields change, and explicitly reports that a valid entry was neither sent nor saved.
- **Validation and privacy:** Name, message, and at least one contact method are required for the local review; supplied phone and email values receive basic format checks. Every field has an explicit label and appropriate autocomplete/input-mode metadata. The public-form privacy warning remains prominent, and the secure portal and telephone paths are available beside the form.
- **Accessibility:** FAQ items use native `details`/`summary` elements, retain their browser keyboard behavior and expanded state, and require no custom disclosure state. Validation errors are associated with their fields and announced as alerts; aggregate submission feedback uses a polite status region.
- **Shared-data reuse:** The hours section maps the same immutable seven-day configuration consumed by `useClinicHours`, while directions reuse `useMapDirections`, the contact shortcut remains `#contact`, and FAQ answers, contact reasons, phone, address, and portal values remain configuration-driven.
- **Verification:** Added focused tests for all seven hours rows, map/contact destinations, native FAQ semantics, form labels and metadata, reason options, privacy copy, local validation, and absence of fetch calls. Browser checks at narrow-mobile and desktop widths confirmed one- and two-column transitions, no horizontal overflow, correct live DOM counts, and no console warnings or errors. The full suite passes with 43 tests, and lint plus the production build are clean.
- **Carryover/risks:** Public phone, address, weekly hours, new-patient guidance, clinical/operational copy, and the dedicated FAQ destination remain POC placeholders awaiting owner confirmation. The local form is intentionally not a clinic communication channel and will require an approved secure workflow before real delivery can be enabled.

---

## Sprint 6 — Footer, full-page integration, and responsive parity

**Status:** Planned

**Goal:** Assemble the complete page through the interface layer and close cross-section visual, navigation, and responsive gaps.

### Work

- Build the footer with the correct logo variant and navigation sourced from shared configuration.
- Complete `HomePage` composition in exact POC section order without introducing page-level state that children can own.
- Verify all anchor targets, skip navigation, portal links, external links, telephone links, and directions links.
- Consolidate only genuine shared layout tokens; keep feature CSS owned by its component.
- Compare the React page against the POC at representative narrow mobile, wide mobile/tablet, compact desktop, and large desktop viewports.
- Check overflow, content reflow, touch target size, focus order, hover/focus states, image crops, sticky-header offsets, and reduced-motion behavior.
- Remove dead styles, unused components, duplicate data, console output, and conversion-only scaffolding.

### Acceptance criteria

- The complete React page is a one-to-one conversion of the currently rendered POC rather than its unused CSS experiments.
- Every section is reachable from header and footer navigation where applicable.
- There is no unexpected horizontal scrolling or content overlap at supported widths.
- Native markup appears only inside the base layer; architecture boundaries are verified by review or lint rules where practical.
- Production build, lint, and test suites pass.

### Sprint retrospective

Pending. On completion, record the viewport comparison results, cross-section fixes, architecture boundary violations found, technical debt accepted, and release blockers passed to Sprint 7.

---

## Sprint 7 — Home-page accessibility and content baseline

**Status:** Planned

**Goal:** Validate the completed home route and make all unresolved business facts explicit before its components are reused across dedicated pages.

### Work

- Run a home-route accessibility review covering landmarks, headings, accessible names, contrast, focus visibility/order, keyboard-only use, native form semantics, disclosures, and reduced motion.
- Verify the home route's document title, description, favicon/brand metadata, and social metadata against approved clinic language; do not invent missing claims.
- Have the owner confirm public phone, full address, weekly hours, insurance carriers, new-patient status, patient portal URL, directions URL behavior, clinical claims, privacy language, and destination links.
- Replace prototype placeholders only with confirmed values and record any intentionally unresolved field.
- Perform final home-route visual parity checks against the POC and a production-build smoke test.
- Document which completed sections are approved for direct reuse, composition, or expansion on routed pages.

### Acceptance criteria

- Build, lint, and automated tests pass from a clean dependency installation.
- No known placeholder value is presented as verified clinic information.
- Critical keyboard and accessibility paths have no known blocking defect.
- The home route is stable enough to serve as the visual and component baseline for secondary pages.
- Content dependencies for the privacy and expanded patient-information routes are recorded before those pages are authored.

### Sprint retrospective

Pending. On completion, record home-route validation evidence, confirmed and unresolved clinic facts, approved reusable sections, accepted POC deviations, and blockers for routed pages.

---

## Sprint 8 — Application routing, site shell, and ErrorBoundary

**Status:** Planned

**Goal:** Introduce resilient client-side routing and a shared application shell without changing the completed home-page presentation.

### Work

- Add React Router using its current stable release and define route constants/configuration rather than scattering path strings.
- Wrap the routed application in a documented `ErrorBoundary` class at the application root.
- Use the project-owned `utils/errorCodes.js` catalog as the authoritative error-display data, adding the required JSDoc/signature without changing its established mappings unnecessarily.
- Add a focused error-normalization utility that safely resolves `status`, `statusCode`, or supported numeric `code` values and otherwise uses `ERROR_CODES.default`.
- Build an `ErrorPage` interface and reusable error-state components through the base layer. Provide safe recovery actions such as retry/reset, home, and contact without exposing stack traces, raw exceptions, or patient-entered data.
- Reset the boundary intentionally after a recovery action or successful navigation so one failure does not permanently trap the application.
- Build a shared `SiteLayout` with header, main outlet, footer, skip-link target, route-change focus management, and scroll restoration.
- Define the initial route table for `/`, `/about`, `/services`, `/hours`, `/faq`, `/contact`, and `/privacy`, plus a wildcard not-found route. Route definitions may point to temporary composed placeholders only during this sprint and must not introduce unapproved copy.
- Keep route-level 404 handling separate from the render-error boundary. Document that React error boundaries do not catch event-handler errors, asynchronous callback failures, server-rendering failures, or errors thrown inside the boundary itself.
- Ensure the Vite hosting fallback can serve direct requests to client-side routes in development, preview, and the eventual deployment target.
- Add tests for known and unknown error-code resolution, boundary fallback rendering, recovery/reset behavior, shared-layout persistence, route focus/scroll behavior, wildcard 404 handling, and direct route rendering.

### Acceptance criteria

- The entire routed application is wrapped by the `ErrorBoundary`, and a forced descendant render error shows the branded safe fallback.
- Unknown or unsafe error inputs resolve to `ERROR_CODES.default`; internal exception details are not shown in production output.
- `/` retains the completed POC parity while navigating through the shared shell without a full document reload.
- Every declared route and an unknown URL render an intentional interface, and direct browser requests are supported by the configured fallback.
- ErrorBoundary lifecycle methods, handlers, helpers, and the class itself contain the required what/why/where JSDoc and author signature.

### Sprint retrospective

Pending. On completion, record the router version, route table, boundary/reset design, error-code normalization rules, fallback/rewrite configuration, tests performed, and page work carried into Sprint 9.

---

## Sprint 9 — Dedicated marketing and patient-information pages

**Status:** Planned

**Goal:** Replace all routed placeholders with complete branded pages that reuse the established base, layout, section, data, and hook layers.

### Work

- Build an `/about` page from the established story, clinic photography, and verified practice-information components.
- Build a `/services` page from the configured preventive, everyday, and family-care groups; add detail only when clinic-approved content exists.
- Build an `/hours` page from the shared schedule, current-status, phone, address, and platform-aware directions components.
- Build an expanded `/faq` page using categorized configuration and the established disclosure component. The home FAQ remains a concise preview linking here.
- Build a dedicated `/contact` page using the established contact information and front-end-only form. The home contact section may remain a preview or reuse the same component according to the approved content density.
- Build a `/privacy` page with appropriate document structure and shared presentation components. Treat privacy text as owner/legal-supplied content; do not fabricate a policy or imply unsupported data practices.
- Replace route placeholders and implement a branded not-found page using the catalog's 404 title/message with home and contact recovery links.
- Update desktop, mobile, and footer navigation to route-aware links, active-state styling, correct `aria-current` semantics, and consistent mobile-menu close behavior.
- Preserve useful home-page deep links where appropriate, but use routed destinations for primary navigation. Portal and directions remain external destinations rather than application routes.
- Give every page interface its own CSS file, reuse established section components before creating variants, and keep page-specific state within the page or responsible child.
- Add per-route document titles and descriptions, plus route tests for content, navigation, active states, keyboard focus, direct loading, and unknown paths.

### Acceptance criteria

- `/`, `/about`, `/services`, `/hours`, `/faq`, `/contact`, and `/privacy` are complete, navigable, responsive pages with distinct document titles.
- Shared content such as hours, address, contact details, services, and FAQ entries cannot drift between the home route and dedicated routes.
- Header, mobile, and footer navigation work by keyboard and clearly identify the current route.
- The privacy page contains only approved language, and the contact page remains explicit about having no secure medical-message delivery or backend.
- No page bypasses the base-component markup boundary or duplicates an existing component merely to change spacing/content density.

### Sprint retrospective

Pending. On completion, record pages delivered, component reuse/variants, navigation decisions, route metadata, content still awaiting approval, direct-load testing, and any integration work carried into Sprint 10.

---

## Sprint 10 — Multi-page validation and release readiness

**Status:** Planned

**Goal:** Validate the complete routed marketing application and leave a production-ready local artifact with technical and content readiness clearly separated.

### Work

- Run a complete accessibility review across every route, including landmarks, heading order, active navigation, route-change focus, skip links, disclosures, forms, error recovery, 404 handling, and reduced motion.
- Verify unique page titles, descriptions, canonical/social metadata strategy, favicon/branding, and indexing expectations for every route.
- Validate desktop, tablet, and mobile layouts across all pages, including direct URL loads and browser back/forward navigation.
- Exercise the ErrorBoundary, known/default error messages, recovery paths, and wildcard 404 without leaking implementation details.
- Run a clean-install production build, lint, automated tests, and route smoke tests; resolve dead routes, imports, styles, and configuration.
- Update README with install, development, test, build, routing, page creation, error-code maintenance, content-update, asset-update, and architecture guidance.
- Produce a short release checklist distinguishing technical completion from clinic/legal content approval.

### Acceptance criteria

- Build, lint, automated tests, and route smoke tests pass from a clean dependency installation.
- Every supported route loads directly and through client navigation without a blank screen, broken asset, or unexpected full reload.
- Critical keyboard, accessibility, navigation, error, and responsive paths have no known blocking defect.
- Documentation enables another contributor to add a routed page or error mapping without breaking architecture or duplicating data.
- The project is ready for the separately authorized hosting/deployment workflow; this sprint does not create hosting or a backend.

### Sprint retrospective

Pending. On completion, record final multi-page validation evidence, confirmed and unresolved clinic/legal facts, accepted deviations, release readiness, and recommended post-launch follow-up.

---

## Retrospective update format

Replace each sprint's `Pending` text immediately after that sprint with no more than five concise bullets:

- **Delivered:** What became usable.
- **Decisions:** Architecture or UX choices future work must preserve.
- **Validation:** Builds, tests, viewport, and accessibility checks performed.
- **Carryover:** Explicit unfinished work moved to another sprint.
- **Risks/data needed:** Unverified content, external URLs, or constraints that could affect release.

Do not mark a sprint complete while required work is merely carried over. If scope changes, update the affected later sprint before beginning it.
