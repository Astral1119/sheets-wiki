---
title: Emoji Modifiers in Google Sheets
short: Emoji Modifiers
description: Investigating how Unicode emoji sequences work in Google Sheets.
author: Astral Café
date: 2024-05-08T12:24:33.132Z
---
I first came about this when Shay asked a question about Unicode glyphs in the [Community Discord](https://discord.gg/M9GKpPd).

![A screenshot of Shay's request, asking if you can compose/decompose glyphs.](/static/img/shay-unicode-request.png "Shay's Request")

As Shay notes, some glyphs, such as 👩🏼‍❤️‍💋‍👨🏾, are actually composed of several characters. This makes it quite difficult to work with in Google sheets, as it won't 'work' with `CODE` and `CHAR` without parsing it. So, how do they work?

There are a couple of parts to it. The first is that human emojis can all have Fitzpatrick emoji modifiers, which modify skin color based on the [Fitzpatrick scale](https://en.wikipedia.org/wiki/Fitzpatrick_scale). By simply putting a Fitzpatrick emoji modifier after a human emoji, it will apply that skin tone to the emoji.

The second element is that certain combinations of emojis can be combined into a single glyph. The one above is a combination of four emojis: 👩, ❤, 💋, and 👨. By using another character, called a zero width joiner (ZWJ), we can combine them into one glyph. There are therefore four distinct elements in the original emoji:

U+1F469 (WOMAN) + 1F3FC (EMOJI MODIFIER FITZPATRICK TYPE-3)
U+2764 (HEAVY BLACK HEART)
U+1F48B (KISS MARK)
U+1F468 (MAN) + 1F3FE (EMOJI MODIFIER FITZPATRICK TYPE-5)

So, we know theoretically how to decompose the emoji, but how can we actually do it in Google Sheets? We can start by getting each individual character. `LEN` and `LENB` on the glyph returns 15 and 30 respectively, which means that each character is two bytes long. Thus our first step should be to split the glyph into two-byte parts:

![Splitting the glyph into two-byte components with =ArrayFormula(mid(GLYPH,sequence(len(GLYPH)),2)).](/static/img/two-byte-split.png "Two-byte Split")

We can already see each element present, but there's also a number of junk characters. We can get rid of them by filtering out every decimal code within the surrogates blocks:

![Parsing out all decimal codes between 55296 and 57343.](/static/img/parsed-glyph-comps.png "Parsed glyph components")

And that's it! These are all of the components, including the ZWJ characters I mentioned before. To get the original glyph, just use `JOIN` and voila! A full decomposition/composition pipeline for Unicode glyphs.

You can find a link to a sheet showing the full process [here](https://docs.google.com/spreadsheets/d/1jtw8Y6U9J8jXd3V82I6gCiJKZf3U4YjCtab2DhgCX5Y/edit?usp=sharing).

Additional sources:
- [Decimal codes for Unicode blocks](https://www.ssec.wisc.edu/~tomw/java/unicode.html)
- [Information about emoji relationships](https://crissov.github.io/unicode-proposals/relationships.html)
- [Wikipedia page for emoji modifiers](https://en.wikipedia.org/wiki/Miscellaneous_Symbols_and_Pictographs#Emoji_modifiers)