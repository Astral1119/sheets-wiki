---
title: Method-Based LAMBDA UDTs
description: An archival post for the old LAMBDA UDT method.
author: Astral Café
date: 2024-04-22T18:43:07.305Z
tags:
  - archive
---
This post details the first LAMBDA UDT scheme. It is no longer best practice, but here is the previous article in full for archival purposes. See the main [LAMBDA UDT](https://sheets.wiki/lambda-udts/) page for up-to-date information.

LAMBDA UDTs use [LAMBDA](https://sheets.wiki/lambda/) to define a custom data type. They emulate the [object-oriented programming paradigm](https://en.wikipedia.org/wiki/Object-oriented_programming), where UDTs consist of [fields](https://en.wikipedia.org/wiki/Field_(computer_science)) and [methods](https://en.wikipedia.org/wiki/Method_(computer_programming)). These types take the form:

```haskell
lambda(m,m(a,b...))
```

Data is [encapsulated](https://en.wikipedia.org/wiki/Encapsulation_(computer_programming)) inside a number of user-defined fields, listed as `a,b...` in the expression above. These fields can contain any data types, including ranges, [arrays](https://sheets.wiki/arrays/), and lambda terms.
In other words, they allow the user to define collections of different kinds of data that can be used as both input and output for user-defined functions.

UDTs must be [instantiated](https://en.wikipedia.org/wiki/Instance_(computer_science)) and provided data for each field to be operated on. LAMBDA UDTs can be instantiated manually or via constructor:

```haskell
=let(
    udt,lambda(a,b...,
        lambda(m,m(a,b...))
    ),
    udt(a,b...)
)
```

Note that the above formula only shows instantiation. The output will be a lambda term which cannot be output to a cell.

To access data stored within a LAMBDA UDT, you must define lambda terms, or lambda functions, to interface with it. These terms, known as methods, take each field of the UDT as arguments. All fields of a LAMBDA UDT are [private](https://en.wikipedia.org/wiki/Access_modifiers) and must be accessed through methods. For example, if we want to implement a [pair](https://www.geeksforgeeks.org/pair-in-cpp-stl/) structure, where the UDT stores two associated fields of any type, we could implement methods to access the `first` and `second` elements like so:

```haskell
=let(
    pair,lambda(a,b,
        lambda(m,m(a,b))
    ),
    first,lambda(a,b,a),
    second,lambda(a,b,b),
    pair("foo","bar")(first)
)
```

This formula works by accepting a LAMBDA function, known as the method, as input. The method then accesses the data within the UDT. Note that all methods must be lambda terms that accept all fields of the UDT as arguments. Performing the [β-reduction](https://en.wikipedia.org/wiki/Lambda_calculus#%CE%B2-reduction_2) for this formula, we start by resolving the `pair` instantiation:

```haskell

lambda(m,m("foo","bar"))(first)

```

Then, we resolve the `m` term:

```haskell
first("foo","bar")
```

Which then resolves to `"foo"`.

[Calculation limits](https://sheets.wiki/calculation-limits/) represent a major limitation to LAMBDA UDTs, as they are heavily LAMBDA-intensive in nature and can quickly hit the recursion limit. LAMBDA UDTs also require user-defined interfaces in order to work properly.