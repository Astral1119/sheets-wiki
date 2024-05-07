---
title: Refactoring Techniques
short: Refactoring Techniques
description: Techniques to make your formulas more re-usable and readable.
author: Aliafriend
date: 2024-05-07T14:55:13.404Z
---
If you haven't already, read [Documenting Formulas](https://sheets.wiki/books/techniques/documenting-formulas/) as this is a continuation of concepts from that blog.

In formula writing users sometimes create a difficult to read or update formula due to the nature of how formulas are written. A small scale example would be
```haskell
=IFS(ISBETWEEN(A1,1,2),1,ISBETWEEN(A1,3,4),2,ISBETWEEN(A1,4,5),3)
```
Each time we have a new category for the A1 cell we have to rewrite ISBETWEEN(A1 ... and our new criteria. What happens when changes are made to the sheet and we need to change that cell to a different one? We have to change each A1 within the cell which could be tedious or lead to mistakes by missing one.

We can avoid this and make the formula easier to manage with

```haskell
=LET(
fn,LAMBDA(low,high,ISBETWEEN(A1,low,high)),
IFS(fn(1,2),1,fn(2,3),2,fn(4,5),3)
)
```
We can use [LAMBDA](https://sheets.wiki/pages/lambda/) to define our own function where the first input is our low and our second input is our high. Meaning every time we use fn(1,2) it translates to ISBETWEEN(A1,1,2). We can name fn anything we'd like to something more contextually appropriate. With this as well if we ever needed to change the cell A1 to something else we only need to change it in one place which will change it for all of them.



 



