const { exec } = require('pkg');
const chalk = require('chalk');
const { HOME_DIR } = require('../constants');

/* Action that pack the app into one single Windows executable file */
module.exports = async function (args, options, logger) {
  const output = `${HOME_DIR}\\w10-lock-screen-extractor.exe`;
  logger.info(chalk.cyan('\nStart packing app...'));
  await exec([
    '../bin/get-lock-screen-image.js',
    '--target', 'node8',
    '--targets', 'win-x86',
    '--output', output,
  ]);
  logger.info(chalk.green(`Success! Exe file was saved to: ${chalk.underline.cyan(`file://${HOME_DIR}`)}`));
};
