/* eslint quotes: ["error", "single"] */
export default {
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
