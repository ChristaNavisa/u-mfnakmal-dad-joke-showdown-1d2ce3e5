import { mkdirSync, writeFileSync } from "node:fs";

// Dad Joke Showdown — one original dad joke, written from scratch.
// A father-of-three at the dinner table, straight-faced delivery:
// the washing machine as the family therapist, with the pun landing
// on the very last words.
const JOKE =
  "I told my kids the washing machine is the family therapist. It listens to all our secrets and never airs our dirty laundry.";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", JOKE, "utf8");
