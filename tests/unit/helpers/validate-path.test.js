import stripAnsi from 'strip-ansi';
import validatePath from '../../../source/helpers/validate-path';
import extendLogger from '../../../source/helpers/extend-logger';
import { ERROR_CODES } from '../../../source/constants';

const mockLogger = extendLogger();
let errorRecord = [];
mockLogger.error = (data, meta) => {
  errorRecord.push({
    data,
    meta,
  });
};

describe('Helper - Function validatePath', () => {
  // Reset logging recorder
  beforeEach(() => {
    errorRecord = [];
  });

  it('Should print error if input path is invalid', () => {
    const pathSamples = [
      'D:',
      'D:\\',
      'D:/abc',
    ];
    const checks = pathSamples.map((sample) => validatePath(sample, mockLogger));

    expect(stripAnsi(errorRecord[0].data)).toEqual(`Invalid value '${pathSamples[0]}' for option --path `
      + '\nType get-lock-screen -h for usage');
    expect(errorRecord[0].meta?.errorCode).toEqual(ERROR_CODES.VALIDATION_ERROR_001);
    expect(errorRecord[0].meta?.field).toEqual('path');
    expect(checks[0]).toBeFalsy();

    expect(stripAnsi(errorRecord[1].data)).toEqual(`Invalid value '${pathSamples[1]}' for option --path `
      + '\nType get-lock-screen -h for usage');
    expect(errorRecord[1].meta?.errorCode).toEqual(ERROR_CODES.VALIDATION_ERROR_001);
    expect(errorRecord[0].meta?.field).toEqual('path');
    expect(checks[1]).toBeFalsy();

    expect(checks[2]).toBeTruthy();
  });
});
