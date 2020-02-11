import chalk from 'chalk';

module.exports = function () {
  console.log(chalk.cyan('\nPress any key to exit..'));
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.on('data', process.exit.bind(process, 0));
};
