import chalk from 'chalk';
import {
  getSavePath, validateOutput,
} from '../helpers';
import { ERROR_CODES } from '../constants';
import printJsonOutput from '../helpers/print-json-output';

/* Action that retrieve user's configurations and display */
export default function (args, options, logger) {
  const { output } = options;
  if (!validateOutput(output, logger)) {
    return printJsonOutput(logger);
  }
  const currentSavePath = getSavePath();
  if (currentSavePath) {
    logger.info('\nImage saved folder(Ctrl + click to open):');
    logger.info(chalk.cyan(`file://${currentSavePath}`));
    return printJsonOutput(logger);
  }
  logger.error(
    'No user settings has been recorded yet, try getting the images first.'
      + `${chalk.white('\nType "get-lock-screen -h" for help')}`,
    { errorCode: ERROR_CODES.RUNTIME_ERROR_004 },
  );
  return printJsonOutput(logger);
}
