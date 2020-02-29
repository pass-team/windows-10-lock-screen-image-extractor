import jsonfile from 'jsonfile';
import yargs from 'yargs';
import casex from 'casex';
import chalk from 'chalk';
import {
  ERROR_CODES,
} from '../constants';
import {
  validateFormat,
  validateNamePattern,
  validateOrientation,
  validatePath,
} from '.';

// Parse object props to arguments array
const objectToArguments = function (object) {
  const init = [object.command];
  return object.options ? Object
    .keys(object.options)
    .reduce((acc, key) => acc.concat([`--${casex(key, 'ca-se')}=${object.options[key]}`]), init) : init;
};

// Deserialize input (file or JSON string) to object, return null if content format is invalid
const deserialize = (input) => {
  try {
    if (input.match(/.json$/, 'i')) {
      return jsonfile.readFileSync(input);
    }
    return JSON.parse(input);
  } catch (e) {
    console.log(chalk.redBright(`${ERROR_CODES.VALIDATION_ERROR_001}: Invalid value '${input}' for option --config`
      + '\nType get-lock-screen -h for usage'));
  }
  return null;
};

export default () => {
  const configJsonInput = (yargs.argv.config || yargs.argv.c);
  if (configJsonInput) {
    const configObject = deserialize(configJsonInput);
    console.log(configObject);
    if (!configObject) return false;
    // Validate extracted options from JSON config cuz this process happens before caporal's initialization
    if (configObject.options?.path) validatePath(configObject.options?.path);
    if (configObject.options?.orientation) validateOrientation(configObject.options?.orientation);
    if (configObject.options?.namePattern) validateNamePattern(configObject.options?.namePattern);
    if (configObject.options?.format) validateFormat(configObject.options?.format);
    // Flatten config object to array for passing as process args
    const args = objectToArguments(configObject);
    process.argv = process.argv.slice(0, 2).concat(args);
  }
  return true;
};
