import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
await fs.mkdir("artifacts", { recursive: true });
const browser = await chromium.launch({
  channel: "msedge",
  headless: true,
  args: ["--enable-unsafe-swiftshader"],
});
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
});
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
await page.goto("http://127.0.0.1:5174/", { waitUntil: "networkidle" });
await page.screenshot({ path: "artifacts/desktop-hero.png" });
await page.locator("#projects").scrollIntoViewIfNeeded();
await page.screenshot({ path: "artifacts/desktop-work.png" });
await page.screenshot({ path: "artifacts/desktop-full.png", fullPage: true });
console.log(
  JSON.stringify({
    errors,
    title: await page.title(),
    canvas: await page.locator("canvas").count(),
    overflow: await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
  }),
);
await page.setViewportSize({ width: 390, height: 844 });
await page.goto("http://127.0.0.1:5174/", { waitUntil: "networkidle" });
await page.screenshot({ path: "artifacts/mobile-hero.png" });
await page.screenshot({ path: "artifacts/mobile-full.png", fullPage: true });
console.log(
  "mobile overflow",
  await page.evaluate(() => ({
    width: innerWidth,
    scroll: document.documentElement.scrollWidth,
    offenders: [...document.querySelectorAll("body *")]
      .filter((e) => {
        const r = e.getBoundingClientRect();
        return r.width > 0 && (r.right > innerWidth + 1 || r.left < -1);
      })
      .slice(0, 20)
      .map((e) => e.className),
  })),
);
await browser.close();
