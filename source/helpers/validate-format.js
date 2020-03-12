import chalk from 'chalk';
import {
  ERROR_CODES,
  OUTPUT_FORMAT_JSON,
  OUTPUT_FORMAT_TEXT,
} from '../constants';

/**
 *  @Helper
 *  @Input:
 *    - path: Output format received from user
 *  @Output:
 *    - return:
 *      - True: If the format is valid
 *      - throw new Error if the format is invalid
 */

export default (format, logger) => {
  const allowedValues = [OUTPUT_FORMAT_JSON, OUTPUT_FORMAT_TEXT];
  if (typeof format === 'string' && format && allowedValues.includes(format)) {
    return true;
  }
  logger.error(
    `Invalid value '${format}' for option --format.`
      + `${chalk.white('\nType get-lock-screen -h for usage')}`,
    { errorCode: ERROR_CODES.VALIDATION_ERROR_001, field: 'format' },
  );
  return false;
};
