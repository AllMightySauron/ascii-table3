/*jshint esversion: 6 */

const assert = require('assert');
const { AsciiTable3, AlignmentEnum } = require('../ascii-table3');

// static methods
describe('String methods', () => {
    // left
    it('Left alignment (no pad char)', () => {
        assert.strictEqual(AsciiTable3.alignLeft('ab', 4), 'ab  ');
    });
    it('Left alignment (with pad char)', () => {
        assert.strictEqual(AsciiTable3.alignLeft('ab', 5, '*'), 'ab***');
    });

    // right
    it('Right Alignment (no pad char)', () => {
        assert.strictEqual(AsciiTable3.alignRight('ab', 4), '  ab');
    });
    it('Right Alignment (with pad char)', () => {
        assert.strictEqual(AsciiTable3.alignRight('ab', 5, '*'), '***ab');
    });

    // center
    it('Center Alignment (no pad char)', () => {
        assert.strictEqual(AsciiTable3.alignCenter('ab', 4), ' ab ');
    });
    it('Center Alignment (with pad char)', () => {
        assert.strictEqual(AsciiTable3.alignCenter('ab', 5, '*'), '*ab**');
    });

    // auto
    it('Auto Alignment (string)', () => {
        assert.strictEqual(AsciiTable3.alignAuto('ab', 4), 'ab  ');
    });
    it('Auto Alignment (number)', () => {
        assert.strictEqual(AsciiTable3.alignAuto(32, 4), '  32');
    });

    it('Auto Alignment (object)', () => {
        assert.strictEqual(AsciiTable3.alignAuto([ 'a', 'b' ], 5), 'a,b  ');
    });

    it('Truncate string (normal)', () => {
        assert.strictEqual(AsciiTable3.truncateString('Dummy 1', 5), 'Du...');
    });
    it('Truncate string (small)', () => {
        assert.strictEqual(AsciiTable3.truncateString('Dummy 1', 2), '..');
    });

    // word wrapping
    it('Word wrapping', () => {
        assert.strictEqual(AsciiTable3.wordWrap('dummy', 5), 'dummy');
        assert.strictEqual(AsciiTable3.wordWrap('this is a test', 5), 'this\nis a\ntest');
        assert.strictEqual(AsciiTable3.wordWrap('this is a test', 3), 'thi\ns\nis\na\ntes\nt');
        assert.strictEqual(AsciiTable3.wordWrap('rate (%)', 4), 'rate\n(%)');
    });
});


describe('Array methods', () => {
    it('Array fill (string)', () => {
        assert.deepStrictEqual(AsciiTable3.arrayFill(4, 'a'), [ 'a', 'a', 'a', 'a' ]);
    });
    it('Array fill (number)', () => {
        assert.deepStrictEqual(AsciiTable3.arrayFill(3, 0), [ 0, 0, 0 ]);
    });
    it('Array fill (no initial value)', () => {
        assert.deepStrictEqual(AsciiTable3.arrayFill(3), [ undefined , undefined , undefined ]);
    });
    it('Array fill (empty)', () => {
        assert.deepStrictEqual(AsciiTable3.arrayFill(0), [ ]);
    });

    it ('Array resize (with value)', () => {
        const array = [ 1, 2 ];

        AsciiTable3.arrayResize(array, 3, 3);
        assert.deepStrictEqual(array, [ 1, 2, 3 ]);
    });
    it ('Array resize (no value)', () => {
        const array = [ 1, 2 ];

        AsciiTable3.arrayResize(array, 3);
        assert.deepStrictEqual(array, [ 1, 2, undefined ]);
    });
});

// instance methods
describe('Title', () => {

    it('setTitle/getTitle', () => {
        const aTable = new AsciiTable3();

        // empty title is the default
        assert.strictEqual(aTable.getTitle(), '');

        aTable.setTitle('Dummy title');
        assert.strictEqual(aTable.getTitle(), 'Dummy title');
    });

    it('setTitleAlign/getTitleAlign', () => {
        const aTable = new AsciiTable3('Dummy title');

        // default is center
        assert.strictEqual(aTable.getTitleAlign(), AlignmentEnum.CENTER);

        aTable.setTitleAlignLeft();
        assert.strictEqual(aTable.getTitleAlign(), AlignmentEnum.LEFT);

        aTable.setTitleAlignRight();
        assert.strictEqual(aTable.getTitleAlign(), AlignmentEnum.RIGHT);

        aTable.setTitleAlignCenter();
        assert.strictEqual(aTable.getTitleAlign(), AlignmentEnum.CENTER);
    });
});

describe('Heading', () => {
    it ('setHeading/getHeading', () => {
        const aTable = new AsciiTable3('Dummy title');

        aTable.setHeading();
        assert.deepStrictEqual(aTable.getHeading(), []);

        aTable.setHeading('Title', 'Count', 'Rate (%)');  
        assert.deepStrictEqual(aTable.getHeading(), [ 'Title', 'Count', 'Rate (%)' ]);
    });

    it('setHeadingAlign/getHeadingAlign', () => {
        const aTable = new AsciiTable3('Dummy title')
            .setHeading('Title', 'Count', 'Rate (%)');

        // default is center
        assert.strictEqual(aTable.getHeadingAlign(), AlignmentEnum.CENTER);

        aTable.setHeadingAlignLeft();
        assert.strictEqual(aTable.getHeadingAlign(), AlignmentEnum.LEFT);

        aTable.setHeadingAlignRight();
        assert.strictEqual(aTable.getHeadingAlign(), AlignmentEnum.RIGHT);

        aTable.setHeadingAlignCenter();
        assert.strictEqual(aTable.getHeadingAlign(), AlignmentEnum.CENTER);
    });
});
 
describe('Data rows', () => {
    it ('addRow/getRows', () => {
        const aTable = new AsciiTable3('Dummy title')
            .setHeading('Title', 'Count', 'Rate (%)')
            .addRow('Dummy 1', 10, 2.3);
        
        const rows = aTable.getRows();
        assert.strict(rows.length, 1);
        assert.deepStrictEqual(rows[0], [ 'Dummy 1', 10, 2.3 ]);
    });

    it ('addRowMatrix/getRows', () => {
        const aTable = new AsciiTable3('Dummy title')
            .setHeading('Title', 'Count', 'Rate (%)')
            .addRow('Dummy 1', 10, 2.3)
            .addRowMatrix([ ['Dummy 2', 5, 3.1],  ['Dummy 3', 100, 3.14] ]);

        const rows = aTable.getRows();

        assert.strictEqual(rows.length, 3);
        assert.deepStrictEqual(rows[0], [ 'Dummy 1', 10, 2.3 ]);
        assert.deepStrictEqual(rows[1], [ 'Dummy 2', 5, 3.1 ]);
        assert.deepStrictEqual(rows[2], [ 'Dummy 3', 100, 3.14 ]);
    });

    it ("addNonZeroRow", () =>  {
        const aTable = new AsciiTable3('Dummy title')
            .setHeading('Title', 'Count', 'Rate (%)')
            .addRow('Dummy 1', 10, 2.3)
            .addRowMatrix([ ['Dummy 2', 5, 3.1],  ['Dummy 3', 100, 3.14] ])
            .addNonZeroRow('Dummy 4', 0, 0, 0);

        assert.strictEqual(aTable.getRows().length, 3);

        aTable.addNonZeroRow('Dummy 4', 0, 1, 0);

        assert.strictEqual(aTable.getRows().length, 4);
    });
});

describe('Cell values', () => {
    it ('getCell', () => {
        const aTable = new AsciiTable3('People')
            .setHeading('Name', 'Age', 'Eye color')
            .addRowMatrix([ 
                ['John', 18, 'green'], 
                ['Peter', 5, 'brown'],  
                ['Mary', 40, 'blue'],
                ['Timothy', 16, 'hazel'],
             ]);

        assert.strictEqual(aTable.getCell(1, 1), 'John');
        assert.strictEqual(aTable.getCell(3, 2), 40);
    });

    it ('setCell', () => {
        const aTable = new AsciiTable3('People')
            .setHeading('Name', 'Age', 'Eye color')
            .addRowMatrix([ 
                ['John', 18, 'green'], 
                ['Peter', 5, 'brown'],  
                ['Mary', 40, 'blue'],
                ['Timothy', 16, 'hazel'],
             ]);

        assert.strictEqual(aTable.getCell(3, 2), 40);
        aTable.setCell(3, 2, 55);
        assert.strictEqual(aTable.getCell(3, 2), 55);
    });
});

describe('Sorting', () => {
   it ('sort', () => {
        const aTable = 
            new AsciiTable3('one column data table')
            .addRowMatrix([ [1], [9], [5] ]);

        aTable.sort();

        assert.deepStrictEqual(aTable.getRows(), [ [1], [5], [9] ]);
    });

    it ('sortColumn', () => {
        const aTable = 
            new AsciiTable3('two column data table')
            .addRowMatrix([ ['xavier', 5], ['adam', 1], ['peter', 9], [ 'anna', 15] ]);

        // sort on 1st column
        aTable.sortColumn(1);
        assert.deepStrictEqual(aTable.getRows(), [ ['adam', 1], ['anna', 15], ['peter', 9], ['xavier', 5] ]);

        // sort on 1st column with function
        aTable.sortColumn(1, function(a, b) { return a > b ? 1 : -1; });
        assert.deepStrictEqual(aTable.getRows(), [ ['adam', 1], ['anna', 15], ['peter', 9], ['xavier', 5] ]);

        // sort descending on 1st column
        aTable.sortColumnDesc(1);
        assert.deepStrictEqual(aTable.getRows(), [ ['xavier', 5], ['peter', 9], ['anna', 15], ['adam', 1] ]);

        // sort on 2nd column
        aTable.sortColumn(2);
        assert.deepStrictEqual(aTable.getRows(), [ ['adam', 1], ['xavier', 5], ['peter', 9], ['anna', 15] ]);

        // sort descending on 2nd column 
        aTable.sortColumnDesc(2);
        assert.deepStrictEqual(aTable.getRows(), [ ['anna', 15], ['peter', 9], ['xavier', 5], ['adam', 1] ]);  
    });
});

describe('Styling', () => {
    it ('setStyle/getStyle', () => {
        const aTable = new AsciiTable3();
        
        const style = aTable.getStyle();

        // ramac should be the default
        assert.strictEqual(style.name, "ramac");
        
        aTable.setStyle("none");
        assert.strictEqual(aTable.getStyle().name, "none");
    });

    it('getStyles', () => {
        const aTable = new AsciiTable3();

        const styles = aTable.getStyles();

        // must be an array
        assert.strictEqual(Array.isArray(styles), true);

        // must include styles
        const names = [ "none", "ramac", "ascii-table", "reddit-markdown" ];
        names.forEach(name => {
            assert.strictEqual(styles.find(style => style.name == name).name, name);
        });
        
    });

    it ('removeBorder', () => {
        const aTable = new AsciiTable3();

        aTable.removeBorder();
        assert.strictEqual(aTable.getStyle().name, "none");
    });

    it ('setWidth/getWidth', () => {
        const aTable = new AsciiTable3()
            .setHeading('Title', 'Count', 'Rate (%)')
            .addRow('Dummy 1', 10, 2.3);

        aTable.setWidth(1, 5);

        assert.strictEqual(aTable.getWidth(1), 5);
        assert.strictEqual(aTable.getWidth(2), undefined);
        assert.strictEqual(aTable.getWidth(3), undefined);
    });

    it ('setWidths/getWidths', () => {
        const aTable = new AsciiTable3()
            .setHeading('Title', 'Count', 'Rate (%)')
            .addRow('Dummy 1', 10, 2.3);

        aTable.setWidths();
        assert.deepStrictEqual(aTable.getWidths(), []);

        aTable.setWidths([5, undefined, undefined]);
        assert.deepStrictEqual(aTable.getWidths(), [5, undefined, undefined]);
    });

    it('setAlign(s)/getAlign(s)', () => {
        const dummyTable = new AsciiTable3();

        // empty table, no rows
        assert.deepStrictEqual(dummyTable.getAligns(), []);

        const aTable = new AsciiTable3()
            .setHeading('Title', 'Count', 'Rate (%)')
            .addRow('Dummy 1', 10, 2.3);

        // nothing defined, should be auto
        assert.deepStrictEqual(aTable.getAligns(), [ AlignmentEnum.AUTO, AlignmentEnum.AUTO, AlignmentEnum.AUTO ]);

        // set alignments
        aTable.setAlignLeft(1).setAlignRight(2).setAlignCenter(3);

        // check values
        assert.strictEqual(aTable.getAlign(1), AlignmentEnum.LEFT);
        assert.strictEqual(aTable.getAlign(2), AlignmentEnum.RIGHT);
        assert.strictEqual(aTable.getAlign(3), AlignmentEnum.CENTER);

        aTable.setAlignCenter(1);
        assert.strictEqual(aTable.getAlign(1), AlignmentEnum.CENTER);

        assert.deepStrictEqual(aTable.getAligns(), [ AlignmentEnum.CENTER, AlignmentEnum.RIGHT, AlignmentEnum.CENTER ]);
    });

    it('setWrapped/isWrapped', () => {
        const aTable = new AsciiTable3()
            .setHeading('Title', 'Count', 'Rate (%)')
            .addRow('Dummy 1', 10, 2.3);

        // default is false
        assert.strictEqual(aTable.isWrapped(1), false);

        aTable.setWrapped(2);
        assert.strictEqual(aTable.isWrapped(2), true);

        aTable.setWrapped(2, false);
        assert.strictEqual(aTable.isWrapped(2), false);
    });

    it('setWrappings/getWrappings', () => {
        const aTable = new AsciiTable3()
            .setHeading('Title', 'Count', 'Rate (%)')
            .addRow('Dummy 1', 10, 2.3);

        // default is false
        assert.deepStrictEqual(aTable.getWrappings(), [false, false, false]);

        aTable.setWrapped(1);
        assert.deepStrictEqual(aTable.getWrappings(), [true, false, false]);

        aTable.setWrappings([false, true, true]);
        assert.deepStrictEqual(aTable.getWrappings(), [false, true, true]);
    });

    it('setJustify/isJustify', () => {
        const aTable = new AsciiTable3()
            .setHeading('Title', 'Count', 'Rate (%)')
            .addRow('Dummy 1', 10, 2.3);

        assert.strictEqual(aTable.isJustify(), false);

        aTable.setJustify();

        assert.strictEqual(aTable.isJustify(), true);
    });

    it('addStyle', () => {
        const aTable = new AsciiTable3();

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
          
        aTable.addStyle(roundedStyle);
        assert.notStrictEqual(aTable.getStyle("roundStyle"), roundedStyle);
    });
});

describe('Rendering', () => {
    it ('toString (ramac)', () => {
        const aTable = new AsciiTable3('Dummy title')
            .setHeading('Title', 'Count', 'Rate (%)')
            .setAlign(1, AsciiTable3.LEFT)
            .addRowMatrix([ 
                ['Dummy 1', 10, 2.3], 
                ['Dummy 2', 5, 3.1],  
                ['Dummy 3', 100, 3.14],
                ['Dummy 4', 0, 1],
             ])
             .setCellMargin(0);

        aTable.setStyle("ramac");
        assert.strictEqual(
            aTable.toString(),
            '+----------------------+\n' +
            '|     Dummy title      |\n' +
            '+-------+-----+--------+\n' +
            '| Title |Count|Rate (%)|\n' +
            '+-------+-----+--------+\n' +
            '|Dummy 1|   10|     2.3|\n' +
            '|Dummy 2|    5|     3.1|\n' +
            '|Dummy 3|  100|    3.14|\n' +
            '|Dummy 4|    0|       1|\n' +
            '+-------+-----+--------+\n'
        );

        aTable.setStyle("none");
        assert.strictEqual(
            aTable.toString(),
            '     Dummy title      \n' +
            ' Title  Count Rate (%)\n' +
            'Dummy 1    10      2.3\n' +
            'Dummy 2     5      3.1\n' +
            'Dummy 3   100     3.14\n' +
            'Dummy 4     0        1\n'
        );

        aTable.setStyle("compact");
        assert.strictEqual(
            aTable.toString(),
            '----------------------\n' +
            '     Dummy title      \n' +
            '----------------------\n' +
            ' Title  Count Rate (%)\n' +
            '------- ----- --------\n' +
            'Dummy 1    10      2.3\n' +
            'Dummy 2     5      3.1\n' +
            'Dummy 3   100     3.14\n' +
            'Dummy 4     0        1\n'
        );

        aTable.setStyle("unicode-single");
        assert.strictEqual(
            aTable.toString(),
            '┌──────────────────────┐\n' +
            '│     Dummy title      │\n' +
            '├───────┬─────┬────────┤\n' +
            '│ Title │Count│Rate (%)│\n' +
            '├───────┼─────┼────────┤\n' +
            '│Dummy 1│   10│     2.3│\n' +
            '│Dummy 2│    5│     3.1│\n' +
            '│Dummy 3│  100│    3.14│\n' +
            '│Dummy 4│    0│       1│\n' +
            '└───────┴─────┴────────┘\n'
        );

        aTable.setStyle("unicode-double");
        assert.strictEqual(
            aTable.toString(),
            '╔══════════════════════╗\n' +
            '║     Dummy title      ║\n' +
            '╠═══════╦═════╦════════╣\n' +
            '║ Title ║Count║Rate (%)║\n' +
            '╠═══════╬═════╬════════╣\n' +
            '║Dummy 1║   10║     2.3║\n' +
            '║Dummy 2║    5║     3.1║\n' +
            '║Dummy 3║  100║    3.14║\n' +
            '║Dummy 4║    0║       1║\n' +
            '╚═══════╩═════╩════════╝\n'
        );
    });

    it ('toString (custom style)', () => {
        const aTable = new AsciiTable3('Dummy title')
            .setHeading('Title', 'Count', 'Rate (%)')
            .setAlign(1, AsciiTable3.LEFT)
            .addRowMatrix([ 
                ['Dummy 1', 10, 2.3], 
                ['Dummy 2', 5, 3.1],  
                ['Dummy 3', 100, 3.14],
                ['Dummy 4', 0, 1],
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
        
        aTable.addStyle(roundedStyle);

        aTable.setStyle("rounded");
        assert.strictEqual(
            aTable.toString(),
            '.----------------------------.\n' +
            '|        Dummy title         |\n' +
            ':---------.-------.----------:\n' +
            '|  Title  | Count | Rate (%) |\n' +
            ':---------+-------+----------:\n' +
            '| Dummy 1 |    10 |      2.3 |\n' +
            '| Dummy 2 |     5 |      3.1 |\n' +
            '| Dummy 3 |   100 |     3.14 |\n' +
            '| Dummy 4 |     0 |        1 |\n' +
            "'---------'-------'----------'\n"
        );
    });

    it ('toString (cell margins)', () => {
        const aTable = new AsciiTable3('Dummy title')
            .setHeading('Title', 'Count', 'Rate (%)')
            .setAlign(1, AsciiTable3.LEFT)
            .addRowMatrix([ 
                ['Dummy 1', 10, 2.3], 
                ['Dummy 2', 5, 3.1],  
                ['Dummy 3', 100, 3.14],
                ['Dummy 4', 0, 1],
             ]);

        // default margin is 1
        assert.strictEqual(aTable.toString(),
            '+----------------------------+\n' + 
            '|        Dummy title         |\n' + 
            '+---------+-------+----------+\n' + 
            '|  Title  | Count | Rate (%) |\n' + 
            '+---------+-------+----------+\n' + 
            '| Dummy 1 |    10 |      2.3 |\n' + 
            '| Dummy 2 |     5 |      3.1 |\n' + 
            '| Dummy 3 |   100 |     3.14 |\n' + 
            '| Dummy 4 |     0 |        1 |\n' +
            '+---------+-------+----------+\n'
        );

        // new cell margin
        aTable.setCellMargin(2);
        assert.strictEqual(aTable.toString(),
            '+----------------------------------+\n' + 
            '|           Dummy title            |\n' + 
            '+-----------+---------+------------+\n' + 
            '|   Title   |  Count  |  Rate (%)  |\n' + 
            '+-----------+---------+------------+\n' + 
            '|  Dummy 1  |     10  |       2.3  |\n' + 
            '|  Dummy 2  |      5  |       3.1  |\n' + 
            '|  Dummy 3  |    100  |      3.14  |\n' + 
            '|  Dummy 4  |      0  |         1  |\n' + 
            '+-----------+---------+------------+\n'
        );

        // cell margin with truncation
        aTable.setWidth(1, 8);
        assert.strictEqual(aTable.toString(),
            '+-------------------------------+\n' + 
            '|          Dummy title          |\n' + 
            '+--------+---------+------------+\n' + 
            '|  T...  |  Count  |  Rate (%)  |\n' + 
            '+--------+---------+------------+\n' + 
            '|  D...  |     10  |       2.3  |\n' + 
            '|  D...  |      5  |       3.1  |\n' + 
            '|  D...  |    100  |      3.14  |\n' + 
            '|  D...  |      0  |         1  |\n' + 
            '+--------+---------+------------+\n'
        );
    });

    it ('toString (wrapping)', () => {
        const aTable = new AsciiTable3('Dummy title')
            .setHeading('Title', 'Count', 'Rate (%)')
            .setAlignLeft(1)
            .addRowMatrix([ 
                ['Dummy 1', 10, 2.3], 
                ['Dummy 2', 5, 3.1],  
                ['Dummy 3', 100, 3.14],
                ['Dummy 4', 0, 1],
             ]);

        aTable.setWidth(1, 7).setWrapped(1);

        assert.strictEqual(aTable.toString(),
            '+--------------------------+\n' + 
            '|       Dummy title        |\n' + 
            '+-------+-------+----------+\n' + 
            '| Title | Count | Rate (%) |\n' + 
            '+-------+-------+----------+\n' + 
            '| Dummy |    10 |      2.3 |\n' + 
            '| 1     |       |          |\n' + 
            '| Dummy |     5 |      3.1 |\n' + 
            '| 2     |       |          |\n' + 
            '| Dummy |   100 |     3.14 |\n' + 
            '| 3     |       |          |\n' + 
            '| Dummy |     0 |        1 |\n' +
            '| 4     |       |          |\n' + 
            '+-------+-------+----------+\n'
        );

        aTable.setWidth(3, 6).setWrapped(3);
        assert.strictEqual(aTable.toString(),
            '+----------------------+\n' + 
            '|     Dummy title      |\n' + 
            '+-------+-------+------+\n' + 
            '| Title | Count | Rate |\n' + 
            '|       |       | (%)  |\n' + 
            '+-------+-------+------+\n' + 
            '| Dummy |    10 |  2.3 |\n' + 
            '| 1     |       |      |\n' + 
            '| Dummy |     5 |  3.1 |\n' + 
            '| 2     |       |      |\n' + 
            '| Dummy |   100 | 3.14 |\n' + 
            '| 3     |       |      |\n' + 
            '| Dummy |     0 |    1 |\n' +
            '| 4     |       |      |\n' + 
            '+-------+-------+------+\n'
        );

        aTable.setAlignCenter(1);
        assert.strictEqual(aTable.toString(),
            '+----------------------+\n' + 
            '|     Dummy title      |\n' + 
            '+-------+-------+------+\n' + 
            '| Title | Count | Rate |\n' + 
            '|       |       | (%)  |\n' + 
            '+-------+-------+------+\n' + 
            '| Dummy |    10 |  2.3 |\n' + 
            '|   1   |       |      |\n' + 
            '| Dummy |     5 |  3.1 |\n' + 
            '|   2   |       |      |\n' + 
            '| Dummy |   100 | 3.14 |\n' + 
            '|   3   |       |      |\n' + 
            '| Dummy |     0 |    1 |\n' +
            '|   4   |       |      |\n' + 
            '+-------+-------+------+\n'
        );
    });
    
    it ('toString (justified)', () => {
        const aTable = new AsciiTable3('Dummy title')
            .setHeading('Title', 'Count', 'Rate (%)')
            .addRowMatrix([ 
                ['Dummy 1', 10, 2.3], 
                ['Dummy 2', 5, 3.1],  
                ['Dummy 3', 100, 3.14],
                ['Dummy 4', 0, 1],
             ]);

        aTable.setJustify();

        assert.strictEqual(aTable.toString(),
            '+--------------------------------+\n' + 
            '|          Dummy title           |\n' + 
            '+----------+----------+----------+\n' + 
            '|  Title   |  Count   | Rate (%) |\n' + 
            '+----------+----------+----------+\n' + 
            '| Dummy 1  |       10 |      2.3 |\n' + 
            '| Dummy 2  |        5 |      3.1 |\n' + 
            '| Dummy 3  |      100 |     3.14 |\n' + 
            '| Dummy 4  |        0 |        1 |\n' +
            '+----------+----------+----------+\n'
        );

        aTable.setWidth(3, 6).setWrapped(3);

        assert.strictEqual(aTable.toString(),
            '+-----------------------------+\n' + 
            '|         Dummy title         |\n' + 
            '+---------+---------+---------+\n' + 
            '|  Title  |  Count  |  Rate   |\n' + 
            '|         |         |   (%)   |\n' + 
            '+---------+---------+---------+\n' + 
            '| Dummy 1 |      10 |     2.3 |\n' + 
            '| Dummy 2 |       5 |     3.1 |\n' + 
            '| Dummy 3 |     100 |    3.14 |\n' + 
            '| Dummy 4 |       0 |       1 |\n' +
            '+---------+---------+---------+\n'
        );
    });

    it ('toString (no title)', () => {
        const aTable = new AsciiTable3()
            .setHeading('Name', 'Age', 'Size')
            .addRowMatrix([ 
                ['Dummy 1', 10, 2.3], 
                ['Dummy 2', 5, 3.1],  
                ['Dummy 3', 100, 3.14] ]);

        // ramac
        aTable.setStyle("ramac");
        assert.strictEqual(
            aTable.toString(),
            '+---------+-----+------+\n' +
            '|  Name   | Age | Size |\n' +
            '+---------+-----+------+\n' +
            '| Dummy 1 |  10 |  2.3 |\n' +
            '| Dummy 2 |   5 |  3.1 |\n' +
            '| Dummy 3 | 100 | 3.14 |\n' +
            '+---------+-----+------+\n'
        );
    });

    it ('toString (no heading)', () => {
        const aTable = new AsciiTable3('Dummy title')
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
    const aTable = new AsciiTable3('Title')
        .setHeading('Name', 'Age', 'Gender')
        .setWidths([10, 3, 6])
        .setWrapped(1)
        .addRowMatrix([
            ['Mary', 20, 'F'],
            ['John', 23, 'M'],
            ['Susan', 32, 'F']
        ]);

    const tableJSON = JSON.parse(aTable.toJSON());

    it ('toJSON', () => {
        assert.strictEqual(tableJSON.title, aTable.getTitle());
        assert.deepStrictEqual(tableJSON.heading, aTable.getHeading());
        assert.deepStrictEqual(tableJSON.rows, aTable.getRows());

        assert.strictEqual(tableJSON.formatting.titleAlign, aTable.getTitleAlign());
        assert.strictEqual(tableJSON.formatting.headingAlign, aTable.getHeadingAlign());

        assert.deepStrictEqual(tableJSON.formatting.columns.aligns, aTable.getAligns());
        assert.deepStrictEqual(tableJSON.formatting.columns.widths, aTable.getWidths());
        assert.deepStrictEqual(tableJSON.formatting.columns.wrappings, aTable.getWrappings());

        assert.strictEqual(tableJSON.formatting.justify, aTable.isJustify());
    });

    it ('fromJSON', () => {
        const newTable = new AsciiTable3().fromJSON(tableJSON);

        assert.strictEqual(newTable.toJSON(), aTable.toJSON());
    });
});

describe('Clearing data', () => {
    it ('clearRows', () => {
        const aTable = new AsciiTable3('Dummy title')
            .setHeading('Title', 'Count', 'Rate (%)')
            .setAlign(1, AsciiTable3.LEFT)
            .addRowMatrix([ 
                ['Dummy 1', 10, 2.3], 
                ['Dummy 2', 5, 3.1],  
                ['Dummy 3', 100, 3.14],
                ['Dummy 4', 0, 1],
             ]);

        assert.strictEqual(aTable.getRows().length, 4);

        aTable.clearRows();
        assert.strictEqual(aTable.getRows().length, 0);
    });

    it ('clear', () => {
        const aTable = new AsciiTable3('Dummy title')
            .setTitleAlign(AlignmentEnum.LEFT)
            .setHeading('Title', 'Count', 'Rate (%)')
            .setAlignLeft(1).setWidth(1, 10).setWrapped(2).setCellMargin(2).setJustify()
            .addRowMatrix([ 
                ['Dummy 1', 10, 2.3], 
                ['Dummy 2', 5, 3.1],  
                ['Dummy 3', 100, 3.14],
                ['Dummy 4', 0, 1],
             ]);

        aTable.clear();

        assert.strictEqual(aTable.getTitle(), '');
        assert.deepStrictEqual(aTable.getHeading(), []);
        assert.strictEqual(aTable.getRows().length, 0);

        // formatting defaults
        assert.strictEqual(aTable.getCellMargin(), 1);
        assert.strictEqual(aTable.getTitleAlign(), AlignmentEnum.CENTER);
        assert.strictEqual(aTable.getHeadingAlign(), AlignmentEnum.CENTER);
        assert.deepStrictEqual(aTable.getWidths(), []);
        assert.deepStrictEqual(aTable.getWrappings(), []);

        assert.strictEqual(aTable.isJustify(), false);
    });
});

describe('Transpose', () => {
    it ('empty', () => {
        const aTable = new AsciiTable3('People');

        const newTable = aTable.transpose();

        assert.strictEqual(newTable.toJSON(), aTable.toJSON());
    });

    it ('no heading', () => {
        const aTable = new AsciiTable3('People')
            .addRowMatrix([ 
                ['John', 18, 'green'], 
                ['Peter', 5, 'brown'],  
                ['Mary', 40, 'blue'],
                ['Timothy', 16, 'hazel'],
             ]);

        const newTable = aTable.transpose();

        // same title
        assert.strictEqual(newTable.getTitle(), aTable.getTitle());

        // number of rows / columns
        assert.strictEqual(newTable.getRows().length, aTable.getRows()[0].length);
        assert.strictEqual(newTable.getRows()[0].length, aTable.getRows().length);

        // test cell values
        for (var row  = 0; row < newTable.getRows().length; row++) {
            for (var col = 0; col < newTable.getRows()[0].length; col++) {
                assert.strictEqual(newTable.getCell(row + 1, col + 1), aTable.getCell(col + 1, row + 1));
            }
        }
    });

    it ('heading', () => {
        const aTable = new AsciiTable3('People')
            .setHeading('Name', 'Age', 'Eye color')
            .addRowMatrix([ 
                ['John', 18, 'green'], 
                ['Peter', 5, 'brown'],  
                ['Mary', 40, 'blue'],
                ['Timothy', 16, 'hazel'],
             ]);

        const newTable = aTable.transpose();

        // same title
        assert.strictEqual(newTable.getTitle(), aTable.getTitle());

        // number of rows / columns
        assert.strictEqual(newTable.getRows().length, aTable.getRows()[0].length);
        assert.strictEqual(newTable.getRows()[0].length, aTable.getRows().length + 1); // extra column on new table for heading

        // test original heading exists on first column of transposed matrix
        for (var row = 0; row < newTable.getRows().length; row++) {
            assert.strictEqual(newTable.getRows()[row][0], aTable.getHeading()[row]);
        }

         // test cell values
         for (row  = 0; row < newTable.getRows().length; row++) {
            for (var col = 1; col < newTable.getRows()[0].length; col++) {
                assert.strictEqual(newTable.getCell(row + 1, col + 1), aTable.getCell(col, row + 1));
            }
        }
    });

    it ('heading (no data)', () => {
        const aTable = new AsciiTable3('People')
            .setHeading('Name', 'Age', 'Eye color');

        const newTable = aTable.transpose();

        // same title
        assert.strictEqual(newTable.getTitle(), aTable.getTitle());

        // number of rows / columns
        assert.strictEqual(newTable.getRows().length, aTable.getHeading().length);
        assert.strictEqual(newTable.getRows()[0].length, 1); // 1 column for heading

        // test original heading exists on first column of transposed matrix
        for (var row = 0; row < newTable.getRows().length; row++) {
            assert.strictEqual(newTable.getRows()[row][0], aTable.getHeading()[row]);
        }
    });

});