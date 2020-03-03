import chalk from 'chalk';
import {
  getSavePath, trimQuotes, validateFormat,
} from '../helpers';
import { ERROR_CODES, OUTPUT_FORMAT_TEXT } from '../constants';
import printJsonOutput from '../helpers/print-json-output';

/* Action that retrieve user's configurations and display */
export default function (args, options, logger) {
  // eslint-disable-next-line no-param-reassign
  logger = logger.child({ caller: 'actions:show-settings' });
  const format = trimQuotes(typeof options.format === 'string'
    ? options.format
    : OUTPUT_FORMAT_TEXT);
  if (format && !validateFormat(format, logger)) {
    return printJsonOutput(logger, format);
  }
  const currentSavePath = getSavePath();
  if (currentSavePath) {
    logger.info('\nImage saved folder(Ctrl + click to open):');
    logger.info(chalk.cyan(`file://${currentSavePath}`));
    return printJsonOutput(logger, format);
  }
  logger.error(
    'No user settings has been recorded yet, try getting the images first.'
    + `${chalk.white('\nType "get-lock-screen -h" for help')}`,
    { errorCode: ERROR_CODES.RUNTIME_ERROR_004 },
  );
  return printJsonOutput(logger, format);
}
