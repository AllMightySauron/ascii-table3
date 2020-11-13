/*jshint esversion: 6 */

const assert = require('assert');
const AsciiTable3 = require('../ascii-table3');

// static methods
describe('String methods', () => {
    // left
    it('Left alignment (no pad char)', () => {
        assert.strictEqual(AsciiTable3.AsciiTable3.alignLeft('ab', 4), 'ab  ');
    });
    it('Left alignment (with pad char)', () => {
        assert.strictEqual(AsciiTable3.AsciiTable3.alignLeft('ab', 5, '*'), 'ab***');
    });

    // right
    it('Right Alignment (no pad char)', () => {
        assert.strictEqual(AsciiTable3.AsciiTable3.alignRight('ab', 4), '  ab');
    });
    it('Right Alignment (with pad char)', () => {
        assert.strictEqual(AsciiTable3.AsciiTable3.alignRight('ab', 5, '*'), '***ab');
    });

    // center
    it('Center Alignment (no pad char)', () => {
        assert.strictEqual(AsciiTable3.AsciiTable3.alignCenter('ab', 4), ' ab ');
    });
    it('Center Alignment (with pad char)', () => {
        assert.strictEqual(AsciiTable3.AsciiTable3.alignCenter('ab', 5, '*'), '*ab**');
    });

    // auto
    it('Auto Alignment (string)', () => {
        assert.strictEqual(AsciiTable3.AsciiTable3.alignAuto('ab', 4), 'ab  ');
    });
    it('Auto Alignment (number)', () => {
        assert.strictEqual(AsciiTable3.AsciiTable3.alignAuto(32, 4), '  32');
    });

    it('Truncate string (normal)', () => {
        assert.strictEqual(AsciiTable3.AsciiTable3.truncateString('Dummy 1', 5), 'Du...');
    });
    it('Truncate string (small)', () => {
        assert.strictEqual(AsciiTable3.AsciiTable3.truncateString('Dummy 1', 2), '..');
    });
});


describe('Array methods', () => {
    it('Array fill (string)', () => {
        assert.notStrictEqual(AsciiTable3.AsciiTable3.arrayFill(4, 'a'), [ 'a', 'a', 'a', 'a' ]);
    });
    it('Array fill (number)', () => {
        assert.notStrictEqual(AsciiTable3.AsciiTable3.arrayFill(3, 0), [ 0, 0, 0 ]);
    });
    it('Array fill (no initial value)', () => {
        assert.notStrictEqual(AsciiTable3.AsciiTable3.arrayFill(3), [ undefined , undefined , undefined ]);
    });
    it('Array fill (empty)', () => {
        assert.notStrictEqual(AsciiTable3.AsciiTable3.arrayFill(0), [ ]);
    });

    it ('Array resize (with value)', () => {
        const array = [ 1, 2 ];

        AsciiTable3.AsciiTable3.arrayResize(array, 3, 3);
        assert.notStrictEqual(array, [ 1, 2, 3 ]);
    });
    it ('Array resize (no value)', () => {
        const array = [ 1, 2 ];

        AsciiTable3.AsciiTable3.arrayResize(array, 3);
        assert.notStrictEqual(array, [ 1, 2, ]);
    });
});

const asciiTable = new AsciiTable3.AsciiTable3();

// instance methods
describe('Title', () => {

    it('setTitle/getTitle', () => {
        asciiTable.setTitle('Dummy title');
        assert.strictEqual(asciiTable.getTitle(), 'Dummy title');
    });

    it('setTitleAlign/getTitleAlign', () => {
        // default is center
        assert.strictEqual(asciiTable.getTitleAlign(), AsciiTable3.CENTER);

        asciiTable.setTitleAlignLeft();
        assert.strictEqual(asciiTable.getTitleAlign(), AsciiTable3.LEFT);

        asciiTable.setTitleAlignRight();
        assert.strictEqual(asciiTable.getTitleAlign(), AsciiTable3.RIGHT);

        asciiTable.setTitleAlignCenter();
        assert.strictEqual(asciiTable.getTitleAlign(), AsciiTable3.CENTER);
    });
});

describe('Heading', () => {
    it ('setHeading/getHeading', () => {
        asciiTable.setHeading('Title', 'Count', 'Rate (%)');
        assert.notStrictEqual(asciiTable.getHeading(), [ 'Title', 'Count', 'Rate (%)' ]);
    });

    it('setHeadingAlign/getHeadingAlign', () => {
        // default is center
        assert.strictEqual(asciiTable.getHeadingAlign(), AsciiTable3.CENTER);

        asciiTable.setHeadingAlignLeft();
        assert.strictEqual(asciiTable.getHeadingAlign(), AsciiTable3.LEFT);

        asciiTable.setHeadingAlignRight();
        assert.strictEqual(asciiTable.getHeadingAlign(), AsciiTable3.RIGHT);

        asciiTable.setHeadingAlignCenter();
        assert.strictEqual(asciiTable.getHeadingAlign(), AsciiTable3.CENTER);
    });
});
 
describe('DataRows', () => {
    it ('addRow/getRows', () => {
        asciiTable.addRow('Dummy 1', 10, 2.3);
        
        const rows = asciiTable.getRows();
        assert.strict(rows.length, 1);
        assert.notStrictEqual(rows[0], [ 'Dummy 1', 10, 2.3 ]);
    });

    it ('addRowMatrix/getRows', () => {
        asciiTable.addRowMatrix([ ['Dummy 2', 5, 3.1],  ['Dummy 3', 100, 3.14] ]);

        const rows = asciiTable.getRows();

        assert.strictEqual(rows.length, 3);
        assert.notStrictEqual(rows[0], [ 'Dummy 1', 10, 2.3 ]);
        assert.notStrictEqual(rows[1], [ 'Dummy 2', 5, 3.1 ]);
        assert.notStrictEqual(rows[2], [ 'Dummy 3', 100, 3.14 ]);
    });
});

describe('Sorting', () => {
   it ('sort', () => {
        const aTable = 
            new AsciiTable3.AsciiTable3('one column data table')
            .addRowMatrix([ [1], [9], [5] ]);

        aTable.sort();

        assert.notStrictEqual(aTable, [[ [1], [5], [9] ]]);
    });

    it ('sortColumn', () => {
        const aTable = 
            new AsciiTable3.AsciiTable3('two column data table')
            .addRowMatrix([ ['a', 1], ['b', 9], ['c', 5] ]);

        // sort on 2nd column
        aTable.sortColumn(2, function(a, b) { return a - b; });

        assert.notStrictEqual(aTable, [ ['a', 1], ['c', 5], ['b', 9] ]);
    });
});

describe('Styling', () => {
    it ('setStyle/getStyle', () => {
        const style = asciiTable.getStyle();

        // ramac should be the default
        assert.strictEqual(style.name, "ramac");
        
        asciiTable.setStyle("none");
        assert.strictEqual(asciiTable.getStyle().name, "none");
    });

    it ('removeBorder', () => {
        asciiTable.removeBorder();
        assert.strictEqual(asciiTable.getStyle().name, "none");
    });

    it ('setWidth/getWidth', () => {
        asciiTable.setWidth(1, 5);

        assert.strictEqual(asciiTable.getWidth(1), 5);
        assert.strictEqual(asciiTable.getWidth(2), undefined);
        assert.strictEqual(asciiTable.getWidth(3), undefined);
    });

    it ('setWidths/getWidths', () => {
        asciiTable.setWidths([5, undefined, undefined]);
        assert.notStrictEqual(asciiTable.getWidths(), [5, undefined, undefined]);
    });

    it('setAlign/getAlign', () => {
        asciiTable
            .setAlign(1, AsciiTable3.CENTER)
            .setAlign(2, AsciiTable3.RIGHT);

        // default alignment should be auto
        assert.strictEqual(asciiTable.getAlign(1), AsciiTable3.CENTER);
        assert.strictEqual(asciiTable.getAlign(2), AsciiTable3.RIGHT);
        assert.strictEqual(asciiTable.getAlign(3), AsciiTable3.AUTO);
    });
});

describe('Rendering', () => {
    it ('toString (full)', () => {
        asciiTable.setCellMargin(0);

        asciiTable.setStyle("ramac");
        assert.strictEqual(
            asciiTable.toString(),
            '+--------------------+\n' +
            '|    Dummy title     |\n' +
            '+-----+-----+--------+\n' +
            '|Title|Count|Rate (%)|\n' +
            '+-----+-----+--------+\n' +
            '|Du...|   10|     2.3|\n' +
            '|Du...|    5|     3.1|\n' +
            '|Du...|  100|    3.14|\n' +
            '+-----+-----+--------+\n'
        );

        asciiTable.setStyle("none");
        assert.strictEqual(
            asciiTable.toString(),
            '    Dummy title     \n' +
            'Title Count Rate (%)\n' +
            'Du...    10      2.3\n' +
            'Du...     5      3.1\n' +
            'Du...   100     3.14\n'
        );

        asciiTable.setStyle("compact");
        assert.strictEqual(
            asciiTable.toString(),
            '--------------------\n' +
            '    Dummy title     \n' +
            '--------------------\n' +
            'Title Count Rate (%)\n' +
            '----- ----- --------\n' +
            'Du...    10      2.3\n' +
            'Du...     5      3.1\n' +
            'Du...   100     3.14\n'
        );

        asciiTable.setStyle("unicode-single");
        assert.strictEqual(
            asciiTable.toString(),
            '┌────────────────────┐\n' +
            '│    Dummy title     │\n' +
            '├─────┬─────┬────────┤\n' +
            '│Title│Count│Rate (%)│\n' +
            '├─────┼─────┼────────┤\n' +
            '│Du...│   10│     2.3│\n' +
            '│Du...│    5│     3.1│\n' +
            '│Du...│  100│    3.14│\n' +
            '└─────┴─────┴────────┘\n'
        );

        asciiTable.setStyle("unicode-double");
        assert.strictEqual(
            asciiTable.toString(),
            '╔════════════════════╗\n' +
            '║    Dummy title     ║\n' +
            '╠═════╦═════╦════════╣\n' +
            '║Title║Count║Rate (%)║\n' +
            '╠═════╬═════╬════════╣\n' +
            '║Du...║   10║     2.3║\n' +
            '║Du...║    5║     3.1║\n' +
            '║Du...║  100║    3.14║\n' +
            '╚═════╩═════╩════════╝\n'
        );
    });

    it ('toString (cell margins)', () => {
        asciiTable.setWidths();
        asciiTable.setStyle('ramac');

        asciiTable.setCellMargin(1);
        assert.strictEqual(asciiTable.toString(),
            '+----------------------------+\n' + 
            '|        Dummy title         |\n' + 
            '+---------+-------+----------+\n' + 
            '|  Title  | Count | Rate (%) |\n' + 
            '+---------+-------+----------+\n' + 
            '| Dummy 1 |    10 |      2.3 |\n' + 
            '| Dummy 2 |     5 |      3.1 |\n' + 
            '| Dummy 3 |   100 |     3.14 |\n' + 
            '+---------+-------+----------+\n'
        );

        asciiTable.setCellMargin(2);
        assert.strictEqual(asciiTable.toString(),
            '+----------------------------------+\n' + 
            '|           Dummy title            |\n' + 
            '+-----------+---------+------------+\n' + 
            '|   Title   |  Count  |  Rate (%)  |\n' + 
            '+-----------+---------+------------+\n' + 
            '|  Dummy 1  |     10  |       2.3  |\n' + 
            '|  Dummy 2  |      5  |       3.1  |\n' + 
            '|  Dummy 3  |    100  |      3.14  |\n' + 
            '+-----------+---------+------------+\n'
        );

        asciiTable.setWidth(1, 8);
        assert.strictEqual(asciiTable.toString(),
            '+-------------------------------+\n' + 
            '|          Dummy title          |\n' + 
            '+--------+---------+------------+\n' + 
            '|  T...  |  Count  |  Rate (%)  |\n' + 
            '+--------+---------+------------+\n' + 
            '|  D...  |     10  |       2.3  |\n' + 
            '|  D...  |      5  |       3.1  |\n' + 
            '|  D...  |    100  |      3.14  |\n' + 
            '+--------+---------+------------+\n'
        );
    });

    it ('toString (no heading)', () => {
        const aTable = new AsciiTable3.AsciiTable3('Dummy title')
            .setAlign(1, AsciiTable3.LEFT)
            .setAlign(2, AsciiTable3.RIGHT)
            .setWidths([10, 4, 6])
            .setCellMargin(0)
            .addRowMatrix([ ['Dummy 1', 10, 2.3], ['Dummy 2', 5, 3.1],  ['Dummy 3', 100, 3.14] ]);

        // ramac
        aTable.setStyle("ramac");
        assert.strictEqual(
            aTable.toString(),
            '+----------------------+\n' +
            '|     Dummy title      |\n' +
            '+----------+----+------+\n' +
            '|Dummy 1   |  10|   2.3|\n' +
            '|Dummy 2   |   5|   3.1|\n' +
            '|Dummy 3   | 100|  3.14|\n' +
            '+----------+----+------+\n'
        );

        aTable.setStyle("none");
        assert.strictEqual(
            aTable.toString(),
            '     Dummy title      \n' +
            'Dummy 1      10    2.3\n' +
            'Dummy 2       5    3.1\n' +
            'Dummy 3     100   3.14\n'
        );
    });
});

describe('Serialization', () => {
    const aTable = new AsciiTable3.AsciiTable3('Title')
        .setHeading('Name', 'Age', 'Gender')
        .setWidths([10, 3, 6])
        .addRowMatrix([
            ['Mary', 20, 'F'],
            ['John', 23, 'M'],
            ['Susan', 32, 'F']
        ]);

    const tableJSON = JSON.parse(aTable.toJSON());

    it ('toJSON', () => {
        assert.strictEqual(tableJSON.title, aTable.getTitle());
        assert.notStrictEqual(tableJSON.widths, aTable.getWidths());
        assert.notStrictEqual(tableJSON.heading, aTable.getHeading());
        assert.notStrictEqual(tableJSON.rows, aTable.getRows());
    });

    it ('fromJSON', () => {
        const newTable = new AsciiTable3.AsciiTable3().fromJSON(tableJSON);

        assert.strictEqual(newTable.toJSON(), aTable.toJSON());
    });
});

describe('Clearing data', () => {
    it ('clearRows', () => {
        assert.strictEqual(asciiTable.getRows().length, 3);

        asciiTable.clearRows();
        assert.strictEqual(asciiTable.getRows().length, 0);
    });

    it ('clear', () => {
        asciiTable.clear();

        assert.strictEqual(asciiTable.getTitle(), '');
        assert.notStrictEqual(asciiTable.getHeading(), []);
        assert.strictEqual(asciiTable.getRows().length, 0);
    });
});
