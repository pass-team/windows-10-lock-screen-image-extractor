/* eslint quotes: ["error", "single"] */
export default {
  rootDir: './../../..',
  cacheDirectory: '<rootDir>/.cache/jest',
  testMatch: ['<rootDir>/tests/unit/**/*.test.js'],
  collectCoverageFrom: [
    '<rootDir>/source/**/*.js',
  ],
};
