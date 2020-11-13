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

console.log(`initial table:\n${table.toString()}`);

/* -----------------------------------
   -- Example 2. cell margins
   ----------------------------------- */
table.setCellMargin(0);
console.log(`cell margin = 0:\n${table.toString()}`);

table.setCellMargin(2);
console.log(`cell margin = 2:\n${table.toString()}`);
    
/* -----------------------------------
   -- Example 3. Test out styles
   ----------------------------------- */
table.setCellMargin(1);

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
   -- Example 4. setting column width
   ----------------------------------- */
   table.setStyle("ramac");
   table.setWidth(1, 10);
   console.log(`name width = 10:\n${table.toString()}`);

   table.setWidth(1, 5);
   console.log(`name width = 5:\n${table.toString()}`);

/* -----------------------------------
   -- Example 4. setting multiple widths
   ----------------------------------- */
   table.setStyle("ramac");
   table.setWidths([10, 8, 12]);
   console.log(`multiple widths = [10, 8, 12]:\n${table.toString()}`);

/*  -----------------------------------
    -- Example 5. adding a new style
    ----------------------------------- */
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


/* -----------------------------------
   -- Example 6. no title or heading
   ----------------------------------- */
table.setTitle();
table.setHeading();

table.setStyle('ramac');
console.log(`no title/heading:\n${table.toString()}`);
