import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("theme-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders an accessible theme switch", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /切换为亮色主题/);
  assert.match(html, /aria-pressed="false"/);
});

test("defines persistent light-theme and accessibility contracts", async () => {
  const [layout, themeCss] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/theme.css", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /xingxiaozhi-theme/);
  assert.match(layout, /prefers-color-scheme: light/);
  assert.match(themeCss, /:root\[data-theme="light"\]/);
  assert.match(themeCss, /prefers-reduced-transparency: reduce/);
  assert.match(themeCss, /prefers-contrast: more/);
});
