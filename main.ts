// gta6-meme-x-01 v6 — "Ghost Mengantar GTA VI"
// Copies POST.json from the repo root to the output directory, byte-for-byte.
// This program does NOT post to X; the user posts the meme themselves.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
const post = readFileSync(join(repoRoot, "POST.json"));

// Sanity check: POST.json must be valid JSON with a url field before copying.
const parsed = JSON.parse(post.toString("utf8")) as { url?: unknown };
if (typeof parsed.url !== "string" || !parsed.url.startsWith("https://")) {
  throw new Error("POST.json must contain a valid https url");
}

writeFileSync(join(outDir, "POST.json"), post);
console.log(`wrote ${post.length} bytes to ${join(outDir, "POST.json")}`);
