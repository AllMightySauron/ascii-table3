/*jshint esversion: 6 */

// load modules
const fs = require('fs');
const chalk = require('chalk');
const { AsciiTable3 } = require('./ascii-table3');

// get path to list from command line
const path = process.argv.length <= 2 ? '.' : process.argv[2];

// build table
const dirTable =
    new AsciiTable3(`Directory: ${path}`)
    .setHeading('Type', 'Name', 'Size (bytes)', 'Last change')
    .setAlignRight(3);

try {
    // read items on dir
    const items = fs.readdirSync(path);

    // loop over items
    items.forEach(item => {
        // get item full path
        const fullPath = path + '/' + item;

        try {
            // retrieve stats
            const stat = fs.statSync(fullPath);

            var type;
            if (stat.isDirectory()) type = 'Directory';
            else if (stat.isFile()) type = 'File';
            else if (stat.isSocket()) type = 'Socket';
            else if (stat.isSymbolicLink) type = 'Sym Link';
            else type = '??';
    
            const size = type == 'Directory' ? '-' : new Intl.NumberFormat().format(stat.size);
    
            // add new table row
            dirTable.addRow(type, chalk.blue(item), size, stat.ctime);
        } catch (err) {
            console.log(`${err}`);
        }
    });

} catch (err) {
    console.log(err);
}

dirTable.sort();

console.log(dirTable.setStyle('ascii-clean').toString());
