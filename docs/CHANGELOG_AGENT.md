# Agent Changelog

## 2026-08-10

- Migrated the English and Japanese Corner production files to versioned releases on the Tencent Cloud Hong Kong server, with direct Caddy hosting and atomic symlinks; GitHub remains the source and CI repository.
- Made light mode the English Corner first-visit default while preserving stored user preference and the light/dark switch.
- Replaced automatic GitHub Pages deployment with root-relative static-export verification and artifact retention in GitHub Actions.
- Prepared root-relative GitHub Pages output for `english.行小之.com` and added a responsive header switch to `nihongo.行小之.com`, preserving the existing apex personal site.
- Published both language corners on `english.行小之.com` and `nihongo.行小之.com`, enabled valid Let's Encrypt certificates and HTTP-to-HTTPS redirects, and verified the existing apex personal site remained unchanged.

## 2026-08-09

- Created the vinext/React application and original 行小之 visual system.
- Implemented lookup, local OCR, autoplay, vocabulary adventure, mastery/favorites, and due review.
- Added 14 banks / 126 entries with O*NET 30.3 attribution for workplace taxonomy.
- Added local OCR asset synchronization and excluded generated model files from Git.
- Upgraded Next from 16.2.6 to 16.3.0 and refreshed React, Vite, Wrangler, and Cloudflare tooling after dependency audit findings.
- Replaced starter tests and removed unused database, auth, preview, and placeholder asset surfaces.
- Removed the unused server-side image-optimization endpoint; image OCR remains browser-only.
- Added bilingual README, licenses, contribution/security governance, data notices, issue templates, Dependabot, and three-OS CI.
- Added a repository-subpath-aware static export and GitHub Pages deployment workflow.
- Fixed browser OCR model loading by shipping an uncompressed English trained-data asset and explicitly disabling gzip decoding.
- Made the Pages artifact verifier infer a repository subpath when it runs outside GitHub Actions while still enforcing the exact repository path in CI.
- Verified desktop and mobile navigation, lookup, autoplay, adventure, image OCR, and OCR-to-dictionary handoff in a real browser.
- Verified the repository-subpath static export with zero browser console errors, plus production build, rendered HTML tests, lint, zero production audit findings, and entry-ID uniqueness.
- Created `happyzhangdy-max/xingxiaozhi-english-corner` as a public GitHub repository and enabled Pages workflow publishing and private vulnerability reporting.
- Published `main`, passed Windows/macOS/Linux CI, and verified the live Pages lookup, autoplay, adventure, OCR, mobile layout, and zero-error browser console.
