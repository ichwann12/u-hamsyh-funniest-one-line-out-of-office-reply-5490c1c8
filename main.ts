// Funniest One-Line Out-of-Office Reply — u-hamsyh-funniest-one-line-out-of-office-reply-5490c1c8
// Reads the single entry line from entry.txt next to this file and writes it
// verbatim to <output dir>/entry.txt. Node 22+ stdlib only: no network,
// no wall clock, no randomness — the output is deterministic.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));
let entry = readFileSync(join(repoRoot, "entry.txt"), "utf8");

// Tolerate a trailing newline an editor may have added; the entry itself
// is a single line with no newline in it.
if (entry.endsWith("\n")) entry = entry.slice(0, -1);

// The gate counts characters: the line must be 1-160 chars and not only
// whitespace. Fail loudly rather than writing an invalid entry.
const trimmed = entry.trim();
if (trimmed.length < 1 || trimmed.length > 160) {
  throw new Error(`entry.txt must be 1-160 characters, got ${trimmed.length}`);
}
if (entry.includes("\n")) {
  throw new Error("entry.txt must be a single line");
}

const outputDir =
  process.env.MAKEFUN_OUTPUT_DIR ?? process.env.MAKEFUN_BOT_DIR ?? "/output";
mkdirSync(resolve(outputDir), { recursive: true });
writeFileSync(join(resolve(outputDir), "entry.txt"), entry, "utf8");
