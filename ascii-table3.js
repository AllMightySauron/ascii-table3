/*jshint esversion: 6 */

/**
 * Filename containing rendering styles.
 */
const STYLES_FILENAME = 'ascii-table3.styles.json';

/**
 * Alignment direction enum.
 */
const AlignmentEnum = {
    LEFT: 0,
    RIGHT: 1,
    CENTER: 2,
    AUTO: 3
};

/**
 * Class for creating beautiful ASCII tables.
 */
class AsciiTable3 {

    /**
     * Default constructor.
     * @param {string} title The table title (optional).
     */
    constructor(title) {
        this.clear();

        // load styles
        var fs = require('fs');
        this.styles = JSON.parse(fs.readFileSync(module.path + '/' + STYLES_FILENAME, 'utf8'));

        // set default style
        this.setStyle("ramac");

        this.setTitle(title);
    }

    /**
     * Returns wether a valye is numeric or not, irrespective of its type.
     * @static
     * @param {*} value Value to test.
     */
    static isNumeric(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    }

    /**
     * Generic string alignment.
     * @static
     * @param {AlignmentEnum} direction The desired aligment direction according to the enum (left, right or center)
     * @param {*} value The value to align.
     * @param {number} len The maximum alignment length.
     * @param {string} pad The pad char (optional, defaults to ' ').
     */
    static align(direction, value, len, pad) {
        const padChar = pad ? pad : ' ';
        const strValue = '' + value;

        if (direction == AlignmentEnum.RIGHT) {
            return strValue.padStart(len, padChar);
        } else if (direction == AlignmentEnum.LEFT) {
            return strValue.padEnd(len, padChar);
        } else if (direction == AlignmentEnum.CENTER) {
            return strValue.padStart(strValue.length + Math.floor((len - strValue.length) / 2), padChar).padEnd(len, padChar);
        } else {
            return AsciiTable3.alignAuto(value, len, pad);
        }
    }

    /**
     * Left string alignment.
     * @static
     * @param {*} value The value to align.
     * @param {number} len The maximum alignment length.
     * @param {string} pad The pad char (optional, defaults to ' ').
     */
    static alignLeft(value, len, pad) {
        return this.align(AlignmentEnum.LEFT, value, len, pad);
    }

    /**
     * Right string alignment.
     * @static
     * @param {*} value The value to align.
     * @param {number} len The maximum alignment length.
     * @param {string} pad The pad char (optional, defaults to ' ').
     */
    static alignRight(value, len, pad) {
        return this.align(AlignmentEnum.RIGHT, value, len, pad);
    }

    /**
     * Center string alignment.
     * @static
     * @param {*} value The value to align.
     * @param {number} len The maximum alignment length.
     * @param {string} pad The pad char (optional, defaults to ' ').
     */
    static alignCenter(value, len, pad) {
        return this.align(AlignmentEnum.CENTER, value, len, pad);
    }

    /**
     * Attempt to do intelligent alignment of provided value (string inputs will be left aligned, number types will be right aligned).
     * @static
     * @param {*} value The value to align.
     * @param {number} len The maximum alignment length.
     * @param {string} pad The pad char (optional, defaults to ' ').
     */
    static alignAuto(value, len, pad) {    
        if (AsciiTable3.isNumeric(value)) {
            return this.alignRight(value, len, pad);
        } else if (typeof value == "string") {
            return this.alignLeft(value, len, pad);
        } else {
            return this.alignLeft(value, len, pad);
        }
    }

    /**
     * Truncates a string up to a maximum number of characters (if needed).
     * @static
     * @param {*} str The string to truncate.
     * @param {*} maxSize The string maximum size.
     * @returns {string} The truncated string (in case of truncation, '...' are appended to the end).
     */
    static truncateString(str, maxSize) {
        const SUFIX = '...';

        if (str.length > maxSize) {
            var result = str.substring(0, maxSize - SUFIX.length).concat(SUFIX);

            if (result.length > maxSize) result = result.substring(0, maxSize);

            return result;
        }
        else return str;
    }

    /**
     * Create a new array at the given len, filled with the given value, mainly used internally.
     * @static
     * @param {number} len Length of array.
     * @param {*} value The fill value (optional).
     */
    static arrayFill(len, value) {
        var result = [];

        for (var i = 0; i < len; i++) {
            result.push(value);
        }

        return result;
    }

    /**
     * Increases existing array size up to the desired limit.
     * @static
     * @param {Array} array The array to increase.
     * @param {*} len The desired array size.
     * @param {*} value The fill value (optional).
     */
    static arrayResize(array, len, value) {
        // resize as needed
        while(len > array.length)
            array.push(value);
    }

    /**
     * Sets the output style for this table instance.
     * @param {string} name The desired style name.
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    setStyle(name) {
        this.style = this.styles.find(style => style.name == name);

        return this;
    }

    /**
     * Gets the output style for this table instance.
     * @returns {object} The current table style settings.
     */
    getStyle() {
        return this.style;
    }

    /**
     * Removes border from table.
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    removeBorder() {
        return this.setStyle("none");
    }

    /**
     * Clear / reset all table data.
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    clear() {
        this.setTitle();
        this.setTitleAlignCenter();

        this.setHeading();
        this.setHeadingAlignCenter();

        this.clearRows();

        return this;
    }

    /**
     * Reset all row data, maintains title and headings.
     * @returns {object} The AsciiTable3 object instance.
     */
    clearRows() {
        this.rows = [];

        return this;
    }

    /**
     * Title setter.
     * @param {string} title The title to set.
     * @returns {object} The AsciiTable3 object instance.
     */
    setTitle(title) {
        this.title = title;

        return this;
    }

    /**
     * Title getter.
     * @returns {string} The table title.
     */
    getTitle() {
        return this.title;
    }

    /**
     * Title alignment setter.
     * @param {AlignmentEnum} direction The desired title aligment direction according to the enum (left, right or center)
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    setTitleAlign(direction) {
        this.titleAlignment = direction;

        return this;
    }

    /**
     * Left title alignment setter.
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    setTitleAlignLeft() {
        return this.setTitleAlign(AlignmentEnum.LEFT);
    }

    /**
     * Right title alignment setter.
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    setTitleAlignRight() {
        return this.setTitleAlign(AlignmentEnum.RIGHT);
    }

    /**
     * Center title alignment setter.
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    setTitleAlignCenter() {
        return this.setTitleAlign(AlignmentEnum.CENTER);
    }

    /**
     * Title alignment getter.
     * @returns {AlignmentEnum} The table title alignment direction.
     */
    getTitleAlign() {
        return this.titleAlignment;
    }

    /**
     * Table heading setter.
     * @param {*[]} args Headings to set.
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    setHeading(...args) {
        // heading init
        this.heading = AsciiTable3.arrayFill(args.length);

        // loop over arguments
        for (var i = 0; i < args.length; i++) {
            this.heading[i] = args[i];
        }

        return this;
    }

    /**
     * Table heading getter.
     * @returns {*[]} Array with heading values.
     */
    getHeading() {
        return Array.from(this.heading);
    }

    /**
     * Heading alignment setter.
     * @param {AlignmentEnum} direction The desired heading aligment direction according to the enum (left, right or center)
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    setHeadingAlign(direction) {
        this.headingAlign = direction;

        return this;
    }

    /**
     * Left heading alignment setter.
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    setHeadingAlignLeft() {
        return this.setHeadingAlign(AlignmentEnum.LEFT);
    }

    /**
     * Right heading alignment setter.
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    setHeadingAlignRight() {
        return this.setHeadingAlign(AlignmentEnum.RIGHT);
    }

    /**
     * Center heading alignment setter.
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    setHeadingAlignCenter() {
        return this.setHeadingAlign(AlignmentEnum.CENTER);
    }

    /**
     * Heading alignment getter.
     * @returns  {AlignmentEnum} The instance heading alignment.
     */
    getHeadingAlign() {
        return this.headingAlign;
    }

    /**
     * Table row adder.
     * @param {*[]} args Row cell values to set.
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    addRow(...args) {
        // create array for new row 
        const row = AsciiTable3.arrayFill(args.length);

        // loop over arguments
        for (var i = 0; i < args.length; i++) {
            row[i] = args[i];
        }

        // add new row
        this.rows.push(row);

        return this;
    }

    /**
     * Bulk addRow operation.
     * @param {*} rows Multidimensional array of rows.
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    addRowMatrix(rows) {
        // add each individual row
        rows.forEach(row => this.rows.push(row));

        return this;
    }

    /**
     * Table rows getter
     * @returns {*[]} Array with row cell values (column array).
     */
    getRows() {
        return Array.from(this.rows);
    }

    /**
     * Sets the preset width for a given column rendering output.
     * @param {number} idx Column index to align (starts at 1).
     * @param {number} width The maximum width for this column (in characters).
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    setWidth(idx, width) {
        if (this.colWidths) {
            // resize if needed
            AsciiTable3.arrayResize(this.colWidths, idx);
        } else {
            // create array            
            this.colWidths = AsciiTable3.arrayFill(idx);
        }

        // arrays are 0-based
        this.colWidths[idx - 1] = width;

        return this;
    }

    /**
     * Gets the preset width for a given column rendering output.
     * @param {number} idx Column index to align (starts at 1).
     * @returns {number} The maximum rendered size for this column.
     */
    getWidth(idx) {
        var result;

        if (this.colWidths && idx <= this.colWidths.length) {
            // arrays are 0-based
            result = this.colWidths[idx - 1];
        }
        
        return result;
    }

    /**
     * Sets the present widths for each column using an array.
     * @param {number[]} Array with widths for columns.
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    setWidths(widths) {
        this.colWidths = widths;

        return this;
    }

    /**
     * Gets the present widths for each column (if any).
     * @returns {number[]} Array with widths for columns.
     */
    getWidths() {
        if (this.colWidths) {
            return this.colWidths;
        } else {
            return [];
        }
    }

    /**
     * Sets the alignment direction for a given column.
     * @param {number} idx Column index to align (starts at 1).
     * @param {AlignmentEnum} direction Desired alignment direction.
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    setAlign(idx, direction) {
        if (this.dataAlign) {
            // resize if needed
            AsciiTable3.arrayResize(this.dataAlign, idx);
        } else {
            // create array            
            this.dataAlign = AsciiTable3.arrayFill(idx);
        }

        // arrays are 0-based
        this.dataAlign[idx - 1] = direction;

        return this;
    }

    /**
     * Set the alignment direction for a given column.
     * @param {number} idx Column index to align (starts at 1).
     * @returns {AlignmentEnum} The alignment set for a column.
     */
    getAlign(idx) {
        var result = AlignmentEnum.AUTO;

        if (this.dataAlign && idx <= this.dataAlign.length) {
            // arrays are 0-based
            result = this.dataAlign[idx - 1];
        }
        
        return result;
    }

    /**
     * Sets left alignment direction for a given column.
     * @param {number} idx Column index to align (starts at 1).
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    setAlignLeft(idx) {
        return this.setAlign(idx, AlignmentEnum.LEFT);
    }

    /**
     * Sets right alignment direction for a given column.
     * @param {number} idx Column index to align (starts at 1).
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    setAlignRight(idx) {
        return this.setAlign(idx, AlignmentEnum.RIGHT);
    }

    /**
     * Sets center alignment direction for a given column.
     * @param {number} idx Column index to align (starts at 1).
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    setAlignCenter(idx) {
        return this.setAlign(idx, AlignmentEnum.CENTER);
    }

    /**
     * Return the JSON representation of the table, this also allows us to call JSON.stringify on the instance.
     * @returns {string} The table JSON representation.
     */
    toJSON() {
        return '{\n' +
            `  "title": ${JSON.stringify(this.getTitle())}\n` +
            `, "heading": ${JSON.stringify(this.getHeading())}\n` +
            `, "rows": ${JSON.stringify(this.getRows())}\n` +
            `, "widths": ${JSON.stringify(this.getWidths())}` +
            '}';
    }

    /**
     * Populate the table from json object, should match the toJSON output above.
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    fromJSON(obj) {
        this.clear();

        this.setTitle(obj.title);
        this.heading = Array.from(obj.heading);
        this.addRowMatrix(obj.rows);
        this.setWidths(obj.widths);

        return this;
    }

    /**
     * Get the column sizes for table rendering (in characters).
     * @returns {number[]} Array with column sizes for rendering.
     */
    getColumnsWidth() {
        var colSizes;

        const headings = this.getHeading();

        // init col sizes
        if (this.headings && this.headings.length > 0) {
            // use heading
            colSizes = AsciiTable3.arrayFill(headings.length, 0);
        } else {
            // derive from first row
            colSizes = AsciiTable3.arrayFill(this.getRows()[0].length, 0);
        }

        // loop over headings
        for(var col = 0; col < headings.length; col++) {
            // get current cell value string
            const cell = '' + headings[col];

            if (cell.length > colSizes[col]) colSizes[col] = cell.length;
        }

        // determine max column sizes for data rows
        this.getRows().forEach(row => {
            // loop over columns
            for(var col = 0; col < row.length; col++) {
                // get current cell value string
                const cell = '' + row[col];

                if (cell.length > colSizes[col]) colSizes[col] = cell.length;
            }
        });

        // override with preset widths
        for(var col2 = 0; col2 < colSizes.length; col2++) {
            // check if width preset has been defined
            if (this.getWidth(col2 + 1)) {
                colSizes[col2] = this.getWidth(col2 + 1);
            }
        }

        return colSizes;
    }

       /**
     * Sorts the table rows based on a specific methods.
     * @param {function} func The comparison function to use when sorting.
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    sort(func) {
        this.rows.sort(func);

        return this;
    }

    /**
     * Sorts the table rows based on a specific methods.
     * @param {number} idx  The column number to base sort on.
     * @param {function} func The comparison function to use when sorting.
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    sortColumn(idx, func) {
        this.rows.sort(function(a, b) {
            // zero-based array
            return func(a[idx - 1], b[idx - 1]);
          });

        return this;
    }

    /**
     * Get string with the rendering of a horizontal line.
     * @private
     * @param {object} posStyle The line style for the desired position (between top, middle and bottom).
     * @param {number[]} colsWidth Array with the desired width for each data column.
     * @returns {string} String representation of table horizontal line.
     */
    getHorizontalLine(posStyle, colsWidth) {
        var result = posStyle.left;
        
        for (var i = 0; i < colsWidth.length; i++) {
            result += ''.padStart(colsWidth[i], posStyle.center);

            if (i < colsWidth.length - 1) result += posStyle.colSeparator;
        }

        result += posStyle.right;

        // trim result
        result = result.trim();
        
        if (result != '') result = result + '\n';

        return result;
    }

    /**
     * Get string with the rendering of a heading row.
     * @private
     * @param {object} posStyle The heading row style.
     * @param {number[]} colsWidth Array with the desired width for each heading column.
     * @returns {string} String representation of table heading row line.
     */
    getHeadingRow(posStyle, colsWidth) {
        const heading = this.getHeading();

        var result = posStyle.left;

        for (var col = 0; col < heading.length; col++) {
            const cell = '' + heading[col];
            const cellAligned = AsciiTable3.align(this.getHeadingAlign(), cell, colsWidth[col]);

            result += AsciiTable3.truncateString(cellAligned, colsWidth[col]);

            if (col < heading.length - 1) result += posStyle.colSeparator;
        }
        result += posStyle.right + '\n';

        return result;
    }

    /**
     * Get string with the rendering of a data row.
     * @private
     * @param {object} posStyle The data row style.
     * @param {number[]} colsWidth Array with the desired width for each data column.
     * @param {*[]} row Array with cell values for this row.
     * @returns {string} String representation of table data row line.
     */
    getDataRow(posStyle, colsWidth, row) {
        var result = posStyle.left;

        // loop over data columns in row
        for (var col = 0; col < colsWidth.length; col++) {
            const cell = row[col];
            var cellAligned;

            if (cell) {
                 cellAligned = AsciiTable3.align(this.getAlign(col + 1), cell, colsWidth[col]);
            } else {
                cellAligned = ''.padStart(colsWidth[col]);
            }
            
            result += AsciiTable3.truncateString(cellAligned, colsWidth[col]);

            if (col < colsWidth.length - 1) result += posStyle.colSeparator;
        }
        result += posStyle.right + '\n';

        return result;
    }

    /**
     * Render the instance as a string for output.
     * @returns {string} String rendiring of this instance table.
     */
    toString() {
        const colsWidth = this.getColumnsWidth();
        //console.log(colsWidth);

        // get style
        const style = this.getStyle();

        // full table width
        const maxWidth = 
            colsWidth.reduce(function(a, b) { return a + b; }, 0) +            // data column sizes
            (colsWidth.length - 1) * style.borders.data.colSeparator.length;   // mid column separators
        //console.log(maxWidth);

        var result = '';

        // title
        if (this.getTitle()) {
            // top line (above title)
            result += style.borders.top.left + ''.padStart(maxWidth, style.borders.top.center) + style.borders.top.right + '\n';

            if (result.trim() == '') result = '';

            // title line
            result += style.borders.data.left + AsciiTable3.align(this.getTitleAlign(), this.getTitle(), maxWidth) + 
                    style.borders.data.right + '\n';

            // special style (between title and headings)
            const newStyle = {
                left: style.borders.middle.left,
                right: style.borders.middle.right,
                center: style.borders.top.center,
                colSeparator: style.borders.top.colSeparator
            };

            // title / heading separator line
            result += this.getHorizontalLine(newStyle, colsWidth);
        } else {
            // top line
            result += this.getHorizontalLine(style.borders.top, colsWidth);
        }

        // headings
        if (this.getHeading() && this.getHeading().length > 0) {
            result += this.getHeadingRow(style.borders.data, colsWidth);

            // heading / rows separator line
            result += this.getHorizontalLine(style.borders.middle, colsWidth);
        }

        // rows
        this.getRows().forEach(row => {
            result += this.getDataRow(style.borders.data, colsWidth, row);
        });

        // bottom line
        result += this.getHorizontalLine(style.borders.bottom, colsWidth);

        return result;
    }
}

/*!
 * Module exports.
 */
module.exports = { AsciiTable3, LEFT: AlignmentEnum.LEFT, RIGHT: AlignmentEnum.RIGHT, CENTER: AlignmentEnum.CENTER, AUTO: AlignmentEnum.AUTO };
