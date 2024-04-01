---
title: Color (and other formatting) Should Follow Data, Not Transmit It
date: 2024-04-01T22:25:59.078Z
permalink: color_follows_data
tags:
  - created
---
"How can I add up all the cells with a red background?"

"Everything with a blue background is pending, everything red is denied"

"﻿Run a script when I change a cell to **bold**"

\-﻿----

T﻿hese are bad behaviors and spreadsheet design. Unlike numbers, letters, and dates, *color* is not something that inherently transmits data. In other words, the number 2 has meaning to the computer while the color blue does not. The color blue only has the subjective meaning humans apply to it.

S﻿o while colors and other formatting can help humans more quickly understand what is going on, that should *follow* otherwise existing data. One can easily sum everything with a value less than 5; conditional formatting can be used to apply the Red background to everything where a status column says DENIED; the script should be triggered off of a value change, not a formatting change.

U﻿se formats to make things easier for humans, but it's always harder for the computer to do anything based on formats.

∴ C﻿olor should follow data, not transmit it.