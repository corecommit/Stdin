const PROJECTS = [
  {
    id: 0, title: 'Hello, World!', difficulty: 'easy', topic: 'Basics',
    description: 'Write your very first Python program. Print the text <code>Hello, World!</code> to the console. This is the classic starting point for every developer.',
    examples: [
      { output: 'Hello, World!', explanation: 'print() sends text to the screen. The quotes mark it as a string — text data, not code.' }
    ],
    hints: ['Use the print() function', 'String literals use single or double quotes'],
    starter: '# Your first Python program!\nprint("Hello, World!")',
    solution: 'print("Hello, World!")',
    explanation: 'The <code>print()</code> function outputs text to the console. Pass a string literal as an argument.'
  },
  {
    id: 1, title: 'Simple Calculator', difficulty: 'easy', topic: 'Basics',
    description: 'Build a simple calculator that takes two numbers and prints the result of addition, subtraction, multiplication, and division.',
    examples: [
      { input: '10, then 5', output: 'Sum: 15.0\nDiff: 5.0\nProduct: 50.0\nQuotient: 2.0', explanation: 'Python computes all four operations. Division always returns a decimal (15.0 not 15) in Python 3.' }
    ],
    hints: ['Use float() to convert input', 'Division with / always returns float in Python 3'],
    starter: 'a = float(input("First number: "))\nb = float(input("Second number: "))\n# Print sum, diff, product, quotient\n',
    solution: 'a = float(input("First number: "))\nb = float(input("Second number: "))\nprint(f"Sum: {a+b}")\nprint(f"Diff: {a-b}")\nprint(f"Product: {a*b}")\nprint(f"Quotient: {a/b}")',
    explanation: 'We convert user input to float, then perform arithmetic. f-strings embed expressions inline: <code>f"Sum: {a+b}"</code>.'
  },
  {
    id: 2, title: 'Odd or Even', difficulty: 'easy', topic: 'Conditionals',
    description: 'Check if a number is odd or even. Take a number as input and print <code>Even</code> or <code>Odd</code>.',
    examples: [
      { input: '4', output: 'Even', explanation: '4 ÷ 2 = 2 with remainder 0 → Even.' },
      { input: '7', output: 'Odd', explanation: '7 ÷ 2 = 3 with remainder 1 → Odd.' }
    ],
    hints: ['Use the modulo operator %', 'n % 2 == 0 means even'],
    starter: 'n = int(input("Enter a number: "))\n# Check odd or even\n',
    solution: 'n = int(input("Enter a number: "))\nif n % 2 == 0:\n    print("Even")\nelse:\n    print("Odd")',
    explanation: 'Modulo <code>%</code> gives the remainder. If <code>n % 2 == 0</code>, the number is divisible by 2 → even.'
  },
  {
    id: 3, title: 'FizzBuzz', difficulty: 'easy', topic: 'Loops',
    description: 'Print numbers 1–100. For multiples of 3 print <code>Fizz</code>, for multiples of 5 print <code>Buzz</code>, for both print <code>FizzBuzz</code>.',
    examples: [
      { output: '1  2  Fizz  4  Buzz  Fizz  7  8  Fizz  Buzz  ...  FizzBuzz  ...', explanation: '3→Fizz (divisible by 3), 5→Buzz (divisible by 5), 15→FizzBuzz (both 3 and 5). Always check 15 first, otherwise 15 would only print Fizz.' }
    ],
    hints: ['Check divisibility by 15 first', 'range(1, 101) gives 1 to 100'],
    starter: 'for i in range(1, 101):\n    # Your FizzBuzz logic\n    pass\n',
    solution: 'for i in range(1, 101):\n    if i % 15 == 0:\n        print("FizzBuzz")\n    elif i % 3 == 0:\n        print("Fizz")\n    elif i % 5 == 0:\n        print("Buzz")\n    else:\n        print(i)',
    explanation: 'Check divisibility by 15 first — otherwise 15, 30, 45... would only match the 3 check.'
  },
  {
    id: 4, title: 'Reverse a String', difficulty: 'easy', topic: 'Strings',
    description: 'Take a string as input and print it reversed. For example <code>Python</code> → <code>nohtyP</code>.',
    examples: [
      { input: 'Python', output: 'nohtyP', explanation: 'The slice [::-1] reads the string backwards: P-y-t-h-o-n becomes n-o-h-t-y-P.' }
    ],
    hints: ['Slicing: s[start:stop:step]', 's[::-1] reverses any sequence'],
    starter: 's = input("Enter a string: ")\n# Reverse it\n',
    solution: 's = input("Enter a string: ")\nprint(s[::-1])',
    explanation: '<code>s[::-1]</code> starts from the end and steps backwards by 1, reversing the string.'
  },
  {
    id: 5, title: 'Count Vowels', difficulty: 'easy', topic: 'Strings',
    description: 'Count vowels (a, e, i, o, u — case insensitive) in a given string.',
    examples: [
      { input: 'Hello World', output: '3', explanation: 'The vowels in \'Hello World\' are: e (Hell<b>e</b>), o (Hell<b>o</b>), o (W<b>o</b>rld) = 3 total.' }
    ],
    hints: ['Convert to lowercase first', 'Check each character against \'aeiou\''],
    starter: 's = input("Enter a string: ")\n# Count vowels\n',
    solution: 's = input("Enter a string: ")\ncount = sum(1 for c in s.lower() if c in "aeiou")\nprint(count)',
    explanation: 'A generator expression inside <code>sum()</code> counts matching characters efficiently.'
  },
  {
    id: 6, title: 'Factorial', difficulty: 'easy', topic: 'Recursion',
    description: 'Compute the factorial of n (n!). Implement it recursively.',
    examples: [
      { input: '5', output: '120', explanation: '5! = 5 × 4 × 3 × 2 × 1 = 120. The function calls itself: factorial(5) → 5 × factorial(4) → …' },
      { input: '0', output: '1', explanation: '0! = 1 by definition. This is the base case that stops the recursion.' }
    ],
    hints: ['Base case: 0! = 1', 'Recursive: n! = n × (n-1)!'],
    starter: 'def factorial(n):\n    # Implement\n    pass\n\nn = int(input("Enter n: "))\nprint(factorial(n))\n',
    solution: 'def factorial(n):\n    if n == 0:\n        return 1\n    return n * factorial(n - 1)\n\nn = int(input("Enter n: "))\nprint(factorial(n))',
    explanation: 'Classic recursion: base case <code>0! = 1</code>, recursive case <code>n! = n × (n-1)!</code>.'
  },
  {
    id: 7, title: 'Fibonacci Sequence', difficulty: 'easy', topic: 'Loops',
    description: 'Print the first N Fibonacci numbers (each is the sum of the two before it).',
    examples: [
      { input: '8', output: '0 1 1 2 3 5 8 13', explanation: 'Each number = sum of the two before it: 0, 1, 0+1=1, 1+1=2, 1+2=3, 2+3=5, 3+5=8, 5+8=13.' }
    ],
    hints: ['Start with 0 and 1', 'Tuple swap: a, b = b, a + b'],
    starter: 'n = int(input("How many: "))\n# Print first n Fibonacci numbers\n',
    solution: 'n = int(input("How many: "))\na, b = 0, 1\nresult = []\nfor _ in range(n):\n    result.append(a)\n    a, b = b, a + b\nprint(*result)',
    explanation: 'Tuple swap <code>a, b = b, a+b</code> advances both values simultaneously without a temp variable.'
  },
  {
    id: 8, title: 'Palindrome Check', difficulty: 'easy', topic: 'Strings',
    description: 'Check if a string is a palindrome (reads same forwards and backwards), ignoring case and spaces.',
    examples: [
      { input: 'racecar', output: 'True', explanation: 'Reversed \'racecar\' is still \'racecar\' — it reads the same both ways.' },
      { input: 'hello', output: 'False', explanation: 'Reversed \'hello\' is \'olleh\' — different from original.' }
    ],
    hints: ['Remove spaces and lowercase', 'Compare with its reverse'],
    starter: 's = input("Enter string: ")\n# Check palindrome\n',
    solution: 's = input("Enter string: ")\ncleaned = s.lower().replace(" ", "")\nprint(cleaned == cleaned[::-1])',
    explanation: 'Strip spaces, lowercase, then compare with the reversed version.'
  },
  {
    id: 9, title: 'Number Guessing Game', difficulty: 'easy', topic: 'Loops',
    description: 'Generate a random 1–100 number. Let the user guess — respond too high, too low, or correct.',
    examples: [
      { output: 'Too low!\nToo high!\nCorrect in 3 attempts!' }
    ],
    hints: ['import random', 'random.randint(1, 100)', 'while True loop with break'],
    starter: 'import random\nsecret = random.randint(1, 100)\nattempts = 0\n\nwhile True:\n    guess = int(input("Guess (1-100): "))\n    attempts += 1\n    # Check guess here\n    pass\n',
    solution: 'import random\nsecret = random.randint(1, 100)\nattempts = 0\nwhile True:\n    guess = int(input("Guess (1-100): "))\n    attempts += 1\n    if guess < secret:\n        print("Too low!")\n    elif guess > secret:\n        print("Too high!")\n    else:\n        print(f"Correct in {attempts} attempts!")\n        break',
    explanation: '<code>while True</code> loops forever until we <code>break</code> on a correct guess.'
  },
  {
    id: 10, title: 'List Statistics', difficulty: 'easy', topic: 'Lists',
    description: 'Given space-separated numbers, compute and print minimum, maximum, sum, and average.',
    examples: [
      { input: '3 7 1 9 4', output: 'Min: 1\nMax: 9\nSum: 24\nAverage: 4.8', explanation: 'Smallest=1, largest=9, sum=3+7+1+9+4=24, average=24÷5=4.8.' }
    ],
    hints: ['split() and map(int, ...)', 'min(), max(), sum() are built-in'],
    starter: 'nums = list(map(int, input("Numbers: ").split()))\n# Compute stats\n',
    solution: 'nums = list(map(int, input("Numbers: ").split()))\nprint(f"Min: {min(nums)}")\nprint(f"Max: {max(nums)}")\nprint(f"Sum: {sum(nums)}")\nprint(f"Average: {sum(nums)/len(nums)}")',
    explanation: '<code>map(int, ...split())</code> converts tokens to ints. Python built-ins handle the rest.'
  },
  {
    id: 11, title: 'Caesar Cipher', difficulty: 'easy', topic: 'Strings',
    description: 'Shift each letter in the input by N positions. Non-letters unchanged. Preserve case.',
    examples: [
      { input: 'Text: "Hello World", Shift: 3', output: 'Khoor Zruog', explanation: 'Each letter shifts 3 places: H→K, e→h, l→o, l→o, o→r. Space is kept unchanged.' }
    ],
    hints: ['ord() and chr() convert chars to/from ASCII', 'A=65, a=97', 'Use % 26 to wrap'],
    starter: 'text = input("Text: ")\nshift = int(input("Shift: "))\nresult = ""\nfor ch in text:\n    pass  # shift ch\nprint(result)\n',
    solution: 'text = input("Text: ")\nshift = int(input("Shift: "))\nresult = ""\nfor ch in text:\n    if ch.isalpha():\n        base = ord("A") if ch.isupper() else ord("a")\n        result += chr((ord(ch) - base + shift) % 26 + base)\n    else:\n        result += ch\nprint(result)',
    explanation: 'Subtract base, add shift, wrap with <code>% 26</code>, add base back. Works for both upper and lower case.'
  },
  {
    id: 12, title: 'Multiplication Table', difficulty: 'easy', topic: 'Loops',
    description: 'Print the multiplication table for a given number from 1 to 10.',
    examples: [
      { input: '5', output: '5 x 1 = 5\n5 x 2 = 10\n...\n5 x 10 = 50', explanation: 'The loop runs i from 1 to 10, printing n × i each time.' }
    ],
    hints: ['Use a for loop with range(1, 11)', 'String formatting with f-strings'],
    starter: 'n = int(input("Number: "))\n# Print table\n',
    solution: 'n = int(input("Number: "))\nfor i in range(1, 11):\n    print(f"{n} x {i} = {n*i}")',
    explanation: 'A simple loop from 1 to 10, printing each multiplication result with f-string formatting.'
  },
  {
    id: 13, title: 'Sum of Digits', difficulty: 'easy', topic: 'Strings',
    description: 'Compute the sum of all digits in a given integer. For example, 1234 → 10.',
    examples: [
      { input: '1234', output: '10', explanation: '1+2+3+4 = 10' },
      { input: '9999', output: '36', explanation: '9+9+9+9 = 36' }
    ],
    hints: ['Convert to string to iterate digits', 'int(ch) converts a digit character'],
    starter: 'n = input("Enter a number: ")\n# Sum the digits\n',
    solution: 'n = input("Enter a number: ")\ntotal = sum(int(ch) for ch in n if ch.isdigit())\nprint(total)',
    explanation: 'Convert number to string, iterate characters, convert each digit back to int and sum them.'
  },
  {
    id: 14, title: 'Temperature Converter', difficulty: 'easy', topic: 'Functions',
    description: 'Convert Celsius to Fahrenheit and Kelvin. Print all three values.',
    examples: [
      { input: '100', output: 'Celsius: 100°C\nFahrenheit: 212.0°F\nKelvin: 373.15K', explanation: '100°C = boiling point. F = C×9÷5+32 = 212°F. Kelvin = C+273.15 = 373.15 (no negatives in Kelvin scale).' }
    ],
    hints: ['F = C * 9/5 + 32', 'K = C + 273.15'],
    starter: 'def to_fahrenheit(c):\n    pass\n\ndef to_kelvin(c):\n    pass\n\nc = float(input("Celsius: "))\n',
    solution: 'def to_fahrenheit(c):\n    return c * 9/5 + 32\n\ndef to_kelvin(c):\n    return c + 273.15\n\nc = float(input("Celsius: "))\nprint(f"Celsius: {c}°C")\nprint(f"Fahrenheit: {to_fahrenheit(c)}°F")\nprint(f"Kelvin: {to_kelvin(c)}K")',
    explanation: 'Two utility functions keep the conversion logic clean and reusable.'
  },
  {
    id: 15, title: 'List Comprehension Squares', difficulty: 'easy', topic: 'Lists',
    description: 'Use a list comprehension to generate a list of squares of numbers 1–N, then print them.',
    examples: [
      { input: '5', output: '[1, 4, 9, 16, 25]', explanation: '1²=1, 2²=4, 3²=9, 4²=16, 5²=25. List comprehension builds the whole list in one expression.' }
    ],
    hints: ['[expr for x in iterable]', 'x**2 computes square'],
    starter: 'n = int(input("N: "))\n# Build squares list using comprehension\n',
    solution: 'n = int(input("N: "))\nsquares = [x**2 for x in range(1, n+1)]\nprint(squares)',
    explanation: 'List comprehensions are concise: <code>[x**2 for x in range(1, n+1)]</code> builds the list in one line.'
  },
  {
    id: 16, title: 'Find Maximum Without max()', difficulty: 'easy', topic: 'Loops',
    description: 'Find the maximum value in a list without using Python\'s built-in <code>max()</code> function.',
    examples: [
      { input: '3 7 1 9 4', output: 'Maximum: 9', explanation: 'We scan through all values tracking the largest seen. 9 is bigger than 3, 7, 1, and 4.' }
    ],
    hints: ['Track the current max', 'Start with the first element'],
    starter: 'nums = list(map(int, input("Numbers: ").split()))\n# Find max manually\n',
    solution: 'nums = list(map(int, input("Numbers: ").split()))\ncurrent_max = nums[0]\nfor n in nums[1:]:\n    if n > current_max:\n        current_max = n\nprint(f"Maximum: {current_max}")',
    explanation: 'Initialize with the first element, then update <code>current_max</code> whenever a larger value is found.'
  },
  {
    id: 17, title: 'Count Words in Sentence', difficulty: 'easy', topic: 'Strings',
    description: 'Count how many words are in a sentence entered by the user.',
    examples: [
      { input: 'The quick brown fox', output: '4 words', explanation: 'split() splits on spaces giving [\'The\', \'quick\', \'brown\', \'fox\'] — 4 elements.' }
    ],
    hints: ['split() splits on whitespace', 'len() counts elements'],
    starter: 's = input("Enter sentence: ")\n# Count words\n',
    solution: 's = input("Enter sentence: ")\nwords = s.split()\nprint(f"{len(words)} words")',
    explanation: '<code>str.split()</code> splits on any whitespace and handles multiple spaces, returning a list of words.'
  },
  {
    id: 18, title: 'Simple Interest Calculator', difficulty: 'easy', topic: 'Math',
    description: 'Calculate Simple Interest: SI = (P × R × T) / 100. Take principal, rate, and time as inputs.',
    examples: [
      { input: 'Principal: 1000, Rate: 5%, Time: 3 years', output: 'Simple Interest: 150.0\nTotal Amount: 1150.0', explanation: 'SI = (1000 × 5 × 3) / 100 = 150. Total = 1000 + 150 = 1150.' }
    ],
    hints: ['SI = (P * R * T) / 100', 'Total = P + SI'],
    starter: 'P = float(input("Principal: "))\nR = float(input("Rate (%): "))\nT = float(input("Time (years): "))\n# Calculate\n',
    solution: 'P = float(input("Principal: "))\nR = float(input("Rate (%): "))\nT = float(input("Time (years): "))\nSI = (P * R * T) / 100\nprint(f"Simple Interest: {SI}")\nprint(f"Total Amount: {P + SI}")',
    explanation: 'Simple Interest formula: <code>SI = (P × R × T) / 100</code>. Total amount = principal + interest.'
  },
  {
    id: 19, title: 'Star Pattern', difficulty: 'easy', topic: 'Loops',
    description: 'Print a right-angled triangle star pattern of height N.',
    examples: [
      { input: '5', output: '*\n**\n***\n****\n*****', explanation: 'Row 1 prints 1 star, row 2 prints 2, up to N stars on row N.' }
    ],
    hints: ['Outer loop: rows 1 to N', 'Print \'*\' * i for each row'],
    starter: 'n = int(input("Height: "))\n# Print triangle pattern\n',
    solution: 'n = int(input("Height: "))\nfor i in range(1, n+1):\n    print("*" * i)',
    explanation: 'String multiplication: <code>"*" * i</code> repeats the star i times. Perfect for building patterns.'
  },
  {
    id: 20, title: 'Power of Two', difficulty: 'easy', topic: 'Math',
    description: 'Given a positive integer n, determine if it is a power of two. Print <code>Yes</code> or <code>No</code>.',
    examples: [
      { input: '8', output: 'Yes', explanation: '8 = 2³' },
      { input: '6', output: 'No', explanation: '6 is not a power of 2.' }
    ],
    hints: ['A power of 2 has exactly one bit set in binary', 'n & (n-1) == 0 for powers of 2'],
    starter: 'n = int(input("Enter n: "))\n# Check if n is a power of 2\n',
    solution: 'n = int(input("Enter n: "))\nprint("Yes" if n > 0 and (n & (n - 1)) == 0 else "No")',
    explanation: 'For any power of two, the binary form has exactly one 1-bit. <code>n & (n-1)</code> clears the lowest set bit — if the result is 0, only one bit was set.'
  },
  {
    id: 21, title: 'Swap Two Variables', difficulty: 'easy', topic: 'Basics',
    description: 'Read two integers, swap their values without using a third variable, and print them.',
    examples: [
      { input: '3, then 7', output: '7\n3', explanation: 'Python tuple swap requires no temp variable.' }
    ],
    hints: ['Use tuple unpacking: a, b = b, a'],
    starter: 'a = int(input("a: "))\nb = int(input("b: "))\n# Swap without a temp variable\n',
    solution: 'a = int(input("a: "))\nb = int(input("b: "))\na, b = b, a\nprint(a)\nprint(b)',
    explanation: '<code>a, b = b, a</code> uses Python tuple unpacking to swap in one line — no temp variable needed.'
  },
  {
    id: 22, title: 'Absolute Value', difficulty: 'easy', topic: 'Math',
    description: 'Print the absolute value of a number without using the built-in <code>abs()</code>.',
    examples: [
      { input: '-5', output: '5' },
      { input: '3', output: '3' }
    ],
    hints: ['Use a conditional: if n < 0, negate it'],
    starter: 'n = float(input("Enter number: "))\n# Compute absolute value manually\n',
    solution: 'n = float(input("Enter number: "))\nprint(-n if n < 0 else n)',
    explanation: 'If the number is negative, multiply by -1 to flip its sign. Otherwise keep it as-is.'
  },
  {
    id: 23, title: 'Largest of Three', difficulty: 'easy', topic: 'Conditionals',
    description: 'Read three integers and print the largest one without using <code>max()</code>.',
    examples: [
      { input: '4, then 9, then 2', output: '9' }
    ],
    hints: ['Compare them pairwise with if/elif/else'],
    starter: 'a = int(input("a: "))\nb = int(input("b: "))\nc = int(input("c: "))\n# Find the largest\n',
    solution: 'a = int(input("a: "))\nb = int(input("b: "))\nc = int(input("c: "))\nif a >= b and a >= c:\n    print(a)\nelif b >= a and b >= c:\n    print(b)\nelse:\n    print(c)',
    explanation: 'Compare each candidate against both others. The first one that beats both is the maximum.'
  },
  {
    id: 24, title: 'Count Down', difficulty: 'easy', topic: 'Loops',
    description: 'Read a positive integer n and print a countdown from n to 1, one number per line, then print <code>Go!</code>.',
    examples: [
      { input: '5', output: '5\n4\n3\n2\n1\nGo!' }
    ],
    hints: ['Use range(n, 0, -1)'],
    starter: 'n = int(input("Enter n: "))\n# Print countdown\n',
    solution: 'n = int(input("Enter n: "))\nfor i in range(n, 0, -1):\n    print(i)\nprint("Go!")',
    explanation: '<code>range(n, 0, -1)</code> counts from n down to 1 inclusive. After the loop, print the final message.'
  },
  {
    id: 25, title: 'Sum of List', difficulty: 'easy', topic: 'Lists',
    description: 'Read space-separated integers on one line and print their sum without using <code>sum()</code>.',
    examples: [
      { input: '1 2 3 4 5', output: '15' }
    ],
    hints: ['Use split() then a for loop accumulator'],
    starter: 'nums = list(map(int, input("Numbers: ").split()))\n# Sum without sum()\n',
    solution: 'nums = list(map(int, input("Numbers: ").split()))\ntotal = 0\nfor n in nums:\n    total += n\nprint(total)',
    explanation: 'Split the input into a list of integers and accumulate with a running total variable.'
  },
  {
    id: 26, title: 'Reverse a List', difficulty: 'easy', topic: 'Lists',
    description: 'Read space-separated integers and print them in reverse order on one line.',
    examples: [
      { input: '1 2 3 4 5', output: '5 4 3 2 1' }
    ],
    hints: ['Use slicing [::-1] or reversed()'],
    starter: 'nums = list(map(int, input("Numbers: ").split()))\n# Reverse and print\n',
    solution: 'nums = list(map(int, input("Numbers: ").split()))\nprint(*nums[::-1])',
    explanation: '<code>[::-1]</code> creates a reversed copy. <code>print(*list)</code> unpacks it space-separated.'
  },
  {
    id: 27, title: 'String to Title Case', difficulty: 'easy', topic: 'Strings',
    description: 'Read a sentence and print it in title case (first letter of every word capitalised).',
    examples: [
      { input: 'hello world from python', output: 'Hello World From Python' }
    ],
    hints: ['str.title() does this directly'],
    starter: 's = input("Sentence: ")\n',
    solution: 's = input("Sentence: ")\nprint(s.title())',
    explanation: '<code>str.title()</code> capitalises the first letter of each word and lowercases the rest.'
  },
  {
    id: 28, title: 'Count Characters', difficulty: 'easy', topic: 'Strings',
    description: 'Read a string and print the total number of characters (including spaces).',
    examples: [
      { input: 'Hello World', output: '11' }
    ],
    hints: ['len() counts all characters'],
    starter: 's = input("String: ")\n',
    solution: 's = input("String: ")\nprint(len(s))',
    explanation: '<code>len(s)</code> returns the number of characters in the string, including spaces and punctuation.'
  },
  {
    id: 29, title: 'Remove Duplicates from List', difficulty: 'easy', topic: 'Lists',
    description: 'Read space-separated integers and print the unique values in their original order.',
    examples: [
      { input: '1 2 3 2 1 4', output: '1 2 3 4' }
    ],
    hints: ['Use a set to track seen values, but iterate the original list'],
    starter: 'nums = list(map(int, input("Numbers: ").split()))\n',
    solution: 'nums = list(map(int, input("Numbers: ").split()))\nseen = set()\nresult = []\nfor n in nums:\n    if n not in seen:\n        seen.add(n)\n        result.append(n)\nprint(*result)',
    explanation: 'Iterate the list; only add an element to the result if it has not been seen before. A set provides O(1) lookup.'
  },
  {
    id: 30, title: 'Simple Interest', difficulty: 'easy', topic: 'Math',
    description: 'Given principal P, rate R (%), and time T (years), print Simple Interest and Total Amount.',
    examples: [
      { input: '1000, then 5, then 3', output: 'Simple Interest: 150.0\nTotal Amount: 1150.0' }
    ],
    hints: ['SI = P * R * T / 100'],
    starter: 'P = float(input("Principal: "))\nR = float(input("Rate %: "))\nT = float(input("Time (years): "))\n',
    solution: 'P = float(input("Principal: "))\nR = float(input("Rate %: "))\nT = float(input("Time (years): "))\nSI = P * R * T / 100\nprint(f"Simple Interest: {SI}")\nprint(f"Total Amount: {P + SI}")',
    explanation: 'Simple interest formula: SI = P × R × T ÷ 100. Total = P + SI.'
  },
  {
    id: 31, title: 'Number to Binary', difficulty: 'easy', topic: 'Math',
    description: 'Read a positive integer and print its binary representation (without the <code>0b</code> prefix).',
    examples: [
      { input: '10', output: '1010' }
    ],
    hints: ['bin() returns \'0b...\' — slice off the prefix'],
    starter: 'n = int(input("Enter n: "))\n',
    solution: 'n = int(input("Enter n: "))\nprint(bin(n)[2:])',
    explanation: '<code>bin(n)</code> returns a string like <code>"0b1010"</code>. Slicing from index 2 drops the prefix.'
  },
  {
    id: 32, title: 'Average of N Numbers', difficulty: 'easy', topic: 'Math',
    description: 'Read n, then n numbers, and print their average rounded to 2 decimal places.',
    examples: [
      { input: '4, then 10 20 30 40', output: '25.0' }
    ],
    hints: ['Collect numbers with a loop or input().split()'],
    starter: 'n = int(input("How many numbers: "))\nnums = list(map(float, input("Numbers: ").split()))\n',
    solution: 'n = int(input("How many numbers: "))\nnums = list(map(float, input("Numbers: ").split()))\nprint(round(sum(nums) / n, 2))',
    explanation: 'Sum all numbers and divide by n. <code>round(x, 2)</code> rounds to 2 decimal places.'
  },
  {
    id: 33, title: 'Check Leap Year', difficulty: 'easy', topic: 'Conditionals',
    description: 'Given a year, print <code>Leap</code> if it is a leap year, otherwise <code>Not Leap</code>.',
    examples: [
      { input: '2000', output: 'Leap' },
      { input: '1900', output: 'Not Leap' },
      { input: '2024', output: 'Leap' }
    ],
    hints: ['Divisible by 4, except centuries unless also divisible by 400'],
    starter: 'year = int(input("Year: "))\n',
    solution: 'year = int(input("Year: "))\nif (year % 4 == 0 and year % 100 != 0) or year % 400 == 0:\n    print("Leap")\nelse:\n    print("Not Leap")',
    explanation: 'A year is a leap year if it is divisible by 4, UNLESS it is a century year — century years need to be divisible by 400.'
  },
  {
    id: 34, title: 'GCD of Two Numbers', difficulty: 'easy', topic: 'Math',
    description: 'Compute the Greatest Common Divisor of two positive integers without importing <code>math</code>.',
    examples: [
      { input: '48, then 18', output: '6' }
    ],
    hints: ['Euclidean algorithm: gcd(a, b) = gcd(b, a % b)'],
    starter: 'a = int(input("a: "))\nb = int(input("b: "))\n# Compute GCD using Euclidean algorithm\n',
    solution: 'a = int(input("a: "))\nb = int(input("b: "))\nwhile b:\n    a, b = b, a % b\nprint(a)',
    explanation: 'Euclid\'s algorithm: repeatedly replace (a, b) with (b, a mod b). When b becomes 0, a holds the GCD.'
  },
  {
    id: 35, title: 'String Repeat', difficulty: 'easy', topic: 'Strings',
    description: 'Read a string and an integer n. Print the string repeated n times with a hyphen between each repetition.',
    examples: [
      { input: 'ha, then 3', output: 'ha-ha-ha' }
    ],
    hints: ['Use the join() method with a list or multiplication'],
    starter: 's = input("String: ")\nn = int(input("Repeat: "))\n',
    solution: 's = input("String: ")\nn = int(input("Repeat: "))\nprint("-".join([s] * n))',
    explanation: '<code>[s] * n</code> creates a list of n copies of s. <code>"-".join(...)</code> connects them with hyphens.'
  },
  {
    id: 36, title: 'Digit Sum Repeated', difficulty: 'easy', topic: 'Math',
    description: 'Repeatedly sum the digits of a number until it is a single digit. Print the result.',
    examples: [
      { input: '9875', output: '2', explanation: '9+8+7+5=29 → 2+9=11 → 1+1=2' }
    ],
    hints: ['Use a while loop: keep going while n >= 10'],
    starter: 'n = int(input("Enter number: "))\n',
    solution: 'n = int(input("Enter number: "))\nwhile n >= 10:\n    n = sum(int(d) for d in str(n))\nprint(n)',
    explanation: 'Keep replacing n with its digit sum until n is a single digit. The result is the digital root.'
  },
  {
    id: 37, title: 'Print Triangle', difficulty: 'easy', topic: 'Loops',
    description: 'Read a positive integer n and print a right-angled triangle of asterisks with n rows.',
    examples: [
      { input: '4', output: '*\n**\n***\n****' }
    ],
    hints: ['Outer loop from 1 to n, print i asterisks on each row'],
    starter: 'n = int(input("Rows: "))\n',
    solution: 'n = int(input("Rows: "))\nfor i in range(1, n + 1):\n    print("*" * i)',
    explanation: 'For each row i (1 to n), print exactly i asterisks. String multiplication <code>"*" * i</code> creates the repeated character.'
  },
  {
    id: 38, title: 'List Min Without min()', difficulty: 'easy', topic: 'Lists',
    description: 'Read space-separated integers and find the minimum value without using <code>min()</code>.',
    examples: [
      { input: '3 1 4 1 5 9 2 6', output: '1' }
    ],
    hints: ['Start with the first element and compare each subsequent one'],
    starter: 'nums = list(map(int, input("Numbers: ").split()))\n',
    solution: 'nums = list(map(int, input("Numbers: ").split()))\nmin_val = nums[0]\nfor n in nums[1:]:\n    if n < min_val:\n        min_val = n\nprint(min_val)',
    explanation: 'Initialise the minimum to the first element, then scan the rest, updating whenever a smaller value is found.'
  },
  {
    id: 39, title: 'Uppercase Checker', difficulty: 'easy', topic: 'Strings',
    description: 'Read a string and print how many uppercase letters it contains.',
    examples: [
      { input: 'Hello World', output: '2' }
    ],
    hints: ['Use str.isupper() on each character'],
    starter: 's = input("String: ")\n',
    solution: 's = input("String: ")\nprint(sum(1 for c in s if c.isupper()))',
    explanation: '<code>c.isupper()</code> is True only for uppercase letters. A generator inside <code>sum()</code> counts them.'
  },
  {
    id: 40, title: 'Dictionary from Two Lists', difficulty: 'easy', topic: 'Dictionaries',
    description: 'Given two space-separated lists (keys and values), create a dictionary and print it.',
    examples: [
      { input: 'a b c, then 1 2 3', output: '{\'a\': \'1\', \'b\': \'2\', \'c\': \'3\'}' }
    ],
    hints: ['Use zip() to pair keys and values'],
    starter: 'keys = input("Keys: ").split()\nvals = input("Values: ").split()\n',
    solution: 'keys = input("Keys: ").split()\nvals = input("Values: ").split()\nprint(dict(zip(keys, vals)))',
    explanation: '<code>zip(keys, vals)</code> pairs elements by position. <code>dict()</code> converts the pairs into a dictionary.'
  },
  {
    id: 41, title: 'Celsius to Fahrenheit', difficulty: 'easy', topic: 'Math',
    description: 'Convert a temperature from Celsius to Fahrenheit. Print the result rounded to 2 decimal places.',
    examples: [
      { input: '100', output: '212.0' },
      { input: '0', output: '32.0' }
    ],
    hints: ['F = C * 9/5 + 32'],
    starter: 'c = float(input("Celsius: "))\n',
    solution: 'c = float(input("Celsius: "))\nprint(round(c * 9 / 5 + 32, 2))',
    explanation: 'The formula F = C × 9⁄5 + 32 converts Celsius to Fahrenheit exactly.'
  },
  {
    id: 42, title: 'Flatten a List', difficulty: 'easy', topic: 'Lists',
    description: 'Given a list of lists (hardcoded), flatten it into a single list and print it.',
    examples: [
      { output: '[1, 2, 3, 4, 5, 6]', explanation: 'nested = [[1,2],[3,4],[5,6]]' }
    ],
    hints: ['Use a list comprehension with two for clauses'],
    starter: 'nested = [[1, 2], [3, 4], [5, 6]]\n# Flatten into a single list\n',
    solution: 'nested = [[1, 2], [3, 4], [5, 6]]\nflat = [x for sublist in nested for x in sublist]\nprint(flat)',
    explanation: 'A nested comprehension <code>[x for sub in nested for x in sub]</code> iterates each sublist then each element.'
  },
  {
    id: 43, title: 'Vowel or Consonant', difficulty: 'easy', topic: 'Strings',
    description: 'Read a single lowercase letter and print <code>Vowel</code> or <code>Consonant</code>.',
    examples: [
      { input: 'a', output: 'Vowel' },
      { input: 'b', output: 'Consonant' }
    ],
    hints: ['Check membership in \'aeiou\''],
    starter: 'c = input("Letter: ").lower()\n',
    solution: 'c = input("Letter: ").lower()\nprint("Vowel" if c in "aeiou" else "Consonant")',
    explanation: 'Check if the letter belongs to the string <code>"aeiou"</code>. Python\'s <code>in</code> operator handles this directly.'
  },
  {
    id: 44, title: 'Sum of Odd Numbers', difficulty: 'easy', topic: 'Loops',
    description: 'Read a positive integer n and print the sum of all odd numbers from 1 to n.',
    examples: [
      { input: '10', output: '25', explanation: '1+3+5+7+9 = 25' }
    ],
    hints: ['Use range(1, n+1, 2) to step through odd numbers'],
    starter: 'n = int(input("n: "))\n',
    solution: 'n = int(input("n: "))\nprint(sum(range(1, n + 1, 2)))',
    explanation: '<code>range(1, n+1, 2)</code> generates 1, 3, 5... up to n. <code>sum()</code> adds them all.'
  },
  {
    id: 45, title: 'Armstrong Number', difficulty: 'easy', topic: 'Math',
    description: 'An Armstrong number equals the sum of its digits each raised to the power of the number of digits (e.g. 153 = 1³+5³+3³). Print <code>Yes</code> or <code>No</code>.',
    examples: [
      { input: '153', output: 'Yes' },
      { input: '100', output: 'No' }
    ],
    hints: ['Convert to string to count digits and iterate them'],
    starter: 'n = int(input("n: "))\n# Check if n is an Armstrong number\n',
    solution: 'n = int(input("n: "))\ndigits = str(n)\npower = len(digits)\nprint("Yes" if sum(int(d)**power for d in digits) == n else "No")',
    explanation: 'Convert n to a string to get each digit and count them. Sum each digit raised to that count; compare to the original number.'
  },
  {
    id: 46, title: 'Perfect Number', difficulty: 'easy', topic: 'Math',
    description: 'A perfect number equals the sum of its proper divisors. Print <code>Perfect</code> or <code>Not Perfect</code>.',
    examples: [
      { input: '28', output: 'Perfect', explanation: '1+2+4+7+14 = 28' },
      { input: '12', output: 'Not Perfect' }
    ],
    hints: ['Find all divisors from 1 to n//2'],
    starter: 'n = int(input("n: "))\n',
    solution: 'n = int(input("n: "))\ntotal = sum(i for i in range(1, n) if n % i == 0)\nprint("Perfect" if total == n else "Not Perfect")',
    explanation: 'Sum all proper divisors (1 to n-1 that divide n evenly). If the sum equals n, it is perfect.'
  },
  {
    id: 47, title: 'Truncate String', difficulty: 'easy', topic: 'Strings',
    description: 'Read a string and a max length. If the string is longer, truncate and add <code>...</code>. Otherwise print as-is.',
    examples: [
      { input: 'Hello World, then 7', output: 'Hello W...' },
      { input: 'Hi, then 10', output: 'Hi' }
    ],
    hints: ['Compare len(s) to max_len before slicing'],
    starter: 's = input("String: ")\nmax_len = int(input("Max length: "))\n',
    solution: 's = input("String: ")\nmax_len = int(input("Max length: "))\nprint(s[:max_len] + "..." if len(s) > max_len else s)',
    explanation: 'If the string exceeds max_len, slice to that length and append "...". Otherwise return the string unchanged.'
  },
  {
    id: 48, title: 'Count Consonants', difficulty: 'easy', topic: 'Strings',
    description: 'Read a string and print the number of consonants (non-vowel alphabet letters).',
    examples: [
      { input: 'Hello World', output: '7' }
    ],
    hints: ['Check isalpha() and not in \'aeiou\''],
    starter: 's = input("String: ").lower()\n',
    solution: 's = input("String: ").lower()\nprint(sum(1 for c in s if c.isalpha() and c not in "aeiou"))',
    explanation: 'Filter characters that are alphabetic but not vowels. Count them with a generator sum.'
  },
  {
    id: 49, title: 'List Intersection', difficulty: 'easy', topic: 'Lists',
    description: 'Print the common elements of two space-separated lists (no duplicates, in order of first list).',
    examples: [
      { input: '1 2 3 4 5, then 3 4 5 6 7', output: '3 4 5' }
    ],
    hints: ['Convert second list to a set, then filter first list'],
    starter: 'a = list(map(int, input("List A: ").split()))\nb = set(map(int, input("List B: ").split()))\n',
    solution: 'a = list(map(int, input("List A: ").split()))\nb = set(map(int, input("List B: ").split()))\nseen = set()\nresult = []\nfor x in a:\n    if x in b and x not in seen:\n        result.append(x)\n        seen.add(x)\nprint(*result)',
    explanation: 'Use a set for O(1) lookup in b. Track seen elements to avoid duplicates in the output.'
  },
  {
    id: 50, title: 'Celsius to Kelvin', difficulty: 'easy', topic: 'Math',
    description: 'Convert Celsius to Kelvin. K = C + 273.15.',
    examples: [
      { input: '25', output: '298.15' },
      { input: '0', output: '273.15' }
    ],
    hints: ['Just add 273.15'],
    starter: 'c = float(input("Celsius: "))\n',
    solution: 'c = float(input("Celsius: "))\nprint(round(c + 273.15, 2))',
    explanation: 'The Kelvin scale starts at absolute zero, which is -273.15 °C. So K = C + 273.15.'
  },
  {
    id: 51, title: 'Check Sorted', difficulty: 'easy', topic: 'Lists',
    description: 'Read space-separated integers and print <code>Sorted</code> if they are in non-decreasing order, else <code>Not Sorted</code>.',
    examples: [
      { input: '1 2 3 4 5', output: 'Sorted' },
      { input: '1 3 2 4', output: 'Not Sorted' }
    ],
    hints: ['Compare each element to the next one'],
    starter: 'nums = list(map(int, input("Numbers: ").split()))\n',
    solution: 'nums = list(map(int, input("Numbers: ").split()))\nprint("Sorted" if all(nums[i] <= nums[i+1] for i in range(len(nums)-1)) else "Not Sorted")',
    explanation: 'Check that every adjacent pair is in non-decreasing order using <code>all()</code> over a generator.'
  },
  {
    id: 52, title: 'Initials from Name', difficulty: 'easy', topic: 'Strings',
    description: 'Read a full name and print the initials in uppercase separated by dots.',
    examples: [
      { input: 'john doe smith', output: 'J.D.S' }
    ],
    hints: ['Split on spaces and take the first character of each word'],
    starter: 'name = input("Full name: ")\n',
    solution: 'name = input("Full name: ")\nprint(".".join(w[0].upper() for w in name.split()))',
    explanation: 'Split the name into words, take the first letter of each, uppercase it, and join with dots.'
  },
  {
    id: 53, title: 'Multiplication Table', difficulty: 'easy', topic: 'Loops',
    description: 'Read a number n and print its multiplication table from 1 to 10.',
    examples: [
      { input: '5', output: '5 x 1 = 5\n5 x 2 = 10\n...' }
    ],
    hints: ['Loop from 1 to 10 with a for loop'],
    starter: 'n = int(input("n: "))\n',
    solution: 'n = int(input("n: "))\nfor i in range(1, 11):\n    print(f"{n} x {i} = {n * i}")',
    explanation: 'A simple for loop from 1 to 10 prints each product with an f-string.'
  },
  {
    id: 54, title: 'Flatten List of Strings', difficulty: 'easy', topic: 'Strings',
    description: 'Join a hardcoded list of strings into a single sentence, capitalise the first letter, and end with a period.',
    examples: [
      { output: 'The quick brown fox.' }
    ],
    hints: ['Use \' \'.join(), then capitalize the result and add \'.\''],
    starter: 'words = ["the", "quick", "brown", "fox"]\n',
    solution: 'words = ["the", "quick", "brown", "fox"]\nsentence = " ".join(words).capitalize() + "."\nprint(sentence)',
    explanation: '<code>str.capitalize()</code> uppercases the first character and lowercases the rest. Then append the period.'
  },
  {
    id: 55, title: 'Fibonacci Up To N', difficulty: 'easy', topic: 'Loops',
    description: 'Print all Fibonacci numbers less than or equal to n.',
    examples: [
      { input: '50', output: '0 1 1 2 3 5 8 13 21 34' }
    ],
    hints: ['Use two variables a, b and swap: a, b = b, a+b'],
    starter: 'n = int(input("n: "))\n',
    solution: 'n = int(input("n: "))\na, b = 0, 1\nresult = []\nwhile a <= n:\n    result.append(a)\n    a, b = b, a + b\nprint(*result)',
    explanation: 'Keep two variables for consecutive Fibonacci numbers. Append while the current value is within the limit.'
  },
  {
    id: 56, title: 'Simple Stack with List', difficulty: 'easy', topic: 'Data Structures',
    description: 'Implement push, pop, and peek operations on a stack using a Python list. Push 1,2,3, peek, pop, peek.',
    examples: [
      { output: '3\n3\n2' }
    ],
    hints: ['list.append() is push; list.pop() is pop; list[-1] is peek'],
    starter: 'stack = []\n# Push 1, 2, 3\n# Peek (print top)\n# Pop\n# Peek again\n',
    solution: 'stack = []\nstack.append(1)\nstack.append(2)\nstack.append(3)\nprint(stack[-1])\nstack.pop()\nprint(stack[-1])\nstack.pop()\nprint(stack[-1])',
    explanation: 'A Python list is a natural stack: <code>append()</code> pushes, <code>pop()</code> removes and returns the top, and <code>[-1]</code> peeks without removing.'
  },
  {
    id: 57, title: 'Word Length Filter', difficulty: 'easy', topic: 'Strings',
    description: 'Read a sentence and a minimum length. Print only the words longer than that length.',
    examples: [
      { input: 'the quick brown fox, then 3', output: 'quick\nbrown' }
    ],
    hints: ['Split and filter with a list comprehension'],
    starter: 's = input("Sentence: ")\nmin_len = int(input("Min length: "))\n',
    solution: 's = input("Sentence: ")\nmin_len = int(input("Min length: "))\nfor w in s.split():\n    if len(w) > min_len:\n        print(w)',
    explanation: 'Split the sentence into words and print each one whose length exceeds the minimum.'
  },
  {
    id: 58, title: 'Square Root Without sqrt', difficulty: 'easy', topic: 'Math',
    description: 'Compute the integer square root of n (floor) without using <code>math.sqrt</code>.',
    examples: [
      { input: '16', output: '4' },
      { input: '20', output: '4' }
    ],
    hints: ['Binary search between 0 and n, or use Newton\'s method'],
    starter: 'n = int(input("n: "))\n',
    solution: 'n = int(input("n: "))\nlo, hi = 0, n\nwhile lo <= hi:\n    mid = (lo + hi) // 2\n    if mid * mid == n:\n        print(mid); break\n    elif mid * mid < n:\n        lo = mid + 1\n    else:\n        hi = mid - 1\nelse:\n    print(hi)',
    explanation: 'Binary search for the largest integer whose square does not exceed n. When the loop ends without a break, <code>hi</code> holds the floor.'
  },
  {
    id: 59, title: 'List to Sentence', difficulty: 'easy', topic: 'Strings',
    description: 'Convert a list of words to a natural English sentence joined with commas and \'and\' before the last item.',
    examples: [
      { output: 'apples, bananas and cherries' },
      { output: 'apples and bananas' }
    ],
    hints: ['Handle cases: 1 word, 2 words, 3+ words separately'],
    starter: 'items = ["apples", "bananas", "cherries"]\n',
    solution: 'items = ["apples", "bananas", "cherries"]\nif len(items) == 1:\n    print(items[0])\nelif len(items) == 2:\n    print(f"{items[0]} and {items[1]}")\nelse:\n    print(", ".join(items[:-1]) + " and " + items[-1])',
    explanation: 'Join all but the last element with ", ", then append " and " followed by the last item. Handle short lists as special cases.'
  },
  {
    id: 60, title: 'Zip Two Lists', difficulty: 'easy', topic: 'Lists',
    description: 'Pair elements from two lists and print each pair.',
    examples: [
      { output: '(1, \'a\')\n(2, \'b\')\n(3, \'c\')' }
    ],
    hints: ['Use zip() to pair them'],
    starter: 'nums = [1, 2, 3]\nletters = ["a", "b", "c"]\n',
    solution: 'nums = [1, 2, 3]\nletters = ["a", "b", "c"]\nfor pair in zip(nums, letters):\n    print(pair)',
    explanation: '<code>zip()</code> lazily pairs corresponding elements. Iterating gives tuples of (num, letter).'
  },
  {
    id: 61, title: 'String Padding', difficulty: 'easy', topic: 'Strings',
    description: 'Read a string and a total width. Centre the string within that width, padding with dashes.',
    examples: [
      { input: 'hello, then 11', output: '---hello---' }
    ],
    hints: ['str.center(width, fillchar) does this'],
    starter: 's = input("String: ")\nwidth = int(input("Width: "))\n',
    solution: 's = input("String: ")\nwidth = int(input("Width: "))\nprint(s.center(width, "-"))',
    explanation: '<code>str.center(width, char)</code> pads both sides with the fill character to reach the given width.'
  },
  {
    id: 62, title: 'Odd Numbers in Range', difficulty: 'easy', topic: 'Loops',
    description: 'Print all odd numbers between a and b (inclusive) on one line.',
    examples: [
      { input: '1, then 15', output: '1 3 5 7 9 11 13 15' }
    ],
    hints: ['range(a, b+1, 2) if a is odd, or range(a|1, b+1, 2)'],
    starter: 'a = int(input("From: "))\nb = int(input("To: "))\n',
    solution: 'a = int(input("From: "))\nb = int(input("To: "))\nstart = a if a % 2 != 0 else a + 1\nprint(*range(start, b + 1, 2))',
    explanation: 'Adjust the start to the first odd number at or after a, then step by 2 through the range.'
  },
  {
    id: 63, title: 'Character Frequency', difficulty: 'easy', topic: 'Strings',
    description: 'Read a string and print each unique character with its count, sorted alphabetically.',
    examples: [
      { input: 'banana', output: 'a 3\nb 1\nn 2' }
    ],
    hints: ['Use a Counter and sort the items'],
    starter: 'from collections import Counter\ns = input("String: ")\n',
    solution: 'from collections import Counter\ns = input("String: ")\nfor ch, cnt in sorted(Counter(s).items()):\n    print(ch, cnt)',
    explanation: '<code>Counter(s)</code> counts each character. Sorting <code>.items()</code> gives alphabetical order.'
  },
  {
    id: 64, title: 'Number Pattern', difficulty: 'easy', topic: 'Loops',
    description: 'Print a number pyramid: row i has numbers 1 to i.',
    examples: [
      { input: '4', output: '1\n1 2\n1 2 3\n1 2 3 4' }
    ],
    hints: ['Outer loop for rows, inner print range(1, i+1)'],
    starter: 'n = int(input("Rows: "))\n',
    solution: 'n = int(input("Rows: "))\nfor i in range(1, n + 1):\n    print(*range(1, i + 1))',
    explanation: 'For each row i, print the integers 1 through i using <code>print(*range(...))</code> for space-separated output.'
  },
  {
    id: 65, title: 'Remove Whitespace', difficulty: 'easy', topic: 'Strings',
    description: 'Read a string and print it with all whitespace removed.',
    examples: [
      { input: '  hello   world  ', output: 'helloworld' }
    ],
    hints: ['Use replace or join after split'],
    starter: 's = input("String: ")\n',
    solution: 's = input("String: ")\nprint("".join(s.split()))',
    explanation: '<code>s.split()</code> splits on any whitespace and discards empty strings. Joining with <code>""</code> concatenates without separators.'
  },
  {
    id: 66, title: 'Check Anagram', difficulty: 'easy', topic: 'Strings',
    description: 'Read two strings. Print <code>Anagram</code> if they are anagrams, else <code>Not Anagram</code>.',
    examples: [
      { input: 'listen, then silent', output: 'Anagram' },
      { input: 'hello, then world', output: 'Not Anagram' }
    ],
    hints: ['Sort both strings and compare'],
    starter: 'a = input("String A: ").lower().replace(" ", "")\nb = input("String B: ").lower().replace(" ", "")\n',
    solution: 'a = input("String A: ").lower().replace(" ", "")\nb = input("String B: ").lower().replace(" ", "")\nprint("Anagram" if sorted(a) == sorted(b) else "Not Anagram")',
    explanation: 'Two strings are anagrams if their sorted character sequences are identical.'
  },
  {
    id: 67, title: 'Sum Even Indices', difficulty: 'easy', topic: 'Lists',
    description: 'Print the sum of all elements at even indices (0, 2, 4...) in a list.',
    examples: [
      { output: '9', explanation: 'lst=[1,2,3,4,5] → 1+3+5=9' }
    ],
    hints: ['Use slicing: lst[::2]'],
    starter: 'lst = [1, 2, 3, 4, 5]\n',
    solution: 'lst = [1, 2, 3, 4, 5]\nprint(sum(lst[::2]))',
    explanation: '<code>lst[::2]</code> slices every second element starting at index 0 (the even indices). Sum them directly.'
  },
  {
    id: 68, title: 'Piglatin', difficulty: 'easy', topic: 'Strings',
    description: 'Convert a word to Pig Latin: move the first consonant cluster to the end and add \'ay\'. Vowel-starting words just get \'yay\' appended.',
    examples: [
      { input: 'string', output: 'ingstray' },
      { input: 'apple', output: 'appleyay' }
    ],
    hints: ['Find where the vowels start; move everything before that to the end'],
    starter: 'w = input("Word: ").lower()\n',
    solution: 'w = input("Word: ").lower()\nvowels = "aeiou"\nfor i, c in enumerate(w):\n    if c in vowels:\n        print(w[i:] + w[:i] + "ay" if i > 0 else w + "yay")\n        break',
    explanation: 'Find the index of the first vowel. Everything before it is the consonant cluster — move it to the end and add "ay". If the word starts with a vowel, append "yay".'
  },
  {
    id: 69, title: 'Repeat Characters', difficulty: 'easy', topic: 'Strings',
    description: 'Read a string and integer n. Print the string with each character repeated n times.',
    examples: [
      { input: 'abc, then 3', output: 'aaabbbccc' }
    ],
    hints: ['Iterate characters and multiply each by n'],
    starter: 's = input("String: ")\nn = int(input("Repeat: "))\n',
    solution: 's = input("String: ")\nn = int(input("Repeat: "))\nprint("".join(c * n for c in s))',
    explanation: 'For each character, multiply it by n (string repetition) and join all results into one string.'
  },
  {
    id: 70, title: 'Word Frequency Counter', difficulty: 'medium', topic: 'Dictionaries',
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
    id: 71, title: 'Stack Implementation', difficulty: 'medium', topic: 'Data Structures',
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
    id: 72, title: 'Queue Implementation', difficulty: 'medium', topic: 'Data Structures',
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
    id: 73, title: 'Binary Search', difficulty: 'medium', topic: 'Algorithms',
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
    id: 74, title: 'Anagram Checker', difficulty: 'medium', topic: 'Strings',
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
    id: 75, title: 'Matrix Multiplication', difficulty: 'medium', topic: 'Math',
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
    id: 76, title: 'Bubble Sort', difficulty: 'medium', topic: 'Algorithms',
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
    id: 77, title: 'Selection Sort', difficulty: 'medium', topic: 'Algorithms',
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
    id: 78, title: 'Insertion Sort', difficulty: 'medium', topic: 'Algorithms',
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
    id: 79, title: 'Linked List', difficulty: 'medium', topic: 'Data Structures',
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
    id: 80, title: 'Prime Sieve', difficulty: 'medium', topic: 'Math',
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
    id: 81, title: 'JSON Data Parser', difficulty: 'medium', topic: 'JSON',
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
    id: 82, title: 'Decorator: Timer', difficulty: 'medium', topic: 'Decorators',
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
    id: 83, title: 'Regex Email Validator', difficulty: 'medium', topic: 'Regex',
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
    id: 84, title: 'File Word Count (Simulation)', difficulty: 'medium', topic: 'File I/O',
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
    id: 85, title: 'Generator: Infinite Counter', difficulty: 'medium', topic: 'Generators',
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
    id: 86, title: 'Context Manager', difficulty: 'medium', topic: 'Advanced Python',
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
    id: 87, title: 'Memoization with lru_cache', difficulty: 'medium', topic: 'Performance',
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
    id: 88, title: 'Class Inheritance', difficulty: 'medium', topic: 'OOP',
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
    id: 89, title: 'Property Decorators', difficulty: 'medium', topic: 'OOP',
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
    id: 90, title: 'Iterator Protocol', difficulty: 'medium', topic: 'Advanced Python',
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
    id: 91, title: 'Comprehension Mastery', difficulty: 'medium', topic: 'Comprehensions',
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
    id: 92, title: 'Flatten Nested List', difficulty: 'medium', topic: 'Recursion',
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
    id: 93, title: 'Two Sum Problem', difficulty: 'medium', topic: 'Algorithms',
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
    id: 94, title: 'Palindrome Number', difficulty: 'medium', topic: 'Math',
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
    id: 95, title: 'Roman Numerals Converter', difficulty: 'medium', topic: 'Strings',
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
    id: 96, title: 'Spiral Matrix', difficulty: 'medium', topic: 'Algorithms',
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
    id: 97, title: 'Balanced Parentheses', difficulty: 'medium', topic: 'Stack',
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
    id: 98, title: 'String Compression', difficulty: 'medium', topic: 'Strings',
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
    id: 99, title: 'Rotate Array', difficulty: 'medium', topic: 'Arrays',
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
    id: 100, title: 'Find Duplicates', difficulty: 'medium', topic: 'Algorithms',
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
    id: 101, title: 'Zip and Unzip Dictionaries', difficulty: 'medium', topic: 'Dictionaries',
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
    id: 102, title: 'Exception Handling Chain', difficulty: 'medium', topic: 'Exceptions',
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
    id: 103, title: 'defaultdict Counter', difficulty: 'medium', topic: 'Dictionaries',
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
    id: 104, title: 'Zip Longest Merger', difficulty: 'medium', topic: 'Itertools',
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
    id: 105, title: 'Two Sum Indices', difficulty: 'medium', topic: 'Arrays',
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
    id: 106, title: 'Count Occurrences', difficulty: 'medium', topic: 'Strings',
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
    id: 107, title: 'Matrix Transpose', difficulty: 'medium', topic: 'Arrays',
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
    id: 108, title: 'Longest Word', difficulty: 'medium', topic: 'Strings',
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
    id: 109, title: 'Valid Parentheses Extended', difficulty: 'medium', topic: 'Stack',
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
    id: 110, title: 'Merge Two Sorted Lists', difficulty: 'medium', topic: 'Algorithms',
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
    id: 111, title: 'Find Missing Number', difficulty: 'medium', topic: 'Arrays',
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
    id: 112, title: 'Group By First Letter', difficulty: 'medium', topic: 'Dictionaries',
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
    id: 113, title: 'Binary to Decimal', difficulty: 'medium', topic: 'Math',
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
    id: 114, title: 'Rotate String', difficulty: 'medium', topic: 'Strings',
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
    id: 115, title: 'Run-Length Encoding', difficulty: 'medium', topic: 'Strings',
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
    id: 116, title: 'Second Largest', difficulty: 'medium', topic: 'Lists',
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
    id: 117, title: 'Number to Roman', difficulty: 'medium', topic: 'Strings',
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
    id: 118, title: 'Prime Factorisation', difficulty: 'medium', topic: 'Math',
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
    id: 119, title: 'Most Common Element', difficulty: 'medium', topic: 'Dictionaries',
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
    id: 120, title: 'Pascal\'s Triangle Row', difficulty: 'medium', topic: 'Math',
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
    id: 121, title: 'Zip to Dictionary', difficulty: 'medium', topic: 'Comprehensions',
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
    id: 122, title: 'Recursive Sum of List', difficulty: 'medium', topic: 'Recursion',
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
    id: 123, title: 'String Permutations', difficulty: 'medium', topic: 'Recursion',
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
    id: 124, title: 'Chunk List', difficulty: 'medium', topic: 'Lists',
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
    id: 125, title: 'Flatten Dict Keys', difficulty: 'medium', topic: 'Dictionaries',
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
    id: 126, title: 'Moving Average', difficulty: 'medium', topic: 'Algorithms',
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
    id: 127, title: 'Count Islands', difficulty: 'medium', topic: 'Algorithms',
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
    id: 128, title: 'Stock Buy and Sell', difficulty: 'medium', topic: 'Algorithms',
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
    id: 129, title: 'Spiral Order Print', difficulty: 'medium', topic: 'Arrays',
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
    id: 130, title: 'Anagram Groups', difficulty: 'medium', topic: 'Strings',
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
    id: 131, title: 'Tower of Hanoi', difficulty: 'medium', topic: 'Recursion',
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
    id: 132, title: 'String Compression v2', difficulty: 'medium', topic: 'Strings',
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
    id: 133, title: 'Longest Palindromic Substring', difficulty: 'medium', topic: 'Strings',
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
    id: 134, title: 'Decode Ways', difficulty: 'medium', topic: 'Dynamic Programming',
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
    id: 135, title: 'Valid Sudoku', difficulty: 'medium', topic: 'Arrays',
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
    id: 136, title: 'Balanced Binary Tree Check', difficulty: 'medium', topic: 'Data Structures',
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
    id: 137, title: 'Product of Array Except Self', difficulty: 'medium', topic: 'Arrays',
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
    id: 138, title: 'Subarray Sum Equals K', difficulty: 'medium', topic: 'Arrays',
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
    id: 139, title: 'Rotate Image 90°', difficulty: 'medium', topic: 'Arrays',
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
    id: 140, title: 'Letter Combinations Phone', difficulty: 'medium', topic: 'Recursion',
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
    id: 141, title: 'Majority Element', difficulty: 'medium', topic: 'Algorithms',
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
    id: 142, title: 'Valid Mountain Array', difficulty: 'medium', topic: 'Arrays',
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
    id: 143, title: 'Interval Merge', difficulty: 'medium', topic: 'Algorithms',
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
    id: 144, title: 'Trie Autocomplete', difficulty: 'medium', topic: 'Data Structures',
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
    id: 145, title: 'Max Depth Binary Tree', difficulty: 'medium', topic: 'Data Structures',
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
    id: 146, title: 'Path Sum in Tree', difficulty: 'medium', topic: 'Data Structures',
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
    id: 147, title: 'Bitwise AND of Range', difficulty: 'medium', topic: 'Math',
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
    id: 148, title: 'Zigzag Conversion', difficulty: 'medium', topic: 'Strings',
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
    id: 149, title: 'Top K Frequent Words', difficulty: 'medium', topic: 'Algorithms',
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
    id: 150, title: 'Number of Islands II', difficulty: 'medium', topic: 'Algorithms',
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
    id: 151, title: 'Unique Paths Grid', difficulty: 'medium', topic: 'Dynamic Programming',
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
    id: 152, title: 'Flatten Binary Tree to Linked List', difficulty: 'medium', topic: 'Data Structures',
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
    id: 153, title: 'Random Weighted Choice', difficulty: 'medium', topic: 'Algorithms',
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
    id: 154, title: 'Cycle Detection in Linked List', difficulty: 'medium', topic: 'Algorithms',
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
    id: 155, title: 'Jump Game', difficulty: 'medium', topic: 'Algorithms',
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
    id: 156, title: 'Score After Parentheses', difficulty: 'medium', topic: 'Stack',
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
    id: 157, title: 'Partition Labels', difficulty: 'medium', topic: 'Algorithms',
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
    id: 158, title: 'Decode String', difficulty: 'medium', topic: 'Stack',
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
    id: 159, title: 'Next Greater Element', difficulty: 'medium', topic: 'Stack',
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
    id: 160, title: 'Kth Largest Element', difficulty: 'medium', topic: 'Algorithms',
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
    id: 161, title: 'Squares of Sorted Array', difficulty: 'medium', topic: 'Arrays',
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
    id: 162, title: 'Search in Rotated Array', difficulty: 'medium', topic: 'Algorithms',
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
    id: 163, title: 'Minimum Stack', difficulty: 'medium', topic: 'Data Structures',
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
    id: 164, title: 'Combination Sum', difficulty: 'medium', topic: 'Backtracking',
    description: 'Find all unique combinations of candidates that sum to a target. Each number may be used multiple times.',
    examples: [
      { output: '[[2, 2, 3], [7]]', explanation: 'candidates=[2,3,6,7], target=7' }
    ],
    hints: ['Backtracking: try each candidate from current index; subtract from remaining target'],
    starter: 'candidates = [2, 3, 6, 7]\ntarget = 7\n',
    solution: 'candidates = [2, 3, 6, 7]\ntarget = 7\nresult = []\ndef bt(start, remaining, path):\n    if remaining == 0:\n        result.append(list(path)); return\n    for i in range(start, len(candidates)):\n        c = candidates[i]\n        if c <= remaining:\n            path.append(c)\n            bt(i, remaining - c, path)\n            path.pop()\nbt(0, target, [])\nprint(result)',
    explanation: 'Backtracking tries each candidate from the current index (allowing reuse). When remaining hits 0, a valid combination is found. Pruning stops if the candidate exceeds remaining.'
  },
  {
    id: 165, title: 'Merge Sort', difficulty: 'hard', topic: 'Algorithms',
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
    id: 166, title: 'Quick Sort', difficulty: 'hard', topic: 'Algorithms',
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
    id: 167, title: 'Binary Tree Traversals', difficulty: 'hard', topic: 'Data Structures',
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
    id: 168, title: 'LRU Cache', difficulty: 'hard', topic: 'Data Structures',
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
    id: 169, title: 'Graph BFS & DFS', difficulty: 'hard', topic: 'Algorithms',
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
    id: 170, title: 'Knapsack Problem (DP)', difficulty: 'hard', topic: 'Dynamic Programming',
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
    id: 171, title: 'Longest Common Subsequence', difficulty: 'hard', topic: 'Dynamic Programming',
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
    id: 172, title: 'Coin Change Problem', difficulty: 'hard', topic: 'Dynamic Programming',
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
    id: 173, title: 'Dijkstra\'s Algorithm', difficulty: 'hard', topic: 'Algorithms',
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
    id: 174, title: 'Trie (Prefix Tree)', difficulty: 'hard', topic: 'Data Structures',
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
    id: 175, title: 'Heap Implementation', difficulty: 'hard', topic: 'Data Structures',
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
    id: 176, title: 'Topological Sort', difficulty: 'hard', topic: 'Algorithms',
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
    id: 177, title: 'N-Queens Problem', difficulty: 'hard', topic: 'Backtracking',
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
    id: 178, title: 'Minimax for Tic-Tac-Toe', difficulty: 'hard', topic: 'AI',
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
    id: 179, title: 'Word Ladder', difficulty: 'hard', topic: 'BFS',
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
    id: 180, title: 'Segment Tree', difficulty: 'hard', topic: 'Data Structures',
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
    id: 181, title: 'Longest Increasing Subsequence', difficulty: 'hard', topic: 'Dynamic Programming',
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
    id: 182, title: 'Matrix Chain Multiplication', difficulty: 'hard', topic: 'Dynamic Programming',
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
    id: 183, title: 'Union-Find (Disjoint Sets)', difficulty: 'hard', topic: 'Data Structures',
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
    id: 184, title: 'LRU Cache from Scratch', difficulty: 'hard', topic: 'Data Structures',
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
    id: 185, title: 'Valid BST Check', difficulty: 'hard', topic: 'Data Structures',
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
    id: 186, title: 'Flatten Nested Iterables', difficulty: 'hard', topic: 'Generators',
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
    id: 187, title: 'Consistent Hashing Ring', difficulty: 'hard', topic: 'Algorithms',
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
    id: 188, title: 'Word Break Problem', difficulty: 'hard', topic: 'Dynamic Programming',
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
    id: 189, title: 'Sliding Window Maximum', difficulty: 'hard', topic: 'Data Structures',
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
    id: 190, title: 'Serialize and Deserialize Tree', difficulty: 'hard', topic: 'Data Structures',
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
    id: 191, title: 'Trap Rainwater', difficulty: 'hard', topic: 'Algorithms',
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
    id: 192, title: 'Regular Expression Engine', difficulty: 'hard', topic: 'Algorithms',
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
    id: 193, title: 'Suffix Array', difficulty: 'hard', topic: 'Algorithms',
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
    id: 194, title: 'Power Set', difficulty: 'hard', topic: 'Recursion',
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
    id: 195, title: 'Kadane\'s Algorithm', difficulty: 'hard', topic: 'Dynamic Programming',
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
    id: 196, title: 'Generate All BSTs', difficulty: 'hard', topic: 'Data Structures',
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
    id: 197, title: 'Interleaving Strings', difficulty: 'hard', topic: 'Dynamic Programming',
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
    id: 198, title: 'Minimum Window Substring', difficulty: 'hard', topic: 'Algorithms',
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
    id: 199, title: 'Edit Distance', difficulty: 'hard', topic: 'Dynamic Programming',
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
    id: 200, title: 'Median of Two Sorted Arrays', difficulty: 'hard', topic: 'Algorithms',
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
    id: 201, title: 'Reconstruct Itinerary', difficulty: 'hard', topic: 'Algorithms',
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
    id: 202, title: 'Largest Rectangle in Histogram', difficulty: 'hard', topic: 'Stack',
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
    id: 203, title: 'Alien Dictionary', difficulty: 'hard', topic: 'Algorithms',
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
    id: 204, title: 'Word Search in Grid', difficulty: 'hard', topic: 'Backtracking',
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
    id: 205, title: 'Clone Graph', difficulty: 'hard', topic: 'Data Structures',
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
    id: 206, title: 'Maximal Square', difficulty: 'hard', topic: 'Dynamic Programming',
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
    id: 207, title: 'Count Palindromic Substrings', difficulty: 'hard', topic: 'Dynamic Programming',
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
    id: 208, title: 'Largest Number from Digits', difficulty: 'hard', topic: 'Algorithms',
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
    id: 209, title: 'Burst Balloons', difficulty: 'hard', topic: 'Dynamic Programming',
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
    id: 210, title: 'Palindrome Partitioning', difficulty: 'hard', topic: 'Backtracking',
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
    id: 211, title: 'Bus Routes', difficulty: 'hard', topic: 'BFS',
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
    id: 212, title: 'Count Smaller After Self', difficulty: 'hard', topic: 'Algorithms',
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
    id: 213, title: 'Maximum XOR of Two Numbers', difficulty: 'hard', topic: 'Data Structures',
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
    id: 214, title: 'Course Schedule II', difficulty: 'hard', topic: 'Algorithms',
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
    id: 215, title: 'Minimum Cost to Connect Ropes', difficulty: 'hard', topic: 'Algorithms',
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
    id: 216, title: 'Longest Valid Parentheses', difficulty: 'hard', topic: 'Stack',
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
    id: 217, title: 'Find All Anagrams in String', difficulty: 'hard', topic: 'Strings',
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
    id: 218, title: 'Evaluate Division', difficulty: 'hard', topic: 'Algorithms',
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
    id: 219, title: 'Regular Expression Matching II', difficulty: 'hard', topic: 'Algorithms',
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
    id: 220, title: 'Minimum Number of Arrows', difficulty: 'hard', topic: 'Algorithms',
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
    id: 221, title: 'Smallest Range Covering K Lists', difficulty: 'hard', topic: 'Algorithms',
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
    id: 222, title: 'Basic Calculator', difficulty: 'hard', topic: 'Stack',
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
    id: 223, title: 'Count of Smaller Primes', difficulty: 'hard', topic: 'Algorithms',
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
    id: 224, title: 'Stone Game DP', difficulty: 'hard', topic: 'Dynamic Programming',
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
    id: 225, title: 'Find Duplicate Number', difficulty: 'hard', topic: 'Algorithms',
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
    id: 226, title: 'Arithmetic Slices', difficulty: 'hard', topic: 'Dynamic Programming',
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
    id: 227, title: 'Longest Consecutive Sequence', difficulty: 'hard', topic: 'Algorithms',
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
    id: 228, title: 'Number of Subarrays with Bounded Maximum', difficulty: 'hard', topic: 'Algorithms',
    description: 'Count subarrays whose maximum element is in [left, right].',
    examples: [
      { output: '3', explanation: 'A=[2,1,4,3], left=2, right=3' }
    ],
    hints: ['Count subarrays with max<=right minus subarrays with max<=left-1'],
    starter: 'A = [2, 1, 4, 3]\nleft, right = 2, 3\n',
    solution: 'A = [2, 1, 4, 3]\nleft, right = 2, 3\ndef count_at_most(bound):\n    result = cur = 0\n    for n in A:\n        cur = cur + 1 if n <= bound else 0\n        result += cur\n    return result\nprint(count_at_most(right) - count_at_most(left - 1))',
    explanation: 'Subarrays with max in [L,R] = subarrays with max ≤ R minus subarrays with max ≤ L-1. Each helper counts subarrays with all elements ≤ bound using a sliding window.'
  },
  {
    id: 229, title: 'Async Concurrent Tasks', difficulty: 'expert', topic: 'Async',
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
    id: 230, title: 'Metaclass Logger', difficulty: 'expert', topic: 'Metaprogramming',
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
    id: 231, title: 'Expression Interpreter', difficulty: 'expert', topic: 'Interpreters',
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
    id: 232, title: 'Coroutine Pipeline', difficulty: 'expert', topic: 'Coroutines',
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
    id: 233, title: 'Abstract Base Classes', difficulty: 'expert', topic: 'OOP',
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
    id: 234, title: 'Descriptor Protocol', difficulty: 'expert', topic: 'Advanced Python',
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
    id: 235, title: 'Observer Pattern', difficulty: 'expert', topic: 'Design Patterns',
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
    id: 236, title: 'Type System with __class_getitem__', difficulty: 'expert', topic: 'Advanced Python',
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
    id: 237, title: 'Sudoku Solver', difficulty: 'expert', topic: 'Backtracking',
    description: 'Solve a 9×9 Sudoku puzzle using backtracking.',
    examples: [
      { output: 'Solved:\n5 3 4 6 7 8 9 1 2\n6 7 2 1 9 5 3 4 8\n...' }
    ],
    hints: ['Find empty cell (value 0)', 'Try digits 1-9', 'Backtrack if no valid digit fits', 'Validate row, col, 3×3 box'],
    starter: 'def solve(board):\n    empty = find_empty(board)\n    if not empty: return True\n    row, col = empty\n    for num in range(1, 10):\n        if is_valid(board, row, col, num):\n            board[row][col] = num\n            if solve(board): return True\n            board[row][col] = 0\n    return False\n\ndef find_empty(board):\n    for r in range(9):\n        for c in range(9):\n            if board[r][c] == 0: return (r, c)\n    return None\n\ndef is_valid(board, row, col, num):\n    pass  # Check row, col, box\n\nboard = [\n    [5,3,0,0,7,0,0,0,0],[6,0,0,1,9,5,0,0,0],[0,9,8,0,0,0,0,6,0],\n    [8,0,0,0,6,0,0,0,3],[4,0,0,8,0,3,0,0,1],[7,0,0,0,2,0,0,0,6],\n    [0,6,0,0,0,0,2,8,0],[0,0,0,4,1,9,0,0,5],[0,0,0,0,8,0,0,7,9]\n]\nsolve(board)\nfor row in board: print(*row)\n',
    solution: 'def solve(board):\n    empty = find_empty(board)\n    if not empty: return True\n    row, col = empty\n    for num in range(1, 10):\n        if is_valid(board, row, col, num):\n            board[row][col] = num\n            if solve(board): return True\n            board[row][col] = 0\n    return False\n\ndef find_empty(board):\n    for r in range(9):\n        for c in range(9):\n            if board[r][c] == 0: return (r, c)\n    return None\n\ndef is_valid(board, row, col, num):\n    if num in board[row]: return False\n    if num in [board[r][col] for r in range(9)]: return False\n    br, bc = 3*(row//3), 3*(col//3)\n    for r in range(br, br+3):\n        for c in range(bc, bc+3):\n            if board[r][c] == num: return False\n    return True\n\nboard = [\n    [5,3,0,0,7,0,0,0,0],[6,0,0,1,9,5,0,0,0],[0,9,8,0,0,0,0,6,0],\n    [8,0,0,0,6,0,0,0,3],[4,0,0,8,0,3,0,0,1],[7,0,0,0,2,0,0,0,6],\n    [0,6,0,0,0,0,2,8,0],[0,0,0,4,1,9,0,0,5],[0,0,0,0,8,0,0,7,9]\n]\nsolve(board)\nfor row in board: print(*row)',
    explanation: 'Backtracking: fill empty cells one by one, trying 1-9. If placement leads to no solution, backtrack (set back to 0) and try the next digit.'
  },
  {
    id: 238, title: 'Async Task Scheduler', difficulty: 'expert', topic: 'Async',
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
    id: 239, title: 'Full Tokenizer + Parser', difficulty: 'expert', topic: 'Interpreters',
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
    id: 240, title: 'Persistent Data Structure', difficulty: 'expert', topic: 'Advanced Python',
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
    id: 241, title: 'Lazy Evaluation Pipeline', difficulty: 'expert', topic: 'Generators',
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
    id: 242, title: 'Thread-Safe Counter', difficulty: 'expert', topic: 'Advanced Python',
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
    id: 243, title: 'AST Transformer', difficulty: 'expert', topic: 'Metaprogramming',
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
    id: 244, title: 'Weak Reference Cache', difficulty: 'expert', topic: 'Advanced Python',
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
    id: 245, title: 'Dataclass with Validation', difficulty: 'expert', topic: 'Advanced Python',
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
    id: 246, title: 'Composable Decorators', difficulty: 'expert', topic: 'Decorators',
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
    id: 247, title: 'Protocol-Based Duck Typing', difficulty: 'expert', topic: 'Advanced Python',
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
    id: 248, title: 'Memory-Efficient Word Count', difficulty: 'expert', topic: 'Performance',
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
    id: 249, title: 'Async Rate Limiter', difficulty: 'expert', topic: 'Async',
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
    id: 250, title: 'Custom Context Manager', difficulty: 'expert', topic: 'Advanced Python',
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
    id: 251, title: 'Fibonacci with Matrix Exponentiation', difficulty: 'expert', topic: 'Math',
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
    id: 252, title: 'Reactive Event Bus', difficulty: 'expert', topic: 'Design Patterns',
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
    id: 253, title: 'Compile-Time Type Narrowing', difficulty: 'expert', topic: 'Advanced Python',
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
    id: 254, title: 'Generator-Based State Machine', difficulty: 'expert', topic: 'Coroutines',
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
    id: 255, title: 'Sparse Matrix Multiplication', difficulty: 'expert', topic: 'Performance',
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
    id: 256, title: 'Decorator Factory with State', difficulty: 'expert', topic: 'Decorators',
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
    id: 257, title: 'Backpressure Queue', difficulty: 'expert', topic: 'Async',
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
    id: 258, title: 'Slots and Memory Optimisation', difficulty: 'expert', topic: 'Performance',
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
    id: 259, title: 'Zero-Copy Pipeline with memoryview', difficulty: 'expert', topic: 'Performance',
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
    id: 260, title: 'Full MRO and Diamond Inheritance', difficulty: 'expert', topic: 'OOP',
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
    id: 261, title: 'Immutable Value Object', difficulty: 'expert', topic: 'Advanced Python',
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
    id: 262, title: 'Graph Coloring', difficulty: 'expert', topic: 'Backtracking',
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
    id: 263, title: 'Huffman Coding', difficulty: 'expert', topic: 'Algorithms',
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
    id: 264, title: 'Zero-Downtime Config Reload', difficulty: 'expert', topic: 'Design Patterns',
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
    id: 265, title: 'Concurrent Web Scraper', difficulty: 'expert', topic: 'Async',
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
    id: 266, title: 'Implement functools.reduce', difficulty: 'expert', topic: 'Advanced Python',
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
    id: 267, title: 'Monkeypatch at Runtime', difficulty: 'expert', topic: 'Metaprogramming',
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
    id: 268, title: 'Custom Iterator with State', difficulty: 'expert', topic: 'Advanced Python',
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
    id: 269, title: 'Implement Map Filter Reduce', difficulty: 'expert', topic: 'Advanced Python',
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
    id: 270, title: 'Bloom Filter', difficulty: 'expert', topic: 'Data Structures',
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
    id: 271, title: 'Symbol Table with Scopes', difficulty: 'expert', topic: 'Interpreters',
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
    id: 272, title: 'Copy-on-Write List', difficulty: 'expert', topic: 'Advanced Python',
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
    id: 273, title: 'Interval Tree', difficulty: 'expert', topic: 'Data Structures',
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
    id: 274, title: 'Reactive Computed Properties', difficulty: 'expert', topic: 'Design Patterns',
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
    id: 275, title: 'Lock-Free Stack with CAS', difficulty: 'expert', topic: 'Advanced Python',
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
    id: 276, title: 'Abstract Syntax Tree Builder', difficulty: 'expert', topic: 'Interpreters',
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
    id: 277, title: 'Probabilistic Skip List', difficulty: 'expert', topic: 'Data Structures',
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
    id: 278, title: 'Compile Regex to NFA', difficulty: 'expert', topic: 'Algorithms',
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
    id: 279, title: 'Virtual Machine with Bytecode', difficulty: 'expert', topic: 'Interpreters',
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
    id: 280, title: 'Monad-Style Option Type', difficulty: 'expert', topic: 'Advanced Python',
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
    id: 281, title: 'Rope Data Structure', difficulty: 'expert', topic: 'Data Structures',
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
    id: 282, title: 'DSL for Building SQL Queries', difficulty: 'expert', topic: 'Design Patterns',
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
    id: 283, title: 'Spinlock with Exponential Backoff', difficulty: 'expert', topic: 'Advanced Python',
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
    id: 284, title: 'Functional Lens', difficulty: 'expert', topic: 'Advanced Python',
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
