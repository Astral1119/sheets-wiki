---
title: LAMBDA User-Defined Types
short: LAMBDA UDTs
permalink: /lambda-udts/
description: Functional data abstraction using LAMBDA.
date: 2024-04-22T19:12:09.421Z
tags:
  - technique
  - data-type
  - terminology
---
LAMBDA UDTs use [LAMBDA](https://sheets.wiki/lambda/) to define a derived data type. These types take the form:

```haskell
lambda(m,m(a,b...))
```

LAMBDA UDTs emulate the [object-oriented programming paradigm](https://en.wikipedia.org/wiki/Object-oriented_programming), where UDTs consist of [fields](https://en.wikipedia.org/wiki/Field_(computer_science)) and [methods](https://en.wikipedia.org/wiki/Method_(computer_programming)). LAMBDA UDTs can be [instantiated](https://en.wikipedia.org/wiki/Instance_(computer_science)) manually or via constructor:

```haskell
=let(
    udt,lambda(a,b...,
        lambda(m,m(a,b...))
    ),
    udt(a,b...)
)
```

Note that the above formula errors out. In order to access data stored within a LAMBDA UDT, you must define LAMBDA terms to interface with it. In other words, all fields are [private](https://en.wikipedia.org/wiki/Access_modifiers) and must be accessed through public methods. For example, if we want to implement a [pair](https://www.geeksforgeeks.org/pair-in-cpp-stl/) structure, we could implement methods to access the `first` and `second` elements like so:

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

The UDT works by accepting a LAMBDA function as input which then accesses the data within the UDT.
LAMBDA UDTs can accept anything as a field, including arrays, lambda terms, and other UDTs.
However, they are not without limitations. Due to their LAMBDA-heavy nature, [calculation limits](https://sheets.wiki/calculation-limits/) represent an additional obstacle. They also require user-defined interfaces in order to work properly.