---
title: Unstable
short: Unstable
description: A set of techniques that produce non-hardcoded values.
date: 2024-04-02T22:48:57.110Z
tags:
  - technique
---


> \[!WARNING] This terminology may change.
> There are other proposed terms for this concept, such as 'state-based,' which may be more accurate.

Unstable functions, formulae, or techniques do not reliably store their outputs. Any technique that stores or produces information that becomes irretrievable once the technique ends is unstable. As a result, unstable techniques should only be used if the relevant information is temporary in nature (i.e. a dice roller).

The simple test for instability is whether deleting and then undoing that edit would revert the sheet to its previous state.

# Behavior

Unstable techniques are prone to desynchronization, even if not based on volatile functions. This phenomenon occurs if an unstable technique processes multiple rapid inputs. New instances of the sheet or `IMPORTRANGE` use will all show a 'canon' version.

# List of Unstable Techniques

* \[[Lambda Update Suppression]]
* \[[Iterative Calculation Storage]]
* \[[Ghost Values]]
* \[[Array Overwrite]]