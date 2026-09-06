import { chromium, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs/promises";
await fs.mkdir("artifacts", { recursive: true });
const browser = await chromium.launch({
  channel: "msedge",
  headless: true,
  args: ["--enable-unsafe-swiftshader"],
});
const context = await browser.newContext({
  viewport: { width: 1440, height: 960 },
});
const page = await context.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
const base = process.env.PORTFOLIO_URL || "http://127.0.0.1:5175/";
const results = {};
try {
  await page.goto(base, { waitUntil: "networkidle" });
  const app = page.locator(".world-app");
  const menu = page.getByRole("navigation", { name: "World destinations" });
  await expect(page.locator("canvas")).toHaveCount(1);
  await page.screenshot({ path: "artifacts/world-home.png" });
  const travel = async (id) => {
    await menu.getByRole("button", { name: new RegExp(id, "i") }).click();
    await expect(app).toHaveAttribute("data-moving", "true");
    await expect(app).toHaveAttribute("data-zone", id, { timeout: 8000 });
    await expect(app).toHaveAttribute("data-moving", "false");
    await expect(page.locator(".destination-panel")).toBeVisible();
  };
  const visits = [];
  for (const id of [
    "about",
    "projects",
    "skills",
    "experience",
    "sociapi",
    "services",
    "contact",
    "home",
  ]) {
    const before = await app.getAttribute("data-position");
    await menu.getByRole("button", { name: new RegExp(id, "i") }).click();
    await expect(app).toHaveAttribute("data-moving", "true");
    await page.waitForTimeout(450);
    const middle = await app.getAttribute("data-position");
    expect(middle).not.toBe(before);
    await expect(app).toHaveAttribute("data-animation", "Walk");
    const pose = await app.getAttribute("data-pose");
    await page.waitForTimeout(160);
    expect(await app.getAttribute("data-pose")).not.toBe(pose);
    await expect(app).toHaveAttribute("data-zone", id, { timeout: 8000 });
    await expect(app).toHaveAttribute("data-moving", "false");
    await page.waitForTimeout(350);
    await page.screenshot({ path: `artifacts/world-${id}.png` });
    visits.push(id);
  }
  results.destinations = visits;
  results.walkCycle =
    "Actual left/right leg joint rotations change during travel";
  console.log("Eight-zone routes passed");
  await menu.getByRole("button", { name: /about/i }).click();
  await page.waitForTimeout(250);
  await menu.getByRole("button", { name: /contact/i }).click();
  await expect(app).toHaveAttribute("data-zone", "contact", { timeout: 8000 });
  await expect(app).toHaveAttribute("data-moving", "false");
  results.retarget = "Passed mid-route destination replacement";
  await travel("home");
  const start = await app.getAttribute("data-position");
  await page.keyboard.down("d");
  await page.waitForTimeout(550);
  await page.keyboard.up("d");
  await expect(app).toHaveAttribute("data-moving", "false");
  expect(await app.getAttribute("data-position")).not.toBe(start);
  results.manual = "WASD moves the character after menu navigation";
  await travel("projects");
  await expect(page.locator(".project-viewer h2")).toHaveText(
    "HomeItems Marketplace",
  );
  await page.getByRole("button", { name: "Next project", exact: true }).click();
  await expect(app).toHaveAttribute("data-moving", "true");
  await expect(app).toHaveAttribute("data-moving", "false", { timeout: 5000 });
  await expect(page.locator(".project-viewer h2")).toHaveText(
    "Sociapi Society Web",
  );
  await page
    .locator(".project-viewer summary")
    .filter({ hasText: "ALL 9 PROJECTS" })
    .click();
  await expect(page.locator(".project-index button")).toHaveCount(9);
  results.projects =
    "9 projects preserved; next exhibit causes physical travel";
  await travel("skills");
  await page.getByRole("button", { name: "WordPress ↗", exact: true }).click();
  await expect(page.locator(".skill-readout")).toContainText("Custom themes");
  results.skills = "Tool selection passed";
  await travel("experience");
  await page.getByRole("button", { name: /Checkpoint 2:/ }).click();
  await expect(app).toHaveAttribute("data-moving", "true");
  await expect(app).toHaveAttribute("data-moving", "false", { timeout: 5000 });
  await expect(page.locator(".destination-panel h2")).toContainText(
    "Data Analytics Intern",
  );
  results.checkpoints = "Character travels to selected milestone";
  await travel("contact");
  let submissions = 0;
  await page.route("https://api.web3forms.com/submit", (route) => {
    submissions++;
    return route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ success: true }),
    });
  });
  await page.locator(".terminal-form button").click();
  expect(submissions).toBe(0);
  await page.locator("#world-name").fill("Local QA");
  await page.locator("#world-email").fill("qa@example.test");
  await page.locator("#world-subject").fill("Intercepted test");
  await page
    .locator("#world-message")
    .fill("No message leaves the local browser.");
  const inputStart = await app.getAttribute("data-position");
  await page.locator("#world-message").press("w");
  await page.waitForTimeout(200);
  expect(await app.getAttribute("data-position")).toBe(inputStart);
  await page.locator(".terminal-form button").click();
  await expect(page.locator(".form-feedback")).toContainText(
    "Message received",
  );
  await expect(app).toHaveAttribute("data-animation", "Celebrate");
  expect(submissions).toBe(1);
  results.contact =
    "Validation, input-safe keys, intercepted success and character celebration passed";
  await menu.getByRole("button", { name: /home/i }).click();
  await page.waitForTimeout(300);
  await page.getByRole("button", { name: "PAUSE Ⅱ", exact: true }).click();
  await page.waitForTimeout(200);
  const paused = await app.getAttribute("data-position");
  await page.waitForTimeout(400);
  expect(await app.getAttribute("data-position")).toBe(paused);
  await page.getByRole("button", { name: "RESUME ▶", exact: true }).click();
  await expect(app).toHaveAttribute("data-zone", "home", { timeout: 8000 });
  results.pause = "Motion freezes and resumes";
  const axe = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  results.accessibility = axe.violations.map((v) => ({
    id: v.id,
    nodes: v.nodes.map((n) => ({
      target: n.target,
      summary: n.failureSummary,
    })),
  }));
  await page.getByRole("button", { name: "SIMPLE VIEW ↗" }).click();
  await expect(page.locator("canvas")).toHaveCount(0);
  await travel("about");
  results.simple = "SVG world navigates with character travel";
  await page.emulateMedia({ reducedMotion: "reduce" });
  await menu.getByRole("button", { name: /projects/i }).click();
  await expect(app).toHaveAttribute("data-zone", "projects");
  await expect(app).toHaveAttribute("data-moving", "false");
  await expect(page.locator("canvas")).toHaveCount(0);
  results.reducedMotion =
    "Immediate accessible destination navigation without WebGL";
  results.errors = errors;
  expect(errors).toEqual([]);
  expect(results.accessibility).toEqual([]);
} finally {
  await fs.writeFile(
    "artifacts/world-qa.json",
    JSON.stringify(results, null, 2),
  );
  console.log(JSON.stringify(results, null, 2));
  await browser.close();
}
