import { copyFile, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { gunzipSync } from "node:zlib";

const root = process.cwd();
const output = resolve(root, "public", "tesseract");
const coreOutput = resolve(output, "core");
const languageOutput = resolve(output, "lang");

await Promise.all([
  mkdir(coreOutput, { recursive: true }),
  mkdir(languageOutput, { recursive: true }),
]);

await copyFile(
  resolve(root, "node_modules", "tesseract.js", "dist", "worker.min.js"),
  resolve(output, "worker.min.js"),
);

const compressedLanguageData = await readFile(
  resolve(
    root,
    "node_modules",
    "@tesseract.js-data",
    "eng",
    "4.0.0_best_int",
    "eng.traineddata.gz",
  ),
);
await writeFile(
  resolve(languageOutput, "eng.traineddata"),
  gunzipSync(compressedLanguageData),
);
await rm(resolve(languageOutput, "eng.traineddata.gz"), { force: true });

const coreSource = resolve(root, "node_modules", "tesseract.js-core");
const coreFiles = (await readdir(coreSource)).filter((name) =>
  /^tesseract-core.*\.wasm\.js$/.test(name),
);

await Promise.all(
  coreFiles.map((name) =>
    copyFile(resolve(coreSource, name), resolve(coreOutput, name)),
  ),
);
