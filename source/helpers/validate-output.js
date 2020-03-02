import chalk from 'chalk';
import { ERROR_CODES, OUTPUT_FORMAT_JSON } from '../constants';

/**
 *  @Helper
 *  @Input:
 *    - path: Output format received from user
 *  @Output:
 *    - return:
 *      - True: If the format is valid
 *      - throw new Error if the format is invalid
 */

export default (output, logger) => {
  if (!(output === OUTPUT_FORMAT_JSON || output.endsWith('.json'))) {
    logger.error(
      `Invalid value '${output}' for option --output.`
      + `${chalk.white('\nType get-lock-screen -h for usage')}`,
      { errorCode: ERROR_CODES.VALIDATION_ERROR_001, field: 'output' },
    );
    return false;
  }
  return true;
};
