import chalk from 'chalk';
import {
  getSavePath, trimQuotes, validateFormat,
} from '../helpers';
import { ERROR_CODES, OUTPUT_FORMAT_TEXT } from '../constants';
import printJsonOutput from '../helpers/print-json-output';

/* Action that retrieve user's configurations and display */
export default function (args, options, logger) {
  // eslint-disable-next-line no-param-reassign
  logger = logger.child({ callerFunction: 'actions:show-settings' });
  const format = trimQuotes(typeof options.format === 'string'
    ? options.format
    : OUTPUT_FORMAT_TEXT);
  if (format && !validateFormat(format, logger)) {
    return printJsonOutput(logger);
  }
  const currentSavePath = getSavePath();
  if (currentSavePath) {
    logger.info(
      `\nImage saved folder(Ctrl + click to open): ${chalk.cyan(`file://${currentSavePath}`)}`,
      { isMessage: true },
    );
    return printJsonOutput(logger);
  }
  logger.error(
    'No user settings has been recorded yet, try getting the images first.'
    + `${chalk.white('\nType "get-lock-screen -h" for help')}`,
    { errorCode: ERROR_CODES.RUNTIME_ERROR_004 },
  );
  return printJsonOutput(logger);
}
