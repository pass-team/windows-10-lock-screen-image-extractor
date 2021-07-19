import stripAnsi from 'strip-ansi';
import validateNamePattern from '../../../source/helpers/validate-name-pattern.js';
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

describe('Helper - Function validateNamePattern', () => {
  // Reset logging recorder
  beforeEach(() => {
    errorRecord = [];
  });

  it('Should print error if input name-pattern is invalid', () => {
    const namePatternSamples = [
      'hash',
      'fakeNamePattern',
      'origin',
      'date',
    ];
    const checks = namePatternSamples.map((sample) => validateNamePattern(sample, mockLogger));
    expect(checks[0]).toBeTruthy();

    expect(stripAnsi(errorRecord[0].data)).toEqual(`Invalid value '${namePatternSamples[1]}' for option --name-pattern.`
      + '\nType get-lock-screen -h for usage');
    expect(errorRecord[0].meta?.errorCode).toEqual(ERROR_CODES.VALIDATION_ERROR_001);

    expect(checks[1]).toBeFalsy();
    expect(checks[2]).toBeTruthy();
    expect(checks[3]).toBeTruthy();
  });
});
