import winston from 'winston';
import chalk from 'chalk';
import { LOG_LEVELS } from '../constants';

const extendLogger = (transport = new winston.transports.Console()) => winston.createLogger({
  transports: [transport],
  exceptionHandlers: [transport],
  format: winston.format.combine(
    winston.format.ms(),
    winston.format.printf((log) => {
      switch (log.level) {
        case LOG_LEVELS.INFO:
          if (log.isMessage) {
            return chalk.green(log.message);
          }
          return log.message;
        case LOG_LEVELS.WARN:
          return chalk.yellow(log.message);
        case LOG_LEVELS.ERROR:
          return `${chalk.redBright(log.errorCode ? `\n${log.errorCode}: ` : '')}${chalk.redBright(log.message)}`;
        case LOG_LEVELS.DEBUG:
          return chalk.magenta(`${log.callerFunction ? `${log.callerFunction}: ` : ''}${log.message} ${log.ms}`);
        default:
          return log.message;
      }
    }),
  ),
});

export default extendLogger;
