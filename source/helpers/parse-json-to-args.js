import yargs from 'yargs';
import casex from 'casex';
import chalk from 'chalk';
import {
  ERROR_CODES,
} from '../constants';
import {
  validateNamePattern,
  validateOrientation,
  validatePath,
  validateFormat, parseConfig, parseConfigFile,
} from '.';

// Parse object props to arguments array
const objectToArguments = function (object) {
  const init = [object.command];
  return object.options ? Object
    .keys(object.options)
    .reduce((acc, key) => acc.concat([`--${casex(key, 'ca-se')}=${object.options[key]}`]), init) : init;
};

export default (logger) => {
  console.log(yargs.argv.config);
  console.log(yargs.argv.configFile);
  const config = yargs.argv.config || yargs.argv.configFile;
  console.log(config);

  if (config) {
    // Try validate as JSON string first then as file, if both return null => return false
    let configObject = null;
    if (yargs.argv.config) configObject = parseConfig(config, logger);
    if (yargs.argv.configFile) configObject = parseConfigFile(config, logger);
    if (!configObject) return false;

    // Check allowed inputs
    const allowedOptions = {
      'get-images': ['path', 'orientation', 'namePattern', 'format', 'verbose'],
      'random-desktop': ['verbose', 'format'],
      'show-settings': ['verbose', 'format'],
    };

    // Check if command is allowed, return false if not
    if (!allowedOptions[configObject.command]) {
      logger.error(
        `Unknown command '${configObject.command}'.`
        + `${chalk.white('\nType get-lock-screen -h for usage')}`,
        { errorCode: ERROR_CODES.VALIDATION_ERROR_003, field: 'command' },
      );
      return false;
    }

    // Check allowed command options
    // Get not allowed options for that command
    const notAllowedOptions = configObject.options ? Object.keys(configObject.options)
      .filter((option) => !allowedOptions[configObject.command].includes(option)) : [];
    // If any print out error for each false option and return false
    if (notAllowedOptions.length > 0) {
      notAllowedOptions.forEach((option) => {
        logger.error(
          `Unknown option '${option}'.`
          + `${chalk.white('\nType get-lock-screen -h for usage')}`,
          { errorCode: ERROR_CODES.VALIDATION_ERROR_002, field: option },
        );
      });
      return false;
    }

    // Validate options
    const validators = [];
    if (configObject.options?.path) {
      validators.push(validatePath(configObject.options?.path, logger));
    }
    if (configObject.options?.orientation) {
      validators.push(validateOrientation(configObject.options?.orientation, logger));
    }
    if (configObject.options?.namePattern) {
      validators.push(validateNamePattern(configObject.options?.namePattern, logger));
    }
    if (configObject.options?.format) {
      validators.push(validateFormat(configObject.options?.format, logger));
    }
    if (!validators.every((validator) => validator)) return false;

    // Flatten config object to array for passing as process args
    const args = objectToArguments(configObject);
    process.argv = process.argv.slice(0, 2).concat(args);
  }
  return true;
};
