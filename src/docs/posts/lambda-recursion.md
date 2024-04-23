---
title: LAMBDA Recursion
short: LAMBDA Recursion
permalink: /lambda-recursion/
description: LAMBDA Recursion
date: 2024-04-22T18:32:57.177Z
tags:
  - technique
  - function
  - terminology
---
```haskell
LET(func, LAMBDA(func, <variables>, <expression>), func(func, <variables>))
```
```haskell
LAMBDA(func, func(func, <variables>))(LAMBDA(func, <variables>, <expression>))
```
Using [[LAMBDA]]
Either syntax is valid; however, LET is typically easier to work with and read.

Typical use-cases involve using a function until a particular condition is met
```haskell
=LET(func,lambda(func,a,if(a<10,func(func,a+1),a)),func(func,1))
```
