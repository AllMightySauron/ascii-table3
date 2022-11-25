/**
 * Type imports.
 */
export type SectionStyle = import("./types").SectionStyle;
/**
 * Type imports.
 */
export type Borders = import("./types").Borders;
/**
 * Type imports.
 */
export type Style = import("./types").Style;
/**
 * Type imports.
 */
export type ColumnFormatJSON = import("./types").ColumnFormatJSON;
/**
 * Type imports.
 */
export type FormattingJSON = import("./types").FormattingJSON;
/**
 * Type imports.
 */
export type TableJSON = import("./types").TableJSON;
/**
 * Class for creating beautiful ASCII tables.
 */
export class AsciiTable3 {
    /**
     * Returns whether a value is numeric or not, irrespective of its type.
     * @static
     * @param {*} value Value to test.
     * @returns {boolean} Whether the value is numeric or not.
     */
    static isNumeric(value: any): boolean;
    /**
     * Pads the start of a string with a given string until the maximum length limit is reached.
     * @param {string}  str         String to pad at the beggining.
     * @param {number}  maxLength   The resulting string max lenght.
     * @param {string}  fillStr     The new pad at the begginning (optional, defaults to ' ').
     * @returns {string}            Start-padded string.
     */
    static padStart(str: string, maxLength: number, fillStr?: string): string;
    /**
     * Pads the end of a string with a given string until the maximum length limit is reached.
     * @param {string}  str         String to pad at the end.
     * @param {number}  maxLength   The resulting string max lenght.
     * @param {string}  fillStr     The new pad at the end (optional, defaults to ' ').
     * @returns {string}            End-padded string.
     */
    static padEnd(str: string, maxLength: number, fillStr?: string): string;
    /**
     * Generic string alignment.
     * @static
     * @param {number} direction The desired aligment direction according to the enum (left, right or center).
     * @param {*} value The value to align.
     * @param {number} len The maximum alignment length.
     * @param {string} pad The pad char (optional, defaults to ' ').
     * @returns {string} Aligned string.
     */
    static align(direction: number, value: any, len: number, pad?: string): string;
    /**
     * Left string alignment.
     * @static
     * @param {*} value The value to align.
     * @param {number} len The maximum alignment length.
     * @param {string} [pad] The pad char (optional, defaults to ' ').
     * @returns {string} Left aligned string.
     */
    static alignLeft(value: any, len: number, pad?: string): string;
    /**
     * Right string alignment.
     * @static
     * @param {*} value The value to align.
     * @param {number} len The maximum alignment length.
     * @param {string} [pad] The pad char (optional, defaults to ' ').
     * @returns {string} Right aligned string.
     */
    static alignRight(value: any, len: number, pad?: string): string;
    /**
     * Center string alignment.
     * @static
     * @param {*} value The value to align.
     * @param {number} len The maximum alignment length.
     * @param {string} [pad] The pad char (optional, defaults to ' ').
     * @returns {string} Center aligned string.
     */
    static alignCenter(value: any, len: number, pad?: string): string;
    /**
     * Attempt to do intelligent alignment of provided value (string inputs will be left aligned, number types will be right aligned).
     * @static
     * @param {*} value The value to align.
     * @param {number} len The maximum alignment length.
     * @param {string} [pad] The pad char (optional, defaults to ' ').
     */
    static alignAuto(value: any, len: number, pad?: string): string;
    /**
     * Wraps a string into multiple lines of a limited width.
     * @param {string} str      The string to wrap.
     * @param {number} maxWidth The maximum width for the wrapped string.
     * @returns {string}        The wrapped string.
     */
    static wordWrap(str: string, maxWidth: number): string;
    /**
     * Wraps a string into multiple lines of a limited width (simple string, no ANSI chars).
     * @param {string} str      The string to wrap.
     * @param {number} maxWidth    The maximum width for the wrapped string.
     * @returns {string}        The wrapped string.
     */
    static wordWrapBasic(str: string, maxWidth: number): string;
    /**
     * Truncates a string up to a maximum number of characters (if needed).
     * In case of truncation, '...' are appended to the end of the string.
     * @static
     * @param {string} str The string to truncate.
     * @param {number} maxSize The string maximum size.
     * @returns {string} The truncated string.
     */
    static truncateString(str: string, maxSize: number): string;
    /**
     * Create a new array at the given len, filled with the given value, mainly used internally.
     * @static
     * @param {number} len Length of array.
     * @param {*} [value] The fill value (optional).
     * @returns {*[]} Array filled with with desired value.
     */
    static arrayFill(len: number, value?: any): any[];
    /**
     * Increases existing array size up to the desired limit.
     * @static
     * @param {*[]} array The array to increase.
     * @param {number} len The desired array size.
     * @param {*} [value] The fill value (optional).
     */
    static arrayResize(array: any[], len: number, value?: any): void;
    /**
     * Default constructor.
     * @param {string} [title] The table title (optional).
     */
    constructor(title?: string);
    /** @type {Style[]} */
    styles: Style[];
    /**
     * Sets the output style for this table instance.
     * @param {string} name The desired style name (defaults to "ramac" if not found).
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    setStyle(name: string): AsciiTable3;
    style: any;
    /**
     * Gets the output style for this table instance.
     * @returns {Style} The current table style settings.
     */
    getStyle(): Style;
    /**
     * Gets all available pre-defined styles for this table.
     * @returns {Style[]} Array of predefined border styles.
     */
    getStyles(): Style[];
    /**
     * Adds a new style to the style library.
     * @param {Style} style The style object to add.
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    addStyle(style: Style): AsciiTable3;
    /**
     * Removes border from table.
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    removeBorder(): AsciiTable3;
    /**
     * Clear / reset all table data.
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    clear(): AsciiTable3;
    dataAlign: any;
    colWidths: number[];
    wrapping: any;
    /**
     * Reset all row data, maintains title and headings.
     * @returns {object} The AsciiTable3 object instance.
     */
    clearRows(): object;
    rows: any[];
    /**
     * Title setter.
     * @param {string} title The title to set (optional, defaults to '').
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    setTitle(title?: string): AsciiTable3;
    title: string;
    /**
     * Title getter.
     * @returns {string} The table title.
     */
    getTitle(): string;
    /**
     * Title alignment setter.
     * @param {number} direction The desired title aligment direction according to the enum (left, right or center).
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    setTitleAlign(direction: number): AsciiTable3;
    titleAlignment: number;
    /**
     * Left title alignment setter.
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    setTitleAlignLeft(): AsciiTable3;
    /**
     * Right title alignment setter.
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    setTitleAlignRight(): AsciiTable3;
    /**
     * Center title alignment setter.
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    setTitleAlignCenter(): AsciiTable3;
    /**
     * Title alignment getter.
     * @returns {number} The table title alignment direction.
     */
    getTitleAlign(): number;
    /**
     * Table heading setter.
     * @param {*[]} args Headings to set.
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    setHeading(...args: any[]): AsciiTable3;
    heading: any;
    /**
     * Table heading getter.
     * @returns {*[]} Array with heading values.
     */
    getHeading(): any[];
    /**
     * Heading alignment setter.
     * @param {number} direction The desired heading aligment direction according to the enum (left, right or center).
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    setHeadingAlign(direction: number): AsciiTable3;
    headingAlign: number;
    /**
     * Left heading alignment setter.
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    setHeadingAlignLeft(): AsciiTable3;
    /**
     * Right heading alignment setter.
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    setHeadingAlignRight(): AsciiTable3;
    /**
     * Center heading alignment setter.
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    setHeadingAlignCenter(): AsciiTable3;
    /**
     * Heading alignment getter.
     * @returns  {number} The instance heading alignment.
     */
    getHeadingAlign(): number;
    /**
     * Table row adder.
     * @param {*[]} args Row cell values to set.
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    addRow(...args: any[]): AsciiTable3;
    /**
     * Adds row to table only if all numeric values are not 0 (zero).
     * @param {*[]} args Row cell values to set.
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    addNonZeroRow(...args: any[]): AsciiTable3;
    /**
     * Bulk addRow operation.
     * @param {*[][]} rows Multidimensional array of rows.
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    addRowMatrix(rows: any[][]): AsciiTable3;
    /**
     * Table rows getter.
     * @returns {*[]} Array with row cell values (column array).
     */
    getRows(): any[];
    /**
     * Sets cell value for this row and column combination.
     * @param {number} row Desired row number (1-based index).
     * @param {number} col Desired column number (1-based index).
     * @param {*} value The cell value to set.
     */
    setCell(row: number, col: number, value: any): void;
    /**
     * Gets cell value for this row and column combination.
     * @param {number} row Desired row number (1-based index).
     * @param {number} col Desired column number (1-based index).
     * @returns {*} The cell value.
     */
    getCell(row: number, col: number): any;
    /**
     * Sets the preset width for a given column rendering output.
     * @param {number} idx Column index to align (starts at 1).
     * @param {number} width The maximum width for this column (in characters).
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    setWidth(idx: number, width: number): AsciiTable3;
    /**
     * Gets the preset width for a given column rendering output.
     * @param {number} idx Column index to align (starts at 1).
     * @returns {number} The maximum rendered size for this column.
     */
    getWidth(idx: number): number;
    /**
     * Sets the present widths for each column using an array.
     * @param {number[]} widths Array with widths for columns.
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    setWidths(widths: number[]): AsciiTable3;
    /**
     * Gets the present widths for each column (if any).
     * @returns {number[]} Array with widths for columns.
     */
    getWidths(): number[];
    /**
     * Sets the internal cell margin (in characters)
     * @param {number} margin
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    setCellMargin(margin: number): AsciiTable3;
    cellMargin: number;
    /**
     * Gets the internal cell margin (in characters)
     * @returns {number} The cell margin in characters.
     */
    getCellMargin(): number;
    /**
     * Sets the alignment direction for a given column.
     * @param {number} idx Column index to align (starts at 1).
     * @param {number} direction Desired alignment direction.
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    setAlign(idx: number, direction: number): AsciiTable3;
    /**
     * Get the alignment direction for a given column.
     * @param {number} idx Column index to align (starts at 1).
     * @returns {number} The alignment set for a column.
     */
    getAlign(idx: number): number;
    /**
     * Sets the alignment direction for all table columns.
     * @param {number[]} directions Desired alignment directions.
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    setAligns(directions: number[]): AsciiTable3;
    /**
     * Gets the alignment direction for all columns.
     * @returns {number[]} Array with alignment settings for all columns.
     */
    getAligns(): number[];
    /**
     * Sets left alignment direction for a given column.
     * @param {number} idx Column index to align (starts at 1).
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    setAlignLeft(idx: number): AsciiTable3;
    /**
     * Sets right alignment direction for a given column.
     * @param {number} idx Column index to align (starts at 1).
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    setAlignRight(idx: number): AsciiTable3;
    /**
     * Sets center alignment direction for a given column.
     * @param {number} idx Column index to align (starts at 1).
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    setAlignCenter(idx: number): AsciiTable3;
    /**
     * Sets the wrapping property for a specific column (wrapped content will generate more than one data row if needed).
     * @param {number} idx Column index to align (starts at 1).
     * @param {boolean} wrap Whether to wrap the content (default is true).
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    setWrapped(idx: number, wrap?: boolean): AsciiTable3;
    /**
     * Gets the wrapping setting for a given column.
     * @param {number} idx Column index to get wrapping (starts at 1).
     */
    isWrapped(idx: number): boolean;
    /**
     * Sets wrapping for all table columns.
     * @param {boolean[]} wrapping Boolean array of wrapping settings.
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    setWrappings(wrappings: any): AsciiTable3;
    /**
     * Gets the wrapping settings for all columns.
     * @returns {boolean[]} Array with wrapping settings for all columns.
     */
    getWrappings(): boolean[];
    /**
     * Justify all columns to be the same width.
     * @param {boolean} enabled Boolean for turning justify on or off (default is true).
     */
    setJustify(enabled?: boolean): AsciiTable3;
    justify: boolean;
    /**
     * Returns whether all columns are to be rendered with the same width.
     * @returns {boolean} Whether all columns are to be rendered with the same width.
     */
    isJustify(): boolean;
    /**
     * Transposes table by exchanging rows for columns.
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    transpose(): AsciiTable3;
    /**
     * Return the JSON representation of the table, this also allows us to call JSON.stringify on the instance.
     * @returns {string} The table JSON representation.
     */
    toJSON(): string;
    /**
     * Populate the table from json object, should match the toJSON output above.
     * @param {TableJSON} obj Object with table definition according to JSON structure.
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    fromJSON(obj: TableJSON): AsciiTable3;
    /**
  * Sorts the table rows based on a specific methods.
  * @param {function} func The comparison function to use when sorting.
  * @returns {AsciiTable3} The AsciiTable3 object instance.
  */
    sort(func: Function): AsciiTable3;
    /**
     * Sorts the table rows based on specific methods for a column.
     * @param {number} idx  The column number to base sort on (starts at 1).
     * @param {function} func The comparison function to use when sorting (optional, for compatibility with AsciiTable).
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    sortColumn(idx: number, func?: Function): AsciiTable3;
    /**
     * Reverse sorts the table rows based on specific methods for a column.
     * @param {number} idx  The column number to base sort on (starts at 1).
     * @returns {AsciiTable3} The AsciiTable3 object instance.
     */
    sortColumnDesc(idx: number): AsciiTable3;
    /**
    * Get the column sizes for table rendering (in characters).
    * @private
    * @returns {number[]} Array with column sizes for rendering.
    */
    private getColumnsWidth;
    /**
     * Get string with the rendering of a horizontal line.
     * @private
     * @param {SectionStyle} posStyle The line style for the desired position (between top, middle and bottom).
     * @param {number[]} colsWidth Array with the desired width for each data column.
     * @returns {string} String representation of table horizontal line.
     */
    private getHorizontalLine;
    /**
     * Get array of wrapped row data from a "normal" row.
     * @private
     * @param {*[]} row Row of data.
     * @returns {string[]}  Array of data rows after word wrapping.
     */
    private getWrappedRows;
    /**
     * Get string with the rendering of a heading row (truncating if needed).
     * @private
     * @param {Style} posStyle The heading row style.
     * @param {number[]} colsWidth Array with the desired width for each heading column.
     * @param {string} row The heading row to generate.
     * @returns {string} String representation of table heading row line.
     */
    private getHeadingRowTruncated;
    /**
     * Get string with the rendering of a heading row.
     * @private
     * @param {Style} posStyle The heading row style.
     * @param {number[]} colsWidth Array with the desired width for each heading column.
     * @returns {string} String representation of table heading row line.
     */
    private getHeadingRow;
    /**
     * Get string with the rendering of a data row (truncating if needed).
     * @private
     * @param {Style} posStyle The data row style.
     * @param {number[]} colsWidth Array with the desired width for each data column.
     * @param {*[]} row Array with cell values for this row.
     * @returns {string} String representation of table data row line.
     */
    private getDataRowTruncated;
    /**
     * Get string with the rendering of a data row (please not that it may result in several rows, depending on wrap settings).
     * @private
     * @param {Style} posStyle The data row style.
     * @param {number[]} colsWidth Array with the desired width for each data column.
     * @param {*[]} row Array with cell values for this row.
     * @returns {string} String representation of table data row line.
     */
    private getDataRow;
    /**
     * Render the instance as a string for output.
     * @returns {string} String rendiring of this instance table.
     */
    toString(): string;
}
export namespace AlignmentEnum {
    const LEFT: number;
    const RIGHT: number;
    const CENTER: number;
    const AUTO: number;
}
