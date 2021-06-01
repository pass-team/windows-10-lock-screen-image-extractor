/* eslint quotes: ["error", "single"] */
const esModules = ['strip-ansi'].join('|');

module.exports = {
  rootDir: './../../..',
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  cacheDirectory: '<rootDir>/.cache/jest',
  testMatch: ['<rootDir>/tests/unit/**/*.test.js'],
  collectCoverageFrom: [
    '<rootDir>/source/**/*.js',
  ],
};
