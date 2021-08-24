/* eslint quotes: ["error", "single"] */
const esModules = ['strip-ansi'].join('|');

export default {
  rootDir: './../../..',
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  cacheDirectory: '<rootDir>/.cache/jest',
  testMatch: ['<rootDir>/tests/integration/**/*.test.js'],
};
