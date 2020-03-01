import chalk from 'chalk';
import {
  ERROR_CODES,
  IMAGE_NAME_FORMAT_DATE,
  IMAGE_NAME_FORMAT_HASH,
  IMAGE_NAME_FORMAT_ORIGIN,
} from '../constants';

/**
 *  @Helper
 *  @Input:
 *    - namePattern: Input name-pattern from user
 *  @Output:
 *    - return:
 *      - True: name-pattern is valid
 *      - False: name-pattern is invalid
 */

export default (namePattern, logger) => new Promise((resolve) => {
  const allowedValues = [IMAGE_NAME_FORMAT_ORIGIN, IMAGE_NAME_FORMAT_HASH, IMAGE_NAME_FORMAT_DATE];
  if (!allowedValues.includes(namePattern)) {
    logger.error(
      chalk.redBright(`${ERROR_CODES.VALIDATION_ERROR_001}: Invalid value '${namePattern}' for option --name-pattern`),
    );
    logger.error(chalk.white('Type get-lock-screen -h for usage'));
    resolve(false);
  }
  resolve(true);
});
