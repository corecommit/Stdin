# Changelog

All notable changes to **stdin** are documented here.

---

## [Unreleased]

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
- Filter panel with pill-style chips for difficulty and topic
- Skeleton loading for the project list
- **Solved progress** saved to `localStorage`
- Reset progress with confirmation modal
- Keyboard shortcuts — `Ctrl+Enter` to run, `Alt+←/→` to navigate, `Ctrl+1/2/3` for tabs
- Solved celebration overlay with confetti animation
- Project **author** field — contributors can tag their username on problems
- **Commit badge** in header showing latest SHA, linking to GitHub
- **Changelog panel** fetching and rendering `CHANGELOG.md` from the repo
- Split project data into `projects/easy.js`, `medium.js`, `hard.js`, `expert.js`
- Auto ID assignment — no manual `id:` needed when adding problems
- Light/dark mode via `prefers-color-scheme`
- Mobile responsive layout with slide-in sidebar

### Fixed
- FizzBuzz and Multiplication Table auto-submit failing due to abbreviated example outputs
- `outputMatches` false-positives from loose `includes()` check
- `verifyAgainstSolution` only triggered for labelled-output problems — now runs for all `input()` problems
- Skeleton list not scrollable during Pyodide load
- Filter panel functions missing from final `app.js` build
- Double `];` syntax error in `expert.js` from incorrect block splitting
