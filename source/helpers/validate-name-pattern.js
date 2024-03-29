import chalk from 'chalk';
import {
  ERROR_CODES,
  IMAGE_NAME_FORMAT_DATE,
  IMAGE_NAME_FORMAT_HASH,
  IMAGE_NAME_FORMAT_ORIGIN,
} from '../constants/index.js';

/**
 *  @Helper
 *  @Input:
 *    - namePattern: Input name-pattern from user
 *  @Output:
 *    - return:
 *      - True: name-pattern is valid
 *      - False: name-pattern is invalid
 */

export default (namePattern, logger) => {
  const allowedValues = [IMAGE_NAME_FORMAT_ORIGIN, IMAGE_NAME_FORMAT_HASH, IMAGE_NAME_FORMAT_DATE];
  if (typeof namePattern === 'string' && namePattern && allowedValues.includes(namePattern)) {
    return true;
  }
  logger.error(
    `Invalid value '${namePattern}' for option --name-pattern.`
    + `${chalk.white('\nType get-lock-screen -h for usage')}`,
    { errorCode: ERROR_CODES.VALIDATION_ERROR_001, field: 'namePattern' },
  );
  return false;
};
