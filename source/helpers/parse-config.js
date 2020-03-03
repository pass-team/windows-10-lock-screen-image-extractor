import chalk from 'chalk';
import { ERROR_CODES } from '../constants';
/**
 *  @Helper
 *  @Input:
 *    - config: Input config from user
 *  @Output:
 *    - return:
 *      - config: If the config is valid
 *      - throw new Error if the config is invalid
 */

export default (config, logger) => {
  try {
    return JSON.parse(config);
  } catch (e) {
    logger.error(
      'Invalid JSON content for option --config'
      + `${chalk.white('\nType get-lock-screen -h for usage')}`,
      { errorCode: ERROR_CODES.VALIDATION_ERROR_001, field: 'config' },
    );
  }
  return null;
};
