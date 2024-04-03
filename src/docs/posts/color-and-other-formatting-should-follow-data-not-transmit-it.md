---
title: Color (and other formatting) Should Follow Data, Not Transmit It
description: Why formatting should not be the basis of your backend.
author: Dralkyr
date: 2024-04-01
tags:
  - tutorial
short: Color Follows Data
---
"How can I add up all the cells with a red background?"

"Everything with a blue background is pending, everything red is denied"

"﻿Run a script when I change a cell to **bold**"

\-----

These are bad behaviors and spreadsheet design. Unlike numbers, letters, and dates, *color* is not something that inherently transmits data. In other words, the number 2 has meaning to the computer while the color blue does not. The color blue only has the subjective meaning humans apply to it.

So while colors and other formatting can help humans more quickly understand what is going on, that should *follow* otherwise existing data. One can easily sum everything with a value less than 5; conditional formatting can be used to apply the Red background to everything where a status column says DENIED; the script should be triggered off of a value change, not a formatting change.

Use formats to make things easier for humans, but it's always harder for the computer to do anything based on formats.

∴ Color should follow data, not transmit it.