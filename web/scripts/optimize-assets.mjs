import fs from "node:fs/promises";
import sharp from "sharp";
await fs.mkdir("public/optimized", { recursive: true });
let before = 0,
  after = 0;
for (const file of await fs.readdir("public")) {
  if (!/\.(png|jpg)$/i.test(file) || file === "og-image.png") continue;
  const src = "public/" + file;
  const dest = "public/optimized/" + file.replace(/\.(png|jpg)$/i, ".webp");
  before += (await fs.stat(src)).size;
  await sharp(src)
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 85, effort: 6 })
    .toFile(dest);
  after += (await fs.stat(dest)).size;
}
const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="630" fill="#f4f1e8"/><path d="M50 80H1150M50 550H1150" stroke="#111" stroke-width="3"/><g font-family="Arial,sans-serif"><text x="55" y="58" font-size="20" font-weight="bold">MZZ.</text><text x="860" y="58" font-size="15">PORTFOLIO / 2026</text><text x="50" y="205" font-size="88" font-weight="900" letter-spacing="-5">MUHAMMAD</text><text x="50" y="330" font-size="130" fill="#2357ff" font-weight="900" letter-spacing="-6">ZUHAIR ZEB</text><text x="55" y="420" font-size="29">WordPress Developer. Web Developer.</text><text x="55" y="465" font-size="25">AI student. Community builder.</text><text x="55" y="590" font-size="16">PESHAWAR, PAKISTAN</text><text x="880" y="590" font-size="16">LET'S BUILD SOMETHING USEFUL.</text></g><rect x="990" y="150" width="130" height="130" fill="#c6f36a" stroke="#111" stroke-width="3"/><path d="M1020 250L1090 180M1030 180H1090V240" fill="none" stroke="#111" stroke-width="9"/></svg>`;
await sharp(Buffer.from(svg)).png().toFile("public/og-image.png");
console.log(
  JSON.stringify({
    originalBytes: before,
    webpBytes: after,
    savedPercent: Math.round((1 - after / before) * 100),
  }),
);
