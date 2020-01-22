const chalk = require('chalk');
const {
  getSavePath,
  waitKeyToExit,
} = require('../helpers');

/* Action that retrieve user's configurations and display */
module.exports = function (args, options, logger) {
  const currentSavePath = getSavePath();
  logger.info('\nImage saving folder (Ctrl + click to open):');
  logger.info(chalk.cyan(`file://${currentSavePath}`));
  waitKeyToExit();
};
