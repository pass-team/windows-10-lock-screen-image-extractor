import jsonfile from 'jsonfile';
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
  validateOutput,
} from '.';

// Parse object props to arguments array
const objectToArguments = function (object) {
  const init = [object.command];
  return object.options ? Object
    .keys(object.options)
    .reduce((acc, key) => acc.concat([`--${casex(key, 'ca-se')}=${object.options[key]}`]), init) : init;
};

// Deserialize input (file or JSON string) to object, return null if content format is invalid
const deserialize = (input, logger) => {
  try {
    if (input.match(/.json$/, 'i')) {
      return jsonfile.readFileSync(input);
    }
    return JSON.parse(input);
  } catch (e) {
    logger.error(
      'Invalid JSON content for option --config'
      + `${chalk.white('\nType get-lock-screen -h for usage')}`,
      { errorCode: ERROR_CODES.VALIDATION_ERROR_001, field: 'config' },
    );
  }
  return null;
};

export default (logger) => {
  const isConfigedAsJson = (yargs.argv.config || yargs.argv.c);
  if (isConfigedAsJson) {
    const configObject = deserialize(isConfigedAsJson, logger);
    if (!configObject) return false;
    // Check allowed inputs
    const allowedOptions = {
      'get-images': ['path', 'orientation', 'namePattern', 'output', 'verbose'],
      'random-desktop': ['verbose', 'output'],
      'show-settings': ['verbose', 'output'],
    };

    // Check allowed command
    if (!allowedOptions[configObject.command]) {
      logger.error(
        `Unknown command '${configObject.command}'.`
        + `${chalk.white('\nType get-lock-screen -h for usage')}`,
        { errorCode: ERROR_CODES.VALIDATION_ERROR_003, field: 'command' },
      );
      return false;
    }
    // Check allowed command options
    const notAllowedOptions = Object.keys(configObject.options)
      .filter((option) => !allowedOptions[configObject.command].includes(option));
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
    if (configObject.options?.output) {
      validators.push(validateOutput(configObject.options?.output, logger));
    }
    if (!validators.every((validator) => validator)) {
      return false;
    }

    // Flatten config object to array for passing as process args
    const args = objectToArguments(configObject);
    process.argv = process.argv.slice(0, 2).concat(args);
  }
  return true;
};
