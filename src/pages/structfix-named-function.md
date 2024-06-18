---
title: STRUCTFIX
short: STRUCTFIX Named Function
description: Function that fixes a particular type of data structure
author: Aliafriend
date: 2024-06-18T15:23:52.118Z
---
<iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSO3dYwsO1OOjmnLmI0IPMiwfWXxY5n-ynkS0MHvbK34uyzle-RvWGhj0zlIpOC3UWxijpzvXkZViqE/pubhtml?gid=193434782&amp;single=true&amp;widget=true&amp;headers=false"></iframe>

```haskell
=STRUCTFIX(A3:E,{1,2},{3,4,5},C2:E2)
```

```haskell
=LAMBDA(data,groupby_columns,columns_to_transpose,groupby_headers,MAP(TOCOL(BYROW(data,lambda(row,map(CHOOSECOLS(row,columns_to_transpose),groupby_headers,lambda(items,label,IF(items<>"",JOIN("|",CHOOSECOLS(row,groupby_columns),label,items),))))),3),lambda(results,split(results,"|"))))(data,groupby_columns,columns_to_transpose,groupby_headers)
```

[Example Page](https://docs.google.com/spreadsheets/d/1IfwyANoEJq0SbstR6j4oAJSVR1DI1DLX8VpA0UM-Ktc/edit?gid=625236510#gid=625236510)

This function allows to fix this type of data structure problem.

The first argument is to select all the data range without headers.

The second argument is to select which columns to group by in the form of {1,2}

The third argument is to select which columns the data you need grouped by in the form of {3,4,5}

The fourth argument is the headers for the columns for the data you need grouped by.