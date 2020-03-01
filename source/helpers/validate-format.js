import chalk from 'chalk';
import { ERROR_CODES, OUTPUT_FORMAT_TEXT, OUTPUT_FORMAT_JSON } from '../constants';

/**
 *  @Helper
 *  @Input:
 *    - path: Output format received from user
 *  @Output:
 *    - return:
 *      - True: If the format is valid
 *      - throw new Error if the format is invalid
 */

export default (format, logger) => new Promise((resolve) => {
  if (!new RegExp(`${OUTPUT_FORMAT_TEXT}|${OUTPUT_FORMAT_JSON}|.+.json$|false`).test(format)) {
    logger.error(chalk.redBright(`${ERROR_CODES.VALIDATION_ERROR_001}: Invalid value '${format}' for option --format`));
    logger.error(chalk.white('Type get-lock-screen -h for usage'));
    resolve(false);
  }
  resolve(true);
});
