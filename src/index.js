const { strlen, isBlank, partition } = require("printable-characters");
/**
 * Type imports.
 * @typedef { import("./index").SectionStyle } SectionStyle
 * @typedef { import("./index").Borders } Borders
 * @typedef { import("./index").Style } Style
 * @typedef { import("./index").ColumnFormatJSON } ColumnFormatJSON
 * @typedef { import("./index").FormattingJSON } FormattingJSON
 * @typedef { import("./index").TableJSON } TableJSON
 */

/**
 * Alignment direction enum.
 */
const AlignmentEnum = {
    LEFT: 0,
    RIGHT: 1,
    CENTER: 2,
    AUTO: 3
};

class AsciiTable3 {
    /**
     * Create a new AsciiTable3 instance
     * @param {string} title The table title (optional)
     */
    constructor(title = "") {
        /** @type {Style[]} */
        this.styles = require("./ascii-table3.styles.json");
        
        this.clear();
 
        this.setTitle(title);
    }
 
    /**
     * Returns wether a value is numeric or not, irrespective of its type.
     * @param {any} value Value to test.
     */
    static isNumeric(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    }
 
    /**
     * Pads the start of a string with a given string until the maximum length limit is reached.
     * @param {string} str String to pad at the beggining.
     * @param {number} maxLength The resulting string max length.
     * @param {string} fillStr The new pad at the beginning.
     * @returns {string} Start-padded string.
     */
    static padStart(str, maxLength, fillStr = " ") {
        if (strlen(str) >= maxLength) return str;
        // partition string
        const partArray = partition(str);

        if (!partArray.length) return fillStr.repeat(maxLength);
        // get first printable block
        let printable = partArray[0][1];

        // pad the start of the printable block
        printable = fillStr.repeat(maxLength - printable.length).concat(printable);

        // replace printable block
        partArray[0][1] = printable;

        let result = "";
        partArray.forEach((block) => result += block[0] + block[1]);

        return result;
    }
 
    /**
     * Pads the end of a string with a given string until the maximum length limit is reached.
     * @param {string} str String to pad at the end.
     * @param {number} maxLength The resulting string max lenght.
     * @param {string} fillStr The new pad at the end.
     * @returns {string} End-padded string.
     */
    static padEnd(str, maxLength, fillStr = " ") {
        if (strlen(str) >= maxLength) return str;
        // partition string
        const partArray = partition(str);

        if (!partArray > 1) return str.concat(fillStr.repeat(maxLength - str.length));

        // get last printable block
        let printable = partArray[partArray.length - 2][1];

        // pad the end of the printable block
        printable = printable.concat(fillStr.repeat(maxLength - printable.length));

        // replace printable block
        partArray[partArray.length - 2][1] = printable;

        let result = "";
        // generate result
        partArray.forEach((block) => result += block[0] + block[1]);

        return result;
    }
 
    /**
     * Generic string alignment.
     * @param {AlignmentEnum} direction The desired aligment direction according to the enum (left, right or center)
     * @param {any} value The value to align.
     * @param {number} len The maximum alignment length.
     * @param {string} pad The pad char (optional, defaults to ' ').
     */
    static align(direction, value, len, pad = " ") {
        const strValue = "" + value;
 
        if (direction == AlignmentEnum.RIGHT) return AsciiTable3.padStart(strValue, len, pad);
        else if (direction == AlignmentEnum.LEFT) return AsciiTable3.padEnd(strValue, len, pad);
        else if (direction == AlignmentEnum.CENTER) return AsciiTable3.padEnd(AsciiTable3.padStart(strValue, strlen(strValue) + Math.floor((len - strlen(strValue)) / 2), pad), len, pad);
        else return AsciiTable3.alignAuto(value, len, pad);
    }
 
    /**
     * Attempt to do intelligent alignment of provided value (string inputs will be left aligned, number types will be right aligned).
     * @param {any} value The value to align.
     * @param {number} len The maximum alignment length.
     * @param {string} [pad] The pad char (optional, defaults to ' ').
     */
    static alignAuto(value, len, pad = " ") {
        if (AsciiTable3.isNumeric(value)) return this.alignRight(value, len, pad);
        else if (typeof value == "string") return this.alignLeft(value, len, pad);
        else return this.alignLeft(value, len, pad);
    }
 
    /**
     * Wraps a string into multiple lines of a limited width.
     * @param {string} str The string to wrap.
     * @param {num} maxWidth The maximum width for the wrapped string.
     * @returns {string} The wrapped string.
     */
    static wordWrap(str, maxWidth) {
        // partition string
        const partArray = partition(String(str));
 
        if (!partArray.length > 1) return AsciiTable3.wordWrapBasic(str, maxWidth);
        let result = "";
 
        // loop over parsed array
        for (let i = 0; i < partArray.length - 1; i += 2) {
            // get current block
            const [nonPrintable, printable] = partArray[i];

            // get next non-printable
            const nextNonPrintable = partArray[i + 1][0];

            // word wrap printable block
            const printableWrapped = AsciiTable3.wordWrapBasic(printable, maxWidth);

            result += nonPrintable + printableWrapped.split("\n").join(nextNonPrintable + "\n" + nonPrintable) + nextNonPrintable;
        }
 
        return result;
    }
 
    /**
     * Wraps a string into multiple lines of a limited width (simple string, no ANSI chars).
     * @param {string} str The string to wrap.
     * @param {num} maxWidth The maximum width for the wrapped string.
     * @returns {string} The wrapped string.
     */
    static wordWrapBasic(str, maxWidth) {
        // make sure we have a string as parameter
        str = "" + str;
 
        let found = false; 
        let res = "";
 
        while (strlen(str) > maxWidth) {
            found = false;
            // Inserts new line at first whitespace of the line
            for (let i = maxWidth - 1; i >= 0; i--) {
                if (isBlank(str.charAt(i))) {
                    res += str.substring(0, i).trimStart() + "\n";
                    str = str.slice(i + 1);
                    found = true;
                    break;
                }
            }
 
            // Inserts new line at maxWidth position, the word is too long to wrap
            if (!found) {
                res += str.substring(0, maxWidth).trimStart() + "\n";
                str = str.slice(maxWidth);
            }
        }
     
        return res + str.trimStart();
    }
 
    /**
     * Truncates a string up to a maximum number of characters (if needed).
     * In case of truncation, '...' are appended to the end of the string.
     * @param {string} str The string to truncate.
     * @param {number} maxSize The string maximum size.
     * @returns {string} The truncated string.
     */
    static truncateString(str, maxSize) {
        if (!strlen(str) > maxSize) return str;
        let result = "";
        let length = 0;

        // loop over string partition
        for (const [nonPrintable, printable] of partition(str)) {
            const text = Array.from(printable.substring(0, maxSize - "...".length).concat("...")).slice (0, maxSize - length);

            result += nonPrintable + text.join ("");
            length += text.length;
        }

        return result;
    }
 
    /**
     * Create a new array at the given len, filled with the given value, mainly used internally.
     * @param {number} len Length of array.
     * @param {any} [value] The fill value (optional).
     * @returns {any[]} Array filled with with desired value.
     */
    static arrayFill(len, value) {
        const result = [];
 
        for (let i = 0; i < len; i++) result.push(value);

        return result;
    }
 
    /**
     * Increases existing array size up to the desired limit.
     * @param {Array} array The array to increase.
     * @param {number} len The desired array size.
     * @param {any} [value] The fill value (optional).
     */
    static arrayResize(array, len, value) {
        // resize as needed
        while (len > array.length) array.push(value);
    }
 
    /**
     * Sets the output style for this table instance.
     * @param {string} name The desired style name (defaults to "ramac" if not found).
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    setStyle(name) {
        /** @type {Style} */
        const foundStyle = this.styles.find((style) => style.name == name);
 
        this.style = foundStyle ? foundStyle : this.styles.find((style) => style.name == "ramac");
 
        return this;
    }
 
    /**
     * Gets the output style for this table instance.
     * @returns {Style} The current table style settings.
     */
    getStyle() {
        return this.style;
    }
 
    /**
     * Gets all available pre-defined styles for this table.
     * @returns {Style[]} Array of predefined border styles.
     */
    getStyles() {
        return Array.from(this.styles);
    }
 
    /**
     * Adds a new style to the style library.
     * @param {Style} style The style object to add.
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    addStyle(style) {
        this.styles.push(style);
 
        return this;
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
        // set default style
        this.setStyle("ramac");
 
        // clear title and heading
        this.setTitle();
        this.setHeading();
 
        // clear data rows
        this.clearRows();
 
        // set default alignment
        this.setTitleAlignCenter();
        this.setHeadingAlignCenter();
 
        // set default cell margin
        this.setCellMargin(1);
 
        // clear all columns formats
        this.dataAlign = undefined;
        this.colWidths = undefined;
        this.wrapping = undefined;
 
        // set default justification
        this.setJustify(false);
 
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
    setTitle(title = "") {
        this.title = title;
 
        return this;
    }
 
    /**
     * Title getter.
     * @returns {string} The table title.
     */
    getTitle() {
        return this.title ? this.title : "";
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
     * Title alignment getter.
     * @returns {AlignmentEnum} The table title alignment direction.
     */
    getTitleAlign() {
        return this.titleAlignment;
    }
 
    /**
     * Table heading setter.
     * @param {any[]} args Headings to set.
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    setHeading(...args) {
        // heading init
        this.heading = AsciiTable3.arrayFill(args.length);
 
        // loop over arguments
        for (let i = 0; i < args.length; i++) this.heading[i] = args[i];
 
        return this;
    }
 
    /**
     * Table heading getter.
     * @returns {any[]} Array with heading values.
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
     * Heading alignment getter.
     * @returns {AlignmentEnum} The instance heading alignment.
     */
    getHeadingAlign() {
        return this.headingAlign;
    }
 
    /**
     * Table row adder.
     * @param {any[]} args Row cell values to set.
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    addRow(...args) {
        // create array for new row 
        const row = AsciiTable3.arrayFill(args.length);
 
        // loop over arguments
        for (let i = 0; i < args.length; i++) row[i] = args[i];
 
        // add new row
        this.rows.push(row);
 
        return this;
    }
 
    /**
     * Adds row to table only if all numeric values are not 0 (zero).
     * @param {any[]} args Row cell values to set.
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    addNonZeroRow(...args) {
        let skipRow = true;
 
        // create array for new row 
        const row = AsciiTable3.arrayFill(args.length);
 
        // loop over arguments
        for (let i = 0; i < args.length; i++) {
            const cell = args[i];
 
            // special test for numeric values
            if (AsciiTable3.isNumeric(cell) && cell != 0) skipRow = false;
 
            row[i] = args[i];
        }
 
        if (!skipRow) this.rows.push(row);
 
        return this;
    }
 
    /**
     * Bulk addRow operation.
     * @param {any[]} rows Multidimensional array of rows.
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    addRowMatrix(rows) {
        // add each individual row
        rows.forEach((row) => this.rows.push(row));
 
        return this;
    }
 
    /**
     * Table rows getter.
     * @returns {any[]} Array with row cell values (column array).
     */
    getRows() {
        return Array.from(this.rows);
    }
 
    /**
     * Sets cell value for this row and column combination.
     * @param {number} row Desired row number (1-based index).
     * @param {number} col Desired column number (1-based index).
     * @param {any} value The cell value to set.
     */
    setCell(row, col, value) {
        this.rows[row - 1][col - 1] = value;
    }
 
    /**
     * Gets cell value for this row and column combination.
     * @param {number} row Desired row number (1-based index).
     * @param {number} col Desired column number (1-based index).
     * @returns {any} The cell value.
     */
    getCell(row, col) {
        return this.getRows()[row - 1][col - 1];
    }
 
    /**
     * Sets the preset width for a given column rendering output.
     * @param {number} idx Column index to align (starts at 1).
     * @param {number} width The maximum width for this column (in characters).
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    setWidth(idx, width) {
        if (this.colWidths) AsciiTable3.arrayResize(this.colWidths, idx);
        else this.colWidths = AsciiTable3.arrayFill(idx);
 
        this.colWidths[idx - 1] = width;
 
        return this;
    }
 
    /**
     * Gets the preset width for a given column rendering output.
     * @param {number} idx Column index to align (starts at 1).
     * @returns {number} The maximum rendered size for this column.
     */
    getWidth(idx) {
        let result;
        if (this.colWidths && idx <= this.colWidths.length) result = this.colWidths[idx - 1];

        return result;
    }
 
    /**
     * Sets the present widths for each column using an array.
     * @param {number[]} widths Array with widths for columns.
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
        return this.colWidths ? this.colWidths : [];
    }
 
    /**
     * Sets the internal cell margin (in characters)
     * @param {number} margin 
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    setCellMargin(margin) {
        this.cellMargin = margin;
 
        return this;
    }
 
    /**
     * Gets the internal cell margin (in characters)
     * @returns {number} The cell margin in characters.
     */
    getCellMargin() {
        return this.cellMargin;
    }
 
    /**
     * Sets the alignment direction for a given column.
     * @param {number} idx Column index to align (starts at 1).
     * @param {AlignmentEnum} direction Desired alignment direction.
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    setAlign(idx, direction) {
        if (this.dataAlign) this.dataAlign.concat(AsciiTable3.arrayFill(idx - this.dataAlign.length, AlignmentEnum.AUTO));
        else this.dataAlign = AsciiTable3.arrayFill(idx);
 
        this.dataAlign[idx - 1] = direction;
 
        return this;
    }
 
    /**
     * Get the alignment direction for a given column.
     * @param {number} idx Column index to align (starts at 1).
     * @returns {AlignmentEnum} The alignment set for a column.
     */
    getAlign(idx) {
        let result = AlignmentEnum.AUTO;
 
        if (this.dataAlign && idx <= this.dataAlign.length) result = this.dataAlign[idx - 1];
         
        return result;
    }
 
    /**
     * Sets the alignment direction for all table columns.
     * @param {AlignmentEnum[]} directions Desired alignment directions.
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    setAligns(directions) {
        this.dataAlign = Array.from(directions);
 
        return this;
    }
 
    /** 
     * Gets the alignment direction for all columns.
     * @returns {AlignmentEnum[]} Array with alignment settings for all columns.
     */
    getAligns() {
        if (!this.dataAlign) {
            if (this.getRows().length > 0) this.dataAlign = AsciiTable3.arrayFill(this.getRows()[0].length, AlignmentEnum.AUTO);
            else this.dataAlign = [];
        }
 
        return Array.from(this.dataAlign);
    }
 
    /**
     * Sets the wrapping property for a specific column (wrapped content will generate more than one data row if needed).
     * @param {number} idx Column index to align (starts at 1).
     * @param {boolean} wrap Whether to wrap the content (default is true).
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    setWrapped(idx, wrap = true) {
        if (this.wrapping) this.wrapping.concat(AsciiTable3.arrayFill(idx - this.wrapping.length, false));
        else this.wrapping = AsciiTable3.arrayFill(idx, false);
         
        this.wrapping[idx - 1] = wrap;
 
        return this;
    }
 
    /**
     * Gets the wrapping setting for a given column.
     * @param {number} idx Column index to get wrapping (starts at 1).
     */
    isWrapped(idx) {
        // wrapping defaults to false
        let result = false;
 
        if (this.wrapping && idx <= this.wrapping.length) result = this.wrapping[idx - 1];
         
        return result;
    }
 
    /**
     * Sets wrapping for all table columns.
     * @param {boolean[]} wrapping Boolean array of wrapping settings.
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    setWrappings(wrappings) {
        this.wrapping = Array.from(wrappings);
 
        return this;
    }
 
    /** 
     * Gets the alignment direction for all columns.
     * @returns {AlignmentEnum[]} Array with alignment settings for all columns.
     */
    getWrappings() {
        if (!this.wrapping) {
            if (this.getRows().length > 0) this.wrapping = AsciiTable3.arrayFill(this.getRows()[0].length, false);
            else this.wrapping = [];
        }
 
        return Array.from(this.wrapping);
    }
 
    /**
     * Justify all columns to be the same width.
     * @param {boolean} enabled Boolean for turning justify on or off (default is true).
     */
    setJustify(enabled = true) {
        this.justify = enabled;
 
        return this;
    }
 
    /**
     * Returns whether all columns are to be rendered with the same width.
     * @returns {boolean} Whether all columns are to be rendered with the same width.
     */
    isJustify() {
        return this.justify ? this.justify : false;
    }
 
    /**
     * Transposes table by exchanging rows for columns.
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    transpose() {
        // sanity check for empty table
        if (this.getHeading().length == 0 && this.getRows().length == 0) return this;
         
        // get number of data columns
        const nCols = this.getHeading().length > 0 ? this.getHeading().length : this.getRows()[0].length;
 
        // get number of data rows
        const nRows = this.getRows().length;
 
        // create new matrix with number of rows equal number of columns
        const newMatrix = AsciiTable3.arrayFill(nCols);
 
        // columns where data starts (depends on heading existence)
        const dataStartCol = this.getHeading().length > 0 ? 1 : 0;
 
        // loop over rows
        for (let row = 0; row < newMatrix.length; row++) {
            // column array for this row (number of rows + heading if needed)
            newMatrix[row] = AsciiTable3.arrayFill(nRows + dataStartCol);
 
            // check for heading
            if (this.getHeading().length > 0) newMatrix[row][0] = this.getHeading()[row];
 
            // loop over columns
            for (let col = dataStartCol; col < newMatrix[0].length; col++) newMatrix[row][col] = this.getCell(col + Math.abs(dataStartCol - 1), row + 1);
        }
 
        // new value
        return new AsciiTable3(this.getTitle())
            .setHeadingAlign(this.getHeadingAlign())
            .addRowMatrix(newMatrix);
    }
 
    /**
     * Return the JSON representation of the table, this also allows us to call JSON.stringify on the instance.
     * @returns {object} The table JSON representation.
     */
    toJSON() {
        return ({
            title: this.getTitle(),
            heading: this.getHeading(),
            rows: this.getRows(),
            formatting: {
                titleAlign: this.getTitleAlign(),
                headingAlign: this.getHeadingAlign(),
                justify: this.isJustify(),
                columns: {
                    aligns: this.getAligns(),
                    widths: this.getWidths(),
                    wrappings: this.getWrappings()
                }
            }
        });
    }
 
    /**
     * Populate the table from json object, should match the toJSON output above.
     * @param {TableJSON} obj Object with table definition according to JSON structure.
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    fromJSON(obj) {
        this.clear();
 
        this.setTitle(obj.title);
        this.heading = Array.from(obj.heading);
        this.addRowMatrix(obj.rows);
 
        // formatting
        this.setTitleAlign(obj.formatting.titleAlign);
        this.setHeadingAlign(obj.formatting.headingAlign);
 
        this.setAligns(obj.formatting.columns.aligns);
        this.setWidths(obj.formatting.columns.widths);
        this.setWrappings(obj.formatting.columns.wrappings);
 
        this.setJustify(obj.formatting.justify);
 
        return this;
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
     * Sorts the table rows based on specific methods for a column.
     * @param {number} idx The column number to base sort on (starts at 1).
     * @param {function} func The comparison function to use when sorting (optional, for compatibility with AsciiTable).
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    sortColumn(idx, func = (a, b) => a > b ? 1 : -1) {
        this.rows.sort((a, b) => func(a[idx - 1], b[idx - 1]));
 
        return this;
    }
 
    /**
     * Reverse sorts the table rows based on specific methods for a column.
     * @param {number} idx The column number to base sort on (starts at 1).
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    sortColumnDesc(idx) {
        // function for sorting descending
        const func = (a, b) => b > a ? 1 : -1;
 
        return this.sortColumn(idx, func);
    }
 
    /**
     * Get the column sizes for table rendering (in characters).
     * @private
     * @returns {number[]} Array with column sizes for rendering.
     */
    getColumnsWidth() {
        let colSizes;
 
        const headings = this.getHeading();
 
        // init col sizes (heading)
        if (headings.length > 0) colSizes = AsciiTable3.arrayFill(headings.length, 0);
        else colSizes = AsciiTable3.arrayFill(this.getRows()[0].length, 0);
 
        // loop over headings
        for (let col = 0; col < headings.length; col++) {
            // get current cell value string
            const cell = "".padStart(this.getCellMargin()) + headings[col] + "".padStart(this.getCellMargin());
 
            if (strlen(cell) > colSizes[col]) colSizes[col] = strlen(cell);
        }
 
        // determine max column sizes for data rows
        this.getRows().forEach((row) => {
            // loop over columns
            for (let col = 0; col < row.length; col++) {
                // get current cell value string
                const cell = "".padStart(this.getCellMargin()) + row[col] + "".padStart(this.getCellMargin());
 
                if (strlen(cell) > colSizes[col]) colSizes[col] = strlen(cell);
            }
        });
 
        // override with preset widths
        for (let col2 = 0; col2 < colSizes.length; col2++) {
            // check if width preset has been defined
            if (this.getWidth(col2 + 1)) colSizes[col2] = this.getWidth(col2 + 1);
        }
 
        // check for justification (all columns of same width)
        if (this.isJustify()) colSizes = AsciiTable3.arrayFill(colSizes.length, Math.max(...colSizes));
 
        return colSizes;
    }

    /**
     * Get string with the rendering of a horizontal line.
     * @private
     * @param {SectionStyle} posStyle The line style for the desired position (between top, middle and bottom).
     * @param {number[]} colsWidth Array with the desired width for each data column.
     * @returns {string} String representation of table horizontal line.
     */
    getHorizontalLine(posStyle, colsWidth) {
        let result = posStyle.left;
         
        for (let i = 0; i < colsWidth.length; i++) {
            result += "".padStart(colsWidth[i], posStyle.center);
 
            if (i < colsWidth.length - 1) result += posStyle.colSeparator;
        }
 
        result += posStyle.right;
 
        // trim result
        result = result.trim();
         
        if (result != "") result = result + "\n";
 
        return result;
    }
 
    /**
     * Get array of wrapped row data from a "normal" row.
     * @private
     * @param {any[]} row Row of data.
     * @returns Array of data rows after word wrapping.
     */
    getWrappedRows(row) {
        // setup a new wrapped row
        const wrappedRow = AsciiTable3.arrayFill(row.length);
 
        let maxRows = 1;
 
        // loop over columns and wrap
        for (let col = 0; col < row.length; col++) {
            const cell = row[col];
 
            if (this.getWidth(col + 1) && this.isWrapped(col + 1)) {
                wrappedRow[col] = AsciiTable3.wordWrap(cell, this.getWidth(col + 1) - this.getCellMargin() * 2).split("\n");
 
                if (wrappedRow[col].length > maxRows) maxRows = wrappedRow[col].length;
            } else wrappedRow[col] = [ cell ];
        }
 
        // create resulting array with (potentially) multiple rows
        const result = AsciiTable3.arrayFill(maxRows);
        for (let i = 0; i < maxRows; i++) result[i] = AsciiTable3.arrayFill(row.length, "");
 
        // fill in values
        for (let nCol = 0; nCol < row.length; nCol++) {
            for (let nRow = 0; nRow < wrappedRow[nCol].length; nRow++) result[nRow][nCol] = wrappedRow[nCol][nRow];
        }
 
        return result;
    }
 
    /**
     * Get string with the rendering of a heading row (truncating if needed).
     * @private
     * @param {Style} posStyle The heading row style.
     * @param {number[]} colsWidth Array with the desired width for each heading column.
     * @param {string} row The heading row to generate.
     * @returns {string} String representation of table heading row line.
     */
    getHeadingRowTruncated(posStyle, colsWidth, row) {
        let result = posStyle.left;
 
        for (let col = 0; col < row.length; col++) {
            const cell = "" + row[col];
 
            // align contents disregarding margins
            const cellAligned = AsciiTable3.align(this.getHeadingAlign(), cell, colsWidth[col] - this.getCellMargin() * 2);
 
            result += 
                "".padStart(this.getCellMargin()) + 
                AsciiTable3.truncateString(cellAligned, colsWidth[col] - this.getCellMargin() * 2) +
                "".padStart(this.getCellMargin());
 
            if (col < row.length - 1) result += posStyle.colSeparator;
        }
        result += posStyle.right + "\n";
 
        return result;
    }
 
    /**
     * Get string with the rendering of a heading row.
     * @private
     * @param {Style} posStyle The heading row style.
     * @param {number[]} colsWidth Array with the desired width for each heading column.
     * @returns {string} String representation of table heading row line.
     */
    getHeadingRow(posStyle, colsWidth) {
        let result = "";
 
        // wrap heading if needed
        const rows = this.getWrappedRows(this.getHeading());
 
        rows.forEach((aRow) => result += this.getHeadingRowTruncated(posStyle, colsWidth, aRow));
 
        return result;
    }
 
    /**
     * Get string with the rendering of a data row (truncating if needed).
     * @private
     * @param {Style} posStyle The data row style.
     * @param {number[]} colsWidth Array with the desired width for each data column.
     * @param {any[]} row Array with cell values for this row.
     * @returns {string} String representation of table data row line.
     */
    getDataRowTruncated(posStyle, colsWidth, row) {
        let result = posStyle.left;
 
        // loop over data columns in row
        for (let col = 0; col < colsWidth.length; col++) {
            const cell = "" + row[col];
 
            // align cell contents disregarding cell margins
            const cellAligned = AsciiTable3.align(this.getAlign(col + 1), cell, colsWidth[col] - this.getCellMargin() * 2);
 
            result += 
                "".padStart(this.getCellMargin()) + 
                AsciiTable3.truncateString(cellAligned, colsWidth[col] - this.getCellMargin() * 2) +
                "".padStart(this.getCellMargin());
 
            if (col < colsWidth.length - 1) result += posStyle.colSeparator;
        }
        result += posStyle.right + "\n";
 
        return result;
    }
 
    /**
     * Get string with the rendering of a data row (please not that it may result in several rows, depending on wrap settings).
     * @private
     * @param {Style} posStyle The data row style.
     * @param {number[]} colsWidth Array with the desired width for each data column.
     * @param {any[]} row Array with cell values for this row.
     * @returns {string} String representation of table data row line.
     */
    getDataRow(posStyle, colsWidth, row) {
        let result = "";
 
        // wrap data row if needed
        const rows = this.getWrappedRows(row);
 
        rows.forEach((aRow) => result += this.getDataRowTruncated(posStyle, colsWidth, aRow));
 
        return result;
    }
 
    /**
     * Render the instance as a string for output.
     * @returns {string} String rendiring of this instance table.
     */
    toString() {
        // determine table columns max width
        const colsWidth = this.getColumnsWidth();
 
        // get style
        const style = this.getStyle();
 
        // full table width
        const maxWidth = 
            colsWidth.reduce((a, b) => a + b, 0) + // data column sizes
            (colsWidth.length - 1) * strlen(style.borders.data.colSeparator); // mid column separators
 
        let result = "";
 
        // title
        if (this.getTitle().length > 0) {
            // top line (above title)
            result += style.borders.top.left + "".padStart(maxWidth, style.borders.top.center) + style.borders.top.right + "\n";
 
            if (result.trim() == "") result = "";
 
            // title line
            result += 
                style.borders.data.left + AsciiTable3.align(this.getTitleAlign(), this.getTitle(), maxWidth) + 
                style.borders.data.right + "\n";
 
            // special style (between title and headings)
            /** @type {SectionStyle} */
            const newStyle = {
                left: style.borders.middle.left,
                right: style.borders.middle.right,
                center: style.borders.top.center,
                colSeparator: style.borders.top.colSeparator
            };
 
            if (newStyle.center != "" || newStyle.colSeparator != "") result += this.getHorizontalLine(newStyle, colsWidth);
        } else result += this.getHorizontalLine(style.borders.top, colsWidth);
 
        // headings
        if (this.getHeading().length > 0) {
            result += this.getHeadingRow(style.borders.data, colsWidth);
 
            // heading / rows separator line
            result += this.getHorizontalLine(style.borders.middle, colsWidth);
        }
 
        // rows
        this.getRows().forEach((row) => result += this.getDataRow(style.borders.data, colsWidth, row));
 
        // bottom line
        result += this.getHorizontalLine(style.borders.bottom, colsWidth);
 
        return result;
    }
}

module.exports = { AsciiTable3, AlignmentEnum };