const PROJECTS_EXPERT = [
  {
    title: 'Async Concurrent Tasks', difficulty: 'expert', topic: 'Async',
    description: 'Use <code>asyncio</code> to run multiple tasks concurrently. Demonstrate the speedup vs sequential execution.',
    examples: [
      { output: 'Sequential: ~3s\nConcurrent: ~1s' }
    ],
    hints: ['async def and await', 'asyncio.gather() runs concurrently', 'asyncio.sleep() simulates I/O'],
    starter: 'import asyncio, time\n\nasync def task(name, delay):\n    print(f"Start {name}")\n    await asyncio.sleep(delay)\n    print(f"Done  {name}")\n    return f"{name} result"\n\nasync def main():\n    # Run tasks concurrently\n    pass\n\nasyncio.run(main())\n',
    solution: 'import asyncio, time\n\nasync def task(name, delay):\n    print(f"Start {name}")\n    await asyncio.sleep(delay)\n    print(f"Done  {name}")\n    return f"{name} result"\n\nasync def main():\n    start = time.time()\n    results = await asyncio.gather(\n        task("A", 1), task("B", 1), task("C", 1)\n    )\n    print(f"\\nAll done in {time.time()-start:.2f}s")\n    for r in results: print(r)\n\nasyncio.run(main())',
    explanation: '<code>asyncio.gather()</code> runs coroutines concurrently. While one awaits sleep, others run — total time is max(delays), not sum.'
  },
  {
    title: 'Metaclass Logger', difficulty: 'expert', topic: 'Metaprogramming',
    description: 'Create a metaclass that automatically wraps all public methods with logging. Classes using it get logging for free.',
    examples: [
      { output: '[LOG] Calling greet\nHello Alice!\n[LOG] greet done in 0.0001s' }
    ],
    hints: ['Metaclass inherits from type', 'Override __new__ to intercept class creation', 'Wrap methods in __new__'],
    starter: 'import time\nfrom functools import wraps\n\nclass LogMeta(type):\n    def __new__(mcs, name, bases, ns):\n        for k, v in ns.items():\n            if callable(v) and not k.startswith("_"):\n                ns[k] = mcs.wrap(v)\n        return super().__new__(mcs, name, bases, ns)\n    \n    @staticmethod\n    def wrap(fn):\n        @wraps(fn)\n        def w(*a, **kw):\n            pass  # log and call\n        return w\n\nclass Service(metaclass=LogMeta):\n    def greet(self, name): print(f"Hello {name}!")\n    def add(self, a, b): return a + b\n\ns = Service()\ns.greet("Alice")\nprint(s.add(3, 4))\n',
    solution: 'import time\nfrom functools import wraps\n\nclass LogMeta(type):\n    def __new__(mcs, name, bases, ns):\n        for k, v in list(ns.items()):\n            if callable(v) and not k.startswith("_"):\n                ns[k] = mcs.wrap(v)\n        return super().__new__(mcs, name, bases, ns)\n    \n    @staticmethod\n    def wrap(fn):\n        @wraps(fn)\n        def w(*a, **kw):\n            print(f"[LOG] Calling {fn.__name__}")\n            t = time.time()\n            result = fn(*a, **kw)\n            print(f"[LOG] {fn.__name__} done in {time.time()-t:.4f}s")\n            return result\n        return w\n\nclass Service(metaclass=LogMeta):\n    def greet(self, name): print(f"Hello {name}!")\n    def add(self, a, b): return a + b\n\ns = Service()\ns.greet("Alice")\nprint("Sum:", s.add(3, 4))',
    explanation: 'Metaclass <code>__new__</code> fires before the class is created, letting us rewrite the namespace. All public methods are replaced with wrapped versions.'
  },
  {
    title: 'Expression Interpreter', difficulty: 'expert', topic: 'Interpreters',
    description: 'Build a recursive descent parser for arithmetic expressions supporting +, -, *, /, and parentheses.',
    examples: [
      { input: '(3+4)*2', output: '14.0' },
      { input: '10/(2+3)', output: '2.0' }
    ],
    hints: ['expr() handles +/-', 'term() handles */÷', 'factor() handles atoms and (expr)', 'Each level calls the next'],
    starter: 'class Calc:\n    def __init__(self, text):\n        self.s = text.replace(" ","")\n        self.i = 0\n    def peek(self): return self.s[self.i] if self.i < len(self.s) else ""\n    def consume(self):\n        c = self.s[self.i]; self.i += 1; return c\n    def factor(self):\n        pass  # number or (expr)\n    def term(self):\n        pass  # handle * /\n    def expr(self):\n        pass  # handle + -\n\nfor e in ["3+4*2","(3+4)*2","10/(2+3)"]:\n    print(f"{e} = {Calc(e).expr()}")\n',
    solution: 'class Calc:\n    def __init__(self, text):\n        self.s = text.replace(" ","")\n        self.i = 0\n    def peek(self): return self.s[self.i] if self.i < len(self.s) else ""\n    def consume(self): c = self.s[self.i]; self.i += 1; return c\n    def factor(self):\n        if self.peek() == "(":\n            self.consume()\n            val = self.expr()\n            self.consume()  # )\n            return val\n        start = self.i\n        if self.peek() in "+-": self.consume()\n        while self.peek().isdigit() or self.peek() == ".": self.consume()\n        return float(self.s[start:self.i])\n    def term(self):\n        left = self.factor()\n        while self.peek() in "/*":\n            op = self.consume()\n            right = self.factor()\n            left = left*right if op=="*" else left/right\n        return left\n    def expr(self):\n        left = self.term()\n        while self.peek() in "+-":\n            op = self.consume()\n            right = self.term()\n            left = left+right if op=="+" else left-right\n        return left\n\nfor e in ["3+4*2","(3+4)*2","10/(2+3)","2*(3+4*(1+1))"]:\n    print(f"{e} = {Calc(e).expr()}")',
    explanation: 'Recursive descent respects operator precedence via function call hierarchy: expr → term → factor. Each level handles lower-precedence operators.'
  },
  {
    title: 'Coroutine Pipeline', difficulty: 'expert', topic: 'Coroutines',
    description: 'Build a data processing pipeline using coroutines with <code>send()</code>. Each stage filters or transforms data.',
    examples: [
      { output: 'Pipeline: producer→filter_evens→square→printer\n4\n16\n36\n64\n100' }
    ],
    hints: ['yield as both input and output', 'next(coro) to prime a coroutine', 'send() pushes data in'],
    starter: 'def coroutine(fn):\n    """Decorator that primes a coroutine automatically."""\n    def wrapper(*args, **kwargs):\n        c = fn(*args, **kwargs)\n        next(c)\n        return c\n    return wrapper\n\n@coroutine\ndef printer():\n    while True:\n        val = yield\n        print(val)\n\n@coroutine  \ndef filter_evens(target):\n    while True:\n        val = yield\n        if val % 2 == 0:\n            target.send(val)\n\n# Add square stage and producer\n',
    solution: 'def coroutine(fn):\n    def wrapper(*args, **kwargs):\n        c = fn(*args, **kwargs)\n        next(c)\n        return c\n    return wrapper\n\n@coroutine\ndef printer():\n    while True:\n        val = yield\n        print(val)\n\n@coroutine\ndef filter_evens(target):\n    while True:\n        val = yield\n        if val % 2 == 0:\n            target.send(val)\n\n@coroutine\ndef squarer(target):\n    while True:\n        val = yield\n        target.send(val ** 2)\n\ndef producer(target, n):\n    for i in range(1, n+1):\n        target.send(i)\n\npipeline = filter_evens(squarer(printer()))\nprint("Even squares 1-10:")\nproducer(pipeline, 10)',
    explanation: 'Coroutines use <code>yield</code> to receive values via <code>send()</code>. Chaining them creates a composable pipeline. The <code>@coroutine</code> decorator primes each stage.'
  },
  {
    title: 'Abstract Base Classes', difficulty: 'expert', topic: 'OOP',
    description: 'Use <code>abc</code> module to define an abstract base class for a plugin system. Enforce interface contracts at class creation time.',
    examples: [
      { output: 'CSVPlugin loaded\nJSONPlugin loaded\nTypeError: Can\'t instantiate abstract class' }
    ],
    hints: ['from abc import ABC, abstractmethod', '@abstractmethod forces subclass implementation', 'ABCMeta raises TypeError if abstract methods not implemented'],
    starter: 'from abc import ABC, abstractmethod\n\nclass DataPlugin(ABC):\n    @abstractmethod\n    def load(self, path): pass\n    \n    @abstractmethod\n    def save(self, data, path): pass\n    \n    @property\n    @abstractmethod\n    def name(self): pass\n\n# Implement CSVPlugin and JSONPlugin\n',
    solution: 'from abc import ABC, abstractmethod\n\nclass DataPlugin(ABC):\n    @abstractmethod\n    def load(self, path): pass\n    @abstractmethod\n    def save(self, data, path): pass\n    @property\n    @abstractmethod\n    def name(self): pass\n    def __repr__(self): return f"<Plugin: {self.name}>"\n\nclass CSVPlugin(DataPlugin):\n    @property\n    def name(self): return "CSV"\n    def load(self, path): return f"Loading CSV from {path}"\n    def save(self, data, path): return f"Saving CSV to {path}"\n\nclass JSONPlugin(DataPlugin):\n    @property\n    def name(self): return "JSON"\n    def load(self, path): return f"Loading JSON from {path}"\n    def save(self, data, path): return f"Saving JSON to {path}"\n\nplugins = [CSVPlugin(), JSONPlugin()]\nfor p in plugins:\n    print(f"{p.name}: {p.load(\'data.file\')}")\n\ntry:\n    DataPlugin()  # Should fail\nexcept TypeError as e:\n    print(f"Error: {e}")',
    explanation: '<code>ABC</code> and <code>@abstractmethod</code> enforce the interface contract. Python raises <code>TypeError</code> at instantiation if any abstract method is not implemented.'
  },
  {
    title: 'Descriptor Protocol', difficulty: 'expert', topic: 'Advanced Python',
    description: 'Implement Python descriptors to create a typed, validated attribute system for classes.',
    examples: [
      { output: 'Person created: Alice, 30\nTypeError: age must be int\nValueError: age must be positive' }
    ],
    hints: ['Descriptors define __get__, __set__, __delete__', 'Store values in instance __dict__ with a key', 'Non-data descriptor: only __get__'],
    starter: 'class TypedAttribute:\n    def __init__(self, name, type_, validator=None):\n        self.name = name\n        self.type_ = type_\n        self.validator = validator\n    \n    def __set_name__(self, owner, name):\n        self.public_name = name\n    \n    def __get__(self, obj, objtype=None):\n        if obj is None: return self\n        return obj.__dict__.get(self.name)\n    \n    def __set__(self, obj, value):\n        pass  # validate type and constraint\n\nclass Person:\n    name = TypedAttribute("name", str)\n    age = TypedAttribute("age", int, lambda x: x > 0)\n    \n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n',
    solution: 'class TypedAttribute:\n    def __init__(self, name, type_, validator=None):\n        self.name = name\n        self.type_ = type_\n        self.validator = validator\n    def __set_name__(self, owner, name):\n        self.public_name = name\n    def __get__(self, obj, objtype=None):\n        if obj is None: return self\n        return obj.__dict__.get(self.name)\n    def __set__(self, obj, value):\n        if not isinstance(value, self.type_):\n            raise TypeError(f"{self.name} must be {self.type_.__name__}")\n        if self.validator and not self.validator(value):\n            raise ValueError(f"{self.name} failed validation")\n        obj.__dict__[self.name] = value\n\nclass Person:\n    name = TypedAttribute("name", str)\n    age = TypedAttribute("age", int, lambda x: x > 0)\n    def __init__(self, name, age):\n        self.name = name; self.age = age\n    def __repr__(self): return f"Person({self.name!r}, {self.age})"\n\np = Person("Alice", 30)\nprint(p)\ntry: Person("Bob", "thirty")\nexcept TypeError as e: print(f"TypeError: {e}")\ntry: Person("Carol", -5)\nexcept ValueError as e: print(f"ValueError: {e}")',
    explanation: 'Descriptors intercept attribute access at the class level. <code>__set__</code> validates before storing. <code>__set_name__</code> auto-captures the attribute name when the class is defined.'
  },
  {
    title: 'Observer Pattern', difficulty: 'expert', topic: 'Design Patterns',
    description: 'Implement the Observer design pattern with an event system. Objects subscribe to events and get notified when they fire.',
    examples: [
      { output: 'Logger: price changed to 150\nAlert: price crossed threshold! 150' }
    ],
    hints: ['EventEmitter: dict of event→[handlers]', 'subscribe(event, handler)', 'emit(event, *data) calls all handlers'],
    starter: 'class EventEmitter:\n    def __init__(self):\n        self._handlers = {}\n    \n    def on(self, event, handler):\n        pass  # subscribe\n    \n    def emit(self, event, *args, **kwargs):\n        pass  # notify all subscribers\n\nclass Stock(EventEmitter):\n    def __init__(self, name, price):\n        super().__init__()\n        self.name = name\n        self._price = price\n    \n    @property\n    def price(self): return self._price\n    \n    @price.setter\n    def price(self, value):\n        self._price = value\n        self.emit("price_change", value)\n\nstock = Stock("AAPL", 100)\nstock.on("price_change", lambda p: print(f"Logger: price={p}"))\nstock.price = 150\n',
    solution: 'class EventEmitter:\n    def __init__(self): self._handlers = {}\n    def on(self, event, handler):\n        self._handlers.setdefault(event, []).append(handler)\n    def off(self, event, handler):\n        if event in self._handlers:\n            self._handlers[event].remove(handler)\n    def emit(self, event, *args, **kwargs):\n        for h in self._handlers.get(event, []):\n            h(*args, **kwargs)\n\nclass Stock(EventEmitter):\n    def __init__(self, name, price):\n        super().__init__()\n        self.name = name\n        self._price = price\n    @property\n    def price(self): return self._price\n    @price.setter\n    def price(self, value):\n        old = self._price\n        self._price = value\n        self.emit("price_change", value, old)\n\nstock = Stock("AAPL", 100)\nstock.on("price_change", lambda new, old: print(f"Logger: {old} -> {new}"))\nstock.on("price_change", lambda new, old: print(f"Alert! +{new-old}") if new > old else None)\nstock.price = 150\nstock.price = 120',
    explanation: 'Observer decouples event producers from consumers. <code>emit()</code> calls all registered handlers. <code>setdefault</code> auto-creates the handler list.'
  },
  {
    title: 'Type System with __class_getitem__', difficulty: 'expert', topic: 'Advanced Python',
    description: 'Build a generic <code>TypedList[T]</code> that enforces element types at runtime, using <code>__class_getitem__</code> and <code>__init_subclass__</code>.',
    examples: [
      { output: 'TypedList[int]: [1,2,3]\nTypeError: Expected int, got str' }
    ],
    hints: ['__class_getitem__ enables List[int] syntax', 'Return a new class or parameterized version', 'Override __setitem__ and append to validate'],
    starter: 'class TypedList(list):\n    item_type = object\n    \n    def __class_getitem__(cls, item_type):\n        # Return a new class parameterized with item_type\n        pass\n    \n    def _check(self, value):\n        if not isinstance(value, self.item_type):\n            raise TypeError(f"Expected {self.item_type.__name__}, got {type(value).__name__}")\n    \n    def append(self, value):\n        self._check(value)\n        super().append(value)\n\nIntList = TypedList[int]\nls = IntList([1, 2, 3])\nprint(ls)\nls.append(4)\nprint(ls)\ntry: ls.append("hello")\nexcept TypeError as e: print(e)\n',
    solution: 'class TypedList(list):\n    item_type = object\n    \n    def __class_getitem__(cls, item_type):\n        return type(f"TypedList[{item_type.__name__}]", (cls,), {"item_type": item_type})\n    \n    def __init__(self, iterable=()):\n        super().__init__()\n        for v in iterable: self.append(v)\n    \n    def _check(self, value):\n        if not isinstance(value, self.item_type):\n            raise TypeError(f"Expected {self.item_type.__name__}, got {type(value).__name__}")\n    \n    def append(self, value):\n        self._check(value)\n        super().append(value)\n    \n    def __setitem__(self, idx, value):\n        self._check(value)\n        super().__setitem__(idx, value)\n    \n    def __repr__(self):\n        return f"TypedList[{self.item_type.__name__}]({list(self)})"\n\nIntList = TypedList[int]\nls = IntList([1, 2, 3])\nprint(ls)\nls.append(4)\nprint(ls)\ntry: ls.append("hello")\nexcept TypeError as e: print(e)',
    explanation: '<code>__class_getitem__</code> enables generic syntax. We dynamically create a subclass with the bound type. All mutation methods validate via <code>_check()</code>.'
  },
  {
    title: 'Sudoku Solver', difficulty: 'expert', topic: 'Backtracking',
    description: 'Solve a 9×9 Sudoku puzzle using backtracking.',
    examples: [
      { output: 'Solved:\n5 3 4 6 7 8 9 1 2\n6 7 2 1 9 5 3 4 8\n1 9 8 3 4 2 5 6 7\n8 5 9 7 6 1 4 2 3\n4 2 6 8 5 3 7 9 1\n7 1 3 9 2 4 8 5 6\n9 6 1 5 3 7 2 8 4\n2 8 7 4 1 9 6 3 5\n3 4 5 2 8 6 1 7 9' }
    ],
    hints: ['Find empty cell (value 0)', 'Try digits 1-9', 'Backtrack if no valid digit fits', 'Validate row, col, 3×3 box'],
    starter: 'def solve(board):\n    empty = find_empty(board)\n    if not empty: return True\n    row, col = empty\n    for num in range(1, 10):\n        if is_valid(board, row, col, num):\n            board[row][col] = num\n            if solve(board): return True\n            board[row][col] = 0\n    return False\n\ndef find_empty(board):\n    for r in range(9):\n        for c in range(9):\n            if board[r][c] == 0: return (r, c)\n    return None\n\ndef is_valid(board, row, col, num):\n    pass  # Check row, col, box\n\nboard = [\n    [5,3,0,0,7,0,0,0,0],[6,0,0,1,9,5,0,0,0],[0,9,8,0,0,0,0,6,0],\n    [8,0,0,0,6,0,0,0,3],[4,0,0,8,0,3,0,0,1],[7,0,0,0,2,0,0,0,6],\n    [0,6,0,0,0,0,2,8,0],[0,0,0,4,1,9,0,0,5],[0,0,0,0,8,0,0,7,9]\n]\nsolve(board)\nfor row in board: print(*row)\n',
    solution: 'def solve(board):\n    empty = find_empty(board)\n    if not empty: return True\n    row, col = empty\n    for num in range(1, 10):\n        if is_valid(board, row, col, num):\n            board[row][col] = num\n            if solve(board): return True\n            board[row][col] = 0\n    return False\n\ndef find_empty(board):\n    for r in range(9):\n        for c in range(9):\n            if board[r][c] == 0: return (r, c)\n    return None\n\ndef is_valid(board, row, col, num):\n    if num in board[row]: return False\n    if num in [board[r][col] for r in range(9)]: return False\n    br, bc = 3*(row//3), 3*(col//3)\n    for r in range(br, br+3):\n        for c in range(bc, bc+3):\n            if board[r][c] == num: return False\n    return True\n\nboard = [\n    [5,3,0,0,7,0,0,0,0],[6,0,0,1,9,5,0,0,0],[0,9,8,0,0,0,0,6,0],\n    [8,0,0,0,6,0,0,0,3],[4,0,0,8,0,3,0,0,1],[7,0,0,0,2,0,0,0,6],\n    [0,6,0,0,0,0,2,8,0],[0,0,0,4,1,9,0,0,5],[0,0,0,0,8,0,0,7,9]\n]\nsolve(board)\nfor row in board: print(*row)',
    explanation: 'Backtracking: fill empty cells one by one, trying 1-9. If placement leads to no solution, backtrack (set back to 0) and try the next digit.'
  },
  {
    title: 'Async Task Scheduler', difficulty: 'expert', topic: 'Async',
    description: 'Build a priority-based async task scheduler that executes tasks in order of priority with rate limiting.',
    examples: [
      { output: 'Running HIGH priority tasks first, then MEDIUM, then LOW' }
    ],
    hints: ['asyncio.PriorityQueue for ordered execution', 'asyncio.Semaphore for rate limiting', 'Task is a dataclass with priority'],
    starter: 'import asyncio\nfrom dataclasses import dataclass, field\nfrom typing import Callable\n\n@dataclass(order=True)\nclass Task:\n    priority: int\n    name: str = field(compare=False)\n    coro_fn: Callable = field(compare=False)\n\nasync def scheduler(tasks, max_concurrent=2):\n    queue = asyncio.PriorityQueue()\n    sem = asyncio.Semaphore(max_concurrent)\n    \n    for task in sorted(tasks):\n        await queue.put(task)\n    \n    async def run_task(task):\n        async with sem:\n            await task.coro_fn()\n    \n    workers = []\n    while not queue.empty():\n        task = await queue.get()\n        workers.append(asyncio.create_task(run_task(task)))\n    \n    await asyncio.gather(*workers)\n\nasync def main():\n    tasks = [\n        Task(3, "Low-1", lambda: asyncio.sleep(0.1)),\n        Task(1, "High-1", lambda: asyncio.sleep(0.1)),\n        Task(2, "Med-1", lambda: asyncio.sleep(0.1)),\n        Task(1, "High-2", lambda: asyncio.sleep(0.1)),\n    ]\n    # Make each task print its name\n    for t in tasks:\n        name = t.name\n        t.coro_fn = lambda n=name: asyncio.coroutine(lambda: print(f"Running {n}") or asyncio.sleep(0.05))()\n    await scheduler(tasks)\n\nasyncio.run(main())\n',
    solution: 'import asyncio\nfrom dataclasses import dataclass, field\n\n@dataclass(order=True)\nclass Task:\n    priority: int\n    name: str = field(compare=False)\n\nasync def worker(name, delay, sem):\n    async with sem:\n        print(f"▶ Starting [{name}]")\n        await asyncio.sleep(delay)\n        print(f"✓ Done    [{name}]")\n\nasync def scheduler(task_specs, max_concurrent=2):\n    sem = asyncio.Semaphore(max_concurrent)\n    queue = asyncio.PriorityQueue()\n    for priority, name, delay in sorted(task_specs):\n        await queue.put((priority, name, delay))\n    jobs = []\n    while not queue.empty():\n        priority, name, delay = await queue.get()\n        jobs.append(asyncio.create_task(worker(name, delay, sem)))\n    await asyncio.gather(*jobs)\n\nasync def main():\n    tasks = [\n        (3, "Low-1",  0.1),\n        (1, "High-1", 0.1),\n        (2, "Med-1",  0.1),\n        (1, "High-2", 0.1),\n        (2, "Med-2",  0.1),\n    ]\n    import time\n    start = time.time()\n    await scheduler(tasks)\n    print(f"\\nTotal: {time.time()-start:.2f}s with max 2 concurrent")\n\nasyncio.run(main())',
    explanation: '<code>PriorityQueue</code> sorts by priority. <code>Semaphore(2)</code> limits concurrency to 2. <code>async with sem</code> blocks until a slot is free. High-priority tasks run first.'
  },
  {
    title: 'Full Tokenizer + Parser', difficulty: 'expert', topic: 'Interpreters',
    description: 'Build a complete tokenizer and recursive-descent parser for a tiny language that supports variables, assignment, and print statements.',
    examples: [
      { input: 'x = 5\ny = x + 3\nprint y', output: '8' }
    ],
    hints: ['Tokenizer: regex-based, produce (type, value) pairs', 'Parser: statement list', 'Interpreter: environment dict for variables'],
    starter: 'import re\n\n# Token types\nTOKENS = [\n    ("NUMBER", r"\\d+"),\n    ("NAME",   r"[a-zA-Z_]\\w*"),\n    ("ASSIGN", r"="),\n    ("PLUS",   r"\\+"),\n    ("MINUS",  r"-"),\n    ("STAR",   r"\\*"),\n    ("SLASH",  r"/"),\n    ("SKIP",   r"[ \\t]+"),\n    ("NL",     r"\\n"),\n]\n\ndef tokenize(code):\n    tokens = []\n    for tok_type, pattern in TOKENS:\n        pass  # match and collect tokens\n    return tokens\n\n# You\'ll need: parse() and interpret() functions\ncode = "x = 5\\ny = x + 3\\nprint y"\n',
    solution: 'import re\n\nTOKENS = [\n    ("NUMBER", r"\\d+(\\.\\d*)?"),\n    ("NAME",   r"[a-zA-Z_]\\w*"),\n    ("ASSIGN", r"="),\n    ("PLUS",   r"\\+"),\n    ("MINUS",  r"-"),\n    ("STAR",   r"\\*"),\n    ("SLASH",  r"/"),\n    ("LPAREN", r"\\("),\n    ("RPAREN", r"\\)"),\n    ("SKIP",   r"[ \\t]+"),\n    ("NL",     r"\\n"),\n]\n\ndef tokenize(code):\n    master = "|".join(f"(?P<{t}>{p})" for t, p in TOKENS)\n    return [(m.lastgroup, m.group()) for m in re.finditer(master, code)\n            if m.lastgroup not in ("SKIP",)]\n\ndef interpret(code):\n    tokens = tokenize(code)\n    env = {}\n    i = 0\n    \n    def expr():\n        nonlocal i\n        left = term()\n        while i < len(tokens) and tokens[i][0] in ("PLUS","MINUS"):\n            op = tokens[i][1]; i += 1\n            right = term()\n            left = left + right if op == "+" else left - right\n        return left\n    \n    def term():\n        nonlocal i\n        left = factor()\n        while i < len(tokens) and tokens[i][0] in ("STAR","SLASH"):\n            op = tokens[i][1]; i += 1\n            right = factor()\n            left = left * right if op == "*" else left / right\n        return left\n    \n    def factor():\n        nonlocal i\n        t, v = tokens[i]\n        i += 1\n        if t == "NUMBER": return float(v)\n        if t == "NAME": return env.get(v, 0)\n        if t == "LPAREN":\n            val = expr()\n            i += 1  # RPAREN\n            return val\n        raise SyntaxError(f"Unexpected {t}: {v!r}")\n    \n    while i < len(tokens):\n        if tokens[i][0] == "NL": i += 1; continue\n        if tokens[i][0] == "NAME":\n            name = tokens[i][1]; i += 1\n            if i < len(tokens) and tokens[i][0] == "ASSIGN":\n                i += 1\n                env[name] = expr()\n            elif name == "print":\n                result = expr()\n                print(int(result) if result == int(result) else result)\n    \ncode = "x = 5\\ny = x + 3\\nprint y\\nz = x * y - 2\\nprint z"\ninterpret(code)',
    explanation: 'Tokenizer uses regex to split source into tokens. Recursive descent parser handles operator precedence. The environment dict stores variables. A simple but complete interpreter!'
  },
  {
    title: 'Persistent Data Structure', difficulty: 'expert', topic: 'Advanced Python',
    description: 'Implement an immutable persistent stack using Python classes. Operations must return new versions without modifying old ones. Demonstrate by printing two independent stacks.',
    examples: [
      { output: '3\n2\n1\n---\n10\n1' }
    ],
    hints: ['Use linked nodes: each push returns a new head pointing to the old head'],
    starter: 'class PersistentStack:\n    def __init__(self, head=None):\n        self.head = head\n    def push(self, val):\n        pass  # return a NEW stack\n    def pop(self):\n        pass  # return (value, new_stack)\n    def peek(self):\n        pass\n    def __bool__(self):\n        return self.head is not None\n',
    solution: 'class Node:\n    def __init__(self, val, nxt=None):\n        self.val = val\n        self.nxt = nxt\n\nclass PersistentStack:\n    def __init__(self, head=None):\n        self.head = head\n    def push(self, val):\n        return PersistentStack(Node(val, self.head))\n    def pop(self):\n        return self.head.val, PersistentStack(self.head.nxt)\n    def peek(self):\n        return self.head.val\n    def __bool__(self):\n        return self.head is not None\n\ns0 = PersistentStack()\ns1 = s0.push(1).push(2).push(3)\ns2 = s0.push(1).push(10)\n\ntmp = s1\nwhile tmp:\n    v, tmp = tmp.pop()\n    print(v)\nprint("---")\ntmp = s2\nwhile tmp:\n    v, tmp = tmp.pop()\n    print(v)',
    explanation: 'Each push creates a new Node pointing to the old head, returning a new Stack without mutating the previous version. Old versions remain accessible via their own head pointer.'
  },
  {
    title: 'Lazy Evaluation Pipeline', difficulty: 'expert', topic: 'Generators',
    description: 'Build a lazy pipeline of transformations (filter, map, take) using generators. Apply: filter evens → multiply by 3 → take first 5. Print results.',
    examples: [
      { output: '6\n12\n18\n24\n30' }
    ],
    hints: ['Each stage is a generator that wraps the previous. yield from or explicit for/yield loops'],
    starter: 'def naturals():\n    n = 1\n    while True:\n        yield n\n        n += 1\n\ndef filter_gen(pred, src):\n    pass\n\ndef map_gen(fn, src):\n    pass\n\ndef take(n, src):\n    pass\n',
    solution: 'def naturals():\n    n = 1\n    while True:\n        yield n; n += 1\n\ndef filter_gen(pred, src):\n    for x in src:\n        if pred(x): yield x\n\ndef map_gen(fn, src):\n    for x in src: yield fn(x)\n\ndef take(n, src):\n    for _, x in zip(range(n), src): yield x\n\npipeline = take(5, map_gen(lambda x: x * 3, filter_gen(lambda x: x % 2 == 0, naturals())))\nfor v in pipeline:\n    print(v)',
    explanation: 'Each generator wraps the previous, processing one element at a time. Nothing is evaluated until iteration begins — this is lazy evaluation.'
  },
  {
    title: 'Thread-Safe Counter', difficulty: 'expert', topic: 'Advanced Python',
    description: 'Implement a thread-safe counter using threading.Lock. Spawn 5 threads each incrementing 1000 times. Print the final count.',
    examples: [
      { output: '5000' }
    ],
    hints: ['Use a Lock as a context manager inside the increment method'],
    starter: 'import threading\n\nclass SafeCounter:\n    def __init__(self):\n        self.count = 0\n        # Add a lock here\n    def increment(self):\n        pass  # Lock the increment\n',
    solution: 'import threading\n\nclass SafeCounter:\n    def __init__(self):\n        self.count = 0\n        self._lock = threading.Lock()\n    def increment(self):\n        with self._lock:\n            self.count += 1\n\ncounter = SafeCounter()\n\ndef task():\n    for _ in range(1000):\n        counter.increment()\n\nthreads = [threading.Thread(target=task) for _ in range(5)]\nfor t in threads: t.start()\nfor t in threads: t.join()\nprint(counter.count)',
    explanation: 'Without a lock, concurrent increments (read-modify-write) race and lose updates. Using <code>with self._lock:</code> makes each increment atomic.'
  },
  {
    title: 'AST Transformer', difficulty: 'expert', topic: 'Metaprogramming',
    description: 'Use Python\'s <code>ast</code> module to find all function definitions in a code string and print their names and argument counts.',
    examples: [
      { output: 'add: 2 args\nmultiply: 2 args\ngreet: 1 args' }
    ],
    hints: ['ast.parse() gives a tree. Walk it with ast.walk() or a NodeVisitor'],
    starter: 'import ast\n\ncode = """\ndef add(a, b): return a + b\ndef multiply(x, y): return x * y\ndef greet(name): print(f"Hello {name}")\n"""\n',
    solution: 'import ast\n\ncode = """\ndef add(a, b): return a + b\ndef multiply(x, y): return x * y\ndef greet(name): print(f"Hello {name}")\n"""\n\ntree = ast.parse(code)\nfor node in ast.walk(tree):\n    if isinstance(node, ast.FunctionDef):\n        print(f"{node.name}: {len(node.args.args)} args")',
    explanation: '<code>ast.parse()</code> builds a tree of nodes. <code>ast.walk()</code> traverses every node. <code>FunctionDef</code> nodes have a <code>name</code> and <code>args.args</code> list.'
  },
  {
    title: 'Weak Reference Cache', difficulty: 'expert', topic: 'Advanced Python',
    description: 'Build a cache using <code>weakref.WeakValueDictionary</code> so cached objects are garbage collected when no strong reference exists. Demonstrate the eviction.',
    examples: [
      { output: 'hit\nmiss' }
    ],
    hints: ['WeakValueDictionary drops entries when the value object is garbage collected'],
    starter: 'import weakref, gc\n\nclass Resource:\n    def __init__(self, name):\n        self.name = name\n\ncache = weakref.WeakValueDictionary()\n',
    solution: 'import weakref, gc\n\nclass Resource:\n    def __init__(self, name):\n        self.name = name\n\ncache = weakref.WeakValueDictionary()\n\nr = Resource("file.txt")\ncache["file.txt"] = r\nprint("hit" if "file.txt" in cache else "miss")\n\ndel r\ngc.collect()\nprint("hit" if "file.txt" in cache else "miss")',
    explanation: 'WeakValueDictionary holds weak references; when the last strong reference is deleted and GC runs, the entry disappears automatically — no explicit cache invalidation needed.'
  },
  {
    title: 'Dataclass with Validation', difficulty: 'expert', topic: 'Advanced Python',
    description: 'Use <code>@dataclass</code> with <code>__post_init__</code> to create a validated <code>Rectangle</code> class that raises <code>ValueError</code> for non-positive dimensions. Print area and perimeter.',
    examples: [
      { output: 'Area: 12\nPerimeter: 14' }
    ],
    hints: ['__post_init__ runs after __init__. Raise ValueError there if dimensions <= 0'],
    starter: 'from dataclasses import dataclass\n\n@dataclass\nclass Rectangle:\n    width: float\n    height: float\n    def __post_init__(self):\n        pass  # Validate here\n    def area(self):\n        pass\n    def perimeter(self):\n        pass\n',
    solution: 'from dataclasses import dataclass\n\n@dataclass\nclass Rectangle:\n    width: float\n    height: float\n    def __post_init__(self):\n        if self.width <= 0 or self.height <= 0:\n            raise ValueError("Dimensions must be positive")\n    def area(self):\n        return self.width * self.height\n    def perimeter(self):\n        return 2 * (self.width + self.height)\n\nr = Rectangle(3, 4)\nprint(f"Area: {int(r.area())}")\nprint(f"Perimeter: {int(r.perimeter())}")',
    explanation: '<code>__post_init__</code> is called after the dataclass-generated <code>__init__</code>. It\'s the right place to add validation logic.'
  },
  {
    title: 'Composable Decorators', difficulty: 'expert', topic: 'Decorators',
    description: 'Write three decorators: <code>@retry(n)</code> (retry n times on exception), <code>@timeout_guard</code> (print a warning if slow), and <code>@log_calls</code>. Stack all three on a function.',
    examples: [
      { output: 'Calling flaky\nRetrying...\nCalling flaky\nResult: ok' }
    ],
    hints: ['Use functools.wraps. retry uses a loop; timeout_guard uses time.time()'],
    starter: 'import functools, time, random\nrandom.seed(42)\n\ndef retry(n):\n    def decorator(fn):\n        pass\n    return decorator\n\ndef log_calls(fn):\n    pass\n\n@retry(3)\n@log_calls\ndef flaky():\n    if random.random() < 0.5:\n        raise ValueError("fail")\n    return "ok"\n',
    solution: 'import functools, time, random\nrandom.seed(42)\n\ndef retry(n):\n    def decorator(fn):\n        @functools.wraps(fn)\n        def wrapper(*args, **kwargs):\n            for attempt in range(n):\n                try:\n                    return fn(*args, **kwargs)\n                except Exception:\n                    if attempt < n - 1:\n                        print("Retrying...")\n                    else:\n                        raise\n        return wrapper\n    return decorator\n\ndef log_calls(fn):\n    @functools.wraps(fn)\n    def wrapper(*args, **kwargs):\n        print(f"Calling {fn.__name__}")\n        return fn(*args, **kwargs)\n    return wrapper\n\n@retry(3)\n@log_calls\ndef flaky():\n    if random.random() < 0.5:\n        raise ValueError("fail")\n    return "ok"\n\nresult = flaky()\nprint(f"Result: {result}")',
    explanation: 'Decorators are applied bottom-up, so log_calls wraps flaky first, then retry wraps the logged version. functools.wraps preserves the original function\'s metadata.'
  },
  {
    title: 'Protocol-Based Duck Typing', difficulty: 'expert', topic: 'Advanced Python',
    description: 'Define a <code>Drawable</code> Protocol with a <code>draw()</code> method. Implement two classes (<code>Circle</code>, <code>Square</code>) and a <code>render()</code> function that accepts any Drawable without inheritance.',
    examples: [
      { output: 'Drawing circle with radius 5\nDrawing square with side 3' }
    ],
    hints: ['from typing import Protocol. The Protocol check is structural — no explicit inheritance needed'],
    starter: 'from typing import Protocol\n\nclass Drawable(Protocol):\n    def draw(self) -> None: ...\n\nclass Circle:\n    def __init__(self, radius): self.radius = radius\n    # Add draw()\n\nclass Square:\n    def __init__(self, side): self.side = side\n    # Add draw()\n\ndef render(shape: Drawable) -> None:\n    shape.draw()\n',
    solution: 'from typing import Protocol\n\nclass Drawable(Protocol):\n    def draw(self) -> None: ...\n\nclass Circle:\n    def __init__(self, radius): self.radius = radius\n    def draw(self): print(f"Drawing circle with radius {self.radius}")\n\nclass Square:\n    def __init__(self, side): self.side = side\n    def draw(self): print(f"Drawing square with side {self.side}")\n\ndef render(shape: Drawable) -> None:\n    shape.draw()\n\nrender(Circle(5))\nrender(Square(3))',
    explanation: 'Python Protocols enable structural subtyping: any class with a matching interface satisfies the protocol without explicit inheritance. This is Python\'s formal duck typing system.'
  },
  {
    title: 'Memory-Efficient Word Count', difficulty: 'expert', topic: 'Performance',
    description: 'Count word frequencies in a large simulated text using generators and Counter without loading everything into a list. Print the top 5 words.',
    examples: [
      { output: 'the: 50\nquick: 30\nbrown: 20\nfox: 20\njumps: 10' }
    ],
    hints: ['Generate words lazily with a generator; pass it directly to Counter'],
    starter: 'from collections import Counter\nimport random, string\nrandom.seed(0)\n\nVOCAB = ["the","quick","brown","fox","jumps","over","lazy","dog"]\nWEIGHTS = [50,30,20,20,10,8,5,5]\n\ndef word_stream(n=1000):\n    # Yield one word at a time\n    pass\n',
    solution: 'from collections import Counter\nimport random\nrandom.seed(0)\n\nVOCAB = ["the","quick","brown","fox","jumps","over","lazy","dog"]\nWEIGHTS = [50,30,20,20,10,8,5,5]\n\ndef word_stream(n=1000):\n    for _ in range(n):\n        yield random.choices(VOCAB, weights=WEIGHTS)[0]\n\ncounts = Counter(word_stream())\nfor word, freq in counts.most_common(5):\n    print(f"{word}: {freq}")',
    explanation: '<code>word_stream()</code> yields one word at a time — O(1) memory per step. Counter accepts any iterable including generators, updating counts without building an intermediate list.'
  },
  {
    title: 'Async Rate Limiter', difficulty: 'expert', topic: 'Async',
    description: 'Implement an async rate limiter that allows at most N calls per second. Demonstrate with 5 calls and print their completion times.',
    examples: [
      { output: 'call 0 at 0.00s\ncall 1 at 0.00s\ncall 2 at 1.00s\ncall 3 at 1.00s\ncall 4 at 2.00s' }
    ],
    hints: ['Track tokens and last refill time. Use asyncio.sleep to wait when limit exceeded.'],
    starter: 'import asyncio, time\n\nclass RateLimiter:\n    def __init__(self, rate):\n        self.rate = rate  # calls per second\n        # initialise state\n    async def acquire(self):\n        pass  # wait if needed\n',
    solution: 'import asyncio, time\n\nclass RateLimiter:\n    def __init__(self, rate):\n        self.rate = rate\n        self.tokens = rate\n        self.last = time.monotonic()\n    async def acquire(self):\n        while True:\n            now = time.monotonic()\n            elapsed = now - self.last\n            self.tokens += elapsed * self.rate\n            if self.tokens > self.rate:\n                self.tokens = self.rate\n            self.last = now\n            if self.tokens >= 1:\n                self.tokens -= 1\n                return\n            await asyncio.sleep(1 / self.rate)\n\nstart = time.monotonic()\nlimiter = RateLimiter(2)\n\nasync def call(i):\n    await limiter.acquire()\n    print(f"call {i} at {time.monotonic()-start:.2f}s")\n\nasync def main():\n    await asyncio.gather(*[call(i) for i in range(5)])\n\nasyncio.run(main())',
    explanation: 'Token bucket algorithm: tokens refill at a fixed rate. If tokens are available, consume one and proceed; otherwise sleep until a token is ready.'
  },
  {
    title: 'Custom Context Manager', difficulty: 'expert', topic: 'Advanced Python',
    description: 'Implement a <code>Timer</code> context manager class (using <code>__enter__</code>/<code>__exit__</code>) that prints elapsed time on exit, and a <code>@timer_cm</code> generator-based version using <code>@contextmanager</code>.',
    examples: [
      { output: 'Block took: 0.00s\nFunction took: 0.00s' }
    ],
    hints: ['Store start time in __enter__, compute elapsed in __exit__. Use contextlib.contextmanager for the generator version.'],
    starter: 'import time\nfrom contextlib import contextmanager\n\nclass Timer:\n    def __enter__(self): pass\n    def __exit__(self, *args): pass\n\n@contextmanager\ndef timer_cm(): pass\n',
    solution: 'import time\nfrom contextlib import contextmanager\n\nclass Timer:\n    def __enter__(self):\n        self.start = time.monotonic()\n        return self\n    def __exit__(self, *args):\n        elapsed = time.monotonic() - self.start\n        print(f"Block took: {elapsed:.2f}s")\n\n@contextmanager\ndef timer_cm():\n    start = time.monotonic()\n    yield\n    print(f"Function took: {time.monotonic()-start:.2f}s")\n\nwith Timer():\n    sum(range(1000000))\n\nwith timer_cm():\n    sum(range(1000000))',
    explanation: '<code>__enter__</code> starts the clock and returns self. <code>__exit__</code> always runs (even on exception) and prints elapsed time. The generator version uses yield as the with-block boundary.'
  },
  {
    title: 'Fibonacci with Matrix Exponentiation', difficulty: 'expert', topic: 'Math',
    description: 'Compute the nth Fibonacci number in O(log n) time using matrix exponentiation.',
    examples: [
      { input: '10', output: '55' },
      { input: '50', output: '12586269025' }
    ],
    hints: ['[[1,1],[1,0]]^n gives [[F(n+1),F(n)],[F(n),F(n-1)]]'],
    starter: 'def mat_mul(A, B):\n    pass\n\ndef mat_pow(M, n):\n    pass\n\ndef fib(n):\n    pass\n\nn = int(input("n: "))\nprint(fib(n))\n',
    solution: 'def mat_mul(A, B):\n    return [\n        [A[0][0]*B[0][0]+A[0][1]*B[1][0], A[0][0]*B[0][1]+A[0][1]*B[1][1]],\n        [A[1][0]*B[0][0]+A[1][1]*B[1][0], A[1][0]*B[0][1]+A[1][1]*B[1][1]],\n    ]\n\ndef mat_pow(M, n):\n    result = [[1,0],[0,1]]  # identity\n    while n:\n        if n % 2:\n            result = mat_mul(result, M)\n        M = mat_mul(M, M)\n        n //= 2\n    return result\n\ndef fib(n):\n    if n == 0: return 0\n    return mat_pow([[1,1],[1,0]], n)[0][1]\n\nn = int(input("n: "))\nprint(fib(n))',
    explanation: 'The matrix [[1,1],[1,0]]^n encodes Fibonacci numbers. Fast exponentiation (repeated squaring) reduces the exponent logarithmically, giving O(log n) multiplications.'
  },
  {
    title: 'Reactive Event Bus', difficulty: 'expert', topic: 'Design Patterns',
    description: 'Implement a publish-subscribe event bus with typed channels. Demonstrate multiple subscribers on the same channel.',
    examples: [
      { output: 'Logger: user.login -> alice\nAudit: user.login -> alice\nLogger: user.logout -> bob' }
    ],
    hints: ['Use a dict mapping channel names to lists of callbacks. subscribe() appends; publish() calls all.'],
    starter: 'class EventBus:\n    def __init__(self): pass\n    def subscribe(self, channel, fn): pass\n    def publish(self, channel, data): pass\n',
    solution: 'from collections import defaultdict\n\nclass EventBus:\n    def __init__(self):\n        self._subs = defaultdict(list)\n    def subscribe(self, channel, fn):\n        self._subs[channel].append(fn)\n    def publish(self, channel, data):\n        for fn in self._subs[channel]:\n            fn(data)\n\nbus = EventBus()\nbus.subscribe("user.login",  lambda d: print(f"Logger: user.login -> {d}"))\nbus.subscribe("user.login",  lambda d: print(f"Audit: user.login -> {d}"))\nbus.subscribe("user.logout", lambda d: print(f"Logger: user.logout -> {d}"))\n\nbus.publish("user.login", "alice")\nbus.publish("user.logout", "bob")',
    explanation: 'The event bus decouples publishers from subscribers. Each channel holds a list of callbacks. Publishing fires all registered callbacks for that channel.'
  },
  {
    title: 'Compile-Time Type Narrowing', difficulty: 'expert', topic: 'Advanced Python',
    description: 'Use <code>TypeGuard</code> and <code>isinstance</code> narrowing with <code>Union</code> types to write a function that safely processes mixed lists. Print each element with its type.',
    examples: [
      { output: 'int: 1\nstr: hello\nint: 3\nstr: world' }
    ],
    hints: ['from typing import Union, TypeGuard. Write is_int(x) -> TypeGuard[int]'],
    starter: 'from typing import Union, TypeGuard\n\ndef is_int(x: object) -> TypeGuard[int]:\n    pass\n\ndef process(items: list[Union[int, str]]) -> None:\n    pass\n',
    solution: 'from typing import Union, TypeGuard\n\ndef is_int(x: object) -> TypeGuard[int]:\n    return isinstance(x, int)\n\ndef process(items: list) -> None:\n    for item in items:\n        if is_int(item):\n            print(f"int: {item}")\n        else:\n            print(f"str: {item}")\n\nprocess([1, "hello", 3, "world"])',
    explanation: 'TypeGuard is a special return type for type-narrowing functions. When is_int(x) returns True, the type checker knows x is int inside that branch.'
  },
  {
    title: 'Generator-Based State Machine', difficulty: 'expert', topic: 'Coroutines',
    description: 'Implement a traffic light state machine using a generator that cycles GREEN→YELLOW→RED and yields the current state. Print the first 6 states.',
    examples: [
      { output: 'GREEN\nYELLOW\nRED\nGREEN\nYELLOW\nRED' }
    ],
    hints: ['Use an infinite while loop with yield inside the generator. Send values with .send() or just iterate.'],
    starter: 'def traffic_light():\n    states = ["GREEN", "YELLOW", "RED"]\n    # Implement as a generator\n    pass\n',
    solution: 'def traffic_light():\n    states = ["GREEN", "YELLOW", "RED"]\n    i = 0\n    while True:\n        yield states[i % 3]\n        i += 1\n\nlight = traffic_light()\nfor _ in range(6):\n    print(next(light))',
    explanation: 'The generator maintains its position (local variable i) between yields. Each call to next() resumes from after the yield, advancing the state.'
  },
  {
    title: 'Sparse Matrix Multiplication', difficulty: 'expert', topic: 'Performance',
    description: 'Multiply two sparse matrices stored as dicts of {(row,col): value}. Print the result as a sorted list of ((r,c), val) pairs.',
    examples: [
      { output: '((0, 0), 7)\n((0, 1), 3)\n((1, 0), 14)\n((1, 1), 6)' }
    ],
    hints: ['For each non-zero A[i,k] and B[k,j], add A[i,k]*B[k,j] to C[i,j]'],
    starter: 'A = {(0,0):1, (0,1):2, (1,0):3, (1,1):0}\nB = {(0,0):5, (0,1):1, (1,0):1, (1,1):1}\n# Sparse multiply: only process non-zero entries\n',
    solution: 'A = {(0,0):1, (0,1):2, (1,0):3, (1,1):0}\nB = {(0,0):5, (0,1):1, (1,0):1, (1,1):1}\nC = {}\nfor (i, k), av in A.items():\n    if av == 0: continue\n    for (ki, j), bv in B.items():\n        if ki != k or bv == 0: continue\n        C[(i,j)] = C.get((i,j), 0) + av * bv\nfor key in sorted(C):\n    print((key, C[key]))',
    explanation: 'Sparse multiplication skips zero entries entirely. For each non-zero A[i,k], scan B for matching row k. Only non-zero products are stored in C.'
  },
  {
    title: 'Decorator Factory with State', difficulty: 'expert', topic: 'Decorators',
    description: 'Write a <code>@memoize_typed</code> decorator that caches results keyed by both arguments AND argument types, rejecting type mismatches. Print cache hits vs misses.',
    examples: [
      { output: 'miss: 6\nhit: 6\nmiss: 6.0\nmiss: 9' }
    ],
    hints: ['Key the cache on (args, tuple(type(a) for a in args)). Check types match on retrieval.'],
    starter: 'def memoize_typed(fn):\n    cache = {}\n    def wrapper(*args):\n        pass\n    return wrapper\n\n@memoize_typed\ndef add(a, b):\n    return a + b\n',
    solution: 'def memoize_typed(fn):\n    cache = {}\n    def wrapper(*args):\n        key = (args, tuple(type(a) for a in args))\n        if key in cache:\n            print(f"hit: {cache[key]}")\n        else:\n            result = fn(*args)\n            cache[key] = result\n            print(f"miss: {result}")\n        return cache[key]\n    return wrapper\n\n@memoize_typed\ndef add(a, b):\n    return a + b\n\nadd(2, 4)\nadd(2, 4)\nadd(2.0, 4.0)\nadd(3, 6)',
    explanation: 'The cache key includes both the argument values AND their types. add(2,4) and add(2.0,4.0) are different cache entries even though 2==2.0, because int != float.'
  },
  {
    title: 'Backpressure Queue', difficulty: 'expert', topic: 'Async',
    description: 'Implement an async producer-consumer pipeline with backpressure using <code>asyncio.Queue</code> with a bounded capacity. Print each consumed item.',
    examples: [
      { output: 'consumed 0\nconsumed 1\nconsumed 2\nconsumed 3\nconsumed 4' }
    ],
    hints: ['asyncio.Queue(maxsize=2) blocks the producer when full. Use await queue.put() and await queue.get()'],
    starter: 'import asyncio\n\nasync def producer(queue):\n    pass\n\nasync def consumer(queue):\n    pass\n',
    solution: 'import asyncio\n\nasync def producer(q):\n    for i in range(5):\n        await q.put(i)\n\nasync def consumer(q):\n    for _ in range(5):\n        item = await q.get()\n        print(f"consumed {item}")\n        q.task_done()\n\nasync def main():\n    q = asyncio.Queue(maxsize=2)\n    await asyncio.gather(producer(q), consumer(q))\n\nasyncio.run(main())',
    explanation: 'A bounded queue creates automatic backpressure: the producer blocks on <code>await q.put()</code> when the queue is full, preventing it from overwhelming the consumer.'
  },
  {
    title: 'Slots and Memory Optimisation', difficulty: 'expert', topic: 'Performance',
    description: 'Compare memory usage of a regular class vs a <code>__slots__</code> class with the same attributes. Print the size in bytes of 10000 instances of each.',
    examples: [
      { output: 'Regular: larger\nSlots: smaller' }
    ],
    hints: ['Use sys.getsizeof on instances. __slots__ removes the instance __dict__'],
    starter: 'import sys\n\nclass Regular:\n    def __init__(self, x, y, z):\n        self.x = x; self.y = y; self.z = z\n\nclass Slotted:\n    __slots__ = ["x", "y", "z"]\n    def __init__(self, x, y, z):\n        self.x = x; self.y = y; self.z = z\n',
    solution: 'import sys\n\nclass Regular:\n    def __init__(self, x, y, z):\n        self.x = x; self.y = y; self.z = z\n\nclass Slotted:\n    __slots__ = ["x", "y", "z"]\n    def __init__(self, x, y, z):\n        self.x = x; self.y = y; self.z = z\n\nreg_size  = sum(sys.getsizeof(Regular(i, i, i))  for i in range(10000))\nslot_size = sum(sys.getsizeof(Slotted(i, i, i)) for i in range(10000))\nprint(f"Regular: {reg_size}")\nprint(f"Slots: {slot_size}")\nprint("Regular: larger" if reg_size > slot_size else "Regular: smaller")\nprint("Slots: smaller"  if slot_size < reg_size else "Slots: larger")',
    explanation: 'Regular instances store attributes in a <code>__dict__</code>, which adds overhead per instance. <code>__slots__</code> replaces this with fixed-offset descriptors, saving 30-50% memory at scale.'
  },
  {
    title: 'Zero-Copy Pipeline with memoryview', difficulty: 'expert', topic: 'Performance',
    description: 'Process a large bytearray in chunks using <code>memoryview</code> to avoid copying. Sum all bytes and print the total.',
    examples: [
      { output: 'Total: 127500' }
    ],
    hints: ['memoryview[start:end] returns a view, not a copy. Iterate and sum each chunk.'],
    starter: 'data = bytearray(range(256)) * 500  # 128000 bytes\nCHUNK = 1024\ntotal = 0\nmv = memoryview(data)\n# Process in chunks without copying\n',
    solution: 'data = bytearray(range(256)) * 500\nCHUNK = 1024\ntotal = 0\nmv = memoryview(data)\nfor i in range(0, len(mv), CHUNK):\n    total += sum(mv[i:i+CHUNK].tolist())\nprint(f"Total: {total}")',
    explanation: '<code>memoryview</code> slices return a view into the same memory buffer — no data is copied. This is critical for performance when processing large binary buffers.'
  },
  {
    title: 'Full MRO and Diamond Inheritance', difficulty: 'expert', topic: 'OOP',
    description: 'Build a diamond inheritance hierarchy (A, B(A), C(A), D(B,C)) and demonstrate that Python\'s MRO (C3 linearisation) calls each class\'s method exactly once.',
    examples: [
      { output: 'D\nB\nC\nA' }
    ],
    hints: ['Python uses C3 linearisation. Each class calls super().__init__() to pass the chain forward'],
    starter: 'class A:\n    def greet(self): pass\n\nclass B(A):\n    def greet(self): pass\n\nclass C(A):\n    def greet(self): pass\n\nclass D(B, C):\n    def greet(self): pass\n',
    solution: 'class A:\n    def greet(self):\n        print("A")\n        super().greet() if hasattr(super(), "greet") else None\n\nclass B(A):\n    def greet(self):\n        print("B")\n        super().greet()\n\nclass C(A):\n    def greet(self):\n        print("C")\n        super().greet()\n\nclass D(B, C):\n    def greet(self):\n        print("D")\n        super().greet()\n\nD().greet()\nprint()\nprint([c.__name__ for c in D.__mro__])',
    explanation: 'C3 linearisation computes MRO as [D, B, C, A, object]. Each <code>super().greet()</code> follows the MRO — so A\'s greet is called once even though both B and C inherit from A.'
  },
  {
    title: 'Immutable Value Object', difficulty: 'expert', topic: 'Advanced Python',
    description: 'Create an immutable <code>Money</code> class using <code>__slots__</code> and <code>__setattr__</code> override. Support addition, equality, and string representation.',
    examples: [
      { output: 'USD 15.00\nTrue\nFalse' }
    ],
    hints: ['Override __setattr__ to raise AttributeError after init. Use object.__setattr__ in __init__ to bypass your own override.'],
    starter: 'class Money:\n    __slots__ = ("amount", "currency")\n    def __init__(self, amount, currency):\n        pass\n    def __setattr__(self, name, value):\n        pass  # Make immutable after init\n    def __add__(self, other): pass\n    def __eq__(self, other): pass\n    def __str__(self): pass\n',
    solution: 'class Money:\n    __slots__ = ("amount", "currency")\n    def __init__(self, amount, currency):\n        object.__setattr__(self, "amount", round(amount, 2))\n        object.__setattr__(self, "currency", currency)\n    def __setattr__(self, name, value):\n        raise AttributeError("Money is immutable")\n    def __add__(self, other):\n        if self.currency != other.currency:\n            raise ValueError("Currency mismatch")\n        return Money(self.amount + other.amount, self.currency)\n    def __eq__(self, other):\n        return isinstance(other, Money) and self.amount == other.amount and self.currency == other.currency\n    def __str__(self):\n        return f"{self.currency} {self.amount:.2f}"\n\na = Money(10, "USD")\nb = Money(5, "USD")\nprint(a + b)\nprint(a == Money(10, "USD"))\nprint(a == b)',
    explanation: '<code>object.__setattr__</code> bypasses the custom <code>__setattr__</code> during init. After that, any attribute set attempt raises AttributeError, making instances truly immutable.'
  },
  {
    title: 'Graph Coloring', difficulty: 'expert', topic: 'Backtracking',
    description: 'Colour a graph with at most k colours so no two adjacent nodes share a colour. Print the assignment or \'impossible\'.',
    examples: [
      { output: '{0: 1, 1: 2, 2: 3, 3: 2}', explanation: '4-node cycle graph, k=3' }
    ],
    hints: ['Backtracking: try each colour for the current node; recurse; undo on failure'],
    starter: 'graph = {0:[1,3], 1:[0,2], 2:[1,3], 3:[0,2]}  # 4-cycle\nk = 3\ncolors = {}\n',
    solution: 'graph = {0:[1,3], 1:[0,2], 2:[1,3], 3:[0,2]}\nk = 3\ncolors = {}\n\ndef can_color(node, color):\n    return all(colors.get(nb) != color for nb in graph[node])\n\ndef solve(node):\n    if node == len(graph):\n        return True\n    for color in range(1, k + 1):\n        if can_color(node, color):\n            colors[node] = color\n            if solve(node + 1):\n                return True\n            del colors[node]\n    return False\n\nprint(colors if solve(0) else "impossible")',
    explanation: 'Backtracking assigns colours one node at a time. If no colour is valid for a node (all k colours conflict with neighbours), backtrack and try a different colour for the previous node.'
  },
  {
    title: 'Huffman Coding', difficulty: 'expert', topic: 'Algorithms',
    description: 'Build a Huffman encoding tree for a given string and print each character\'s binary code.',
    examples: [
      { output: 'a: 0\nb: 10\nc: 110\nd: 111', explanation: 'text=\'aaabbc\'' }
    ],
    hints: ['Use a min-heap. Build the tree by repeatedly merging the two lowest-frequency nodes'],
    starter: 'import heapq\nfrom collections import Counter\n\ntext = "aaabbc"\n',
    solution: 'import heapq\nfrom collections import Counter\n\ntext = "aaabbc"\nfreq = Counter(text)\nheap = [[f, [ch, ""]] for ch, f in freq.items()]\nheapq.heapify(heap)\nwhile len(heap) > 1:\n    lo = heapq.heappop(heap)\n    hi = heapq.heappop(heap)\n    for pair in lo[1:]: pair[1] = "0" + pair[1]\n    for pair in hi[1:]: pair[1] = "1" + pair[1]\n    heapq.heappush(heap, [lo[0]+hi[0]] + lo[1:] + hi[1:])\ncodes = sorted(heap[0][1:], key=lambda x: len(x[1]))\nfor ch, code in codes:\n    print(f"{ch}: {code}")',
    explanation: 'Build a min-heap of (freq, char) pairs. Repeatedly merge the two smallest nodes, prepending 0/1 to distinguish left/right branches. The final tree encodes chars by path length.'
  },
  {
    title: 'Zero-Downtime Config Reload', difficulty: 'expert', topic: 'Design Patterns',
    description: 'Implement a thread-safe config manager that supports live reloading via a <code>reload()</code> method while readers always see a consistent snapshot.',
    examples: [
      { output: 'v1\nv2\nv2' }
    ],
    hints: ['Use a RWLock pattern or a single Lock with copy-on-write. Store config as an immutable dict.'],
    starter: 'import threading\n\nclass ConfigManager:\n    def __init__(self, initial):\n        pass\n    def get(self, key):\n        pass\n    def reload(self, new_config):\n        pass\n',
    solution: 'import threading\n\nclass ConfigManager:\n    def __init__(self, initial):\n        self._config = dict(initial)\n        self._lock = threading.Lock()\n    def get(self, key):\n        with self._lock:\n            return self._config.get(key)\n    def reload(self, new_config):\n        new = dict(new_config)  # prepare outside lock\n        with self._lock:\n            self._config = new   # atomic swap\n\ncfg = ConfigManager({"version": "v1"})\nprint(cfg.get("version"))\ncfg.reload({"version": "v2", "debug": True})\nprint(cfg.get("version"))\nprint(cfg.get("version"))',
    explanation: 'The reload prepares the new config dict outside the lock (slow part), then swaps the reference atomically inside the lock (fast part). Readers always see either the old or new complete config, never a partial state.'
  },
  {
    title: 'Concurrent Web Scraper', difficulty: 'expert', topic: 'Async',
    description: 'Simulate fetching 5 URLs concurrently using asyncio. Each \'fetch\' sleeps for a random time. Print results in completion order.',
    examples: [
      { output: 'fetched url3 in 0.1s\nfetched url1 in 0.2s\n...' }
    ],
    hints: ['Use asyncio.gather or as_completed. Each coroutine returns (url, time_taken).'],
    starter: 'import asyncio, random, time\nrandom.seed(7)\nurls = [f"url{i}" for i in range(1, 6)]\n',
    solution: 'import asyncio, random, time\nrandom.seed(7)\nurls = [f"url{i}" for i in range(1, 6)]\n\nasync def fetch(url):\n    delay = random.uniform(0.05, 0.3)\n    await asyncio.sleep(delay)\n    return url, round(delay, 2)\n\nasync def main():\n    tasks = [asyncio.create_task(fetch(u)) for u in urls]\n    for coro in asyncio.as_completed(tasks):\n        url, t = await coro\n        print(f"fetched {url} in {t}s")\n\nasyncio.run(main())',
    explanation: '<code>asyncio.as_completed()</code> yields futures in the order they finish, not in the order they were created. This gives true completion-order output.'
  },
  {
    title: 'Implement functools.reduce', difficulty: 'expert', topic: 'Advanced Python',
    description: 'Implement your own <code>my_reduce(fn, iterable, initial)</code> without using functools. Use it to compute factorial and string join.',
    examples: [
      { output: '120\nhello world' }
    ],
    hints: ['Accumulate: result = fn(result, next_element) for each element'],
    starter: 'def my_reduce(fn, iterable, initial=None):\n    pass\n\nprint(my_reduce(lambda a, b: a * b, range(1, 6), 1))\nprint(my_reduce(lambda a, b: a + " " + b, ["hello", "world"]))\n',
    solution: 'def my_reduce(fn, iterable, initial=None):\n    it = iter(iterable)\n    acc = initial if initial is not None else next(it)\n    for x in it:\n        acc = fn(acc, x)\n    return acc\n\nprint(my_reduce(lambda a, b: a * b, range(1, 6), 1))\nprint(my_reduce(lambda a, b: a + " " + b, ["hello", "world"]))',
    explanation: 'If no initial value is given, consume the first element as the starting accumulator. Then fold the function over the rest of the iterable.'
  },
  {
    title: 'Monkeypatch at Runtime', difficulty: 'expert', topic: 'Metaprogramming',
    description: 'Dynamically replace a method on an existing class instance at runtime. Demonstrate the original and patched behaviours.',
    examples: [
      { output: 'Hello from original\nHello from patch' }
    ],
    hints: ['Use types.MethodType to bind a function to an instance'],
    starter: 'import types\n\nclass Greeter:\n    def greet(self):\n        return "Hello from original"\n\ng = Greeter()\n',
    solution: 'import types\n\nclass Greeter:\n    def greet(self):\n        return "Hello from original"\n\ng = Greeter()\nprint(g.greet())\n\ndef patched_greet(self):\n    return "Hello from patch"\n\ng.greet = types.MethodType(patched_greet, g)\nprint(g.greet())',
    explanation: '<code>types.MethodType(fn, instance)</code> binds a standalone function as a bound method on a specific instance, without affecting other instances of the class.'
  },
  {
    title: 'Custom Iterator with State', difficulty: 'expert', topic: 'Advanced Python',
    description: 'Build a <code>Fibonacci</code> iterator class that implements <code>__iter__</code> and <code>__next__</code>, and supports slicing via a <code>take(n)</code> method.',
    examples: [
      { output: '0 1 1 2 3 5 8 13 21 34\n[0, 1, 1, 2, 3]' }
    ],
    hints: ['Store state in __init__. __next__ advances and returns. take() creates a list by calling next n times.'],
    starter: 'class Fibonacci:\n    def __init__(self):\n        pass\n    def __iter__(self):\n        return self\n    def __next__(self):\n        pass\n    def take(self, n):\n        pass\n',
    solution: 'class Fibonacci:\n    def __init__(self):\n        self.a, self.b = 0, 1\n    def __iter__(self):\n        return self\n    def __next__(self):\n        val = self.a\n        self.a, self.b = self.b, self.a + self.b\n        return val\n    def take(self, n):\n        return [next(self) for _ in range(n)]\n\nfib = Fibonacci()\nprint(*[next(fib) for _ in range(10)])\n\nfib2 = Fibonacci()\nprint(fib2.take(5))',
    explanation: 'The iterator maintains (a, b) state. Each __next__ returns a and advances by swapping. take(n) is a convenience wrapper that calls __next__ n times.'
  },
  {
    title: 'Implement Map Filter Reduce', difficulty: 'expert', topic: 'Advanced Python',
    description: 'Implement <code>my_map</code>, <code>my_filter</code>, and <code>my_reduce</code> as lazy generators. Chain them to square-then-filter-evens-then-sum a range.',
    examples: [
      { output: '220', explanation: 'sum of squares of evens from 1-10: 4+16+36+64+100=220' }
    ],
    hints: ['my_map and my_filter are generator functions using yield'],
    starter: 'def my_map(fn, iterable): pass\ndef my_filter(pred, iterable): pass\ndef my_reduce(fn, iterable, initial=0): pass\n',
    solution: 'def my_map(fn, iterable):\n    for x in iterable: yield fn(x)\n\ndef my_filter(pred, iterable):\n    for x in iterable:\n        if pred(x): yield x\n\ndef my_reduce(fn, iterable, initial=0):\n    acc = initial\n    for x in iterable: acc = fn(acc, x)\n    return acc\n\nresult = my_reduce(\n    lambda a, b: a + b,\n    my_filter(\n        lambda x: x % 2 == 0,\n        my_map(lambda x: x**2, range(1, 11))\n    )\n)\nprint(result)',
    explanation: 'Generator-based map and filter are lazy: they only compute values as consumed. Chaining them creates a pipeline with no intermediate lists, reducing memory.'
  },
  {
    title: 'Bloom Filter', difficulty: 'expert', topic: 'Data Structures',
    description: 'Implement a space-efficient Bloom Filter with k hash functions. Demonstrate add and membership queries with expected false positives.',
    examples: [
      { output: 'True\nFalse\nMaybe' }
    ],
    hints: ['Use k different hash seeds and a bitarray (or list of bools). Add sets k bits; query checks all k bits.'],
    starter: 'import hashlib\n\nclass BloomFilter:\n    def __init__(self, size, k):\n        pass\n    def add(self, item):\n        pass\n    def might_contain(self, item):\n        pass\n',
    solution: 'import hashlib\n\nclass BloomFilter:\n    def __init__(self, size, k):\n        self.size = size\n        self.k = k\n        self.bits = [False] * size\n    def _hashes(self, item):\n        for seed in range(self.k):\n            h = int(hashlib.md5(f"{seed}:{item}".encode()).hexdigest(), 16)\n            yield h % self.size\n    def add(self, item):\n        for i in self._hashes(item): self.bits[i] = True\n    def might_contain(self, item):\n        return all(self.bits[i] for i in self._hashes(item))\n\nbf = BloomFilter(1000, 3)\nbf.add("apple")\nbf.add("banana")\nprint(bf.might_contain("apple"))    # True\nprint(bf.might_contain("grape") and not bf.might_contain("grape"))  # False\nprint("Maybe" if bf.might_contain("apple") else "No")',
    explanation: 'A Bloom Filter uses k hash functions to set k bits on insert. A query returns True only if all k bits are set — a definite "no" or a probabilistic "maybe yes".'
  },
  {
    title: 'Symbol Table with Scopes', difficulty: 'expert', topic: 'Interpreters',
    description: 'Build a symbol table that supports nested scopes: variables can be defined and looked up, with inner scopes shadowing outer ones.',
    examples: [
      { output: '10\n20\n10' }
    ],
    hints: ['Use a list of dicts (scope stack). Lookup walks from innermost outward.'],
    starter: 'class SymbolTable:\n    def __init__(self): pass\n    def enter_scope(self): pass\n    def exit_scope(self): pass\n    def define(self, name, value): pass\n    def lookup(self, name): pass\n',
    solution: 'class SymbolTable:\n    def __init__(self):\n        self.scopes = [{}]\n    def enter_scope(self):\n        self.scopes.append({})\n    def exit_scope(self):\n        self.scopes.pop()\n    def define(self, name, value):\n        self.scopes[-1][name] = value\n    def lookup(self, name):\n        for scope in reversed(self.scopes):\n            if name in scope: return scope[name]\n        raise NameError(f"{name} not defined")\n\nst = SymbolTable()\nst.define("x", 10)\nprint(st.lookup("x"))\nst.enter_scope()\nst.define("x", 20)\nprint(st.lookup("x"))\nst.exit_scope()\nprint(st.lookup("x"))',
    explanation: 'The scope stack is a list of dicts. Lookup searches from the top (innermost) to the bottom (global). Inner scopes shadow outer ones without modifying them.'
  },
  {
    title: 'Copy-on-Write List', difficulty: 'expert', topic: 'Advanced Python',
    description: 'Implement a CoW (copy-on-write) list that shares data until a mutation occurs, then copies. Print memory identity before and after write.',
    examples: [
      { output: 'same\ndifferent' }
    ],
    hints: ['Track a shared flag. On write, copy the internal data and clear the flag.'],
    starter: 'class CowList:\n    def __init__(self, data):\n        pass\n    def copy(self):\n        pass\n    def append(self, val):\n        pass  # Trigger copy if shared\n    def __repr__(self):\n        return repr(self._data)\n',
    solution: 'class CowList:\n    def __init__(self, data, shared_with=None):\n        self._data = data\n        self._owner = shared_with is None\n        self._shared = shared_with\n    def copy(self):\n        cl = CowList(self._data, shared_with=self)\n        return cl\n    def _cow(self):\n        if self._shared is not None:\n            self._data = list(self._data)\n            self._shared = None\n    def append(self, val):\n        self._cow()\n        self._data.append(val)\n    def data_id(self):\n        return id(self._data)\n\norig = CowList([1, 2, 3])\ncopy = orig.copy()\nprint("same" if orig.data_id() == copy.data_id() else "different")\ncopy.append(4)\nprint("same" if orig.data_id() == copy.data_id() else "different")',
    explanation: 'The copy shares the original\'s data reference. On first write, the list detaches by making its own copy of the data. Reads always share; writes trigger exactly one copy.'
  },
  {
    title: 'Interval Tree', difficulty: 'expert', topic: 'Data Structures',
    description: 'Build an interval tree that efficiently finds all intervals overlapping a query point. Demonstrate with example intervals.',
    examples: [
      { output: '[(1, 5), (3, 8)]', explanation: 'query point 4 overlaps [1,5] and [3,8]' }
    ],
    hints: ['Augmented BST or centre-based approach: split at median, recurse on left/right, store sorted lists'],
    starter: 'class IntervalTree:\n    def __init__(self, intervals):\n        pass\n    def query(self, point):\n        pass\n\nintervals = [(1,5),(3,8),(10,15),(2,6),(12,18)]\ntree = IntervalTree(intervals)\nprint(sorted(tree.query(4)))\n',
    solution: 'class IntervalTree:\n    def __init__(self, intervals):\n        if not intervals:\n            self.centre = self.left = self.right = None\n            self.by_start = self.by_end = []\n            return\n        self.centre = (min(s for s,e in intervals) + max(e for s,e in intervals)) / 2\n        left_ivs, right_ivs, here = [], [], []\n        for iv in intervals:\n            if iv[1] < self.centre: left_ivs.append(iv)\n            elif iv[0] > self.centre: right_ivs.append(iv)\n            else: here.append(iv)\n        self.by_start = sorted(here)\n        self.by_end   = sorted(here, key=lambda x: -x[1])\n        self.left  = IntervalTree(left_ivs)\n        self.right = IntervalTree(right_ivs)\n    def query(self, point):\n        if self.centre is None: return []\n        result = []\n        if point < self.centre:\n            for s, e in self.by_start:\n                if s > point: break\n                result.append((s, e))\n            result += self.left.query(point)\n        else:\n            for s, e in self.by_end:\n                if e < point: break\n                result.append((s, e))\n            result += self.right.query(point)\n        return result\n\nintervals = [(1,5),(3,8),(10,15),(2,6),(12,18)]\ntree = IntervalTree(intervals)\nprint(sorted(tree.query(4)))',
    explanation: 'Centred interval tree: intervals crossing the centre are stored sorted by start and end. A query at point p checks one sorted list (starting from the appropriate end), then recurses left or right.'
  },
  {
    title: 'Reactive Computed Properties', difficulty: 'expert', topic: 'Design Patterns',
    description: 'Implement a reactive system where computed properties auto-update when their dependencies change (like a spreadsheet cell).',
    examples: [
      { output: '30\n50' }
    ],
    hints: ['Track dependencies during compute. On set, notify dependents to recompute.'],
    starter: 'class Cell:\n    def __init__(self, value=None):\n        self._value = value\n        self._dependents = []\n    def get(self): return self._value\n    def set(self, value): pass  # notify dependents\n\nclass Computed:\n    def __init__(self, fn, *deps):\n        pass  # register with deps, compute initial value\n    def get(self): return self._value\n',
    solution: 'class Cell:\n    def __init__(self, value=None):\n        self._value = value\n        self._dependents = []\n    def get(self):\n        return self._value\n    def set(self, value):\n        self._value = value\n        for dep in self._dependents:\n            dep._recompute()\n    def _add_dependent(self, dep):\n        self._dependents.append(dep)\n\nclass Computed:\n    def __init__(self, fn, *deps):\n        self._fn = fn\n        self._deps = deps\n        self._value = None\n        self._dependents = []\n        for d in deps: d._add_dependent(self)\n        self._recompute()\n    def _recompute(self):\n        self._value = self._fn(*[d.get() for d in self._deps])\n        for dep in self._dependents: dep._recompute()\n    def get(self):\n        return self._value\n    def _add_dependent(self, dep):\n        self._dependents.append(dep)\n\na = Cell(10)\nb = Cell(20)\nc = Computed(lambda x, y: x + y, a, b)\nprint(c.get())\na.set(30)\nprint(c.get())',
    explanation: 'Cells notify their dependents on update. Computed cells subscribe to their dependency cells and recompute when notified. Changes cascade automatically through the dependency graph.'
  },
  {
    title: 'Lock-Free Stack with CAS', difficulty: 'expert', topic: 'Advanced Python',
    description: 'Simulate a lock-free stack using compare-and-swap (CAS) semantics. Demonstrate with two concurrent pushes.',
    examples: [
      { output: '3\n2\n1' }
    ],
    hints: ['Use threading.Lock only for the CAS operation itself (a single comparison+swap). The key insight is the CAS abstraction.'],
    starter: 'import threading\n\nclass LockFreeStack:\n    def __init__(self): pass\n    def push(self, val): pass\n    def pop(self): pass\n',
    solution: 'import threading\n\nclass Node:\n    def __init__(self, val, nxt=None):\n        self.val = val\n        self.next = nxt\n\nclass LockFreeStack:\n    def __init__(self):\n        self._head = None\n        self._lock = threading.Lock()\n    def _cas(self, expected, new_val):\n        with self._lock:\n            if self._head is expected:\n                self._head = new_val\n                return True\n            return False\n    def push(self, val):\n        while True:\n            old_head = self._head\n            new_head = Node(val, old_head)\n            if self._cas(old_head, new_head): break\n    def pop(self):\n        while True:\n            old_head = self._head\n            if old_head is None: return None\n            if self._cas(old_head, old_head.next):\n                return old_head.val\n\nstack = LockFreeStack()\nfor v in [1, 2, 3]: stack.push(v)\nwhile True:\n    v = stack.pop()\n    if v is None: break\n    print(v)',
    explanation: 'CAS atomically checks the current head against an expected value and only swaps if they match. Concurrent pushes retry if another thread changed the head first — no deadlocks possible.'
  },
  {
    title: 'Abstract Syntax Tree Builder', difficulty: 'expert', topic: 'Interpreters',
    description: 'Parse a simple arithmetic expression into an AST (nodes: Number, BinOp). Print the tree structure and evaluate it.',
    examples: [
      { input: '3 + 4 * 2', output: 'BinOp(+, 3, BinOp(*, 4, 2))\n11' }
    ],
    hints: ['Recursive descent: expression → term → factor. Build node objects at each step.'],
    starter: 'class Num:\n    def __init__(self, val): self.val = val\n    def eval(self): return self.val\n\nclass BinOp:\n    def __init__(self, op, l, r): self.op=op; self.l=l; self.r=r\n    def eval(self):\n        a, b = self.l.eval(), self.r.eval()\n        return a+b if self.op=="+" else a-b if self.op=="-" else a*b if self.op=="*" else a/b\n\ndef parse(tokens): pass\n',
    solution: 'class Num:\n    def __init__(self, val): self.val = val\n    def __repr__(self): return str(self.val)\n    def eval(self): return self.val\n\nclass BinOp:\n    def __init__(self, op, l, r): self.op=op; self.l=l; self.r=r\n    def __repr__(self): return f"BinOp({self.op}, {self.l}, {self.r})"\n    def eval(self):\n        a,b = self.l.eval(),self.r.eval()\n        return a+b if self.op=="+" else a-b if self.op=="-" else a*b if self.op=="*" else a/b\n\ndef parse(tokens):\n    pos = [0]\n    def peek(): return tokens[pos[0]] if pos[0] < len(tokens) else None\n    def consume(): v=tokens[pos[0]]; pos[0]+=1; return v\n    def factor():\n        tok = consume()\n        return Num(float(tok)) if tok not in "+-*/()" else None\n    def term():\n        node = factor()\n        while peek() in ("*", "/"):\n            op = consume()\n            node = BinOp(op, node, factor())\n        return node\n    def expr():\n        node = term()\n        while peek() in ("+", "-"):\n            op = consume()\n            node = BinOp(op, node, term())\n        return node\n    return expr()\n\ntokens = "3 + 4 * 2".split()\ntree = parse(tokens)\nprint(tree)\nprint(int(tree.eval()))',
    explanation: 'Recursive descent: expr calls term (handles * /), term calls factor (numbers). This naturally encodes operator precedence. Each grammar rule becomes a function.'
  },
  {
    title: 'Probabilistic Skip List', difficulty: 'expert', topic: 'Data Structures',
    description: 'Implement a skip list with probabilistic balancing. Support insert, search, and delete. Print elements in order.',
    examples: [
      { output: '1 3 5 7 9' }
    ],
    hints: ['Each node has multiple forward pointers. On insert, decide the level with p=0.5 per coin flip.'],
    starter: 'import random\nrandom.seed(0)\nMAX_LEVEL = 4\n',
    solution: 'import random\nrandom.seed(0)\nMAX_LEVEL = 4\n\nclass SkipNode:\n    def __init__(self, val, level):\n        self.val = val\n        self.forward = [None] * (level + 1)\n\nclass SkipList:\n    def __init__(self):\n        self.head = SkipNode(float("-inf"), MAX_LEVEL)\n        self.level = 0\n    def _random_level(self):\n        lvl = 0\n        while random.random() < 0.5 and lvl < MAX_LEVEL:\n            lvl += 1\n        return lvl\n    def insert(self, val):\n        update = [None] * (MAX_LEVEL + 1)\n        cur = self.head\n        for i in range(self.level, -1, -1):\n            while cur.forward[i] and cur.forward[i].val < val:\n                cur = cur.forward[i]\n            update[i] = cur\n        lvl = self._random_level()\n        if lvl > self.level:\n            for i in range(self.level+1, lvl+1):\n                update[i] = self.head\n            self.level = lvl\n        node = SkipNode(val, lvl)\n        for i in range(lvl+1):\n            node.forward[i] = update[i].forward[i]\n            update[i].forward[i] = node\n    def to_list(self):\n        result, cur = [], self.head.forward[0]\n        while cur: result.append(cur.val); cur = cur.forward[0]\n        return result\n\nsl = SkipList()\nfor v in [3,1,7,5,9]: sl.insert(v)\nprint(*sl.to_list())',
    explanation: 'Skip lists achieve O(log n) average operations via probabilistic multi-level indexing. Each level is a sparser subset of the one below, like a binary search structure built randomly.'
  },
  {
    title: 'Compile Regex to NFA', difficulty: 'expert', topic: 'Algorithms',
    description: 'Compile a simple regular expression (literals and *) to an NFA using Thompson\'s construction. Match a test string.',
    examples: [
      { output: 'True\nFalse' }
    ],
    hints: ['Represent NFA states as objects with epsilon and char transitions. Simulate by tracking the set of active states.'],
    starter: '# Implement Thompson NFA for regex: literals + *\n# match("ab*c", "abbbbc") -> True\n# match("ab*c", "ac") -> True\n# match("ab*c", "abc") -> True\n# match("ab*c", "adc") -> False\n',
    solution: 'class State:\n    def __init__(self):\n        self.transitions = {}\n        self.epsilon = []\n        self.accepting = False\n\ndef epsilon_closure(states):\n    closure = set(states)\n    stack = list(states)\n    while stack:\n        s = stack.pop()\n        for ns in s.epsilon:\n            if ns not in closure:\n                closure.add(ns)\n                stack.append(ns)\n    return closure\n\ndef match(pattern, text):\n    # Build NFA\n    start = State()\n    cur = start\n    for i, c in enumerate(pattern):\n        if i+1 < len(pattern) and pattern[i+1] == "*":\n            continue\n        if c == "*":\n            prev_c = pattern[i-1]\n            loop = State()\n            cur.epsilon.append(loop)\n            loop.transitions[prev_c] = [loop]\n            after = State()\n            cur.epsilon.append(after)\n            loop.epsilon.append(after)\n            cur = after\n        else:\n            nxt = State()\n            cur.transitions[c] = [nxt]\n            cur = nxt\n    cur.accepting = True\n    # Simulate\n    active = epsilon_closure({start})\n    for c in text:\n        nxt = set()\n        for s in active:\n            for ns in s.transitions.get(c, []):\n                nxt.add(ns)\n        active = epsilon_closure(nxt)\n    return any(s.accepting for s in active)\n\nprint(match("ab*c", "abbbbc"))\nprint(match("ab*c", "adc"))',
    explanation: 'Thompson\'s construction converts each regex operator into NFA fragments connected by epsilon transitions. Simulation tracks all reachable states simultaneously using epsilon-closure.'
  },
  {
    title: 'Virtual Machine with Bytecode', difficulty: 'expert', topic: 'Interpreters',
    description: 'Implement a tiny stack-based virtual machine that executes bytecode instructions: PUSH, ADD, MUL, PRINT.',
    examples: [
      { output: '7\n12' }
    ],
    hints: ['A list is the stack. Each instruction pops/pushes. PRINT pops and prints.'],
    starter: 'def run(bytecode):\n    pass\n\n# Compute 3+4 and print, then 3*4 and print\nbytecode = [\n    ("PUSH", 3), ("PUSH", 4), ("ADD",), ("PRINT",),\n    ("PUSH", 3), ("PUSH", 4), ("MUL",), ("PRINT",)\n]\nrun(bytecode)\n',
    solution: 'def run(bytecode):\n    stack = []\n    for instr in bytecode:\n        op = instr[0]\n        if op == "PUSH":\n            stack.append(instr[1])\n        elif op == "ADD":\n            b, a = stack.pop(), stack.pop()\n            stack.append(a + b)\n        elif op == "SUB":\n            b, a = stack.pop(), stack.pop()\n            stack.append(a - b)\n        elif op == "MUL":\n            b, a = stack.pop(), stack.pop()\n            stack.append(a * b)\n        elif op == "PRINT":\n            print(stack.pop())\n\nbytecode = [\n    ("PUSH", 3), ("PUSH", 4), ("ADD",), ("PRINT",),\n    ("PUSH", 3), ("PUSH", 4), ("MUL",), ("PRINT",)\n]\nrun(bytecode)',
    explanation: 'A stack VM executes instructions sequentially. Operands are pushed; operations pop their operands and push the result. PRINT pops and displays the top of the stack.'
  },
  {
    title: 'Monad-Style Option Type', difficulty: 'expert', topic: 'Advanced Python',
    description: 'Implement a <code>Maybe</code> monad with <code>bind</code> (chain operations that may fail) and <code>map</code>. Demonstrate safe division and safe sqrt.',
    examples: [
      { output: 'Just(2.0)\nNothing\nNothing' }
    ],
    hints: ['Two subclasses: Just(value) and Nothing. bind returns Nothing if called on Nothing, else applies fn to value.'],
    starter: 'class Maybe:\n    @staticmethod\n    def of(val): return Just(val)\n\nclass Just(Maybe):\n    def __init__(self, val): self.val = val\n    def bind(self, fn): pass\n    def map(self, fn): pass\n    def __repr__(self): return f"Just({self.val})"\n\nclass Nothing(Maybe):\n    def bind(self, fn): return self\n    def map(self, fn): return self\n    def __repr__(self): return "Nothing"\n\nNOTHING = Nothing()\n',
    solution: 'class Maybe:\n    @staticmethod\n    def of(val): return Just(val)\n\nclass Just(Maybe):\n    def __init__(self, val): self.val = val\n    def bind(self, fn): return fn(self.val)\n    def map(self, fn): return Just(fn(self.val))\n    def __repr__(self): return f"Just({self.val})"\n\nclass Nothing(Maybe):\n    def bind(self, fn): return self\n    def map(self, fn): return self\n    def __repr__(self): return "Nothing"\n\nNOTHING = Nothing()\n\ndef safe_div(x):\n    return lambda y: NOTHING if y == 0 else Just(x / y)\n\ndef safe_sqrt(x):\n    return NOTHING if x < 0 else Just(x ** 0.5)\n\nprint(Maybe.of(4).bind(safe_sqrt))           # Just(2.0)\nprint(Maybe.of(4).bind(safe_div(8)).bind(safe_sqrt).bind(safe_div(0)))  # Nothing (div by 0)\nprint(Maybe.of(-1).bind(safe_sqrt))          # Nothing',
    explanation: 'Just.bind applies the function and returns its result (which is itself a Maybe). Nothing.bind short-circuits and returns Nothing. This lets you chain risky operations without explicit None checks.'
  },
  {
    title: 'Rope Data Structure', difficulty: 'expert', topic: 'Data Structures',
    description: 'Implement a Rope — a binary tree for efficient string concatenation and slicing. Build from a string, concatenate two ropes, and print the result.',
    examples: [
      { output: 'Hello, World!' }
    ],
    hints: ['Each leaf holds a string chunk. Concatenation creates a new root node. Index traversal descends by weight.'],
    starter: 'class Rope:\n    def __init__(self, text=None, left=None, right=None):\n        if text is not None:\n            self.text = text\n            self.weight = len(text)\n            self.left = self.right = None\n        else:\n            self.text = None\n            self.left = left\n            self.right = right\n            self.weight = left.weight if left else 0\n    def to_string(self): pass\n    def concat(self, other): pass\n',
    solution: 'class Rope:\n    def __init__(self, text=None, left=None, right=None):\n        if text is not None:\n            self.text = text\n            self.weight = len(text)\n            self.left = self.right = None\n        else:\n            self.text = None\n            self.left = left\n            self.right = right\n            self.weight = left.weight if left else 0\n    def to_string(self):\n        if self.text is not None: return self.text\n        l = self.left.to_string() if self.left else ""\n        r = self.right.to_string() if self.right else ""\n        return l + r\n    def concat(self, other):\n        return Rope(left=self, right=other)\n\nr1 = Rope("Hello, ")\nr2 = Rope("World!")\nr3 = r1.concat(r2)\nprint(r3.to_string())',
    explanation: 'A Rope avoids copying large strings on concatenation by creating a new root node pointing to both ropes. The actual characters are only read on to_string(), traversing the tree lazily.'
  },
  {
    title: 'DSL for Building SQL Queries', difficulty: 'expert', topic: 'Design Patterns',
    description: 'Implement a fluent query builder that generates SQL SELECT strings via method chaining.',
    examples: [
      { output: 'SELECT name, age FROM users WHERE age > 18 ORDER BY name LIMIT 10' }
    ],
    hints: ['Each method modifies internal state and returns self. build() assembles the final string.'],
    starter: 'class QueryBuilder:\n    def __init__(self, table): pass\n    def select(self, *cols): pass\n    def where(self, condition): pass\n    def order_by(self, col): pass\n    def limit(self, n): pass\n    def build(self): pass\n',
    solution: 'class QueryBuilder:\n    def __init__(self, table):\n        self._table = table\n        self._cols = ["*"]\n        self._where = None\n        self._order = None\n        self._limit = None\n    def select(self, *cols):\n        self._cols = list(cols); return self\n    def where(self, condition):\n        self._where = condition; return self\n    def order_by(self, col):\n        self._order = col; return self\n    def limit(self, n):\n        self._limit = n; return self\n    def build(self):\n        q = f"SELECT {\', \'.join(self._cols)} FROM {self._table}"\n        if self._where: q += f" WHERE {self._where}"\n        if self._order: q += f" ORDER BY {self._order}"\n        if self._limit: q += f" LIMIT {self._limit}"\n        return q\n\nq = (QueryBuilder("users")\n     .select("name", "age")\n     .where("age > 18")\n     .order_by("name")\n     .limit(10)\n     .build())\nprint(q)',
    explanation: 'Each method stores its argument and returns <code>self</code>, enabling method chaining. <code>build()</code> assembles all parts into a final SQL string in the correct clause order.'
  },
  {
    title: 'Spinlock with Exponential Backoff', difficulty: 'expert', topic: 'Advanced Python',
    description: 'Implement a spinlock where failed acquisition uses exponential backoff with jitter. Demonstrate with 3 threads.',
    examples: [
      { output: 'thread-0 done\nthread-1 done\nthread-2 done' }
    ],
    hints: ['Spin on an atomic flag. On failure, sleep 2^attempt * random_jitter seconds before retrying.'],
    starter: 'import threading, time, random\nrandom.seed(1)\n\nclass Spinlock:\n    def __init__(self): pass\n    def acquire(self): pass\n    def release(self): pass\n',
    solution: 'import threading, time, random\nrandom.seed(1)\n\nclass Spinlock:\n    def __init__(self):\n        self._lock = threading.Lock()\n    def acquire(self):\n        attempt = 0\n        while not self._lock.acquire(blocking=False):\n            sleep_time = (2 ** attempt) * 0.001 * (0.5 + random.random())\n            time.sleep(min(sleep_time, 0.1))\n            attempt += 1\n    def release(self):\n        self._lock.release()\n\nspinlock = Spinlock()\nresults = []\n\ndef task(name):\n    spinlock.acquire()\n    try:\n        time.sleep(0.01)\n        results.append(name)\n    finally:\n        spinlock.release()\n\nthreads = [threading.Thread(target=task, args=(f"thread-{i}",)) for i in range(3)]\nfor t in threads: t.start()\nfor t in threads: t.join()\nfor r in results: print(f"{r} done")',
    explanation: 'Exponential backoff reduces contention: each failed attempt waits twice as long before retrying. Jitter (random factor) prevents thundering herd where all threads retry simultaneously.'
  },
  {
    title: 'Functional Lens', difficulty: 'expert', topic: 'Advanced Python',
    description: 'Implement a functional Lens — a composable getter/setter pair for immutable nested data. Demonstrate reading and updating nested dict values.',
    examples: [
      { output: 'Alice\n{\'user\': {\'name\': \'Bob\', \'age\': 30}}' }
    ],
    hints: ['A Lens is a pair of (getter, setter). Compose by chaining getters and setters.'],
    starter: 'class Lens:\n    def __init__(self, getter, setter): pass\n    def get(self, obj): pass\n    def set(self, obj, val): pass\n    def compose(self, other): pass  # outer.compose(inner)\n    def modify(self, obj, fn): pass\n\ndef key_lens(k): pass  # Lens that focuses on a dict key\n',
    solution: 'class Lens:\n    def __init__(self, getter, setter):\n        self._get = getter\n        self._set = setter\n    def get(self, obj):\n        return self._get(obj)\n    def set(self, obj, val):\n        return self._set(obj, val)\n    def compose(self, inner):\n        return Lens(\n            lambda obj: inner.get(self.get(obj)),\n            lambda obj, val: self.set(obj, inner.set(self.get(obj), val))\n        )\n    def modify(self, obj, fn):\n        return self.set(obj, fn(self.get(obj)))\n\ndef key_lens(k):\n    return Lens(\n        lambda d: d[k],\n        lambda d, v: {**d, k: v}\n    )\n\nuser_lens = key_lens("user")\nname_lens = key_lens("name")\nuser_name = user_lens.compose(name_lens)\n\ndata = {"user": {"name": "Alice", "age": 30}}\nprint(user_name.get(data))\nprint(user_name.set(data, "Bob"))',
    explanation: 'A Lens composes getter and setter cleanly. Composing outer and inner lenses creates a new lens that drills deeper. set produces a new dict without mutating the original.'
  }
];
