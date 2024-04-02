---
title: Arrays
description: Ordered collections of elements.
author: Astral Café
date: 2024-04-01
tags:
  - left
permalink: /arrays/
short: Arrays
---
Arrays are any *m* by *n* grid of contiguous values where *m* is the number of rows and *n* is the number of columns in the array. Within an array, one can have any other kind of data type, including multiple different types. You can also think of arrays as a collection of cells arranged into a rectangle.

All rows of an array must share the same number of columns, and all columns must share the same number of rows.
# Array Subtypes
## Ranges
Arrays can be separated into two types: ranges and virtual arrays. Ranges are referenced directly from the spreadsheet, while virtual arrays are not. They carry additional data, such as the row or column they were sourced from. It is important to make this distinction as some formulae, such as SUMIF or OFFSET, require range data to work.
## Virtual Array
A virtual array is any array that does not contain range data. These are typically created by either constructing an array using an array literal or by passing a range through most functions.
## Array Literals
Array literals are constructed arrays that use the `{}` operators to generate a virtual array.

```xls
{<item>,<item>;<item>,<item>}
```

The `,` separator delimits values within a row and the `;` separator delimits different rows. Elements are processed horizontally first, and vertically second. The number of elements in each row much be the same using `{}`. If you wish to create [[Arrays#Jagged Arrays|jagged arrays]], you may need `VSTACK` and `HSTACK`.
## Vectors
Vectors are 1 by *n* or *m* by 1 arrays. Many functions operate on vectors, often referring to a 'single column or row.' Vectors distinguish themselves from other types of arrays by pure virtue of how many functions require them.
## Jagged Arrays
Jagged arrays are arrays comprised of rows or columns of varying size and padded with null values, giving it a 'jagged' appearance. There is no significant difference between how jagged and non-jagged arrays are handled by Google Sheets functions, and is quite useful when used in conjunction with [[LAMBDA Helper Functions]]. They are considered [[bad practice]] in Excel, however.
# Notes
Non-vector arrays containing over **2,147,483,647** (2^31 - 1) elements will crash the sheet. Any array containing over **10,000,000** elements will output **#VALUE!**.