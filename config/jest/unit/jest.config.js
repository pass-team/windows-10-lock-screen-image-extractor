/* eslint quotes: ["error", "single"] */
module.exports = {
  rootDir: './../../..',
  cacheDirectory: '<rootDir>/.cache/jest',
  testMatch: ['<rootDir>/tests/unit-tests/**/*.test.js'],
  collectCoverageFrom: [
    '<rootDir>/source/**/*.js',
  ],
};
