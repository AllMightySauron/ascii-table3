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

    it('Auto Alignment (object)', () => {
        assert.strictEqual(AsciiTable3.AsciiTable3.alignAuto([ 'a', 'b' ], 5), 'a,b  ');
    });

    it('Truncate string (normal)', () => {
        assert.strictEqual(AsciiTable3.AsciiTable3.truncateString('Dummy 1', 5), 'Du...');
    });
    it('Truncate string (small)', () => {
        assert.strictEqual(AsciiTable3.AsciiTable3.truncateString('Dummy 1', 2), '..');
    });

    // word wrapping
    it('Test for white space', () => {
        assert.strictEqual(AsciiTable3.AsciiTable3.isWhiteSpace(' '), true);
        assert.strictEqual(AsciiTable3.AsciiTable3.isWhiteSpace('\t'), true);
        assert.strictEqual(AsciiTable3.AsciiTable3.isWhiteSpace('\n'), true);

        assert.strictEqual(AsciiTable3.AsciiTable3.isWhiteSpace('a'), false);
    });
    it('Word wrapping', () => {
        assert.strictEqual(AsciiTable3.AsciiTable3.wordWrap('dummy', 5), 'dummy');
        assert.strictEqual(AsciiTable3.AsciiTable3.wordWrap('this is a test', 5), 'this\nis a\ntest');
        assert.strictEqual(AsciiTable3.AsciiTable3.wordWrap('this is a test', 3), 'thi\ns\nis\na\ntes\nt');
        assert.strictEqual(AsciiTable3.AsciiTable3.wordWrap('rate (%)', 4), 'rate\n(%)');
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

// instance methods
describe('Title', () => {

    it('setTitle/getTitle', () => {
        const aTable = new AsciiTable3.AsciiTable3();

        // empty title is the default
        assert.strictEqual(aTable.getTitle(), '');

        aTable.setTitle('Dummy title');
        assert.strictEqual(aTable.getTitle(), 'Dummy title');
    });

    it('setTitleAlign/getTitleAlign', () => {
        const aTable = new AsciiTable3.AsciiTable3('Dummy title');

        // default is center
        assert.strictEqual(aTable.getTitleAlign(), AsciiTable3.CENTER);

        aTable.setTitleAlignLeft();
        assert.strictEqual(aTable.getTitleAlign(), AsciiTable3.LEFT);

        aTable.setTitleAlignRight();
        assert.strictEqual(aTable.getTitleAlign(), AsciiTable3.RIGHT);

        aTable.setTitleAlignCenter();
        assert.strictEqual(aTable.getTitleAlign(), AsciiTable3.CENTER);
    });
});

describe('Heading', () => {
    it ('setHeading/getHeading', () => {
        const aTable = new AsciiTable3.AsciiTable3('Dummy title');

        aTable.setHeading();
        assert.notStrictEqual(aTable.getHeading(), []);

        aTable.setHeading('Title', 'Count', 'Rate (%)');  
        assert.notStrictEqual(aTable.getHeading(), [ 'Title', 'Count', 'Rate (%)' ]);
    });

    it('setHeadingAlign/getHeadingAlign', () => {
        const aTable = new AsciiTable3.AsciiTable3('Dummy title')
            .setHeading('Title', 'Count', 'Rate (%)');

        // default is center
        assert.strictEqual(aTable.getHeadingAlign(), AsciiTable3.CENTER);

        aTable.setHeadingAlignLeft();
        assert.strictEqual(aTable.getHeadingAlign(), AsciiTable3.LEFT);

        aTable.setHeadingAlignRight();
        assert.strictEqual(aTable.getHeadingAlign(), AsciiTable3.RIGHT);

        aTable.setHeadingAlignCenter();
        assert.strictEqual(aTable.getHeadingAlign(), AsciiTable3.CENTER);
    });
});
 
describe('DataRows', () => {
    it ('addRow/getRows', () => {
        const aTable = new AsciiTable3.AsciiTable3('Dummy title')
            .setHeading('Title', 'Count', 'Rate (%)')
            .addRow('Dummy 1', 10, 2.3);
        
        const rows = aTable.getRows();
        assert.strict(rows.length, 1);
        assert.notStrictEqual(rows[0], [ 'Dummy 1', 10, 2.3 ]);
    });

    it ('addRowMatrix/getRows', () => {
        const aTable = new AsciiTable3.AsciiTable3('Dummy title')
            .setHeading('Title', 'Count', 'Rate (%)')
            .addRow('Dummy 1', 10, 2.3)
            .addRowMatrix([ ['Dummy 2', 5, 3.1],  ['Dummy 3', 100, 3.14] ]);

        const rows = aTable.getRows();

        assert.strictEqual(rows.length, 3);
        assert.notStrictEqual(rows[0], [ 'Dummy 1', 10, 2.3 ]);
        assert.notStrictEqual(rows[1], [ 'Dummy 2', 5, 3.1 ]);
        assert.notStrictEqual(rows[2], [ 'Dummy 3', 100, 3.14 ]);
    });

    it ("addNonZeroRow", () =>  {
        const aTable = new AsciiTable3.AsciiTable3('Dummy title')
            .setHeading('Title', 'Count', 'Rate (%)')
            .addRow('Dummy 1', 10, 2.3)
            .addRowMatrix([ ['Dummy 2', 5, 3.1],  ['Dummy 3', 100, 3.14] ])
            .addNonZeroRow('Dummy 4', 0, 0, 0);

        assert.strictEqual(aTable.getRows().length, 3);

        aTable.addNonZeroRow('Dummy 4', 0, 1, 0);

        assert.strictEqual(aTable.getRows().length, 4);
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
        const aTable = new AsciiTable3.AsciiTable3();
        
        const style = aTable.getStyle();

        // ramac should be the default
        assert.strictEqual(style.name, "ramac");
        
        aTable.setStyle("none");
        assert.strictEqual(aTable.getStyle().name, "none");
    });

    it('getStyles', () => {
        const aTable = new AsciiTable3.AsciiTable3();

        const styles = aTable.getStyles();

        // must be an array
        assert.strictEqual(typeof styles, "object");
        assert.strictEqual(styles.length, 14);

        const names = [ "none", "ramac", "ascii-table", "reddit-markdown" ];
        names.forEach(name => {
            assert.strictEqual(styles.find(style => style.name == name).name, name);
        });
        
    });

    it ('removeBorder', () => {
        const aTable = new AsciiTable3.AsciiTable3();

        aTable.removeBorder();
        assert.strictEqual(aTable.getStyle().name, "none");
    });

    it ('setWidth/getWidth', () => {
        const aTable = new AsciiTable3.AsciiTable3()
            .setHeading('Title', 'Count', 'Rate (%)')
            .addRow('Dummy 1', 10, 2.3);

        aTable.setWidth(1, 5);

        assert.strictEqual(aTable.getWidth(1), 5);
        assert.strictEqual(aTable.getWidth(2), undefined);
        assert.strictEqual(aTable.getWidth(3), undefined);
    });

    it ('setWidths/getWidths', () => {
        const aTable = new AsciiTable3.AsciiTable3()
            .setHeading('Title', 'Count', 'Rate (%)')
            .addRow('Dummy 1', 10, 2.3);

        aTable.setWidths();
        assert.notStrictEqual(aTable.getWidths(), []);

        aTable.setWidths([5, undefined, undefined]);
        assert.notStrictEqual(aTable.getWidths(), [5, undefined, undefined]);
    });

    it('setAlign/getAlign', () => {
        const aTable = new AsciiTable3.AsciiTable3()
            .setHeading('Title', 'Count', 'Rate (%)')
            .addRow('Dummy 1', 10, 2.3)
            .setAlign(1, AsciiTable3.CENTER)
            .setAlign(2, AsciiTable3.RIGHT);

        // default alignment should be auto
        assert.strictEqual(aTable.getAlign(1), AsciiTable3.CENTER);
        assert.strictEqual(aTable.getAlign(2), AsciiTable3.RIGHT);
        assert.strictEqual(aTable.getAlign(3), AsciiTable3.AUTO);

        aTable.setAlignLeft(1).setAlignRight(2);

        assert.strictEqual(aTable.getAlign(1), AsciiTable3.LEFT);
        assert.strictEqual(aTable.getAlign(2), AsciiTable3.RIGHT);

        aTable.setAlignCenter(1);
        assert.strictEqual(aTable.getAlign(1), AsciiTable3.CENTER);
    });

    it('setWrapped/isWrapped', () => {
        const aTable = new AsciiTable3.AsciiTable3()
            .setHeading('Title', 'Count', 'Rate (%)')
            .addRow('Dummy 1', 10, 2.3);

        // default is false
        assert.strictEqual(aTable.isWrapped(1), false);

        aTable.setWrapped(2);
        assert.strictEqual(aTable.isWrapped(2), true);

        aTable.setWrapped(2, false);
        assert.strictEqual(aTable.isWrapped(2), false);
    });

    it('addStyle', () => {
        const aTable = new AsciiTable3.AsciiTable3();

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
        const aTable = new AsciiTable3.AsciiTable3('Dummy title')
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
        const aTable = new AsciiTable3.AsciiTable3('Dummy title')
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
        const aTable = new AsciiTable3.AsciiTable3('Dummy title')
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
        const aTable = new AsciiTable3.AsciiTable3('Dummy title')
            .setHeading('Title', 'Count', 'Rate (%)')
            .setAlign(1, AsciiTable3.LEFT)
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

        aTable.setAlign(1, AsciiTable3.CENTER);
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
    
    it ('toString (no title)', () => {
        const aTable = new AsciiTable3.AsciiTable3()
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
        const aTable = new AsciiTable3.AsciiTable3('Dummy title')
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
        const aTable = new AsciiTable3.AsciiTable3('Dummy title')
            .setHeading('Title', 'Count', 'Rate (%)')
            .setAlign(1, AsciiTable3.LEFT)
            .addRowMatrix([ 
                ['Dummy 1', 10, 2.3], 
                ['Dummy 2', 5, 3.1],  
                ['Dummy 3', 100, 3.14],
                ['Dummy 4', 0, 1],
             ]);

        aTable.clear();

        assert.strictEqual(aTable.getTitle(), '');
        assert.notStrictEqual(aTable.getHeading(), []);
        assert.strictEqual(aTable.getRows().length, 0);
    });
});
