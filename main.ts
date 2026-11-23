import { mkdirSync, renameSync, writeFileSync } from "node:fs";

// Dad Joke Showdown — one original dad joke, written from scratch.
// A father-of-three at the dinner table, straight-faced delivery:
// the washing machine as the family therapist, with the pun landing
// on the very last words.
const JOKE =
  "I told my kids the washing machine is the family therapist. It listens to all our secrets and never airs our dirty laundry.";

// Guard: a valid entry is one line of 1-200 characters, real UTF-8 text,
// and not just whitespace. Throws on any violation so a bad joke can
// never be written out silently.
function validateJoke(joke: string): void {
  const bytes = Buffer.byteLength(joke, "utf8");
  if (bytes === 0 || joke.length < 1 || joke.length > 200) {
    throw new Error(`joke must be 1-200 characters, got ${joke.length}`);
  }
  if (joke.trim().length === 0) {
    throw new Error("joke must not be blank or whitespace only");
  }
  if (joke.includes("\n") || joke.includes("\r")) {
    throw new Error("joke must be a single line");
  }
}

// Write the entry atomically: write to a temp file in the same directory,
// then rename over the final path, so a reader never sees a partial file.
function writeEntry(path: string, content: string): void {
  const tmpPath = `${path}.tmp`;
  writeFileSync(tmpPath, content, "utf8");
  renameSync(tmpPath, path);
}

validateJoke(JOKE);

mkdirSync("/output", { recursive: true });
writeEntry("/output/entry.txt", JOKE);
