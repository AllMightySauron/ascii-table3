# Changelog

Release notes are derived from the GitHub release descriptions and local tag
messages for `AllMightySauron/ascii-table3`.

## 1.0.3 - 2026-05-13

- Fixed `toJSON()` to return a JSON object instead of a serialized JSON string.
- Replaced JSHint with ESLint for project linting.
- Scoped linting to first-party JavaScript sources, tests, and sample files.
- Added `chalk` as a development dependency for tests and sample scripts.
- Bumped development dependencies for Mocha and NYC.
- Removed obsolete JSHint file pragmas.
- Fixed semicolon lint findings in source files.

## 1.0.2 - 2026-05-12

- Fixed alignment and titles for markdown tables
- CHANGELOG.md created

## 1.0.1 - 2025-06-16

- Removed old dependency for `fs`.

## 1.0.0 - 2025-06-02

- Updated compatibility with bundling tools such as webpack, React, and Bun compile.
- Bumped dependencies.

## 0.9.0 - 2023-10-15

- Fixed styles filename resolution for Bun.

## 0.8.2 - 2023-01-13

- Fixed alignment bug for consecutive blocks of non-printable characters.

## 0.8.1 - 2023-01-11

- Fixed crash on non-ASCII table content.

## 0.8.0 - 2022-11-25

- Bumped dependencies.
- Added TypeScript support.

## 0.7.8 - 2022-11-03

- Added support for the `unicode-round` style.

## 0.7.7 - 2022-08-05

- Added a sanity check for unknown styles in `setStyle()`.

## 0.7.6 - 2022-04-20

- Fixed license metadata in `package.json`.

## 0.7.5 - 2022-04-20

- Moved to Apache licensing.

## 0.7.4 - 2022-03-23

- Applied audit fixes.
- Updated documentation.

## 0.7.3 - 2022-03-03

- Cleaned up code.

## 0.7.2 - 2022-02-24

- Removed `replaceAll()` due to compatibility issues.

## 0.7.1 - 2022-02-24

- Added full support for ANSI escape codes.

## 0.7.0 - 2021-12-25

- Added preliminary support for coloring using ANSI escape sequences.

## 0.6.3 - 2021-12-23

- Added `engines` metadata to `package.json` due to use of `module.path`.

## 0.6.2 - 2021-10-08

- Updated the Travis CI build status link.

## 0.6.1 - 2021-10-08

- Added coverage.
- Added a sanity check for empty tables in `transpose()`.

## 0.6.0 - 2021-10-06

- Added support for `transpose()`.

## 0.5.4 - 2021-10-04

- Fixed small documentation issues.

## 0.5.3 - 2021-09-15

- Corrected minor type definition issues.

## 0.5.2 - 2021-08-02

- Improved error handling.

## 0.5.1 - 2020-12-23

- Fixed documentation.
- Cleaned up code.

## 0.5.0 - 2020-12-14

- Added full serialization.
- Added descending sort support for columns.
- Cleaned up code.

## 0.4.6 - 2020-11-19

- Added more styles.
- Added samples.
- Cleaned up code.

## 0.4.5 - 2020-11-18

- Added support for `setJustify()`.

## 0.4.1 - 2020-11-17

- Added coverage.

## 0.4.0 - 2020-11-17

- Added support for column content wrapping.

## 0.3.0 - 2020-11-13

- Added new styles.

## 0.2.0 - 2020-11-13

- Added unit testing for `addStyle()`.

## 0.1.2 - 2020-11-13

- Added `addNonZeroRow()`.

## 0.1.1 - 2020-11-13

- Added smaller-width unit testing.

## 0.1.0 - 2020-11-12

- Updated documentation for `setCellMargin()`.

## 0.0.6 - 2020-11-12

- Added support for cell margin.

## 0.0.5 - 2020-11-12

- Cleaned up code.
- Updated documentation.

## 0.04 - 2020-11-11

- Fixed `index.js`.

## 0.0.3 - 2020-11-11

- Fixed styles loading to support module paths.

## 0.0.2 - 2020-11-11

- Updated release.

## 0.0.1 - 2020-11-11

- Initial release.
