const PROJECTS_HARD = [
  {
    title: 'Merge Sort', difficulty: 'hard', topic: 'Algorithms',
    description: 'Implement merge sort — a divide-and-conquer algorithm with guaranteed O(n log n) performance.',
    examples: [
      { input: '[38,27,43,3,9,82,10]', output: '[3, 9, 10, 27, 38, 43, 82]' }
    ],
    hints: ['Split in half, sort each, merge', 'Merge: compare fronts of both halves', 'O(n log n) guaranteed'],
    starter: 'def merge_sort(arr):\n    if len(arr) <= 1: return arr\n    mid = len(arr) // 2\n    left = merge_sort(arr[:mid])\n    right = merge_sort(arr[mid:])\n    return merge(left, right)\n\ndef merge(left, right):\n    pass  # merge two sorted lists\n\nprint(merge_sort([38,27,43,3,9,82,10]))\n',
    solution: 'def merge_sort(arr):\n    if len(arr) <= 1: return arr\n    mid = len(arr) // 2\n    left = merge_sort(arr[:mid])\n    right = merge_sort(arr[mid:])\n    return merge(left, right)\n\ndef merge(left, right):\n    result = []\n    i = j = 0\n    while i < len(left) and j < len(right):\n        if left[i] <= right[j]: result.append(left[i]); i += 1\n        else: result.append(right[j]); j += 1\n    result.extend(left[i:])\n    result.extend(right[j:])\n    return result\n\nprint(merge_sort([38,27,43,3,9,82,10]))',
    explanation: 'Split until size 1, then merge sorted halves by comparing front elements. O(n) merge step × O(log n) depth = O(n log n).'
  },
  {
    title: 'Quick Sort', difficulty: 'hard', topic: 'Algorithms',
    description: 'Implement Quick Sort using the partition scheme. Choose a pivot and partition the array around it.',
    examples: [
      { input: '[10,7,8,9,1,5]', output: '[1, 5, 7, 8, 9, 10]' }
    ],
    hints: ['Choose last element as pivot', 'Partition: elements < pivot go left', 'Recursively sort left and right'],
    starter: 'def quick_sort(arr, low=0, high=None):\n    if high is None: high = len(arr) - 1\n    if low < high:\n        pi = partition(arr, low, high)\n        quick_sort(arr, low, pi - 1)\n        quick_sort(arr, pi + 1, high)\n\ndef partition(arr, low, high):\n    pivot = arr[high]\n    i = low - 1\n    # Partition around pivot\n    pass\n\narr = [10, 7, 8, 9, 1, 5]\nquick_sort(arr)\nprint(arr)\n',
    solution: 'def quick_sort(arr, low=0, high=None):\n    if high is None: high = len(arr) - 1\n    if low < high:\n        pi = partition(arr, low, high)\n        quick_sort(arr, low, pi - 1)\n        quick_sort(arr, pi + 1, high)\n\ndef partition(arr, low, high):\n    pivot = arr[high]\n    i = low - 1\n    for j in range(low, high):\n        if arr[j] <= pivot:\n            i += 1\n            arr[i], arr[j] = arr[j], arr[i]\n    arr[i+1], arr[high] = arr[high], arr[i+1]\n    return i + 1\n\narr = [10, 7, 8, 9, 1, 5]\nquick_sort(arr)\nprint(arr)',
    explanation: 'Partition moves all elements ≤ pivot to its left, > pivot to its right. Average O(n log n), worst O(n²) with bad pivot choice.'
  },
  {
    title: 'Binary Tree Traversals', difficulty: 'hard', topic: 'Data Structures',
    description: 'Implement a BST and perform in-order, pre-order, and post-order traversals.',
    examples: [
      { output: 'Inorder: [1,2,3,4,5,6,7]\nPreorder: [4,2,1,3,6,5,7]' }
    ],
    hints: ['BST: left < node < right', 'Inorder gives sorted output', 'Each traversal: when is root visited?'],
    starter: 'class Node:\n    def __init__(self, val):\n        self.val = val\n        self.left = self.right = None\n\nclass BST:\n    def __init__(self): self.root = None\n    def insert(self, val): pass\n    def inorder(self, node): pass\n\nbst = BST()\nfor v in [4,2,6,1,3,5,7]: bst.insert(v)\nprint("Inorder:", bst.inorder(bst.root))\n',
    solution: 'class Node:\n    def __init__(self, val):\n        self.val = val\n        self.left = self.right = None\n\nclass BST:\n    def __init__(self): self.root = None\n    def insert(self, val): self.root = self._ins(self.root, val)\n    def _ins(self, node, val):\n        if not node: return Node(val)\n        if val < node.val: node.left = self._ins(node.left, val)\n        elif val > node.val: node.right = self._ins(node.right, val)\n        return node\n    def inorder(self, n):\n        if not n: return []\n        return self.inorder(n.left) + [n.val] + self.inorder(n.right)\n    def preorder(self, n):\n        if not n: return []\n        return [n.val] + self.preorder(n.left) + self.preorder(n.right)\n    def postorder(self, n):\n        if not n: return []\n        return self.postorder(n.left) + self.postorder(n.right) + [n.val]\n\nbst = BST()\nfor v in [4,2,6,1,3,5,7]: bst.insert(v)\nprint("Inorder:", bst.inorder(bst.root))\nprint("Preorder:", bst.preorder(bst.root))\nprint("Postorder:", bst.postorder(bst.root))',
    explanation: 'Inorder (L-Root-R) gives sorted output. Pre (Root-L-R) is useful for tree copying. Post (L-R-Root) is useful for deletion.'
  },
  {
    title: 'LRU Cache', difficulty: 'hard', topic: 'Data Structures',
    description: 'Implement LRU (Least Recently Used) Cache with O(1) get and put operations.',
    examples: [
      { output: 'get(1)=1, put(3) evicts 2, get(2)=-1' }
    ],
    hints: ['OrderedDict remembers insertion order', 'move_to_end() marks as recently used', 'popitem(last=False) removes oldest'],
    starter: 'from collections import OrderedDict\n\nclass LRUCache:\n    def __init__(self, capacity):\n        self.cache = OrderedDict()\n        self.capacity = capacity\n    def get(self, key): pass\n    def put(self, key, value): pass\n\nc = LRUCache(2)\nc.put(1,1); c.put(2,2)\nprint(c.get(1))\nc.put(3,3)\nprint(c.get(2))\nprint(c.get(3))\n',
    solution: 'from collections import OrderedDict\n\nclass LRUCache:\n    def __init__(self, capacity):\n        self.cache = OrderedDict()\n        self.capacity = capacity\n    def get(self, key):\n        if key not in self.cache: return -1\n        self.cache.move_to_end(key)\n        return self.cache[key]\n    def put(self, key, value):\n        if key in self.cache: self.cache.move_to_end(key)\n        self.cache[key] = value\n        if len(self.cache) > self.capacity:\n            self.cache.popitem(last=False)\n\nc = LRUCache(2)\nc.put(1,1); c.put(2,2)\nprint(c.get(1))\nc.put(3,3)\nprint(c.get(2))\nprint(c.get(3))',
    explanation: '<code>move_to_end()</code> marks recent use. <code>popitem(last=False)</code> evicts least recently used (oldest entry).'
  },
  {
    title: 'Graph BFS & DFS', difficulty: 'hard', topic: 'Algorithms',
    description: 'Implement BFS and DFS on an adjacency-list graph.',
    examples: [
      { output: 'BFS: [0,1,2,3,4]\nDFS: [0,1,3,4,2]' }
    ],
    hints: ['BFS uses deque (queue)', 'DFS uses recursion (stack)', 'Track visited set to avoid cycles'],
    starter: 'from collections import deque\ngraph = {0:[1,2],1:[0,3,4],2:[0],3:[1],4:[1]}\n\ndef bfs(g, start): pass\ndef dfs(g, start, visited=None): pass\n\nprint("BFS:", bfs(graph, 0))\nprint("DFS:", dfs(graph, 0))\n',
    solution: 'from collections import deque\ngraph = {0:[1,2],1:[0,3,4],2:[0],3:[1],4:[1]}\n\ndef bfs(g, start):\n    visited, queue, result = {start}, deque([start]), []\n    while queue:\n        node = queue.popleft()\n        result.append(node)\n        for nb in g[node]:\n            if nb not in visited:\n                visited.add(nb); queue.append(nb)\n    return result\n\ndef dfs(g, start, visited=None):\n    if visited is None: visited = set()\n    visited.add(start)\n    result = [start]\n    for nb in g[start]:\n        if nb not in visited:\n            result.extend(dfs(g, nb, visited))\n    return result\n\nprint("BFS:", bfs(graph, 0))\nprint("DFS:", dfs(graph, 0))',
    explanation: 'BFS explores level by level (queue). DFS dives deep first (recursion/stack). Both need a visited set to prevent infinite loops.'
  },
  {
    title: 'Knapsack Problem (DP)', difficulty: 'hard', topic: 'Dynamic Programming',
    description: 'Solve the 0/1 knapsack problem: maximize value without exceeding weight capacity.',
    examples: [
      { input: 'capacity=50, items=[(10,60),(20,100),(30,120)]', output: 'Max value: 220' }
    ],
    hints: ['dp[i][w] = max value with i items, capacity w', 'Either include or skip each item', '2D DP table'],
    starter: 'def knapsack(capacity, weights, values):\n    n = len(weights)\n    dp = [[0]*(capacity+1) for _ in range(n+1)]\n    for i in range(1, n+1):\n        for w in range(capacity+1):\n            pass  # take or skip\n    return dp[n][capacity]\n\nprint("Max value:", knapsack(50, [10,20,30], [60,100,120]))\n',
    solution: 'def knapsack(capacity, weights, values):\n    n = len(weights)\n    dp = [[0]*(capacity+1) for _ in range(n+1)]\n    for i in range(1, n+1):\n        for w in range(capacity+1):\n            dp[i][w] = dp[i-1][w]\n            if weights[i-1] <= w:\n                take = dp[i-1][w-weights[i-1]] + values[i-1]\n                dp[i][w] = max(dp[i][w], take)\n    return dp[n][capacity]\n\nprint("Max value:", knapsack(50, [10,20,30], [60,100,120]))',
    explanation: 'DP table: dp[i][w] stores optimal value for first i items with capacity w. For each item, choose max of skipping vs taking it.'
  },
  {
    title: 'Longest Common Subsequence', difficulty: 'hard', topic: 'Dynamic Programming',
    description: 'Find the length of the longest common subsequence (LCS) of two strings.',
    examples: [
      { input: 'ABCBDAB / BDCAB', output: 'LCS length: 4 (BCAB)' }
    ],
    hints: ['2D DP table', 'If chars match: dp[i][j] = dp[i-1][j-1] + 1', 'Else: max of dp[i-1][j] and dp[i][j-1]'],
    starter: 'def lcs(s1, s2):\n    m, n = len(s1), len(s2)\n    dp = [[0]*(n+1) for _ in range(m+1)]\n    for i in range(1, m+1):\n        for j in range(1, n+1):\n            pass  # fill dp table\n    return dp[m][n]\n\nprint("LCS:", lcs("ABCBDAB", "BDCAB"))\n',
    solution: 'def lcs(s1, s2):\n    m, n = len(s1), len(s2)\n    dp = [[0]*(n+1) for _ in range(m+1)]\n    for i in range(1, m+1):\n        for j in range(1, n+1):\n            if s1[i-1] == s2[j-1]:\n                dp[i][j] = dp[i-1][j-1] + 1\n            else:\n                dp[i][j] = max(dp[i-1][j], dp[i][j-1])\n    return dp[m][n]\n\nprint("LCS:", lcs("ABCBDAB", "BDCAB"))',
    explanation: 'Classic DP: extend matching subsequence on equal chars, else take the best of excluding either character.'
  },
  {
    title: 'Coin Change Problem', difficulty: 'hard', topic: 'Dynamic Programming',
    description: 'Find the minimum number of coins needed to make a given amount.',
    examples: [
      { input: 'coins=[1,5,10,25], amount=41', output: '3 coins (25+10+5+1... wait: 25+10+5+1=41→4)' }
    ],
    hints: ['dp[i] = min coins to make amount i', 'Initialize dp with infinity', 'dp[0] = 0 (base case)'],
    starter: 'def coin_change(coins, amount):\n    dp = [float("inf")] * (amount + 1)\n    dp[0] = 0\n    for i in range(1, amount + 1):\n        for coin in coins:\n            if coin <= i:\n                pass  # update dp[i]\n    return dp[amount] if dp[amount] != float("inf") else -1\n\nprint(coin_change([1,5,10,25], 41))\nprint(coin_change([2], 3))\n',
    solution: 'def coin_change(coins, amount):\n    dp = [float("inf")] * (amount + 1)\n    dp[0] = 0\n    for i in range(1, amount + 1):\n        for coin in coins:\n            if coin <= i:\n                dp[i] = min(dp[i], dp[i - coin] + 1)\n    return dp[amount] if dp[amount] != float("inf") else -1\n\nprint(coin_change([1,5,10,25], 41))\nprint(coin_change([2], 3))',
    explanation: 'Bottom-up DP: dp[i] = min coins for amount i. For each coin, update dp[i] using dp[i-coin] + 1 if smaller.'
  },
  {
    title: 'Dijkstra\'s Algorithm', difficulty: 'hard', topic: 'Algorithms',
    description: 'Find the shortest path from a source node to all other nodes in a weighted graph.',
    examples: [
      { output: 'Distances from 0: {0:0, 1:4, 2:3, 3:7, 4:9}' }
    ],
    hints: ['Use a min-heap priority queue', 'heapq.heappush and heappop', 'Relax edges: if new dist < known dist, update'],
    starter: 'import heapq\n\ndef dijkstra(graph, source):\n    dist = {node: float("inf") for node in graph}\n    dist[source] = 0\n    pq = [(0, source)]\n    while pq:\n        d, u = heapq.heappop(pq)\n        # Relax neighbors\n        pass\n    return dist\n\ngraph = {0:[(1,4),(2,3)],1:[(3,3)],2:[(1,1),(3,7)],3:[(4,2)],4:[]}\nprint(dijkstra(graph, 0))\n',
    solution: 'import heapq\n\ndef dijkstra(graph, source):\n    dist = {node: float("inf") for node in graph}\n    dist[source] = 0\n    pq = [(0, source)]\n    while pq:\n        d, u = heapq.heappop(pq)\n        if d > dist[u]: continue\n        for v, w in graph[u]:\n            if dist[u] + w < dist[v]:\n                dist[v] = dist[u] + w\n                heapq.heappush(pq, (dist[v], v))\n    return dist\n\ngraph = {0:[(1,4),(2,3)],1:[(3,3)],2:[(1,1),(3,7)],3:[(4,2)],4:[]}\nprint(dijkstra(graph, 0))',
    explanation: 'Min-heap always processes the closest unvisited node. Edge relaxation updates distances when a shorter path is found.'
  },
  {
    title: 'Trie (Prefix Tree)', difficulty: 'hard', topic: 'Data Structures',
    description: 'Implement a Trie with insert, search, and startsWith methods.',
    examples: [
      { output: 'insert: apple\nsearch(\'apple\')=True, search(\'app\')=False\nstartsWith(\'app\')=True' }
    ],
    hints: ['Each node has a dict of children + is_end flag', 'Traverse char by char', 'startsWith: don\'t check is_end'],
    starter: 'class TrieNode:\n    def __init__(self):\n        self.children = {}\n        self.is_end = False\n\nclass Trie:\n    def __init__(self): self.root = TrieNode()\n    def insert(self, word): pass\n    def search(self, word): pass\n    def starts_with(self, prefix): pass\n\nt = Trie()\nt.insert("apple")\nprint(t.search("apple"))\nprint(t.search("app"))\nprint(t.starts_with("app"))\n',
    solution: 'class TrieNode:\n    def __init__(self):\n        self.children = {}\n        self.is_end = False\n\nclass Trie:\n    def __init__(self): self.root = TrieNode()\n    def insert(self, word):\n        node = self.root\n        for ch in word:\n            if ch not in node.children: node.children[ch] = TrieNode()\n            node = node.children[ch]\n        node.is_end = True\n    def search(self, word):\n        node = self.root\n        for ch in word:\n            if ch not in node.children: return False\n            node = node.children[ch]\n        return node.is_end\n    def starts_with(self, prefix):\n        node = self.root\n        for ch in prefix:\n            if ch not in node.children: return False\n            node = node.children[ch]\n        return True\n\nt = Trie()\nt.insert("apple"); t.insert("app")\nprint(t.search("apple"))\nprint(t.search("ap"))\nprint(t.starts_with("app"))',
    explanation: 'Trie stores strings as paths. Each node is one character. <code>is_end</code> marks complete words. O(m) for all ops where m = word length.'
  },
  {
    title: 'Heap Implementation', difficulty: 'hard', topic: 'Data Structures',
    description: 'Implement a Min-Heap from scratch with insert and extract_min operations.',
    examples: [
      { output: 'insert 5,3,8,1,4\nextract_min: 1\nextract_min: 3\nheap: [4,5,8]' }
    ],
    hints: ['Heap stored as array', 'Parent of i: (i-1)//2', 'Children of i: 2i+1, 2i+2', 'Heapify up on insert, down on extract'],
    starter: 'class MinHeap:\n    def __init__(self): self.heap = []\n    def insert(self, val): pass\n    def extract_min(self): pass\n    def _heapify_up(self, i): pass\n    def _heapify_down(self, i): pass\n\nh = MinHeap()\nfor v in [5,3,8,1,4]: h.insert(v)\nprint("Min:", h.extract_min())\nprint("Min:", h.extract_min())\nprint("Heap:", h.heap)\n',
    solution: 'class MinHeap:\n    def __init__(self): self.heap = []\n    def insert(self, val):\n        self.heap.append(val)\n        self._heapify_up(len(self.heap)-1)\n    def extract_min(self):\n        if len(self.heap) == 1: return self.heap.pop()\n        root = self.heap[0]\n        self.heap[0] = self.heap.pop()\n        self._heapify_down(0)\n        return root\n    def _heapify_up(self, i):\n        parent = (i-1)//2\n        if i > 0 and self.heap[i] < self.heap[parent]:\n            self.heap[i], self.heap[parent] = self.heap[parent], self.heap[i]\n            self._heapify_up(parent)\n    def _heapify_down(self, i):\n        smallest, l, r = i, 2*i+1, 2*i+2\n        n = len(self.heap)\n        if l < n and self.heap[l] < self.heap[smallest]: smallest = l\n        if r < n and self.heap[r] < self.heap[smallest]: smallest = r\n        if smallest != i:\n            self.heap[i], self.heap[smallest] = self.heap[smallest], self.heap[i]\n            self._heapify_down(smallest)\n\nh = MinHeap()\nfor v in [5,3,8,1,4]: h.insert(v)\nprint("Min:", h.extract_min())\nprint("Min:", h.extract_min())\nprint("Heap:", h.heap)',
    explanation: 'Min-heap: parent always ≤ children. Insert appends and bubbles up. Extract swaps root with last, removes, and bubbles down. Both O(log n).'
  },
  {
    title: 'Topological Sort', difficulty: 'hard', topic: 'Algorithms',
    description: 'Perform topological sort on a DAG (Directed Acyclic Graph) using Kahn\'s algorithm.',
    examples: [
      { output: 'Order: [5, 4, 2, 3, 1, 0] (one valid ordering)' }
    ],
    hints: ['Compute in-degrees for all nodes', 'Start with nodes of in-degree 0', 'BFS removing edges updates in-degrees'],
    starter: 'from collections import deque\n\ndef topological_sort(vertices, edges):\n    in_degree = [0] * vertices\n    adj = [[] for _ in range(vertices)]\n    for u, v in edges:\n        adj[u].append(v)\n        in_degree[v] += 1\n    # Kahn\'s algorithm\n    pass\n\nedges = [(5,2),(5,0),(4,0),(4,1),(2,3),(3,1)]\nprint("Order:", topological_sort(6, edges))\n',
    solution: 'from collections import deque\n\ndef topological_sort(vertices, edges):\n    in_degree = [0] * vertices\n    adj = [[] for _ in range(vertices)]\n    for u, v in edges:\n        adj[u].append(v)\n        in_degree[v] += 1\n    queue = deque(i for i in range(vertices) if in_degree[i] == 0)\n    result = []\n    while queue:\n        node = queue.popleft()\n        result.append(node)\n        for nb in adj[node]:\n            in_degree[nb] -= 1\n            if in_degree[nb] == 0:\n                queue.append(nb)\n    return result if len(result) == vertices else []\n\nedges = [(5,2),(5,0),(4,0),(4,1),(2,3),(3,1)]\nprint("Order:", topological_sort(6, edges))',
    explanation: 'Kahn\'s: start with zero-in-degree nodes. Remove each from the graph, decrement neighbors\' in-degrees, add new zeros. Detects cycles too.'
  },
  {
    title: 'N-Queens Problem', difficulty: 'hard', topic: 'Backtracking',
    description: 'Solve the N-Queens puzzle: place N queens on an N×N board so no two attack each other.',
    examples: [
      { input: 'N=4', output: '2 solutions found\n[[1,3,0,2],[2,0,3,1]]' }
    ],
    hints: ['Backtrack: try each column in current row', 'Check column, and both diagonals', 'Track attacked columns and diagonals with sets'],
    starter: 'def solve_n_queens(n):\n    solutions = []\n    def backtrack(row, cols, diag1, diag2, placement):\n        if row == n:\n            solutions.append(placement[:])\n            return\n        for col in range(n):\n            if col in cols or (row-col) in diag1 or (row+col) in diag2:\n                continue\n            # Place queen and recurse\n            pass\n    backtrack(0, set(), set(), set(), [])\n    return solutions\n\nsols = solve_n_queens(4)\nprint(f"{len(sols)} solutions")\nprint(sols)\n',
    solution: 'def solve_n_queens(n):\n    solutions = []\n    def backtrack(row, cols, diag1, diag2, placement):\n        if row == n:\n            solutions.append(placement[:])\n            return\n        for col in range(n):\n            if col in cols or (row-col) in diag1 or (row+col) in diag2:\n                continue\n            cols.add(col); diag1.add(row-col); diag2.add(row+col)\n            placement.append(col)\n            backtrack(row+1, cols, diag1, diag2, placement)\n            placement.pop(); cols.remove(col); diag1.remove(row-col); diag2.remove(row+col)\n    backtrack(0, set(), set(), set(), [])\n    return solutions\n\nsols = solve_n_queens(4)\nprint(f"{len(sols)} solutions")\nprint(sols)',
    explanation: 'Backtracking tries each column, marks column and diagonals as used, recurses, then undoes the mark. Two diagonal identifiers: row-col (NW) and row+col (NE).'
  },
  {
    title: 'Minimax for Tic-Tac-Toe', difficulty: 'hard', topic: 'AI',
    description: 'Implement Minimax to find the optimal move for the computer in Tic-Tac-Toe.',
    examples: [
      { output: 'Best move: position 6 (score: 10)' }
    ],
    hints: ['Score: +10 win, -10 loss, 0 draw', 'Maximizer picks highest, minimizer picks lowest', 'Check all empty cells'],
    starter: 'board = ["X","O","X","O","X","_","_","_","O"]\n\ndef winner(b):\n    for w in [(0,1,2),(3,4,5),(6,7,8),(0,3,6),(1,4,7),(2,5,8),(0,4,8),(2,4,6)]:\n        if b[w[0]]==b[w[1]]==b[w[2]] and b[w[0]]!="_": return b[w[0]]\n    return None\n\ndef minimax(b, is_max):\n    w = winner(b)\n    if w=="X": return 10\n    if w=="O": return -10\n    if "_" not in b: return 0\n    # Implement minimax\n    pass\n\nbest, move = float("-inf"), -1\nfor i in range(9):\n    if board[i]=="_":\n        board[i]="X"\n        s = minimax(board, False)\n        board[i]="_"\n        if s > best: best, move = s, i\nprint(f"Best move: {move} (score: {best})")\n',
    solution: 'board = ["X","O","X","O","X","_","_","_","O"]\n\ndef winner(b):\n    for w in [(0,1,2),(3,4,5),(6,7,8),(0,3,6),(1,4,7),(2,5,8),(0,4,8),(2,4,6)]:\n        if b[w[0]]==b[w[1]]==b[w[2]] and b[w[0]]!="_": return b[w[0]]\n    return None\n\ndef minimax(b, is_max):\n    w = winner(b)\n    if w=="X": return 10\n    if w=="O": return -10\n    if "_" not in b: return 0\n    scores = []\n    for i in range(9):\n        if b[i]=="_":\n            b[i] = "X" if is_max else "O"\n            scores.append(minimax(b, not is_max))\n            b[i] = "_"\n    return max(scores) if is_max else min(scores)\n\nbest, move = float("-inf"), -1\nfor i in range(9):\n    if board[i]=="_":\n        board[i]="X"\n        s = minimax(board, False)\n        board[i]="_"\n        if s > best: best, move = s, i\nprint(f"Best move: {move} (score: {best})")',
    explanation: 'Minimax explores all futures. Max player picks the best score for X, min player picks worst. Terminal states return +10, -10, or 0.'
  },
  {
    title: 'Word Ladder', difficulty: 'hard', topic: 'BFS',
    description: 'Find the shortest transformation sequence from start word to end word, changing one letter at a time. Each intermediate word must exist in a word list.',
    examples: [
      { input: 'hit → cog, wordList=[hot,dot,dog,lot,log,cog]', output: '5 steps: hit→hot→dot→dog→cog' }
    ],
    hints: ['BFS finds shortest path', 'Each state is a word', 'Try all single-character changes'],
    starter: 'from collections import deque\n\ndef word_ladder(begin, end, word_list):\n    word_set = set(word_list)\n    if end not in word_set: return 0\n    queue = deque([(begin, [begin])])\n    visited = {begin}\n    while queue:\n        word, path = queue.popleft()\n        for i in range(len(word)):\n            for c in "abcdefghijklmnopqrstuvwxyz":\n                new_word = word[:i] + c + word[i+1:]\n                # Check and enqueue\n                pass\n    return 0\n\nresult = word_ladder("hit", "cog", ["hot","dot","dog","lot","log","cog"])\nprint(result)\n',
    solution: 'from collections import deque\n\ndef word_ladder(begin, end, word_list):\n    word_set = set(word_list)\n    if end not in word_set: return 0\n    queue = deque([(begin, [begin])])\n    visited = {begin}\n    while queue:\n        word, path = queue.popleft()\n        for i in range(len(word)):\n            for c in "abcdefghijklmnopqrstuvwxyz":\n                new_word = word[:i] + c + word[i+1:]\n                if new_word == end:\n                    print(" -> ".join(path + [new_word]))\n                    return len(path) + 1\n                if new_word in word_set and new_word not in visited:\n                    visited.add(new_word)\n                    queue.append((new_word, path + [new_word]))\n    return 0\n\nresult = word_ladder("hit", "cog", ["hot","dot","dog","lot","log","cog"])\nprint(f"Steps: {result}")',
    explanation: 'BFS guarantees the shortest path. For each word, try all 26-letter substitutions at each position. Mark visited words to avoid cycles.'
  },
  {
    title: 'Segment Tree', difficulty: 'hard', topic: 'Data Structures',
    description: 'Build a Segment Tree for range sum queries and point updates in O(log n).',
    examples: [
      { output: 'Sum[1..3]=9\nAfter update[1]=10: Sum[1..3]=18' }
    ],
    hints: ['Tree stored in array of size 4n', 'Build recursively', 'Query/update: left or right child based on mid'],
    starter: 'class SegmentTree:\n    def __init__(self, arr):\n        self.n = len(arr)\n        self.tree = [0] * (4 * self.n)\n        self.build(arr, 0, 0, self.n-1)\n    \n    def build(self, arr, node, start, end): pass\n    def update(self, node, start, end, idx, val): pass\n    def query(self, node, start, end, l, r): pass\n\nst = SegmentTree([1,3,5,7,9,11])\nprint("Sum[1..3]:", st.query(0,0,5,1,3))\nst.update(0,0,5,1,10)\nprint("After update Sum[1..3]:", st.query(0,0,5,1,3))\n',
    solution: 'class SegmentTree:\n    def __init__(self, arr):\n        self.n = len(arr)\n        self.tree = [0] * (4 * self.n)\n        self.build(arr, 0, 0, self.n-1)\n    def build(self, arr, node, start, end):\n        if start == end:\n            self.tree[node] = arr[start]; return\n        mid = (start+end)//2\n        self.build(arr, 2*node+1, start, mid)\n        self.build(arr, 2*node+2, mid+1, end)\n        self.tree[node] = self.tree[2*node+1] + self.tree[2*node+2]\n    def update(self, node, start, end, idx, val):\n        if start == end:\n            self.tree[node] = val; return\n        mid = (start+end)//2\n        if idx <= mid: self.update(2*node+1, start, mid, idx, val)\n        else: self.update(2*node+2, mid+1, end, idx, val)\n        self.tree[node] = self.tree[2*node+1] + self.tree[2*node+2]\n    def query(self, node, start, end, l, r):\n        if r < start or end < l: return 0\n        if l <= start and end <= r: return self.tree[node]\n        mid = (start+end)//2\n        return self.query(2*node+1, start, mid, l, r) + self.query(2*node+2, mid+1, end, l, r)\n\nst = SegmentTree([1,3,5,7,9,11])\nprint("Sum[1..3]:", st.query(0,0,5,1,3))\nst.update(0,0,5,1,10)\nprint("After update Sum[1..3]:", st.query(0,0,5,1,3))',
    explanation: 'Segment tree stores subtree sums. Each node covers a range. Query/update recursively splits at midpoint. O(log n) for both operations.'
  },
  {
    title: 'Longest Increasing Subsequence', difficulty: 'hard', topic: 'Dynamic Programming',
    description: 'Find the length of the longest strictly increasing subsequence in an array.',
    examples: [
      { input: '[10,9,2,5,3,7,101,18]', output: 'LIS length: 4 (2,3,7,101 or 2,5,7,101)' }
    ],
    hints: ['dp[i] = LIS ending at index i', 'dp[i] = 1 + max(dp[j]) for all j<i where arr[j]<arr[i]', 'O(n²) solution'],
    starter: 'def lis(arr):\n    n = len(arr)\n    dp = [1] * n\n    for i in range(1, n):\n        for j in range(i):\n            if arr[j] < arr[i]:\n                pass  # update dp[i]\n    return max(dp)\n\nprint("LIS:", lis([10,9,2,5,3,7,101,18]))\nprint("LIS:", lis([0,1,0,3,2,3]))\n',
    solution: 'def lis(arr):\n    n = len(arr)\n    dp = [1] * n\n    for i in range(1, n):\n        for j in range(i):\n            if arr[j] < arr[i]:\n                dp[i] = max(dp[i], dp[j] + 1)\n    return max(dp)\n\nprint("LIS:", lis([10,9,2,5,3,7,101,18]))\nprint("LIS:", lis([0,1,0,3,2,3]))',
    explanation: 'dp[i] = length of longest increasing subsequence ending at index i. Look back at all j < i where arr[j] < arr[i].'
  },
  {
    title: 'Matrix Chain Multiplication', difficulty: 'hard', topic: 'Dynamic Programming',
    description: 'Find the minimum number of scalar multiplications needed to multiply a chain of matrices.',
    examples: [
      { input: 'dims=[40,20,30,10,30]', output: 'Minimum operations: 26000' }
    ],
    hints: ['dp[i][j] = min cost to multiply matrices i through j', 'Try all split points k between i and j', 'O(n³) time'],
    starter: 'def matrix_chain(p):\n    n = len(p) - 1\n    dp = [[0]*n for _ in range(n)]\n    for length in range(2, n+1):\n        for i in range(n - length + 1):\n            j = i + length - 1\n            dp[i][j] = float("inf")\n            for k in range(i, j):\n                cost = dp[i][k] + dp[k+1][j] + p[i]*p[k+1]*p[j+1]\n                dp[i][j] = min(dp[i][j], cost)\n    return dp[0][n-1]\n\nprint(matrix_chain([40,20,30,10,30]))\n',
    solution: 'def matrix_chain(p):\n    n = len(p) - 1\n    dp = [[0]*n for _ in range(n)]\n    for length in range(2, n+1):\n        for i in range(n - length + 1):\n            j = i + length - 1\n            dp[i][j] = float("inf")\n            for k in range(i, j):\n                cost = dp[i][k] + dp[k+1][j] + p[i]*p[k+1]*p[j+1]\n                dp[i][j] = min(dp[i][j], cost)\n    return dp[0][n-1]\n\nprint(matrix_chain([40,20,30,10,30]))\nprint(matrix_chain([10,30,5,60]))',
    explanation: 'dp[i][j] = min cost for matrices i…j. Try all split points k — the order of multiplication doesn\'t change the result, but affects the cost.'
  },
  {
    title: 'Union-Find (Disjoint Sets)', difficulty: 'hard', topic: 'Data Structures',
    description: 'Implement Union-Find with path compression and union by rank. Use it to detect cycles in a graph.',
    examples: [
      { output: 'Connected: True\nCycle detected: True' }
    ],
    hints: ['find() with path compression: parent[x] = find(parent[x])', 'union() by rank to keep tree shallow', 'Cycle exists if union() called on already-connected nodes'],
    starter: 'class UnionFind:\n    def __init__(self, n):\n        self.parent = list(range(n))\n        self.rank = [0] * n\n    def find(self, x):\n        pass  # with path compression\n    def union(self, x, y):\n        pass  # returns False if already connected\n\nuf = UnionFind(5)\nuf.union(0,1); uf.union(1,2); uf.union(3,4)\nprint("Connected:", uf.find(0)==uf.find(2))\nprint("Cycle:", not uf.union(0,2))\n',
    solution: 'class UnionFind:\n    def __init__(self, n):\n        self.parent = list(range(n))\n        self.rank = [0] * n\n    def find(self, x):\n        if self.parent[x] != x:\n            self.parent[x] = self.find(self.parent[x])\n        return self.parent[x]\n    def union(self, x, y):\n        rx, ry = self.find(x), self.find(y)\n        if rx == ry: return False\n        if self.rank[rx] < self.rank[ry]: rx, ry = ry, rx\n        self.parent[ry] = rx\n        if self.rank[rx] == self.rank[ry]: self.rank[rx] += 1\n        return True\n\nuf = UnionFind(5)\nuf.union(0,1); uf.union(1,2); uf.union(3,4)\nprint("Connected:", uf.find(0)==uf.find(2))\nprint("Cycle:", not uf.union(0,2))',
    explanation: 'Path compression flattens trees for near-O(1) find. Union by rank keeps trees shallow. A failed union (same root) means a cycle exists.'
  },
  {
    title: 'LRU Cache from Scratch', difficulty: 'hard', topic: 'Data Structures',
    description: 'Implement an LRU Cache class with <code>get(key)</code> and <code>put(key, value)</code> in O(1) time. Demonstrate with capacity 2.',
    examples: [
      { output: '1\n-1\n3', explanation: 'put(1,1),put(2,2),get(1)=1,put(3,3) evicts key 2, get(2)=-1, get(3)=3' }
    ],
    hints: ['Use an OrderedDict: move_to_end on access, popitem(last=False) to evict'],
    starter: 'from collections import OrderedDict\n\nclass LRUCache:\n    def __init__(self, capacity):\n        pass\n    def get(self, key):\n        pass\n    def put(self, key, value):\n        pass\n\ncache = LRUCache(2)\ncache.put(1, 1)\ncache.put(2, 2)\nprint(cache.get(1))\ncache.put(3, 3)\nprint(cache.get(2))\nprint(cache.get(3))\n',
    solution: 'from collections import OrderedDict\n\nclass LRUCache:\n    def __init__(self, capacity):\n        self.cap = capacity\n        self.cache = OrderedDict()\n    def get(self, key):\n        if key not in self.cache:\n            return -1\n        self.cache.move_to_end(key)\n        return self.cache[key]\n    def put(self, key, value):\n        if key in self.cache:\n            self.cache.move_to_end(key)\n        self.cache[key] = value\n        if len(self.cache) > self.cap:\n            self.cache.popitem(last=False)\n\ncache = LRUCache(2)\ncache.put(1, 1)\ncache.put(2, 2)\nprint(cache.get(1))\ncache.put(3, 3)\nprint(cache.get(2))\nprint(cache.get(3))',
    explanation: 'OrderedDict maintains insertion order. <code>move_to_end</code> marks recent use. <code>popitem(last=False)</code> removes the least recently used entry.'
  },
  {
    title: 'Valid BST Check', difficulty: 'hard', topic: 'Data Structures',
    description: 'Check if a binary tree (represented as nested lists) is a valid Binary Search Tree.',
    examples: [
      { output: 'True\nFalse' }
    ],
    hints: ['Recurse with min/max bounds; each node must lie strictly within its inherited range'],
    starter: '# Tree node: [value, left, right] or None\ntree1 = [4, [2,[1,None,None],[3,None,None]], [6,[5,None,None],[7,None,None]]]\ntree2 = [5, [1,None,None], [4,[3,None,None],[6,None,None]]]\n\ndef is_valid_bst(node, lo=float("-inf"), hi=float("inf")):\n    pass\n\nprint(is_valid_bst(tree1))\nprint(is_valid_bst(tree2))\n',
    solution: 'tree1 = [4, [2,[1,None,None],[3,None,None]], [6,[5,None,None],[7,None,None]]]\ntree2 = [5, [1,None,None], [4,[3,None,None],[6,None,None]]]\n\ndef is_valid_bst(node, lo=float("-inf"), hi=float("inf")):\n    if node is None:\n        return True\n    val, left, right = node\n    if not (lo < val < hi):\n        return False\n    return is_valid_bst(left, lo, val) and is_valid_bst(right, val, hi)\n\nprint(is_valid_bst(tree1))\nprint(is_valid_bst(tree2))',
    explanation: 'Each node must be strictly between the bounds inherited from its ancestors. Left subtrees narrow the upper bound; right subtrees narrow the lower bound.'
  },
  {
    title: 'Flatten Nested Iterables', difficulty: 'hard', topic: 'Generators',
    description: 'Write a generator that lazily flattens an arbitrarily nested list structure.',
    examples: [
      { output: '1 2 3 4 5 6 7' }
    ],
    hints: ['Use isinstance(item, list) to check; yield from recurse if nested'],
    starter: 'def flatten(nested):\n    # Implement as a generator\n    pass\n\ndata = [1, [2, [3, 4], 5], [6, [7]]]\nprint(*flatten(data))\n',
    solution: 'def flatten(nested):\n    for item in nested:\n        if isinstance(item, list):\n            yield from flatten(item)\n        else:\n            yield item\n\ndata = [1, [2, [3, 4], 5], [6, [7]]]\nprint(*flatten(data))',
    explanation: '<code>yield from flatten(item)</code> recursively delegates to the generator for nested lists. Non-list items are yielded directly.'
  },
  {
    title: 'Consistent Hashing Ring', difficulty: 'hard', topic: 'Algorithms',
    description: 'Implement a simple consistent hashing ring with 3 nodes. Assign 6 keys to nodes and print each assignment.',
    examples: [
      { output: 'key0 -> node2\nkey1 -> node0\nkey2 -> node1\nkey3 -> node2\nkey4 -> node0\nkey5 -> node1' }
    ],
    hints: ['Hash each node to a point on a circle; assign each key to the nearest node clockwise'],
    starter: 'import hashlib\nnodes = ["node0", "node1", "node2"]\nkeys  = [f"key{i}" for i in range(6)]\n',
    solution: 'import hashlib\nnodes = ["node0", "node1", "node2"]\nkeys  = [f"key{i}" for i in range(6)]\n\ndef h(s):\n    return int(hashlib.md5(s.encode()).hexdigest(), 16) % 360\n\nring = sorted((h(n), n) for n in nodes)\n\nfor key in keys:\n    kh = h(key)\n    node = next((n for p, n in ring if p >= kh), ring[0][1])\n    print(f"{key} -> {node}")',
    explanation: 'Hash each node to a position on a 0-359 ring. For each key, find the first node position >= the key\'s hash (wrapping around).'
  },
  {
    title: 'Word Break Problem', difficulty: 'hard', topic: 'Dynamic Programming',
    description: 'Determine if a string can be segmented into words from a dictionary. Print <code>True</code> or <code>False</code>.',
    examples: [
      { output: 'True', explanation: 's=\'leetcode\', wordDict=[\'leet\',\'code\']' },
      { output: 'False', explanation: 's=\'catsandog\', wordDict=[\'cats\',\'dog\',\'sand\',\'and\',\'cat\']' }
    ],
    hints: ['DP: dp[i] = True if s[:i] can be segmented. For each i, try all j < i.'],
    starter: 's = "leetcode"\nwordDict = ["leet", "code"]\n# Can s be broken into words from wordDict?\n',
    solution: 's = "leetcode"\nwordDict = ["leet", "code"]\nwd = set(wordDict)\nn = len(s)\ndp = [False] * (n + 1)\ndp[0] = True\nfor i in range(1, n + 1):\n    for j in range(i):\n        if dp[j] and s[j:i] in wd:\n            dp[i] = True\n            break\nprint(dp[n])',
    explanation: 'dp[i] means s[:i] is segmentable. For each position i, check all substrings s[j:i] — if dp[j] is True and the substring is in the dict, dp[i] = True.'
  },
  {
    title: 'Sliding Window Maximum', difficulty: 'hard', topic: 'Data Structures',
    description: 'Find the maximum value in every sliding window of size k. Print the results.',
    examples: [
      { output: '3 3 5 5 6 7', explanation: 'nums=[1,3,-1,-3,5,3,6,7], k=3' }
    ],
    hints: ['Use a deque to maintain a decreasing sequence of indices'],
    starter: 'from collections import deque\nnums = [1, 3, -1, -3, 5, 3, 6, 7]\nk = 3\n',
    solution: 'from collections import deque\nnums = [1, 3, -1, -3, 5, 3, 6, 7]\nk = 3\ndq = deque()\nresult = []\nfor i, n in enumerate(nums):\n    while dq and nums[dq[-1]] <= n:\n        dq.pop()\n    dq.append(i)\n    if dq[0] <= i - k:\n        dq.popleft()\n    if i >= k - 1:\n        result.append(nums[dq[0]])\nprint(*result)',
    explanation: 'The deque holds indices of potentially useful elements in decreasing value order. The front is always the current window maximum.'
  },
  {
    title: 'Serialize and Deserialize Tree', difficulty: 'hard', topic: 'Data Structures',
    description: 'Implement serialize (tree → string) and deserialize (string → tree) for a binary tree. Print the in-order traversal of the restored tree.',
    examples: [
      { output: '4 2 5 1 3', explanation: 'tree [1,[2,[4,N,N],[5,N,N]],[3,N,N]] serialized and restored' }
    ],
    hints: ['Preorder serialization with null markers; use an iterator for deserialization'],
    starter: 'def serialize(root):\n    pass\n\ndef deserialize(data):\n    pass\n\ntree = [1, [2, [4,None,None], [5,None,None]], [3, None, None]]\n',
    solution: 'def serialize(root):\n    if root is None:\n        return "N"\n    val, left, right = root\n    return f"{val},{serialize(left)},{serialize(right)}"\n\ndef deserialize(data):\n    it = iter(data.split(","))\n    def build():\n        val = next(it)\n        if val == "N":\n            return None\n        return [int(val), build(), build()]\n    return build()\n\ndef inorder(node):\n    if node is None:\n        return []\n    val, left, right = node\n    return inorder(left) + [val] + inorder(right)\n\ntree = [1, [2, [4,None,None], [5,None,None]], [3, None, None]]\nrestored = deserialize(serialize(tree))\nprint(*inorder(restored))',
    explanation: 'Preorder serialization visits root before children, using "N" for null. Deserialization reads the same preorder sequence via an iterator.'
  },
  {
    title: 'Trap Rainwater', difficulty: 'hard', topic: 'Algorithms',
    description: 'Given an elevation map as a list of heights, compute how much rainwater it can trap.',
    examples: [
      { output: '6', explanation: 'heights=[0,1,0,2,1,0,1,3,2,1,2,1]' }
    ],
    hints: ['Two-pointer approach: track left_max and right_max, advance the shorter side'],
    starter: 'heights = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]\n',
    solution: 'heights = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]\nl, r = 0, len(heights) - 1\nleft_max = right_max = water = 0\nwhile l < r:\n    if heights[l] <= heights[r]:\n        if heights[l] >= left_max:\n            left_max = heights[l]\n        else:\n            water += left_max - heights[l]\n        l += 1\n    else:\n        if heights[r] >= right_max:\n            right_max = heights[r]\n        else:\n            water += right_max - heights[r]\n        r -= 1\nprint(water)',
    explanation: 'Two pointers converge inward. Water at any position is bounded by min(left_max, right_max) - height. The pointer on the shorter side is always the bottleneck.'
  },
  {
    title: 'Regular Expression Engine', difficulty: 'hard', topic: 'Algorithms',
    description: 'Implement a basic regex matcher supporting <code>.</code> (any char) and <code>*</code> (zero or more of preceding). Print <code>True</code> or <code>False</code>.',
    examples: [
      { output: 'True', explanation: 'match(\'aab\', \'c*a*b\')' },
      { output: 'False', explanation: 'match(\'aa\', \'a\')' }
    ],
    hints: ['DP on (text index, pattern index). Handle * by checking zero or more matches of the preceding char'],
    starter: 'def match(text, pattern):\n    pass\n\nprint(match("aab", "c*a*b"))\nprint(match("aa", "a"))\n',
    solution: 'def match(text, pattern):\n    m, n = len(text), len(pattern)\n    dp = [[False] * (n + 1) for _ in range(m + 1)]\n    dp[0][0] = True\n    for j in range(1, n + 1):\n        if pattern[j-1] == "*" and j >= 2:\n            dp[0][j] = dp[0][j-2]\n    for i in range(1, m + 1):\n        for j in range(1, n + 1):\n            if pattern[j-1] == "*":\n                dp[i][j] = dp[i][j-2]\n                if pattern[j-2] in (text[i-1], "."):\n                    dp[i][j] = dp[i][j] or dp[i-1][j]\n            elif pattern[j-1] == "." or pattern[j-1] == text[i-1]:\n                dp[i][j] = dp[i-1][j-1]\n    return dp[m][n]\n\nprint(match("aab", "c*a*b"))\nprint(match("aa", "a"))',
    explanation: 'dp[i][j] = whether text[:i] matches pattern[:j]. The * case either eliminates the preceding element (zero occurrences) or extends a match (one or more).'
  },
  {
    title: 'Suffix Array', difficulty: 'hard', topic: 'Algorithms',
    description: 'Build the suffix array of a string and print the sorted suffixes.',
    examples: [
      { input: 'banana', output: 'a\nanana\nbanana\nna\nnana\nanana' }
    ],
    hints: ['Generate all suffixes with their start indices, sort them'],
    starter: 's = input("String: ")\n',
    solution: 's = input("String: ")\nsuffixes = sorted(range(len(s)), key=lambda i: s[i:])\nfor i in suffixes:\n    print(s[i:])',
    explanation: 'A suffix array is the list of starting indices of all suffixes sorted lexicographically. Sort by the suffix string itself using a key function.'
  },
  {
    title: 'Power Set', difficulty: 'hard', topic: 'Recursion',
    description: 'Generate and print all subsets of a list.',
    examples: [
      { output: '[]\n[1]\n[2]\n[1, 2]\n[3]\n[1, 3]\n[2, 3]\n[1, 2, 3]' }
    ],
    hints: ['For each element, include it or exclude it. Or use bit masking over range(2^n).'],
    starter: 'nums = [1, 2, 3]\n',
    solution: 'nums = [1, 2, 3]\nn = len(nums)\nfor mask in range(1 << n):\n    subset = [nums[i] for i in range(n) if mask & (1 << i)]\n    print(subset)',
    explanation: 'Each number from 0 to 2^n - 1 represents a bitmask. If bit i is set, include nums[i] in the subset. This generates all 2^n subsets.'
  },
  {
    title: 'Kadane\'s Algorithm', difficulty: 'hard', topic: 'Dynamic Programming',
    description: 'Find the maximum sum contiguous subarray and print the sum and the subarray.',
    examples: [
      { output: '6\n[4, -1, 2, 1]', explanation: 'nums=[-2,1,-3,4,-1,2,1,-5,4]' }
    ],
    hints: ['Track current sum and reset to 0 when negative. Track start/end indices for the subarray.'],
    starter: 'nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]\n',
    solution: 'nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]\nbest = cur = nums[0]\nstart = end = best_start = 0\nfor i in range(1, len(nums)):\n    if cur + nums[i] < nums[i]:\n        cur = nums[i]\n        start = i\n    else:\n        cur += nums[i]\n    if cur > best:\n        best = cur\n        best_start = start\n        end = i\nprint(best)\nprint(nums[best_start:end+1])',
    explanation: 'Kadane\'s: extend the current subarray or restart from the current element. Track start indices to recover the actual subarray.'
  },
  {
    title: 'Generate All BSTs', difficulty: 'hard', topic: 'Data Structures',
    description: 'Count the number of structurally unique BSTs with exactly n nodes.',
    examples: [
      { input: '3', output: '5' },
      { input: '4', output: '14' }
    ],
    hints: ['Catalan number. DP: dp[n] = sum(dp[i-1] * dp[n-i]) for i in 1..n'],
    starter: 'n = int(input("n: "))\n',
    solution: 'n = int(input("n: "))\ndp = [0] * (n + 1)\ndp[0] = dp[1] = 1\nfor i in range(2, n + 1):\n    for j in range(1, i + 1):\n        dp[i] += dp[j-1] * dp[i-j]\nprint(dp[n])',
    explanation: 'dp[n] = nth Catalan number. For each root choice i, the left subtree has i-1 nodes and the right has n-i nodes — multiply their counts and sum.'
  },
  {
    title: 'Interleaving Strings', difficulty: 'hard', topic: 'Dynamic Programming',
    description: 'Check if string c is an interleaving of strings a and b. Print <code>True</code> or <code>False</code>.',
    examples: [
      { output: 'True', explanation: 'a=\'aab\', b=\'axy\', c=\'aaxaby\'' },
      { output: 'False', explanation: 'a=\'aab\', b=\'axy\', c=\'aaxbay\'' }
    ],
    hints: ['DP: dp[i][j] = whether c[:i+j] is an interleaving of a[:i] and b[:j]'],
    starter: 'a, b, c = "aab", "axy", "aaxaby"\n',
    solution: 'a, b, c = "aab", "axy", "aaxaby"\nm, n = len(a), len(b)\nif m + n != len(c):\n    print(False)\nelse:\n    dp = [[False]*(n+1) for _ in range(m+1)]\n    dp[0][0] = True\n    for i in range(1, m+1):\n        dp[i][0] = dp[i-1][0] and a[i-1] == c[i-1]\n    for j in range(1, n+1):\n        dp[0][j] = dp[0][j-1] and b[j-1] == c[j-1]\n    for i in range(1, m+1):\n        for j in range(1, n+1):\n            dp[i][j] = (dp[i-1][j] and a[i-1] == c[i+j-1]) or \\\n                       (dp[i][j-1] and b[j-1] == c[i+j-1])\n    print(dp[m][n])',
    explanation: 'dp[i][j]: whether a[:i] and b[:j] interleave to form c[:i+j]. Transition: the last character of c came either from a[i-1] or b[j-1].'
  },
  {
    title: 'Minimum Window Substring', difficulty: 'hard', topic: 'Algorithms',
    description: 'Find the minimum window in string s that contains all characters of string t.',
    examples: [
      { output: 'BANC', explanation: 's=\'ADOBECODEBANC\', t=\'ABC\'' }
    ],
    hints: ['Sliding window with two pointers. Expand right, contract left when all chars are covered.'],
    starter: 's = "ADOBECODEBANC"\nt = "ABC"\n',
    solution: 'from collections import Counter\ns = "ADOBECODEBANC"\nt = "ABC"\nneed = Counter(t)\nhave = {}\nformed = 0\nreq = len(need)\nl = 0\nbest = (float("inf"), 0, 0)\nfor r, c in enumerate(s):\n    have[c] = have.get(c, 0) + 1\n    if c in need and have[c] == need[c]:\n        formed += 1\n    while formed == req:\n        if r - l + 1 < best[0]:\n            best = (r - l + 1, l, r)\n        lc = s[l]\n        have[lc] -= 1\n        if lc in need and have[lc] < need[lc]:\n            formed -= 1\n        l += 1\nprint(s[best[1]:best[2]+1])',
    explanation: 'Expand the right pointer to include all needed chars. Once covered, contract the left pointer to find the minimum valid window.'
  },
  {
    title: 'Edit Distance', difficulty: 'hard', topic: 'Dynamic Programming',
    description: 'Compute the minimum edit distance (insertions, deletions, substitutions) between two strings.',
    examples: [
      { output: '3', explanation: 'horse -> rorse -> rose -> rose -> rose... actually horse->ros = 3' }
    ],
    hints: ['Classic DP: dp[i][j] = min edits to convert s1[:i] to s2[:j]'],
    starter: 's1 = "horse"\ns2 = "ros"\n',
    solution: 's1 = "horse"\ns2 = "ros"\nm, n = len(s1), len(s2)\ndp = [[0]*(n+1) for _ in range(m+1)]\nfor i in range(m+1): dp[i][0] = i\nfor j in range(n+1): dp[0][j] = j\nfor i in range(1, m+1):\n    for j in range(1, n+1):\n        if s1[i-1] == s2[j-1]:\n            dp[i][j] = dp[i-1][j-1]\n        else:\n            dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])\nprint(dp[m][n])',
    explanation: 'dp[i][j] = cost to convert s1[:i] to s2[:j]. If chars match, no extra cost; otherwise take the minimum of delete, insert, or substitute plus 1.'
  },
  {
    title: 'Median of Two Sorted Arrays', difficulty: 'hard', topic: 'Algorithms',
    description: 'Find the median of two sorted arrays in O(log(min(m,n))) time.',
    examples: [
      { output: '2.5', explanation: 'a=[1,2], b=[3,4]' }
    ],
    hints: ['Binary search on the smaller array to find the correct partition'],
    starter: 'a = [1, 2]\nb = [3, 4]\n',
    solution: 'a = [1, 2]\nb = [3, 4]\nif len(a) > len(b):\n    a, b = b, a\nm, n = len(a), len(b)\nlo, hi = 0, m\nwhile lo <= hi:\n    i = (lo + hi) // 2\n    j = (m + n + 1) // 2 - i\n    maxL_a = float("-inf") if i == 0 else a[i-1]\n    minR_a = float("inf")  if i == m else a[i]\n    maxL_b = float("-inf") if j == 0 else b[j-1]\n    minR_b = float("inf")  if j == n else b[j]\n    if maxL_a <= minR_b and maxL_b <= minR_a:\n        if (m + n) % 2:\n            print(max(maxL_a, maxL_b))\n        else:\n            print((max(maxL_a, maxL_b) + min(minR_a, minR_b)) / 2)\n        break\n    elif maxL_a > minR_b:\n        hi = i - 1\n    else:\n        lo = i + 1',
    explanation: 'Binary search for the correct partition of the smaller array. At the right partition, all left-side elements <= all right-side elements across both arrays.'
  },
  {
    title: 'Reconstruct Itinerary', difficulty: 'hard', topic: 'Algorithms',
    description: 'Given airline tickets as [from, to] pairs, reconstruct the itinerary starting from JFK in lexical order.',
    examples: [
      { output: '[\'JFK\', \'ATL\', \'JFK\', \'SFO\', \'ATL\', \'SFO\']' }
    ],
    hints: ['Hierholzer\'s algorithm for Eulerian path. Use a sorted adjacency list and a stack.'],
    starter: 'from collections import defaultdict\ntickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]\n',
    solution: 'from collections import defaultdict\ntickets = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]\ngraph = defaultdict(list)\nfor src, dst in sorted(tickets, reverse=True):\n    graph[src].append(dst)\nstack = ["JFK"]\npath = []\nwhile stack:\n    while graph[stack[-1]]:\n        stack.append(graph[stack[-1]].pop())\n    path.append(stack.pop())\nprint(path[::-1])',
    explanation: 'Sort edges in reverse lexical order so popping gives lexical order. Hierholzer\'s algorithm: extend the path greedily; backtrack when stuck, appending to the result.'
  },
  {
    title: 'Largest Rectangle in Histogram', difficulty: 'hard', topic: 'Stack',
    description: 'Find the area of the largest rectangle that fits in a histogram.',
    examples: [
      { output: '10', explanation: 'heights=[2,1,5,6,2,3]' }
    ],
    hints: ['Use a stack of indices. Pop when the current bar is shorter than the stack top.'],
    starter: 'heights = [2, 1, 5, 6, 2, 3]\n',
    solution: 'heights = [2, 1, 5, 6, 2, 3]\nstack = []\nmax_area = 0\nfor i, h in enumerate(heights + [0]):\n    while stack and heights[stack[-1]] >= h:\n        height = heights[stack.pop()]\n        width = i if not stack else i - stack[-1] - 1\n        max_area = max(max_area, height * width)\n    stack.append(i)\nprint(max_area)',
    explanation: 'Maintain a stack of increasing bar indices. When a shorter bar is encountered, pop and compute the rectangle width extending back to the new stack top.'
  },
  {
    title: 'Alien Dictionary', difficulty: 'hard', topic: 'Algorithms',
    description: 'Given a sorted list of alien words, determine the character ordering of the alien alphabet.',
    examples: [
      { output: 'wertf', explanation: 'words=[\'wrt\',\'wrf\',\'er\',\'ett\',\'rftt\']' }
    ],
    hints: ['Compare adjacent words to extract ordering edges; topological sort the resulting graph'],
    starter: 'from collections import defaultdict, deque\nwords = ["wrt", "wrf", "er", "ett", "rftt"]\n',
    solution: 'from collections import defaultdict, deque\nwords = ["wrt","wrf","er","ett","rftt"]\nchars = set("".join(words))\ngraph = defaultdict(set)\nin_deg = {c: 0 for c in chars}\nfor i in range(len(words)-1):\n    a, b = words[i], words[i+1]\n    for ca, cb in zip(a, b):\n        if ca != cb:\n            if cb not in graph[ca]:\n                graph[ca].add(cb)\n                in_deg[cb] += 1\n            break\nq = deque(c for c in chars if in_deg[c] == 0)\norder = []\nwhile q:\n    c = q.popleft()\n    order.append(c)\n    for nb in graph[c]:\n        in_deg[nb] -= 1\n        if in_deg[nb] == 0:\n            q.append(nb)\nprint("".join(order))',
    explanation: 'Compare adjacent words letter by letter to find ordering constraints. Build a directed graph and use topological sort (Kahn\'s algorithm) to find the character order.'
  },
  {
    title: 'Word Search in Grid', difficulty: 'hard', topic: 'Backtracking',
    description: 'Find whether a word exists in a 2D letter grid, moving in 4 directions (no reuse of cells).',
    examples: [
      { output: 'True', explanation: 'word=\'ABCCED\' found in the grid' },
      { output: 'False', explanation: 'word=\'ABCB\'' }
    ],
    hints: ['DFS + backtracking: mark visited cells temporarily'],
    starter: 'grid = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]\n\ndef exists(board, word):\n    pass\n\nprint(exists(grid, "ABCCED"))\nprint(exists(grid, "ABCB"))\n',
    solution: 'grid = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]\n\ndef exists(board, word):\n    R, C = len(board), len(board[0])\n    def dfs(r, c, i):\n        if i == len(word): return True\n        if r<0 or r>=R or c<0 or c>=C or board[r][c] != word[i]: return False\n        tmp, board[r][c] = board[r][c], "#"\n        found = any(dfs(r+dr,c+dc,i+1) for dr,dc in [(-1,0),(1,0),(0,-1),(0,1)])\n        board[r][c] = tmp\n        return found\n    return any(dfs(r,c,0) for r in range(R) for c in range(C))\n\nprint(exists(grid, "ABCCED"))\nprint(exists(grid, "ABCB"))',
    explanation: 'DFS tries each direction. Temporarily overwrite visited cells with "#" to prevent reuse. Restore on backtrack.'
  },
  {
    title: 'Clone Graph', difficulty: 'hard', topic: 'Data Structures',
    description: 'Deep-clone an undirected graph represented as adjacency lists. Print cloned node values.',
    examples: [
      { output: '1: [2, 4]\n2: [1, 3]\n3: [2, 4]\n4: [1, 3]' }
    ],
    hints: ['BFS/DFS with a visited dict mapping original node to cloned node'],
    starter: 'from collections import defaultdict, deque\n\nclass Node:\n    def __init__(self, val):\n        self.val = val\n        self.neighbors = []\n\n# Build a 4-node cycle: 1-2-3-4-1\nnodes = [Node(i) for i in range(1, 5)]\nfor i, nbs in enumerate([(1,3),(0,2),(1,3),(0,2)]):\n    for nb in nbs: nodes[i].neighbors.append(nodes[nb])\n',
    solution: 'from collections import deque\n\nclass Node:\n    def __init__(self, val):\n        self.val = val\n        self.neighbors = []\n\nnodes = [Node(i) for i in range(1, 5)]\nfor i, nbs in enumerate([(1,3),(0,2),(1,3),(0,2)]):\n    for nb in nbs: nodes[i].neighbors.append(nodes[nb])\n\ndef clone_graph(node):\n    if not node: return None\n    clones = {}\n    q = deque([node])\n    clones[node] = Node(node.val)\n    while q:\n        cur = q.popleft()\n        for nb in cur.neighbors:\n            if nb not in clones:\n                clones[nb] = Node(nb.val)\n                q.append(nb)\n            clones[cur].neighbors.append(clones[nb])\n    return clones[node]\n\ncloned = clone_graph(nodes[0])\nvisited = set()\nq = deque([cloned])\nwhile q:\n    n = q.popleft()\n    if n.val in visited: continue\n    visited.add(n.val)\n    print(f"{n.val}: {sorted(nb.val for nb in n.neighbors)}")\n    for nb in n.neighbors:\n        if nb.val not in visited: q.append(nb)',
    explanation: 'BFS visits each node once. For each unvisited neighbour, create a clone and add it to the queue. Connect clone neighbours as you go.'
  },
  {
    title: 'Maximal Square', difficulty: 'hard', topic: 'Dynamic Programming',
    description: 'Find the side length of the largest square containing only 1s in a binary matrix.',
    examples: [
      { output: '2', explanation: 'largest 2×2 square of 1s' }
    ],
    hints: ['dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1 when cell is 1'],
    starter: 'matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]\n',
    solution: 'matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]\nR, C = len(matrix), len(matrix[0])\ndp = [[0]*C for _ in range(R)]\nmax_side = 0\nfor i in range(R):\n    for j in range(C):\n        if matrix[i][j] == "1":\n            dp[i][j] = 1 if i==0 or j==0 else min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1])+1\n            max_side = max(max_side, dp[i][j])\nprint(max_side)',
    explanation: 'dp[i][j] represents the side length of the largest square with its bottom-right corner at (i,j). It is limited by the three neighbouring squares above, left, and diagonal.'
  },
  {
    title: 'Count Palindromic Substrings', difficulty: 'hard', topic: 'Dynamic Programming',
    description: 'Count the number of palindromic substrings in a string.',
    examples: [
      { input: 'abc', output: '3' },
      { input: 'aaa', output: '6' }
    ],
    hints: ['Expand around each center (both odd and even length)'],
    starter: 's = input("String: ")\n',
    solution: 's = input("String: ")\ncount = 0\nfor center in range(2 * len(s) - 1):\n    l = center // 2\n    r = l + center % 2\n    while l >= 0 and r < len(s) and s[l] == s[r]:\n        count += 1\n        l -= 1; r += 1\nprint(count)',
    explanation: 'Treat each position (and gap between positions) as a potential palindrome center. Expand outward while characters match. Each expansion adds one palindrome.'
  },
  {
    title: 'Largest Number from Digits', difficulty: 'hard', topic: 'Algorithms',
    description: 'Arrange a list of non-negative integers to form the largest possible number.',
    examples: [
      { output: '9534330', explanation: 'nums=[3,30,34,5,9]' }
    ],
    hints: ['Custom sort: compare ab vs ba as strings to decide ordering'],
    starter: 'from functools import cmp_to_key\nnums = [3, 30, 34, 5, 9]\n',
    solution: 'from functools import cmp_to_key\nnums = [3, 30, 34, 5, 9]\nstrs = list(map(str, nums))\ndef cmp(a, b):\n    return -1 if a+b > b+a else (1 if a+b < b+a else 0)\nstrs.sort(key=cmp_to_key(cmp))\nresult = "".join(strs)\nprint("0" if result[0] == "0" else result)',
    explanation: 'For any two numbers a and b, "ab" > "ba" as strings means a should come first. This custom comparator gives the correct ordering for maximum concatenation.'
  },
  {
    title: 'Burst Balloons', difficulty: 'hard', topic: 'Dynamic Programming',
    description: 'Given balloon values, burst them to maximise coins. Bursting balloon i earns nums[i-1]*nums[i]*nums[i+1]. Boundaries are 1.',
    examples: [
      { output: '167', explanation: 'nums=[3,1,5,8]' }
    ],
    hints: ['Think in reverse: dp[i][j] = max coins from balloons between i and j. The last balloon to burst in range [i,j] is key.'],
    starter: 'nums = [3, 1, 5, 8]\n',
    solution: 'nums = [1] + [3, 1, 5, 8] + [1]\nn = len(nums)\ndp = [[0]*n for _ in range(n)]\nfor length in range(2, n):\n    for left in range(n - length):\n        right = left + length\n        for k in range(left+1, right):\n            coins = nums[left]*nums[k]*nums[right] + dp[left][k] + dp[k][right]\n            dp[left][right] = max(dp[left][right], coins)\nprint(dp[0][n-1])',
    explanation: 'Pad with boundary 1s. dp[left][right] = max coins from balloons strictly between left and right. For each possible last balloon k, compute the coins earned when k is last to pop.'
  },
  {
    title: 'Palindrome Partitioning', difficulty: 'hard', topic: 'Backtracking',
    description: 'Partition a string such that every substring in the partition is a palindrome. Print all partitions.',
    examples: [
      { input: 'aab', output: '[[\'a\', \'a\', \'b\'], [\'aa\', \'b\']]' }
    ],
    hints: ['Backtracking: at each position, try all prefixes that are palindromes'],
    starter: 's = input("String: ")\n',
    solution: 's = input("String: ")\nresult = []\ndef is_pal(t): return t == t[::-1]\ndef bt(start, path):\n    if start == len(s):\n        result.append(list(path)); return\n    for end in range(start+1, len(s)+1):\n        sub = s[start:end]\n        if is_pal(sub):\n            path.append(sub)\n            bt(end, path)\n            path.pop()\nbt(0, [])\nprint(result)',
    explanation: 'Backtrack from each position trying all palindromic prefixes. When the entire string is consumed, save the current partition.'
  },
  {
    title: 'Bus Routes', difficulty: 'hard', topic: 'BFS',
    description: 'Given bus routes (each a list of stops), find the minimum number of buses to take from source to target stop.',
    examples: [
      { output: '2', explanation: 'routes=[[1,2,7],[3,6,7]], source=1, target=6' }
    ],
    hints: ['BFS on bus routes, not stops. Each level = one bus taken.'],
    starter: 'from collections import defaultdict, deque\nroutes = [[1,2,7],[3,6,7]]\nsource, target = 1, 6\n',
    solution: 'from collections import defaultdict, deque\nroutes = [[1,2,7],[3,6,7]]\nsource, target = 1, 6\nstop_to_routes = defaultdict(set)\nfor i, r in enumerate(routes):\n    for s in r:\n        stop_to_routes[s].add(i)\nvisited_stops = {source}\nvisited_routes = set()\nq = deque([(source, 0)])\nwhile q:\n    stop, buses = q.popleft()\n    if stop == target:\n        print(buses); break\n    for ri in stop_to_routes[stop]:\n        if ri in visited_routes: continue\n        visited_routes.add(ri)\n        for nxt in routes[ri]:\n            if nxt not in visited_stops:\n                visited_stops.add(nxt)\n                q.append((nxt, buses+1))\nelse:\n    print(-1)',
    explanation: 'BFS treats each bus taken as one level. From the current stop, board any unvisited route. All stops on that route become reachable at the next level (buses+1).'
  },
  {
    title: 'Count Smaller After Self', difficulty: 'hard', topic: 'Algorithms',
    description: 'For each element, count how many elements to its right are smaller. Use a sorted list + binary search.',
    examples: [
      { output: '[2, 1, 1, 0]', explanation: 'nums=[5,2,6,1]' }
    ],
    hints: ['Process right to left. Binary search the sorted list to find the insertion point = count of smaller elements.'],
    starter: 'import bisect\nnums = [5, 2, 6, 1]\n',
    solution: 'import bisect\nnums = [5, 2, 6, 1]\nsorted_list = []\nresult = []\nfor n in reversed(nums):\n    pos = bisect.bisect_left(sorted_list, n)\n    result.append(pos)\n    bisect.insort(sorted_list, n)\nprint(result[::-1])',
    explanation: 'Process elements right to left. At each step, binary search the sorted list of already-processed elements. The insertion point equals the count of smaller elements to the right.'
  },
  {
    title: 'Maximum XOR of Two Numbers', difficulty: 'hard', topic: 'Data Structures',
    description: 'Find the maximum XOR of any two numbers in an array using a binary trie.',
    examples: [
      { output: '28', explanation: 'nums=[3,10,5,25,2,8] → 5 XOR 25 = 28' }
    ],
    hints: ['Insert each number bit by bit (MSB first). For each number, greedily choose the opposite bit.'],
    starter: 'nums = [3, 10, 5, 25, 2, 8]\n',
    solution: 'nums = [3, 10, 5, 25, 2, 8]\ntrie = {}\nfor n in nums:\n    node = trie\n    for i in range(31, -1, -1):\n        bit = (n >> i) & 1\n        node = node.setdefault(bit, {})\nmax_xor = 0\nfor n in nums:\n    node = trie\n    cur_xor = 0\n    for i in range(31, -1, -1):\n        bit = (n >> i) & 1\n        want = 1 - bit\n        if want in node:\n            cur_xor = (cur_xor << 1) | 1\n            node = node[want]\n        else:\n            cur_xor = cur_xor << 1\n            node = node[bit]\n    max_xor = max(max_xor, cur_xor)\nprint(max_xor)',
    explanation: 'Build a binary trie of all numbers. For each number, greedily follow the opposite bit at each level — this maximises the XOR. The accumulated bits form the maximum XOR value.'
  },
  {
    title: 'Course Schedule II', difficulty: 'hard', topic: 'Algorithms',
    description: 'Given courses with prerequisites, return a valid course order. Print the order or an empty list if impossible.',
    examples: [
      { output: '[0, 2, 1, 3]', explanation: '4 courses, prerequisites=[[1,0],[2,0],[3,1],[3,2]]' }
    ],
    hints: ['Topological sort (Kahn\'s). Start with courses having in-degree 0.'],
    starter: 'from collections import defaultdict, deque\nnum_courses = 4\nprereqs = [[1,0],[2,0],[3,1],[3,2]]\n',
    solution: 'from collections import defaultdict, deque\nnum_courses = 4\nprereqs = [[1,0],[2,0],[3,1],[3,2]]\ngraph = defaultdict(list)\nin_deg = [0] * num_courses\nfor a, b in prereqs:\n    graph[b].append(a)\n    in_deg[a] += 1\nq = deque(i for i in range(num_courses) if in_deg[i] == 0)\norder = []\nwhile q:\n    c = q.popleft()\n    order.append(c)\n    for nb in graph[c]:\n        in_deg[nb] -= 1\n        if in_deg[nb] == 0:\n            q.append(nb)\nprint(order if len(order) == num_courses else [])',
    explanation: 'Kahn\'s algorithm: courses with no prerequisites go first. Remove them and reduce in-degrees. If all courses are processed, a valid order exists; otherwise there is a cycle.'
  },
  {
    title: 'Minimum Cost to Connect Ropes', difficulty: 'hard', topic: 'Algorithms',
    description: 'Connect all ropes into one. The cost of connecting two ropes is their combined length. Minimise the total cost.',
    examples: [
      { output: '29', explanation: 'ropes=[4,3,2,6] → 2+3=5, 4+5=9, 6+9=15 → total=29' }
    ],
    hints: ['Use a min-heap: always merge the two shortest ropes first (greedy)'],
    starter: 'import heapq\nropes = [4, 3, 2, 6]\n',
    solution: 'import heapq\nropes = [4, 3, 2, 6]\nheapq.heapify(ropes)\ntotal = 0\nwhile len(ropes) > 1:\n    a = heapq.heappop(ropes)\n    b = heapq.heappop(ropes)\n    cost = a + b\n    total += cost\n    heapq.heappush(ropes, cost)\nprint(total)',
    explanation: 'Huffman-style greedy: always combine the two shortest ropes. A min-heap efficiently retrieves the smallest two in O(log n) per merge.'
  },
  {
    title: 'Longest Valid Parentheses', difficulty: 'hard', topic: 'Stack',
    description: 'Find the length of the longest valid (balanced) parentheses substring.',
    examples: [
      { input: ')()())', output: '4' },
      { input: '()()', output: '4' }
    ],
    hints: ['Use a stack storing indices. Push index of \'(\'; on \')\' pop and compute length from stack top.'],
    starter: 's = input("String: ")\n',
    solution: 's = input("String: ")\nstack = [-1]\nmax_len = 0\nfor i, c in enumerate(s):\n    if c == "(":\n        stack.append(i)\n    else:\n        stack.pop()\n        if not stack:\n            stack.append(i)\n        else:\n            max_len = max(max_len, i - stack[-1])\nprint(max_len)',
    explanation: 'The stack holds indices as boundary markers. When closing a valid pair, the length is current index minus the new stack top. An unmatched ")" becomes the new base boundary.'
  },
  {
    title: 'Find All Anagrams in String', difficulty: 'hard', topic: 'Strings',
    description: 'Find all start indices of anagram occurrences of pattern p in string s.',
    examples: [
      { output: '[0, 6]', explanation: 's=\'cbaebabacd\', p=\'abc\'' }
    ],
    hints: ['Sliding window of length len(p). Compare character frequency maps.'],
    starter: 'from collections import Counter\ns = "cbaebabacd"\np = "abc"\n',
    solution: 'from collections import Counter\ns = "cbaebabacd"\np = "abc"\nn, m = len(s), len(p)\nneed = Counter(p)\nwindow = Counter(s[:m])\nresult = []\nif window == need: result.append(0)\nfor i in range(m, n):\n    window[s[i]] += 1\n    left = s[i-m]\n    window[left] -= 1\n    if window[left] == 0: del window[left]\n    if window == need: result.append(i-m+1)\nprint(result)',
    explanation: 'Maintain a frequency window of size len(p). Slide it one character at a time: add the new right character and remove the old left. Compare counters at each position.'
  },
  {
    title: 'Evaluate Division', difficulty: 'hard', topic: 'Algorithms',
    description: 'Given equations like A/B=2.0, answer queries like A/C. Print -1.0 if unanswerable.',
    examples: [
      { output: '[6.0, 0.5, -1.0, 1.0]' }
    ],
    hints: ['Build a weighted graph. BFS from source to target, multiplying edge weights along the path.'],
    starter: 'from collections import defaultdict, deque\nequations = [["a","b"],["b","c"]]\nvalues = [2.0, 3.0]\nqueries = [["a","c"],["b","a"],["a","e"],["a","a"]]\n',
    solution: 'from collections import defaultdict, deque\nequations = [["a","b"],["b","c"]]\nvalues = [2.0, 3.0]\nqueries = [["a","c"],["b","a"],["a","e"],["a","a"]]\ngraph = defaultdict(dict)\nfor (a,b), v in zip(equations, values):\n    graph[a][b] = v\n    graph[b][a] = 1/v\n\ndef bfs(src, dst):\n    if src not in graph or dst not in graph: return -1.0\n    if src == dst: return 1.0\n    visited = set()\n    q = deque([(src, 1.0)])\n    while q:\n        node, prod = q.popleft()\n        if node == dst: return prod\n        visited.add(node)\n        for nb, w in graph[node].items():\n            if nb not in visited:\n                q.append((nb, prod*w))\n    return -1.0\n\nprint([bfs(a,b) for a,b in queries])',
    explanation: 'Build a bidirectional weighted graph (A→B with weight v, B→A with 1/v). BFS from source to target, accumulating the product of edge weights along the path.'
  },
  {
    title: 'Regular Expression Matching II', difficulty: 'hard', topic: 'Algorithms',
    description: 'Implement regex matching with <code>?</code> (any single char) and <code>*</code> (any sequence of chars). Print <code>True</code> or <code>False</code>.',
    examples: [
      { output: 'True', explanation: 'match(\'aa\',\'*\')' },
      { output: 'False', explanation: 'match(\'cb\',\'?a\')' }
    ],
    hints: ['DP: dp[i][j] = whether s[:i] matches p[:j]. \'*\' can match empty or extend a previous match.'],
    starter: 'def match(s, p):\n    pass\n\nprint(match("aa", "*"))\nprint(match("cb", "?a"))\nprint(match("adceb", "*a*b"))\n',
    solution: 'def match(s, p):\n    m, n = len(s), len(p)\n    dp = [[False]*(n+1) for _ in range(m+1)]\n    dp[0][0] = True\n    for j in range(1, n+1):\n        if p[j-1] == "*": dp[0][j] = dp[0][j-1]\n    for i in range(1, m+1):\n        for j in range(1, n+1):\n            if p[j-1] == "*":\n                dp[i][j] = dp[i-1][j] or dp[i][j-1]\n            elif p[j-1] == "?" or p[j-1] == s[i-1]:\n                dp[i][j] = dp[i-1][j-1]\n    return dp[m][n]\n\nprint(match("aa", "*"))\nprint(match("cb", "?a"))\nprint(match("adceb", "*a*b"))',
    explanation: '"*" can match zero chars (dp[i][j-1]) or one more char (dp[i-1][j]). "?" matches any single character. Regular chars require an exact match with a single char in s.'
  },
  {
    title: 'Minimum Number of Arrows', difficulty: 'hard', topic: 'Algorithms',
    description: 'Balloons span intervals on a number line. Find the minimum number of arrows to burst all balloons.',
    examples: [
      { output: '2', explanation: 'intervals=[[10,16],[2,8],[1,6],[7,12]]' }
    ],
    hints: ['Sort by end point. An arrow at the current end bursts all overlapping balloons.'],
    starter: 'intervals = [[10,16],[2,8],[1,6],[7,12]]\n',
    solution: 'intervals = [[10,16],[2,8],[1,6],[7,12]]\nintervals.sort(key=lambda x: x[1])\narrows = 1\nend = intervals[0][1]\nfor start, e in intervals[1:]:\n    if start > end:\n        arrows += 1\n        end = e\nprint(arrows)',
    explanation: 'Sort by end point. One arrow at the current end covers all overlapping balloons. When a balloon starts after the current arrow position, a new arrow is needed.'
  },
  {
    title: 'Smallest Range Covering K Lists', difficulty: 'hard', topic: 'Algorithms',
    description: 'Find the smallest range [a,b] such that each of k sorted lists has at least one element in [a,b].',
    examples: [
      { output: '[20, 24]', explanation: 'lists=[[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]' }
    ],
    hints: ['Use a min-heap with one element from each list. Track current max. Pop min, push next from same list.'],
    starter: 'import heapq\nlists = [[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]\n',
    solution: 'import heapq\nlists = [[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]\nheap = [(lst[0], i, 0) for i, lst in enumerate(lists)]\nheapq.heapify(heap)\nmax_val = max(lst[0] for lst in lists)\nbest = [heap[0][0], max_val]\nwhile True:\n    min_val, i, j = heapq.heappop(heap)\n    if j+1 == len(lists[i]): break\n    nxt = lists[i][j+1]\n    max_val = max(max_val, nxt)\n    heapq.heappush(heap, (nxt, i, j+1))\n    if max_val - heap[0][0] < best[1] - best[0]:\n        best = [heap[0][0], max_val]\nprint(best)',
    explanation: 'Keep one pointer per list in a min-heap. The range is [heap_min, current_max]. Advance the minimum pointer to shrink the range. Stop when any list is exhausted.'
  },
  {
    title: 'Basic Calculator', difficulty: 'hard', topic: 'Stack',
    description: 'Evaluate a string expression with +, -, and parentheses (no multiplication/division).',
    examples: [
      { input: '1 + 1', output: '2' },
      { input: '(1+(4+5+2)-3)+(6+8)', output: '23' }
    ],
    hints: ['Use a stack to save (result, sign) when opening parentheses'],
    starter: 's = input("Expression: ")\n',
    solution: 's = input("Expression: ")\nstack = []\nresult = sign = 0\nnum = ""\nfor c in s + "+":\n    if c.isdigit():\n        num += c\n    elif c in "+-":\n        if num: result += sign * int(num); num = ""\n        sign = 1 if c == "+" else -1\n    elif c == "(":\n        stack.append((result, sign))\n        result = 0; sign = 1\n    elif c == ")":\n        if num: result += sign * int(num); num = ""\n        prev_result, prev_sign = stack.pop()\n        result = prev_result + prev_sign * result\nprint(result)',
    explanation: 'Track current result and sign. On "(", push state and reset. On ")", pop saved state and combine. The extra "+" at the end flushes the last number.'
  },
  {
    title: 'Count of Smaller Primes', difficulty: 'hard', topic: 'Algorithms',
    description: 'For a list of integers, for each element output how many primes in the array are strictly smaller than it.',
    examples: [
      { output: '[0, 1, 1, 2, 3]', explanation: 'nums=[1,2,3,4,5]' }
    ],
    hints: ['Sieve of Eratosthenes to find primes, then sort with index, prefix-count primes'],
    starter: 'nums = [1, 2, 3, 4, 5]\n',
    solution: 'nums = [1, 2, 3, 4, 5]\nlimit = max(nums) + 1\nsieve = [True] * limit\nsieve[0] = sieve[1] = False\nfor i in range(2, int(limit**0.5)+1):\n    if sieve[i]:\n        for j in range(i*i, limit, i):\n            sieve[j] = False\nprimes = sorted(x for x in nums if sieve[x])\nimport bisect\nprint([bisect.bisect_left(primes, n) for n in nums])',
    explanation: 'Sieve the range to find primes. Collect sorted primes from the array. For each element, binary search to count how many primes are strictly smaller.'
  },
  {
    title: 'Stone Game DP', difficulty: 'hard', topic: 'Dynamic Programming',
    description: 'Two players take turns picking stones from either end of a row. Both play optimally. Can the first player always win when the count is even?',
    examples: [
      { output: 'True', explanation: 'piles=[5,3,4,5]. First player always wins with even-length arrays.' }
    ],
    hints: ['Mathematical insight: with even piles, first player can always choose a strategy. Or solve with DP.'],
    starter: 'piles = [5, 3, 4, 5]\n',
    solution: 'piles = [5, 3, 4, 5]\nn = len(piles)\n# dp[i][j] = max score difference (current player - opponent) for piles[i:j+1]\ndp = [[0]*n for _ in range(n)]\nfor i in range(n): dp[i][i] = piles[i]\nfor length in range(2, n+1):\n    for i in range(n - length + 1):\n        j = i + length - 1\n        dp[i][j] = max(piles[i] - dp[i+1][j], piles[j] - dp[i][j-1])\nprint(dp[0][n-1] > 0)',
    explanation: 'dp[i][j] = the score advantage the current player can achieve from piles i..j. A positive overall advantage means the first player wins. With even-length arrays, this is always True.'
  },
  {
    title: 'Find Duplicate Number', difficulty: 'hard', topic: 'Algorithms',
    description: 'In an array of n+1 integers where each is in [1,n], find the duplicate using O(1) extra space and no modifying the array.',
    examples: [
      { output: '3', explanation: 'nums=[1,3,4,2,2]' }
    ],
    hints: ['Floyd\'s cycle detection: treat the array as a linked list (value = next node index)'],
    starter: 'nums = [1, 3, 4, 2, 2]\n',
    solution: 'nums = [1, 3, 4, 2, 2]\nslow = fast = nums[0]\nwhile True:\n    slow = nums[slow]\n    fast = nums[nums[fast]]\n    if slow == fast: break\nslow = nums[0]\nwhile slow != fast:\n    slow = nums[slow]\n    fast = nums[fast]\nprint(slow)',
    explanation: 'The array forms an implicit linked list (index → value as next). The duplicate value creates a cycle. Floyd\'s algorithm finds the cycle entry point, which is the duplicate.'
  },
  {
    title: 'Arithmetic Slices', difficulty: 'hard', topic: 'Dynamic Programming',
    description: 'Count the number of arithmetic slices (contiguous subarrays of length ≥ 3 with constant difference).',
    examples: [
      { output: '3', explanation: 'A=[1,2,3,4] → [1,2,3], [2,3,4], [1,2,3,4]' }
    ],
    hints: ['dp[i] = number of arithmetic slices ending at i. If diff A[i]-A[i-1] == A[i-1]-A[i-2], dp[i] = dp[i-1]+1'],
    starter: 'A = [1, 2, 3, 4]\n',
    solution: 'A = [1, 2, 3, 4]\ndp = 0\ntotal = 0\nfor i in range(2, len(A)):\n    if A[i]-A[i-1] == A[i-1]-A[i-2]:\n        dp += 1\n        total += dp\n    else:\n        dp = 0\nprint(total)',
    explanation: 'When three consecutive elements form an arithmetic progression, any arithmetic slice ending at the previous index can be extended by one. dp tracks how many such slices end at the current index.'
  },
  {
    title: 'Longest Consecutive Sequence', difficulty: 'hard', topic: 'Algorithms',
    description: 'Find the length of the longest consecutive integer sequence in an unsorted array. O(n) time.',
    examples: [
      { output: '4', explanation: 'nums=[100,4,200,1,3,2] → 1,2,3,4' }
    ],
    hints: ['Use a set. Only start counting from the beginning of a sequence (num-1 not in set).'],
    starter: 'nums = [100, 4, 200, 1, 3, 2]\n',
    solution: 'nums = [100, 4, 200, 1, 3, 2]\nnum_set = set(nums)\nbest = 0\nfor n in num_set:\n    if n - 1 not in num_set:\n        length = 1\n        while n + length in num_set:\n            length += 1\n        best = max(best, length)\nprint(best)',
    explanation: 'Put all numbers in a set. For each number that starts a sequence (no predecessor), count how far the sequence extends. Each number is visited at most twice total: O(n).'
  },
  {
    title: 'Number of Subarrays with Bounded Maximum', difficulty: 'hard', topic: 'Algorithms',
    description: 'Count subarrays whose maximum element is in [left, right].',
    examples: [
      { output: '3', explanation: 'A=[2,1,4,3], left=2, right=3' }
    ],
    hints: ['Count subarrays with max<=right minus subarrays with max<=left-1'],
    starter: 'A = [2, 1, 4, 3]\nleft, right = 2, 3\n',
    solution: 'A = [2, 1, 4, 3]\nleft, right = 2, 3\ndef count_at_most(bound):\n    result = cur = 0\n    for n in A:\n        cur = cur + 1 if n <= bound else 0\n        result += cur\n    return result\nprint(count_at_most(right) - count_at_most(left - 1))',
    explanation: 'Subarrays with max in [L,R] = subarrays with max ≤ R minus subarrays with max ≤ L-1. Each helper counts subarrays with all elements ≤ bound using a sliding window.'
  }
];
