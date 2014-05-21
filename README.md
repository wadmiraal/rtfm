rtfm
====

RTFM - A new format for your README files.

Installation
============

Coming soon (will be a NodeJS package).

Goal
====

This is just for kicks. It's a new format, similar to Markdown and Textile, but specifically aimed at README files.

As the name implies, this is a format for *manuals*. The interpreter will output any `*.rtfm` file given to it and compile it either to HTML or Markdown. The HTML version is much more fun, though.

Syntax
======

Headings
--------

There are 6 levels of heading. A heading is prefixed with `!`, the number of which determine the hierarchy.

For a first level heading, use 6 `!`:

````
!!!!!! DIE DIE DIE IF YOU DO NOT READ THIS PART
````

For a second level heading, use 5 `!`:

````
!!!!! This is a VERY important part - READ CAREFULLY
````

And so on and so forth.

Bold
----

To set a piece of text as being **bold**, use `**`:

````
I am a string with **bold words**.
````

Italic
------

To set a portion of text as *italic*, use `//`:

````
I am a string with //italic words//.
````

Strike-through
--------------

To set a portion of text as <del>strike-through</del>, use `--`:

````
I am --striken-- with guilt.
````

Underline
---------

To set a portion of text as <u>underlined</u>, use `__`:

````
I am a string with __underlined words__.
````

Link
----

To link to something, use `(Label:link/path)` (the label is optional):

````
You will find more information (here:http://www.example.com) and on (http://www.google.com).
````

Image
-----

To insert an image, use `[Alt text:image/path.jpg]` (the alt text is optional):

````
[Kittens:path/to/kittens.jpg]
````

