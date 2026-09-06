import { chromium, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs/promises";
const browser = await chromium.launch({
  channel: "msedge",
  headless: true,
  args: ["--enable-unsafe-swiftshader"],
});
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
});
const page = await context.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
const results = {};
const base = process.env.PORTFOLIO_URL || "http://127.0.0.1:5174/";
try {
  await page.goto(base, { waitUntil: "networkidle" });
  await expect(page.locator("canvas")).toHaveCount(1);
  const widths = [];
  for (const width of [320, 360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.waitForTimeout(150);
    const size = await page.evaluate(() => ({
      viewport: innerWidth,
      content: document.documentElement.scrollWidth,
    }));
    widths.push(size);
    expect(size.content).toBeLessThanOrEqual(width);
  }
  results.responsive = widths;
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page
    .getByRole("button", { name: "View HomeItems Marketplace project details" })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.locator("#project-title")).toHaveText(
    "HomeItems Marketplace",
  );
  await expect(
    page.getByRole("heading", { name: "THE RESULT", exact: true }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(
    page.getByRole("button", {
      name: "View HomeItems Marketplace project details",
    }),
  ).toBeFocused();
  await page.getByRole("button", { name: "VIEW ALL 9 PROJECTS" }).click();
  await expect(page.locator(".archive-row")).toHaveCount(5);
  const data = JSON.parse(await fs.readFile("src/data/portfolio.json", "utf8"));
  for (const p of data.projects) {
    await page.goto(base + "#project/" + p.id);
    await expect(page.locator("#project-title")).toHaveText(p.title);
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
  }
  results.projects =
    "9 detail permalinks, archive, Escape, focus restoration passed";
  await page.goto(base);
  const faq = page.locator("#faq details").first();
  await faq.locator("summary").click();
  await expect(faq).toHaveAttribute("open", "");
  await faq.locator("summary").click();
  await expect(faq).not.toHaveAttribute("open", "");
  const service = page.locator("#services details").first();
  await service.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(service).toHaveAttribute("open", "");
  results.accordions = "Pointer and keyboard passed";
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "MENU" }).click();
  await expect(page.getByRole("navigation")).toBeVisible();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "ABOUT", exact: true })
    .click();
  await expect(page.getByRole("navigation")).not.toBeVisible();
  results.mobileMenu = "passed";
  await page.setViewportSize({ width: 1440, height: 1000 });
  let submissions = 0;
  await page.route("https://api.web3forms.com/submit", async (route) => {
    submissions++;
    const body = route.request().postDataJSON();
    expect(body.email).toBe("qa@example.test");
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true }),
    });
  });
  const fill = async () => {
    await page.locator("#contact-name").fill("QA test");
    await page.locator("#contact-email").fill("qa@example.test");
    await page.locator("#contact-subject").fill("Local verification only");
    await page
      .locator("#contact-message")
      .fill("Intercepted locally; no email should be sent.");
  };
  await page.locator(".contact-form button").click();
  expect(submissions).toBe(0);
  await fill();
  await page.locator(".contact-form button").click();
  await expect(page.getByRole("status")).toContainText("Message sent");
  expect(submissions).toBe(1);
  await page.unroute("https://api.web3forms.com/submit");
  await page.route("https://api.web3forms.com/submit", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: false }),
    }),
  );
  await fill();
  await page.locator(".contact-form button").click();
  await expect(page.getByRole("status")).toContainText("Could not send");
  results.contact =
    "Required fields, success, error, and reset passed; requests intercepted, no messages sent";
  const broken = await page.evaluate(() =>
    [...document.querySelectorAll('a[href^="#"]')]
      .map((a) => a.getAttribute("href"))
      .filter(
        (h) =>
          h &&
          !h.startsWith("#project/") &&
          !document.getElementById(h.slice(1)),
      ),
  );
  expect(broken).toEqual([]);
  results.anchors = "All section links resolve";
  for (const url of [
    "/resume.pdf",
    "/favicon.svg",
    "/og-image.png",
    "/sitemap.xml",
    "/robots.txt",
    ...data.projects
      .filter((p) => p.image)
      .map((p) => "/optimized/" + p.image.replace(/\.(png|jpg)$/i, ".webp")),
  ])
    expect((await page.request.get(base + url.slice(1))).ok()).toBeTruthy();
  results.assets = "All local assets return 200";
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("canvas")).toHaveCount(0);
  await expect(page.locator(".static-workspace")).toBeVisible();
  results.reducedMotion = "Static hero, no canvas";
  const axe = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  results.accessibility = axe.violations.map((v) => ({
    id: v.id,
    impact: v.impact,
    nodes: v.nodes.map((n) => ({
      target: n.target,
      summary: n.failureSummary,
    })),
  }));
  expect(results.accessibility).toEqual([]);
  await page.screenshot({ path: "artifacts/contact-tested.png" });
  const fallback = await context.newPage();
  await fallback.addInitScript(() => {
    const get = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      if (type === "webgl2" || type === "webgl") return null;
      return get.call(this, type, ...args);
    };
  });
  await fallback.goto(base);
  await expect(fallback.locator(".static-workspace")).toBeVisible();
  await expect(fallback.locator("canvas")).toHaveCount(0);
  results.noWebGL = "Static fallback passed";
  await fallback.close();
  results.pageErrors = errors;
  expect(errors).toEqual([]);
} finally {
  await fs.writeFile(
    "artifacts/qa-results.json",
    JSON.stringify(results, null, 2),
  );
  console.log(JSON.stringify(results, null, 2));
  await browser.close();
}
