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
  validateFormat,
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
    logger.error(chalk.redBright(`${ERROR_CODES.VALIDATION_ERROR_001}: Invalid JSON content for option --config`));
    logger.error(chalk.redBright('Type get-lock-screen -h for usage'));
  }
  return null;
};

export default async (process, logger) => {
  const isConfigedAsJson = (yargs.argv.config || yargs.argv.c);
  if (isConfigedAsJson) {
    const configObject = deserialize(isConfigedAsJson, logger);
    if (!configObject) return false;

    // Validate extracted options from JSON config cuz this process happens before caporal's initialization
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

    Promise.all(validators).then((checks) => {
      if (!checks.every((check) => check)) {
        process.exit(1);
      }
    });

    // Flatten config object to array for passing as process args
    const args = objectToArguments(configObject);
    process.argv = process.argv.slice(0, 2).concat(args);
  }
  return true;
};
