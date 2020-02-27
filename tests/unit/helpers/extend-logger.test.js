/* eslint-disable no-console */
import winston from 'winston';
import extendLogger from '../../../source/helpers/extend-logger';

describe('Helper - Function extend-debug-logger', () => {
  it('Should generate log object with values depending on arguments', () => {
    const logger = extendLogger(0);
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
    let logs = '';
    const extendedLogger = Object.create(logger, {
      transport: [
        new winston.transports.Console({ level: 'debug' }),
      ],
    });
    const oldStdout = console._stdout.write;
    console._stdout.write = (data) => {
      logs = [...logs, data];
    };
    extendedLogger.info('Message content info level');
    extendedLogger.warn('Message content warn level');
    extendedLogger.log('debug', 'Message content debug level');
    const expectedReformatedLogs = [
      '\u001b[32mMessage content info level\u001b[39m\r\n',
      '\u001b[33mMessage content warn level\u001b[39m\r\n',
      '\u001b[34mdebug\u001b[39m: \u001b[34mMessage content debug level\u001b[39m +1ms\r\n',
    ];
    console._stdout.write = oldStdout;
    expect(logs[0]).toEqual(expectedReformatedLogs[0]);
    expect(logs[1]).toEqual(expectedReformatedLogs[1]);
    expect(logs[2]).toEqual(
      expect.stringContaining('\u001b[34mdebug\u001b[39m: \u001b[34mMessage content debug level\u001b[39m '),
    );
  });
});
