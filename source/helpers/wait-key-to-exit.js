/* eslint-disable global-require, no-console, no-unused-expressions */
import chalk from 'chalk';

module.exports = function () {
  console.log(chalk.cyan('\nPress any key to exit..'));
  if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
  }
  process.stdin.resume();
  process.stdin.on('data', process.exit.bind(process, 0));
};
