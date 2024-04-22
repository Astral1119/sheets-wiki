---
title: LAMBDA Recursion
description: LAMBDA Recursion is a technique that uses a LAMBDA term that calls
  itself in order to perform recursion.
author: Astral Café
date: 2024-04-22T18:16:24.758Z
tags:
  - tutorial
---
```haskell
LET(func, LAMBDA(func, <variables>, <expression>), func(func, <variables>))
```
```haskell
LAMBDA(func, func(func, <variables>))(LAMBDA(func, <variables>, <expression>))
```
Using \[[LAMBDA]]
Either syntax is valid; however, LET is typically easier to work with and read.

Typical use-cases involve using a function until a particular condition is met
```haskell
=LET(func,lambda(func,a,if(a<10,func(func,a+1),a)),func(func,1))
```
