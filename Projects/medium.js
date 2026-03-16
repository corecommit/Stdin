const PROJECTS_MEDIUM = [
  {
    title: 'Word Frequency Counter', difficulty: 'medium', topic: 'Dictionaries',
    description: 'Count how many times each word appears in a sentence. Print sorted by frequency (highest first).',
    examples: [
      { input: 'the cat sat on the mat the cat', output: 'the: 3\ncat: 2\nsat: 1\non: 1\nmat: 1' }
    ],
    hints: ['Use a dict to count', 'dict.get(key, 0)', 'sorted() with key=lambda'],
    starter: 'sentence = input("Sentence: ")\n# Count and sort\n',
    solution: 'sentence = input("Sentence: ")\nwords = sentence.lower().split()\nfreq = {}\nfor w in words:\n    freq[w] = freq.get(w, 0) + 1\nfor w, c in sorted(freq.items(), key=lambda x: -x[1]):\n    print(f"{w}: {c}")',
    explanation: '<code>dict.get(key, 0)</code> returns 0 if key is missing. Sort by value descending with a lambda.'
  },
  {
    title: 'Stack Implementation', difficulty: 'medium', topic: 'Data Structures',
    description: 'Implement a Stack class with push, pop, peek, is_empty, and size methods.',
    examples: [
      { output: 'Peek: 3\nPop: 3\nSize: 2' }
    ],
    hints: ['LIFO: Last In First Out', 'list.append() = push, list.pop() = pop'],
    starter: 'class Stack:\n    def __init__(self):\n        self.items = []\n    def push(self, item): pass\n    def pop(self): pass\n    def peek(self): pass\n    def is_empty(self): pass\n    def size(self): pass\n\ns = Stack()\ns.push(1); s.push(2); s.push(3)\nprint("Peek:", s.peek())\nprint("Pop:", s.pop())\nprint("Size:", s.size())\n',
    solution: 'class Stack:\n    def __init__(self):\n        self.items = []\n    def push(self, item):\n        self.items.append(item)\n    def pop(self):\n        if not self.is_empty(): return self.items.pop()\n        raise IndexError("Stack is empty")\n    def peek(self):\n        if not self.is_empty(): return self.items[-1]\n    def is_empty(self):\n        return len(self.items) == 0\n    def size(self):\n        return len(self.items)\n\ns = Stack()\ns.push(1); s.push(2); s.push(3)\nprint("Peek:", s.peek())\nprint("Pop:", s.pop())\nprint("Size:", s.size())',
    explanation: 'A Stack wraps a list. <code>append()</code> is push, <code>pop()</code> removes from the end — both O(1).'
  },
  {
    title: 'Queue Implementation', difficulty: 'medium', topic: 'Data Structures',
    description: 'Implement a Queue class using <code>collections.deque</code> with enqueue, dequeue, peek, and size methods.',
    examples: [
      { output: 'Enqueue 1,2,3\nDequeue: 1\nFront: 2\nSize: 2' }
    ],
    hints: ['FIFO: First In First Out', 'deque.append() = enqueue, deque.popleft() = dequeue'],
    starter: 'from collections import deque\n\nclass Queue:\n    def __init__(self):\n        self.items = deque()\n    def enqueue(self, item): pass\n    def dequeue(self): pass\n    def peek(self): pass\n    def size(self): pass\n\nq = Queue()\nq.enqueue(1); q.enqueue(2); q.enqueue(3)\nprint("Dequeue:", q.dequeue())\nprint("Front:", q.peek())\nprint("Size:", q.size())\n',
    solution: 'from collections import deque\n\nclass Queue:\n    def __init__(self):\n        self.items = deque()\n    def enqueue(self, item):\n        self.items.append(item)\n    def dequeue(self):\n        if self.items: return self.items.popleft()\n        raise IndexError("Queue is empty")\n    def peek(self):\n        if self.items: return self.items[0]\n    def size(self):\n        return len(self.items)\n\nq = Queue()\nq.enqueue(1); q.enqueue(2); q.enqueue(3)\nprint("Dequeue:", q.dequeue())\nprint("Front:", q.peek())\nprint("Size:", q.size())',
    explanation: '<code>deque.popleft()</code> is O(1), unlike <code>list.pop(0)</code> which is O(n). Always use deque for queues.'
  },
  {
    title: 'Binary Search', difficulty: 'medium', topic: 'Algorithms',
    description: 'Implement binary search on a sorted list. Return the index, or -1 if not found.',
    examples: [
      { input: 'Target: 7', output: 'Found at index: 3' }
    ],
    hints: ['left and right pointers', 'mid = (left + right) // 2', 'Narrow search each iteration'],
    starter: 'def binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        # compare arr[mid] with target\n        pass\n    return -1\n\narr = [1, 3, 5, 7, 9, 11, 13]\nprint(binary_search(arr, 7))\nprint(binary_search(arr, 4))\n',
    solution: 'def binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target: return mid\n        elif arr[mid] < target: left = mid + 1\n        else: right = mid - 1\n    return -1\n\narr = [1, 3, 5, 7, 9, 11, 13]\nprint(binary_search(arr, 7))\nprint(binary_search(arr, 4))',
    explanation: 'Binary search halves the search space each step — O(log n). Left/right pointers converge on the target.'
  },
  {
    title: 'Anagram Checker', difficulty: 'medium', topic: 'Strings',
    description: 'Check if two strings are anagrams (same characters, same frequency, ignoring spaces/case).',
    examples: [
      { input: 'listen / silent', output: 'True' }
    ],
    hints: ['Sort both strings and compare', 'Or use Counter from collections'],
    starter: 'a = input("First: ")\nb = input("Second: ")\n# Anagram check\n',
    solution: 'from collections import Counter\na = input("First: ")\nb = input("Second: ")\na_c = a.lower().replace(" ","")\nb_c = b.lower().replace(" ","")\nprint(Counter(a_c) == Counter(b_c))',
    explanation: '<code>Counter</code> creates a frequency map. Two strings are anagrams when their Counter maps are equal.'
  },
  {
    title: 'Matrix Multiplication', difficulty: 'medium', topic: 'Math',
    description: 'Multiply two 3×3 matrices using nested loops.',
    examples: [
      { output: 'Row 0: [30, 24, 18]\nRow 1: [84, 69, 54]\nRow 2: [138, 114, 90]' }
    ],
    hints: ['C[i][j] = sum of A[i][k] * B[k][j]', 'Three nested loops'],
    starter: 'A = [[1,2,3],[4,5,6],[7,8,9]]\nB = [[9,8,7],[6,5,4],[3,2,1]]\n# Compute A × B\n',
    solution: 'A = [[1,2,3],[4,5,6],[7,8,9]]\nB = [[9,8,7],[6,5,4],[3,2,1]]\nn = len(A)\nC = [[0]*n for _ in range(n)]\nfor i in range(n):\n    for j in range(n):\n        for k in range(n):\n            C[i][j] += A[i][k] * B[k][j]\nfor i, row in enumerate(C):\n    print(f"Row {i}: {row}")',
    explanation: 'Each cell C[i][j] = dot product of row i of A and column j of B. Three loops give O(n³).'
  },
  {
    title: 'Bubble Sort', difficulty: 'medium', topic: 'Algorithms',
    description: 'Implement Bubble Sort to sort a list in ascending order.',
    examples: [
      { input: '[64, 34, 25, 12, 22, 11, 90]', output: '[11, 12, 22, 25, 34, 64, 90]' }
    ],
    hints: ['Compare adjacent elements', 'Swap if out of order', 'Early exit if no swaps'],
    starter: 'def bubble_sort(arr):\n    n = len(arr)\n    # Your implementation\n    return arr\n\nprint(bubble_sort([64, 34, 25, 12, 22, 11, 90]))\n',
    solution: 'def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n-1):\n        swapped = False\n        for j in range(n-1-i):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n                swapped = True\n        if not swapped: break\n    return arr\n\nprint(bubble_sort([64, 34, 25, 12, 22, 11, 90]))',
    explanation: 'The <code>swapped</code> flag optimizes early exit — if no swap in a pass, the list is already sorted.'
  },
  {
    title: 'Selection Sort', difficulty: 'medium', topic: 'Algorithms',
    description: 'Implement Selection Sort — find the minimum element and place it at the front each pass.',
    examples: [
      { input: '[29, 10, 14, 37, 13]', output: '[10, 13, 14, 29, 37]' }
    ],
    hints: ['Find index of minimum in unsorted portion', 'Swap it to the front of unsorted portion'],
    starter: 'def selection_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        # Find min in arr[i:]\n        pass\n    return arr\n\nprint(selection_sort([29, 10, 14, 37, 13]))\n',
    solution: 'def selection_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        min_idx = i\n        for j in range(i+1, n):\n            if arr[j] < arr[min_idx]:\n                min_idx = j\n        arr[i], arr[min_idx] = arr[min_idx], arr[i]\n    return arr\n\nprint(selection_sort([29, 10, 14, 37, 13]))',
    explanation: 'Each pass selects the minimum from the unsorted portion and swaps it into position. O(n²) time.'
  },
  {
    title: 'Insertion Sort', difficulty: 'medium', topic: 'Algorithms',
    description: 'Implement Insertion Sort — build the sorted array one element at a time.',
    examples: [
      { input: '[12, 11, 13, 5, 6]', output: '[5, 6, 11, 12, 13]' }
    ],
    hints: ['Pick next element', 'Shift larger elements right', 'Insert at correct position'],
    starter: 'def insertion_sort(arr):\n    for i in range(1, len(arr)):\n        key = arr[i]\n        # Insert key into sorted portion\n        pass\n    return arr\n\nprint(insertion_sort([12, 11, 13, 5, 6]))\n',
    solution: 'def insertion_sort(arr):\n    for i in range(1, len(arr)):\n        key = arr[i]\n        j = i - 1\n        while j >= 0 and arr[j] > key:\n            arr[j+1] = arr[j]\n            j -= 1\n        arr[j+1] = key\n    return arr\n\nprint(insertion_sort([12, 11, 13, 5, 6]))',
    explanation: 'Pick each element and slide it left until it finds its sorted position. Efficient for small or nearly-sorted data.'
  },
  {
    title: 'Linked List', difficulty: 'medium', topic: 'Data Structures',
    description: 'Implement a singly linked list with append, delete, search, and print_list methods.',
    examples: [
      { output: '1 -> 2 -> 3 -> 4 -> None\nSearch 3: True\nAfter delete 2: 1 -> 3 -> 4 -> None' }
    ],
    hints: ['Node class: data + next pointer', 'Traverse with while cur:'],
    starter: 'class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\nclass LinkedList:\n    def __init__(self):\n        self.head = None\n    def append(self, data): pass\n    def print_list(self): pass\n\nll = LinkedList()\nfor v in [1,2,3,4]: ll.append(v)\nll.print_list()\n',
    solution: 'class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\nclass LinkedList:\n    def __init__(self):\n        self.head = None\n    def append(self, data):\n        n = Node(data)\n        if not self.head: self.head = n; return\n        cur = self.head\n        while cur.next: cur = cur.next\n        cur.next = n\n    def delete(self, data):\n        if not self.head: return\n        if self.head.data == data: self.head = self.head.next; return\n        cur = self.head\n        while cur.next and cur.next.data != data: cur = cur.next\n        if cur.next: cur.next = cur.next.next\n    def search(self, data):\n        cur = self.head\n        while cur:\n            if cur.data == data: return True\n            cur = cur.next\n        return False\n    def print_list(self):\n        parts = []\n        cur = self.head\n        while cur: parts.append(str(cur.data)); cur = cur.next\n        print(" -> ".join(parts) + " -> None")\n\nll = LinkedList()\nfor v in [1,2,3,4]: ll.append(v)\nll.print_list()\nprint("Search 3:", ll.search(3))\nll.delete(2)\nll.print_list()',
    explanation: 'Linked list nodes connect via <code>next</code> pointers. Traversal starts at <code>head</code> and follows <code>next</code> until <code>None</code>.'
  },
  {
    title: 'Prime Sieve', difficulty: 'medium', topic: 'Math',
    description: 'Use the Sieve of Eratosthenes to find all primes up to N.',
    examples: [
      { input: '30', output: '2 3 5 7 11 13 17 19 23 29' }
    ],
    hints: ['Boolean list, mark composites', 'Only check up to √n'],
    starter: 'def sieve(n):\n    pass\n\nn = int(input("Find primes up to: "))\nprint(*sieve(n))\n',
    solution: 'def sieve(n):\n    is_prime = [True] * (n+1)\n    is_prime[0] = is_prime[1] = False\n    for i in range(2, int(n**0.5)+1):\n        if is_prime[i]:\n            for j in range(i*i, n+1, i):\n                is_prime[j] = False\n    return [i for i, p in enumerate(is_prime) if p]\n\nn = int(input("Find primes up to: "))\nprint(*sieve(n))',
    explanation: 'Mark composites starting from i². Only check up to √n for efficiency. O(n log log n) time.'
  },
  {
    title: 'JSON Data Parser', difficulty: 'medium', topic: 'JSON',
    description: 'Parse a JSON string of students, sort by score, and print with the class average.',
    examples: [
      { output: '1. Alice - 95\n2. Bob - 82\nAverage: 85.0' }
    ],
    hints: ['import json', 'json.loads() parses JSON string', 'sorted() with key'],
    starter: 'import json\ndata = \'[{"name":"Alice","score":95},{"name":"Bob","score":82},{"name":"Charlie","score":78}]\'\n# Parse and display\n',
    solution: 'import json\ndata = \'[{"name":"Alice","score":95},{"name":"Bob","score":82},{"name":"Charlie","score":78}]\'\nstudents = json.loads(data)\nsorted_s = sorted(students, key=lambda x: x["score"], reverse=True)\nfor i, s in enumerate(sorted_s, 1):\n    print(f"{i}. {s[\'name\']} - {s[\'score\']}")\nprint(f"Average: {sum(s[\'score\'] for s in students)/len(students)}")',
    explanation: '<code>json.loads()</code> converts JSON to Python dicts. Sort with lambda, compute average with generator.'
  },
  {
    title: 'Decorator: Timer', difficulty: 'medium', topic: 'Decorators',
    description: 'Create a <code>@timer</code> decorator that measures how long a function takes to execute.',
    examples: [
      { output: 'compute_sum took 0.0012s\nResult: 499999500000' }
    ],
    hints: ['Decorator is a function wrapping another function', 'time.time() for timestamps', 'functools.wraps preserves metadata'],
    starter: 'import time\nfrom functools import wraps\n\ndef timer(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        pass  # Time the call\n    return wrapper\n\n@timer\ndef compute_sum(n):\n    return sum(range(n))\n\nprint("Result:", compute_sum(1_000_000))\n',
    solution: 'import time\nfrom functools import wraps\n\ndef timer(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        start = time.time()\n        result = func(*args, **kwargs)\n        elapsed = time.time() - start\n        print(f"{func.__name__} took {elapsed:.4f}s")\n        return result\n    return wrapper\n\n@timer\ndef compute_sum(n):\n    return sum(range(n))\n\nprint("Result:", compute_sum(1_000_000))',
    explanation: 'Decorators wrap functions. <code>@wraps(func)</code> preserves <code>__name__</code> and <code>__doc__</code> of the original.'
  },
  {
    title: 'Regex Email Validator', difficulty: 'medium', topic: 'Regex',
    description: 'Validate a list of email addresses using regular expressions.',
    examples: [
      { output: 'user@example.com ✓\nnot-an-email ✗\nhello@world.org ✓' }
    ],
    hints: ['import re', 're.match() checks from start', 'Pattern: local@domain.tld'],
    starter: 'import re\nemails = ["user@example.com","not-an-email","hello@world.org","bad@.com"]\n# Validate each\n',
    solution: 'import re\nemails = ["user@example.com","not-an-email","hello@world.org","bad@.com"]\npattern = r"^[\\w.+\\-]+@[\\w\\-]+\\.[a-zA-Z]{2,}$"\nfor email in emails:\n    symbol = "✓" if re.match(pattern, email) else "✗"\n    print(f"{email} {symbol}")',
    explanation: 'The regex enforces: valid local part, @, domain, dot, and 2+ letter TLD.'
  },
  {
    title: 'File Word Count (Simulation)', difficulty: 'medium', topic: 'File I/O',
    description: 'Count total lines, words, and characters in a multi-line text block.',
    examples: [
      { output: 'Lines: 3\nWords: 9\nChars: 50' }
    ],
    hints: ['splitlines() for lines', 'split() for words', 'len() for characters'],
    starter: 'text = """Hello World\nPython is great\nI love coding today"""\n# Count lines, words, chars\n',
    solution: 'text = """Hello World\nPython is great\nI love coding today"""\nprint(f"Lines: {len(text.splitlines())}")\nprint(f"Words: {len(text.split())}")\nprint(f"Chars: {len(text)}")',
    explanation: '<code>splitlines()</code> splits by newlines. <code>split()</code> splits by whitespace (counts words). <code>len()</code> counts chars including spaces.'
  },
  {
    title: 'Generator: Infinite Counter', difficulty: 'medium', topic: 'Generators',
    description: 'Create a generator that yields integers starting from a given number, then use it to get the first N values.',
    examples: [
      { input: 'Start: 5, Count: 6', output: '5 6 7 8 9 10' }
    ],
    hints: ['def with yield instead of return', 'Generators are lazy — values produced on demand'],
    starter: 'def counter(start=0):\n    # Infinite generator\n    pass\n\ngen = counter(5)\nfor _ in range(6):\n    print(next(gen), end=" ")\n',
    solution: 'def counter(start=0):\n    n = start\n    while True:\n        yield n\n        n += 1\n\ngen = counter(5)\nfor _ in range(6):\n    print(next(gen), end=" ")\nprint()',
    explanation: 'Generators use <code>yield</code> to pause and resume. They produce values lazily, making infinite sequences memory-efficient.'
  },
  {
    title: 'Context Manager', difficulty: 'medium', topic: 'Advanced Python',
    description: 'Implement a custom context manager that logs entry and exit, and handles exceptions gracefully.',
    examples: [
      { output: 'Entering context\nDoing work...\nExiting context (no error)' }
    ],
    hints: ['__enter__ and __exit__ methods', '__exit__ receives exc_type, exc_val, exc_tb', 'Return True to suppress exception'],
    starter: 'class ManagedResource:\n    def __enter__(self):\n        pass\n    def __exit__(self, exc_type, exc_val, exc_tb):\n        pass\n\nwith ManagedResource():\n    print("Doing work...")\n',
    solution: 'class ManagedResource:\n    def __enter__(self):\n        print("Entering context")\n        return self\n    def __exit__(self, exc_type, exc_val, exc_tb):\n        if exc_type:\n            print(f"Exiting context (error: {exc_val})")\n        else:\n            print("Exiting context (no error)")\n        return False\n\nwith ManagedResource():\n    print("Doing work...")',
    explanation: '<code>__enter__</code> sets up, <code>__exit__</code> tears down. Return <code>True</code> to suppress exceptions, <code>False</code> to propagate them.'
  },
  {
    title: 'Memoization with lru_cache', difficulty: 'medium', topic: 'Performance',
    description: 'Speed up the naive recursive Fibonacci using Python\'s <code>@functools.lru_cache</code> decorator.',
    examples: [
      { input: '35', output: 'fib(35) = 9227465 (fast!)' }
    ],
    hints: ['from functools import lru_cache', '@lru_cache(maxsize=None)', 'Compare with/without cache timing'],
    starter: 'from functools import lru_cache\nimport time\n\n@lru_cache(maxsize=None)\ndef fib(n):\n    # Recursive fib\n    pass\n\nstart = time.time()\nprint(f"fib(35) = {fib(35)}")\nprint(f"Time: {time.time()-start:.4f}s")\n',
    solution: 'from functools import lru_cache\nimport time\n\n@lru_cache(maxsize=None)\ndef fib(n):\n    if n < 2: return n\n    return fib(n-1) + fib(n-2)\n\nstart = time.time()\nprint(f"fib(35) = {fib(35)}")\nprint(f"Time: {time.time()-start:.6f}s")\nprint(f"Cache info: {fib.cache_info()}")',
    explanation: '<code>@lru_cache</code> stores (memoizes) results of previous calls. fib(35) needs ~29M calls without it, just ~35 with it.'
  },
  {
    title: 'Class Inheritance', difficulty: 'medium', topic: 'OOP',
    description: 'Model a hierarchy: Animal → Dog, Cat. Each subclass overrides the <code>speak()</code> method.',
    examples: [
      { output: 'Buddy says: Woof!\nWhiskers says: Meow!' }
    ],
    hints: ['class Dog(Animal):', 'super().__init__() to call parent', 'Override methods in subclass'],
    starter: 'class Animal:\n    def __init__(self, name):\n        self.name = name\n    def speak(self):\n        pass\n\nclass Dog(Animal):\n    def speak(self): pass\n\nclass Cat(Animal):\n    def speak(self): pass\n\nanimals = [Dog("Buddy"), Cat("Whiskers")]\nfor a in animals:\n    print(a.speak())\n',
    solution: 'class Animal:\n    def __init__(self, name):\n        self.name = name\n    def speak(self):\n        return f"{self.name} says: ..."\n\nclass Dog(Animal):\n    def speak(self):\n        return f"{self.name} says: Woof!"\n\nclass Cat(Animal):\n    def speak(self):\n        return f"{self.name} says: Meow!"\n\nanimals = [Dog("Buddy"), Cat("Whiskers")]\nfor a in animals:\n    print(a.speak())',
    explanation: 'Inheritance lets subclasses reuse and override parent behavior. This is polymorphism — same interface, different behavior.'
  },
  {
    title: 'Property Decorators', difficulty: 'medium', topic: 'OOP',
    description: 'Use <code>@property</code>, <code>@setter</code>, and <code>@deleter</code> to create a Circle class with a validated radius.',
    examples: [
      { output: 'Area: 78.54\nCircumference: 31.42\nError: Radius must be positive' }
    ],
    hints: ['@property creates a getter', '@radius.setter validates input', 'Raise ValueError for invalid values'],
    starter: 'import math\n\nclass Circle:\n    def __init__(self, radius):\n        self._radius = radius\n    \n    @property\n    def radius(self): pass\n    \n    @radius.setter\n    def radius(self, value): pass\n    \n    @property\n    def area(self): pass\n\nc = Circle(5)\nprint(f"Area: {c.area:.2f}")\n',
    solution: 'import math\n\nclass Circle:\n    def __init__(self, radius):\n        self.radius = radius\n    \n    @property\n    def radius(self):\n        return self._radius\n    \n    @radius.setter\n    def radius(self, value):\n        if value <= 0:\n            raise ValueError("Radius must be positive")\n        self._radius = value\n    \n    @property\n    def area(self):\n        return math.pi * self._radius ** 2\n    \n    @property\n    def circumference(self):\n        return 2 * math.pi * self._radius\n\nc = Circle(5)\nprint(f"Area: {c.area:.2f}")\nprint(f"Circumference: {c.circumference:.2f}")\ntry:\n    c.radius = -1\nexcept ValueError as e:\n    print(f"Error: {e}")',
    explanation: '<code>@property</code> turns methods into attribute access. The setter validates input before storing it, keeping the object in a valid state.'
  },
  {
    title: 'Iterator Protocol', difficulty: 'medium', topic: 'Advanced Python',
    description: 'Implement the iterator protocol (<code>__iter__</code> and <code>__next__</code>) to create a custom range-like object.',
    examples: [
      { output: '0 2 4 6 8' }
    ],
    hints: ['__iter__ returns self', '__next__ raises StopIteration when done', 'Track current position'],
    starter: 'class EvenRange:\n    def __init__(self, n):\n        self.n = n\n        self.current = 0\n    \n    def __iter__(self):\n        return self\n    \n    def __next__(self):\n        pass  # yield even numbers, raise StopIteration at end\n\nfor x in EvenRange(10):\n    print(x, end=" ")\n',
    solution: 'class EvenRange:\n    def __init__(self, n):\n        self.n = n\n        self.current = 0\n    \n    def __iter__(self):\n        return self\n    \n    def __next__(self):\n        if self.current >= self.n:\n            raise StopIteration\n        val = self.current\n        self.current += 2\n        return val\n\nfor x in EvenRange(10):\n    print(x, end=" ")\nprint()',
    explanation: '<code>__iter__</code> returns the iterator object. <code>__next__</code> returns the next value or raises <code>StopIteration</code> to end the loop.'
  },
  {
    title: 'Comprehension Mastery', difficulty: 'medium', topic: 'Comprehensions',
    description: 'Use list, dict, and set comprehensions to process data: filter evens, square a range, map words to lengths.',
    examples: [
      { output: 'Evens: [2,4,6,8,10]\nSquares: {1:1, 2:4, 3:9}\nUnique lengths: {3,4,5,6}' }
    ],
    hints: ['{k: v for ...} is dict comprehension', '{expr for ...} is set comprehension', 'Condition: if clause at end'],
    starter: 'nums = range(1, 11)\nwords = ["cat","dog","python","code","hello","hi","world"]\n# List comp: even numbers\n# Dict comp: number -> square\n# Set comp: unique word lengths\n',
    solution: 'nums = range(1, 11)\nwords = ["cat","dog","python","code","hello","hi","world"]\nevens = [n for n in nums if n % 2 == 0]\nprint("Evens:", evens)\nsquares = {n: n**2 for n in range(1, 4)}\nprint("Squares:", squares)\nuniq_len = {len(w) for w in words}\nprint("Unique lengths:", uniq_len)',
    explanation: 'Three comprehension types: <code>[]</code> for lists, <code>{}</code> for sets (no colon), <code>{k:v}</code> for dicts. All support <code>if</code> filters.'
  },
  {
    title: 'Flatten Nested List', difficulty: 'medium', topic: 'Recursion',
    description: 'Flatten an arbitrarily nested list into a single flat list.',
    examples: [
      { input: '[1, [2, [3, 4], 5], [6, 7]]', output: '[1, 2, 3, 4, 5, 6, 7]' }
    ],
    hints: ['Check if element is a list with isinstance(x, list)', 'Recurse on nested lists', 'Extend result with yielded values'],
    starter: 'def flatten(lst):\n    result = []\n    for item in lst:\n        # If item is a list, flatten it\n        pass\n    return result\n\nprint(flatten([1, [2, [3, 4], 5], [6, 7]]))\n',
    solution: 'def flatten(lst):\n    result = []\n    for item in lst:\n        if isinstance(item, list):\n            result.extend(flatten(item))\n        else:\n            result.append(item)\n    return result\n\nprint(flatten([1, [2, [3, 4], 5], [6, 7]]))',
    explanation: 'For each element, check if it\'s a list. If so, recursively flatten and extend the result. Otherwise, just append.'
  },
  {
    title: 'Two Sum Problem', difficulty: 'medium', topic: 'Algorithms',
    description: 'Given a list of integers and a target sum, find two numbers that add up to the target. Return their indices.',
    examples: [
      { input: '[2,7,11,15], target=9', output: '[0, 1]' }
    ],
    hints: ['Use a hash map for O(n) solution', 'complement = target - num', 'Check if complement is already seen'],
    starter: 'def two_sum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        # Check if complement was seen\n        pass\n    return []\n\nprint(two_sum([2, 7, 11, 15], 9))\nprint(two_sum([3, 2, 4], 6))\n',
    solution: 'def two_sum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i\n    return []\n\nprint(two_sum([2, 7, 11, 15], 9))\nprint(two_sum([3, 2, 4], 6))',
    explanation: 'Hash map stores {value: index}. For each number, check if its complement (target - num) was seen before. O(n) time, O(n) space.'
  },
  {
    title: 'Palindrome Number', difficulty: 'medium', topic: 'Math',
    description: 'Without converting to string, check if an integer is a palindrome (reads same forward and backward).',
    examples: [
      { input: '121', output: 'True' },
      { input: '-121', output: 'False' }
    ],
    hints: ['Reverse the number mathematically', 'Negative numbers are never palindromes', 'Compare reversed with original'],
    starter: 'def is_palindrome(n):\n    if n < 0: return False\n    # Reverse the integer\n    pass\n\nfor n in [121, -121, 10, 12321]:\n    print(f"{n}: {is_palindrome(n)}")\n',
    solution: 'def is_palindrome(n):\n    if n < 0: return False\n    original, reversed_n = n, 0\n    while n > 0:\n        reversed_n = reversed_n * 10 + n % 10\n        n //= 10\n    return original == reversed_n\n\nfor n in [121, -121, 10, 12321]:\n    print(f"{n}: {is_palindrome(n)}")',
    explanation: 'Extract last digit with <code>n % 10</code>, build reversed number by multiplying by 10 each time. Compare with original.'
  },
  {
    title: 'Roman Numerals Converter', difficulty: 'medium', topic: 'Strings',
    description: 'Convert an integer (1–3999) to its Roman numeral representation.',
    examples: [
      { input: '2024', output: 'MMXXIV' },
      { input: '58', output: 'LVIII' }
    ],
    hints: ['Build a value-symbol table in descending order', 'Greedily subtract largest fitting value'],
    starter: 'def to_roman(num):\n    values = [1000,900,500,400,100,90,50,40,10,9,5,4,1]\n    symbols = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"]\n    result = ""\n    # Build roman numeral\n    return result\n\nfor n in [3, 58, 1994, 2024]:\n    print(f"{n} = {to_roman(n)}")\n',
    solution: 'def to_roman(num):\n    values = [1000,900,500,400,100,90,50,40,10,9,5,4,1]\n    symbols = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"]\n    result = ""\n    for v, s in zip(values, symbols):\n        while num >= v:\n            result += s\n            num -= v\n    return result\n\nfor n in [3, 58, 1994, 2024]:\n    print(f"{n} = {to_roman(n)}")',
    explanation: 'Greedy approach: repeatedly subtract the largest Roman value that fits and append its symbol.'
  },
  {
    title: 'Spiral Matrix', difficulty: 'medium', topic: 'Algorithms',
    description: 'Given an n×n matrix, print all elements in spiral (clockwise) order.',
    examples: [
      { input: '3×3 matrix', output: '1 2 3 6 9 8 7 4 5' }
    ],
    hints: ['Track top/bottom/left/right boundaries', 'Peel one layer at a time'],
    starter: 'def spiral_order(matrix):\n    result = []\n    # Traverse in spiral\n    return result\n\nm = [[1,2,3],[4,5,6],[7,8,9]]\nprint(*spiral_order(m))\n',
    solution: 'def spiral_order(matrix):\n    result = []\n    top, bottom, left, right = 0, len(matrix)-1, 0, len(matrix[0])-1\n    while top <= bottom and left <= right:\n        for c in range(left, right+1): result.append(matrix[top][c])\n        top += 1\n        for r in range(top, bottom+1): result.append(matrix[r][right])\n        right -= 1\n        if top <= bottom:\n            for c in range(right, left-1, -1): result.append(matrix[bottom][c])\n            bottom -= 1\n        if left <= right:\n            for r in range(bottom, top-1, -1): result.append(matrix[r][left])\n            left += 1\n    return result\n\nm = [[1,2,3],[4,5,6],[7,8,9]]\nprint(*spiral_order(m))',
    explanation: 'Maintain four boundary pointers. Each loop iteration peels one full ring: right → down → left → up, then shrink boundaries.'
  },
  {
    title: 'Balanced Parentheses', difficulty: 'medium', topic: 'Stack',
    description: 'Check if a string of brackets <code>()[]&#123;&#125;</code> is balanced (every open bracket has a matching close).',
    examples: [
      { input: '({[]})', output: 'True' },
      { input: '([)]', output: 'False' }
    ],
    hints: ['Use a stack', 'Push on open, pop on close', 'Stack should be empty at end'],
    starter: 'def is_balanced(s):\n    stack = []\n    pairs = {")":"(", "]":"[", "}":"{"}\n    for ch in s:\n        # push or pop\n        pass\n    return len(stack) == 0\n\nfor s in ["({[]})", "([)]", "{[]}", "((("]: \n    print(f"{s}: {is_balanced(s)}")\n',
    solution: 'def is_balanced(s):\n    stack = []\n    pairs = {")":"(", "]":"[", "}":"{"}\n    for ch in s:\n        if ch in "([{":\n            stack.append(ch)\n        elif ch in ")]}":\n            if not stack or stack[-1] != pairs[ch]:\n                return False\n            stack.pop()\n    return len(stack) == 0\n\nfor s in ["({[]})", "([)]", "{[]}", "((("]: \n    print(f"{s}: {is_balanced(s)}")',
    explanation: 'Stack tracks opening brackets. When we see a closing bracket, we verify the top of the stack is the matching opener.'
  },
  {
    title: 'String Compression', difficulty: 'medium', topic: 'Strings',
    description: 'Compress a string using run-length encoding: <code>aabcccdd</code> → <code>a2b1c3d2</code>. If compressed isn\'t shorter, return original.',
    examples: [
      { input: 'aabcccdd', output: 'a2b1c3d2' },
      { input: 'abc', output: 'abc' }
    ],
    hints: ['Track current char and count', 'Append char+count on change', 'Compare lengths at end'],
    starter: 'def compress(s):\n    if not s: return s\n    result = ""\n    count = 1\n    for i in range(1, len(s)):\n        # Count consecutive chars\n        pass\n    return result if len(result) < len(s) else s\n\nfor s in ["aabcccdd", "abc", "aaaa"]:\n    print(f"{s} -> {compress(s)}")\n',
    solution: 'def compress(s):\n    if not s: return s\n    result = ""\n    count = 1\n    for i in range(1, len(s)):\n        if s[i] == s[i-1]:\n            count += 1\n        else:\n            result += s[i-1] + str(count)\n            count = 1\n    result += s[-1] + str(count)\n    return result if len(result) < len(s) else s\n\nfor s in ["aabcccdd", "abc", "aaaa"]:\n    print(f"{s} -> {compress(s)}")',
    explanation: 'Track consecutive characters, appending char+count on transitions. Only return if compression actually reduces length.'
  },
  {
    title: 'Rotate Array', difficulty: 'medium', topic: 'Arrays',
    description: 'Rotate an array to the right by k steps in-place.',
    examples: [
      { input: '[1,2,3,4,5,6,7], k=3', output: '[5,6,7,1,2,3,4]' }
    ],
    hints: ['k % len(arr) handles k > n', 'Reverse entire array, then reverse each part', 'Or use slicing'],
    starter: 'def rotate(arr, k):\n    n = len(arr)\n    k = k % n\n    # Rotate in-place\n    pass\n\narr = [1,2,3,4,5,6,7]\nrotate(arr, 3)\nprint(arr)\n',
    solution: 'def rotate(arr, k):\n    n = len(arr)\n    k = k % n\n    arr[:] = arr[-k:] + arr[:-k]\n\narr = [1,2,3,4,5,6,7]\nrotate(arr, 3)\nprint(arr)',
    explanation: 'Slicing: take the last k elements and prepend them. <code>k % n</code> handles cases where k > n. The <code>arr[:]</code> modifies in-place.'
  },
  {
    title: 'Find Duplicates', difficulty: 'medium', topic: 'Algorithms',
    description: 'Find all duplicate elements in a list and return them.',
    examples: [
      { input: '[1,2,3,2,4,3,5]', output: '[2, 3]' }
    ],
    hints: ['Use a set to track seen elements', 'Another set for duplicates'],
    starter: 'def find_duplicates(nums):\n    seen = set()\n    dupes = set()\n    for n in nums:\n        pass  # track duplicates\n    return sorted(dupes)\n\nprint(find_duplicates([1,2,3,2,4,3,5]))\nprint(find_duplicates([4,3,2,7,8,2,3,1]))\n',
    solution: 'def find_duplicates(nums):\n    seen = set()\n    dupes = set()\n    for n in nums:\n        if n in seen:\n            dupes.add(n)\n        else:\n            seen.add(n)\n    return sorted(dupes)\n\nprint(find_duplicates([1,2,3,2,4,3,5]))\nprint(find_duplicates([4,3,2,7,8,2,3,1]))',
    explanation: 'Two sets: <code>seen</code> tracks visited numbers, <code>dupes</code> captures numbers seen more than once. O(n) time and space.'
  },
  {
    title: 'Zip and Unzip Dictionaries', difficulty: 'medium', topic: 'Dictionaries',
    description: 'Merge two lists into a dictionary, then reverse it (swap keys and values).',
    examples: [
      { output: '{\'a\':1,\'b\':2,\'c\':3}\n{1:\'a\',2:\'b\',3:\'c\'}' }
    ],
    hints: ['dict(zip(keys, values))', '{v: k for k, v in d.items()} reverses'],
    starter: 'keys = ["a", "b", "c"]\nvalues = [1, 2, 3]\n# Create dict, then reverse it\n',
    solution: 'keys = ["a", "b", "c"]\nvalues = [1, 2, 3]\nd = dict(zip(keys, values))\nprint(d)\nreversed_d = {v: k for k, v in d.items()}\nprint(reversed_d)',
    explanation: '<code>zip()</code> pairs elements by position. A dict comprehension with swapped k/v reverses the mapping.'
  },
  {
    title: 'Exception Handling Chain', difficulty: 'medium', topic: 'Exceptions',
    description: 'Build a robust input parser that handles ValueError, ZeroDivisionError, and a custom exception.',
    examples: [
      { output: 'Error: invalid literal for int()\nError: division by zero\nCustom: Value too large' }
    ],
    hints: ['try/except/else/finally', 'Raise custom exceptions with class MyError(Exception):', 'Chain exceptions with raise X from Y'],
    starter: 'class ValueTooLargeError(Exception):\n    pass\n\ndef safe_divide(a_str, b_str):\n    try:\n        a = int(a_str)\n        b = int(b_str)\n        if a > 1000:\n            raise ValueTooLargeError(f"Value too large: {a}")\n        return a / b\n    except ValueError as e:\n        print(f"Error: {e}")\n    except ZeroDivisionError:\n        print("Error: division by zero")\n    except ValueTooLargeError as e:\n        print(f"Custom: {e}")\n    return None\n\nsafe_divide("abc", "2")\nsafe_divide("10", "0")\nsafe_divide("5000", "2")\nprint("Result:", safe_divide("10", "2"))\n',
    solution: 'class ValueTooLargeError(Exception):\n    pass\n\ndef safe_divide(a_str, b_str):\n    try:\n        a = int(a_str)\n        b = int(b_str)\n        if a > 1000:\n            raise ValueTooLargeError(f"Value too large: {a}")\n        return a / b\n    except ValueError as e:\n        print(f"Error: {e}")\n    except ZeroDivisionError:\n        print("Error: division by zero")\n    except ValueTooLargeError as e:\n        print(f"Custom: {e}")\n    return None\n\nsafe_divide("abc", "2")\nsafe_divide("10", "0")\nsafe_divide("5000", "2")\nprint("Result:", safe_divide("10", "2"))',
    explanation: 'Multiple <code>except</code> blocks catch specific exceptions in order. Custom exceptions extend <code>Exception</code> and can carry messages.'
  },
  {
    title: 'defaultdict Counter', difficulty: 'medium', topic: 'Dictionaries',
    description: 'Use <code>collections.defaultdict</code> to group words by their first letter.',
    examples: [
      { output: 'a: [\'apple\', \'avocado\']\nb: [\'banana\', \'blueberry\']\nc: [\'cherry\']' }
    ],
    hints: ['from collections import defaultdict', 'defaultdict(list) auto-creates empty lists'],
    starter: 'from collections import defaultdict\nwords = ["apple","banana","cherry","avocado","blueberry"]\n# Group by first letter\n',
    solution: 'from collections import defaultdict\nwords = ["apple","banana","cherry","avocado","blueberry"]\ngroups = defaultdict(list)\nfor w in words:\n    groups[w[0]].append(w)\nfor letter in sorted(groups):\n    print(f"{letter}: {groups[letter]}")',
    explanation: '<code>defaultdict(list)</code> automatically creates an empty list for new keys, eliminating the need to check if a key exists first.'
  },
  {
    title: 'Zip Longest Merger', difficulty: 'medium', topic: 'Itertools',
    description: 'Use <code>itertools</code> to interleave two lists of different lengths, filling missing values with 0.',
    examples: [
      { output: '[(1,10),(2,20),(3,0),(4,0)]' }
    ],
    hints: ['from itertools import zip_longest', 'fillvalue parameter'],
    starter: 'from itertools import zip_longest\na = [1, 2, 3, 4]\nb = [10, 20]\n# Merge with fillvalue=0\n',
    solution: 'from itertools import zip_longest\na = [1, 2, 3, 4]\nb = [10, 20]\nresult = list(zip_longest(a, b, fillvalue=0))\nprint(result)',
    explanation: '<code>zip_longest</code> continues until the longest iterable is exhausted, filling shorter ones with <code>fillvalue</code>.'
  },
  {
    title: 'Two Sum Indices', difficulty: 'medium', topic: 'Arrays',
    description: 'Given a hardcoded list of integers and a target, find the indices of the two numbers that add up to the target. Print them as a list.',
    examples: [
      { output: '[0, 1]', explanation: 'nums=[2,7,11,15], target=9. nums[0]+nums[1]=9' }
    ],
    hints: ['Use a hash map: for each number, check if (target - number) has been seen'],
    starter: 'nums = [2, 7, 11, 15]\ntarget = 9\n# Find indices of the two numbers that sum to target\n',
    solution: 'nums = [2, 7, 11, 15]\ntarget = 9\nseen = {}\nfor i, n in enumerate(nums):\n    complement = target - n\n    if complement in seen:\n        print([seen[complement], i])\n        break\n    seen[n] = i',
    explanation: 'Store each value\'s index in a dict. For each number, check if its complement (target - n) is already stored. O(n) time.'
  },
  {
    title: 'Count Occurrences', difficulty: 'medium', topic: 'Strings',
    description: 'Read a string and a word. Print how many times the word appears in the string (case-insensitive).',
    examples: [
      { input: 'The cat sat on the mat, then cat', output: '2' }
    ],
    hints: ['Convert to lowercase, then use split() and count()'],
    starter: 's = input("String: ")\nword = input("Word: ")\n',
    solution: 's = input("String: ")\nword = input("Word: ")\nprint(s.lower().split().count(word.lower()))',
    explanation: 'Lowercase both, split into words, and use <code>list.count()</code> to count exact matches.'
  },
  {
    title: 'Matrix Transpose', difficulty: 'medium', topic: 'Arrays',
    description: 'Transpose a hardcoded 3×3 matrix and print each row.',
    examples: [
      { output: '1 4 7\n2 5 8\n3 6 9', explanation: 'rows become columns' }
    ],
    hints: ['Use zip(*matrix) to transpose', 'zip unpacks rows and regroups by column'],
    starter: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]\n# Transpose the matrix\n',
    solution: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]\nfor row in zip(*matrix):\n    print(*row)',
    explanation: '<code>zip(*matrix)</code> unpacks the rows as arguments to zip, which groups corresponding elements — effectively transposing.'
  },
  {
    title: 'Longest Word', difficulty: 'medium', topic: 'Strings',
    description: 'Read a sentence and print the longest word. If tied, print the first one.',
    examples: [
      { input: 'the quick brown fox', output: 'quick' }
    ],
    hints: ['Split into words, use max() with key=len'],
    starter: 's = input("Sentence: ")\n',
    solution: 's = input("Sentence: ")\nwords = s.split()\nprint(max(words, key=len))',
    explanation: '<code>max(words, key=len)</code> finds the word with the greatest length. Ties go to the first occurrence.'
  },
  {
    title: 'Valid Parentheses Extended', difficulty: 'medium', topic: 'Stack',
    description: 'Check if a string of brackets <code>()[]&#123;&#125;</code> is valid (properly opened and closed). Print <code>Valid</code> or <code>Invalid</code>.',
    examples: [
      { input: '()[]{}', output: 'Valid' },
      { input: '([)]', output: 'Invalid' }
    ],
    hints: ['Use a stack. Push opening brackets, pop and match on closing ones'],
    starter: 's = input("Brackets: ")\n',
    solution: 's = input("Brackets: ")\nstack = []\npairs = {")": "(", "]": "[", "}": "{"}\nfor c in s:\n    if c in "([{":\n        stack.append(c)\n    elif c in ")]}":\n        if not stack or stack[-1] != pairs[c]:\n            print("Invalid")\n            exit()\n        stack.pop()\nprint("Valid" if not stack else "Invalid")',
    explanation: 'Use a stack: push openers, pop and verify match on closers. If the stack is empty at the end, all brackets matched.'
  },
  {
    title: 'Merge Two Sorted Lists', difficulty: 'medium', topic: 'Algorithms',
    description: 'Merge two hardcoded sorted lists into one sorted list without using <code>sorted()</code>.',
    examples: [
      { output: '[1, 2, 3, 4, 5, 6]', explanation: 'a=[1,3,5], b=[2,4,6]' }
    ],
    hints: ['Use two pointers, compare heads and advance the smaller one'],
    starter: 'a = [1, 3, 5]\nb = [2, 4, 6]\n# Merge into one sorted list\n',
    solution: 'a = [1, 3, 5]\nb = [2, 4, 6]\nresult = []\ni = j = 0\nwhile i < len(a) and j < len(b):\n    if a[i] <= b[j]:\n        result.append(a[i]); i += 1\n    else:\n        result.append(b[j]); j += 1\nresult.extend(a[i:])\nresult.extend(b[j:])\nprint(result)',
    explanation: 'Two pointers i and j walk each list. Always pick the smaller head element. Append any remaining tail when one list runs out.'
  },
  {
    title: 'Find Missing Number', difficulty: 'medium', topic: 'Arrays',
    description: 'Given a list containing n-1 numbers from 1 to n, find the missing number.',
    examples: [
      { output: '4', explanation: 'nums=[1,2,3,5,6], expected sum 1..6=21, actual sum=17, missing=4' }
    ],
    hints: ['Expected sum of 1..n is n*(n+1)/2'],
    starter: 'nums = [1, 2, 3, 5, 6]\n# Find the missing number\n',
    solution: 'nums = [1, 2, 3, 5, 6]\nn = len(nums) + 1\nprint(n * (n + 1) // 2 - sum(nums))',
    explanation: 'The sum of 1 to n is n*(n+1)/2. Subtract the actual sum to get the missing value.'
  },
  {
    title: 'Group By First Letter', difficulty: 'medium', topic: 'Dictionaries',
    description: 'Given a hardcoded list of words, group them by their first letter and print each group.',
    examples: [
      { output: 'a: [\'apple\', \'avocado\']\nb: [\'banana\']\nc: [\'cherry\', \'coconut\']' }
    ],
    hints: ['Use a defaultdict(list) and append each word'],
    starter: 'from collections import defaultdict\nwords = ["apple","banana","cherry","avocado","coconut"]\n',
    solution: 'from collections import defaultdict\nwords = ["apple","banana","cherry","avocado","coconut"]\ngroups = defaultdict(list)\nfor w in words:\n    groups[w[0]].append(w)\nfor k in sorted(groups):\n    print(f"{k}: {groups[k]}")',
    explanation: '<code>defaultdict(list)</code> auto-creates an empty list for new keys. Iterate sorted keys for consistent output.'
  },
  {
    title: 'Binary to Decimal', difficulty: 'medium', topic: 'Math',
    description: 'Read a binary string (e.g. <code>1010</code>) and print its decimal value without using <code>int(s, 2)</code>.',
    examples: [
      { input: '1010', output: '10' }
    ],
    hints: ['Iterate digits left to right: result = result * 2 + digit'],
    starter: 'b = input("Binary: ")\n# Convert to decimal manually\n',
    solution: 'b = input("Binary: ")\nresult = 0\nfor bit in b:\n    result = result * 2 + int(bit)\nprint(result)',
    explanation: 'Process each bit left to right. Shift the accumulated result left by doubling it, then add the current bit.'
  },
  {
    title: 'Rotate String', difficulty: 'medium', topic: 'Strings',
    description: 'Read a string and integer k. Print the string rotated left by k positions.',
    examples: [
      { input: 'abcdef, then 2', output: 'cdefab' }
    ],
    hints: ['Slicing: s[k:] + s[:k]'],
    starter: 's = input("String: ")\nk = int(input("Rotate by: "))\n',
    solution: 's = input("String: ")\nk = int(input("Rotate by: "))\nk = k % len(s)\nprint(s[k:] + s[:k])',
    explanation: 'A left rotation by k moves the first k characters to the end. <code>k % len(s)</code> handles k larger than the string length.'
  },
  {
    title: 'Run-Length Encoding', difficulty: 'medium', topic: 'Strings',
    description: 'Compress a string using run-length encoding. E.g. <code>aaabbc</code> → <code>a3b2c1</code>.',
    examples: [
      { input: 'aaabbc', output: 'a3b2c1' }
    ],
    hints: ['Track current character and its count; flush when character changes'],
    starter: 's = input("String: ")\n',
    solution: 's = input("String: ")\nif not s:\n    print("")\nelse:\n    result = ""\n    count = 1\n    for i in range(1, len(s)):\n        if s[i] == s[i-1]:\n            count += 1\n        else:\n            result += s[i-1] + str(count)\n            count = 1\n    result += s[-1] + str(count)\n    print(result)',
    explanation: 'Walk the string comparing each character to the previous. When a run ends, append the character and its count to the result.'
  },
  {
    title: 'Second Largest', difficulty: 'medium', topic: 'Lists',
    description: 'Find the second largest unique value in a list of integers.',
    examples: [
      { output: '7', explanation: 'nums=[3,1,4,1,5,9,2,6,5,3,5,7], sorted unique=[1,2,3,4,5,6,7,9], 2nd largest=7' }
    ],
    hints: ['Convert to a sorted set, then index from the end'],
    starter: 'nums = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 7]\n',
    solution: 'nums = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 7]\nunique = sorted(set(nums))\nprint(unique[-2])',
    explanation: 'Convert to a set to remove duplicates, sort ascending, and the second-to-last element is the second largest.'
  },
  {
    title: 'Number to Roman', difficulty: 'medium', topic: 'Strings',
    description: 'Convert an integer (1–3999) to a Roman numeral string.',
    examples: [
      { input: '1994', output: 'MCMXCIV' }
    ],
    hints: ['Use a list of (value, symbol) pairs, greedily subtract the largest fitting value'],
    starter: 'n = int(input("Number: "))\n',
    solution: 'n = int(input("Number: "))\nvals = [(1000,"M"),(900,"CM"),(500,"D"),(400,"CD"),(100,"C"),(90,"XC"),(50,"L"),(40,"XL"),(10,"X"),(9,"IX"),(5,"V"),(4,"IV"),(1,"I")]\nresult = ""\nfor v, s in vals:\n    while n >= v:\n        result += s\n        n -= v\nprint(result)',
    explanation: 'Greedy approach: for each Roman value from largest to smallest, repeatedly subtract and append the symbol while n >= value.'
  },
  {
    title: 'Prime Factorisation', difficulty: 'medium', topic: 'Math',
    description: 'Print the prime factors of a given integer.',
    examples: [
      { input: '360', output: '2 2 2 3 3 5' }
    ],
    hints: ['Divide by 2 first, then try odd numbers from 3 upwards'],
    starter: 'n = int(input("n: "))\n',
    solution: 'n = int(input("n: "))\nfactors = []\nd = 2\nwhile d * d <= n:\n    while n % d == 0:\n        factors.append(d)\n        n //= d\n    d += 1\nif n > 1:\n    factors.append(n)\nprint(*factors)',
    explanation: 'Trial division: keep dividing by d while divisible; increment d. Any remainder > 1 is itself a prime factor.'
  },
  {
    title: 'Most Common Element', difficulty: 'medium', topic: 'Dictionaries',
    description: 'Find and print the most frequently occurring element in a list.',
    examples: [
      { output: '3', explanation: 'nums=[1,2,3,2,3,3,4] → 3 appears 3 times' }
    ],
    hints: ['Use Counter from collections'],
    starter: 'from collections import Counter\nnums = [1, 2, 3, 2, 3, 3, 4]\n',
    solution: 'from collections import Counter\nnums = [1, 2, 3, 2, 3, 3, 4]\nc = Counter(nums)\nprint(c.most_common(1)[0][0])',
    explanation: '<code>Counter</code> counts occurrences. <code>most_common(1)</code> returns a list with the single most common (element, count) pair.'
  },
  {
    title: 'Pascal\'s Triangle Row', difficulty: 'medium', topic: 'Math',
    description: 'Print the nth row of Pascal\'s Triangle (0-indexed).',
    examples: [
      { input: '5', output: '1 5 10 10 5 1' }
    ],
    hints: ['C(n, k) = C(n, k-1) * (n-k+1) / k'],
    starter: 'n = int(input("Row: "))\n',
    solution: 'n = int(input("Row: "))\nrow = [1]\nfor k in range(1, n + 1):\n    row.append(row[-1] * (n - k + 1) // k)\nprint(*row)',
    explanation: 'Each element is computed from the previous using the recurrence C(n,k) = C(n,k-1) * (n-k+1) / k.'
  },
  {
    title: 'Zip to Dictionary', difficulty: 'medium', topic: 'Comprehensions',
    description: 'Given two lists, create a dictionary where each key maps to the square of its paired value.',
    examples: [
      { output: '{\'a\': 1, \'b\': 4, \'c\': 9}', explanation: 'keys=[\'a\',\'b\',\'c\'], vals=[1,2,3]' }
    ],
    hints: ['Dict comprehension: {k: v**2 for k, v in zip(...)}'],
    starter: 'keys = ["a", "b", "c"]\nvals = [1, 2, 3]\n',
    solution: 'keys = ["a", "b", "c"]\nvals = [1, 2, 3]\nprint({k: v**2 for k, v in zip(keys, vals)})',
    explanation: 'Dict comprehension pairs each key with the square of its corresponding value using <code>zip</code>.'
  },
  {
    title: 'Recursive Sum of List', difficulty: 'medium', topic: 'Recursion',
    description: 'Compute the sum of a list recursively (no loops, no built-in sum).',
    examples: [
      { output: '15', explanation: 'nums=[1,2,3,4,5]' }
    ],
    hints: ['Base case: empty list → 0. Recursive: first + sum(rest)'],
    starter: 'def rec_sum(lst):\n    # Implement recursively\n    pass\n\nnums = [1, 2, 3, 4, 5]\nprint(rec_sum(nums))\n',
    solution: 'def rec_sum(lst):\n    if not lst:\n        return 0\n    return lst[0] + rec_sum(lst[1:])\n\nnums = [1, 2, 3, 4, 5]\nprint(rec_sum(nums))',
    explanation: 'Base case is an empty list (return 0). Recursive case: add the first element to the sum of the rest.'
  },
  {
    title: 'String Permutations', difficulty: 'medium', topic: 'Recursion',
    description: 'Print all permutations of a short string in alphabetical order.',
    examples: [
      { input: 'abc', output: 'abc\nacb\nbac\nbca\ncab\ncba' }
    ],
    hints: ['Use itertools.permutations or implement recursively'],
    starter: 'from itertools import permutations\ns = input("String: ")\n',
    solution: 'from itertools import permutations\ns = input("String: ")\nfor p in sorted(permutations(s)):\n    print("".join(p))',
    explanation: '<code>itertools.permutations(s)</code> yields all orderings as tuples. Sort them and join each to a string.'
  },
  {
    title: 'Chunk List', difficulty: 'medium', topic: 'Lists',
    description: 'Split a list into chunks of size k. Print each chunk.',
    examples: [
      { output: '[1, 2, 3]\n[4, 5, 6]\n[7, 8]', explanation: 'lst=[1..8], k=3' }
    ],
    hints: ['Use range(0, len(lst), k) to step through start indices'],
    starter: 'lst = list(range(1, 9))\nk = 3\n',
    solution: 'lst = list(range(1, 9))\nk = 3\nfor i in range(0, len(lst), k):\n    print(lst[i:i+k])',
    explanation: 'Step through the list with stride k. <code>lst[i:i+k]</code> extracts each chunk; the last one is automatically shorter if needed.'
  },
  {
    title: 'Flatten Dict Keys', difficulty: 'medium', topic: 'Dictionaries',
    description: 'Given a nested dictionary, print all keys at every level (order: outer then inner).',
    examples: [
      { output: 'name\naddress\ncity\nzip', explanation: 'd = {\'name\':\'Alice\',\'address\':{\'city\':\'NY\',\'zip\':\'10001\'}}' }
    ],
    hints: ['Recurse: if value is a dict, call the function on it'],
    starter: 'd = {"name": "Alice", "address": {"city": "NY", "zip": "10001"}}\n',
    solution: 'd = {"name": "Alice", "address": {"city": "NY", "zip": "10001"}}\ndef print_keys(obj):\n    for k, v in obj.items():\n        print(k)\n        if isinstance(v, dict):\n            print_keys(v)\nprint_keys(d)',
    explanation: 'Recursively walk the dictionary. Print each key, and if the value is also a dict, descend into it.'
  },
  {
    title: 'Moving Average', difficulty: 'medium', topic: 'Algorithms',
    description: 'Compute the moving average of a list with window size k. Print each window average.',
    examples: [
      { output: '2.0\n3.0\n4.0\n5.0\n6.0', explanation: 'nums=[1,2,3,4,5,6,7], k=3' }
    ],
    hints: ['Use a sliding window: sum first k, then add new and remove old'],
    starter: 'nums = [1, 2, 3, 4, 5, 6, 7]\nk = 3\n',
    solution: 'nums = [1, 2, 3, 4, 5, 6, 7]\nk = 3\nwindow_sum = sum(nums[:k])\nfor i in range(len(nums) - k + 1):\n    if i > 0:\n        window_sum += nums[i + k - 1] - nums[i - 1]\n    print(window_sum / k)',
    explanation: 'Compute the first window sum, then slide: add the new element entering the window and subtract the one leaving.'
  },
  {
    title: 'Count Islands', difficulty: 'medium', topic: 'Algorithms',
    description: 'Count the number of islands (connected groups of 1s) in a 2D grid using DFS.',
    examples: [
      { output: '3', explanation: 'grid has three separate groups of 1s' }
    ],
    hints: ['DFS from each unvisited 1, marking cells visited as you go'],
    starter: 'grid = [\n    [1,1,0,0,0],\n    [1,0,0,1,1],\n    [0,0,0,1,0],\n    [0,0,0,0,0],\n    [1,0,1,0,1]\n]\n',
    solution: 'grid = [\n    [1,1,0,0,0],\n    [1,0,0,1,1],\n    [0,0,0,1,0],\n    [0,0,0,0,0],\n    [1,0,1,0,1]\n]\nrows, cols = len(grid), len(grid[0])\ndef dfs(r, c):\n    if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != 1:\n        return\n    grid[r][c] = 0\n    for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:\n        dfs(r+dr, c+dc)\ncount = 0\nfor r in range(rows):\n    for c in range(cols):\n        if grid[r][c] == 1:\n            dfs(r, c)\n            count += 1\nprint(count)',
    explanation: 'DFS from each unvisited land cell (1), marking all connected cells as visited (0). Each DFS call corresponds to one island.'
  },
  {
    title: 'Stock Buy and Sell', difficulty: 'medium', topic: 'Algorithms',
    description: 'Given daily stock prices, find the maximum profit from one buy and one sell (buy before sell).',
    examples: [
      { output: '5', explanation: 'prices=[7,1,5,3,6,4] → buy at 1, sell at 6' }
    ],
    hints: ['Track the minimum price seen so far; profit = current - min_so_far'],
    starter: 'prices = [7, 1, 5, 3, 6, 4]\n',
    solution: 'prices = [7, 1, 5, 3, 6, 4]\nmin_price = float("inf")\nmax_profit = 0\nfor p in prices:\n    min_price = min(min_price, p)\n    max_profit = max(max_profit, p - min_price)\nprint(max_profit)',
    explanation: 'Scan left to right. Track the minimum price seen; the best profit for each day is price - min_price. Keep the global max.'
  },
  {
    title: 'Spiral Order Print', difficulty: 'medium', topic: 'Arrays',
    description: 'Print all elements of a hardcoded matrix in spiral order.',
    examples: [
      { output: '1 2 3 6 9 8 7 4 5', explanation: '3×3 matrix traversed clockwise from top-left' }
    ],
    hints: ['Peel the matrix layer by layer: top row, right col, bottom row (reversed), left col (reversed)'],
    starter: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]\n',
    solution: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]\nresult = []\nwhile matrix:\n    result += matrix.pop(0)\n    matrix = list(zip(*matrix))[::-1]\nprint(*result)',
    explanation: 'Pop the top row and rotate the remaining matrix 90° anti-clockwise each iteration. Repeat until empty.'
  },
  {
    title: 'Anagram Groups', difficulty: 'medium', topic: 'Strings',
    description: 'Group a list of words into anagram clusters and print each group sorted.',
    examples: [
      { output: '[\'eat\', \'tea\', \'ate\']\n[\'tan\', \'nat\']\n[\'bat\']' }
    ],
    hints: ['Use a dict keyed by the sorted letters of each word'],
    starter: 'from collections import defaultdict\nwords = ["eat","tea","tan","ate","nat","bat"]\n',
    solution: 'from collections import defaultdict\nwords = ["eat","tea","tan","ate","nat","bat"]\ngroups = defaultdict(list)\nfor w in words:\n    groups[tuple(sorted(w))].append(w)\nfor g in groups.values():\n    print(g)',
    explanation: 'Sorting the letters of a word gives a canonical key. Words with the same key are anagrams of each other.'
  },
  {
    title: 'Tower of Hanoi', difficulty: 'medium', topic: 'Recursion',
    description: 'Print all moves to solve the Tower of Hanoi for n disks.',
    examples: [
      { input: '3', output: 'A -> C\nA -> B\nC -> B\nA -> C\nB -> A\nB -> C\nA -> C' }
    ],
    hints: ['Recursive: move n-1 from src to aux, move disk from src to dst, move n-1 from aux to dst'],
    starter: 'def hanoi(n, src, dst, aux):\n    # Implement recursively\n    pass\n\nn = int(input("Disks: "))\nhanoi(n, "A", "C", "B")\n',
    solution: 'def hanoi(n, src, dst, aux):\n    if n == 0:\n        return\n    hanoi(n-1, src, aux, dst)\n    print(f"{src} -> {dst}")\n    hanoi(n-1, aux, dst, src)\n\nn = int(input("Disks: "))\nhanoi(n, "A", "C", "B")',
    explanation: 'Recursively move n-1 disks to the auxiliary peg, move the nth disk directly, then move n-1 disks from aux to destination.'
  },
  {
    title: 'String Compression v2', difficulty: 'medium', topic: 'Strings',
    description: 'Given a string, return the compressed version only if it is shorter than the original; otherwise return the original.',
    examples: [
      { input: 'aabcccccaaa', output: 'a2b1c5a3' },
      { input: 'abcd', output: 'abcd', explanation: 'a1b1c1d1 is longer, so return original' }
    ],
    hints: ['Build the compressed string first, then compare lengths'],
    starter: 's = input("String: ")\n',
    solution: 's = input("String: ")\ncompressed = ""\ncount = 1\nfor i in range(1, len(s)):\n    if s[i] == s[i-1]:\n        count += 1\n    else:\n        compressed += s[i-1] + str(count)\n        count = 1\ncompressed += s[-1] + str(count)\nprint(compressed if len(compressed) < len(s) else s)',
    explanation: 'Build the run-length compressed string and compare its length to the original. Return whichever is shorter.'
  },
  {
    title: 'Longest Palindromic Substring', difficulty: 'medium', topic: 'Strings',
    description: 'Find the longest palindromic substring in a given string.',
    examples: [
      { input: 'babad', output: 'bab' },
      { input: 'racecar', output: 'racecar' }
    ],
    hints: ['Expand around each center (single char and pair) to find palindromes'],
    starter: 's = input("String: ")\n',
    solution: 's = input("String: ")\ndef expand(l, r):\n    while l >= 0 and r < len(s) and s[l] == s[r]:\n        l -= 1; r += 1\n    return s[l+1:r]\nbest = ""\nfor i in range(len(s)):\n    for sub in (expand(i,i), expand(i,i+1)):\n        if len(sub) > len(best):\n            best = sub\nprint(best)',
    explanation: 'For each index, expand outward in both odd and even modes as long as characters match. Track the longest found palindrome.'
  },
  {
    title: 'Decode Ways', difficulty: 'medium', topic: 'Dynamic Programming',
    description: 'Count the number of ways to decode a digit string where A=1...Z=26.',
    examples: [
      { input: '226', output: '3', explanation: 'BZ, VF, BBF' },
      { input: '06', output: '0' }
    ],
    hints: ['DP: dp[i] depends on dp[i-1] (single digit) and dp[i-2] (two digits 10-26)'],
    starter: 's = input("Digits: ")\n',
    solution: 's = input("Digits: ")\nif not s or s[0] == "0":\n    print(0)\nelse:\n    n = len(s)\n    dp = [0] * (n + 1)\n    dp[0] = dp[1] = 1\n    for i in range(2, n + 1):\n        if s[i-1] != "0":\n            dp[i] += dp[i-1]\n        two = int(s[i-2:i])\n        if 10 <= two <= 26:\n            dp[i] += dp[i-2]\n    print(dp[n])',
    explanation: 'dp[i] = number of ways to decode the first i digits. A valid single digit (1-9) uses dp[i-1]; a valid two-digit number (10-26) uses dp[i-2].'
  },
  {
    title: 'Valid Sudoku', difficulty: 'medium', topic: 'Arrays',
    description: 'Check if a partially filled 9×9 Sudoku grid is valid (no row, column, or 3×3 box contains duplicates 1-9). Zeros mean empty.',
    examples: [
      { output: 'True' }
    ],
    hints: ['Use sets to track seen numbers per row, column, and box'],
    starter: 'grid = [\n  [5,3,0,0,7,0,0,0,0],[6,0,0,1,9,5,0,0,0],[0,9,8,0,0,0,0,6,0],\n  [8,0,0,0,6,0,0,0,3],[4,0,0,8,0,3,0,0,1],[7,0,0,0,2,0,0,0,6],\n  [0,6,0,0,0,0,2,8,0],[0,0,0,4,1,9,0,0,5],[0,0,0,0,8,0,0,7,9]\n]\n',
    solution: 'grid = [\n  [5,3,0,0,7,0,0,0,0],[6,0,0,1,9,5,0,0,0],[0,9,8,0,0,0,0,6,0],\n  [8,0,0,0,6,0,0,0,3],[4,0,0,8,0,3,0,0,1],[7,0,0,0,2,0,0,0,6],\n  [0,6,0,0,0,0,2,8,0],[0,0,0,4,1,9,0,0,5],[0,0,0,0,8,0,0,7,9]\n]\nrows = [set() for _ in range(9)]\ncols = [set() for _ in range(9)]\nboxes = [set() for _ in range(9)]\nvalid = True\nfor r in range(9):\n    for c in range(9):\n        v = grid[r][c]\n        if v == 0: continue\n        b = (r//3)*3 + c//3\n        if v in rows[r] or v in cols[c] or v in boxes[b]:\n            valid = False; break\n        rows[r].add(v); cols[c].add(v); boxes[b].add(v)\nprint(valid)',
    explanation: 'For each non-empty cell, check if its value already appears in the same row, column, or 3×3 box. Box index = (row//3)*3 + col//3.'
  },
  {
    title: 'Balanced Binary Tree Check', difficulty: 'medium', topic: 'Data Structures',
    description: 'Check if a binary tree (nested list format) is height-balanced (left and right subtree heights differ by at most 1).',
    examples: [
      { output: 'True\nFalse' }
    ],
    hints: ['Recursive: return -1 if unbalanced, else height. Compare children\'s heights.'],
    starter: 'tree1 = [1, [2,[3,None,None],None], [3,None,None]]\ntree2 = [1, [2,[3,[4,None,None],None],None], [3,None,None]]\n\ndef is_balanced(node):\n    pass\n\nprint(is_balanced(tree1))\nprint(is_balanced(tree2))\n',
    solution: 'tree1 = [1, [2,[3,None,None],None], [3,None,None]]\ntree2 = [1, [2,[3,[4,None,None],None],None], [3,None,None]]\n\ndef height(node):\n    if node is None: return 0\n    _, l, r = node\n    lh, rh = height(l), height(r)\n    if lh == -1 or rh == -1 or abs(lh - rh) > 1: return -1\n    return max(lh, rh) + 1\n\ndef is_balanced(node):\n    return height(node) != -1\n\nprint(is_balanced(tree1))\nprint(is_balanced(tree2))',
    explanation: 'Return -1 as a sentinel for "unbalanced". If either subtree is unbalanced, or heights differ by more than 1, propagate -1 up the tree.'
  },
  {
    title: 'Product of Array Except Self', difficulty: 'medium', topic: 'Arrays',
    description: 'Return a list where each element is the product of all other elements, without using division.',
    examples: [
      { output: '[24, 12, 8, 6]', explanation: 'nums=[1,2,3,4]' }
    ],
    hints: ['Build prefix products left-to-right, then multiply suffix products right-to-left'],
    starter: 'nums = [1, 2, 3, 4]\n',
    solution: 'nums = [1, 2, 3, 4]\nn = len(nums)\nresult = [1] * n\nprefix = 1\nfor i in range(n):\n    result[i] = prefix\n    prefix *= nums[i]\nsuffix = 1\nfor i in range(n-1, -1, -1):\n    result[i] *= suffix\n    suffix *= nums[i]\nprint(result)',
    explanation: 'Two passes: left pass stores prefix products; right pass multiplies in suffix products. No division and O(n) time.'
  },
  {
    title: 'Subarray Sum Equals K', difficulty: 'medium', topic: 'Arrays',
    description: 'Count the number of contiguous subarrays whose sum equals k.',
    examples: [
      { output: '2', explanation: 'nums=[1,1,1], k=2' }
    ],
    hints: ['Use a prefix sum with a hash map counting occurrences of each prefix sum'],
    starter: 'nums = [1, 1, 1]\nk = 2\n',
    solution: 'nums = [1, 1, 1]\nk = 2\nfrom collections import defaultdict\ncount = prefix = 0\nseen = defaultdict(int)\nseen[0] = 1\nfor n in nums:\n    prefix += n\n    count += seen[prefix - k]\n    seen[prefix] += 1\nprint(count)',
    explanation: 'If prefix[j] - prefix[i] == k, the subarray i+1..j sums to k. Count how many earlier prefix sums equal current_prefix - k.'
  },
  {
    title: 'Rotate Image 90°', difficulty: 'medium', topic: 'Arrays',
    description: 'Rotate a hardcoded n×n matrix 90° clockwise in-place. Print each row.',
    examples: [
      { output: '7 4 1\n8 5 2\n9 6 3' }
    ],
    hints: ['Transpose then reverse each row'],
    starter: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]\n# Rotate 90 degrees clockwise in-place\n',
    solution: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]\nn = len(matrix)\n# Transpose\nfor i in range(n):\n    for j in range(i+1, n):\n        matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]\n# Reverse each row\nfor row in matrix:\n    row.reverse()\nfor row in matrix:\n    print(*row)',
    explanation: 'A 90° clockwise rotation equals a transpose followed by reversing each row. Both steps are done in-place without extra memory.'
  },
  {
    title: 'Letter Combinations Phone', difficulty: 'medium', topic: 'Recursion',
    description: 'Given a digit string (2-9), print all letter combinations a phone keypad would produce.',
    examples: [
      { input: '23', output: 'ad ae af bd be bf cd ce cf' }
    ],
    hints: ['Map each digit to its letters. Build combinations recursively or iteratively.'],
    starter: 'digits = input("Digits: ")\n',
    solution: 'digits = input("Digits: ")\nphone = {"2":"abc","3":"def","4":"ghi","5":"jkl","6":"mno","7":"pqrs","8":"tuv","9":"wxyz"}\nresult = [""]\nfor d in digits:\n    result = [prev + c for prev in result for c in phone[d]]\nprint(*sorted(result))',
    explanation: 'Start with an empty string. For each digit, extend every existing combination by each of the digit\'s letters. This builds all combinations iteratively.'
  },
  {
    title: 'Majority Element', difficulty: 'medium', topic: 'Algorithms',
    description: 'Find the element that appears more than n/2 times in a list. Guaranteed to exist.',
    examples: [
      { output: '3', explanation: 'nums=[3,2,3]' }
    ],
    hints: ['Boyer-Moore Voting Algorithm: cancel pairs of different elements'],
    starter: 'nums = [2, 2, 1, 1, 1, 2, 2]\n',
    solution: 'nums = [2, 2, 1, 1, 1, 2, 2]\ncandidate = count = 0\nfor n in nums:\n    if count == 0:\n        candidate = n\n    count += 1 if n == candidate else -1\nprint(candidate)',
    explanation: 'Boyer-Moore: maintain a candidate and count. Increment if current matches, decrement otherwise. When count hits 0, reset. The majority element always survives.'
  },
  {
    title: 'Valid Mountain Array', difficulty: 'medium', topic: 'Arrays',
    description: 'A mountain array increases to a peak then decreases. Print <code>True</code> if the given array is a mountain.',
    examples: [
      { output: 'True', explanation: '[0,3,2,1]' },
      { output: 'False', explanation: '[3,5,5]' }
    ],
    hints: ['Find the peak index; check it\'s not at either end; verify both sides are strictly monotone'],
    starter: 'a = [0, 3, 2, 1]\nb = [3, 5, 5]\n\ndef is_mountain(arr):\n    pass\n\nprint(is_mountain(a))\nprint(is_mountain(b))\n',
    solution: 'def is_mountain(arr):\n    n = len(arr)\n    if n < 3: return False\n    peak = arr.index(max(arr))\n    if peak == 0 or peak == n - 1: return False\n    return all(arr[i] < arr[i+1] for i in range(peak)) and \\\n           all(arr[i] > arr[i+1] for i in range(peak, n-1))\n\nprint(is_mountain([0, 3, 2, 1]))\nprint(is_mountain([3, 5, 5]))',
    explanation: 'Locate the peak (max value). It must not be at either end. The left side must strictly increase and the right side must strictly decrease.'
  },
  {
    title: 'Interval Merge', difficulty: 'medium', topic: 'Algorithms',
    description: 'Merge overlapping intervals and print the result.',
    examples: [
      { output: '[[1, 6], [8, 10], [15, 18]]', explanation: 'intervals=[[1,3],[2,6],[8,10],[15,18]]' }
    ],
    hints: ['Sort by start time. Merge if current start <= last merged end.'],
    starter: 'intervals = [[1,3],[2,6],[8,10],[15,18]]\n',
    solution: 'intervals = [[1,3],[2,6],[8,10],[15,18]]\nintervals.sort()\nmerged = [intervals[0]]\nfor start, end in intervals[1:]:\n    if start <= merged[-1][1]:\n        merged[-1][1] = max(merged[-1][1], end)\n    else:\n        merged.append([start, end])\nprint(merged)',
    explanation: 'Sort intervals by start. If the current interval\'s start overlaps with the last merged interval\'s end, extend it. Otherwise start a new merged interval.'
  },
  {
    title: 'Trie Autocomplete', difficulty: 'medium', topic: 'Data Structures',
    description: 'Build a Trie from a word list and implement autocomplete: given a prefix, return all matching words.',
    examples: [
      { output: '[\'apple\', \'app\', \'application\']' }
    ],
    hints: ['Each node is a dict of children plus an \'end\' flag. DFS from the prefix node to collect words.'],
    starter: 'words = ["app", "apple", "application", "banana", "band"]\nprefix = "app"\n',
    solution: 'class Trie:\n    def __init__(self):\n        self.root = {}\n    def insert(self, word):\n        node = self.root\n        for c in word:\n            node = node.setdefault(c, {})\n        node["#"] = True\n    def autocomplete(self, prefix):\n        node = self.root\n        for c in prefix:\n            if c not in node: return []\n            node = node[c]\n        results = []\n        self._dfs(node, prefix, results)\n        return results\n    def _dfs(self, node, path, res):\n        if node.get("#"): res.append(path)\n        for c, child in node.items():\n            if c != "#": self._dfs(child, path + c, res)\n\nt = Trie()\nwords = ["app", "apple", "application", "banana", "band"]\nfor w in words: t.insert(w)\nprint(t.autocomplete("app"))',
    explanation: 'Walk the trie to the end of the prefix, then DFS from that node collecting all paths that end at a "#" marker. Each such path is a complete word.'
  },
  {
    title: 'Max Depth Binary Tree', difficulty: 'medium', topic: 'Data Structures',
    description: 'Find the maximum depth of a binary tree (nested list format).',
    examples: [
      { output: '3', explanation: 'tree=[1,[2,[4,None,None],None],[3,None,None]]' }
    ],
    hints: ['Recursive: depth = 1 + max(depth(left), depth(right))'],
    starter: 'tree = [1, [2, [4,None,None], None], [3, None, None]]\n\ndef max_depth(node):\n    pass\n\nprint(max_depth(tree))\n',
    solution: 'tree = [1, [2, [4,None,None], None], [3, None, None]]\n\ndef max_depth(node):\n    if node is None: return 0\n    _, left, right = node\n    return 1 + max(max_depth(left), max_depth(right))\n\nprint(max_depth(tree))',
    explanation: 'Recursively compute the depth of both subtrees and return the larger one plus 1 (for the current node). Base case: None has depth 0.'
  },
  {
    title: 'Path Sum in Tree', difficulty: 'medium', topic: 'Data Structures',
    description: 'Check if a root-to-leaf path in a binary tree sums to a target. Print <code>True</code> or <code>False</code>.',
    examples: [
      { output: 'True', explanation: 'tree=[5,[4,[11,[7,N,N],[2,N,N]],N],[8,[13,N,N],[4,N,[1,N,N]]]], target=22' }
    ],
    hints: ['Recurse with remaining = target - node_val. Return True when a leaf has remaining == 0.'],
    starter: 'N = None\ntree = [5,[4,[11,[7,N,N],[2,N,N]],N],[8,[13,N,N],[4,N,[1,N,N]]]]\ntarget = 22\n',
    solution: 'N = None\ntree = [5,[4,[11,[7,N,N],[2,N,N]],N],[8,[13,N,N],[4,N,[1,N,N]]]]\ntarget = 22\n\ndef has_path(node, remaining):\n    if node is None: return False\n    val, left, right = node\n    remaining -= val\n    if left is None and right is None:\n        return remaining == 0\n    return has_path(left, remaining) or has_path(right, remaining)\n\nprint(has_path(tree, target))',
    explanation: 'Subtract the current node\'s value from the remaining target. At a leaf, check if remaining is exactly 0. If either subtree finds a path, return True.'
  },
  {
    title: 'Bitwise AND of Range', difficulty: 'medium', topic: 'Math',
    description: 'Find the bitwise AND of all integers in the range [left, right] inclusive.',
    examples: [
      { output: '4', explanation: 'left=5, right=7 → 5&6&7 = 4' },
      { output: '0', explanation: 'left=0, right=1' }
    ],
    hints: ['Find the common prefix bits: right-shift both until equal, then shift back left'],
    starter: 'left, right = 5, 7\n',
    solution: 'left, right = 5, 7\nshift = 0\nwhile left != right:\n    left >>= 1\n    right >>= 1\n    shift += 1\nprint(left << shift)',
    explanation: 'Any bit that differs between left and right gets zeroed by some AND in the range. Keep right-shifting both until equal — that is the common prefix. Shift back to restore position.'
  },
  {
    title: 'Zigzag Conversion', difficulty: 'medium', topic: 'Strings',
    description: 'Arrange a string in a zigzag pattern across n rows, then read row by row.',
    examples: [
      { input: 'PAYPALISHIRING, then 3', output: 'PAHNAPLSIIGYIR' }
    ],
    hints: ['Simulate rows with a list of strings; track current row and direction'],
    starter: 's = input("String: ")\nrows = int(input("Rows: "))\n',
    solution: 's = input("String: ")\nrows = int(input("Rows: "))\nif rows == 1:\n    print(s)\nelse:\n    grid = [""] * rows\n    row, step = 0, 1\n    for c in s:\n        grid[row] += c\n        if row == 0: step = 1\n        elif row == rows - 1: step = -1\n        row += step\n    print("".join(grid))',
    explanation: 'Distribute characters into row buckets, bouncing direction at the top and bottom rows. Reading the rows left-to-right gives the zigzag result.'
  },
  {
    title: 'Top K Frequent Words', difficulty: 'medium', topic: 'Algorithms',
    description: 'Return the k most frequent words from a list, sorted by frequency then alphabetically.',
    examples: [
      { output: '[\'i\', \'love\']', explanation: 'words=[\'i\',\'love\',\'leetcode\',\'i\',\'love\',\'coding\'], k=2' }
    ],
    hints: ['Use Counter, then sort by (-count, word)'],
    starter: 'from collections import Counter\nwords = ["i","love","leetcode","i","love","coding"]\nk = 2\n',
    solution: 'from collections import Counter\nwords = ["i","love","leetcode","i","love","coding"]\nk = 2\ncounts = Counter(words)\nresult = sorted(counts, key=lambda w: (-counts[w], w))[:k]\nprint(result)',
    explanation: 'Sort by negative frequency (so highest comes first) with the word itself as a tiebreaker for alphabetical order. Take the first k results.'
  },
  {
    title: 'Number of Islands II', difficulty: 'medium', topic: 'Algorithms',
    description: 'Count distinct islands in a grid using Union-Find instead of DFS.',
    examples: [
      { output: '3' }
    ],
    hints: ['Create a UF structure. For each land cell, union it with adjacent land cells. Count distinct roots.'],
    starter: 'grid = [\n    [1,1,0,0,0],\n    [1,0,0,0,0],\n    [0,0,0,1,1],\n    [0,0,0,0,0],\n    [0,0,1,0,0]\n]\n',
    solution: 'grid = [\n    [1,1,0,0,0],\n    [1,0,0,0,0],\n    [0,0,0,1,1],\n    [0,0,0,0,0],\n    [0,0,1,0,0]\n]\nR, C = len(grid), len(grid[0])\nparent = {}\ndef find(x):\n    while parent[x] != x: parent[x] = parent[parent[x]]; x = parent[x]\n    return x\ndef union(a, b):\n    a, b = find(a), find(b)\n    if a != b: parent[a] = b\nfor r in range(R):\n    for c in range(C):\n        if grid[r][c] == 1:\n            parent[(r,c)] = (r,c)\n            for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:\n                nr, nc = r+dr, c+dc\n                if 0<=nr<R and 0<=nc<C and grid[nr][nc]==1 and (nr,nc) in parent:\n                    union((r,c),(nr,nc))\nprint(len({find(x) for x in parent}))',
    explanation: 'Each land cell starts as its own component. Adjacent land cells are unioned. Counting unique roots gives the number of islands.'
  },
  {
    title: 'Unique Paths Grid', difficulty: 'medium', topic: 'Dynamic Programming',
    description: 'Count unique paths from top-left to bottom-right of an m×n grid, moving only right or down.',
    examples: [
      { output: '28', explanation: 'm=3, n=7' }
    ],
    hints: ['dp[i][j] = dp[i-1][j] + dp[i][j-1]. First row and column are all 1.'],
    starter: 'm, n = 3, 7\n',
    solution: 'm, n = 3, 7\ndp = [[1]*n for _ in range(m)]\nfor i in range(1, m):\n    for j in range(1, n):\n        dp[i][j] = dp[i-1][j] + dp[i][j-1]\nprint(dp[m-1][n-1])',
    explanation: 'At each cell you can only come from above or from the left. The first row and column always have exactly 1 path each.'
  },
  {
    title: 'Flatten Binary Tree to Linked List', difficulty: 'medium', topic: 'Data Structures',
    description: 'Flatten a binary tree into a linked list in-place (right pointers form the list, left pointers are None). Print values in order.',
    examples: [
      { output: '1 2 3 4 5 6' }
    ],
    hints: ['Morris traversal or recursive: flatten left, flatten right, insert left subtree between root and right'],
    starter: 'N = None\ntree = [1, [2,[3,N,N],[4,N,N]], [5,N,[6,N,N]]]\n',
    solution: 'N = None\ntree = [1, [2,[3,N,N],[4,N,N]], [5,N,[6,N,N]]]\n\ndef flatten(node):\n    if node is None: return None\n    val, left, right = node\n    flat_left = flatten(left)\n    flat_right = flatten(right)\n    node[1] = None\n    if flat_left:\n        node[2] = flat_left\n        cur = flat_left\n        while cur[2]: cur = cur[2]\n        cur[2] = flat_right\n    else:\n        node[2] = flat_right\n    return node\n\nnode = flatten(tree)\nwhile node:\n    print(node[0], end=" ")\n    node = node[2]\nprint()',
    explanation: 'Recursively flatten both subtrees. Attach the flattened left subtree as the right child of the root. Find the tail of that flattened list and connect the flattened right subtree.'
  },
  {
    title: 'Random Weighted Choice', difficulty: 'medium', topic: 'Algorithms',
    description: 'Given items with weights, implement a weighted random choice. Call it 1000 times and print approximate frequencies.',
    examples: [
      { output: 'a: ~500\nb: ~300\nc: ~200' }
    ],
    hints: ['Build a cumulative prefix sum, generate a random number, binary-search for its bucket'],
    starter: 'import random, bisect\nrandom.seed(42)\nitems   = ["a", "b", "c"]\nweights = [5, 3, 2]\n',
    solution: 'import random, bisect\nfrom collections import Counter\nrandom.seed(42)\nitems = ["a","b","c"]\nweights = [5, 3, 2]\ncumulative = []\ntotal = 0\nfor w in weights:\n    total += w\n    cumulative.append(total)\ncounts = Counter()\nfor _ in range(1000):\n    r = random.uniform(0, total)\n    idx = bisect.bisect_left(cumulative, r)\n    counts[items[idx]] += 1\nfor item in items:\n    print(f"{item}: {counts[item]}")',
    explanation: 'Build prefix sums of weights to create weighted buckets. A random number in [0, total) falls into a bucket determined by binary search.'
  },
  {
    title: 'Cycle Detection in Linked List', difficulty: 'medium', topic: 'Algorithms',
    description: 'Detect if a linked list has a cycle using Floyd\'s tortoise-and-hare algorithm.',
    examples: [
      { output: 'True', explanation: 'List with a back pointer creates a cycle' },
      { output: 'False' }
    ],
    hints: ['Slow pointer moves 1 step, fast moves 2. If they meet, there is a cycle.'],
    starter: 'class Node:\n    def __init__(self, val, nxt=None):\n        self.val = val; self.next = nxt\n\n# Build: 1->2->3->4->2 (cycle at node 2)\nn1,n2,n3,n4 = Node(1),Node(2),Node(3),Node(4)\nn1.next=n2; n2.next=n3; n3.next=n4; n4.next=n2\n\n# Build no-cycle list\nm1,m2,m3 = Node(1),Node(2),Node(3)\nm1.next=m2; m2.next=m3\n',
    solution: 'class Node:\n    def __init__(self, val, nxt=None):\n        self.val = val; self.next = nxt\n\nn1,n2,n3,n4 = Node(1),Node(2),Node(3),Node(4)\nn1.next=n2; n2.next=n3; n3.next=n4; n4.next=n2\n\nm1,m2,m3 = Node(1),Node(2),Node(3)\nm1.next=m2; m2.next=m3\n\ndef has_cycle(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n        if slow is fast: return True\n    return False\n\nprint(has_cycle(n1))\nprint(has_cycle(m1))',
    explanation: 'If a cycle exists, the fast pointer will eventually lap the slow pointer and they meet. If the fast pointer reaches None, there is no cycle.'
  },
  {
    title: 'Jump Game', difficulty: 'medium', topic: 'Algorithms',
    description: 'Given an array of jump lengths, determine if you can reach the last index from the first.',
    examples: [
      { output: 'True', explanation: '[2,3,1,1,4]' },
      { output: 'False', explanation: '[3,2,1,0,4]' }
    ],
    hints: ['Track the maximum reachable index greedily'],
    starter: 'def can_jump(nums):\n    pass\n\nprint(can_jump([2,3,1,1,4]))\nprint(can_jump([3,2,1,0,4]))\n',
    solution: 'def can_jump(nums):\n    max_reach = 0\n    for i, v in enumerate(nums):\n        if i > max_reach: return False\n        max_reach = max(max_reach, i + v)\n    return True\n\nprint(can_jump([2,3,1,1,4]))\nprint(can_jump([3,2,1,0,4]))',
    explanation: 'Maintain the farthest index reachable so far. If the current index exceeds max_reach, it is unreachable. If max_reach reaches the last index, return True.'
  },
  {
    title: 'Score After Parentheses', difficulty: 'medium', topic: 'Stack',
    description: 'Compute the score of a balanced parentheses string: <code>()</code>=1, <code>AB</code>=A+B, <code>(A)</code>=2×A.',
    examples: [
      { input: '(()(()))', output: '6' },
      { input: '(())', output: '2' }
    ],
    hints: ['Use a stack. Push 0 on \'(\'; on \')\' pop and either push 1 or double and add to new top.'],
    starter: 's = input("String: ")\n',
    solution: 's = input("String: ")\nstack = [0]\nfor c in s:\n    if c == "(":\n        stack.append(0)\n    else:\n        v = stack.pop()\n        stack[-1] += max(2 * v, 1)\nprint(stack[0])',
    explanation: 'The stack accumulates scores at each nesting level. Closing a pair either scores 1 (if empty inside) or doubles the inner score and adds to the enclosing level.'
  },
  {
    title: 'Partition Labels', difficulty: 'medium', topic: 'Algorithms',
    description: 'Partition a string so each letter appears in at most one part. Print the sizes of each part.',
    examples: [
      { input: 'ababcbacadefegdehijhklij', output: '[9, 7, 8]' }
    ],
    hints: ['Find the last occurrence of each character. Greedily extend the current partition.'],
    starter: 's = input("String: ")\n',
    solution: 's = input("String: ")\nlast = {c: i for i, c in enumerate(s)}\nresult = []\nstart = end = 0\nfor i, c in enumerate(s):\n    end = max(end, last[c])\n    if i == end:\n        result.append(end - start + 1)\n        start = i + 1\nprint(result)',
    explanation: 'Track the last position of each character. Extend the current partition\'s end to include all occurrences of seen characters. When index reaches end, cut the partition.'
  },
  {
    title: 'Decode String', difficulty: 'medium', topic: 'Stack',
    description: 'Decode an encoded string like <code>3[a2[c]]</code> → <code>accaccacc</code>.',
    examples: [
      { input: '3[a2[c]]', output: 'accaccacc' },
      { input: '2[abc]3[cd]ef', output: 'abcabccdcdcdef' }
    ],
    hints: ['Use a stack to save (count, current_string) when opening brackets'],
    starter: 's = input("String: ")\n',
    solution: 's = input("String: ")\nstack = []\ncurrent = ""\nnum = 0\nfor c in s:\n    if c.isdigit():\n        num = num * 10 + int(c)\n    elif c == "[":\n        stack.append((num, current))\n        current = ""; num = 0\n    elif c == "]":\n        repeat, prev = stack.pop()\n        current = prev + current * repeat\n    else:\n        current += c\nprint(current)',
    explanation: 'On "[", save the current string and repeat count. On "]", pop and repeat the inner string, prepending the saved string. Multi-digit numbers are handled by accumulating digits.'
  },
  {
    title: 'Next Greater Element', difficulty: 'medium', topic: 'Stack',
    description: 'For each element in a list, find the next greater element to its right. Print -1 if none exists.',
    examples: [
      { output: '[3, 3, -1, 5, -1]', explanation: 'nums=[2,3,1,5,4] — next greater for 2 is 3, for 3 is not... actually [3,-1,5,-1,-1]' }
    ],
    hints: ['Use a monotone decreasing stack of indices. Pop when a greater element is found.'],
    starter: 'nums = [2, 1, 2, 4, 3]\n',
    solution: 'nums = [2, 1, 2, 4, 3]\nn = len(nums)\nresult = [-1] * n\nstack = []\nfor i, v in enumerate(nums):\n    while stack and nums[stack[-1]] < v:\n        result[stack.pop()] = v\n    stack.append(i)\nprint(result)',
    explanation: 'Maintain a stack of indices with decreasing values. When a larger element is found, it is the "next greater" for all stack elements smaller than it.'
  },
  {
    title: 'Kth Largest Element', difficulty: 'medium', topic: 'Algorithms',
    description: 'Find the kth largest element in an unsorted array without fully sorting it.',
    examples: [
      { output: '5', explanation: 'nums=[3,2,1,5,6,4], k=2' }
    ],
    hints: ['Use a min-heap of size k; the root is the kth largest'],
    starter: 'import heapq\nnums = [3, 2, 1, 5, 6, 4]\nk = 2\n',
    solution: 'import heapq\nnums = [3, 2, 1, 5, 6, 4]\nk = 2\nheap = []\nfor n in nums:\n    heapq.heappush(heap, n)\n    if len(heap) > k:\n        heapq.heappop(heap)\nprint(heap[0])',
    explanation: 'Maintain a min-heap of the k largest elements seen so far. When the heap exceeds k, pop the smallest. The heap root is always the kth largest.'
  },
  {
    title: 'Squares of Sorted Array', difficulty: 'medium', topic: 'Arrays',
    description: 'Given a sorted array of integers (possibly with negatives), return the squares sorted.',
    examples: [
      { output: '[0, 1, 9, 16, 25]', explanation: 'nums=[-4,-1,0,3,10]' }
    ],
    hints: ['Two pointers from both ends; always insert the larger square from the back'],
    starter: 'nums = [-4, -1, 0, 3, 10]\n',
    solution: 'nums = [-4, -1, 0, 3, 10]\nn = len(nums)\nresult = [0] * n\nl, r, pos = 0, n - 1, n - 1\nwhile l <= r:\n    ls, rs = nums[l]**2, nums[r]**2\n    if ls > rs:\n        result[pos] = ls; l += 1\n    else:\n        result[pos] = rs; r -= 1\n    pos -= 1\nprint(result)',
    explanation: 'The largest squares are at the extremes of a sorted array. Use two pointers from both ends, filling the result from back to front.'
  },
  {
    title: 'Search in Rotated Array', difficulty: 'medium', topic: 'Algorithms',
    description: 'Search for a target in a rotated sorted array in O(log n) time.',
    examples: [
      { output: '4', explanation: 'nums=[4,5,6,7,0,1,2], target=0' },
      { output: '-1', explanation: 'target=3' }
    ],
    hints: ['Modified binary search: determine which half is sorted, then check if target is in that half'],
    starter: 'nums = [4, 5, 6, 7, 0, 1, 2]\ntarget = 0\n',
    solution: 'nums = [4, 5, 6, 7, 0, 1, 2]\ntarget = 0\nlo, hi = 0, len(nums) - 1\nwhile lo <= hi:\n    mid = (lo + hi) // 2\n    if nums[mid] == target:\n        print(mid); break\n    elif nums[lo] <= nums[mid]:  # left half sorted\n        if nums[lo] <= target < nums[mid]:\n            hi = mid - 1\n        else:\n            lo = mid + 1\n    else:  # right half sorted\n        if nums[mid] < target <= nums[hi]:\n            lo = mid + 1\n        else:\n            hi = mid - 1\nelse:\n    print(-1)',
    explanation: 'In a rotated array, one half is always sorted. Identify which, check if the target lies in that half, and binary-search accordingly.'
  },
  {
    title: 'Minimum Stack', difficulty: 'medium', topic: 'Data Structures',
    description: 'Design a stack that retrieves the minimum element in O(1). Demonstrate with push/pop/min operations.',
    examples: [
      { output: '-3\n0' }
    ],
    hints: ['Maintain a second stack tracking current minimums'],
    starter: 'class MinStack:\n    def __init__(self): pass\n    def push(self, val): pass\n    def pop(self): pass\n    def get_min(self): pass\n\nms = MinStack()\nfor v in [0,1,0,3,2,-3,-2]:\n    ms.push(v)\nprint(ms.get_min())\nms.pop(); ms.pop()\nprint(ms.get_min())\n',
    solution: 'class MinStack:\n    def __init__(self):\n        self.stack = []\n        self.min_stack = []\n    def push(self, val):\n        self.stack.append(val)\n        if not self.min_stack or val <= self.min_stack[-1]:\n            self.min_stack.append(val)\n    def pop(self):\n        v = self.stack.pop()\n        if v == self.min_stack[-1]:\n            self.min_stack.pop()\n    def get_min(self):\n        return self.min_stack[-1]\n\nms = MinStack()\nfor v in [0,1,0,3,2,-3,-2]: ms.push(v)\nprint(ms.get_min())\nms.pop(); ms.pop()\nprint(ms.get_min())',
    explanation: 'The min_stack tracks the minimum at each push. When the top of min_stack is popped from the main stack, pop it from min_stack too, restoring the previous minimum.'
  },
  {
    title: 'Combination Sum', difficulty: 'medium', topic: 'Backtracking',
    description: 'Find all unique combinations of candidates that sum to a target. Each number may be used multiple times.',
    examples: [
      { output: '[[2, 2, 3], [7]]', explanation: 'candidates=[2,3,6,7], target=7' }
    ],
    hints: ['Backtracking: try each candidate from current index; subtract from remaining target'],
    starter: 'candidates = [2, 3, 6, 7]\ntarget = 7\n',
    solution: 'candidates = [2, 3, 6, 7]\ntarget = 7\nresult = []\ndef bt(start, remaining, path):\n    if remaining == 0:\n        result.append(list(path)); return\n    for i in range(start, len(candidates)):\n        c = candidates[i]\n        if c <= remaining:\n            path.append(c)\n            bt(i, remaining - c, path)\n            path.pop()\nbt(0, target, [])\nprint(result)',
    explanation: 'Backtracking tries each candidate from the current index (allowing reuse). When remaining hits 0, a valid combination is found. Pruning stops if the candidate exceeds remaining.'
  }
];
