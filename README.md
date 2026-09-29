# Gator Turf redesign

A complete responsive redesign of gatorturf.net built with React, TypeScript and Vinext (Next.js-compatible routing).

## Design

The original Poppins font is served locally in weights 300, 400, 500 and 600. The original logos, product samples and project photography are preserved. The design uses deep green, warm white and pale sage with a layered photographic hero, product material displays, an editorial project gallery, benefits, FAQs and a split enquiry section. The supplied Pinterest reference informs the layout rhythm while Gator Turf branding and assets remain intact.

## Content and routes

- Homepage, applications and all five application pages
- Product catalog with application, weight, size and color filters
- All 17 product detail pages and four product collections
- Project gallery with 123 photographs, category tabs and a lightbox
- About, contact, FAQs and local service pages
- All 54 journal articles, search and pagination
- Original indexed URLs and redirects for older product/golf links

The content snapshot is in `lib/content.json`. Original photography was downloaded and optimized into WebP files in `public/assets`. Content and imagery belong to Gator Turf and are included for its website redesign.

## Development

Use Node 22.13 or later and the supplied pnpm lockfile.

```sh
pnpm install
pnpm dev
```

```sh
pnpm exec tsc --noEmit
pnpm build
```

## Contact and payments

The quote form validates inputs and opens a prefilled email draft addressed to `sales@gatorturf.net`. It does not silently submit leads. Connect the business's approved form/CRM endpoint before replacing its production inquiry workflow. Product inquiries prefill the requested sample.

Payments link to the external payment destination supplied by the original site. Payment processing remains outside this application. Confirm the existing provider link with the business before production replacement.

## Verification

TypeScript validation, original route and local asset checks, desktop and mobile visual inspection, mobile menu and overflow checks, product filtering, gallery category switching and photo navigation were completed. Browser-native WebMCP is feature-detected for catalog filtering; the review browser does not support its modelContext API.

## Latest layout update

Full-width lawn hero, transparent home navigation that becomes solid after the hero, and a centered application showcase with scroll-driven fade/up transitions. Reduced-motion preferences and short viewports display ordinary readable category cards.

Section 3 uses a full green backdrop, truly centered service titles and alternating left/right image cards that rise independently with scroll. The navbar is 64px on desktop and 60px on mobile.

Latest homepage update: open hero typography, translucent navbar, turf-and-soil material composition, animated numbered turf selector, overlapping project photography, and full-height contact image. The old benefits section has been removed. Product roll imagery is illustrative; original product texture swatches and specifications are retained.
