---
title: The QUERY Function
description: The QUERY function performs SQL-lite queries using the Google
  Visualization API Query Language.
date: 2024-04-02T19:23:17.740Z
permalink: /query/
tags:
  - function
---
# Introduction
The [QUERY](https://support.google.com/docs/answer/3093343?hl=en) function allows the user to make SQL-lite queries using the [Google Visualization API Query Language](https://developers.google.com/chart/interactive/docs/querylanguage) on arrays. This article details the exact specifications of QUERY in Google Sheets. For relevant techniques, see [[QUERY Smush]] and [[QUERY Arithmetic]]. For an introduction to QUERY, see [[QUERY Basics]].
# Function Syntax
```xls
QUERY(data, [query], [headers])
```

* `data` - The array to perform the query on.
    - Each column of `data` can only hold boolean, numeric (including date/time types), or string values.
    - In case there are multiple data types in a single column, the majority data type determines the data type of the column for query purposes. Minority data types are considered null values.

* `query` - The query to perform, expressed as a string. By default, it is set to "select \*".
    - The query must be submitted as a string. It has a separate syntax, which is explained below.

* `headers` - The number of header rows at the top of the `data`. If omitted or set to `-1`, the value is guessed based on the content of `data`.
	- It is currently unclear how QUERY guesses the number of header rows in `data`. Therefore, it is recommended that you always submit a header argument.
	- Header rows are combined by joining with a delimiter `" "`. See [[QUERY Smush]] for the related technique.
# Query Syntax
```xls
"[select] [where] [group by] [pivot by] [order by] [skipping] [limit] [offset] [label] [format] [options]"
```

Query syntax is divorced from formula syntax, instead following the [Google Visualization API Query Language](https://developers.google.com/chart/interactive/docs/querylanguage). Queries are characterized by three important parts.
1. Language Clauses
	- These are the broader elements that define the query.
2. Data Manipulation Functions
	- These expand the capabilities of the query, allowing one to apply aggregation, scalar, and arithmetic functions.
3. Language Elements
	1. These consist of literals, identifiers, and reserved words. They are used throughout the query.
# Language Clauses
Language clauses determine how information is gathered and processed.

| Clause                                                                                  | Usage                                                                                                                            |
| --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| [select](https://developers.google.com/chart/interactive/docs/querylanguage#Select)     | Selects which columns to return, and in what order. If omitted, all of the table's columns are returned, in their default order. |
| [where](https://developers.google.com/chart/interactive/docs/querylanguage#Where)       | Returns only rows that match a condition. If omitted, all rows are returned.                                                     |
| [group by](https://developers.google.com/chart/interactive/docs/querylanguage#Group_By) | Aggregates values across rows.                                                                                                   |
| [pivot](https://developers.google.com/chart/interactive/docs/querylanguage#Pivot)       | Transforms distinct values in columns into new columns.                                                                          |
| [order by](https://developers.google.com/chart/interactive/docs/querylanguage#Order_By) | Sorts rows by values in columns.                                                                                                 |
| [limit](https://developers.google.com/chart/interactive/docs/querylanguage#Limit)       | Limits the number of returned rows.                                                                                              |
| [offset](https://developers.google.com/chart/interactive/docs/querylanguage#Offset)     | Skips a given number of first rows.                                                                                              |
| [label](https://developers.google.com/chart/interactive/docs/querylanguage#Label)       | Sets column labels.                                                                                                              |
| [format](https://developers.google.com/chart/interactive/docs/querylanguage#Format)     | Formats the values in certain columns using given formatting patterns.                                                           |
| [options](https://developers.google.com/chart/interactive/docs/querylanguage#Options)   | Sets additional options.                                                                                                         |
Each clause takes different arguments and has vastly different effects; there is no singular construction applicable to each.
## Select

```xls
select Col1
select 1
select Col1, sum(Col2)
```

The `select` clause includes columns, aggregates, and literals in the output. Terms should be comma separated, i.e. `select Col1, Col2`. Literals are uniformly expanded into vectors to match the number of rows in `data`. For example, `=query(A1:A5, "select 1", )` returns a header (generated by the implied `1()`) and five 1s, corresponding to the input rows.

The `select` clause additionally accepts the `"*"` term, signifying 'all' or 'everything.' If an aggregate is selected, a `group by` clause is mandatory.
## Where
```xls
select Col1 where Col1 is not null
select Col1, Col2 where Col1 <> 0 and Col2 <> 0
```

The `where` clause returns only rows that meet certain conditions. They use the same comparison operators as Google Sheets, with the redundant addition of `!=`, which is equivalent to `<>`. To compare against `null`, use `is null` or `is not null`.

In addition to these comparators, `where` uses the `and`, `or`, and `not` keywords in order to combine criteria. Parentheses may be used to specify order.

There are also additional keywords exclusive to the `where` clause.

|Clause|Usage|
|---|---|
|`contains`|Substring match|
|`starts with`|Prefix match|
|`ends with`|Suffix match|
|`matches`|Regular expression match<sup>1</sup>|
|`like`|Wildcard match<sup>2</sup>|

<sup>1</sup> Regular expressions in QUERY are more extensive than the [[REGEX functions]], constituting a full implementation.
<sup>2</sup> There are two valid wildcards: `%` signifies zero or more arbitrary characters, and `_` represents exactly one of any character.
## Group By
```xls
select Col1, sum(Col2) group by Col1
```

The `group by` clause is used to aggregate values across rows. A single row is created for each distinct combination of values in the group-by clause. The data is automatically sorted by the grouping columns, unless otherwise specified by an order by clause.

If you use a `group` by clause, then every column listed in the select clause must either be listed in the group by clause, or be wrapped by an aggregation function.

This clause is mandatory when selecting aggregation functions.
## Pivot
```xls
select Col1, sum(Col2) group by Col1 pivot Col3
```

The `pivot` clause is used to transform distinct values in columns into new columns. This behavior is very similar to pivot tables.

If you use a `pivot` clause, then _every column_ listed in the `select` clause must either be listed in the `group by` clause or be wrapped by an [aggregation function](https://developers.google.com/chart/interactive/docs/querylanguage#aggregation_functions). As a result, `pivot` is very frequently used with `group by`.

You can pivot by multiple columns. The resulting table has columns for every unique combination of those columns.

There is no native [[Unpivotting|unpivot]] clause or function. 
## Order By
```xls
select Col1 order by Col2 desc
```

The `order by` clause is used to sort the rows by the values in specified columns. Ascending and descending is specified using `asc` and `desc` respectively.

Items in an `order by` clause can be column identifiers, or the output of [aggregation functions](https://developers.google.com/chart/interactive/docs/querylanguage#aggregation_functions), [scalar functions](https://developers.google.com/chart/interactive/docs/querylanguage#scalar_functions), or [operators](https://developers.google.com/chart/interactive/docs/querylanguage#operators).
## Skipping
```xls
select Col1 skipping 2
```

The `skipping` clause is used to select every *n*th row, starting from row 1 (i.e. row 1 is always included). This also means that `skipping 1` has no effect. If an [[QUERY#Offset|offset]] clause is used, `skipping` is applied first.
## Limit

```xls
select Col1 limit 5
```

The `limit` clause is used to limit the number of returned rows. It can only accept integers.
## Offset
```xls
select Col1 offset 5
```

The `offset` clause is used to skip a given number of first rows. If a [`limit`](#limit) clause is used, `offset` is applied first: for example, `limit 15 offset 30` returns rows 31 through 45.
## Label
```xls
select Col1 label Col1 'Name'
```

The `label` clause is used to set the label for one or more columns. Note that you cannot use a label value in place of an ID in a query.

Items in a `label` clause can be column identifiers, or the output of [aggregation functions](#aggregation-functions), [scalar functions](#scalar-functions), or [operators](#arithmetic-operators).
## Format
```xls
select Col1 format Col1 'mmm'
```

The `format` clause is used to specify a formatted value for cells in one or more columns. The returned data should include both an actual value and a formatted value for each cell in a formatted column.
## Options
```xls
select Col1 options no_values
```

The `options` clause is used to control additional options for query execution. Possible keywords that can follow the `options` clause are:

- `no_format` Removes formatted values from the result, and leaves only the underlying values. Can be used when the specific visualization does not use the formatted values to reduce the size of the response.
- `no_values` Removes underlying values from the result, and leaves only the formatted values. Can be used when the specific visualization uses only the formatted values to reduce the size of the response.
# Data Manipulation Functions
## Aggregation Functions
Aggregation functions are passed a single column [identifier](#identifiers), and perform an action across all values in each group (groups are specified by [`group by`](#group-by) or [`pivot`](#pivot) clauses, or all rows if those clauses are not used).

Aggregation functions can be used in `select`, `order by`, `label`, `format` clauses. They _cannot_ appear in `where`, `group by`, `pivot`, `limit`, `offset`, or `options` clauses.

|Name|Description|Supported Column Types|Return Type|
|---|---|---|---|
|`avg()`|Returns the average value of all values in the column for a group.|`number`|`number`|
|`count()`|Returns the count of elements in the specified column for a group. Null cells are not counted.|Any type|`number`|
|`max()`|Returns the maximum value in the column for a group. Dates are compared with earlier being smaller, `string`s are compared alphabetically, with case-sensitivity.|Any type|Same type as column|
|`min()`|Returns the minimum value in the column for a group. Dates are compared with earlier being smaller, `string`s are compared alphabetically, with case-sensitivity|Any type|Same type as column|
|`sum()`|Returns the sum of all values in the column for a group.|`number`|`number`|
## Scalar Functions
Scalar functions return literals by operating over zero or more parameters.

Scalar functions can be used in any of the following clauses: [select](#select), [where](#Where), [group by](#group-by), [pivot](#pivot), [order by](#order-by), [label](#label), and [format](#format).

|Name|   |
|---|---|
|`year()`|Returns the year value from a date or datetime value. For example: `year(date "2009-02-05")` returns 2009.<br><br>**Parameters:** One parameter of type `date` or `datetime`<br><br>**Return Type:** `number`|
|`month()`|Returns the zero-based month value from a date or datetime value. For example: `month(date "2009-02-05")` returns 1. Note: the months are 0-based, so the function returns 0 for January, 1 for February, etc.<br><br>**Parameters:** One parameter of type `date` or `datetime`<br><br>**Return Type:** `number`|
|`day()`|Returns the day of the month from a `date` or datetime value. For example: `day(date "2009-02-05")` returns 5.<br><br>**Parameters:** One parameter of type `date` or `datetime`<br><br>**Return Type:** `number`|
|`hour()`|Returns the hour value from a datetime or `timeofday` value. For example: `hour(timeofday "12:03:17")` returns 12.<br><br>**Parameters:** One parameter of type `datetime` or `timeofday`<br><br>**Return Type:** `number`|
|`minute()`|Returns the minute value from a `datetime` or `timeofday` value. For example: `minute(timeofday "12:03:17")` returns 3.<br><br>**Parameters:** One parameter of type `datetime` or `timeofday`<br><br>**Return Type:** `number`|
|`second()`|Returns the second value from a `datetime` or `timeofday` value. For example: `second(timeofday "12:03:17")` returns 17.<br><br>**Parameters:** One parameter of type `datetime` or `timeofday`<br><br>**Return Type:** `number`|
|`millisecond()`|Returns the millisecond part of a `datetime` or `timeofday` value. For example: `millisecond(timeofday "12:03:17.123")` returns 123.<br><br>**Parameters:** One parameter of type `datetime` or `timeofday`<br><br>**Return Type:** `number`|
|`quarter()`|Returns the quarter from a `date` or `datetime` value. For example: `quarter(date "2009-02-05")` returns 1. Note that quarters are 1-based, so the function returns 1 for the first quarter, 2 for the second, etc.<br><br>**Parameters:** One parameter of type `date` or `datetime`<br><br>**Return Type:** `number`|
|`dayOfWeek()`|Returns the day of week from a `date` or `datetime` value. For example: `dayOfWeek(date "2009-02-26")` returns 5. Note that days are 1-based, so the function returns 1 for Sunday, 2 for Monday, etc.<br><br>**Parameters:** One parameter of type `date` or `datetime`<br><br>**Return Type:** `number`|
|`now()`|Returns a datetime value representing the current `datetime` in the GMT timezone.<br><br>**Parameters:** None<br><br>**Return Type:** `datetime`|
|`dateDiff()`|Returns the difference in days between two `date` or `datetime` values. Note: Only the `date` parts of the values are used in the calculation and thus the function always returns an integer value. For example: `dateDiff(date "2008-03-13", date "2008-02-12")` returns 29; `dateDiff(date "2009-02-13", date "2009-03-13")` returns -29. Time values are truncated before comparison.<br><br>**Parameters:** Two parameters of type `date` or `datetime` (can be one of each)<br><br>**Return Type:** `number`|
|`toDate()`|Transforms the given value to a `date` value.<br><br>- Given a `date`, it returns the same value.<br>- Given a `datetime`, it returns the `date` part. For example: `toDate(dateTime "2009-01-01 12:00:00")` returns "2009-01-01".<br>- Given a `number` N, it returns a `date` N milliseconds after the Epoch. The Epoch is defined as January 1,1970, 00:00:00 GMT. For example: `toDate(1234567890000)` returns "2009-02-13".<br><br>**Parameters:** One parameter of type `date`, `datetime`, or `number`<br><br>**Return Type:** `date`|
|`upper()`|Returns the given `string` in upper case letters. For example: `upper("foo")` returns "FOO".<br><br>**Parameters:** One parameter of type `string`<br><br>**Return Type:** `string`|
|`lower()`|Returns the given `string` in lower case letters. For example: `lower("Bar")` returns "bar".<br><br>**Parameters:** One parameter of type `string`<br><br>**Return Type:** `string`|
## Arithmetic Operators
The arithmetic operators `+`, `-`, `*`, and `/` all function as if [[Array operations|array-enabled]]. They can only operate on numbers and accept both vectors and scalars.
# Language Elements
## Literals
| Type | Format |  |
| ---- | ---- | ---- |
| `string` | A `string` literal should be enclosed in either single or double quotes. **Examples:** `"fourteen" 'hello world' "It's raining"`. |  |
| `number` | Numeric literals are specified in decimal notation. **Examples:** `3  3.0  3.14  -71  -7.2  .6 | ` |
| `boolean` | Boolean literals are either `true` or `false`. |  |
| `date` | Use the keyword `date` followed by a `string` literal in the format `yyyy-MM-dd`. **Example:** `date "2008-03-18"`. |  |
| `timeofday` | Use the keyword `timeofday` followed by a `string` literal in the format `HH:mm:ss[.SSS]` **Example:** `timeofday "12:30:45"`. |  |
| `datetime` | A date and a time, using either the keyword `datetime` or the keyword `timestamp` followed by a `string` literal in the format `yyyy-MM-dd HH:mm:ss[.sss]`. **Example:** `datetime '2008-03-18 12:30:34.123'` |  |
# Identifiers
Identifiers refer to columns. There are only two valid identifier constructions in Google Sheets, which depend on whether the input is a [[virtual array]] or [[range]].

|Input Type|Format|Description|
|---|---|---|
|[[Virtual array]]|`Col#`|The `#` refers to the column index of the input.|
|[[Range]]|`AZ`|You can use a column letter as long as range data is provided.|
# Further Reading
1. [Ben L. Collins's Query Writeup](https://www.benlcollins.com/spreadsheets/google-sheets-query-sql/)
	1. Missing information on the pivot, format, and label clauses. Does not acknowledge most language elements, such as Col# constructions.
2. [Ben L. Collins's Query Course](https://courses.benlcollins.com/p/the-query-function-in-google-sheets)
	1. Goes further in-depth than his write-up, but costs $198.
3. [The r/sheets Wiki](https://www.reddit.com/r/sheets/wiki/formulas/#wiki_query)
	1. Covers practical use with several examples.
4. [ztiaa's BetterQuery](https://docs.google.com/spreadsheets/d/1HoVyY7AEiMxS18Pqpdt08sPsYZw1KQ7qVO0A1RGPwrc/edit?usp=drivesdk)
	1. This is a community-made named function that adds a new way to specify [identifiers](#identifiers) based on headers.