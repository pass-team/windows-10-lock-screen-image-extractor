/* eslint-disable no-console */
import winston from 'winston';
import stripAnsi from 'strip-ansi';
import extendLogger from '../../../source/helpers/extend-logger.js';
import { ERROR_CODES } from '../../../source/constants/index.js';

describe('Helper - Function extendLogger', () => {
  it('Should generate log object with values depending on arguments', () => {
    const logger = extendLogger();
    const logs = [];
    const extendedLogger = Object.create(logger, {
      write: {
        value(...args) {
          logs.push(args);
          if (logs.length === 4) {
            expect(Object.values(logs[0][0])).toEqual([1, 'info']);
            expect(Object.values(logs[1][0])).toEqual([2, 'warn']);
            expect(Object.values(logs[2][0])).toEqual(['test3', 'info']);
            expect(Object.values(logs[3][0])).toEqual(['meta', 4, 'warn', 'a warning']);
          }
        },
      },
    });
    extendedLogger.log('info', { test: 1 });
    extendedLogger.log('warn', { test: 2 });
    extendedLogger.info('test3');
    extendedLogger.warn('a warning', { with: 'meta', test: 4 });
  });

  it('Should properly reformat and colorize the message', () => {
    const logger = extendLogger(new winston.transports.Console({ level: 'debug' }));
    let logs = [];
    const extendedLogger = Object.create(logger, {
      transport: [
        new winston.transports.Console({ level: 'debug' }),
      ],
    });
    const oldStdout = console._stdout.write;
    console._stdout.write = (data) => {
      logs = [...logs, data];
    };
    extendedLogger.info('Message content info level 1');
    extendedLogger.info('Message content info level with meta', { isMessage: true });
    extendedLogger.warn('Message content warn level');
    extendedLogger.log('debug', 'Message content debug level');
    extendedLogger.log('debug', 'Message content debug level with meta data',
      { callerFunction: 'action:mock-action' });
    extendedLogger.log('error', 'Message content error level no errorCode');
    extendedLogger.log('error', 'Message content error level with errorCode',
      { errorCode: ERROR_CODES.VALIDATION_ERROR_001 });
    extendedLogger.log('verbose', 'Message content verbose level');
    const expectedReformatedLogs = [
      'Message content info level 1',
      'Message content info level',
      'Message content warn level',
      'Message content debug level +',
      'action:mock-action: Message content debug level with meta data +',
      'Message content error level no errorCode',
      `${ERROR_CODES.VALIDATION_ERROR_001}: Message content error level with errorCode`,
      'Message content verbose level',
    ];
    console._stdout.write = oldStdout;

    logs.forEach((log, index) => {
      expect(stripAnsi(logs[index])).toEqual(expect.stringContaining(expectedReformatedLogs[index]));
    });
  });
});
