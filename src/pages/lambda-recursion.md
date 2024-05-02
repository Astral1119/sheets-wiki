---
title: LAMBDA Recursion
short: LAMBDA Recursion
description: LAMBDA Recursion
date: 2024-04-22T18:32:57.177Z
tags:
  - technique
  - function
  - terminology
---
LAMBDA recursion allows the user to apply [lambda terms](https://sheets.wiki/lambda/) [recursively](https://en.wikipedia.org/wiki/Recursion_(computer_science)) using [anonymous recursion](https://en.wikipedia.org/wiki/Anonymous_recursion).

```haskell
LET(
	func, LAMBDA(func, <variables>, <expression>),
	func(func, <variables>)
)

LAMBDA(func, func(func, <variables>))(LAMBDA(func, <variables>, <expression>))
```

Either syntax is valid; however, `LET` is typically easier to work with and read. In computer science terms, `LET` enables [named function recursion](https://en.wikipedia.org/wiki/Anonymous_recursion#Named_functions).

Recursive formulae should have a [base case](https://www.geeksforgeeks.org/what-is-base-case-in-recursion/). Iterative formulae, not to be confused with [iterative calculation](https://sheets.wiki/iterative-calculation/), can be implemented using [tail recursion](https://en.wikipedia.org/wiki/Tail_call). This is the most common use for LAMBDA recursion. Other forms of recursion, such as multiple recursion, are not as common due to [calculation limits](https://sheets.wiki/calculation-limits/).