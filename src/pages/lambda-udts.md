---
title: LAMBDA User-Defined Types
short: LAMBDA UDTs
description: Functional data abstraction using LAMBDA.
date: 2024-04-22T19:12:09.421Z
tags:
  - technique
  - data-type
  - terminology
author: Astral Café
---
LAMBDA UDTs use [LAMBDA](https://sheets.wiki/lambda/) to define a custom data type. They emulate the [object-oriented programming paradigm](https://en.wikipedia.org/wiki/Object-oriented_programming), where UDTs consist of [fields](https://en.wikipedia.org/wiki/Field_(computer_science)) and [methods](https://en.wikipedia.org/wiki/Method_(computer_programming)). These types take the form:

```haskell
lambda(i,choose(i,a,b...))
```

Data is [encapsulated](https://en.wikipedia.org/wiki/Encapsulation_(computer_programming)) inside a number of user-defined fields, listed as `a,b...` in the expression above. These fields can contain any data types, including ranges, [arrays](https://sheets.wiki/arrays/), and lambda terms.
In other words, they allow the user to define collections of different kinds of data that can be used as both input and output for user-defined functions.

UDTs must be [instantiated](https://en.wikipedia.org/wiki/Instance_(computer_science)) and provided data for each field to be operated on. LAMBDA UDTs can be instantiated manually or via constructor:

```haskell
=let(
    udt,lambda(a,b...,
        lambda(i,choose(i,a,b...))
    ),
    udt(a,b...)
)
```

Note that the above formula only shows instantiation. The output will be a lambda term which cannot be output to a cell.

To access data stored within a LAMBDA UDT, simply provide it with an index argument, as shown below:

```haskell
=let(
    udt,lambda(a,b...,
        lambda(i,choose(i,a,b...))
    ),
    udt(a,b...)(<index>)
)
```

The [β-reduction](https://en.wikipedia.org/wiki/Lambda_calculus#%CE%B2-reduction_2) will then supply that index to the `CHOOSE`, returning the field at the desired index.

# Notes
[Calculation limits](https://sheets.wiki/calculation-limits/) represent a major limitation to LAMBDA UDTs, as they are heavily LAMBDA-intensive in nature and can quickly hit the recursion limit.

# Links
## Lists
- [Singly-Linked List](https://docs.google.com/spreadsheets/d/1NCpS9HH_IOQGtYby1qE1h7F5WqvuGFlNiPfXh_zMHFQ/edit?gid=0#gid=0)
- [Doubly-Linked List](https://docs.google.com/spreadsheets/d/1JPlLJjkWFH40drkoQFJsMggoaNqqjdAGyQbxbN3YlP8/edit?gid=0#gid=0)
- [SX by Shay](https://docs.google.com/spreadsheets/d/1a-XZAvGKkyKz-XImfmxemYcAQqhpgq3aLXQa1SMk1-0/edit?gid=1778054978#gid=1778054978)
## Trees
- [Binary Search Tree](https://docs.google.com/spreadsheets/d/1o4KlsxVrp-ylj3juHKPtLaMJS2xF-CNwkeREYrWd4Jg/edit?gid=0#gid=0)
