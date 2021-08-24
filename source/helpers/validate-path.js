import chalk from 'chalk';
import { ERROR_CODES } from '../constants/index.js';

/**
 *  @Helper
 *  @Input:
 *    - path: Input path from user
 *  @Output:
 *    - return:
 *      - path: If the path is valid
 *      - throw new Error if the path is invalid
 */

export default (path, logger) => {
  if (typeof path === 'string' && path && new RegExp(/[A-Z]:[/\\].+/).test(path)) {
    return true;
  }
  logger.error(
    `Invalid value '${path}' for option --path ${
      chalk.white('\nType get-lock-screen -h for usage')}`,
    { errorCode: ERROR_CODES.VALIDATION_ERROR_001, field: 'path' },
  );
  return false;
};
