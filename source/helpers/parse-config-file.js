import fs from 'fs';
import chalk from 'chalk';
import jsonfile from 'jsonfile';
import { ERROR_CODES } from '../constants/index.js';

/**
 *  @Helper
 *  @Input:
 *    - config: Input config file from user
 *  @Output:
 *    - return:
 *      - config: If the config is valid
 *      - print Error if the configFile  is invalid
 */

export default (configFile, logger) => {
  try {
    if (fs.existsSync(configFile)) {
      return jsonfile.readFileSync(configFile);
    }
    logger.error(
      `Invalid value '${configFile}' for option --config-file. ${
        chalk.white('\nType get-lock-screen -h for usage')}`,
      { errorCode: ERROR_CODES.VALIDATION_ERROR_001, field: 'config-file' },
    );
  } catch (e) {
    logger.error(
      `Invalid JSON content for option --config-file.\n${e.message}`
      + `${chalk.white('\nType get-lock-screen -h for usage')}`,
      { errorCode: ERROR_CODES.VALIDATION_ERROR_001, field: 'config-file' },
    );
  }
  return null;
};
