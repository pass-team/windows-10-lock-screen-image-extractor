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

export default (format) => {
  if (!new RegExp(`${OUTPUT_FORMAT_TEXT}|${OUTPUT_FORMAT_JSON}|.+.json$|false`).test(format)) {
    throw new Error(chalk.redBright(`${ERROR_CODES.VALIDATION_ERROR_001}: Invalid value '${format}' for option --format`
      + '\nType get-lock-screen -h for usage'));
  }
};
