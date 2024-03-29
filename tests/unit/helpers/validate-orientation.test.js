import stripAnsi from 'strip-ansi';
import validateOrientation from '../../../source/helpers/validate-orientation.js';
import extendLogger from '../../../source/helpers/extend-logger.js';
import { ERROR_CODES } from '../../../source/constants/index.js';

const mockLogger = extendLogger();
let errorRecord = [];
mockLogger.error = (data, meta) => {
  errorRecord.push({
    data,
    meta,
  });
};

describe('Helper - Function validateOrientation', () => {
  // Reset logging recorder
  beforeEach(() => {
    errorRecord = [];
  });

  it('Should print error if input orientation is invalid', () => {
    const orientationSamples = [
      'all',
      'fakeOrientation',
      'landscape',
      'portrait',
    ];
    const checks = orientationSamples.map((sample) => validateOrientation(sample, mockLogger));
    expect(checks[0]).toBeTruthy();

    expect(stripAnsi(errorRecord[0].data)).toEqual(`Invalid value '${orientationSamples[1]}' for option --orientation`
      + '\nType get-lock-screen -h for usage');
    expect(errorRecord[0].meta?.errorCode).toEqual(ERROR_CODES.VALIDATION_ERROR_001);
    expect(errorRecord[0].meta?.field).toEqual('orientation');

    expect(checks[1]).toBeFalsy();
    expect(checks[2]).toBeTruthy();
    expect(checks[3]).toBeTruthy();
  });
});
