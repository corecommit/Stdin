# Stdin — Learn Python by Doing

A lightweight, in-browser Python learning environment. No installs. No sign-up. No server. Just open it and write code.

---

## What it is

Stdin is a self-contained coding practice tool for Python 3. It runs entirely in your browser using [Pyodide](https://pyodide.org/) — a full CPython runtime compiled to WebAssembly — so every line of code you write is executed by a real Python interpreter, locally, with no round-trips to any server.

There are **285 projects** spanning 4 difficulty levels and 33 topics, from printing Hello World to building dynamic programming algorithms and writing async coroutines. Each project has a problem description, runnable starter code, progressive hints, a reference solution, and auto-verification — the problem marks itself solved when your output is correct.

---

## Features

- **Live Python 3.12 interpreter** — real execution, not emulation
- **CodeMirror editor** — syntax highlighting, bracket matching, autocomplete for stdlib modules, Ctrl+Enter to run
- **Interactive terminal** — supports `input()`, multi-line output, stop mid-run
- **285 projects** across Easy / Medium / Hard / Expert
- **33 topics** — Basics, Strings, OOP, Recursion, Dynamic Programming, Async, Metaprogramming, and more
- **Auto-verification** — output is checked against expected results; solved state persists in localStorage
- **Progressive hints** — reveal one hint at a time, not all at once
- **Solution tab** — locked by default; reveals reference solution + explanation when you're ready
- **Keyboard-first** — `Ctrl+Enter` runs, `Alt+←/→` navigates projects, `Ctrl+1/2/3` switches tabs, `Escape` closes modals
- **Mobile-friendly** — fully responsive, touch-compatible resize handle, 44px tap targets
- **Light + dark mode** — follows system preference via `prefers-color-scheme`
- **Changelog panel** — fetches and renders `CHANGELOG.md` from this repo
- **No dependencies to install** — everything loads from CDN; works offline after first load

---

## Tech stack

| Layer | Technology |
|---|---|
| Python runtime | [Pyodide 0.25](https://pyodide.org/) (CPython 3.12 → WASM) |
| Editor | [CodeMirror 5](https://codemirror.net/) |
| Fonts | IBM Plex Mono + IBM Plex Sans (Google Fonts) |
| Icons | Font Awesome 6 |
| Storage | `localStorage` (solved state only) |
| Build | None — plain HTML + CSS + JS, zero build step |

---

## Project structure

```
index.html            Main shell — layout, header, sidebar, modals
app.js                All application logic — editor, Pyodide init, terminal I/O,
                      sidebar, routing, solve verification, autocomplete, changelog
styles.css            All styles — theme variables, responsive breakpoints,
                      CodeMirror theme, animations
projects.js           Loader — merges all difficulty files and auto-assigns IDs
CHANGELOG.md          Rendered in the in-app changelog panel
example-project.js    Annotated template for adding new problems

projects/
  easy.js             Easy problems   (PROJECTS_EASY)
  medium.js           Medium problems (PROJECTS_MEDIUM)
  hard.js             Hard problems   (PROJECTS_HARD)
  expert.js           Expert problems (PROJECTS_EXPERT)
```

---

## Adding projects

Use `example-project.js` as a fully annotated template. The short version:

**1. Pick the right file** based on difficulty:

| Difficulty | File |
|---|---|
| Easy | `projects/easy.js` |
| Medium | `projects/medium.js` |
| Hard | `projects/hard.js` |
| Expert | `projects/expert.js` |

**2. Append a new object** inside the array at the bottom of that file, separated by a comma:

```js
// projects/medium.js
const PROJECTS_MEDIUM = [
  // ... existing projects ...
  ,{
    title: 'Reverse Words',
    difficulty: 'medium',
    topic: 'Strings',
    description: 'Reverse the order of words in a sentence.',
    examples: [
      { input: 'hello world', output: 'world hello' }
    ],
    hints: ['Split the string into a list of words', 'Reverse the list', 'Join with a space'],
    starter: 's = input("Sentence: ")\n# Your code here\n',
    solution: 's = input("Sentence: ")\nprint(" ".join(s.split()[::-1]))',
    explanation: '<code>split()</code> breaks the string into words, <code>[::-1]</code> reverses the list, <code>join()</code> reassembles it.',
    author: 'yourname',  // optional
  }
];
```

**3. No IDs needed** — `projects.js` auto-assigns them based on position (easy → medium → hard → expert).

**4. Output matching** — the `output` field in your example is what the verifier checks against. Tips:
- Numbers are matched with float tolerance — `15.0` matches `15`
- Use `\n` for multiline output
- Use `...` on its own line as a wildcard for long or variable sections
- For `input()` problems, the solution is run silently to verify structure — so the user can type different values than your example and still get marked solved

---

## How solve verification works

When you run code, Stdin captures stdout and checks it against the expected output for the current project.

For problems with **fixed output** (no `input()`), it does a structural match — whitespace-normalised, with float tolerance.

For problems where **output depends on user input**, Stdin runs the reference solution silently with the example's inputs, then compares the structure of your output against the reference:
- Non-numeric tokens (labels like `Sum:`, `Result:`) must match exactly
- Numeric positions just need to contain a number — the value can differ
- This means entering `1` and `2` instead of the example's `10` and `5` still marks the problem solved, as long as your code prints the right structure

---

## Browser support

Any modern browser with WebAssembly support. Tested on Chrome 120+, Firefox 121+, Safari 17+. Requires a network connection on first load to fetch Pyodide and CDN assets; works offline after that.

---

## License

MIT
