# Changelog

All notable changes to **stdin** are documented here.

---

## v0.2.0 — 16 Mar 2026

### Added
- Boot loading screen with progress bar — shown while Pyodide initialises
- Welcome screen meta row — GitHub link, Changelog button, and commit SHA badge
- Changelog panel — fetches and renders `CHANGELOG.md` from the repo with full markdown support (headings, code blocks, lists, bold, dividers, links)
- Commit SHA badge linking to GitHub commits
- GitHub icon linking to the repo
- Filter panel — replaces flat difficulty tabs with a dropdown containing difficulty chips and topic chips
- Filter badge showing count of active filters
- Skeleton loading for the project list while JS boots
- Author field on projects — contributors can tag their username, shown in sidebar and project header
- `example-project.js` — annotated template for adding new problems
- Split project data into `projects/easy.js`, `medium.js`, `hard.js`, `expert.js`
- Auto ID assignment — no manual `id:` needed when adding problems
- `projects.js` loader — merges all difficulty files and assigns IDs automatically

### Fixed
- Auto-submit now works for all problem types — runs reference solution silently and compares output structure instead of relying on fragile heuristics
- FizzBuzz and Multiplication Table auto-submit failing due to abbreviated `...` example outputs — fixed example outputs and added `...` wildcard support to `outputMatches`
- `outputMatches` false-positives from loose `includes()` check
- `verifyAgainstSolution` only triggered for labelled-output problems — now runs for all `input()` problems
- Skeleton list not scrollable during Pyodide load
- Filter panel functions missing from final `app.js` build
- Double `];` syntax error in `expert.js` from incorrect block splitting
- `commit-sha` element not found error after removing badge from header

---

## v0.1.0 — 15 Mar 2026

### Added
- Initial project setup with **285 Python problems** across 4 difficulty levels
- In-browser Python 3.12 execution via **Pyodide** — no installs, no server
- **CodeMirror editor** with syntax highlighting, autocomplete, bracket matching
- **Live terminal** with `input()` support and resize handle
- Auto-submit — output is verified against the reference solution automatically
- Solution reveal with explanation (locked until you attempt)
- Progressive **hints** system — reveal one at a time
- **Sidebar** with search, difficulty filter, and topic filter
- **Solved progress** saved to `localStorage`
- Reset progress with confirmation modal
- Keyboard shortcuts — `Ctrl+Enter` to run, `Alt+←/→` to navigate, `Ctrl+1/2/3` for tabs
- Solved celebration overlay with confetti animation
- Light/dark mode via `prefers-color-scheme`
- Mobile responsive layout with slide-in sidebar
