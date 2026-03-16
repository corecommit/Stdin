// ── PROJECTS LOADER ───────────────────────
// Merges all difficulty files in order: easy → medium → hard → expert.
// To add a project, just append it to the right file in the projects/ folder.
// IDs are auto-assigned here — do NOT put id: fields in the difficulty files.

const PROJECTS = [
  ...PROJECTS_EASY,
  ...PROJECTS_MEDIUM,
  ...PROJECTS_HARD,
  ...PROJECTS_EXPERT,
].map((p, i) => ({ id: i, ...p }));
