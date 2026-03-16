const PROJECTS_EASY = [
  {
    title: 'Hello, World!', difficulty: 'easy', topic: 'Basics',
    author: 'corecommit',
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
    title: 'Simple Calculator', difficulty: 'easy', topic: 'Basics',
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
    title: 'Odd or Even', difficulty: 'easy', topic: 'Conditionals',
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
    title: 'FizzBuzz', difficulty: 'easy', topic: 'Loops',
    description: 'Print numbers 1–100. For multiples of 3 print <code>Fizz</code>, for multiples of 5 print <code>Buzz</code>, for both print <code>FizzBuzz</code>.',
    examples: [
      { output: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n16\n17\nFizz\n19\nBuzz\nFizz\n22\n23\nFizz\nBuzz\n26\nFizz\n28\n29\nFizzBuzz\n31\n32\nFizz\n34\nBuzz\nFizz\n37\n38\nFizz\nBuzz\n41\nFizz\n43\n44\nFizzBuzz\n46\n47\nFizz\n49\nBuzz\nFizz\n52\n53\nFizz\nBuzz\n56\nFizz\n58\n59\nFizzBuzz\n61\n62\nFizz\n64\nBuzz\nFizz\n67\n68\nFizz\nBuzz\n71\nFizz\n73\n74\nFizzBuzz\n76\n77\nFizz\n79\nBuzz\nFizz\n82\n83\nFizz\nBuzz\n86\nFizz\n88\n89\nFizzBuzz\n91\n92\nFizz\n94\nBuzz\nFizz\n97\n98\nFizz\nBuzz', explanation: '3→Fizz (divisible by 3), 5→Buzz (divisible by 5), 15→FizzBuzz (both 3 and 5). Always check 15 first, otherwise 15 would only print Fizz.' }
    ],
    hints: ['Check divisibility by 15 first', 'range(1, 101) gives 1 to 100'],
    starter: 'for i in range(1, 101):\n    # Your FizzBuzz logic\n    pass\n',
    solution: 'for i in range(1, 101):\n    if i % 15 == 0:\n        print("FizzBuzz")\n    elif i % 3 == 0:\n        print("Fizz")\n    elif i % 5 == 0:\n        print("Buzz")\n    else:\n        print(i)',
    explanation: 'Check divisibility by 15 first — otherwise 15, 30, 45... would only match the 3 check.'
  },
  {
    title: 'Reverse a String', difficulty: 'easy', topic: 'Strings',
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
    title: 'Count Vowels', difficulty: 'easy', topic: 'Strings',
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
    title: 'Factorial', difficulty: 'easy', topic: 'Recursion',
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
    title: 'Fibonacci Sequence', difficulty: 'easy', topic: 'Loops',
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
    title: 'Palindrome Check', difficulty: 'easy', topic: 'Strings',
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
    title: 'Number Guessing Game', difficulty: 'easy', topic: 'Loops',
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
    title: 'List Statistics', difficulty: 'easy', topic: 'Lists',
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
    title: 'Caesar Cipher', difficulty: 'easy', topic: 'Strings',
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
    title: 'Multiplication Table', difficulty: 'easy', topic: 'Loops',
    description: 'Print the multiplication table for a given number from 1 to 10.',
    examples: [
      { input: '5', output: '5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25\n5 x 6 = 30\n5 x 7 = 35\n5 x 8 = 40\n5 x 9 = 45\n5 x 10 = 50', explanation: 'The loop runs i from 1 to 10, printing n × i each time.' }
    ],
    hints: ['Use a for loop with range(1, 11)', 'String formatting with f-strings'],
    starter: 'n = int(input("Number: "))\n# Print table\n',
    solution: 'n = int(input("Number: "))\nfor i in range(1, 11):\n    print(f"{n} x {i} = {n*i}")',
    explanation: 'A simple loop from 1 to 10, printing each multiplication result with f-string formatting.'
  },
  {
    title: 'Sum of Digits', difficulty: 'easy', topic: 'Strings',
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
    title: 'Temperature Converter', difficulty: 'easy', topic: 'Functions',
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
    title: 'List Comprehension Squares', difficulty: 'easy', topic: 'Lists',
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
    title: 'Find Maximum Without max()', difficulty: 'easy', topic: 'Loops',
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
    title: 'Count Words in Sentence', difficulty: 'easy', topic: 'Strings',
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
    title: 'Simple Interest Calculator', difficulty: 'easy', topic: 'Math',
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
    title: 'Star Pattern', difficulty: 'easy', topic: 'Loops',
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
    title: 'Power of Two', difficulty: 'easy', topic: 'Math',
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
    title: 'Swap Two Variables', difficulty: 'easy', topic: 'Basics',
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
    title: 'Absolute Value', difficulty: 'easy', topic: 'Math',
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
    title: 'Largest of Three', difficulty: 'easy', topic: 'Conditionals',
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
    title: 'Count Down', difficulty: 'easy', topic: 'Loops',
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
    title: 'Sum of List', difficulty: 'easy', topic: 'Lists',
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
    title: 'Reverse a List', difficulty: 'easy', topic: 'Lists',
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
    title: 'String to Title Case', difficulty: 'easy', topic: 'Strings',
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
    title: 'Count Characters', difficulty: 'easy', topic: 'Strings',
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
    title: 'Remove Duplicates from List', difficulty: 'easy', topic: 'Lists',
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
    title: 'Simple Interest', difficulty: 'easy', topic: 'Math',
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
    title: 'Number to Binary', difficulty: 'easy', topic: 'Math',
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
    title: 'Average of N Numbers', difficulty: 'easy', topic: 'Math',
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
    title: 'Check Leap Year', difficulty: 'easy', topic: 'Conditionals',
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
    title: 'GCD of Two Numbers', difficulty: 'easy', topic: 'Math',
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
    title: 'String Repeat', difficulty: 'easy', topic: 'Strings',
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
    title: 'Digit Sum Repeated', difficulty: 'easy', topic: 'Math',
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
    title: 'Print Triangle', difficulty: 'easy', topic: 'Loops',
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
    title: 'List Min Without min()', difficulty: 'easy', topic: 'Lists',
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
    title: 'Uppercase Checker', difficulty: 'easy', topic: 'Strings',
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
    title: 'Dictionary from Two Lists', difficulty: 'easy', topic: 'Dictionaries',
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
    title: 'Celsius to Fahrenheit', difficulty: 'easy', topic: 'Math',
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
    title: 'Flatten a List', difficulty: 'easy', topic: 'Lists',
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
    title: 'Vowel or Consonant', difficulty: 'easy', topic: 'Strings',
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
    title: 'Sum of Odd Numbers', difficulty: 'easy', topic: 'Loops',
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
    title: 'Armstrong Number', difficulty: 'easy', topic: 'Math',
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
    title: 'Perfect Number', difficulty: 'easy', topic: 'Math',
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
    title: 'Truncate String', difficulty: 'easy', topic: 'Strings',
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
    title: 'Count Consonants', difficulty: 'easy', topic: 'Strings',
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
    title: 'List Intersection', difficulty: 'easy', topic: 'Lists',
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
    title: 'Celsius to Kelvin', difficulty: 'easy', topic: 'Math',
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
    title: 'Check Sorted', difficulty: 'easy', topic: 'Lists',
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
    title: 'Initials from Name', difficulty: 'easy', topic: 'Strings',
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
    title: 'Multiplication Table', difficulty: 'easy', topic: 'Loops',
    description: 'Read a number n and print its multiplication table from 1 to 10.',
    examples: [
      { input: '5', output: '5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25\n5 x 6 = 30\n5 x 7 = 35\n5 x 8 = 40\n5 x 9 = 45\n5 x 10 = 50' }
    ],
    hints: ['Loop from 1 to 10 with a for loop'],
    starter: 'n = int(input("n: "))\n',
    solution: 'n = int(input("n: "))\nfor i in range(1, 11):\n    print(f"{n} x {i} = {n * i}")',
    explanation: 'A simple for loop from 1 to 10 prints each product with an f-string.'
  },
  {
    title: 'Flatten List of Strings', difficulty: 'easy', topic: 'Strings',
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
    title: 'Fibonacci Up To N', difficulty: 'easy', topic: 'Loops',
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
    title: 'Simple Stack with List', difficulty: 'easy', topic: 'Data Structures',
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
    title: 'Word Length Filter', difficulty: 'easy', topic: 'Strings',
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
    title: 'Square Root Without sqrt', difficulty: 'easy', topic: 'Math',
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
    title: 'List to Sentence', difficulty: 'easy', topic: 'Strings',
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
    title: 'Zip Two Lists', difficulty: 'easy', topic: 'Lists',
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
    title: 'String Padding', difficulty: 'easy', topic: 'Strings',
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
    title: 'Odd Numbers in Range', difficulty: 'easy', topic: 'Loops',
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
    title: 'Character Frequency', difficulty: 'easy', topic: 'Strings',
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
    title: 'Number Pattern', difficulty: 'easy', topic: 'Loops',
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
    title: 'Remove Whitespace', difficulty: 'easy', topic: 'Strings',
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
    title: 'Check Anagram', difficulty: 'easy', topic: 'Strings',
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
    title: 'Sum Even Indices', difficulty: 'easy', topic: 'Lists',
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
    title: 'Piglatin', difficulty: 'easy', topic: 'Strings',
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
    title: 'Repeat Characters', difficulty: 'easy', topic: 'Strings',
    description: 'Read a string and integer n. Print the string with each character repeated n times.',
    examples: [
      { input: 'abc, then 3', output: 'aaabbbccc' }
    ],
    hints: ['Iterate characters and multiply each by n'],
    starter: 's = input("String: ")\nn = int(input("Repeat: "))\n',
    solution: 's = input("String: ")\nn = int(input("Repeat: "))\nprint("".join(c * n for c in s))',
    explanation: 'For each character, multiply it by n (string repetition) and join all results into one string.'
  }
];
