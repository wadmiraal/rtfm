# rtfm

[![Build Status](https://travis-ci.org/wadmiraal/rtfm.svg?branch=master)](https://travis-ci.org/wadmiraal/rtfm)
[![Code Climate](https://codeclimate.com/github/wadmiraal/rtfm.png)](https://codeclimate.com/github/wadmiraal/rtfm)
[![Coverage Status](https://coveralls.io/repos/wadmiraal/rtfm/badge.png?branch=master)](https://coveralls.io/r/wadmiraal/rtfm?branch=master)

RTFM - A new format for your README files.

## Installation

Coming soon (will be a NodeJS package).

## Goal

This is just for kicks. It's a new format, similar to Markdown and Textile, but specifically aimed at README files.

As the name implies, this is a format for *manuals*. The interpreter will output any `*.rtfm` file given to it and compile it either to HTML or Markdown. The HTML version is much more fun, though.

## Syntax

### Headings

There are 6 levels of heading. A heading is prefixed with `!`, the number of which determine the hierarchy.

For a first level heading, use 6 `!`:

````
!!!!!! DIE DIE DIE IF YOU DO NOT READ THIS PART
````

For a second level heading, use 5 `!`:

````
!!!!! This is SUCH A VERY important part - IKILLYOUIFYOUDONTREAD
````

And so on and so forth.

### Bold

To set a piece of text as being **bold**, use `**`:

````
I am a string with **bold words**.
````

### Italic

To set a portion of text as *italic*, use `//`:

````
I am a string with //italic words//.
````

### Strike-through

To set a portion of text as <del>strike-through</del>, use `--`:

````
I am --striken-- with guilt.
````

### Underline

To set a portion of text as <u>underlined</u>, use `__`:

````
I am a string with __underlined words__.
````

### Link

To link to something, use `(Label:link/path)` (the label is optional):

````
You will find more information (here:http://www.example.com) and on (http://www.google.com).
````

### Image

To insert an image, use `[Alt text:image/path.jpg]` (the alt text is optional):

````
[Kittens:path/to/kittens.jpg]
````

### Lists

Unordered lists are defined as follows:

````
* My item
* My second item
* My third item,
  that can span multiple lines if I wish
````

Ordered lists are defined as follows (note that when using the HTML output, the numbers are not actually relevant):

````
1. First item on the list
2. Second item on the list
3. Third item on the list, which
   can span multiple lines
````

Definition lists are defined as follows:

````
- Definition title:
  Definition body comes here. It can
  span multiple lines.
- Definition title 2:
  Definition body 2
````

### Code

Inline code snippets are defined using `{{}}`:

````
This is a snippet: {{git init}}
````

Blocks of code are defined using `{{{}}}`:

````
{{{
This is a block of code   
}}}
````

### HTML

Any HTML code will just be output as is, but this is still dodgy if a tag contains complex attributes or styles. Use with caution.
