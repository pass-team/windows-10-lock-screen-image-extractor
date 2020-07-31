import fs from 'fs';
import stripAnsi from 'strip-ansi';
import parseConfigFile from '../../../source/helpers/parse-config-file';
import extendLogger from '../../../source/helpers/extend-logger';
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

describe('Helper - Function parseConfigFile', () => {
  // Reset logging recorder
  beforeEach(() => {
    errorRecord = [];
  });

  it('Should return config object when parse config file successfully', () => {
    const configFile = `${process.cwd()}/tests/mock-data/mock-input.json`;
    const expectedConfig = {
      command: 'get-images',
      options: {
        path: 'D:/zcvbdty',
        namePattern: 'hash',
        orientation: 'landscape',
        format: 'json',
        verbose: true,
      },
    };
    expect(parseConfigFile(configFile, mockLogger)).toEqual(expectedConfig);
  });

  it('Should print out error if file does not exist', () => {
    const configFile = `${process.cwd()}/tests/mock-data/mock-input-false-path.json`;
    expect(parseConfigFile(configFile, mockLogger)).toBeNull();
    expect(stripAnsi(errorRecord[0].data))
      .toEqual(`Invalid value '${configFile}' for option --config-file. `
        + '\nType get-lock-screen -h for usage');
    expect(errorRecord[0].meta?.errorCode).toEqual(ERROR_CODES.VALIDATION_ERROR_001);
    expect(errorRecord[0].meta?.field).toEqual('config-file');
  });

  it('Should print out error if fail to parse file content', () => {
    let mockJsonContent = '{"command":"get-images","options":{"path":"D:/zcvbdty","namePattern":'
      + '"hash","orientation":"landscape","format":"json",}}';
    const configFile = `${process.cwd()}/tests/mock-data/mock-invalid-input.json`;
    fs.writeFileSync(configFile, mockJsonContent);
    expect(parseConfigFile(configFile, mockLogger)).toBeNull();
    expect(stripAnsi(errorRecord[0].data))
      .toEqual(expect.stringContaining('Invalid JSON content for option --config-file.'));
    expect(errorRecord[0].meta?.errorCode).toEqual(ERROR_CODES.VALIDATION_ERROR_001);
    expect(errorRecord[0].meta?.field).toEqual('config-file');
    mockJsonContent = '{"command":"get-images","options":{"path":"D:/zcvbdty","namePattern":'
      + '"hash","orientation":"landscape","format":"json"}}';
    fs.writeFileSync(configFile, mockJsonContent);
  });
});
