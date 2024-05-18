---
title: Operators
short: Operators
description: Operators in Google Sheets.
author: Astral Café
date: 2024-05-18T16:28:30.871Z
---
Operators are a subset of [functions](https://sheets.wiki/books/functions/) that can be represented by different characters, and deviate from the standard notation; unlike normal functions, operators generally separate their arguments using the form `argument operator argument`. For example, the `MULTIPLY` function can also be represented using the `*` operator. Thus, `MULTIPLY(3,5)` is functionally the same as `3 * 5`.

If a function has an operator, generally speaking, you will only ever see the operator. If an operator exists, there is rarely a reason to use the function behind it.

This is a relatively minor distinction, but it is worth noting as it is common terminology.

# Math Operators
| Operator | Function Equivalent | Description |
|----------|---------------------|-------------|
| `+`      | `ADD` | Adds numbers together |
| `-`      | `MINUS` | Subtracts one number from another |
| `*`      | `MULTIPLY` | Multiplies numbers |
| `/`      | `DIVIDE` | Divides one number by another |
| `^`      | `POW`/`POWER` | Raises a number to the power of another number |
| `%`      | None | Converts a number to a percentage |
| `e`      | None | Scientific notation |

# Comparators
Comparators are a special class of operator.

|Operator|Function|Semantic|Description|
|-|-|-|-|
|`=`|`EQ`|Equal to|Check if two things are the same. Case insensitive.|
|`<>`|`NE`|Not equal to|Check if two things are not the same. Case insensitive.|
|`<`|`LT`|Less than|Check if the first value is less than the second.|
|`<=`|`LTE`|Less than or equal to|Check if the first value is less than or equal to the second.|
|`>`|`GT`|Greater than|Check if the first value is greater than the second.|
|`>=`|`GTE`|Greater than or equal to|Check if the first value is greater than or equal to the second.|

# Other
|Operator|Function|Description|
|-|-|-|
|`:`|`REFERENCE`|Creates a range between two references|
|`&`|`CONCAT`|Concatenates two strings|