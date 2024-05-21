---
title: VLOOKUP
short: VLOOKUP
description: How to use the Vlookup Function
author: Aliafriend
date: 2024-05-21T13:39:27.990Z
---
VLOOKUP is a function that allows you to search for a criteria and return a value based on where the match occurred.

For Example:

| A        | B             | C         |
| :--------: | :-------------: | :---------: |
| Item      | Quantity | Value |
| Apple | 10 | $5.00  |
| Orange | 5 | $6.00  |
| Potato | 15 | $7.50  |

Let's say we want to know what the value of Oranges are in a different area. We can
```haskell
=VLOOKUP("Orange",A:C,3,0)
```
Let's break this down:

The first argument is what we're looking for. Note: VLOOKUP will only return the first match it finds from the top -> bottom. If you have multiple occurrences within your table you will want to use FILTER() instead 

The second argument is the table - the search criteria will always be the leftmost column in the range/array given.

The third argument will be the index that you want to return with the leftmost column being 1, so in our case we want value which is the third column so we choose 3.

The fourth argument is [is-sorted], at this time selecting False here is the recommended choice. 