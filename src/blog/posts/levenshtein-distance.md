---
title: Levenshtein Distance
description: Recreating the Levenshtein Distance Algorithm in Google Sheets in
  response to ztiaa's challenge.
author: Astral Café
date: 2024-04-01T21:55:42.643Z
tags:
  - from
---
### Introduction

This problem arose when [ztiaa](https://ztiaa.com/) challenged me to create a formula that calculates the Levenshtein distance between two strings. In simple terms, the Levenshtein distance is how many edits it would take to get from one string to another. It has a number of very nice applications in fuzzy matching, a topic on which I'll likely make additional posts on in the future.

With Levenshtein, there are three accepted actions: removal, insertion, and substitution. Each can be weighted but most implementations use weights of 1.

For example, the Levenshtein distance between the words "chat" and "act" is three.

* Step 1: Substitute c with a - ahat
* Step 2: Remove h - aat
* Step 3: Substitute a with c - act

You can also get there through removals and insertions.

* Step 1: Remove c - hat
* Step 2: Remove h - at
* Step 3: Insert c - act

Pretty simple, right? But the issue arises with the algorithm.

### The Algorithm

Here's the mathematical definition Wikipedia provides:

![ldist Mathematical Definition](https://wikimedia.org/api/rest_v1/media/math/render/svg/70962a722b0b682e398f0ee77d60c714a441c54e)

Now, I'm a high schooler who was never formally taught any of this stuff. It also doesn't help that very little of it is analogous to Google Sheets formulae. But I came across a very nice [Medium article by Ethan Nam](https://medium.com/@ethannam/understanding-the-levenshtein-distance-equation-for-beginners-c4285a5604f0) that helped illustrate the concept. I highly recommend giving it a read.

Anyways, I opted for a matrix implementation using [[arrays]]. However, we only really need to account for the last matrix row we calculated. Let's call it **previous**. We also need to keep track of a **source** and **target** string, as well as the **current** index in the source string.
As per the algorithm, we start by initializing **previous**. That sounds kind of fancy, but really it just means assigning a number to each letter in **target** and tacking a 0 to the beginning of that. So, if our target is "act", the initialized **previous** row looks like this:

|       | a     | c     | t     |
|:-----:|:-----:|:-----:|:-----:|
| **0** | **1** | **2** | **3** |

Awesome. Now, we need to iterate it. An iteration can be described in a couple steps:

1. Take the value to the left and add one to it.
2. Take the value directly above and add one to it.
3. Check if the characters in the **target** and **source** strings corresponding to this spot match.
4. Take the value one up and one left. If they match, add nothing. If they don't, add one to it.
5. Take the minimum value of the three values you just calculated. That's the value for this spot.

For example, take the first iteration. For convenience, I've also gone ahead and added numbers to refer to each spot with in the first row and column. I'll refer to each spot as (row,column).

|     |     | 1   | 2   | 3   | 4   |
|:---:|:---:|:---:|:---:|:---:|:---:|
|     |     |     | a   | c   | t   |
|     |     | 0   | 1   | 2   | 3   |
| 1   | c   |     |     |     |     |
| 2   | h   |     |     |     |     |
| 3   | a   |     |     |     |     |
| 4   | t   |     |     |     |     |

We start by taking our three values for (1,1). There's only one valid value, 0, and we add one to it to get 1.

|     |     | 1   | 2   | 3   | 4   |
|:---:|:---:|:---:|:---:|:---:|:---:|
|     |     |     | a   | c   | t   |
|     |     | 0   | 1   | 2   | 3   |
| 1   | c   | 1   |     |     |     |
| 2   | h   |     |     |     |     |
| 3   | a   |     |     |     |     |
| 4   | t   |     |     |     |     |

Now, we look at (1,2). If you recall the five steps I outlined above:

1. The value to the left is 1. Add one to it to get **2**.
2. The value directly above is 1. Add one to it to get **2**.
3. The character in row 1, "c", does not match the character in column 2, "a".
4. The value up and to the left is 0. Since the characters don't match, add one to it to get **1**.
5. The minimum of 2, 2, and 1 is 1, so our new value is 1.

|     |     | 1   | 2   | 3   | 4   |
|:---:|:---:|:---:|:---:|:---:|:---:|
|     |     |     | a   | c   | t   |
|     |     | 0   | 1   | 2   | 3   |
| 1   | c   | 1   | 1   |     |     |
| 2   | h   |     |     |     |     |
| 3   | a   |     |     |     |     |
| 4   | t   |     |     |     |     |

1. The value to the left is 1. Add one to it to get **2**.
2. The value directly above is 2. Add one to it to get **3**.
3. The character in row 1, "c", matches the character in column 3, "c".
4. So we take the value up and to the left, **1**.
5. The minimum of 2, 3, and 1 is 1, so our new value is 1.

This process continues on for each letter in **source**.

|     |     | 1   | 2   | 3   | 4   |
|:---:|:---:|:---:|:---:|:---:|:---:|
|     |     |     | a   | c   | t   |
|     |     | 0   | 1   | 2   | 3   |
| 1   | c   | 1   | 1   | 1   | 2   |
| 2   | h   | 2   | 2   | 2   | 2   |
| 3   | a   | 3   | 2   | 3   | 3   |
| 4   | t   | 4   | 3   | 3   | 3   |

Finally, once we've gone all the way through, all we need to do is take the value in the bottom right corner. And that's it! We've just calculated the Levenshtein distance between the two strings!

I also realized that you don't actually have to store all of the rows between iterations. Rather, you just need to hold onto the last row you calculated.

### The Formula

This is the formula I developed. For readability, I've beautified it and redefined the variables.

```haskell
=let(
    source,
    "chat",
    target,
    "act",
    index(
        reduce(
            { 0 ,
                sequence(
                    1,
                    len(
                        target
                    )
                ) },
            sequence(
                len(
                    source
                )
            ),
            lambda(
                previous,
                current,
                scan(
                    #N/A,
                    sequence(
                        1,
                        len(
                            target
                        ) + 1
                    ),
                    lambda(
                        left,
                        n,
                        min(
                            index(
                                previous,
                                n
                            ) + 1,
                            ifna(
                                left + 1
                            ),
                            iferror(
                                index(
                                    previous,
                                    n - 1
                                ) +
                                not(
                                    exact(
                                        mid(
                                            source,
                                            current,
                                            1
                                        ),
                                        mid(
                                            target,
                                            n - 1,
                                            1
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            )
        ),
        len(
            target
        ) + 1
    )
)
```

It looks a bit intimidating when it's all spaced out like this, in my opinion, so here it is compressed.

```haskell
=let(source,"chat",target,"act",index(reduce({0,sequence(1,len(target))},sequence(len(source)),lambda(previous,current,scan(#N/A,sequence(1,len(target)+1),lambda(left,n,min(index(previous,n)+1,ifna(left+1),iferror(index(previous,n-1)+not(exact(mid(source,current,1),mid(target,n-1,1))))))))),len(target)+1))
```

### Explanation

This formula just executes the five steps outlined above, using `SCAN` and `REDUCE` to iterate through it. Now that we've got the concepts out of the way, it's time to get our hands dirty.

Firstly, the `LET`. `LET` allows us to define some variables that recur throughout. In this case, we're setting our **source** to "chat" and our **target** to "act". It also helps us generalize, and just makes everything easier to understand.

Next, the `INDEX`. Remember how the bottom right corner gave us our final answer? `INDEX` grabs that for us.

`REDUCE` is one of the most useful functions in Google Sheets. It takes the form `REDUCE(initial_value, array_or_range, LAMBDA)`. So for the initial value, we give it our initialized **previous** array we talked about before. In Google Sheets formulae, that looks something like `{0,sequence(1,len(target))}`. Next, to iterate through each letter in the source string, we just need to give it a sequence equal in size to the length of the source string. This translates quite nicely, to `sequence(len(source))`. This also provides our **current** variable. Finally, the `LAMBDA` just lets us tell it what to do.

`SCAN` takes the same exact form as `REDUCE`. For its `initial_value`, we give it an error since there's nothing left to the first column. For its `array_or_range`, we give it a sequence the length of our target, or `sequence(1,len(target))`. The `LAMBDA` tells it how to go through the five steps.

1. Take the value to the left and add one to it.
   We do this with `left+1`. The `IFNA` gets rid of the error we gave it.
2. Take the value directly above and add one to it.
   The row above is just our **previous** variable, so we can do this with `index(previous,n)+1`.
3. Check if the characters in the **target** and **source** strings corresponding to this spot match.
   This can be done with `exact(mid(source,current,1),mid(target,n-1,1))`.
4. Take the value one up and one left. If they match, add nothing. If they don't, add one to it.
   We take the value up and to the left with `index(previous,-1)` and just add it to the inverse of the Boolean above. Altogether, it looks like `iferror(index(previous,n-1)+not(exact(mid(source,current,1),mid(target,n-1,1))))`.
5. Take the minimum value of the three values you just calculated. That's the value for this spot.
   Wrap all three values we calculated in `MIN` and we've got the current value!

You can find see it in action [here](https://docs.google.com/spreadsheets/d/1iry1jZ-EZJnJ-9lrQchWuDGeimvEs24BGIrCWTWJIvo/edit#gid=0). I've also added ztiaa's solution. Make sure to check out their [blog](https://ztiaa.com/)

\- Astral