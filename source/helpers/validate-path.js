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

export default (path, logger) => new Promise((resolve) => {
  if (!new RegExp(/[A-Z]:[/\\].+/).test(path)) {
    logger.error(chalk.redBright(`${ERROR_CODES.VALIDATION_ERROR_001}: Invalid value '${path}' for option --path`));
    logger.error(chalk.white('Type get-lock-screen -h for usage'));
    resolve(false);
  }
  resolve(true);
});
