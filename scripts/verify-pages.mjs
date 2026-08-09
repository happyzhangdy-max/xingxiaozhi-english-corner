import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const outputRoot = resolve("out");
const html = readFileSync(resolve(outputRoot, "index.html"), "utf8");
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const inferredBasePath = html.match(/(?:src|href)="([^"?]*)\/_next\//)?.[1];
const basePath = repositoryName ? `/${repositoryName}` : inferredBasePath || "";

const assetReferences = [...html.matchAll(/(?:src|href)="([^"]+)"/g)]
  .map((match) => match[1])
  .filter((value) => value.startsWith(`${basePath}/`));

const localPath = (webPath) =>
  resolve(outputRoot, webPath.slice(basePath.length + 1));
const missingReferences = assetReferences.filter(
  (webPath) => !existsSync(localPath(webPath)),
);
const requiredOcrAssets = [
  "tesseract/worker.min.js",
  "tesseract/lang/eng.traineddata",
  "tesseract/core/tesseract-core.wasm.js",
  "tesseract/core/tesseract-core-simd.wasm.js",
];
const missingOcrAssets = requiredOcrAssets.filter(
  (file) => !existsSync(resolve(outputRoot, file)),
);

if (!html.includes("<title>行小之 · 英语角</title>")) {
  throw new Error("Static homepage metadata is missing.");
}
if (basePath && !html.includes(`${basePath}/_next/`)) {
  throw new Error(`Static assets are not prefixed with ${basePath}.`);
}
if (missingReferences.length || missingOcrAssets.length) {
  throw new Error(
    `Missing static files: ${[...missingReferences, ...missingOcrAssets].join(", ")}`,
  );
}

console.log(
  `Pages artifact verified: ${assetReferences.length} HTML assets and ${requiredOcrAssets.length} OCR assets.`,
);
