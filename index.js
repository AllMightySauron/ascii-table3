/* -----------------------------------
   -- Example 1. simple table
   ----------------------------------- */
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

// test out styles
table.setStyle('compact');
console.log(table.toString());

table.setStyle('unicode-single');
console.log(table.toString());

/* -----------------------------------
   -- Example 2. no title or heading
   ----------------------------------- */
var table2 = new AsciiTable3.AsciiTable3();

table2
  .addRow('a', 'apple', 'Some longer string')
  .addRow('b', 'banana', 'hi')
  .addRow('c', 'carrot', 'meow')
  .addRow('e', 'elephants');

console.log(table2.toString());
