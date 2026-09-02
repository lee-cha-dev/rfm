# Sprint 10 release checklist

This record separates a working production artifact from the clinic and legal
approvals still required before launch. A checked technical item does not imply
that any unresolved public fact has been approved.

## Technical release gate

- [x] Install exactly from `package-lock.json` with `npm ci`.
- [x] Pass `npm run lint`, `npm test`, `npm run test:routes`, and `npm run build`.
- [x] Load `/`, `/about`, `/faq`, and `/privacy` directly from the production
  preview without a blank screen, failed asset, or console error.
- [x] Confirm `/services`, `/hours`, and an unknown URL render the branded 404
  with working Home and Contact recovery links.
- [x] Exercise client navigation plus browser Back and Forward; confirm the
  route title, description, robots directive, active navigation, scroll, and
  main-landmark focus update.
- [x] Check keyboard access for the skip link, desktop/mobile/footer
  navigation, mobile-menu Escape behavior, FAQ disclosures, form validation,
  and error recovery.
- [x] Inspect phone, tablet, and desktop widths for horizontal overflow,
  obscured content, broken crops, and unusable targets.
- [x] Confirm the known-code, unknown-code, retry, and safe-detail behavior of
  the root error boundary through the automated suite.
- [x] Confirm supported routes use `index, follow`, while wildcard 404s use
  `noindex, nofollow`.
- [x] Keep deployment and backend creation outside this sprint.

## Clinic/legal approval gate

These items remain unresolved and block an authorized public launch even when
the technical gate passes:

- [ ] Clinic owner approves the public phone, address, weekly hours,
  new-patient status, services, insurers, operational and clinical claims, and
  contact copy.
- [ ] Clinic owner confirms the patient-portal and directions destinations.
- [ ] Clinic/legal reviewer approves the privacy language and supplies or
  approves the clinic's Notice of Privacy Practices.
- [ ] Clinic owner approves every staff record, credential, biography, and
  portrait, including whether the duplicated provider example remains public.
- [ ] Clinic owner approves each page title and description, the production
  origin, canonical URLs, social-card image/copy, favicon treatment, and final
  indexing policy.
- [ ] The final sign-off records the reviewer, approval date, unresolved fields,
  and any launch restriction.

## Metadata decision

Route changes synchronize the document, Open Graph, and Twitter titles and
descriptions. The application emits route-specific robots directives. It does
not emit canonical URLs or `og:url` yet because no approved production origin
exists; Sprint 12 owns that value and the final social-card approval.

## Validation record

Validated September 2, 2026:

- `npm ci` installed 289 packages from the lockfile with zero reported
  vulnerabilities.
- `npm run verify` passed lint, all 75 automated tests in 14 files, and the Vite
  production build. `npm run test:routes` separately passed 23 focused checks.
- Production-preview routes were loaded directly at 390 x 844, 768 x 1024, and
  1440 x 900 browser viewports. They had one level-one heading, complete shared
  landmarks, no broken images, no horizontal overflow, and no console warnings
  or errors.
- Mobile-menu open/focus/Escape, FAQ disclosure, invalid-form error focus,
  branded 404 recovery, contact-fragment scrolling, route active states, and
  browser Back/Forward were exercised. Initial document focus remains native so
  the skip link stays first in source/tab order; client navigation moves focus
  to the main landmark.
- Accepted deviations: the duplicated provider remains as the requested roster
  example but uses a unique internal key; canonical URL and `og:url` remain
  absent until the production origin is approved.

**Disposition:** The local production artifact is technically ready for a
separately authorized hosting workflow. Public release remains blocked by the
unchecked Sprint 12 clinic/legal approvals above.
