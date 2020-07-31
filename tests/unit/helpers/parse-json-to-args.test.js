/* eslint-disable sonarjs/no-duplicate-string */
import minimist from 'minimist';
import stripAnsi from 'strip-ansi';
import parseJsonToArgs from '../../../source/helpers/parse-json-to-arguments';
import extendLogger from '../../../source/helpers/extend-logger';
import parseConfigFile from '../../../source/helpers/parse-config-file';
import { ERROR_CODES } from '../../../source/constants';

let errorRecord = [];

const mockLogger = extendLogger();
mockLogger.error = (data, meta) => {
  errorRecord.push({
    data,
    meta,
  });
};

mockLogger.log = jest.fn();

jest.mock('minimist');
jest.mock('../../../source/helpers/parse-config-file');

describe('Helper - Function parseJsonToArguments', () => {
  // Reset logging recorder
  beforeEach(() => {
    errorRecord = [];
  });

  it('Should return true when config or configFile is not provided', () => {
    minimist.mockImplementation(() => ({ _: [] }));
    // process.argv = process.argv.concat(['--look', 'json']);
    expect(parseJsonToArgs(mockLogger)).toEqual(true);
  });

  it('Should return false when fail to parse JSON config', () => {
    minimist.mockImplementation(
      () => ({ _: [], config: 'zxc', 'config-file': 'not-exist.json' }),
    );
    expect(parseJsonToArgs(mockLogger)).toEqual(false);
  });

  it('Should return false when config file contains unsupported commands', () => {
    minimist.mockImplementation(
      () => ({ _: [], config: '{"command":"get-images"}', 'config-file': 'fake.json' }),
    );
    parseConfigFile.mockReturnValue({
      command: 'unsupported-command',
    });
    expect(parseJsonToArgs(mockLogger)).toEqual(false);
    expect(stripAnsi(errorRecord[0].data)).toEqual('Unknown command \'unsupported-command\'.'
      + '\nType get-lock-screen -h for usage');
    expect(errorRecord[0].meta?.errorCode).toEqual(ERROR_CODES.VALIDATION_ERROR_003);
    expect(errorRecord[0].meta?.field).toEqual('command');
  });

  it('Should return false when config file contains unsupported options', () => {
    minimist.mockImplementation(
      () => ({ _: [], config: '', 'config-file': 'fake.json' }),
    );
    parseConfigFile.mockReturnValue({
      command: 'random-desktop',
      options: {
        'unsupported-option': 'value',
      },
    });
    expect(parseJsonToArgs(mockLogger)).toEqual(false);
    expect(stripAnsi(errorRecord[0].data)).toEqual('Unknown option \'unsupported-option\'.'
      + '\nType get-lock-screen -h for usage');
    expect(errorRecord[0].meta?.errorCode).toEqual(ERROR_CODES.VALIDATION_ERROR_002);
    expect(errorRecord[0].meta?.field).toEqual('unsupported-option');
  });

  it('Should return false when at least one option fails the validators', () => {
    minimist.mockImplementation(
      () => ({ _: [], config: '', 'config-file': 'fake.json' }),
    );
    parseConfigFile.mockReturnValue({
      command: 'get-images',
      options: {
        path: 'D:',
        namePattern: 'hash',
        orientation: 'stretch',
        format: 'json',
        verbose: true,
      },
    });

    expect(parseJsonToArgs(mockLogger)).toEqual(false);

    // Should print out these error or each failed validators
    expect(stripAnsi(errorRecord[0].data)).toEqual('Invalid value \'D:\' for option --path '
      + '\nType get-lock-screen -h for usage');
    expect(errorRecord[0].meta?.errorCode).toEqual(ERROR_CODES.VALIDATION_ERROR_001);
    expect(errorRecord[0].meta?.field).toEqual('path');

    expect(stripAnsi(errorRecord[1].data)).toEqual('Invalid value \'stretch\' for option --orientation'
      + '\nType get-lock-screen -h for usage');
    expect(errorRecord[1].meta?.errorCode).toEqual(ERROR_CODES.VALIDATION_ERROR_001);
    expect(errorRecord[1].meta?.field).toEqual('orientation');
  });

  it('Should spread out config commands and options to process.argv', () => {
    const oldProcessArgv = process.argv;
    minimist.mockImplementation(
      () => ({ _: [], config: '', 'config-file': 'fake.json' }),
    );
    parseConfigFile.mockReturnValue({
      command: 'get-images',
      options: {
        path: 'D:/zxczx',
        namePattern: 'hash',
        orientation: 'landscape',
        format: 'json',
        verbose: true,
      },
    });

    expect(parseJsonToArgs(mockLogger)).toEqual(true);
    const spreadArgs = [
      'get-images',
      '--path=D:/zxczx',
      '--name-pattern=hash',
      '--orientation=landscape',
      '--format=json',
      '--verbose=true',
    ];
    spreadArgs.forEach((arg) => {
      expect(process.argv.includes(arg)).toBeTruthy();
    });
    // Should print out these error or each failed validators
    process.argv = oldProcessArgv;
  });

  it('Should work fine when options is not provided', () => {
    const oldProcessArgv = process.argv;
    minimist.mockImplementation(
      () => ({ _: [], config: '', 'config-file': 'fake.json' }),
    );
    parseConfigFile.mockReturnValue({
      command: 'get-images',
    });

    expect(parseJsonToArgs(mockLogger)).toEqual(true);
    const spreadArgs = [
      'get-images',
    ];
    spreadArgs.forEach((arg) => {
      expect(process.argv.includes(arg)).toBeTruthy();
    });
    // Should print out these error or each failed validators
    process.argv = oldProcessArgv;
  });
});
