import { chromium, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs/promises";
const browser = await chromium.launch({
  channel: "msedge",
  headless: true,
  args: ["--enable-unsafe-swiftshader"],
});
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  hasTouch: true,
  isMobile: true,
  deviceScaleFactor: 1,
});
const page = await context.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await page.goto(process.env.PORTFOLIO_URL || "http://127.0.0.1:5175/", {
  waitUntil: "networkidle",
});
const app = page.locator(".world-app");
await expect(page.locator(".world-cursor")).not.toBeVisible();
const sizes = [];
for (const [width, height] of [
  [320, 740],
  [390, 844],
  [768, 1024],
  [844, 390],
]) {
  await page.setViewportSize({ width, height });
  await page.waitForTimeout(180);
  const size = await page.evaluate(() => ({
    width: innerWidth,
    height: innerHeight,
    scrollWidth: document.documentElement.scrollWidth,
    scrollHeight: document.documentElement.scrollHeight,
  }));
  sizes.push(size);
  expect(size.scrollWidth).toBe(width);
  expect(size.scrollHeight).toBe(height);
}
await page.setViewportSize({ width: 390, height: 844 });
await page.screenshot({ path: "artifacts/world-mobile-home.png" });
for (const id of ["projects", "sociapi", "contact"]) {
  await page
    .getByRole("navigation", { name: "World destinations" })
    .getByRole("button", { name: new RegExp(id, "i") })
    .tap();
  await expect(app).toHaveAttribute("data-moving", "true");
  await expect(app).toHaveAttribute("data-zone", id, { timeout: 8000 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: `artifacts/world-mobile-${id}.png` });
}
const axe = await new AxeBuilder({ page })
  .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
  .analyze();
const violations = axe.violations.map((v) => ({
  id: v.id,
  nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
}));
const fallback = await browser.newContext({
  viewport: { width: 1440, height: 960 },
});
const fp = await fallback.newPage();
await fp.addInitScript(() => {
  const orig = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function (kind, ...args) {
    if (kind === "webgl" || kind === "webgl2") return null;
    return orig.call(this, kind, ...args);
  };
});
await fp.goto(process.env.PORTFOLIO_URL || "http://127.0.0.1:5175/");
await expect(fp.locator("canvas")).toHaveCount(0);
await fp
  .getByRole("navigation", { name: "World destinations" })
  .getByRole("button", { name: /contact/i })
  .click();
await expect(fp.locator(".world-app")).toHaveAttribute("data-zone", "contact", {
  timeout: 8000,
});
await expect(fp.locator(".terminal-form")).toBeVisible();
console.log(
  JSON.stringify(
    {
      sizes,
      violations,
      errors,
      noWebGL: "Destination travel and contact content work",
      touch: "Destination travel and disabled cursor passed",
    },
    null,
    2,
  ),
);
await fs.writeFile(
  "artifacts/world-mobile-qa.json",
  JSON.stringify({ sizes, violations, errors }, null, 2),
);
await browser.close();
expect(violations).toEqual([]);
expect(errors).toEqual([]);
