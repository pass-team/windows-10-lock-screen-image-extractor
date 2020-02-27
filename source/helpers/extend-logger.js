import winston from 'winston';
import chalk from 'chalk';

const extendLogger = (transport) => winston.createLogger({
  transports: [transport || new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.ms(),
    winston.format.printf((log) => (log.level.indexOf('debug') !== -1
      ? chalk.magenta(`${log.caller ? `${log.caller}: ` : ''}${log.message} ${log.ms}`)
      : log.message)),
  ),
});
export default extendLogger;
