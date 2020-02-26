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
 *    - path: Input name-pattern from user
 *  @Output:
 *    - return:
 *      - True: name-pattern is valid
 *      - False: name-pattern is invalid
 */

export default (namePattern) => {
  const allowedValues = [IMAGE_NAME_FORMAT_ORIGIN, IMAGE_NAME_FORMAT_HASH, IMAGE_NAME_FORMAT_DATE];
  if (!allowedValues.includes(namePattern)) {
    throw new Error(chalk.redBright(`${ERROR_CODES.ER01}: Invalid value '${namePattern}' for option --name-pattern`
      + '\nType get-lock-screen -h for usage'));
  }
};
