# Fluent — Learn Python by Doing

A lightweight, in-browser Python learning environment. No installs. No sign-up. No server. Just open it and write code.

---

## What it is

Fluent is a self-contained coding practice tool for Python 3. It runs entirely in your browser using [Pyodide](https://pyodide.org/) — a full CPython runtime compiled to WebAssembly — so every line of code you write is executed by a real Python interpreter, locally, with no round-trips to any server.

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
index.html      Main shell — layout, header, sidebar, modals
app.js          All application logic — editor, Pyodide init, terminal I/O,
                sidebar, routing, solve verification, autocomplete
styles.css      All styles — theme variables, responsive breakpoints,
                CodeMirror theme, animations
projects.js     Project data — 285 entries, each with title, difficulty,
                topic, description, examples, hints, starter code,
                solution, and explanation
```

---

## How solve verification works

When you run code, Fluent captures stdout and checks it against the expected output for the current project.

For problems with fixed output (no `input()`), it does a structural match — whitespace-normalised, with float tolerance.

For problems where output depends on what the user types, Fluent distinguishes two cases:

**Labelled output** (e.g. `Sum: 15.0`, `Diff: 5.0`) — The solution is silently re-run with the example's inputs to generate a reference. Your output is then compared label-by-label: the text labels must match exactly, but the numeric values are accepted regardless of what you typed in. This means entering `1` and `2` instead of the example's `10` and `5` still marks the problem solved, as long as your code prints the right labels.

**Plain output** (e.g. a reversed string, odd/even) — Your output is matched directly against the example. If it doesn't match (because you typed a different input), Fluent falls back to checking that your output has the same number of lines as expected and is non-empty — accepting it as correct if the structure is right.

---

## Adding projects

Each project is an object in `projects.js`:

```js
{
  id: 285,                      // sequential, unique
  title: 'My Project',
  difficulty: 'medium',         // easy | medium | hard | expert
  topic: 'Strings',
  description: 'HTML allowed for <code>inline code</code>.',
  examples: [
    {
      input: 'hello',           // optional — shown in problem tab
      output: 'HELLO',          // used for solve verification
      explanation: 'str.upper() converts all characters.'
    }
  ],
  hints: [
    'Try the str.upper() method',
    'Methods are called with dot notation: s.upper()'
  ],
  starter: 's = input("Enter text: ")\n# Your code here\n',
  solution: 's = input("Enter text: ")\nprint(s.upper())',
  explanation: '<code>str.upper()</code> returns a new string with all characters uppercased.'
}
```

---

## Browser support

Any modern browser with WebAssembly support. Tested on Chrome 120+, Firefox 121+, Safari 17+. Requires a network connection on first load to fetch Pyodide and CDN assets; works offline after that.

---

## License

MIT
