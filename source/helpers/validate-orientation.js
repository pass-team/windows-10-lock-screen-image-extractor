import chalk from 'chalk';
import {
  ERROR_CODES,
  ORIENTATION_ALL,
  ORIENTATION_LANDSCAPE,
  ORIENTATION_PORTRAIT,
} from '../constants';

/**
 *  @Helper
 *  @Input:
 *    - path: Input orientation from user
 *  @Output:
 *    - return:
 *      - True: orientation is valid
 *      - False: orientation is invalid
 */

export default (orientation, logger) => new Promise((resolve) => {
  const allowedValues = [ORIENTATION_LANDSCAPE, ORIENTATION_PORTRAIT, ORIENTATION_ALL];
  if (!allowedValues.includes(orientation)) {
    logger.error(
      chalk.redBright(`${ERROR_CODES.VALIDATION_ERROR_001}: Invalid value '${orientation}' for option --orientation`),
    );
    logger.error(chalk.white('Type get-lock-screen -h for usage'));
    resolve(false);
  }
  resolve(true);
});
