import chalk from 'chalk';

const extendedLogger = function (logger, prefix = '') {
  const customLogger = { ...logger };
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  customLogger.debug = function (message) {
    return customLogger.verbose(chalk.hex(randomColor)(`${prefix} ${message}`));
  };
  return customLogger;
};
export default extendedLogger;
