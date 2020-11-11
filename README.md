Ascii Table 3
=============

![Build stats](https://travis-ci.com/AllMightySauron/ascii-table2.png)

ascii-table2 is an pure ascii table renderer and beautifier, heavily inspired by the `ascii-table` package created by Beau Sorensen <mail@beausorensen.com> (http://github.com/sorensen). The original package lacked support for multiple table styles and that is what motivated me to create this new one.

Existing code for `ascii-table` should run fine with very few changes (see examples below).

Table of Contents
-----------------

* [Usage](#usage)
- [Examples](#examples)
    * [Basic usage](#basic-usage)
    * [Using styles](#using-styles)
* [API](#api)
- [Static Methods](#static-methods)
    * [align(direction, val, len, [pad])](#asciitablealigndirection-val-len-pad)
    * [alignLeft(val, len, [pad])](#asciitablealignleftval-len-pad)
    * [alignCenter(val, len, [pad])](#asciitablealigncenterval-len-pad)
    * [alignRight(val, len, [pad])](#asciitablealignrightval-len-pad)
    * [alignAuto(val, len, [pad])](#asciitablealignautoval-len-pad)
    * [arrayFill(len, [val])](#asciitablearrayfilllen-val)
- [Class methods](#class-methods)
    * [constructor([title])](#asciitablefactorytitle)

Usage
-----

Node.js

```js
var AsciiTable3 = require('./ascii-table3');
```

Examples
--------

### Basic usage

Tables are created programmatically.

```js
var AsciiTable3 = require('./ascii-table3');

// create table
var table = 
    new AsciiTable3.AsciiTable3('Sample table')
    .setHeading('Name', 'Age', 'Eye color')
    .setAlign(3, AsciiTable3.CENTER)
    .addRowMatrix([
        ['John', 23, 'green'],
        ['Mary', 16, 'brown'],
        ['Rita', 47, 'blue'],
        ['Peter', 8, 'brown']
    ]);

console.log(table.toString());
```

```
+-------------------+
|   Sample table    |
+-----+---+---------+
|Name |Age|Eye color|
+-----+---+---------+
|John | 23|  green  |
|Mary | 16|  brown  |
|Rita | 47|  blue   |
|Peter|  8|  brown  |
+-----+---+---------+
```

We can make simpler tables without a title or headings as well.

```js
var table = new AsciiTable3.AsciiTable3();

table
  .addRow('a', 'apple', 'Some longer string')
  .addRow('b', 'banana', 'hi')
  .addRow('c', 'carrot', 'meow')
  .addRow('e', 'elephants');

console.log(table.toString());
```

```
+-+---------+------------------+
|a|apple    |Some longer string|
|b|banana   |hi                |
|c|carrot   |meow              |
|e|elephants|                  |
+-+---------+------------------+
```

### Using styles

Tables may be rendered using different styles.

```js
var table = 
    new AsciiTable3.AsciiTable3('Sample table')
    .setHeading('Name', 'Age', 'Eye color')
    .setAlign(3, AsciiTable3.CENTER)
    .addRowMatrix([
        ['John', 23, 'green'],
        ['Mary', 16, 'brown'],
        ['Rita', 47, 'blue'],
        ['Peter', 8, 'brown']
    ]);

// set compact style
table.setStyle('compact');
console.log(table.toString());
```

```
-------------------
   Sample table    
-------------------
Name  Age Eye color
----- --- ---------
John   23   green  
Mary   16   brown  
Rita   47   blue   
Peter   8   brown  
```

These styles range from simple to more elaborate.

```js
table.setStyle('unicode-single');
console.log(table.toString());
```

```
┌───────────────────┐
│   Sample table    │
├─────┬───┬─────────┤
│Name │Age│Eye color│
├─────┼───┼─────────┤
│John │ 23│  green  │
│Mary │ 16│  brown  │
│Rita │ 47│  blue   │
│Peter│  8│  brown  │
└─────┴───┴─────────┘
```

