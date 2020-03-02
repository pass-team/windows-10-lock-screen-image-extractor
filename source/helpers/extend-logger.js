import winston from 'winston';
import chalk from 'chalk';

const extendLogger = (transport = new winston.transports.Console()) => winston.createLogger({
  transports: [transport],
  exceptionHandlers: [transport],
  format: winston.format.combine(
    winston.format.ms(),
    winston.format.printf((log) => {
      switch (log.level) {
        case 'info':
          if (log.isMessage) return chalk.green(log.message);
          return log.message;
        case 'warn':
          return chalk.yellow(log.message);
        case 'error':
          return `${chalk.redBright(log.errorCode ? `\n${log.errorCode}: ` : '')}${chalk.redBright(log.message)}`;
        case 'debug':
          return chalk.magenta(`${log.caller ? `${log.caller}: ` : ''}${log.message} ${log.ms}`);
        default:
          return log.message;
      }
    }),
  ),
});

export default extendLogger;
