// ═══════════════════════════════════════════
// PyLab — app.js
// ═══════════════════════════════════════════

// ── STATE ─────────────────────────────────
let currentId      = null;
let activeFilter   = 'all';
let activeTopic    = 'all';
let solved         = new Set();
let editor         = null;

// Per-project saved code (code persistence)
const savedCode    = {};

// Execution timing
let runStartTime   = 0;

// Stores the solve time for each project (set when auto-verified correct)
const solveTimeMs  = {};

// Rate limit: tracks last submit time per project
const lastSubmitAt = {};
const SUBMIT_COOLDOWN_MS = 60000; // 60 seconds

// ── PYODIDE STATE ─────────────────────────
let pyodide          = null;
let pyodideReady     = false;
let pyodidePromise   = null; // shared promise — prevents double-init

// Holds the resolve function for the current input() call
let inputResolve   = null;
let waitingInput   = false;

// Execution control
let isRunning      = false;
let runAbortFlag   = false;

// Per-project solution reveal tracking
const revealedSet  = new Set();

// Hint state per project
const hintState    = {};

// ── BOOT ──────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Load solved set from localStorage; validate IDs still exist
  try {
    const s = localStorage.getItem('pylab_solved');
    if (s) {
      const raw = JSON.parse(s);
      const validIds = new Set(PROJECTS.map(p => p.id));
      solved = new Set(raw.filter(id => validIds.has(id)));
      if (solved.size !== raw.length) {
        localStorage.setItem('pylab_solved', JSON.stringify([...solved]));
      }
    }
  } catch (e) {
    console.warn('PyLab: could not restore solved state:', e);
  }

  buildTopicFilter();
  renderSkeletons();
  initEditor();
  renderSidebar();
  updateCounter();
  updateWelcomeStats();
  updateStreak();
  updateTopicProgress();
  loadSavedCode();
  bindKeys();
  initResizeHandle();

  document.addEventListener('click', e => {
    const panel = document.getElementById('filter-panel');
    const btn   = document.getElementById('filter-btn');
    if (panel && panel.classList.contains('open') &&
        !panel.contains(e.target) && btn && !btn.contains(e.target)) {
      closeFilterPanel();
    }
  });

  document.getElementById('terminal-input').addEventListener('keydown', onTerminalInputKey);

  // Auth form Enter key handlers
  ['login-username','login-password'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });
  });
  ['reg-username','reg-password','reg-confirm'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('keydown', e => { if (e.key === 'Enter') doRegister(); });
  });

  updateAuthBadge();
  termHideInput();

  // Pre-load Pyodide — store the shared promise
  pyodidePromise = initPyodide();

  // Fetch latest commit SHA for version badge (non-blocking); cached per session
  const cachedSha = sessionStorage.getItem('pylab_commit_sha');
  if (cachedSha) {
    const w = document.getElementById('welcome-commit-sha');
    const c = document.getElementById('commit-sha');
    if (w) w.textContent = cachedSha;
    if (c) c.textContent = cachedSha;
  } else {
    fetch('https://api.github.com/repos/corecommit/Stdin/commits/HEAD', {
      headers: { 'Accept': 'application/vnd.github+json' }
    })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(c => {
        const sha = c.sha.slice(0, 7);
        sessionStorage.setItem('pylab_commit_sha', sha);
        const w = document.getElementById('welcome-commit-sha');
        const h = document.getElementById('commit-sha');
        if (w) w.textContent = sha;
        if (h) h.textContent = sha;
      })
      .catch(() => {
        const w = document.getElementById('welcome-commit-sha');
        if (w) w.textContent = 'unknown';
      });
  }
});

// ── WELCOME STATS ─────────────────────────
function updateWelcomeStats() {
  const counts = { total: PROJECTS.length, easy: 0, medium: 0, hard: 0, expert: 0 };
  PROJECTS.forEach(p => { if (counts[p.difficulty] !== undefined) counts[p.difficulty]++; });

  const colors = { total: 'var(--text)', easy: 'var(--easy)', medium: 'var(--medium)', hard: 'var(--hard)', expert: 'var(--expert)' };
  const labels = { total: 'Total', easy: 'Easy', medium: 'Medium', hard: 'Hard', expert: 'Expert' };

  document.getElementById('welcome-stats').innerHTML =
    Object.entries(counts).map(([k, v]) => `
      <div class="stat-cell">
        <span class="stat-num" style="color:${colors[k]}">${v}</span>
        <span class="stat-lbl">${labels[k]}</span>
      </div>
    `).join('');
}

// ── HOME NAVIGATION ───────────────────────
function goHome() {
  currentId = null;
  document.getElementById('welcome').style.display      = '';
  document.getElementById('project-view').style.display = 'none';
  updateWelcomeStats();
  updateStreak();
  updateTopicProgress();
}

// Start the first unsolved project (or project 0 if all solved)
function startFirstUnsolved() {
  const first = PROJECTS.find(p => !solved.has(p.id));
  openProject(first ? first.id : PROJECTS[0].id);
}

// ── RANDOM PROJECT ────────────────────────
function openRandomProject() {
  const unsolved = PROJECTS.filter(p => !solved.has(p.id));
  const pool = unsolved.length ? unsolved : PROJECTS;
  const pick = pool[Math.floor(Math.random() * pool.length)];
  openProject(pick.id);
}

// ── STREAK TRACKING ───────────────────────
function updateStreak() {
  const today     = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  let streak = 0;
  let lastDay = '';
  try {
    const data = JSON.parse(localStorage.getItem('pylab_streak') || '{}');
    streak  = data.streak  || 0;
    lastDay = data.lastDay || '';
  } catch (_) {}

  // If we solved something today already, streak is current
  // We'll update the streak when a problem is first solved each day
  const el    = document.getElementById('welcome-streak');
  const count = document.getElementById('streak-count');
  if (streak > 0 && el && count) {
    count.textContent = streak;
    el.style.display = 'flex';
  }
}

function recordSolveForStreak() {
  const today     = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  let streak  = 0;
  let lastDay = '';
  try {
    const data = JSON.parse(localStorage.getItem('pylab_streak') || '{}');
    streak  = data.streak  || 0;
    lastDay = data.lastDay || '';
  } catch (_) {}

  if (lastDay === today) return; // already recorded today
  streak = (lastDay === yesterday) ? streak + 1 : 1;
  localStorage.setItem('pylab_streak', JSON.stringify({ streak, lastDay: today }));
  updateStreak();
}

// ── TOPIC PROGRESS ────────────────────────
function updateTopicProgress() {
  const row = document.getElementById('topic-progress-row');
  if (!row) return;

  // Build per-topic totals and solved counts
  const totals = {}, solvedByTopic = {};
  PROJECTS.forEach(p => {
    totals[p.topic] = (totals[p.topic] || 0) + 1;
    if (solved.has(p.id)) solvedByTopic[p.topic] = (solvedByTopic[p.topic] || 0) + 1;
  });

  // Only show topics where at least 1 is solved
  const topics = Object.keys(totals)
    .filter(t => (solvedByTopic[t] || 0) > 0)
    .sort((a, b) => (solvedByTopic[b] || 0) / totals[b] - (solvedByTopic[a] || 0) / totals[a]);

  if (!topics.length) { row.innerHTML = ''; return; }

  row.innerHTML = topics.slice(0, 8).map(t => {
    const total  = totals[t];
    const done   = solvedByTopic[t] || 0;
    const pct    = Math.round((done / total) * 100);
    return `
      <div class="tp-item">
        <span class="tp-label" title="${esc(t)}">${esc(t)}</span>
        <div class="tp-bar-wrap"><div class="tp-bar" style="width:${pct}%"></div></div>
        <span class="tp-count">${done}/${total}</span>
      </div>
    `;
  }).join('');
}

// ── CODE PERSISTENCE ──────────────────────
function loadSavedCode() {
  try {
    const raw = localStorage.getItem('pylab_code');
    if (raw) Object.assign(savedCode, JSON.parse(raw));
  } catch (_) {}
}

function saveCodeForProject(id, code) {
  const p = PROJECTS[id];
  if (!p) return;
  // Only save if different from starter
  if (code.trim() === (p.starter || '').trim()) {
    delete savedCode[id];
  } else {
    savedCode[id] = code;
  }
  try {
    localStorage.setItem('pylab_code', JSON.stringify(savedCode));
  } catch (_) {}
}

// ── EXECUTION TIME ────────────────────────
// Round to nearest 10ms under 1s, nearest 100ms above — smooths out scheduler noise
function roundTime(ms) {
  if (ms < 1000) return Math.round(ms / 10) * 10;
  return Math.round(ms / 100) * 100;
}

function setExecTime(ms) {
  const el = document.getElementById('exec-time');
  if (!el) return;
  if (ms === null) { el.style.display = 'none'; return; }
  const r = roundTime(ms);
  const label = r < 1000 ? `~${r}ms` : `~${(r / 1000).toFixed(1)}s`;
  el.textContent = label;
  el.style.display = 'inline';
}

// ── SEARCH DESCRIPTION ────────────────────
// (handled in renderSidebar — see okQuery below)

// ── CODEMIRROR ────────────────────────────
function initEditor() {
  editor = CodeMirror(document.getElementById('cm-wrap'), {
    mode:              'python',
    theme:             'pylab',
    lineNumbers:       true,
    indentUnit:        4,
    tabSize:           4,
    indentWithTabs:    false,
    matchBrackets:     true,
    autoCloseBrackets: true,
    styleActiveLine:   true,
    extraKeys: {
      'Tab': cm => {
        if (cm.somethingSelected()) cm.indentSelection('add');
        else cm.replaceSelection('    ', 'end');
      },
      'Shift-Tab': cm => cm.indentSelection('subtract'),
      'Ctrl-Enter':  () => runCode(),
      'Cmd-Enter':   () => runCode(),
      'Ctrl-/':      cm => cm.execCommand('toggleComment'),
      'Ctrl-Space':  cm => triggerAutocomplete(cm),
      'Alt-Left':    () => prevProject(),
      'Alt-Right':   () => nextProject(),
      'Ctrl-1':      () => switchTab('problem'),
      'Ctrl-2':      () => switchTab('editor'),
      'Ctrl-3':      () => switchTab('solution'),
    },
    hintOptions: { completeSingle: false },
  });

  editor.on('inputRead', (cm, change) => {
    if (change.text[0].match(/[\w.]/)) {
      setTimeout(() => triggerAutocomplete(cm), 150);
    }
  });

  // Auto-save code per project (debounced)
  let saveTimer = null;
  editor.on('change', () => {
    if (currentId === null) return;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => saveCodeForProject(currentId, editor.getValue()), 600);
  });

  editor.setSize('100%', '100%');
}

// ── RESIZE HANDLE ─────────────────────────
function initResizeHandle() {
  const handle   = document.getElementById('resize-handle');
  const terminal = document.getElementById('terminal-pane');
  const cmWrap   = document.getElementById('cm-wrap');
  if (!handle || !terminal || !cmWrap) return;

  let dragging = false, startY = 0, startH = 0;

  const MIN_H = 80;
  const maxH  = () => Math.min(window.innerHeight * 0.65, window.innerHeight - 200);

  handle.addEventListener('mousedown', e => {
    dragging = true;
    startY   = e.clientY;
    startH   = terminal.offsetHeight;
    document.body.style.cursor     = 'ns-resize';
    document.body.style.userSelect = 'none';
    e.preventDefault();
  });

  // Touch support for mobile
  handle.addEventListener('touchstart', e => {
    dragging = true;
    startY   = e.touches[0].clientY;
    startH   = terminal.offsetHeight;
    e.preventDefault();
  }, { passive: false });

  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    const newH = Math.max(MIN_H, Math.min(maxH(), startH + (startY - e.clientY)));
    terminal.style.height    = newH + 'px';
    terminal.style.minHeight = newH + 'px';
    if (editor) editor.refresh();
  });

  document.addEventListener('touchmove', e => {
    if (!dragging) return;
    const newH = Math.max(MIN_H, Math.min(maxH(), startH + (startY - e.touches[0].clientY)));
    terminal.style.height    = newH + 'px';
    terminal.style.minHeight = newH + 'px';
    if (editor) editor.refresh();
  }, { passive: false });

  const stopDrag = () => {
    if (!dragging) return;
    dragging = false;
    document.body.style.cursor    = '';
    document.body.style.userSelect = '';
    if (editor) editor.refresh();
  };
  document.addEventListener('mouseup',  stopDrag);
  document.addEventListener('touchend', stopDrag);
}

// ── TOPIC FILTER ──────────────────────────
// ── FILTER PANEL ──────────────────────────
function toggleFilterPanel() {
  const panel = document.getElementById('filter-panel');
  const btn   = document.getElementById('filter-btn');
  const isOpen = panel.classList.contains('open');
  panel.classList.toggle('open', !isOpen);
  btn.classList.toggle('active', !isOpen);
  btn.setAttribute('aria-expanded', String(!isOpen));
  panel.setAttribute('aria-hidden', String(isOpen));
}

function closeFilterPanel() {
  const panel = document.getElementById('filter-panel');
  const btn   = document.getElementById('filter-btn');
  if (!panel) return;
  panel.classList.remove('open');
  btn && btn.classList.remove('active');
  btn && btn.setAttribute('aria-expanded', 'false');
  panel.setAttribute('aria-hidden', 'true');
}

function updateFilterBadge() {
  const badge    = document.getElementById('filter-badge');
  const clearBtn = document.getElementById('filter-clear-btn');
  if (!badge) return;
  const count = (activeFilter !== 'all' ? 1 : 0) + (activeTopic !== 'all' ? 1 : 0);
  if (count > 0) {
    badge.textContent   = count;
    badge.style.display = 'flex';
    if (clearBtn) clearBtn.style.display = 'flex';
  } else {
    badge.style.display = 'none';
    if (clearBtn) clearBtn.style.display = 'none';
  }
}

// ── TOPIC FILTER ──────────────────────────
function buildTopicFilter() {
  const topics = [...new Set(PROJECTS.map(p => p.topic))].sort();
  const row = document.getElementById('topic-filter-row');
  if (!row) return;
  row.innerHTML = topics.map(t =>
    `<button class="fchip fchip-topic${activeTopic === t ? ' active' : ''}"
             data-topic="${esc(t)}">${esc(t)}</button>`
  ).join('');
  row.querySelectorAll('.fchip-topic').forEach(btn => {
    btn.addEventListener('click', () => setTopic(btn.dataset.topic, btn));
  });
}

function setTopic(t, el) {
  activeTopic = (activeTopic === t) ? 'all' : t;
  document.querySelectorAll('.fchip-topic').forEach(b => b.classList.remove('active'));
  if (activeTopic !== 'all' && el) el.classList.add('active');
  updateFilterBadge();
  renderSidebar(activeFilter, document.getElementById('search-input').value);
}

// ── AUTOCOMPLETE DATA ─────────────────────
const PY_KEYWORDS = [
  'False','None','True','and','as','assert','async','await',
  'break','class','continue','def','del','elif','else','except',
  'finally','for','from','global','if','import','in','is',
  'lambda','nonlocal','not','or','pass','raise','return','try',
  'while','with','yield',
];

const PY_BUILTINS = [
  'abs','all','any','bin','bool','bytearray','bytes','callable','chr',
  'classmethod','complex','delattr','dict','dir','divmod','enumerate',
  'eval','exec','filter','float','format','frozenset','getattr','globals',
  'hasattr','hash','help','hex','id','input','int','isinstance','issubclass',
  'iter','len','list','locals','map','max','min','next','object','oct','open',
  'ord','pow','print','property','range','repr','reversed','round','set',
  'setattr','slice','sorted','staticmethod','str','sum','super','tuple',
  'type','vars','zip',
];

const PY_MODULES = [
  'math','os','os.path','sys','re','json','time','random','datetime',
  'collections','itertools','functools','pathlib','io','abc','ast',
  'base64','binascii','calendar','cmath','cmd','code','codecs',
  'concurrent','concurrent.futures','contextlib','copy','csv',
  'dataclasses','decimal','difflib','email','enum','errno',
  'fractions','gc','getpass','glob','gzip','hashlib','heapq',
  'hmac','html','html.parser','http','http.client','http.server',
  'inspect','keyword','linecache','locale','logging',
  'mimetypes','operator','pickle','platform','pprint','queue',
  'shutil','signal','socket','sqlite3','ssl','stat','statistics',
  'string','struct','subprocess','tarfile','tempfile','textwrap',
  'threading','traceback','typing','unicodedata','unittest',
  'urllib','urllib.parse','urllib.request','uuid','warnings',
  'weakref','xml','xmlrpc','zipfile','zlib',
];

const PY_MODULE_ATTRS = {
  math: [
    'pi','e','tau','inf','nan',
    'ceil','floor','trunc','round',
    'sqrt','isqrt','pow','exp','log','log2','log10','log1p',
    'sin','cos','tan','asin','acos','atan','atan2',
    'sinh','cosh','tanh','asinh','acosh','atanh',
    'degrees','radians','hypot','dist',
    'factorial','gcd','lcm','comb','perm',
    'fabs','fmod','modf','frexp','ldexp',
    'isfinite','isinf','isnan','isclose','copysign',
  ],
  random: [
    'seed','random','uniform','randint','randrange','choice',
    'choices','shuffle','sample','gauss','normalvariate',
    'expovariate','betavariate','gammavariate','triangular',
    'getrandbits','getstate','setstate',
  ],
  os: [
    'getcwd','chdir','listdir','mkdir','makedirs','rmdir','removedirs',
    'rename','remove','path','environ','getenv','putenv','sep','linesep',
    'curdir','pardir','walk','stat','getpid','getppid','cpu_count',
    'urandom','scandir','symlink','link','readlink',
  ],
  'os.path': [
    'join','split','splitext','basename','dirname','abspath','realpath',
    'exists','isfile','isdir','islink','isabs','expanduser','expandvars',
    'getsize','getmtime','getatime','getctime','commonpath','relpath',
  ],
  sys: [
    'argv','path','modules','version','version_info','platform','executable',
    'stdin','stdout','stderr','exit','getdefaultencoding','getfilesystemencoding',
    'getrecursionlimit','setrecursionlimit','maxsize','maxunicode',
    'getsizeof','intern','exc_info','last_type','last_value','last_traceback',
  ],
  re: [
    'compile','match','search','findall','finditer','fullmatch',
    'sub','subn','split','escape','purge','error',
    'IGNORECASE','MULTILINE','DOTALL','VERBOSE','ASCII','UNICODE',
    'I','M','S','X','A','U',
  ],
  json: [
    'dumps','loads','dump','load','JSONEncoder','JSONDecoder','JSONDecodeError',
  ],
  datetime: [
    'date','time','datetime','timedelta','timezone','MINYEAR','MAXYEAR',
    'date.today','date.fromtimestamp','date.fromisoformat',
    'datetime.now','datetime.utcnow','datetime.fromtimestamp',
    'datetime.fromisoformat','datetime.strptime',
  ],
  collections: [
    'namedtuple','deque','ChainMap','Counter','OrderedDict',
    'defaultdict','UserDict','UserList','UserString',
  ],
  itertools: [
    'count','cycle','repeat','accumulate','chain','chain.from_iterable',
    'compress','dropwhile','filterfalse','groupby','islice',
    'pairwise','starmap','takewhile','zip_longest',
    'product','permutations','combinations','combinations_with_replacement',
  ],
  functools: [
    'reduce','partial','partialmethod','update_wrapper','wraps',
    'lru_cache','cache','cached_property','total_ordering','cmp_to_key',
    'singledispatch','singledispatchmethod',
  ],
  string: [
    'ascii_letters','ascii_lowercase','ascii_uppercase','digits',
    'hexdigits','octdigits','printable','punctuation','whitespace',
    'Formatter','Template','capwords',
  ],
  pathlib: [
    'Path','PurePath','PurePosixPath','PureWindowsPath','PosixPath','WindowsPath',
  ],
  typing: [
    'Any','Union','Optional','List','Dict','Tuple','Set','FrozenSet',
    'Type','Callable','Iterator','Generator','Iterable','Sequence',
    'Mapping','MutableMapping','MutableSequence','MutableSet',
    'ClassVar','Final','Literal','TypeVar','Generic','Protocol',
    'NamedTuple','TypedDict','cast','overload','TYPE_CHECKING',
    'get_type_hints','no_type_check',
  ],
  heapq: [
    'heappush','heappop','heapify','heapreplace','heappushpop',
    'merge','nlargest','nsmallest',
  ],
  statistics: [
    'mean','fmean','geometric_mean','harmonic_mean','median',
    'median_low','median_high','median_grouped','mode','multimode',
    'pstdev','pvariance','stdev','variance','quantiles','NormalDist',
  ],
  time: [
    'time','time_ns','sleep','monotonic','monotonic_ns','perf_counter',
    'perf_counter_ns','process_time','gmtime','localtime','mktime',
    'strftime','strptime','asctime','ctime','timezone','altzone','daylight',
  ],
  csv: [
    'reader','writer','DictReader','DictWriter','register_dialect',
    'unregister_dialect','get_dialect','list_dialects','field_size_limit',
    'QUOTE_ALL','QUOTE_MINIMAL','QUOTE_NONNUMERIC','QUOTE_NONE','Error',
  ],
  hashlib: [
    'md5','sha1','sha224','sha256','sha384','sha512','sha3_224','sha3_256',
    'sha3_384','sha3_512','blake2b','blake2s','new','algorithms_available',
    'algorithms_guaranteed','pbkdf2_hmac','scrypt',
  ],
  io: [
    'StringIO','BytesIO','FileIO','BufferedReader','BufferedWriter',
    'BufferedRandom','TextIOWrapper','RawIOBase','BufferedIOBase',
    'TextIOBase','IOBase','DEFAULT_BUFFER_SIZE','SEEK_SET','SEEK_CUR','SEEK_END',
  ],
  struct: [
    'pack','unpack','pack_into','unpack_from','iter_unpack',
    'calcsize','error','Struct',
  ],
  enum: ['Enum','IntEnum','Flag','IntFlag','auto','unique','EnumMeta'],
  dataclasses: [
    'dataclass','field','fields','asdict','astuple','make_dataclass',
    'replace','is_dataclass','FrozenInstanceError','InitVar','KW_ONLY',
  ],
  abc: [
    'ABC','ABCMeta','abstractmethod','abstractclassmethod',
    'abstractstaticmethod','abstractproperty','get_cache_token',
  ],
  copy:     ['copy','deepcopy','error'],
  decimal: [
    'Decimal','Context','DefaultContext','BasicContext','ExtendedContext',
    'ROUND_UP','ROUND_DOWN','ROUND_CEILING','ROUND_FLOOR','ROUND_HALF_UP',
    'ROUND_HALF_DOWN','ROUND_HALF_EVEN','ROUND_05UP',
    'InvalidOperation','DivisionByZero','Overflow','Underflow','Inexact',
  ],
  fractions: ['Fraction'],
  uuid: ['uuid1','uuid3','uuid4','uuid5','UUID','NAMESPACE_DNS','NAMESPACE_URL'],
  base64: [
    'b64encode','b64decode','urlsafe_b64encode','urlsafe_b64decode',
    'b32encode','b32decode','b16encode','b16decode','encodebytes','decodebytes',
  ],
  textwrap: ['wrap','fill','dedent','indent','shorten','TextWrapper'],
  pprint:   ['pprint','pformat','isreadable','isrecursive','saferepr','PrettyPrinter'],
  operator: [
    'add','sub','mul','truediv','floordiv','mod','pow','neg','pos','abs',
    'and_','or_','xor','not_','lshift','rshift','invert',
    'eq','ne','lt','le','gt','ge',
    'getitem','setitem','delitem','contains','concat','iconcat',
    'attrgetter','itemgetter','methodcaller',
  ],
  threading: [
    'Thread','Lock','RLock','Condition','Semaphore','BoundedSemaphore',
    'Event','Timer','Barrier','local','current_thread','main_thread',
    'active_count','enumerate','settrace','setprofile','stack_size',
  ],
  queue:      ['Queue','LifoQueue','PriorityQueue','SimpleQueue','Empty','Full'],
  contextlib: [
    'contextmanager','asynccontextmanager','closing','nullcontext',
    'suppress','redirect_stdout','redirect_stderr','ExitStack',
    'AsyncExitStack','AbstractContextManager',
  ],
  warnings: [
    'warn','warn_explicit','showwarning','formatwarning','filterwarnings',
    'simplefilter','resetwarnings','catch_warnings',
    'DeprecationWarning','RuntimeWarning','UserWarning','FutureWarning',
  ],
  inspect: [
    'ismodule','isclass','ismethod','isfunction','isgenerator','iscoroutine',
    'isbuiltin','isroutine','isabstract',
    'getmembers','getmodule','getfile','getsource','getsourcelines','getsourcefile',
    'signature','Parameter','Signature','BoundArguments',
    'getdoc','getcomments','getfullargspec','stack','currentframe','getframeinfo',
  ],
  glob:   ['glob','iglob','escape'],
  shutil: [
    'copy','copy2','copyfile','copyfileobj','copymode','copystat','copytree',
    'rmtree','move','make_archive','unpack_archive','get_archive_formats',
    'disk_usage','which','get_terminal_size',
  ],
  pickle: [
    'dump','dumps','load','loads','Pickler','Unpickler',
    'HIGHEST_PROTOCOL','DEFAULT_PROTOCOL','PickleError','PicklingError','UnpicklingError',
  ],
};

function getImportedModules(code) {
  const imported = {};
  // Handle multiline imports: from x import (\n  a, b\n)
  const normalised = code.replace(/\\\n/g, ' ').replace(/\(\s*([\s\S]*?)\s*\)/gm, (_, inner) => inner.replace(/\n/g, ' '));
  const reImport = /^\s*import\s+([\w.]+)(?:\s+as\s+(\w+))?/gm;
  const reFrom   = /^\s*from\s+([\w.]+)\s+import\s+(.+)/gm;
  let m;
  while ((m = reImport.exec(normalised)) !== null) {
    const mod   = m[1];
    const alias = m[2] || mod.split('.').pop();
    imported[alias] = mod;
  }
  while ((m = reFrom.exec(normalised)) !== null) {
    const mod   = m[1];
    const names = m[2].split(',').map(s => s.trim().split(/\s+as\s+/)[0].trim()).filter(Boolean);
    if (names[0] === '*') {
      if (PY_MODULE_ATTRS[mod]) imported['*_' + mod] = mod;
    } else {
      names.forEach(n => (imported['__from__' + n] = { mod, name: n }));
    }
  }
  return imported;
}

function triggerAutocomplete(cm) {
  const cur   = cm.getCursor();
  const line  = cm.getLine(cur.line);
  const token = cm.getTokenAt(cur);
  const word  = token.string.replace(/^\s+/, '');
  const before = line.slice(0, cur.ch);

  if (/(?:^|\s)import\s+[\w.]*$/.test(before)) {
    const partial = before.match(/import\s+([\w.]*)$/)[1];
    const list = PY_MODULES.filter(m => m.startsWith(partial) && m !== partial);
    if (!list.length) return;
    return cm.showHint({ hint: () => ({ list, from: CodeMirror.Pos(cur.line, cur.ch - partial.length), to: cur }), completeSingle: false });
  }

  if (/(?:^|\s)from\s+[\w.]*$/.test(before)) {
    const partial = before.match(/from\s+([\w.]*)$/)[1];
    const list = PY_MODULES.filter(m => m.startsWith(partial) && m !== partial);
    if (!list.length) return;
    return cm.showHint({ hint: () => ({ list, from: CodeMirror.Pos(cur.line, cur.ch - partial.length), to: cur }), completeSingle: false });
  }

  const fromImportMatch = before.match(/from\s+([\w.]+)\s+import\s+([\w,\s]*)$/);
  if (fromImportMatch) {
    const mod     = fromImportMatch[1];
    const partial = fromImportMatch[2].split(',').pop().trim();
    const attrs   = PY_MODULE_ATTRS[mod] || [];
    const list    = attrs.filter(a => a.startsWith(partial) && a !== partial);
    if (!list.length) return;
    return cm.showHint({ hint: () => ({ list, from: CodeMirror.Pos(cur.line, cur.ch - partial.length), to: cur }), completeSingle: false });
  }

  const dotMatch = before.match(/(\w+)\.([\w]*)$/);
  if (dotMatch) {
    const alias    = dotMatch[1];
    const partial  = dotMatch[2];
    const src      = cm.getValue();
    const imported = getImportedModules(src);
    const modName  = imported[alias] || alias;
    const attrs    = PY_MODULE_ATTRS[modName] || PY_MODULE_ATTRS[alias] || [];
    const list     = attrs.filter(a => a.startsWith(partial));
    if (!list.length) return;
    return cm.showHint({
      hint: () => ({ list, from: CodeMirror.Pos(cur.line, token.start + (token.string === '.' ? 1 : 0)), to: cur }),
      completeSingle: false,
    });
  }

  if (word.length < 1) return;
  const src        = cm.getValue();
  const imported   = getImportedModules(src);
  const modAliases = Object.keys(imported).filter(k => !k.startsWith('*') && !k.startsWith('__from__'));
  const fromNames  = Object.keys(imported).filter(k => k.startsWith('__from__')).map(k => k.replace('__from__', ''));
  const starNames  = Object.keys(imported).filter(k => k.startsWith('*_')).flatMap(k => PY_MODULE_ATTRS[imported[k]] || []);
  const pool = [...PY_KEYWORDS, ...PY_BUILTINS, ...PY_MODULES, ...modAliases, ...fromNames, ...starNames];
  const list = [...new Set(pool)].filter(w => w.startsWith(word) && w !== word);
  if (!list.length) return;
  cm.showHint({ hint: () => ({ list, from: CodeMirror.Pos(cur.line, token.start), to: CodeMirror.Pos(cur.line, token.end) }), completeSingle: false });
}

// ── BOOT SCREEN ───────────────────────────
function bootProgress(pct, msg) {
  const bar    = document.getElementById('boot-bar');
  const status = document.getElementById('boot-status');
  if (bar)    bar.style.width = pct + '%';
  if (status) status.textContent = msg.replace(/…$/, '');
}

function bootDismiss() {
  const screen = document.getElementById('boot-screen');
  if (!screen) return;
  screen.classList.add('hidden');
  setTimeout(() => screen.remove(), 420);
}

// ── PYODIDE INIT ──────────────────────────
async function initPyodide() {
  if (pyodideReady) return;
  if (pyodidePromise) return pyodidePromise; // share in-flight promise — fixed guard

  setPyodideBadge('loading');
  bootProgress(10, 'Loading Python runtime…');

  // Must assign pyodidePromise before the first await so concurrent callers share it
  pyodidePromise = (async () => {
  try {
    pyodide = await loadPyodide();
    bootProgress(70, 'Setting up environment…');

    pyodide.globals.set('_js_write',     (text) => termWrite(text, false));
    pyodide.globals.set('_js_write_err', (text) => termWrite(text, true));
    pyodide.globals.set('_js_input',     (prompt) => new Promise((resolve) => {
      inputResolve  = resolve;
      waitingInput  = true;
      termShowInput(prompt);
      setStatus('running', 'waiting for input…');
    }));

    await pyodide.runPythonAsync(`
import sys, io, builtins, pyodide.code as _pc

_js_write     = _pc.run_js("pyodide.globals.get('_js_write')")
_js_write_err = _pc.run_js("pyodide.globals.get('_js_write_err')")
_js_input     = _pc.run_js("pyodide.globals.get('_js_input')")

class _JSOut(io.StringIO):
    def __init__(self, key):
        super().__init__()
        self._key = key
    def write(self, text):
        if text:
            cb = _pc.run_js(f"pyodide.globals.get('{self._key}')")
            if cb: cb(text)
        return len(text)
    def flush(self): pass

sys.stdout = _JSOut('_js_write')
sys.stderr = _JSOut('_js_write_err')

async def _async_input(prompt=''):
    return str(await _js_input(str(prompt) if prompt else ''))

builtins.input = _async_input
`);
    bootProgress(100, 'Ready');
    pyodideReady = true;
    setPyodideBadge('ready');
    setStatus('idle', 'ready');
    setTimeout(bootDismiss, 300);
  } catch (err) {
    console.error('Pyodide load failed:', err);
    bootProgress(100, 'Failed to load Python runtime');
    setPyodideBadge('error');
    setStatus('error', 'load failed');
    setTimeout(bootDismiss, 1800);
  }
  })();
  return pyodidePromise;
}

function setPyodideBadge(state) {
  const badge = document.getElementById('pyodide-badge');
  const icon  = document.getElementById('pyodide-badge-icon');
  const text  = document.getElementById('pyodide-badge-text');
  if (!badge) return;

  badge.className = 'hbadge pyodide-status';
  if (state === 'loading') {
    icon.className   = 'fa-solid fa-circle-notch spin';
    text.textContent = 'loading…';
  } else if (state === 'ready') {
    icon.className   = 'fa-solid fa-circle-check';
    text.textContent = 'ready';
    badge.classList.add('ready');
  } else {
    icon.className   = 'fa-solid fa-circle-xmark';
    text.textContent = 'error';
    badge.classList.add('error');
  }
}

// ── CODE TRANSFORMER ──────────────────────
function transformCode(code) {
  function replaceInputCalls(src) {
    let result = '';
    let i = 0;
    while (i < src.length) {
      // Check for standalone input( — not preceded by word char or dot
      const slice = src.slice(i);
      const match = slice.match(/^input\s*\(/);
      if (match && (i === 0 || !/[\w.]/.test(src[i - 1]))) {
        const callStart = i + match[0].length;
        let depth = 1, j = callStart;
        let inStr = false, strChar = '', tripleStr = false;
        while (j < src.length && depth > 0) {
          const c  = src[j];
          const c3 = src.slice(j, j + 3);
          if (!inStr) {
            if (c3 === '"""' || c3 === "'''") { inStr = true; strChar = c3; tripleStr = true; j += 3; continue; }
            if (c === '"' || c === "'") { inStr = true; strChar = c; tripleStr = false; }
            else if (c === '(') depth++;
            else if (c === ')') { depth--; if (depth === 0) break; }
          } else {
            if (tripleStr && src.slice(j, j + 3) === strChar) { inStr = false; j += 3; continue; }
            else if (!tripleStr && c === strChar && src[j - 1] !== '\\') inStr = false;
          }
          j++;
        }
        const args = src.slice(callStart, j);
        result += '(await __input__(' + args + '))';
        i = j + 1;
      } else {
        result += src[i];
        i++;
      }
    }
    return result;
  }

  let transformed = replaceInputCalls(code);
  transformed = makeContainingDefsAsync(transformed);

  const indented = transformed.split('\n').map(line => '    ' + line).join('\n');
  return [
    '# pylab runtime wrapper',
    'import builtins as _b; __input__ = _b.input',
    'async def _main():',
    indented,
    'await _main()',
  ].join('\n');
}

function makeContainingDefsAsync(code) {
  const lines = code.split('\n');
  const awaitLines = new Set(
    lines.map((l, i) => l.includes('await __input__') ? i : -1).filter(i => i >= 0)
  );
  if (!awaitLines.size) return code;

  const defsToAsync = new Set();
  function indentOf(line) { const m = line.match(/^(\s*)/); return m ? m[1].length : 0; }

  awaitLines.forEach(awaitIdx => {
    const awaitIndent = indentOf(lines[awaitIdx]);
    for (let i = awaitIdx - 1; i >= 0; i--) {
      const line = lines[i].trimEnd();
      if (!line || line.trimStart().startsWith('#')) continue;
      const ind = indentOf(line);
      if (ind < awaitIndent) {
        if (/^\s*def\s+/.test(line) && !/^\s*async\s+def\s+/.test(line)) defsToAsync.add(i);
        if (ind === 0) break;
      }
    }
  });

  if (!defsToAsync.size) return code;

  const asyncFnNames = new Set();
  defsToAsync.forEach(i => {
    const m = lines[i].match(/def\s+(\w+)\s*\(/);
    if (m) asyncFnNames.add(m[1]);
  });

  return lines.map((line, i) => {
    if (defsToAsync.has(i)) return line.replace(/^(\s*)def\s+/, '$1async def ');
    let out = line;
    asyncFnNames.forEach(name => {
      out = out.replace(
        new RegExp('(?<![\\w])(?<!await\\s)(?<!def\\s)(?<!async\\s)\\b' + name + '\\s*\\(', 'g'),
        'await ' + name + '('
      );
    });
    return out;
  }).join('\n');
}

// ── RUN CODE ──────────────────────────────
async function runCode() {
  if (isRunning) return;
  const code = editor ? editor.getValue() : '';
  if (!code.trim()) return;

  // Prompt for login on first run if not signed in and haven't skipped yet
  if (!getLocalUser() && sessionStorage.getItem('pylab_guest') !== '1') {
    await openAuthModal();
  }

  const runBtn  = document.getElementById('run-btn');
  const stopBtn = document.getElementById('stop-btn');

  if (!pyodideReady) {
    runBtn.disabled = true;
    runBtn.innerHTML = '<i class="fa-solid fa-circle-notch spin"></i><span class="btn-label"> Loading…</span>';
    setStatus('running', 'loading python…');
    termClear();
    termWriteRaw('Loading Python runtime (first run only)…', 'term-dim');
    await (pyodidePromise || initPyodide());
    if (!pyodideReady) {
      runBtn.disabled = false;
      runBtn.innerHTML = '<i class="fa-solid fa-play"></i><span class="btn-label"> Run</span>';
      return;
    }
  }

  isRunning    = true;
  runAbortFlag = false;
  runStartTime = performance.now();
  runBtn.disabled = true;
  runBtn.innerHTML = '<i class="fa-solid fa-circle-notch spin"></i><span class="btn-label"> Running</span>';
  stopBtn.style.display = 'inline-flex';
  setStatus('running', 'running…');
  setExecTime(null);
  termClear();
  _lineBuf = '';
  waitingInput  = false;
  inputResolve  = null;

  // Auto-switch to editor tab so terminal is visible
  if (document.querySelector('.tab[data-tab="editor"]') &&
      !document.querySelector('.tab[data-tab="editor"]').classList.contains('active')) {
    switchTab('editor');
  }

  const transformed = transformCode(code);
  _runOutput = '';

  const TIMEOUT_MS    = 30000;
  let   timeoutHandle = setTimeout(() => {
    if (isRunning) {
      runAbortFlag = true;
      termWriteRaw('\n[Execution timed out after 30 seconds]', 'term-err');
      finishRun(runBtn, stopBtn);
    }
  }, TIMEOUT_MS);

  try {
    await pyodide.runPythonAsync(transformed);
    clearTimeout(timeoutHandle);
    termFlushBuf();
    if (!runAbortFlag) {
      const elapsed = roundTime(performance.now() - runStartTime);
      setExecTime(elapsed);
      setStatus('success', 'done');
      await new Promise(r => setTimeout(r, 0));
      await checkAndMarkSolved(_runOutput.trim());
    }
  } catch (err) {
    clearTimeout(timeoutHandle);
    termFlushBuf();
    const elapsed = roundTime(performance.now() - runStartTime);
    setExecTime(elapsed);
    if (!runAbortFlag) {
      const raw   = err.message || String(err);
      let clean = raw.replace(/File "<exec>", line (\d+)/g, (_, n) =>
        `File "<exec>", line ${Math.max(1, parseInt(n) - 2)}`
      );
      const match = clean.match(/(Traceback[\s\S]*|(?:\w+\.)*\w*Error:[\s\S]*|SyntaxError[\s\S]*)/);
      clean = (match ? match[1] : clean).trim();
      termWriteRaw(clean, 'term-err');
      setStatus('error', 'error');
    }
  }

  if (!runAbortFlag) finishRun(runBtn, stopBtn);
}

function stopCode() {
  if (!isRunning) return;
  runAbortFlag = true;
  if (waitingInput && inputResolve) {
    termHideInput();
    waitingInput = false;
    const res = inputResolve;
    inputResolve = null;
    res('');
  }
  termWriteRaw('\n[Execution stopped]', 'term-dim');
  setStatus('idle', 'stopped');
  const runBtn  = document.getElementById('run-btn');
  const stopBtn = document.getElementById('stop-btn');
  finishRun(runBtn, stopBtn);
}

function finishRun(runBtn, stopBtn) {
  isRunning = false;
  termHideInput();
  waitingInput = false;
  if (runBtn) {
    runBtn.disabled = false;
    runBtn.innerHTML = '<i class="fa-solid fa-play"></i><span class="btn-label"> Run</span>';
  }
  if (stopBtn) stopBtn.style.display = 'none';

  if (pyodideReady) {
    pyodide.globals.set('_js_write', (text) => termWrite(text, false));
    pyodide.globals.set('_js_input', (prompt) => new Promise((resolve) => {
      inputResolve  = resolve;
      waitingInput  = true;
      termShowInput(prompt);
      setStatus('running', 'waiting for input…');
    }));
  }
}

// ── TERMINAL I/O ──────────────────────────
let _lineBuf   = '';
let _runOutput = '';

function clearTerminal() {
  document.getElementById('terminal-body').innerHTML =
    '<div class="term-placeholder"><i class="fa-regular fa-circle-play"></i> Run your code to see output here…</div>';
}

function termClear() {
  _lineBuf      = '';
  _runOutput    = '';
  waitingInput  = false;
  inputResolve  = null;
  document.getElementById('terminal-body').innerHTML =
    '<div class="term-placeholder">Running…</div>';
  termHideInput();
}

function termWrite(text, isErr) {
  if (runAbortFlag) return;
  const body = document.getElementById('terminal-body');
  const ph   = body.querySelector('.term-placeholder');
  if (ph) ph.remove();
  if (!isErr) _runOutput += text;
  _lineBuf += text;
  const parts = _lineBuf.split('\n');
  _lineBuf = parts.pop();
  parts.forEach(line => {
    const d = document.createElement('div');
    d.className   = 'term-line' + (isErr ? ' term-err' : '');
    d.textContent = line;
    body.appendChild(d);
  });
  body.scrollTop = body.scrollHeight;
}

function termFlushBuf() {
  if (!_lineBuf) return;
  _runOutput += _lineBuf;
  const body = document.getElementById('terminal-body');
  const ph   = body.querySelector('.term-placeholder');
  if (ph) ph.remove();
  const d = document.createElement('div');
  d.className   = 'term-line';
  d.textContent = _lineBuf;
  body.appendChild(d);
  _lineBuf = '';
  body.scrollTop = body.scrollHeight;
}

function termWriteRaw(text, cls = 'term-line') {
  const body = document.getElementById('terminal-body');
  const ph   = body.querySelector('.term-placeholder');
  if (ph) ph.remove();
  const d = document.createElement('div');
  d.className   = cls;
  d.textContent = text;
  body.appendChild(d);
  body.scrollTop = body.scrollHeight;
}

function focusTermInput() {
  const inp = document.getElementById('terminal-input');
  if (!inp.disabled) inp.focus();
}

function termShowInput(prompt) {
  termFlushBuf();
  const inp = document.getElementById('terminal-input');
  const prm = document.getElementById('term-prompt-text');
  const row = document.getElementById('terminal-input-row');
  prm.textContent = prompt || '';
  inp.disabled    = false;
  inp.placeholder = '';
  inp.value       = '';
  row.style.borderTopColor = '#3a3a3a';
  row.style.background     = '#0e0e0e';
  document.getElementById('terminal-body').scrollTop = 9999;
  const pane = document.getElementById('terminal-pane');
  if (pane) pane.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  setTimeout(() => {
    inp.focus();
    row.style.borderTopColor = 'var(--easy)';
    setTimeout(() => { row.style.borderTopColor = '#3a3a3a'; }, 600);
  }, 50);
}

function termHideInput() {
  const inp = document.getElementById('terminal-input');
  const prm = document.getElementById('term-prompt-text');
  const row = document.getElementById('terminal-input-row');
  inp.disabled    = true;
  inp.placeholder = 'waiting for program…';
  inp.value       = '';
  prm.textContent = '';
  if (row) { row.style.borderTopColor = ''; row.style.background = ''; }
}

function onTerminalInputKey(e) {
  if (e.key !== 'Enter') return;
  if (!waitingInput || !inputResolve) return;
  const inp  = document.getElementById('terminal-input');
  const val  = inp.value;
  const prm  = document.getElementById('term-prompt-text').textContent;
  const body = document.getElementById('terminal-body');
  const echo = document.createElement('div');
  echo.className   = 'term-line term-input-echo';
  echo.textContent = prm + val;
  body.appendChild(echo);
  body.scrollTop   = body.scrollHeight;
  termHideInput();
  waitingInput = false;
  const res = inputResolve;
  inputResolve = null;
  res(val);
}

// ── SIDEBAR ───────────────────────────────
function renderSkeletons(count = 18) {
  const list = document.getElementById('proj-list');
  if (!list) return;
  list.innerHTML = Array.from({ length: count }, () => `
    <div class="proj-skeleton" aria-hidden="true">
      <div class="skel skel-num"></div>
      <div class="skel-body">
        <div class="skel skel-name"></div>
        <div class="skel skel-meta"></div>
      </div>
    </div>
  `).join('');
}


function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar.classList.contains('open')) closeSidebar();
  else openSidebar();
}

function openSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  sidebar.classList.add('open');
  overlay.classList.add('open');
  sidebar.setAttribute('aria-hidden', 'false');
  // Focus first focusable element in sidebar
  setTimeout(() => {
    const first = sidebar.querySelector('input, button');
    if (first) first.focus();
  }, 260);
}

function closeSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  sidebar.classList.remove('open');
  overlay.classList.remove('open');
  sidebar.setAttribute('aria-hidden', 'true');
}

function renderSidebar(filter = activeFilter, q = '') {
  const list = document.getElementById('proj-list');

  const items = PROJECTS.filter(p => {
    const okDiff  = filter === 'all' || p.difficulty === filter;
    const okTopic = activeTopic === 'all' || p.topic === activeTopic;
    const okQuery = !q ||
      p.title.toLowerCase().includes(q.toLowerCase()) ||
      p.topic.toLowerCase().includes(q.toLowerCase()) ||
      (p.description || '').replace(/<[^>]+>/g, '').toLowerCase().includes(q.toLowerCase());
    return okDiff && okTopic && okQuery;
  });

  if (!items.length) {
    list.innerHTML = `
      <div class="empty-state" role="status" aria-live="polite">
        <i class="fa-solid fa-circle-question" aria-hidden="true"></i>
        No projects found
        <button class="empty-state-reset" onclick="clearAllFilters()">Clear filters</button>
      </div>`;
    return;
  }

  const frag = document.createDocumentFragment();
  items.forEach(p => {
    const el = document.createElement('div');
    el.className  = `proj-item${currentId === p.id ? ' active' : ''}`;
    el.tabIndex   = 0;
    el.setAttribute('role', 'button');
    el.setAttribute('aria-label', `${p.title} — ${p.difficulty}${solved.has(p.id) ? ', solved' : ''}`);
    el.setAttribute('aria-pressed', currentId === p.id ? 'true' : 'false');
    el.innerHTML  = `
      <span class="proj-num" aria-hidden="true">${String(p.id + 1).padStart(2, '0')}</span>
      <div class="proj-body">
        <div class="proj-name">${esc(p.title)}</div>
        <div class="proj-meta">
          <span class="diff-dot dot-${p.difficulty}" aria-hidden="true"></span>
          <span class="diff-text text-${p.difficulty}">${p.difficulty}</span>
          ${p.author ? `<span class="proj-author" aria-label="by ${esc(p.author)}"><i class="fa-solid fa-user" aria-hidden="true"></i>${esc(p.author)}</span>` : ''}
        </div>
      </div>
      ${solved.has(p.id) ? '<i class="fa-solid fa-check solved-icon" aria-hidden="true"></i>' : ''}
    `;
    el.addEventListener('click',   () => { openProject(p.id); closeSidebar(); });
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openProject(p.id); closeSidebar(); } });
    frag.appendChild(el);
  });

  list.innerHTML = '';
  list.appendChild(frag);
}

function clearAllFilters() {
  activeFilter = 'all';
  activeTopic  = 'all';
  document.querySelectorAll('.fchip[data-diff]').forEach(b => b.classList.remove('active'));
  const allChip = document.querySelector('.fchip-all');
  if (allChip) allChip.classList.add('active');
  document.querySelectorAll('.fchip-topic').forEach(b => b.classList.remove('active'));
  document.getElementById('search-input').value = '';
  const clearBtn = document.getElementById('search-clear');
  if (clearBtn) clearBtn.style.display = 'none';
  updateFilterBadge();
  renderSidebar('all', '');
}

function setFilter(f, el) {
  activeFilter = f;
  document.querySelectorAll('.fchip[data-diff]').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  updateFilterBadge();
  renderSidebar(f, document.getElementById('search-input').value);
}

// ── OPEN PROJECT ──────────────────────────
function openProject(id) {
  const p = PROJECTS[id];
  if (!p) return;
  currentId = id;

  document.getElementById('welcome').style.display      = 'none';
  document.getElementById('project-view').style.display = 'flex';

  document.getElementById('pv-title').textContent = p.title;
  const dp = document.getElementById('pv-diff');
  dp.textContent = p.difficulty.charAt(0).toUpperCase() + p.difficulty.slice(1);
  dp.className   = `diff-pill pill-${p.difficulty}`;
  document.getElementById('pv-topic').textContent = p.topic;
  document.getElementById('pv-num').textContent   = `#${p.id + 1} / ${PROJECTS.length}`;

  const authorEl = document.getElementById('pv-author');
  if (authorEl) {
    if (p.author) {
      authorEl.innerHTML = `<i class="fa-solid fa-user" aria-hidden="true"></i>${esc(p.author)}`;
      authorEl.style.display = 'inline-flex';
    } else {
      authorEl.style.display = 'none';
    }
  }

  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  if (prevBtn) prevBtn.disabled = (id === 0);
  if (nextBtn) nextBtn.disabled = (id === PROJECTS.length - 1);

  renderProblem(p);

  if (editor) {
    // Load saved code if exists, otherwise starter
    const code = savedCode[id] !== undefined ? savedCode[id] : (p.starter || '');
    editor.setValue(code);
    editor.clearHistory();
    setTimeout(() => editor.refresh(), 50);
  }

  clearTerminal();
  setExecTime(null);
  hideSubmitButton();
  termHideInput();
  setStatus('idle', 'idle');
  _lbLastLoadedId = null; // reset leaderboard cache for new project
  _lineBuf      = '';
  waitingInput  = false;
  inputResolve  = null;

  // Re-lock solution when navigating to a new project (unless already revealed)
  if (revealedSet.has(id)) {
    document.getElementById('sol-lock').style.display       = 'none';
    document.getElementById('sol-code-block').style.display = 'block';
    setSolPre(p.solution);
    document.getElementById('sol-explanation').innerHTML    = p.explanation;
  } else {
    document.getElementById('sol-lock').style.display       = 'flex';
    document.getElementById('sol-code-block').style.display = 'none';
  }

  // Reset hint state for this project
  if (!hintState[id]) hintState[id] = { shown: 0 };

  const stopBtn = document.getElementById('stop-btn');
  if (stopBtn) stopBtn.style.display = 'none';

  switchTab('problem');
  updateSolvedBtn();
  // Show submit button if already solved and solution not revealed
  if (solved.has(id) && !revealedSet.has(id)) {
    showSubmitButton();
  }
  renderSidebar(activeFilter, document.getElementById('search-input').value);
  flashProgress();
}

// ── RENDER PROBLEM ────────────────────────
function renderProblem(p) {
  const exHtml = p.examples.map((ex, i) => {
    const outEscaped  = esc(ex.output || '');
    const isMultiline = (ex.output || '').includes('\n');
    const outputHtml  = isMultiline
      ? `<pre class="example-output-pre">${outEscaped}</pre>`
      : `<code>${outEscaped}</code>`;
    return `
      <div class="example">
        <div class="example-label"><i class="fa-solid fa-flask" aria-hidden="true"></i> Example ${i + 1}</div>
        ${ex.input ? `
          <div class="example-line">
            <strong><i class="fa-solid fa-arrow-right-to-bracket" aria-hidden="true"></i> Input</strong>
            <span class="example-sep" aria-hidden="true">→</span>
            <code>${esc(ex.input)}</code>
          </div>` : ''}
        <div class="example-line example-output">
          <strong><i class="fa-solid fa-arrow-right-from-bracket" aria-hidden="true"></i> Output</strong>
          <span class="example-sep" aria-hidden="true">→</span>
          ${outputHtml}
        </div>
        ${ex.explanation ? `<div class="example-explain">${ex.explanation}</div>` : ''}
      </div>
    `;
  }).join('');

  const labelMatches = [...(p.solution || '').matchAll(/print\s*\([^)]*['"]((?:[A-Z][\w\s]*|[A-Z][\w]*)):\s/g)]
    .map(m => m[1].trim())
    .filter((v, i, a) => v && a.indexOf(v) === i);

  const labelWarning = labelMatches.length ? `
    <div class="output-label-warning" role="note">
      <i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
      <span>
        Your output labels must match exactly to be marked solved.
        This problem expects: ${labelMatches.map(l => `<code>${esc(l)}:</code>`).join(', ')}.
        Values can differ based on your input, but the labels must be identical.
      </span>
    </div>
  ` : '';

  // Hints — rendered with progressive reveal
  const hs = hintState[p.id] || { shown: 0 };
  const hintsHtml = buildHintsHtml(p, hs.shown);

  document.getElementById('problem-content').innerHTML = `
    <div class="section-block">
      <div class="section-title"><i class="fa-regular fa-file-lines" aria-hidden="true"></i> Description</div>
      <div class="problem-desc">${p.description}</div>
    </div>
    ${labelWarning}
    <div class="section-block">
      <div class="section-title"><i class="fa-solid fa-flask" aria-hidden="true"></i> Examples</div>
      <div class="examples">${exHtml}</div>
    </div>
    <div class="section-block" id="hints-section">
      <div class="section-title"><i class="fa-regular fa-lightbulb" aria-hidden="true"></i> Hints</div>
      ${hintsHtml}
    </div>
  `;
}

function buildHintsHtml(p, shown) {
  const total = (p.hints || []).length;
  if (total === 0) return '<p class="no-hints">No hints for this problem.</p>';

  const revealedHints = p.hints.slice(0, shown).map(h =>
    `<li class="hint-item"><i class="fa-solid fa-angle-right" aria-hidden="true"></i><span>${esc(h)}</span></li>`
  ).join('');

  const remainingCount = total - shown;
  const nextBtn = shown < total
    ? `<button class="btn-hint" onclick="showNextHint()" aria-label="Reveal hint ${shown + 1} of ${total}">
         <i class="fa-solid fa-lightbulb" aria-hidden="true"></i>
         ${shown === 0 ? 'Show a hint' : `Next hint (${shown}/${total} shown)`}
       </button>`
    : `<p class="hints-exhausted"><i class="fa-solid fa-check-circle" aria-hidden="true"></i> All ${total} hints shown</p>`;

  return `
    <ul class="hints-list" id="hints-list">${revealedHints}</ul>
    <div class="hint-controls">${nextBtn}</div>
  `;
}

function showNextHint() {
  if (currentId === null) return;
  const p  = PROJECTS[currentId];
  if (!p) return;
  if (!hintState[currentId]) hintState[currentId] = { shown: 0 };
  const hs = hintState[currentId];
  if (hs.shown >= p.hints.length) return;
  hs.shown++;

  // Re-render just the hints section
  const section = document.getElementById('hints-section');
  if (section) {
    const titleEl = section.querySelector('.section-title');
    const newContent = buildHintsHtml(p, hs.shown);
    section.innerHTML = '';
    section.appendChild(titleEl);
    section.insertAdjacentHTML('beforeend', newContent);
  }
}

// ── TABS ──────────────────────────────────
function switchTab(name) {
  document.querySelectorAll('.tab').forEach(t => {
    t.classList.remove('active');
    t.setAttribute('aria-selected', 'false');
  });
  document.querySelectorAll('.tab-panel').forEach(p => {
    p.classList.remove('active');
    p.setAttribute('hidden', '');
  });
  const tab   = document.querySelector(`.tab[data-tab="${name}"]`);
  const panel = document.getElementById(`panel-${name}`);
  if (tab)   { tab.classList.add('active'); tab.setAttribute('aria-selected', 'true'); }
  if (panel) { panel.classList.add('active'); panel.removeAttribute('hidden'); }
  if (name === 'editor' && editor) setTimeout(() => editor.refresh(), 30);
  if (name === 'leaderboard' && currentId !== null) loadProblemLeaderboard(currentId);
}

// ── STATUS ────────────────────────────────
function setStatus(state, txt) {
  document.getElementById('status-dot').className    = `status-dot ${state}`;
  document.getElementById('status-text').textContent = txt;
}

// ── RESET ─────────────────────────────────
function resetCode() {
  const p = PROJECTS[currentId];
  if (!p || !editor) return;
  delete savedCode[currentId];
  try { localStorage.setItem('pylab_code', JSON.stringify(savedCode)); } catch (_) {}
  editor.setValue(p.starter || '');
  editor.clearHistory();
  clearTerminal();
  setExecTime(null);
  termHideInput();
  setStatus('idle', 'idle');
  _lineBuf      = '';
  waitingInput  = false;
  inputResolve  = null;
}

// ── SOLUTION ──────────────────────────────
// ── SOLUTION SYNTAX HIGHLIGHT ─────────────
function highlightCode(code) {
  if (typeof CodeMirror === 'undefined' || !CodeMirror.runMode) {
    return document.createTextNode(code);
  }
  const frag = document.createDocumentFragment();
  CodeMirror.runMode(code, 'python', (text, cls) => {
    if (cls) {
      const span = document.createElement('span');
      span.className = 'cm-' + cls;
      span.textContent = text;
      frag.appendChild(span);
    } else {
      frag.appendChild(document.createTextNode(text));
    }
  });
  return frag;
}

function setSolPre(code) {
  const pre = document.getElementById('sol-pre');
  if (!pre) return;
  pre.innerHTML = '';
  pre.appendChild(highlightCode(code));
}

function revealSolution() {
  const p = PROJECTS[currentId];
  if (!p) return;
  revealedSet.add(currentId);
  document.getElementById('sol-lock').style.display       = 'none';
  document.getElementById('sol-code-block').style.display = 'block';
  setSolPre(p.solution);
  document.getElementById('sol-explanation').innerHTML    = p.explanation;
  const btn = document.getElementById('copy-btn');
  if (btn) { btn.className = 'btn-copy'; btn.innerHTML = '<i class="fa-regular fa-copy"></i> Copy'; }
}

function copySolution() {
  const p   = PROJECTS[currentId];
  const btn = document.getElementById('copy-btn');
  if (!p || !btn) return;
  const code = p.solution;
  const setText = (copied) => {
    btn.className = copied ? 'btn-copy copied' : 'btn-copy';
    btn.innerHTML = copied
      ? '<i class="fa-solid fa-check"></i> Copied'
      : '<i class="fa-regular fa-copy"></i> Copy';
  };
  navigator.clipboard.writeText(code).then(() => {
    setText(true);
    setTimeout(() => setText(false), 2000);
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = code;
    ta.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    setText(true);
    setTimeout(() => setText(false), 2000);
  });
}

// ── NAV ───────────────────────────────────
function prevProject() { if (currentId > 0)                   openProject(currentId - 1); }
function nextProject() { if (currentId < PROJECTS.length - 1) openProject(currentId + 1); }

// ── PROGRESS RESET ────────────────────────
function confirmResetProgress() {
  const modal = document.getElementById('reset-modal');
  modal.style.display = 'flex';
  modal.setAttribute('aria-hidden', 'false');
  // Trap focus
  setTimeout(() => {
    const cancelBtn = modal.querySelector('.btn-ghost');
    if (cancelBtn) cancelBtn.focus();
  }, 50);
}
function closeResetModal() {
  const modal = document.getElementById('reset-modal');
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
}
function doResetProgress() {
  solved = new Set();
  localStorage.removeItem('pylab_solved');
  localStorage.removeItem('pylab_streak');
  localStorage.removeItem('pylab_code');
  // Clear in-memory saved code so the editor reloads starters
  Object.keys(savedCode).forEach(k => delete savedCode[k]);
  updateCounter();
  renderSidebar(activeFilter, document.getElementById('search-input').value);
  if (currentId !== null) updateSolvedBtn();
  updateWelcomeStats();
  updateStreak();
  updateTopicProgress();
  closeResetModal();
}

// ── SOLVED STATE ──────────────────────────

function normStr(s) {
  return s.split('\n').map(l => l.trim()).filter(Boolean).join('\n').toLowerCase();
}

const FLOAT_EPSILON = 1e-4;

function isNumeric(s) { return s !== '' && !isNaN(Number(s)); }

function floatsMatch(a, b) {
  const fa = parseFloat(a), fb = parseFloat(b);
  if (isNaN(fa) || isNaN(fb)) return false;
  if (fa === fb) return true;
  const diff = Math.abs(fa - fb);
  const mag  = Math.max(Math.abs(fa), Math.abs(fb), 1);
  return diff / mag < FLOAT_EPSILON || diff < FLOAT_EPSILON;
}

function linesMatch(actLine, expLine) {
  if (actLine === expLine) return true;
  const aw = actLine.split(/\s+/).filter(Boolean);
  const ew = expLine.split(/\s+/).filter(Boolean);
  if (aw.length !== ew.length) return false;
  return ew.every((et, i) => {
    const at = aw[i];
    if (et === at) return true;
    if (isNumeric(et) && isNumeric(at)) return floatsMatch(et, at);
    return false;
  });
}

function outputMatches(actual, expected) {
  const na = normStr(actual);
  const ne = normStr(expected);
  if (!ne) return false;
  if (na === ne) return true;

  const aLines = na.split('\n');
  const eLines = ne.split('\n');

  // '...' wildcard lines — match segments in order
  if (eLines.some(l => l === '...')) {
    const segments = [];
    let cur = [];
    for (const l of eLines) {
      if (l === '...') { if (cur.length) segments.push(cur); cur = []; segments.push(null); }
      else cur.push(l);
    }
    if (cur.length) segments.push(cur);

    let pos = 0;
    for (const seg of segments) {
      if (seg === null) continue;
      let found = false;
      outer: for (let i = pos; i <= aLines.length - seg.length; i++) {
        for (let j = 0; j < seg.length; j++) {
          if (!linesMatch(aLines[i + j], seg[j])) continue outer;
        }
        pos = i + seg.length; found = true; break;
      }
      if (!found) return false;
    }
    const lastIsWild = segments[segments.length - 1] === null;
    return lastIsWild || pos === aLines.length;
  }

  if (aLines.length !== eLines.length) return false;
  return eLines.every((el, i) => linesMatch(aLines[i], el));
}

function structurallyMatches(userOutput, refOutput) {
  const uLines = normStr(userOutput).split('\n');
  const rLines = normStr(refOutput).split('\n');
  if (uLines.length !== rLines.length) return false;
  return rLines.every((rl, i) => {
    const ul = uLines[i];
    if (ul === rl) return true;
    const rt = rl.split(/\s+/).filter(Boolean);
    const ut = ul.split(/\s+/).filter(Boolean);
    if (rt.length !== ut.length) return false;
    return rt.every((r, j) => {
      const u = ut[j];
      if (r === u) return true;
      if (isNumeric(r)) return isNumeric(u);
      return false;
    });
  });
}

function parseExampleInput(raw) {
  if (!raw) return [];
  return raw.split(/\n|,\s*then\s*|;\s*/i).map(s => s.trim()).filter(Boolean);
}

async function runSolutionSilently(solution, stdinValues) {
  const realWrite    = pyodide.globals.get('_js_write');
  const realWriteErr = pyodide.globals.get('_js_write_err');
  const savedLineBuf = _lineBuf;
  _lineBuf = '';
  let refOutput = '';
  pyodide.globals.set('_js_write',     (t) => { refOutput += t; });
  pyodide.globals.set('_js_write_err', () => {});
  pyodide.globals.set('_verify_stdin', pyodide.toPy([...stdinValues]));
  await pyodide.runPythonAsync(`
import builtins as _b, collections as _col
_vq = _col.deque(_verify_stdin)
_orig_input = _b.input
async def _verify_input(prompt=''):
    return str(_vq.popleft()) if _vq else '0'
_b.input = _verify_input
`);
  try {
    await pyodide.runPythonAsync(transformCode(solution));
  } finally {
    _lineBuf = savedLineBuf;
    pyodide.globals.set('_js_write',     realWrite);
    pyodide.globals.set('_js_write_err', realWriteErr);
    // Always restore builtins.input even if silent run throws
    await pyodide.runPythonAsync(`
import builtins as _b
_b.input = _orig_input
del _orig_input, _verify_input, _vq
`);
  }
  return refOutput.trim();
}

async function checkAndMarkSolved(actualOutput) {
  const p = PROJECTS[currentId];
  if (!p || solved.has(currentId)) return;
  const actual = actualOutput.trim();
  if (!actual) return;
  const checkable = p.examples.filter(ex => ex.output && ex.output.trim());
  if (!checkable.length) return;

  let isCorrect = false;
  const hasInput = p.solution.includes('input(');

  // Step 1: test against ALL examples with direct output match
  isCorrect = checkable.every(ex => outputMatches(actual, ex.output));

  // Step 2: for input() problems, run reference solution and compare structure
  if (!isCorrect && hasInput && pyodideReady) {
    try {
      const verifyPromise = (async () => {
        for (const ex of checkable) {
          const stdin  = parseExampleInput(ex.input);
          const refOut = await runSolutionSilently(p.solution, stdin);
          if (!refOut) continue;
          if (outputMatches(actual, refOut))       return true;
          if (structurallyMatches(actual, refOut)) return true;
        }
        return false;
      })();
      const timeoutPromise = new Promise(resolve => setTimeout(() => resolve(false), 8000));
      isCorrect = await Promise.race([verifyPromise, timeoutPromise]);
    } catch (e) {
      console.warn('checkAndMarkSolved verify failed:', e);
      const refLines = checkable[0].output.trim().split('\n').length;
      const actLines = actual.split('\n').length;
      isCorrect = actLines === refLines && actual.length > 0;
    }
  }

  if (isCorrect) {
    solved.add(currentId);
    localStorage.setItem('pylab_solved', JSON.stringify([...solved]));
    recordSolveForStreak();
    updateCounter();
    updateSolvedBtn(true);
    updateTopicProgress();
    renderSidebar(activeFilter, document.getElementById('search-input').value);
    // Store solve time and show submit button (no auto-submit)
    if (!revealedSet.has(currentId)) {
      solveTimeMs[currentId] = roundTime(performance.now() - runStartTime);
      showSubmitButton();
    }
  }
}

function updateSolvedBtn(animate = false) {
  const btn = document.getElementById('solved-btn');
  if (!btn) return;
  const is = solved.has(currentId);
  if (is) {
    btn.innerHTML = '<i class="fa-solid fa-circle-check" aria-hidden="true"></i><span class="btn-label"> Solved</span>';
    btn.className = 'btn btn-solved done';
    btn.setAttribute('aria-label', 'Problem solved');
    if (animate) {
      btn.classList.add('flash');
      setTimeout(() => btn.classList.remove('flash'), 900);
      showSolvedCelebration();
    }
  } else {
    btn.innerHTML = '<i class="fa-regular fa-circle" aria-hidden="true"></i><span class="btn-label"> Not solved</span>';
    btn.className = 'btn btn-solved';
    btn.setAttribute('aria-label', 'Problem not yet solved');
  }
  btn.onclick = null;
  btn.style.cursor = 'default';
  btn.title = is ? 'Output matched expected — auto-verified!' : 'Run your code with correct output to unlock';
}

// ── SOLVED CELEBRATION ────────────────────
function showSolvedCelebration() {
  const p = PROJECTS[currentId];

  const existing = document.getElementById('solved-celebration');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'solved-celebration';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Problem solved!');
  overlay.innerHTML = `
    <div class="solv-card">
      <div class="solv-icon-wrap">
        <i class="fa-solid fa-circle-check solv-check" aria-hidden="true"></i>
      </div>
      <div class="solv-title">Solved!</div>
      <div class="solv-problem">${esc(p ? p.title : '')}</div>
      <div class="solv-meta">
        <span class="solv-diff pill-${p ? p.difficulty : ''}">${p ? p.difficulty : ''}</span>
        <span class="solv-topic">${p ? p.topic : ''}</span>
      </div>
      <div class="solv-actions">
        <button class="solv-btn solv-btn-next" onclick="solvedNext()">
          <i class="fa-solid fa-arrow-right" aria-hidden="true"></i> Next problem
        </button>
        <button class="solv-btn solv-btn-close" onclick="closeSolvedCelebration()">
          <i class="fa-solid fa-xmark" aria-hidden="true"></i> Stay here
        </button>
      </div>
    </div>
    <canvas id="solv-canvas" aria-hidden="true"></canvas>
  `;

  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('solv-visible'));

  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeSolvedCelebration();
  });

  // Keyboard: Escape closes
  overlay._keyHandler = (e) => { if (e.key === 'Escape') closeSolvedCelebration(); };
  document.addEventListener('keydown', overlay._keyHandler);

  // Focus the "next" button for keyboard users
  setTimeout(() => {
    const nextBtn = overlay.querySelector('.solv-btn-next');
    if (nextBtn) nextBtn.focus();
  }, 320);

  runSolvedParticles();
}

function closeSolvedCelebration() {
  const overlay = document.getElementById('solved-celebration');
  if (!overlay) return;
  if (overlay._keyHandler) document.removeEventListener('keydown', overlay._keyHandler);
  overlay.classList.remove('solv-visible');
  overlay.classList.add('solv-hiding');
  setTimeout(() => overlay.remove(), 350);
}

function solvedNext() {
  closeSolvedCelebration();
  setTimeout(() => nextProject(), 200);
}

function runSolvedParticles() {
  const canvas = document.getElementById('solv-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const COLORS = ['#4ade80', '#60a5fa', '#c084fc', '#facc15', '#f87171', '#34d399'];
  const PARTICLE_COUNT = 72;
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;

  const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const angle  = (Math.PI * 2 * i) / PARTICLE_COUNT + (Math.random() - 0.5) * 0.4;
    const speed  = 4 + Math.random() * 6;
    const size   = 3 + Math.random() * 5;
    const isRect = Math.random() > 0.5;
    return {
      x: cx, y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 2,
      size,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: 1,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.2,
      isRect,
      gravity: 0.18 + Math.random() * 0.1,
    };
  });

  let frame;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    particles.forEach(p => {
      if (p.alpha <= 0) return;
      alive = true;
      p.x  += p.vx;
      p.y  += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.98;
      p.rotation += p.rotSpeed;
      p.alpha = Math.max(0, p.alpha - 0.013);

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle   = p.color;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      if (p.isRect) {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });
    if (alive) frame = requestAnimationFrame(draw);
  }
  draw();

  const observer = new MutationObserver(() => {
    if (!document.getElementById('solv-canvas')) {
      cancelAnimationFrame(frame);
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

function updateCounter() {
  document.getElementById('solved-count').innerHTML =
    `<i class="fa-solid fa-circle-check" aria-hidden="true"></i><span class="solved-nums"> ${solved.size} / ${PROJECTS.length}</span><span class="solved-text"> solved</span>`;
}

// ── PROGRESS BAR ──────────────────────────
function flashProgress() {
  const bar = document.getElementById('progress-bar');
  if (!bar) return;
  bar.style.width = '40%';
  setTimeout(() => (bar.style.width = '85%'), 200);
  setTimeout(() => (bar.style.width = '100%'), 450);
  setTimeout(() => {
    bar.style.transition = 'none'; bar.style.width = '0';
    setTimeout(() => (bar.style.transition = 'width 280ms ease'), 50);
  }, 750);
}

// ── KEYBOARD ──────────────────────────────
function bindKeys() {
  const searchInput = document.getElementById('search-input');

  searchInput.addEventListener('input', e => {
    const val = e.target.value;
    const clearBtn = document.getElementById('search-clear');
    if (clearBtn) clearBtn.style.display = val ? 'block' : 'none';
    renderSidebar(activeFilter, val);
  });

  document.addEventListener('keydown', e => {
    // Alt+Left / Alt+Right for project navigation
    if (e.altKey && e.key === 'ArrowLeft')  { e.preventDefault(); prevProject(); }
    if (e.altKey && e.key === 'ArrowRight') { e.preventDefault(); nextProject(); }
    // Ctrl+1/2/3 for tabs (when not in editor — editor handles its own)
    if (e.ctrlKey && !e.shiftKey && !e.altKey) {
      const active = document.activeElement;
      const inEditor = active && active.closest && active.closest('.CodeMirror');
      if (!inEditor) {
        if (e.key === '1') { e.preventDefault(); switchTab('problem'); }
        if (e.key === '2') { e.preventDefault(); switchTab('editor'); }
        if (e.key === '3') { e.preventDefault(); switchTab('solution'); }
      }
    }
    // Escape: close modals / sidebar / filter panel / changelog
    if (e.key === 'Escape') {
      closeResetModal();
      closeSidebar();
      closeFilterPanel();
      closeChangelog();
      closeGlobalLeaderboard();
      closeAuthModal();
      closeUserMenu();
    }
  });
}

function clearSearch() {
  const inp    = document.getElementById('search-input');
  const clearBtn = document.getElementById('search-clear');
  inp.value = '';
  if (clearBtn) clearBtn.style.display = 'none';
  renderSidebar(activeFilter, '');
  inp.focus();
}

// ── CHANGELOG ─────────────────────────────
let clOpen   = false;
let clLoaded = false;

function toggleChangelog() { clOpen ? closeChangelog() : openChangelog(); }

function openChangelog() {
  clOpen = true;
  document.getElementById('cl-panel').classList.add('open');
  document.getElementById('cl-backdrop').classList.add('open');
  document.getElementById('cl-panel').setAttribute('aria-hidden', 'false');
  document.getElementById('changelog-btn').classList.add('active');
  if (!clLoaded) loadChangelog();
}

function closeChangelog() {
  clOpen = false;
  document.getElementById('cl-panel').classList.remove('open');
  document.getElementById('cl-backdrop').classList.remove('open');
  document.getElementById('cl-panel').setAttribute('aria-hidden', 'true');
  document.getElementById('changelog-btn').classList.remove('active');
}

// Minimal but complete markdown → HTML renderer
function renderMd(raw) {
  if (!raw) return '';
  const lines = raw.split('\n');
  let html = '';
  let inPre = false, preLang = '', preBuf = '';
  let inUl = false, inOl = false;

  function closeLists() {
    if (inUl) { html += '</ul>'; inUl = false; }
    if (inOl) { html += '</ol>'; inOl = false; }
  }

  function inlineEsc(s) {
    // Escape HTML first, then apply inline markdown
    s = s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    // Code spans (before other replacements)
    s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
    // Bold + italic
    s = s.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
    s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/__(.+?)__/g, '<strong>$1</strong>');
    s = s.replace(/\*(.+?)\*/g, '<em>$1</em>');
    s = s.replace(/_(.+?)_/g, '<em>$1</em>');
    // Strikethrough
    s = s.replace(/~~(.+?)~~/g, '<del>$1</del>');
    // Links
    s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    return s;
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Fenced code block open
    if (!inPre && /^```/.test(line)) {
      closeLists();
      inPre = true;
      preLang = line.slice(3).trim();
      preBuf = '';
      continue;
    }
    // Fenced code block close
    if (inPre && /^```/.test(line)) {
      html += `<pre><code${preLang ? ` class="language-${esc(preLang)}"` : ''}>${preBuf.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</code></pre>`;
      inPre = false; preBuf = ''; preLang = '';
      continue;
    }
    if (inPre) { preBuf += (preBuf ? '\n' : '') + line; continue; }

    // Horizontal rule
    if (/^(-{3,}|\*{3,}|_{3,})\s*$/.test(line)) {
      closeLists(); html += '<hr>'; continue;
    }
    // Headings
    const hm = line.match(/^(#{1,6})\s+(.+)/);
    if (hm) {
      closeLists();
      const level = hm[1].length;
      html += `<h${level}>${inlineEsc(hm[2])}</h${level}>`;
      continue;
    }
    // Blockquote
    if (/^>\s?/.test(line)) {
      closeLists();
      html += `<blockquote>${inlineEsc(line.replace(/^>\s?/, ''))}</blockquote>`;
      continue;
    }
    // Unordered list
    const ulm = line.match(/^[-*+]\s+(.+)/);
    if (ulm) {
      if (inOl) { html += '</ol>'; inOl = false; }
      if (!inUl) { html += '<ul>'; inUl = true; }
      html += `<li>${inlineEsc(ulm[1])}</li>`;
      continue;
    }
    // Ordered list
    const olm = line.match(/^\d+\.\s+(.+)/);
    if (olm) {
      if (inUl) { html += '</ul>'; inUl = false; }
      if (!inOl) { html += '<ol>'; inOl = true; }
      html += `<li>${inlineEsc(olm[1])}</li>`;
      continue;
    }
    // Blank line
    if (!line.trim()) {
      closeLists();
      html += '';
      continue;
    }
    // Paragraph
    closeLists();
    html += `<p>${inlineEsc(line)}</p>`;
  }

  closeLists();
  if (inPre && preBuf) html += `<pre><code>${preBuf.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</code></pre>`;
  return html;
}

async function loadChangelog() {
  const body = document.getElementById('cl-body');
  try {
    const res = await fetch(
      'https://raw.githubusercontent.com/corecommit/Stdin/main/CHANGELOG.md',
      { cache: 'no-cache' }
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const md = await res.text();
    clLoaded = true;
    body.innerHTML = `<div class="cl-md">${renderMd(md)}</div>`;
  } catch (e) {
    body.innerHTML = `<div class="cl-error"><i class="fa-solid fa-triangle-exclamation"></i> Could not load CHANGELOG.md: ${esc(e.message)}</div>`;
  }
}

// ── SUPABASE / LEADERBOARD ────────────────
const SB_URL = 'https://fagaynwptvzdczcrewtu.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhZ2F5bndwdHZ6ZGN6Y3Jld3R1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2NDkyMDksImV4cCI6MjA4OTIyNTIwOX0.atMp7fXuPl57zZUlSal23X3SMKFdN_iHOTh2AHe4f_U';
let sb = null;

function initSupabase() {
  if (sb) return;
  try {
    sb = window.supabase.createClient(SB_URL, SB_KEY);
  } catch (e) {
    console.warn('Supabase init failed:', e);
  }
}

// ── USER IDENTITY ─────────────────────────
// ── AUTH ──────────────────────────────────
function getLocalUser() {
  try { return JSON.parse(localStorage.getItem('pylab_user') || 'null'); } catch { return null; }
}
function setLocalUser(u) {
  localStorage.setItem('pylab_user', JSON.stringify(u));
  sessionStorage.removeItem('pylab_guest');
  updateAuthBadge();
}
function clearLocalUser() {
  localStorage.removeItem('pylab_user');
  updateAuthBadge();
}

function updateAuthBadge() {
  const u         = getLocalUser();
  const badge     = document.getElementById('auth-user-badge');
  const label     = document.getElementById('auth-username-display');
  const signinBtn = document.getElementById('auth-signin-btn');
  const isGuest   = sessionStorage.getItem('pylab_guest') === '1';

  if (u) {
    // Logged in
    if (label) label.textContent = u.username;
    if (badge) badge.style.display = 'inline-flex';
    if (signinBtn) signinBtn.style.display = 'none';
  } else if (isGuest) {
    // Skipped auth this session — show sign in button
    if (badge) badge.style.display = 'none';
    if (signinBtn) signinBtn.style.display = 'inline-flex';
  } else {
    // Haven't been prompted yet
    if (badge) badge.style.display = 'none';
    if (signinBtn) signinBtn.style.display = 'none';
  }
}

function toggleUserMenu() {
  document.getElementById('auth-user-menu').classList.toggle('open');
}
function closeUserMenu() {
  document.getElementById('auth-user-menu').classList.remove('open');
}

// Close user menu on outside click
document.addEventListener('click', e => {
  const badge = document.getElementById('auth-user-badge');
  if (badge && !badge.contains(e.target)) closeUserMenu();
});

async function hashPassword(password) {
  const buf  = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// ── AUTH MODAL ────────────────────────────
let authResolve = null;

function openAuthModal() {
  return new Promise(resolve => {
    authResolve = resolve;
    const modal = document.getElementById('auth-modal');
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    switchAuthTab('login');
  });
}

function switchAuthStep(step) {
  document.getElementById('auth-step-pitch').style.display = step === 'pitch' ? 'flex' : 'none';
  document.getElementById('auth-step-form').style.display  = step === 'form'  ? 'flex' : 'none';
  if (step === 'form') {
    setTimeout(() => document.getElementById('login-username').focus(), 50);
  }
}

function closeAuthModal() {
  const modal = document.getElementById('auth-modal');
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  switchAuthStep('pitch'); // reset to pitch for next open
  ['login-username','login-password','reg-username','reg-password','reg-confirm'].forEach(id => {
    const el = document.getElementById(id); if (el) el.value = '';
  });
  ['login-error','reg-error'].forEach(id => {
    const el = document.getElementById(id); if (el) el.textContent = '';
  });
}

function switchAuthTab(tab) {
  document.getElementById('auth-form-login').style.display    = tab === 'login'    ? 'flex' : 'none';
  document.getElementById('auth-form-register').style.display = tab === 'register' ? 'flex' : 'none';
  document.getElementById('auth-tab-login').classList.toggle('active',    tab === 'login');
  document.getElementById('auth-tab-register').classList.toggle('active', tab === 'register');
  setTimeout(() => {
    const el = document.getElementById(tab === 'login' ? 'login-username' : 'reg-username');
    if (el) el.focus();
  }, 50);
}

function skipAuth() {
  sessionStorage.setItem('pylab_guest', '1');
  closeAuthModal();
  updateAuthBadge();
  if (authResolve) { authResolve(null); authResolve = null; }
}

async function doLogin() {
  const username = document.getElementById('login-username').value.trim().toLowerCase();
  const password = document.getElementById('login-password').value;
  const errEl    = document.getElementById('login-error');
  const btn      = document.getElementById('login-submit');

  if (!username) { errEl.textContent = 'Enter your username.'; return; }
  if (!password) { errEl.textContent = 'Enter your password.'; return; }

  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-circle-notch spin"></i> Signing in…';
  errEl.textContent = '';
  initSupabase();

  try {
    const hash = await hashPassword(password);
    const { data, error } = await sb.from('users')
      .select('id, username').eq('username', username).eq('password_hash', hash).maybeSingle();

    if (error) throw error;
    if (!data) { errEl.textContent = 'Wrong username or password.'; btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-arrow-right-to-bracket"></i> Sign in'; return; }

    const user = { id: data.id, username: data.username };
    setLocalUser(user);
    closeAuthModal();
    if (authResolve) { authResolve(user); authResolve = null; }
  } catch (e) {
    errEl.textContent = 'Error signing in. Try again.';
    console.error(e);
  }
  btn.disabled = false;
  btn.innerHTML = '<i class="fa-solid fa-arrow-right-to-bracket"></i> Sign in';
}

async function doRegister() {
  const username = document.getElementById('reg-username').value.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '');
  const password = document.getElementById('reg-password').value;
  const confirm  = document.getElementById('reg-confirm').value;
  const errEl    = document.getElementById('reg-error');
  const btn      = document.getElementById('reg-submit');

  document.getElementById('reg-username').value = username;
  if (!username || username.length < 2) { errEl.textContent = 'Username must be at least 2 characters.'; return; }
  if (username.length > 20)             { errEl.textContent = 'Username max 20 characters.'; return; }
  if (!password || password.length < 6) { errEl.textContent = 'Password must be at least 6 characters.'; return; }
  if (password !== confirm)             { errEl.textContent = 'Passwords do not match.'; return; }

  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-circle-notch spin"></i> Creating account…';
  errEl.textContent = '';
  initSupabase();

  try {
    const { data: existing } = await sb.from('users').select('id').eq('username', username).maybeSingle();
    if (existing) { errEl.textContent = 'Username taken, try another.'; btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-user-plus"></i> Create account'; return; }

    const hash = await hashPassword(password);
    const { data, error } = await sb.from('users').insert({ username, password_hash: hash }).select().single();
    if (error) throw error;

    const user = { id: data.id, username: data.username };
    setLocalUser(user);
    closeAuthModal();
    if (authResolve) { authResolve(user); authResolve = null; }
  } catch (e) {
    errEl.textContent = 'Error creating account. Try again.';
    console.error(e);
  }
  btn.disabled = false;
  btn.innerHTML = '<i class="fa-solid fa-user-plus"></i> Create account';
}

function togglePasswordVis(inputId, btn) {
  const input = document.getElementById(inputId);
  const icon  = btn.querySelector('i');
  if (input.type === 'password') {
    input.type = 'text';
    icon.className = 'fa-regular fa-eye-slash';
  } else {
    input.type = 'password';
    icon.className = 'fa-regular fa-eye';
  }
}

function doLogout() {
  clearLocalUser();
  closeUserMenu();
}

async function ensureUser(onDone) {
  const u = getLocalUser();
  if (u) { onDone(u); return; }
  const user = await openAuthModal();
  onDone(user);
}

// ── SUBMIT SOLVE ──────────────────────────
// ── SUBMIT BUTTON ─────────────────────────
function showSubmitButton() {
  const btn = document.getElementById('submit-btn');
  if (!btn) return;
  btn.style.display = 'inline-flex';
  btn.disabled = false;
  btn.innerHTML = '<i class="fa-solid fa-upload"></i><span class="btn-label"> Submit</span>';
  btn.title = 'Submit your solve time to the leaderboard';
}

function hideSubmitButton() {
  const btn = document.getElementById('submit-btn');
  if (btn) btn.style.display = 'none';
}

async function submitToLeaderboard() {
  const btn = document.getElementById('submit-btn');
  const id  = currentId;
  // If no session time (solved in a previous session), we can't submit a time
  const ms  = solveTimeMs[id];
  if (ms === undefined && !solved.has(id)) return;

  // Rate limit check
  const lastAt = lastSubmitAt[id] || 0;
  const sinceLastMs = Date.now() - lastAt;
  if (sinceLastMs < SUBMIT_COOLDOWN_MS) {
    const secsLeft = Math.ceil((SUBMIT_COOLDOWN_MS - sinceLastMs) / 1000);
    btn.disabled = true;
    btn.innerHTML = `<i class="fa-solid fa-clock"></i><span class="btn-label"> Wait ${secsLeft}s</span>`;
    // Countdown
    const interval = setInterval(() => {
      const left = Math.ceil((SUBMIT_COOLDOWN_MS - (Date.now() - lastAt)) / 1000);
      if (left <= 0) {
        clearInterval(interval);
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-upload"></i><span class="btn-label"> Submit</span>';
      } else {
        btn.innerHTML = `<i class="fa-solid fa-clock"></i><span class="btn-label"> Wait ${left}s</span>`;
      }
    }, 1000);
    return;
  }

  // Ensure logged in
  const user = getLocalUser();
  if (!user) {
    await openAuthModal();
    if (!getLocalUser()) return;
  }

  // No session time = solved in a previous session.
  // Run the solution silently to get a time, then submit.
  if (ms === undefined) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-circle-notch spin"></i><span class="btn-label"> Timing…</span>';
    const p = PROJECTS[id];
    if (p && pyodideReady) {
      try {
        const checkable = p.examples.filter(ex => ex.output && ex.output.trim());
        const stdin = parseExampleInput(checkable[0]?.input || '');
        const t0 = performance.now();
        await runSolutionSilently(p.solution, stdin);
        solveTimeMs[id] = roundTime(performance.now() - t0);
      } catch (e) {
        console.warn('Silent run for timing failed:', e);
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-upload"></i><span class="btn-label"> Submit</span>';
        return;
      }
    } else {
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-upload"></i><span class="btn-label"> Submit</span>';
      return;
    }
  }

  // Submit
  const finalMs = solveTimeMs[id];
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-circle-notch spin"></i><span class="btn-label"> Submitting…</span>';

  await submitSolveToLeaderboard(id, finalMs);
  lastSubmitAt[id] = Date.now();

  btn.innerHTML = '<i class="fa-solid fa-check"></i><span class="btn-label"> Submitted!</span>';
  btn.style.background = 'rgba(74,222,128,0.15)';
  setTimeout(() => {
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-upload"></i><span class="btn-label"> Submit</span>';
    btn.style.background = '';
  }, 2000);
}


async function submitSolveToLeaderboard(projectId, timeMs) {
  initSupabase();
  const p    = PROJECTS[projectId];
  const user = getLocalUser();
  if (!p || !user) return;

  try {
    const { data: existing } = await sb.from('solves')
      .select('id, time_ms').eq('user_id', user.id).eq('problem_id', projectId).maybeSingle();

    if (existing) {
      if (timeMs < existing.time_ms) {
        await sb.from('solves').update({ time_ms: timeMs, solved_at: new Date().toISOString() }).eq('id', existing.id);
      }
    } else {
      await sb.from('solves').insert({
        user_id: user.id, problem_id: projectId,
        problem_title: p.title, difficulty: p.difficulty, time_ms: timeMs,
      });
    }
  } catch (e) {
    console.warn('submitSolveToLeaderboard failed:', e);
  }
}

// ── PER-PROBLEM LEADERBOARD ───────────────
let _lbLastLoadedId = null;

async function loadProblemLeaderboard(projectId) {
  if (_lbLastLoadedId === projectId) return; // already loaded for this problem
  _lbLastLoadedId = projectId;
  const panel = document.getElementById('lb-panel');
  panel.innerHTML = '<div class="lb-loading"><i class="fa-solid fa-circle-notch spin"></i> Loading…</div>';
  initSupabase();

  try {
    const { data, error } = await sb.from('solves')
      .select('user_id, time_ms, solved_at, users(username)')
      .eq('problem_id', projectId)
      .order('time_ms', { ascending: true })
      .limit(50);

    if (error) throw error;

    if (!data || !data.length) {
      panel.innerHTML = `<div class="lb-empty"><i class="fa-solid fa-trophy"></i><span>No solves yet — be the first!</span></div>`;
      return;
    }

    const localUser = getLocalUser();
    const myRow = localUser ? data.find(r => r.user_id === localUser.id) : null;
    const myRank = myRow ? data.indexOf(myRow) + 1 : null;

    let html = '';

    if (myRow && myRank) {
      html += `<div class="lb-your-rank"><i class="fa-solid fa-user"></i> Your rank: <strong>#${myRank}</strong> — ${formatTime(myRow.time_ms)}</div>`;
    }

    html += `<table class="lb-table">
      <thead><tr><th>#</th><th>User</th><th>Time</th></tr></thead>
      <tbody>`;

    data.slice(0, 20).forEach((row, i) => {
      const rank = i + 1;
      const isMe = localUser && row.user_id === localUser.id;
      const rankClass = rank === 1 ? 'lb-rank-1' : rank === 2 ? 'lb-rank-2' : rank === 3 ? 'lb-rank-3' : 'lb-rank';
      html += `<tr class="${isMe ? 'lb-me' : ''}">
        <td><span class="${rankClass}">#${rank}</span></td>
        <td><span class="lb-username">${esc(row.users?.username || 'unknown')}</span></td>
        <td><span class="lb-time">${formatTime(row.time_ms)}</span></td>
      </tr>`;
    });

    html += '</tbody></table>';
    panel.innerHTML = html;
  } catch (e) {
    panel.innerHTML = `<div class="lb-empty"><i class="fa-solid fa-triangle-exclamation"></i><span>Failed to load leaderboard</span></div>`;
    console.warn('loadProblemLeaderboard failed:', e);
  }
}

// ── GLOBAL LEADERBOARD ────────────────────
let glbOpen = false;
let glbTab  = 'most-solved';

function openGlobalLeaderboard() {
  glbOpen = true;
  document.getElementById('glb-panel').classList.add('open');
  document.getElementById('glb-backdrop').classList.add('open');
  document.getElementById('glb-panel').setAttribute('aria-hidden', 'false');
  loadGlobalLeaderboard(glbTab);
}

function closeGlobalLeaderboard() {
  glbOpen = false;
  document.getElementById('glb-panel').classList.remove('open');
  document.getElementById('glb-backdrop').classList.remove('open');
  document.getElementById('glb-panel').setAttribute('aria-hidden', 'true');
}

function switchGlbTab(tab, el) {
  glbTab = tab;
  document.querySelectorAll('.glb-tab').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  loadGlobalLeaderboard(tab);
}

async function loadGlobalLeaderboard(tab) {
  const body = document.getElementById('glb-body');
  body.innerHTML = '<div class="cl-loading"><i class="fa-solid fa-circle-notch spin"></i> Loading…</div>';
  initSupabase();

  try {
    if (tab === 'most-solved') {
      // NOTE: ideally aggregate this server-side via a Supabase RPC to avoid
      // fetching all rows. For now, cap at 500 to limit bandwidth.
      const { data, error } = await sb.from('solves')
        .select('user_id, users(username)')
        .order('user_id')
        .limit(500);
      if (error) throw error;

      // Count per user
      const counts = {};
      data.forEach(r => {
        const name = r.users?.username || 'unknown';
        counts[name] = (counts[name] || 0) + 1;
      });
      const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 20);

      body.innerHTML = sorted.length ? sorted.map(([name, count], i) => `
        <div class="glb-row">
          <span class="glb-pos">${i === 0 ? '<i class="fa-solid fa-trophy" style="color:#fbbf24"></i>' : i === 1 ? '<i class="fa-solid fa-trophy" style="color:#94a3b8"></i>' : i === 2 ? '<i class="fa-solid fa-trophy" style="color:#b45309"></i>' : `#${i+1}`}</span>
          <span class="glb-name">${esc(name)}</span>
          <span class="glb-val">${count} solved</span>
        </div>
      `).join('') : '<div class="cl-loading">No data yet</div>';

    } else if (tab === 'fastest') {
      const { data, error } = await sb.from('solves')
        .select('user_id, time_ms, users(username)')
        .order('time_ms', { ascending: true });
      if (error) throw error;

      // Average time per user (min 3 solves)
      const userData = {};
      data.forEach(r => {
        const name = r.users?.username || 'unknown';
        if (!userData[name]) userData[name] = [];
        userData[name].push(r.time_ms);
      });
      const sorted = Object.entries(userData)
        .filter(([, times]) => times.length >= 3)
        .map(([name, times]) => [name, Math.round(times.reduce((a, b) => a + b) / times.length)])
        .sort((a, b) => a[1] - b[1]).slice(0, 20);

      body.innerHTML = sorted.length ? sorted.map(([name, avg], i) => `
        <div class="glb-row">
          <span class="glb-pos">${i === 0 ? '<i class="fa-solid fa-trophy" style="color:#fbbf24"></i>' : i === 1 ? '<i class="fa-solid fa-trophy" style="color:#94a3b8"></i>' : i === 2 ? '<i class="fa-solid fa-trophy" style="color:#b45309"></i>' : `#${i+1}`}</span>
          <span class="glb-name">${esc(name)}</span>
          <span class="glb-val">${formatTime(avg)} avg</span>
        </div>
      `).join('') : '<div class="cl-loading">Need at least 3 solves to rank</div>';

    } else if (tab === 'recent') {
      const { data, error } = await sb.from('solves')
        .select('problem_title, difficulty, time_ms, solved_at, users(username)')
        .order('solved_at', { ascending: false })
        .limit(30);
      if (error) throw error;

      const diffColor = { easy: 'var(--easy)', medium: 'var(--medium)', hard: 'var(--hard)', expert: 'var(--expert)' };
      body.innerHTML = data.length ? data.map(r => `
        <div class="glb-row">
          <span class="glb-name">${esc(r.users?.username || 'unknown')}</span>
          <span class="glb-val" style="color:${diffColor[r.difficulty] || 'var(--text-faint)'}; font-size:10px; margin-right:6px">${r.difficulty}</span>
          <span class="glb-val" style="flex:1; font-size:11px; color:var(--text-dim)">${esc(r.problem_title)}</span>
          <span class="glb-val">${formatTime(r.time_ms)}</span>
        </div>
      `).join('') : '<div class="cl-loading">No recent solves</div>';
    }
  } catch (e) {
    body.innerHTML = `<div class="cl-loading">Failed to load</div>`;
    console.warn('loadGlobalLeaderboard failed:', e);
  }
}

function formatTime(ms) {
  const r = roundTime(ms);
  if (r < 1000) return `~${r}ms`;
  if (r < 60000) return `~${(r/1000).toFixed(1)}s`;
  const m = Math.floor(r / 60000);
  const s = Math.floor((r % 60000) / 1000);
  return `~${m}m ${s}s`;
}

// ── UTILS ─────────────────────────────────
function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
