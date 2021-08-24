/* eslint-disable no-console */
import chalk from 'chalk';
import printJsonOutput from '../../../source/helpers/print-json-output.js';
import TransportJSON from '../../../source/helpers/transport-json.js';
import extendLogger from '../../../source/helpers/extend-logger.js';
import { ERROR_CODES } from '../../../source/constants/index.js';
import { setDebugMode } from '../../../source/helpers/index.js';

let mockLogger = extendLogger(new TransportJSON({ level: 'debug' }));
mockLogger.transports[0].state.debug = true;

let logRecord = [];

describe('Helper - Function printJsonOutput', () => {
  // Reset logging recorder
  beforeEach(() => {
    logRecord = [];
  });

  it('Should print out JSON log in the right format when process.formatJson is true', () => {
    process.formatJson = 'json';
    const oldConsoleLog = console.log;
    console.log = (data) => {
      logRecord.push(data);
    };

    // 1. Test debug mode
    setDebugMode(mockLogger);
    mockLogger.info('Info message 1 - test case 1', { isMessage: true });
    mockLogger.info('Info message 2 - test case 1 that should not be printed in debug mode');
    mockLogger.log('debug', 'Debug message 1', { callerFunction: 'action:some-action' });
    mockLogger.log('debug', 'Debug message 1', { callerFunction: 'action:some-other' });
    printJsonOutput(mockLogger);
    const expectLog = {
      status: 'success',
      code: '',
      message: 'Info message 1 - test case 1',
      logs: ['action:some-action: Debug message 1', 'action:some-other: Debug message 1'],
      verbose: true,
    };
    const { status, message, verbose } = logRecord[0];
    expect(status).toEqual(expectLog.status);
    expect(message).toEqual(expectLog.message);
    expect(verbose).toEqual(expectLog.verbose);
    logRecord[0].logs.forEach((log, index) => {
      expect(log).toEqual(expect.stringContaining(expectLog.logs[index]));
    });

    // 2. Test normal mode
    mockLogger = extendLogger(new TransportJSON());
    mockLogger.info('Info message 1', { isMessage: true });
    mockLogger.warn('Warn message 1');
    mockLogger.log('debug',
      'Debug message that should not be printed in normal mode',
      { callerFunction: 'action:some-action' });
    printJsonOutput(mockLogger);
    expect(logRecord[1]).toEqual({
      status: 'success',
      code: '',
      message: 'Info message 1',
      logs: ['Warn message 1'],
    });

    // 3. Test Validation error
    mockLogger = extendLogger(new TransportJSON());
    mockLogger.error(
      'Invalid value \'D:/\' for option --path ',
      { errorCode: ERROR_CODES.VALIDATION_ERROR_001, field: 'path' },
    );
    mockLogger.error(
      'Invalid value \'zxc\' for option --orientation ',
      { errorCode: ERROR_CODES.VALIDATION_ERROR_001, field: 'orientation' },
    );
    mockLogger.error(
      'Invalid value \'xcvxcv\' for option --name-pattern ',
      { errorCode: ERROR_CODES.VALIDATION_ERROR_001, field: 'namePattern' },
    );
    mockLogger.error(
      'Invalid value \'dummy\' for option --format ',
      { errorCode: ERROR_CODES.VALIDATION_ERROR_001, field: 'format' },
    );
    printJsonOutput(mockLogger);
    expect(logRecord[2]).toEqual({
      status: 'error',
      code: 'VALIDATION_ERROR_001',
      message: 'The given data was invalid.',
      errors: [
        { path: "Invalid value 'D:/' for option --path" },
        { orientation: "Invalid value 'zxc' for option --orientation" },
        { namePattern: "Invalid value 'xcvxcv' for option --name-pattern" },
        { format: "Invalid value 'dummy' for option --format" },
      ],
      logs: [],
    });

    // 4. Test Runtime error
    mockLogger = extendLogger(new TransportJSON());
    mockLogger.error(
      'Error while creating images folder! The path provided is invalid or being used by other processes.',
      { errorCode: ERROR_CODES.RUNTIME_ERROR_001 },
    );
    mockLogger.error(
      'Second runtime error that should not be printed (Runtime error will stop execution immediately',
      { errorCode: ERROR_CODES.RUNTIME_ERROR_001 },
    );
    printJsonOutput(mockLogger);
    expect(logRecord[3]).toEqual({
      status: 'error',
      code: 'RUNTIME_ERROR_001',
      message: 'Error while creating images folder! The path provided is invalid or being used by other processes.',
      logs: [],
    });

    // 5. Test Exception
    mockLogger = extendLogger(new TransportJSON());
    mockLogger.error(
      'Unhandled exception 1 with no errorCode',
    );
    mockLogger.error(
      'Unhandled exception 2 that should not be printed (Exception will stop execution immediately',
    );
    printJsonOutput(mockLogger);
    expect(logRecord[4]).toEqual({
      status: 'error',
      code: 'EXCEPTION_001',
      message: 'Unhandled exception 1 with no errorCode',
      logs: [],
    });
    console.log = oldConsoleLog;
    delete process.formatJson;
  });

  it('Should display "Press any key to exit.." when run from exe file', () => {
    const oldProcessTitle = process.title;
    process.title = `${process.cwd()}\\get-lock-screen.exe`;
    const oldProcessArgv = process.argv;
    process.argv = [...oldProcessArgv, '', ''];
    const oldLog = console.log;
    console.log = (input) => {
      logRecord.push(input);
    };
    printJsonOutput(mockLogger);
    expect(logRecord[0]).toEqual(chalk.cyan('\nPress any key to exit..'));
    console.log = oldLog;
    process.argv = oldProcessArgv;
    process.title = oldProcessTitle;
  });
});
