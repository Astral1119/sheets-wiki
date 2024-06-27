---
title: Documenting Formulas
description: A method of adding documentation/comments to formulas.
author: Chris Carpenter/Aliafriend
date: 2024-04-08T18:03:32.861Z
tags:
  - advice
short: Documenting Formulas
---
As sheets doesn't have an official way to comment within formulas yet, we're often wondering how to document our formulas or add comments for our co-workers or our future self to remember what the formula does or even what it's pointing to.

As such we have a pseudo-documentation method using Let()

LET(name1, value_expression1, [name2, …], [value_expression2, …], formula_expression)


| A                | B             | C         |
| ---------------- | ------------- | --------- |
| 1 ||||
| 2 ||||


```haskell
=Let(
data,A1:A2,
sum(data))
```
will output 3.

What this means is you can declare variable names and use them in the formula expression allowing you to document your equation into parts with familiar names like
```haskell
=Let(
interest_rate,.13,
loan,A1,
loan*interest_rate)
```
Allowing you to know what A1 is and letting you know the .13 in the formula is your interest_rate.

Another interesting thing of note you can accomplish with Let() is you don't NEED to use the variable names at the end.

You can simply
```haskell
=LET(
purpose,"This formula is for calculating the sum of all the apples",
range_to_sum,B1:B10,
items,A1:A10,
apples,Filter(range_to_sum,items="apples"),
SUM(apples))
```

As you can see the 'purpose' variable never gets used but within the formula itself it serves as a comment line for yourself or whomever comes in wondering what the formula does you can add as many or as little of these as you need.
