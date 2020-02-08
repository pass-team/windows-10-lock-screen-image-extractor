/* eslint quotes: ["error", "single"] */
module.exports = {
  rootDir: './../../..',
  cacheDirectory: '<rootDir>/.cache/jest',
  testMatch: ['<rootDir>/tests/unit/**/*.test.js'],
  collectCoverageFrom: [
    '<rootDir>/source/helpers/*.js',
  ],
};
