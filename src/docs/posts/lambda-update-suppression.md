---
title: LAMBDA Update Suppression
short: LAMBDA Update Suppression
permalink: /lus/
description: LAMBDA Update Suppression
date: 2024-04-22T18:34:01.418Z
tags:
  - technique
  - function
---
```haskell
LAMBDA(volatile, update, volatile)([volatile function], [update condition])
```
\[[LAMBDA]] references only recalculate when a change is detected in a cell referenced by the formula. This property overrides the typical volatile property of updating whenever any cell is updated.

Because LUS is unstable, typical use cases relate to temporary randomization and dice rolling.

Meaning if you delete,update,change the cell you cannot undo to get the same stored result back.
Also, a warning, lambda functions have a reported tendency to randomly update with no particular source causing it. This method for storing volatile results is not recommended for critical data. 

Example
```haskell
=LAMBDA(x,x)(Randbetween(1,10))
```
Will Randbetween 1 and 10 and will not change every cell change, unlike typical behavior of 
```haskell
=Randbetween(1,10)
```
which will change every cell change.