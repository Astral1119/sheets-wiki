---
title: LAMBDA Update Suppression
short: LAMBDA Update Suppression
permalink: /lus/
description: LAMBDA Update Suppression
date: 2024-04-22T18:34:01.418Z
tags:
  - technique
  - function
author: Astral
---
```haskell
LAMBDA(volatile, update, volatile)([volatile function], [update condition])
```

[LAMBDA](https://sheets.wiki/pages/lambda/) references only recalculate when a change is detected in a cell referenced by the formula. This property overrides the typical volatile property of updating whenever any cell is updated.

Because LUS is [unstable](https://sheets.wiki/pages/unstable/), typical use cases relate to temporary randomization and dice rolling.

Like all volatile functions, LUS will cause a desynchronization between the server and client sheets. In order to load the canon server-side value, simply refresh your client.

# Example

```haskell
=LAMBDA(x,x)(RANDBETWEEN(1,10))
```

This `RANDBETWEEN` will not update on a cell change. Compare to:

```haskell
=RANDBETWEEN(1,10)
```