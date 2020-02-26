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

export default (orientation) => {
  const allowedValues = [ORIENTATION_LANDSCAPE, ORIENTATION_PORTRAIT, ORIENTATION_ALL];
  if (!allowedValues.includes(orientation)) {
    throw new Error(chalk.redBright(`${ERROR_CODES.ER01}: Invalid value '${orientation}' for option --orientation`
      + '\nType get-lock-screen -h for usage'));
  }
};
