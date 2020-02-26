import winston from 'winston';

const extendLogger = () => winston.createLogger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.ms(),
    winston.format.colorize({ all: true }),
    winston.format.printf((log) => (
      log.level.indexOf('debug') !== -1 ? `${log.level}: ${log.message} ${log.ms}` : log.message)),
  ),
});
export default extendLogger;
