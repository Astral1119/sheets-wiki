---
title: Calculation Limits
short: Calculation Limits
permalink: /calculation-limits/
description: Calculation Limits
date: 2024-04-22T18:30:40.176Z
tags:
  - terminology
---
# Introduction
Google Sheets has two calculation limits for each formula:

1.  Function calls
2. Recursion calls

These limits are separate. If either one is reached, the formula will stop calculating and output `#ERROR!`.
# Function Calls
The function call limit is approximately `2,000,000` (`2e6`) function calls per cell. The exact value is currently unknown as there is variance in the results of the functions used to reach that limit.
# Recursion Calls
The recursion limit is exactly `10,000` (`1e4`). This limit is the same when used in [LAMBDA Recursion](https://sheets.wiki/lambda-recursion) and [iterative calculation](https://sheets.wiki/iterative-calculation).
# Further Reading
- [Calculation Limits](https://docs.google.com/spreadsheets/d/160UfdYEOoplAaKzm4Cx4rF0NNWwd6b2KC3LH3xAr-jk/edit#gid=0)
	- This spreadsheet contains a number of formulae at each calculation limit to demonstrate this phenomenon.