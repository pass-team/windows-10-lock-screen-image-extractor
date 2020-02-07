/* eslint quotes: ["error", "single"] */
module.exports = {
  rootDir: './../..',
  verbose: true,
  transform: {
    '.+.js?$': 'babel-jest',
  },
  projects: [
    '<rootDir>/config/jest/unit/jest.js',
    '<rootDir>/config/jest/integration/jest.js',
  ],
};
