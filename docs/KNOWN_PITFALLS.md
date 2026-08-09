# Known Pitfalls

Updated: 2026-08-09

- `public/tesseract/` is generated and ignored. Run `npm install` and the normal `dev` or `build` script instead of committing OCR binaries. The model is intentionally served as uncompressed `.traineddata` because some download-manager extensions intercept `.gz` requests.
- OCR currently handles images only, not PDF documents.
- Browser speech quality and available Chinese voices differ by operating system.
- Learning state is browser-local and can be cleared with site data.
- O*NET informed the workplace taxonomy; project wording is modified and must not be presented as an official O*NET definition.
- Full `npm audit` reports two high-severity advisories in vinext's transitive `image-size@2.0.2`. No fixed `image-size` release exists; the suggested vinext downgrade is breaking. The app does not expose server-side image parsing. `npm audit --omit=dev` is clean.
- SECURITY.md intentionally records public launch as blocked until GitHub private vulnerability reporting is enabled.
