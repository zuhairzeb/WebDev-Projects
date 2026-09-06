import fs from "node:fs/promises";
const url =
  "https://fonts.googleapis.com/css2?family=Archivo+Black&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400..800&family=Space+Grotesk:wght@400..700&display=swap";
const response = await fetch(url, {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
  },
});
if (!response.ok) throw Error("Font CSS unavailable");
const css = await response.text();
const blocks = [...css.matchAll(/\/\* latin \*\/\s*(@font-face\s*\{[^}]+\})/g)];
if (!blocks.length) throw Error("No Latin font files");
await fs.mkdir("public/fonts", { recursive: true });
let local = [];
let index = 0;
for (const match of blocks) {
  let block = match[1];
  const remote = block.match(/url\(([^)]+)\)/)[1];
  const family = block.match(/font-family: '([^']+)'/)[1];
  const name =
    family.toLowerCase().replaceAll(" ", "-") + "-" + index++ + ".woff2";
  const r = await fetch(remote);
  if (!r.ok) throw Error("Font download failed");
  await fs.writeFile(
    "public/fonts/" + name,
    Buffer.from(await r.arrayBuffer()),
  );
  local.push(block.replace(remote, "/fonts/" + name));
}
await fs.writeFile("src/fonts.css", local.join("\n"));
let main = await fs.readFile("src/index.css", "utf8");
main = main.replace(/^@import url\([^\n]+\);/, "@import './fonts.css';");
await fs.writeFile("src/index.css", main);
console.log("Self-hosted", blocks.length, "Latin font faces");
