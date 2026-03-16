// ── PROJECTS LOADER ───────────────────────
// Merges all difficulty files in order: easy → medium → hard → expert..
// IDs are auto-assigned here — do NOT put id: fields in the difficulty files.

const PROJECTS = [
  ...PROJECTS_EASY,
  ...PROJECTS_MEDIUM,
  ...PROJECTS_HARD,
  ...PROJECTS_EXPERT,
].map((p, i) => ({ id: i, ...p }));