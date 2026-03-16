// ─────────────────────────────────────────────────────────────────
//  stdin — Project Template
//
//  Copy this into the right file in projects/:
//    easy.js    medium.js    hard.js    expert.js
//
//  Paste it inside the array, with a comma after the previous entry.
//  Do NOT add an id: field — IDs are auto-assigned.
// ─────────────────────────────────────────────────────────────────

  {
    title: 'My Project Title',          // shown in sidebar + header
    difficulty: 'medium',               // easy | medium | hard | expert
    topic: 'Strings',                   // used in filter panel
    author: 'yourname',                 // optional — your username

    // Shown in the Problem tab. HTML is supported for inline formatting.
    description: 'Write a clear description of the task. '
      + 'Use <code>code</code> for identifiers and expected values.',

    // At least one example required. output is used for auto-verification.
    // For input() problems: input is what the user types (comma or \n separated).
    // For no-input problems: omit the input field entirely.
    // Multiline output: use \n between lines.
    // Use '...' on its own line as a wildcard for long/variable sections.
    examples: [
      { input: 'hello', output: 'HELLO', explanation: 'str.upper() converts all characters to uppercase.' },
      { input: 'Python', output: 'PYTHON' },
    ],

    // Revealed one at a time. Go from vague to specific.
    hints: ['Think about built-in string methods.', 'Try str.upper()'],

    // Shown in the editor on first open. Scaffold without giving it away.
    starter: 's = input("Enter text: ")\n# Your code here\n',

    // Valid runnable Python 3. Used to verify output structure on input() problems.
    solution: 's = input("Enter text: ")\nprint(s.upper())',

    // Shown below the solution in the Solution tab. HTML supported.
    explanation: '<code>str.upper()</code> returns a new uppercase string.',
  },
