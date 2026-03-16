# Changelog

All notable changes to **stdin** are documented here.

---

## v0.3.1 — 16 Mar 2026

### Added
- Warning on solution lock screen — notifies the user that revealing the solution disqualifies the problem from the leaderboard

### Fixed
- Mobile project header layout — title and buttons now stay on the same row instead of wrapping onto separate lines
- Solve times no longer submitted to leaderboard if the solution was revealed for that problem

---

## v0.3.0 — 16 Mar 2026

### Added
- **Leaderboard system** powered by Supabase — per-problem fastest solve times and global rankings
- Global leaderboard panel with three tabs: Most Solved, Fastest Average, Recent Solves
- Per-problem Leaderboard tab showing top 20 fastest times with rank, username, and time
- Username prompt on first Run — picked once, stored locally, never asked again
- Solve times submitted to Supabase automatically after each successful solve (best time kept)
- Streak tracking — daily solve streak shown on welcome screen
- Progress by topic — bar chart of solved/total per topic on welcome screen
- Random problem button — picks from unsolved problems first
- Code persistence — editor content saved to `localStorage` per problem, restored on revisit
- Execution time display in terminal bar after each run
- Search now matches problem descriptions in addition to title and topic
- Syntax highlighting in the Solution tab — matches the editor's pylab theme exactly
- Boot loading screen with progress bar while Pyodide initialises

### Fixed
- Username prompt now appears before run, not after solve popup
- Leaderboard using wrong Supabase key format (`sb_publishable_` vs `eyJ` anon key)
- Medal emojis replaced with FA trophy icons throughout leaderboard
- `commit-sha` null reference error after removing badge from header
- `copySolution` reading `pre.textContent` after switch to highlighted spans — now reads from `p.solution` directly

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