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
lambda(f,f(a,b...))
```

And can be constructed via:

```haskell
=let(
    udt,lambda(a,b...,
        lambda(f,f(a,b...))
    ),
    udt(a,b...)
)
```

Note that the above formula errors out. In order to access data stored within a LAMBDA UDT, you must define LAMBDA terms to interface with it. For example, if we want to implement a [pair](https://www.geeksforgeeks.org/pair-in-cpp-stl/) structure, we could implement functions to access the `first` and `second` elements like so:

```haskell
=let(
    pair,lambda(a,b,
        lambda(f,f(a,b))
    ),
    first,lambda(a,b,a),
    second,lambda(a,b,b),
    pair("foo","bar")(first)
)
```

The UDT works by accepting a LAMBDA function as input which then accesses the data within the UDT.
LAMBDA UDTs can accept anything as an attribute, including arrays, lambda terms, and other UDTs.
However, they are not without limitations. Due to their LAMBDA-heavy nature, \[calculation limits](https://sheets.wiki/calculation-limits/) represent an additional obstacle. They also require user-defined interfaces in order to work properly.