import stripAnsi from 'strip-ansi';
import validateNamePattern from '../../../source/helpers/validate-name-pattern';
import extendLogger from '../../../source/helpers/extend-logger';
import { ERROR_CODES } from '../../../source/constants';

const mockLogger = extendLogger();
const errorRecord = [];
mockLogger.error = (data, meta) => {
  errorRecord.push({
    data,
    meta,
  });
};

describe('Helper - Function validateNamePattern', () => {
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
