import chalk from 'chalk';
import { ERROR_CODES } from '../constants';

/**
 *  @Helper
 *  @Input:
 *    - path: Input path from user
 *  @Output:
 *    - return:
 *      - path: If the path is valid
 *      - throw new Error if the path is invalid
 */

export default (path) => {
  if (!new RegExp(/[A-Z]:[/\\].+/).test(path)) {
    throw new Error(chalk.redBright(`${ERROR_CODES.VALIDATION_ERROR_001}: Invalid value '${path}' for option --path`
      + '\nType get-lock-screen -h for usage'));
  }
};
