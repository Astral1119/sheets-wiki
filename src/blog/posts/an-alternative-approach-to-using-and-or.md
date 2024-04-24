---
title: An alternative approach to using AND()/OR()
description: An alternative method to a cell meeting many criteria
author: Aliafriend
date: 2024-04-24T12:49:06.931Z
tags:
  - tutorial
---
Typically when we use AND()/OR() in sheets we write each condition and have to repeat ourselves if it's one cell being asked to meet multiple criteria. For example

```haskell
=IF(OR(A1=2,A1=4,A1=10),"Pass","Warning")
```
In this scenario we're concerned if A1 has the status of 2, 4, or 10 it passes the test, if not gives us a warning. Now in this simple example 3 isn't too bad, but what if you had 10,15,20 conditions. What if you needed to know if a day landed on a particular holiday or you had a list of days something couldn't happen? Suddenly writing out A1=x, 15,20 times isn't reasonable.

So we can do this instead.

```haskell
=IF(OR(SORT(A1={2;4;10})),"Pass","Warning")
```

Sort() what it does is enables the array A1={2;4;10} so the output if A1 is 4
```haskell
False
True
False
```
instead of False being A1=2 because it's not array enabled and only looks at the first cell in the array.

This also helps us with AND()
```haskell
=IF(AND(SORT(A1>{B1;C1;D1}),SORT(A1<{B2;C2;D2})),"Pass","Warning")
```
In this situation we need all statements to be True, A1 is greater than B1 and C1 and D1 additionally less than B2 and C2 and D2. But, thankfully we don't have to write A1> and A1< 6 times total making the formula longer and harder to read or adjust. Even more if there's more conditions.

Another formula we can use is Let() to make our formula more readable.
```haskell
=LET(
conditionals,{2;4;10},
IF(OR(SORT(A1=conditionals)),"Pass","Warning")
)
```

For more information on documenting formulas see [Here](https://sheets.wiki/blog/posts/documenting-formulas/)