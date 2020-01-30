/* eslint-disable global-require, no-console */

const chalk = require('chalk');

module.exports = function () {
  console.log(chalk.cyan('\nPress any key to exit..'));
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.on('data', process.exit.bind(process, 0));
};
