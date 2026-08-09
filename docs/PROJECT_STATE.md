# Project State

Updated: 2026-08-09

## Product identity

行小之英语角 is a Chinese-first, local-first English practice web app. It borrows the useful information architecture of nihongo-corner without copying its UI or treating Japanese proficiency levels as the product model.

## Current stack

- TypeScript, React 19, Next-compatible App Router
- vinext and Vite targeting a Cloudflare worker runtime
- Next static export and GitHub Actions for GitHub Pages
- Browser SpeechSynthesis for pronunciation and autoplay
- Tesseract.js with local English model assets for image OCR
- Browser `localStorage` for learning state; no backend database

## Current feature areas

- Unified bilingual lookup across 14 banks and 126 unique entries
- Nine workplace banks and four scenario banks plus everyday English
- Local image OCR with extracted-word lookup
- Autoplay review with speed controls and mastery/favorite actions
- Ten-stage vocabulary adventure and due review queue
- Responsive editorial interface with desktop and mobile navigation

## Repository state

Project root: `G:\workcraft\xingxiaozhi-english-corner`

The public repository is `https://github.com/happyzhangdy-max/xingxiaozhi-english-corner`. GitHub Pages workflow publishing, HTTPS enforcement, and private vulnerability reporting are enabled. The live site is `https://happyzhangdy-max.github.io/xingxiaozhi-english-corner/`.

## Release validation

- Initial `main` commit: `718e190`
- Pages build and deployment: successful
- CI: successful on Windows, macOS, and Linux
- Live desktop flows: lookup, autoplay, adventure start, and image OCR verified
- Live 390 × 844 viewport: mobile navigation visible, no horizontal overflow
- Live browser console: zero errors and warnings during the tested flows
