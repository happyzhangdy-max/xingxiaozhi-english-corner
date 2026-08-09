import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("keeps the English and Japanese corners on the same first-screen rhythm", async () => {
  const source = await readFile(
    new URL("../app/components/home-panel.tsx", import.meta.url),
    "utf8",
  );
  const orderedRegions = [
    "home-title",
    'aria-label="查词"',
    'aria-label="首页主功能"',
    'aria-label="我的学习进度"',
    'aria-label="单词大冒险"',
  ];

  let previousIndex = -1;
  for (const marker of orderedRegions) {
    const currentIndex = source.indexOf(marker);
    assert.ok(currentIndex > previousIndex, `${marker} should follow the previous region`);
    previousIndex = currentIndex;
  }

  assert.match(source, /拍照识图/);
  assert.match(source, /自动背单词/);
  assert.match(source, /onNavigate\("scan"\)/);
  assert.match(source, /onNavigate\("adventure"\)/);
});

test("stacks the paired feature cards on phone-sized screens", async () => {
  const css = await readFile(
    new URL("../app/components/home-panel.module.css", import.meta.url),
    "utf8",
  );

  assert.match(css, /@media \(max-width: 720px\)[\s\S]*?\.primaryGrid\s*\{\s*grid-template-columns: 1fr;/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /prefers-reduced-transparency: reduce/);
});
