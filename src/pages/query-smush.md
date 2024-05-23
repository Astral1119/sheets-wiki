---
title: Query Smush
short: Query Smush
description: QUERY smush is a technique that joins all elements of each column
  of an array together.
date: 2024-04-22T18:39:44.161Z
tags:
  - technique
---
QUERY smush is a technique that joins all elements of each column of an array together. Its name comes from how it 'smushes' an array into a single row. It takes advantage of how the [`QUERY`](https://sheets.wiki/pages/query/) header argument combines data. While the same functionality can be achieved in a more intuitive way using LHFs, it uses fewer function calls and is not restricted by the string length limit.

# Syntax
```haskell
QUERY(array, , 9^9)
```

By leaving the second `QUERY` argument blank, it defaults to "select \*". The third argument, 9^9, represents a sufficiently high value (i.e. a number larger than the number of rows in array). This ensures that every row will be joined.
Since `QUERY` only accepts homogeneous data, you may have to convert your data to strings before using `QUERY` smush.

# Notes
This technique joins each row by `" "`. It is effectively the same as 
```haskell
BYCOL(array, LAMBDA(col, JOIN(" ", col)))
```
except for how it does not allow mixed data types. If you expect to have null values throughout, you may have to use REGEX functions in order to format the output.