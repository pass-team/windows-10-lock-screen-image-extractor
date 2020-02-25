import namePatternValidator from '../../../source/helpers/name-pattern-validator';
import { IMAGE_NAME_FORMAT_HASH, IMAGE_NAME_FORMAT_DATE, IMAGE_NAME_FORMAT_ORIGIN } from '../../../source/constants';

describe('Helper - Function name-pattern-validator', () => {
  it('Should return name-pattern if input name-pattern is valid', () => {
    expect(namePatternValidator(IMAGE_NAME_FORMAT_ORIGIN)).toBe(IMAGE_NAME_FORMAT_ORIGIN);
    expect(namePatternValidator(IMAGE_NAME_FORMAT_DATE)).toBe(IMAGE_NAME_FORMAT_DATE);
    expect(namePatternValidator(IMAGE_NAME_FORMAT_HASH)).toBe(IMAGE_NAME_FORMAT_HASH);
  });
  it('Should throw Error if input name-pattern is invalid', () => {
    try {
      namePatternValidator('uppercase');
    } catch (e) {
      expect(e.message).toEqual(expect.stringContaining('ER01'));
    }
  });
});
