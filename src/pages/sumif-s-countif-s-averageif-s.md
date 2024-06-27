---
title: SUMIF(s)-COUNTIF(s)-AVERAGEIF(s)
short: SUMIF(s)-COUNTIF(s)-AVERAGEIF(s)
description: How to use SUMIF(s)-COUNTIF(s)-AVERAGEIF(s)
author: Chris Carpenter/Aliafriend
date: 2024-05-21T14:15:58.776Z
---


Here is our example data

| A        | B             |
| :--------: | :-------------: |
| Item      | Quantity |
| Apple | 10 |
| Apple | 5 |
| Orange| 15 |
| Apple | 20 |

For SUMIF(s)/AVERAGEIF(s) we have
SUMIF(range, criterion, [sum_range])
SUMIFS(sum_range, criteria_range1, criterion1, [criteria_range2, …], [criterion2, …])

AVERAGEIF(criteria_range, criterion, [average_range])
AVERAGEIFS(average_range, criteria_range1, criterion1, [criteria_range2, …], [criterion2, …])

What these mean is - What range we're basing our criteria on, what criteria, what to SUM/AVERAGE.

For Example:

```haskell
=SUMIF(A:A,"Apple",B:B)
```
Which would return 35.
or
```haskell
=AVERAGEIF(A:A,"Apple",B:B)
```
which would return 11.6667.

Will SUM/AVERAGE B:B based on if A:A is Apple.

SUM/AVERAGEIFS works slightly different but similar concepts apply.

```haskell
=SUMIFS(B:B,A:A,"Apple",B:B,">5")
```
Which would return 30.

```haskell
=AVERAGEIFS(B:B,A:A,"Apple",B:B,">5")
```
Which would return 15.

Will SUM/AVERAGE based on if A:A is Apple and B:B is greater than 5.

COUNTIF(s) works slightly differently from the other two but the same concepts apply.

COUNTIF(range, criterion)

The thing here is there's no Sum/Average range so

```haskell
=COUNTIF(A:A,"Apple")
```
Which would return 3

```haskell
=COUNTIFS(A1:A4,"Apple",B1:B4,5)
```
Which would return 1

Will Count the number of occurrences the time Apple appears in A:A
and
Will Count the number of occurrences the time Apple appears in A:A and B:B is equal to 5 





