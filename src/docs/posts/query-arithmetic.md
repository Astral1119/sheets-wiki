---
title: Query Arithmetic
short: Query Arithmetic
permalink: /query-arithmetic/
description: Query Arithmetic
date: 2024-04-22T18:37:28.202Z
tags:
  - technique
---
The QUERY function is able to process arithmetic functions by default, being processed on the same level as other data manipulation functions. As such, it allows for arithmetic processing via strings.
Syntax
```haskell
INDEX(QUERY(, "select "&expression, ), 2)
```

Code golf syntax for non-array-enabled formulae:
```haskell
+SORT(QUERY(, "select "&expression, ))
```

    expression should be an arithmetic expression using only +, -, *, and /. It should be submitted as a string.
