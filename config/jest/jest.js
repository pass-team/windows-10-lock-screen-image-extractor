/* eslint quotes: ["error", "single"] */
const esModules = ['strip-ansi'].join('|');

module.exports = {
  rootDir: './../..',
  verbose: true,
  transform: {
    '.+.js?$': 'babel-jest',
  },
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  projects: [
    '<rootDir>/config/jest/unit/jest.js',
    '<rootDir>/config/jest/integration/jest.js',
  ],
};
