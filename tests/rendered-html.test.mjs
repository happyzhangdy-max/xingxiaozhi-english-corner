import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the English Corner homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>行小之 · 英语角/);
  assert.match(html, /把英语，/);
  assert.match(html, /说到嘴边。/);
  assert.match(html, /查词/);
  assert.match(html, /识图/);
  assert.match(html, /自动背词/);
  assert.match(html, /单词大冒险/);
  assert.doesNotMatch(html, /Your site is taking shape|Codex is working/);
});

test("sets local-first product metadata", async () => {
  const response = await render();
  const html = await response.text();
  assert.match(html, /进度仅存本机/);
  assert.match(html, /lang="zh-CN"/);
});
