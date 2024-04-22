---
title: The MAP Function
short: Map
permalink: /map/
description: The MAP Function
date: 2024-04-22T19:24:24.176Z
tags:
  - function
---
The MAP function allows for users to apply logic or other functions across a range of cells.
Typical use cases are if you tend to drag a formula across an entire column or row creating many formula cells. You may use MAP to create a singular formula cell that affects the entire range. An example would be

| A                | B             | C         |
| ----------------: | ------------- | --------- |
| 1 |||
| 2 |||
| 3 |||

If we used 
```haskell
=MAP(A1:A3,LAMBDA(cell,cell+1))
```
in the cell B1 we would get

| A                | B             | C         |
| --------:-------- | ------------- | --------- |
| 1 |2||
| 2 |3||
| 3 |4||

When using map the LAMBDA(variable, variable can be named anything you would like
Map supports up to any number equally sized arrays for example

| A                | B             | C         | D         |
| --------:-------- | ------------- | --------- | --------- |
| 1 | 4 | 7 ||
| 2 | 5 | 8 ||
| 3 | 6 | 9 ||

if we use
```haskell
=MAP(A1:A3,B1:B3,C1:C3,lambda(a,b,c,a+b+c))
```

In D1 it will return
| A                | B             | C         | D         |
| ---------------- | ------------- | --------- | --------- |
| 1 | 4 | 7 | 12 |
| 2 | 5 | 8 | 15 |
| 3 | 6 | 9 | 18 |
