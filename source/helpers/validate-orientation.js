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

export default (orientation, logger) => {
  const allowedValues = [ORIENTATION_LANDSCAPE, ORIENTATION_PORTRAIT, ORIENTATION_ALL];
  if (typeof orientation === 'string' && orientation && allowedValues.includes(orientation)) return true;
  logger.error(
    `Invalid value '${orientation}' for option --orientation`
    + `${chalk.white('\nType get-lock-screen -h for usage')}`,
    { errorCode: ERROR_CODES.VALIDATION_ERROR_001, field: 'orientation' },
  );
  return false;
};
