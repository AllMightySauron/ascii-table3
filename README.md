Ascii Table 3
=============

[![Build stats](https://travis-ci.com/AllMightySauron/ascii-table3.png)](https://travis-ci.com/AllMightySauron/ascii-table3)
[![npm version](https://badge.fury.io/js/ascii-table3.png)](https://badge.fury.io/js/ascii-table3)

`ascii-table3` is a pure ascii table renderer and beautifier, heavily inspired by the `ascii-table` package created by Beau Sorensen. The original package lacked support for multiple table styles and that is what motivated me to create this new one.

Currently with **over a dozen** predefined table styles, the collection style keeps growing. I am pretty sure there is a style for everyone. If not, you can even design your own custom stye and add it to the library!

Please direct any issues, suggestions or feature requests to the [ascii-table3 github] (https://github.com/AllMightySauron/ascii-table3) page.

Existing code for the original `ascii-table` package should run fine with very few changes (see examples below).

# Usage

**Node.js**

```javascript
var AsciiTable3 = require('ascii-table3');
```

##  Basic usage

Tables are created programmatically.

```javascript
var AsciiTable3 = require('ascii-table3');

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
```asciidoc
+-------------------------+
|      Sample table       |
+-------+-----+-----------+
| Name  | Age | Eye color |
+-------+-----+-----------+
| John  |  23 |   green   |
| Mary  |  16 |   brown   |
| Rita  |  47 |   blue    |
| Peter |   8 |   brown   |
+-------+-----+-----------+
```
We can make simpler tables without a title or headings as well.

```javascript
var table = 
    new AsciiTable3.AsciiTable3()
    .setAlign(3, AsciiTable3.CENTER)
    .addRowMatrix([
        ['John', 23, 'green'],
        ['Mary', 16, 'brown'],
        ['Rita', 47, 'blue'],
        ['Peter', 8, 'brown']
    ]);

console.log(table.toString());
```
```asciidoc
+-------+----+-------+
| John  | 23 | green |
| Mary  | 16 | brown |
| Rita  | 47 | blue  |
| Peter |  8 | brown |
+-------+----+-------+
```

## Using styles

Tables may be rendered using different styles.

```javascript
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

```asciidoc
-------------------------
 Name    Age   Eye color
------- ----- -----------
 John     23     green
 Mary     16     brown
 Rita     47     blue
 Peter     8     brown
```

These styles range from simple to more elaborate.

```javascript
table.setStyle('unicode-single');
console.log(table.toString());
```
```asciidoc
┌─────────────────────────┐
│      Sample table       │
├───────┬─────┬───────────┤
│ Name  │ Age │ Eye color │
├───────┼─────┼───────────┤
│ John  │  23 │   green   │
│ Mary  │  16 │   brown   │
│ Rita  │  47 │   blue    │
│ Peter │   8 │   brown   │
└───────┴─────┴───────────┘
```

# API

## Constructor

### AsciiTable3([title])

Creates new table object.

* `title` - table title (optional)

```javascript
var AsciiTable3 = require('ascii-table3');

var table = AsciiTable3.AsciiTable3('Data');
```
## Static Methods

### AsciiTable3.isNumeric(val)

Returns wether a `val` is numeric or not, irrespective of its type.

* `val` - value to check

```javascript
AsciiTable3.isNumeric('test')  // false
AsciiTable3.isNumeric(10)      // true
AsciiTable3.isNumeric(3.14)    // true
```
### AsciiTable3.isWhiteSpace(str)

Return whether this character is whitespace (used internally for word wrapping purposes).

* `str` - character to test

```javascript
AsciiTable3.isWhiteSpace(' '')   // true
AsciiTable3.isWhiteSpace('\t')   // true
AsciiTable3.isWhiteSpace('*')    // false
```

### AsciiTable3.align(direction, val, len, [pad])

Shortcut to one of the three following methods.

* `direction` - alignment direction (`AsciiTable3.LEFT`, `AsciiTable3.CENTER`, `AsciiTable3.RIGHT`, `AsciiTable3.AUTO`)
* `val` - string to align
* `len` - total length of created string
* `pad` - padding / fill char (optional, default `' '`)

Example:

```javascript
AsciiTable3.align(AsciiTable3.LEFT, 'hey', 7) // 'hey    '
```

### AsciiTable3.alignLeft(val, len, [pad])

* `val` - string to align
* `len` - total length of created string
* `pad` - padding / fill char (optional, default `' '`)

Example:

```javascript
AsciiTable3.alignLeft('hey', 7, '-') // 'hey----'
```

### AsciiTable3.alignCenter(val, len, [pad])

* `val` - string to align
* `len` - total length of created string
* `pad` - padding / fill char (optional, default `' '`)

Example:

```javascript
AsciiTable3.alignCenter('hey', 7) // '  hey  '
```

### AsciiTable3.alignRight(val, len, [pad])

* `val` - string to align
* `len` - total length of created string
* `pad` - padding / fill char (optional, default `' '`)

Example:

```javascript
AsciiTable3.alignRight('hey', 7) // '    hey'
```

### AsciiTable3.alignAuto(val, len, [pad])

Attempts to do intelligent alignment of provided `val`, `String` input will 
be left aligned, `Number` types will be right aligned.

* `val` - string to align
* `len` - total length of created string
* `pad` - padding / fill char (optional, default `' '`)

Example:

```javascript
AsciiTable3.align(AsciiTable3.LEFT, 'hey', 7) // 'hey    '
```

### AsciiTable3.wordWrap(str, maxWidth)

Wraps a string into multiple lines of a limited width.

* `str` - string to wrap
* `maxWidth` - maximum width for the wrapped string

```javascript
AsciiTable3.wordWrap('dummy', 5)           // dummy

AsciiTable3.wordWrap('this is a test', 5)  
// this
// is a
// test

AsciiTable3.wordWrap('this is a test', 3)
// thi
// s
// is
// a
// tes
// t
```

### AsciiTable3.truncateString(str, len)

Truncates a string up to a maximum number of characters (if needed).

* `str` - string to truncate
* `len` - maximum string lenght

Example:

```javascript
AsciiTable3.truncateString('bananas', 6)   // 'ban...'
AsciiTable3.truncateString('apples', 10)   // 'apples'
```

### AsciiTable3.arrayFill(len, [val])

Create a new array at the given len, filled with the given value, mainly used internally.

* `len` - length of array
* `val` - fill value (optional)

Example:

```javascript
AsciiTable3.arrayFill(4, 0) // [0, 0, 0, 0]
AsciiTable3.arrayFill(2)    // [undefined, undefined]
```
### AsciiTable3.ArrayResize(arr, len, [val])

Increases existing array size up to the desired limit.

* `arr` - array to increase size
* `len` - new array length
* `val` - fill value (optional)

```javascript
var arr = [ 'a', 'b', 'c' ];

AsciiTable3.arrayResize(arr, 4)     // [ 'a', 'b', 'c', undefined ]
```

## Instance methods

### Title

#### instance.setTitle(title)

Sets the table title.

* `title` - table title

Example:

```javascript
var table = new AsciiTable('Old Title')

table.setTitle('New Title')
```

####  instance.getTitle()

Get the current title of the table.

Example:

```javascript
table.getTitle() // 'New Title'
```

#### instance.setTitleAlign(direction)

Sets up the desired table title alignment.

* `direction` - table alignment direction

Example:

```javascript
// center table title
table.setTitleAlign(AsciiTable3.CENTER);
```
#### instance.setTitleAlignLeft()

Alias to `instance.setTitleAlign(AsciiTable3.LEFT)`

#### instance.setTitleAlignCenter()

Alias to `instance.setTitleAlign(AsciiTable3.CENTER)`

####  instance.setTitleAlignRight()

Alias to `instance.setTitleAlign(AsciiTable3.RIGHT)`

#### instance.getTitleAlign()

Gets the current title alignment type (between `AsciiTable3.LEFT`, `AsciiTable3.CENTER` and `AsciiTable3.RIGHT`).

Example:

```javascript
table.setTitleAlignLeft();

table.getTitleAlign()      // AsciiTable3.LEFT
```

### Heading

#### instance.setHeading(heading, [...])

Set the column headings for the table, takes arguments the same way as `addRow`.

* `heading` - heading array or arguments

Example:

```javascript
table.setHeading('ID', 'Key', 'Value')

// or:

table.setHeading(['ID', 'Key', 'Value'])
```

#### instance.getHeading()

Get the column head for the table as an array.

Example:

```javascript
table.setHeading('Name', 'Age', 'Height');

table.getHeading()    // [ 'Name', 'Age', 'Height' ]
```

#### instance.setHeadingAlign(direction)

* `direction` - direction for heading alignment.

Example:

```javascript
table.setHeadingAlign(AsciiTable3.LEFT);
```

#### instance.setHeadingAlignLeft()

Alias to `instance.setHeadingAlignLeft(AsciiTable3.LEFT)`


#### instance.setHeadingAlignCenter()

Alias to `instance.setHeadingAlignLeft(AsciiTable3.CENTER)`


#### instance.setHeadingAlignRight()

Alias to `instance.setHeadingAlignLeft(AsciiTable3.RIGHT)`

#### instance.getHeadingAlign()

Gets the current heading alignment type (between `AsciiTable3.LEFT`, `AsciiTable3.CENTER` and `AsciiTable3.RIGHT`).

Example:

```javascript
table.setHeadinglignLeft();

table.getHeadingAlign()      // AsciiTable3.LEFT
```

### Data rows

#### instance.addRow(row, [...])

Rows can be added using a single array argument, or the arguments if multiple 
args are used when calling the method.

* `row` - array or arguments of column values

Example:

```javascript
var table = new AsciiTable3.AsciiTable3();

table
  .addRow(1, 'Bob', 52)
  .addRow([2, 'John', 34]);

console.log(table.toString());
```
```asciidoc
+---+------+----+
| 1 | Bob  | 52 |
| 2 | John | 34 |
+---+------+----+
```

#### instance.addNonZeroRow(row, [...])

Adds new row to table, as long as at least one of the numeric cells' value is not 0 (zero).

* `row` - array or arguments of column values

Example:

```javascript
var table = new AsciiTable3.AsciiTable3();

table
  .addRow(1, 'Bob', 52)
  .addRow([2, 'John', 34]);

console.log(table.toString());
```
```asciidoc
+---+------+----+
| 1 | Bob  | 52 |
| 2 | John | 34 |
+---+------+----+
```

If all numeric values are 0 (zero) the new row is not added.

```javascript
table.addNonZeroRow(0, 'Dummy', 0); // should not be added

console.log(table.toString());
```
```asciidoc
+---+------+----+
| 1 | Bob  | 52 |
| 2 | John | 34 |
+---+------+----+
```

#### instance.addRowMatrix(rows)

Bulk `addRow` operation.

* `rows` - multidimensional array of rows

Example:

```javascript
table.addRowMatrix([
  [2, 'John', 34]
, [3, 'Jim', 83]
]);

console.log(table.toString());
```
```asciidoc
+---+------+----+
| 2 | John | 34 |
| 3 | Jim  | 83 |
+---+------+----+
```

#### instance.getRows()

Get the multidimension array of rows from the table.

Example:

```javascript
table.addRowMatrix([
  [2, 'John', 34]
, [3, 'Jim', 83]
]);

console.log(table.getRows());
```
```json
[
  [2, 'John', 34]
, [3, 'Jim', 83]
]
```

### Styles

#### instance.setStyle(name)

Sets the table border style for rendering. Examples are provided below. New border styles are expected to be added as time goes by.

* `name` - the style name

Currently available styles are:

* **none** - Borderless
```asciidoc
      Sample table
 Name    Age   Eye color
 John     23     green
 Mary     16     brown
 Rita     47     blue
 Peter     8     brown
```
* **compact** - Compact
```asciidoc
-------------------------
      Sample table
-------------------------
 Name    Age   Eye color
------- ----- -----------
 John     23     green
 Mary     16     brown
 Rita     47     blue
 Peter     8     brown
```
* `**ramac** - beautified 7-bit ASCII output ( the *default* style)
```asciidoc
+-------------------------+
|      Sample table       |
+-------+-----+-----------+
| Name  | Age | Eye color |
+-------+-----+-----------+
| John  |  23 |   green   |
| Mary  |  16 |   brown   |
| Rita  |  47 |   blue    |
| Peter |   8 |   brown   |
+-------+-----+-----------+
```
* **ascii-table** - mimics the original `ascii-table` npm package table style
```asciidoc
.-------------------------.
|      Sample table       |
|-------------------------|
| Name  | Age | Eye color |
|-------------------------|
| John  |  23 |   green   |
| Mary  |  16 |   brown   |
| Rita  |  47 |   blue    |
| Peter |   8 |   brown   |
.-------------------------.
```
* **ascii-reStructuredText** - [reStructuredText](http://docutils.sourceforge.net/docs/ref/rst/restructuredtext.html#tables) grid style
```asciidoc
+-------------------------+
|      Sample table       |
+-------+-----+-----------+
| Name  | Age | Eye color |
+=======+=====+===========+
| John  |  23 |   green   |
| Mary  |  16 |   brown   |
| Rita  |  47 |   blue    |
| Peter |   8 |   brown   |
+-------+-----+-----------+
```
* **ascii-reStructuredText-simple** - [reStructuredText](http://docutils.sourceforge.net/docs/ref/rst/restructuredtext.html#tables) simple style
```asciidoc
===========================
       Sample table
======== ===== ============
  Name    Age   Eye color
======== ===== ============
  John     23     green
  Mary     16     brown
  Rita     47     blue
  Peter     8     brown
======== ===== ============
```
* **ascii-dots** - Ascii dotted border
```asciidoc
...........................
:      Sample table       :
:.........................:
: Name  : Age : Eye color :
:.......:.....:...........:
: John  :  23 :   green   :
: Mary  :  16 :   brown   :
: Rita  :  47 :   blue    :
: Peter :   8 :   brown   :
:.......:.....:...........:
```
* **ascii-rounded** - Ascii rounded-corner border
```asciidoc
.-------------------------.
|      Sample table       |
:-------.-----.-----------:
| Name  | Age | Eye color |
:-------+-----+-----------:
| John  |  23 |   green   |
| Mary  |  16 |   brown   |
| Rita  |  47 |   blue    |
| Peter |   8 |   brown   |
'-------'-----'-----------'
```
* **ascii-girder** - Ascii girder-like border
```asciicode
//===========================\\
||       Sample table        ||
|]=======[]=====[]===========[|
|| Name  || Age || Eye color ||
|]=======[]=====[]===========[|
|| John  ||  23 ||   green   ||
|| Mary  ||  16 ||   brown   ||
|| Rita  ||  47 ||   blue    ||
|| Peter ||   8 ||   brown   ||
\\=======[]=====[]===========//
```
* **unicode-single** - Single line unicode chars border
```asciidoc
┌─────────────────────────┐
│      Sample table       │
├───────┬─────┬───────────┤
│ Name  │ Age │ Eye color │
├───────┼─────┼───────────┤
│ John  │  23 │   green   │
│ Mary  │  16 │   brown   │
│ Rita  │  47 │   blue    │
│ Peter │   8 │   brown   │
└───────┴─────┴───────────┘
```
* **unicode-double**- Double line unicode chars border
```asciidoc
╔═════════════════════════╗
║      Sample table       ║
╠═══════╦═════╦═══════════╣
║ Name  ║ Age ║ Eye color ║
╠═══════╬═════╬═══════════╣
║ John  ║  23 ║   green   ║
║ Mary  ║  16 ║   brown   ║
║ Rita  ║  47 ║   blue    ║
║ Peter ║   8 ║   brown   ║
╚═══════╩═════╩═══════════╝
```
* **unicode-mix** - Mixed single/double line unicode style (single internal border and double external border)
```asciidoc
╔═════════════════════════╗
║      Sample table       ║
╟═══════╤═════╤═══════════╢
║ Name  │ Age │ Eye color ║
╟───────┼─────┼───────────╢
║ John  │  23 │   green   ║
║ Mary  │  16 │   brown   ║
║ Rita  │  47 │   blue    ║
║ Peter │   8 │   brown   ║
╚═══════╧═════╧═══════════╝
```
* **github-markdown** - github markdown style
```asciidoc
|      Sample table       |
| Name  | Age | Eye color |
|-------|-----|-----------|
| John  |  23 |   green   |
| Mary  |  16 |   brown   |
| Rita  |  47 |   blue    |
| Peter |   8 |   brown   |
```
* **reddit-markdown** - reddit markdown style
```asciidoc
      Sample table
 Name  | Age | Eye color
-------|-----|-----------
 John  |  23 |   green
 Mary  |  16 |   brown
 Rita  |  47 |   blue
 Peter |   8 |   brown
```

#### instance.getStyle()

Retrieves the current border style set for the instance. Style is returned as an object.

Example:

```javascript
var style = table.getStyle();

console.log (style);
```
```json
{
        "name": "unicode-double",
        "borders": {
            "top": {
                "left": "╔",
                "center": "═",
                "right": "╗",
                "colSeparator": "╦"
            },
            "middle": {
                "left": "╠",
                "center": "═",
                "right": "╣",
                "colSeparator": "╬"
            },
            "bottom": {
                "left": "╚",
                "center": "═",
                "right": "╝",
                "colSeparator": "╩"
            },
            "data" : {
                "left": "║",
                "center": " ",
                "right": "║",
                "colSeparator": "║"
            }
        }
    }
```

#### instance.addStyle(style)

Adds a custom new style to the list of predefined table styles.

* `style` - style object to add

Example:

```javascript
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
    
const roundedStyle = {
  name: "rounded",
  borders: {
    top: {
        left: ".", center: "-", right: ".", colSeparator: "."
    },
    middle: {
        left: ":", center: "-", right: ":", colSeparator: "+"
    },
    bottom: {
        left: "'", center: "-", right: "'", colSeparator: "'"
    },
    data : {
        left: "|", center: " ", right: "|", colSeparator: "|"
    }
  }
};

table.addStyle(roundedStyle);
table.setStyle("rounded");

console.log(table.toString());
```
```asciidoc
.--------------------------------.
|          Sample table          |
:----------.--------.------------:
|   Name   |  Age   | Eye color  |
:----------+--------+------------:
| John     |     23 |   green    |
| Mary     |     16 |   brown    |
| Rita     |     47 |    blue    |
| Peter    |      8 |   brown    |
'----------'--------'------------'
```

#### instance.removeBorder()

Shortcut for **instance.setStyle('none')**.

Example:

```javascript
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
    
  table.removeBorder();
  
  console.log(table);
```
```asciidoc
      Sample table
 Name    Age   Eye color
 John     23     green
 Mary     16     brown
 Rita     47     blue
 Peter     8     brown
```

#### instance.setWidth(idx, width)

Sets a preset width for a given column to be used when rendering the table.

* `idx` - table column index (starts at 1)
* `width` - column width

Example:

```javascript
var table = 
    new AsciiTable3.AsciiTable3('Sample table')
    .setHeading('Name', 'Age', 'Eye color')
    .addRowMatrix([
        ['John', 23, 'green'],
        ['Mary', 16, 'brown'],
        ['Rita', 47, 'blue'],
        ['Peter', 8, 'brown']
    ]);
    
// set the age column width to 5 characters
table.setWidth(1, 10);

console.log(table.toString());
```
```asciidoc
+----------+-----+-----------+
|   Name   | Age | Eye color |
+----------+-----+-----------+
| John     |  23 |   green   |
| Mary     |  16 |   brown   |
| Rita     |  47 |   blue    |
| Peter    |   8 |   brown   |
+----------+-----+-----------+
```

#### instance.getWidth(idx)

Get the preset width for a given column when rendering.

* `idx` - table column to get width (starts at 1)

Example: 

```javascript
table.setWidth(2, 5);

table.getWidth(2)      // 5
table.getWidth(1)      // undefined (not set)
```

#### instance.setWidths(widths)

Sets column widths for table rendering using an array.

* `widths` - array of widths

Example:

```javascript
var table = 
    new AsciiTable3.AsciiTable3('Sample table')
    .setHeading('Name', 'Age', 'Eye color')
    .addRowMatrix([
        ['John', 23, 'green'],
        ['Mary', 16, 'brown'],
        ['Rita', 47, 'blue'],
        ['Peter', 8, 'brown']
    ]);
    
// set the age column width to 5 characters
table.setWidths([10, 8, 12]);

console.log(table.toString());
```
```asciidoc
+----------+--------+------------+
|   Name   |  Age   | Eye color  |
+----------+--------+------------+
| John     |     23 | green      |
| Mary     |     16 | brown      |
| Rita     |     47 | blue       |
| Peter    |      8 | brown      |
+----------+--------+------------+
```

#### instance.getWidths()

Gets the present widths for each column (if any).

Example:

```javascript
table.setWidths([1, undefined, 3]);

table.getWidths()     // [1, undefined, 3]
```

#### instance.setAlign(idx, direction)

* `idx` - column index to align (starts at 1)
* `direction` - alignment direction, (`AsciiTable3.LEFT`, `AsciiTable3.CENTER`, `AsciiTable3.RIGHT`)

Example:

```javascript
table
  .setAlign(2, AsciiTable3.CENTER)
  .setAlign(3, AsciiTable3.RIGHT);

console.log(table.toString());
```
```
+---+-----------+--------------------+
| a |   apple   | Some longer string |
| b |   banana  |                 hi |
| c |   carrot  |               meow |
| e | elephants |                    |
+---+-----------+--------------------+
```

#### instance.setAlignLeft(idx)

Alias to `instance.setAlign(idx, AsciiTable3.LEFT)`

#### instance.setAlignCenter(idx)

Alias to `instance.setAlign(idx, AsciiTable3.CENTER)`

#### instance.setAlignRight(idx)

Alias to `instance.setAlign(idx, AsciiTable3.RIGHT)`

#### instance.getAlign(idx)

Get column table alignment.

* `idx` - columns to get alignment (starts at 1)

Example:

```javascript
table.setAlignRight(2);

table.getAlign(2)       // AsciiTable3.RIGHT
```

#### instance.setWrapped(idx, [wrap])

Sets the wrapping property for a specific column (wrapped content will generate more than one data row if needed).

* `idx` - column to wrap (starts at 1).
* `wrap` - wrap boolean setting (default is true).

```javascript
var table = 
    new AsciiTable3.AsciiTable3('Sample table')
    .setHeading('Name', 'Age', 'Eye color')
    .setAlign(3, AsciiTable3.CENTER)
    .addRowMatrix([
        ['James Bond', 41, 'blue'],
        ['Harry Potter', 18, 'brown'],
        ['Scooby Doo', 23, 'brown'],
        ['Mickey Mouse', 120, 'black']
    ]);

// first column width is 8 characters and wrapped
table.setWidth(1, 8).setWrapped(1);

console.log(table.toString());
```
```asciidoc
.------------------------------.
|         Sample table         |
:--------.--------.------------:
|  Name  |  Age   | Eye color  |
:--------+--------+------------:
| James  |     41 |    blue    |
| Bond   |        |            |
| Harry  |     18 |   brown    |
| Potter |        |            |
| Scooby |     23 |   brown    |
| Doo    |        |            |
| Mickey |    120 |   black    |
| Mouse  |        |            |
'--------'--------'------------'
```

#### instance.isWrapped(idx)

Gets the wrapping setting for a given column (true or false).

* `idx` - column to check (starts at 1)

```javascript
var table = 
    new AsciiTable3.AsciiTable3('Sample table')
    .setHeading('Name', 'Age', 'Eye color')
    .setAlign(3, AsciiTable3.CENTER)
    .addRowMatrix([
        ['James Bond', 41, 'blue'],
        ['Harry Potter', 18, 'brown'],
        ['Scooby Doo', 23, 'brown'],
        ['Mickey Mouse', 120, 'black']
    ]);

// first column width is 8 characters and wrapped
table.setWidth(1, 8).setWrapped(1);

table.isWrapped(1)     // true
table.isWrapped(2)     // false
```

#### instance.setCellMargin(margin)

Sets internal margin for cell data (table default is 1).

* `margin` - number of empty characters to use for cell margin

Example 1 (no cell margin):

```javascript
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
    
table.setCellMargin(0);
```
```asciidoc
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

Example 2 (cell margin set to 2):

```javascript
table.setCellMargin(2);
```
```asciidoc
+-------------------------------+
|         Sample table          |
+---------+-------+-------------+
|  Name   |  Age  |  Eye color  |
+---------+-------+-------------+
|  John   |   23  |    green    |
|  Mary   |   16  |    brown    |
|  Rita   |   47  |    blue     |
|  Peter  |    8  |    brown    |
+---------+-------+-------------+
```
#### instance.getCellMargin()

Gets the current cell margin for the specified table instance.

Example:

```javascript
table.setCellMargin(2);

table.getCellMargin()      // 2
```

#### instance.setJustify([enabled])

Justify all columns to be the same width.

* `enabled` - Boolean for turning justify on or off (default is true).

```javascript
var table = new AsciiTable3.AsciiTable3('Dummy title')
            .setHeading('Title', 'Count', 'Rate (%)')
            .addRowMatrix([ 
                ['Dummy 1', 10, 2.3], 
                ['Dummy 2', 5, 3.1],  
                ['Dummy 3', 100, 3.14],
                ['Dummy 4', 0, 1],
             ]);

table.setJustify();

console.log(table.toString());
```
```
+--------------------------------+
|          Dummy title           |
+----------+----------+----------+
|  Title   |  Count   | Rate (%) |
+----------+----------+----------+
| Dummy 1  |       10 |      2.3 |
| Dummy 2  |        5 |      3.1 |
| Dummy 3  |      100 |     3.14 |
| Dummy 4  |        0 |        1 |
+----------+----------+----------+
```

#### instance.getJustify()

Returns whether all table columns are to be rendered with the same width.

```javascript
table.setJustify();

table.getJustify()      // true
```

### Clearing data

#### instance.clear()

Clear / reset all table data

Example:

```javascript
table.clear();
```

#### instance.clearRows()

Resets all row data, maintaining title, headings, widths and style.

```javascript
table.clearRows();
```

### Sorting

#### instance.sort(comparefunc)

Sort the table rows according to a specific criteria.

* `comparefunc` - compare function to run against the rows

Example:

```javascript
table.sort(function(a, b) {
  return a[2] - b[2]
})
console.log(table.toString())
```
```asciidoc
+---+------+----+
| 2 | John | 34 |
| 1 | Bob  | 52 |
| 3 | Jim  | 83 |
+---+------+----+
```

#### instance.sortColumn(index, comparefunc)

Sorting shortcut for targeting a specific column.

* `index` - column idx to sort
* `comparefunc` - sorting compare function to run against column values

Example:

```js
// This is quivalent to the `sort` example above
table.sortColumn(2, function(a, b) {
  return a - b
})
```

### Serialization

#### instance.toJSON()

Return the JSON representation of the table, this also allows us to call 
`JSON.stringify` on the instance.

Example:

```javascript
var table = new AsciiTable3.AsciiTable3('Title');

table
  .setHeading('id', 'name')
  .addRow(1, 'Bob')
  .addRow(2, 'Steve')
  .setWidths([3, 10]);

console.log(table.toJSON())
console.log(JSON.stringify(table))
```
```json
{
  title: 'Title'
, heading: [ 'id', 'name' ]
, rows: [ 
    [ 1, 'Bob' ]
  , [ 2, 'Steve' ] 
  ]
, widths: [3, 10]
}
```
```
{"title":"Title","heading":["id","name"],"rows":[[1,"Bob"],[2,"Steve"]], "widths": [3, 10]}
```

#### instance.fromJSON(obj)

Populate the table from JSON object, should match the `toJSON` output above.

* `obj` - json object
* 
Example:

```js
var table = new AsciiTable3.AsciiTable3()
.fromJSON({
  title: 'Title'
, heading: [ 'id', 'name' ]
, rows: [ 
    [ 1, 'Bob' ]
  , [ 2, 'Steve' ] 
  ]
, widths: [3, 10] 
})
```
### Rendering

#### instance.toString()

Renders the instance as a string for output.

Example:

```javascript
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
```asciidoc
+-------------------------+
|      Sample table       |
+-------+-----+-----------+
| Name  | Age | Eye color |
+-------+-----+-----------+
| John  |  23 |   green   |
| Mary  |  16 |   brown   |
| Rita  |  47 |   blue    |
| Peter |   8 |   brown   |
+-------+-----+-----------+
```

# Install

With [npm](https://npmjs.org):

```bash
npm install ascii-table3
```