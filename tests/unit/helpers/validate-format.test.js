import stripAnsi from 'strip-ansi';
import validateFormat from '../../../source/helpers/validate-format';
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

describe('Helper - Function validateFormat', () => {
  // Reset logging recorder
  beforeEach(() => {
    errorRecord = [];
  });

  it('Should print error if format provided is invalid', () => {
    const formatSamples = [
      'json',
      'fakeFormat',
      'text',
    ];
    const checks = formatSamples.map((sample) => validateFormat(sample, mockLogger));
    expect(checks[0]).toBeTruthy();

    expect(stripAnsi(errorRecord[0].data)).toEqual(`Invalid value '${formatSamples[1]}' for option --format.`
      + '\nType get-lock-screen -h for usage');
    expect(errorRecord[0].meta?.errorCode).toEqual(ERROR_CODES.VALIDATION_ERROR_001);
    expect(checks[1]).toBeFalsy();

    expect(checks[2]).toBeTruthy();
  });
});
