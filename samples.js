/*jshint esversion: 6 */

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
    
// test out styles
table.setStyle('none');
console.log(`none:\n${table.toString()}`);

table.setStyle('compact');
console.log(`compact:\n${table.toString()}`);

table.setStyle('ascii-table');
console.log(`ascii-table:\n${table.toString()}`);

table.setStyle('ramac');
console.log(`ramac:\n${table.toString()}`);

table.setStyle('unicode-single');
console.log(`unicode-single:\n${table.toString()}`);

table.setStyle('unicode-double');
console.log(`unicode-double:\n${table.toString()}`);

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
