# Sprint 7 home-route baseline

## Scope decision

Sprint 7 validates the home route as a technical accessibility, visual, and
component baseline. Visible POC copy and placeholder information are preserved.
Editorial rewriting is deferred to Sprint 11. Clinic-owner and
subject-matter-expert review plus placeholder replacement are deferred to
Sprint 12, after every route and the revised home-page draft are stable.

The inventory date in `CLINIC_CONFIG.verification.reviewDate` records when the
dependencies below were catalogued. It is not an SME approval date. A field may
be changed from `unresolved` to `confirmed` only during the documented Sprint 12
approval workflow.

## Accessibility review

| Area | Sprint 7 result | Evidence or decision |
| --- | --- | --- |
| Landmarks | Pass | One banner, one focusable main landmark, one content-info landmark, named primary/mobile/footer navigation, and named sections. |
| Heading order | Pass | One level-one page heading; section headings use level two and service-group headings use level three without skipped levels. |
| Accessible names | Pass | Brand link, menu control, navigation landmarks, form, fields, lists, image alternatives, and sections have programmatic names. The hero image remains intentionally decorative. |
| Focus visibility | Pass | A two-color inner/outer focus treatment remains visible against both light and dark page surfaces. |
| Focus order | Pass | DOM order follows visual order. The skip link precedes the banner, mobile-menu opening focuses its first link, Escape closes the menu and returns focus, and invalid submission focuses the first invalid field. |
| Keyboard-only use | Pass | Links and buttons use native controls, FAQ items use native `details`/`summary`, the menu supports Escape, and form controls follow native tab order. |
| Form semantics | Pass with product limitation | Every field has a visible label, required controls use native `required`, errors are associated through `aria-describedby`/`aria-invalid`, and feedback is announced. The form remains a local-only prototype with no delivery. |
| Disclosure semantics | Pass | FAQ disclosures retain native expanded state and keyboard behavior without custom roles or state. |
| Reduced motion | Pass | Smooth scrolling, animations, and transitions are suppressed under `prefers-reduced-motion: reduce`. |
| Contrast | Pass for established palette | Body, heading, link, control, and status treatments were reviewed on their rendered surfaces. The two-color focus ring avoids relying on the previous low-contrast yellow-only outline. |

Automated coverage protects the landmark/heading baseline, live fragment
targets, hardened new-tab links, skip destination, mobile Escape/focus path,
native disclosures, first-invalid-field focus, and metadata structure. Browser
smoke checks cover responsive overflow, rendered focus visibility, disclosure
operation, and console errors against the production build.

The production bundle was checked at 375×812, 760×900, 1024×800, and
1440×900. Every viewport reported zero horizontal overflow, the mobile/desktop
navigation transition occurred at the established 980px breakpoint, and every
visible image loaded at its intrinsic source. At 375px, the menu focused About
on open and returned focus to its trigger on Escape; the skip link focused
`#main-content`; the first FAQ disclosure opened; and invalid form submission
focused Name with `aria-invalid="true"` and its error description. The rendered
focus control reported the white inner outline plus purple six-pixel outer ring.
The browser console contained no warnings or errors.

An isolated temporary source copy completed `npm ci` with 287 packages and zero
reported vulnerabilities, then passed lint, all 49 tests, and the production
build. The temporary copy was removed after verification.

## Metadata baseline

- The existing POC title and description remain unchanged pending Sprint 12.
- Open Graph and Twitter summary tags mirror those existing values so metadata
  cannot drift before SME approval.
- The primary brand image is connected as the favicon, and the established
  purple surface is declared as the browser theme color.
- Canonical URL, public origin, social share image/crop, indexing policy, and
  final route-specific language remain unresolved until routing, hosting, and
  SME review are complete.

## Unresolved SME and owner dependencies

Every item below is deliberately marked `unresolved` in
`CLINIC_CONFIG.verification.fields`:

| Field | Current POC dependency | Sprint 12 evidence required |
| --- | --- | --- |
| `phone` | `(479) 555-0142` | Owner-approved public display number and international `tel:` value. |
| `address` | `18 Chesapeake Drive, Austin, AR 72007` | Owner-approved full public address and map query. |
| `weeklyHours` | Monday–Friday 8:00 AM–5:00 PM; weekend closed | Approved seven-day schedule, timezone, holiday/closure process, and change disclaimer. |
| `insuranceCarriers` | Eight prototype carrier names and “most major” claim | Current plan/carrier list, coverage disclaimer, verification process, and payment guidance. |
| `newPatientStatus` | Instructional FAQ placeholder | Current acceptance status, eligibility limits, and approved next step. |
| `portalUrl` | Generic Tebra homepage | Practice-specific secure portal URL and owner confirmation that it is the correct patient destination. |
| `directionsBehavior` | Platform-selected Apple/Google Maps query | Approved address plus confirmation of desired mobile/desktop behavior and new-tab intent. |
| `clinicalClaims` | Hero, about, services, insurance, hours, and FAQ POC language | SME approval for every marketing, clinical, and operational statement. |
| `privacyLanguage` | Local-form warning and non-delivery explanation | Owner/legal-approved privacy text, urgent-care guidance, and decision on whether any public form ships. |
| `destinationLinks` | `#` practice and full-FAQ actions plus future routed pages | Final internal routes/external URLs, labels, ownership, and behavior. |

No item in this table is implied to be accurate merely because the POC renders
it. Sprint 12 owns replacement and sign-off.

## Reuse decisions

| Completed area | Reuse mode | Routed-page direction |
| --- | --- | --- |
| Base components and tokens | Direct reuse | Preserve as the native-markup and design-contract layer. |
| `SiteHeader` / `SiteFooter` | Compose through the Sprint 8 site layout | Replace fragment navigation with route-aware links in Sprint 9. |
| Hero / quick information | Home-only composition | Reuse shared config/hooks, not the complete hero, on patient-information pages. |
| About section | Expand | Reuse photography and structure on `/about`; validate public copy with the SME in Sprint 12. |
| Services section | Direct data/structure reuse, then expand | Share service groups with `/services`; do not duplicate literals. |
| Insurance section | Compose | Reuse the carrier presentation in patient information after SME confirmation. |
| Hours section and hours hook | Direct reuse | Share the same schedule/status source with `/hours`. |
| FAQ disclosure and config | Direct primitive reuse, expand categories | Keep a concise home preview and build the categorized `/faq` route. |
| Contact section | Compose after workflow decision | Reuse labeled fields and validation only if owner/legal approve the local-only form model. |

## Routed-page content blockers

The `/privacy` route needs supplied legal/privacy language, effective date,
clinic identity/contact details, approved description of any data handling, and
urgent-care/secure-messaging guidance. No policy may be inferred from the local
prototype form.

Expanded patient-information content needs confirmed hours, address, phone,
portal URL, insurance/payment guidance, new-patient status, appointment process,
first-visit requirements, records/refill guidance if offered, and an owner for
future updates. Sprint 9 may establish page structure, but Sprint 12 owns the
final public language and facts.
