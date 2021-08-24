/* eslint quotes: ["error", "single"] */
const esModules = ['strip-ansi', 'ora'].join('|');

export default {
  rootDir: './../../..',
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  cacheDirectory: '<rootDir>/.cache/jest',
  testMatch: ['<rootDir>/tests/unit/**/*.test.js'],
  collectCoverageFrom: [
    '<rootDir>/source/**/*.js',
  ],
};
