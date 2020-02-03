const chalk = require('chalk');
const {
  getSavePath,
} = require('../helpers');

/* Action that retrieve user's configurations and display */
module.exports = function (args, options, logger) {
  const currentSavePath = getSavePath();
  if (currentSavePath) {
    logger.info('\nImage saved folder(Ctrl + click to open):');
    logger.info(chalk.cyan(`file://${currentSavePath}`));
  } else {
    logger.warn(chalk.yellow('\nNo user settings has been recorded yet, try getting the images first'
      + '\nRun "get-lock-screen -h" for usage'));
  }
};
