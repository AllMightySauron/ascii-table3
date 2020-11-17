/*jshint esversion: 6 */

// example 1: base table
console.log ('>>>>>> example 1. base table');

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

console.log(`base table:\n${table.toString()}`);

// Example 2. cell margins
console.log ('>>>>>> example 2: cell margins');

table.setCellMargin(0);
console.log(`cell margin = 0:\n${table.toString()}`);

table.setCellMargin(2);
console.log(`cell margin = 2:\n${table.toString()}`);
    
// example 3. Test out styles
console.log ('>>>>>> example 3: test out styles');

table.setCellMargin(1);

table.getStyles().forEach(style => {
    table.setStyle(style.name);

    console.log(`${style.name}:\n${table.toString()}`);
});

// example 4. column width
console.log ('>>>>>> example 4: column width');

table.setStyle("ramac");
table.setWidth(1, 10);
console.log(`name width = 10:\n${table.toString()}`);

table.setWidth(1, 5);
console.log(`name width = 5:\n${table.toString()}`);

table.setWidths([10, 8, 12]);
console.log(`multiple widths = [10, 8, 12]:\n${table.toString()}`);

// example 5. adding a new style
console.log ('>>>>>> example 5: adding a new style');

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
console.log(`rounded style:\n${table.toString()}`);

// example 6. row data wrapping
console.log ('>>>>>> example 6: row data wrapping');
table.clearRows();
table.addRow('James Bond', 41, 'blue').addRow('Harry Potter', 18, 'brown').addRow('Scooby Doo', 23, 'brown').addRow('Mickey Mouse', 120, 'black');
table.setWidth(1, 8).setWrapped(1);

console.log(`data wrapping:\n${table.toString()}`);

// example 7. no title or heading
console.log ('>>>>>> example 7: no title or heading');

table.setTitle();
table.setHeading();

table.setStyle('ramac');
console.log(`no title/heading:\n${table.toString()}`);

