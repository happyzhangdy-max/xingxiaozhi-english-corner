# Xingxiaozhi English Corner

A local-first English practice site for lookup, image OCR, autoplay review, and vocabulary adventures.

[Live site](https://english.xn--9iq784ays8a.com/) · [Japanese Corner](https://nihongo.xn--9iq784ays8a.com/) · [简体中文](./README.md) · [Open data](./docs/OPEN_DATA.md) · [Contributing](./CONTRIBUTING.md)

## Features

- 14 launch word banks with 126 contextual expressions.
- Nine workplace areas: product/project, software, data/AI, design/research, marketing, sales, customer success, HR, and finance/operations.
- Travel, meetings, email, and interview scenarios, plus everyday English.
- Bilingual search, bank filters, favorites, mastery states, and due reviews.
- Browser speech autoplay: expression → Chinese meaning → English example.
- Local image OCR with same-origin worker, English model, and WASM assets. Images are not uploaded.
- A ten-stage vocabulary adventure whose answers update local progress.
- A header switch to the independently deployed Japanese Corner.

Levels are optional metadata, not the primary navigation or learning model.

## Run locally

Node.js 22.13 or later is required.

```bash
npm install
npm run dev
```

Then open <http://127.0.0.1:3000>. The npm dependencies include the English OCR model. `predev` and `prebuild` decompress the model and copy runtime assets into the ignored `public/tesseract/` directory.

```bash
npm run lint
npm run typecheck
npm test
```

`npm run build:pages` creates the root-relative production site in `out/`. GitHub Actions verifies and archives this bundle; production is released from the bundle to the Tencent Cloud Hong Kong server and served directly by Caddy.

## Data and privacy

The launch definitions, examples, and Chinese translations are project-authored. Workplace taxonomy and term selection were informed by O*NET 30.3. See [Open Data](./docs/OPEN_DATA.md) and [Third-Party Notices](./THIRD_PARTY_NOTICES.md).

Progress and favorites stay in browser `localStorage`. Image recognition runs with local Tesseract.js assets. This release has no account system, cloud sync, or analytics.

## License

- Code: [MIT](./LICENSE)
- Project-authored learning content: [CC BY 4.0](./CONTENT_LICENSE.md)
- Third-party software and data: their respective licenses, documented in [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md)

Source lives in the [public GitHub repository](https://github.com/happyzhangdy-max/xingxiaozhi-english-corner). The live site is served directly from Tencent Cloud Hong Kong at [english.行小之.com](https://english.xn--9iq784ays8a.com/); GitHub is the source and CI repository, not the production runtime.
