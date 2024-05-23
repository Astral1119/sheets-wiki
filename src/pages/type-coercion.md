---
title: Type Coercion
short: Type Coercion
description: Type Coercion in Google Sheets
author: Astral Café
date: 2024-05-23T01:43:00.171Z
---
Google Sheets will attempt to reconcile ordinarily incompatible data types through a process known as [type coercion](https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion). The rules behind this process are not universally applied; that is, some functions coerce data types and others do not.

# Reference Table
Below is a non-exhaustive list of values and how they are coerced in common cases. For the purposes of highlighting how type coercion functions for each given case, the following example operations will be used:

```haskell
=IF([value],TRUE,FALSE)
=JOIN([value],"foo","bar")
=[value]+1
```

**Value**|**Boolean**|**String**|**Number**
|:-:|:-:|:-:|:-:|
|`TRUE`|-|`"TRUE"`|`1`|
|`FALSE`|-|`"FALSE"`|`0`|
|`"TRUE"`|`TRUE`|-|`#VALUE`|
|`"FALSE"`|`FALSE`|-|`#VALUE`|
|`"foo"`|`#VALUE`|-|`#VALUE`|
|`""`|`FALSE`|-|`0`|
|`1`|`TRUE`|`"1"`|-|
|`0`|`FALSE`|`"0"`|-|
| |`FALSE`|`""`|`0`|
