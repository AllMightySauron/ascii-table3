// load modules
const fs = require('fs');
const nodePath = require('path');
const chalk = require('chalk');
const { AsciiTable3 } = require('./src/ascii-table3');

// get path to list from command line
const inputPath = process.argv.length <= 2 ? '.' : process.argv[2];

// resolve against the current working directory and reject any path that escapes it
const baseDir = process.cwd();
const path = nodePath.resolve(baseDir, inputPath);
if (path !== baseDir && !path.startsWith(baseDir + nodePath.sep)) {
    console.error('Error: access outside the current working directory is not allowed.');
    process.exit(1);
}

// build table
const dirTable =
    new AsciiTable3(`Directory: ${path}`)
    .setHeading('Type', 'Name', 'Size (bytes)', 'Last change')
    .setAlignRight(3).setWidth(4, 30);

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
            switch (type) {
                case 'Directory':
                    dirTable.addRow(chalk.blue(type), chalk.blue(item), chalk.blue(size), chalk.blue(stat.ctime));
                    break;
                case 'Socket':
                    dirTable.addRow(chalk.red(type), chalk.red(item), chalk.red(size), chalk.red(stat.ctime));
                    break;
                default:
                    dirTable.addRow(type, item, size, stat.ctime);
            }
        } catch (err) {
            console.log(`${err}`);
        }
    });

} catch (err) {
    console.log(err);
}

dirTable.sort();

console.log(dirTable.setStyle('ascii-clean').toString());
