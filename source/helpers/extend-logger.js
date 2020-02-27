import winston from 'winston';
import chalk from 'chalk';

export default (transport = new winston.transports.Console()) => winston.createLogger({
  transports: [transport],
  format: winston.format.combine(
    winston.format.ms(),
    winston.format.printf((log) => (log.level.indexOf('debug') !== -1
      ? chalk.magenta(`${log.caller ? `${log.caller}: ` : ''}${log.message} ${log.ms}`)
      : log.message)),
  ),
});
