import reformatLog from '../../../source/helpers/reformat-log';
import TransportJSON from '../../../source/helpers/transport-json';
import extendLogger from '../../../source/helpers/extend-logger';
import { ERROR_CODES } from '../../../source/constants';
import { setDebugMode } from '../../../source/helpers';

let mockLogger = extendLogger(new TransportJSON({ level: 'debug' }));
mockLogger.transports[0].state.debug = true;

describe('Helper - Function reformatLog', () => {
  it('Should print out JSON log in the right format in debug mode', () => {
    process.formatJson = 'json';

    // 1. Logger debug mode
    setDebugMode(mockLogger);
    mockLogger.info('Info message 1', { isMessage: true });
    mockLogger.info('Info message 2 that should not be printed in debug mode');
    mockLogger.log('debug', 'Debug message 1', { callerFunction: 'action:some-action' });
    mockLogger.log('debug', 'Debug message 1', { callerFunction: 'action:some-other' });
    const testOutput = reformatLog(mockLogger.transports[0].state);
    const expectedLog = {
      status: 'success',
      code: '',
      message: 'Info message 1',
      logs: ['Debug message 1', 'Debug message 1'],
      verbose: true,
    };

    const { status, message, verbose } = testOutput;
    expect(status).toEqual(expectedLog.status);
    expect(message).toEqual(expectedLog.message);
    expect(verbose).toEqual(expectedLog.verbose);
    testOutput.logs.forEach((log, index) => {
      expect(log).toEqual(expect.stringContaining(expectedLog.logs[index]));
    });
    delete process.formatJson;
  });

  it('Should print out JSON log in the right format in normal mode', () => {
    process.formatJson = 'json';

    // 2. Logger normal mode
    mockLogger = extendLogger(new TransportJSON());
    mockLogger.info('Info message 1', { isMessage: true });
    mockLogger.warn('Warn message 1');
    mockLogger.log('debug',
      'Debug message that should not be printed in normal mode',
      { callerFunction: 'action:some-action' });
    expect(reformatLog(mockLogger.transports[0].state)).toEqual({
      status: 'success',
      code: '',
      message: 'Info message 1',
      logs: ['Warn message 1'],
    });
    delete process.formatJson;
  });

  it('Should print out JSON log in the right format when Validation error happens', () => {
    process.formatJson = 'json';

    // 3.1 Logger Validation error
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
    expect(reformatLog(mockLogger.transports[0].state)).toEqual({
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
    delete process.formatJson;
  });

  it('Should print out JSON log in the right format when Validation error happens - debug mode', () => {
    process.formatJson = 'json';

    // 3.2 Logger Validation error in debug mode
    mockLogger = extendLogger(new TransportJSON({ level: 'debug' }));
    setDebugMode(mockLogger);
    mockLogger.log('debug', 'Debug message 1', { callerFunction: 'action:some-action' });
    mockLogger.error(
      'Invalid value \'D:/\' for option --path ',
      { errorCode: ERROR_CODES.VALIDATION_ERROR_001, field: 'path' },
    );
    mockLogger.error(
      'Invalid value \'zxc\' for option --orientation ',
      { errorCode: ERROR_CODES.VALIDATION_ERROR_001, field: 'orientation' },
    );

    const testOutput = reformatLog(mockLogger.transports[0].state);
    const expectedLog = {
      status: 'error',
      code: 'VALIDATION_ERROR_001',
      message: 'The given data was invalid.',
      errors: [
        { path: "Invalid value 'D:/' for option --path" },
        { orientation: "Invalid value 'zxc' for option --orientation" },
      ],
      logs: ['action:some-action: Debug message 1'],
      verbose: true,
    };

    expect({ ...testOutput, logs: [], verbose: '' }).toEqual({ ...expectedLog, logs: [], verbose: '' });
    testOutput.logs.forEach((log, index) => {
      expect(log).toEqual(expect.stringContaining(expectedLog.logs[index]));
    });
    delete process.formatJson;
  });

  it('Should print out JSON log in the right format when Runtime error happens', () => {
    process.formatJson = 'json';

    // 4.1 Logger Runtime error
    mockLogger = extendLogger(new TransportJSON());
    mockLogger.error(
      'Error while creating images folder! The path provided is invalid or being used by other processes.',
      { errorCode: ERROR_CODES.RUNTIME_ERROR_001 },
    );
    mockLogger.error(
      'Second runtime error that should not be printed (Runtime error will stop execution immediately',
      { errorCode: ERROR_CODES.RUNTIME_ERROR_001 },
    );
    expect(reformatLog(mockLogger.transports[0].state)).toEqual({
      status: 'error',
      code: 'RUNTIME_ERROR_001',
      message: 'Error while creating images folder! The path provided is invalid or being used by other processes.',
      logs: [],
    });
    delete process.formatJson;
  });

  it('Should print out JSON log in the right format when Runtime error happens - debug mode', () => {
    process.formatJson = 'json';
    // 4.2 Logger Runtime error debug mode
    mockLogger = extendLogger(new TransportJSON({ level: 'debug' }));
    setDebugMode(mockLogger);
    mockLogger.log('debug', 'Debug message 1', { callerFunction: 'action:some-action' });
    mockLogger.error(
      'Error while creating images folder! The path provided is invalid or being used by other processes.',
      { errorCode: ERROR_CODES.RUNTIME_ERROR_001 },
    );
    mockLogger.error(
      'Second runtime error that should not be printed (Runtime error will stop execution immediately',
      { errorCode: ERROR_CODES.RUNTIME_ERROR_001 },
    );
    const testOutput = reformatLog(mockLogger.transports[0].state);
    const expectedLog = {
      status: 'error',
      code: 'RUNTIME_ERROR_001',
      message: 'Error while creating images folder! The path provided is invalid or being used by other processes.',
      logs: ['action:some-action: Debug message 1'],
      verbose: true,
    };
    expect({ ...testOutput, logs: [], verbose: '' }).toEqual({ ...expectedLog, logs: [], verbose: '' });
    testOutput.logs.forEach((log, index) => {
      expect(log).toEqual(expect.stringContaining(expectedLog.logs[index]));
    });
    delete process.formatJson;
  });

  it('Should print out JSON log in the right format when Exception happens', () => {
    process.formatJson = 'json';
    // 5.1 Logger Exception
    mockLogger = extendLogger(new TransportJSON());
    mockLogger.error(
      'Unhandled exception 1 with no errorCode',
    );
    mockLogger.error(
      'Unhandled exception 2 that should not be printed (Exception will stop execution immediately',
    );
    expect(reformatLog(mockLogger.transports[0].state)).toEqual({
      status: 'error',
      code: 'EXCEPTION_001',
      message: 'Unhandled exception 1 with no errorCode',
      logs: [],
    });
    delete process.formatJson;
  });

  it('Should print out JSON log in the right format when Exception happens - debug mode', () => {
    process.formatJson = 'json';

    // 5.2 Logger Exception debug mode
    mockLogger = extendLogger(new TransportJSON({ level: 'debug' }));
    setDebugMode(mockLogger);
    mockLogger.log('debug', 'Debug message 1', { callerFunction: 'action:some-action' });
    mockLogger.error(
      'Unhandled exception 1 with no errorCode',
    );
    mockLogger.error(
      'Unhandled exception 2 that should not be printed (Exception will stop execution immediately',
    );
    const testOutput = reformatLog(mockLogger.transports[0].state);
    const expectedLog = {
      status: 'error',
      code: 'EXCEPTION_001',
      message: 'Unhandled exception 1 with no errorCode',
      logs: ['action:some-action: Debug message 1'],
      verbose: true,
    };

    expect({ ...testOutput, logs: [], verbose: '' }).toEqual({ ...expectedLog, logs: [], verbose: '' });
    testOutput.logs.forEach((log, index) => {
      expect(log).toEqual(expect.stringContaining(expectedLog.logs[index]));
    });
    delete process.formatJson;
  });
});
