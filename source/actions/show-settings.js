import chalk from 'chalk';
import {
  getSavePath,
} from '../helpers';
import waitKeyToExit from '../helpers/wait-key-to-exit';
import { ERROR_CODES } from '../constants';

/* Action that retrieve user's configurations and display */
export default function (args, options, logger) {
  const currentSavePath = getSavePath();
  if (currentSavePath) {
    logger.info('\nImage saved folder(Ctrl + click to open):');
    logger.info(chalk.cyan(`file://${currentSavePath}`));
  } else {
    logger.warn(chalk.redBright(`\n${ERROR_CODES.ER05}: `
      + 'No user settings has been recorded yet, try getting the images first'));
    logger.info(chalk.yellow('Run "get-lock-screen -h" for help'));
  }
  if (/^[\\/][a-zA-Z-]+\.exe$/.test(process.title.replace(process.cwd(), ''))) {
    waitKeyToExit();
  }
}
