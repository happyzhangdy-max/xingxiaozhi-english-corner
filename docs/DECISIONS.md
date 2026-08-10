# Decisions

## 2026-08-09 - Organize learning by bank and scenario

Status: active

### Decision

Do not use a Japanese-style level ladder as primary navigation. Organize the product around everyday English, workplace roles, and concrete situations. CEFR-like level metadata may remain on entries for future sorting but is not a core interface.

## 2026-08-09 - Local-first OCR and progress

Status: active

### Decision

Run Tesseract.js in the browser using same-origin worker, model, and WASM assets. Store learning records in `localStorage`. Do not add accounts, image uploads, analytics, or a database to the first release.

### Consequences

The first OCR use has a larger model download. Progress does not sync between browsers. Privacy behavior is simple and inspectable.

## 2026-08-09 - Small curated launch corpus

Status: active

### Decision

Launch with 126 project-authored contextual entries and O*NET-informed workplace taxonomy. Do not bulk-import a spelling list that lacks meanings and usable examples.

## 2026-08-09 - Dual license

Status: active

### Decision

Use MIT for source code and CC BY 4.0 for project-authored learning content. Preserve separate third-party attribution and modification notices.

## 2026-08-09 - GitHub Pages is the public runtime

Status: active

### Decision

Publish a root-relative static Next export from GitHub Actions at `https://english.行小之.com/`. Keep vinext build support for local/Sites compatibility, but the public launch does not require a server.
