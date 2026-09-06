import fs from "node:fs/promises";
const data = JSON.parse(await fs.readFile("src/data/portfolio.json", "utf8"));
const urls = [
  ...new Set(
    data.projects
      .flatMap((p) => [p.liveDemo, p.github, p.caseStudyUrl])
      .filter(Boolean),
  ),
];
const results = await Promise.all(
  urls.map(async (url) => {
    try {
      const r = await fetch(url, {
        method: "GET",
        signal: AbortSignal.timeout(15000),
        headers: { "User-Agent": "Mozilla/5.0" },
      });
      await r.body?.cancel();
      return { url, status: r.status, final: r.url };
    } catch (e) {
      return { url, status: "unverified", reason: e.cause?.code || e.message };
    }
  }),
);
await fs.writeFile(
  "artifacts/external-links.json",
  JSON.stringify(results, null, 2),
);
console.log(JSON.stringify(results, null, 2));
