# Tasks

Updated: 2026-08-09

## Active

No release-blocking tasks.

## Completed

- [x] Publish the English Corner at `english.行小之.com` and connect it to the Japanese Corner custom domain without replacing the existing apex homepage.
- [x] Confirm `happyzhangdy-max`, create the public repository, and enable private vulnerability reporting and static-export CI.
- [x] Push `main`; pass Windows, macOS, and Linux CI; deploy and verify the live Tencent Cloud site.
- [x] Migrate production files from GitHub Pages to versioned Tencent Cloud releases served directly by Caddy.
- [x] Make the Apple-style light theme the first-visit default while preserving the persistent light/dark switch.
- [x] Implement homepage, lookup, image OCR, autoplay, adventure, and secondary due review.
- [x] Add 14 banks / 126 unique entries, including nine workplace areas and four scenario banks.
- [x] Keep OCR and learning progress local-first.
- [x] Add open-data attribution, dual licensing, governance documents, and CI.
- [x] Pass production build, rendered-page tests, lint, and production dependency audit.
- [x] Verify desktop and 390 px mobile navigation, lookup, autoplay, adventure, and responsive layout in a real browser.
- [x] Verify local image OCR and dictionary handoff against both the development server and a repository-subpath static export.

## Validation

- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm audit --omit=dev --audit-level=high`
- Root-relative production static export and static asset probe
- Playwright desktop/mobile smoke tests with zero console errors on the production artifact
- Data invariant check: 14 banks, 126 entries, 126 unique IDs

## Accepted upstream risk

- Full development audit: two advisories inherited from vinext → `image-size@2.0.2`; no fixed transitive version is currently available. Production audit is clean and the application has no server-side image parsing path.
