import minimist from 'minimist';
import casex from 'casex';
import chalk from 'chalk';
import { log } from 'winston';
import {
  ALLOWED_OPTIONS,
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

const isCommandAllowed = (configObject, logger) => {
  if (ALLOWED_OPTIONS[configObject.command]) return true;
  logger.error(
    `Unknown command '${configObject.command}'.`
    + `${chalk.white('\nType get-lock-screen -h for usage')}`,
    { errorCode: ERROR_CODES.VALIDATION_ERROR_003, field: 'command' },
  );
  return false;
};

const areOptionsAllowed = (configObject, logger) => {
  const notAllowedOptions = configObject.options ? Object.keys(configObject.options)
    .filter((option) => !ALLOWED_OPTIONS[configObject.command].includes(option)) : [];
  // If any print out error for each false option and return false
  if (notAllowedOptions.length === 0) return true;
  notAllowedOptions.forEach((option) => {
    logger.error(
      `Unknown option '${option}'.`
      + `${chalk.white('\nType get-lock-screen -h for usage')}`,
      { errorCode: ERROR_CODES.VALIDATION_ERROR_002, field: option },
    );
  });
  return false;
};

const validateOptions = (configObject, logger) => {
  const validators = [];
  if (configObject.options?.path) validators.push(validatePath(configObject.options.path, logger));
  if (configObject.options?.orientation) validators.push(validateOrientation(configObject.options.orientation, logger));
  if (configObject.options?.namePattern) validators.push(validateNamePattern(configObject.options.namePattern, logger));
  if (configObject.options?.format) validators.push(validateFormat(configObject.options.format, logger));
  return validators.every((validator) => validator);
};

const overrideProcessArgs = (configObject) => {
  const args = objectToArguments(configObject);
  process.argv = process.argv.slice(0, 2).concat(args);
};

export default (logger) => {
  const processArgs = minimist(process.argv.slice(2));
  const config = processArgs.config || processArgs['config-file'];
  if (config) {
    // Try validate as JSON string first then as file, if both return null => return false
    let configObject = null;
    if (processArgs.config) configObject = parseConfig(config, logger);
    if (processArgs['config-file']) configObject = parseConfigFile(config, logger);
    if (!configObject) return false;
    // Validate commands and options
    if (!isCommandAllowed(configObject, logger)) return false;
    if (!areOptionsAllowed(configObject, logger)) return false;
    if (!validateOptions(configObject, logger)) return false;

    // Flatten config object to array for passing as process args
    overrideProcessArgs(configObject);
  }
  return true;
};
