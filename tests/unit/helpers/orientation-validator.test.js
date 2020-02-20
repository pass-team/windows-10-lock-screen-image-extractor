import orientationValidator from '../../../source/helpers/orientation-validator';
import { ORIENTATION_ALL, ORIENTATION_LANDSCAPE, ORIENTATION_PORTRAIT } from '../../../source/constants';

describe('Helper - Function orientation-validator', () => {
  it('Should return orientation if input orientation is valid', () => {
    expect(orientationValidator(ORIENTATION_ALL)).toBe(ORIENTATION_ALL);
    expect(orientationValidator(ORIENTATION_LANDSCAPE)).toBe(ORIENTATION_LANDSCAPE);
    expect(orientationValidator(ORIENTATION_PORTRAIT)).toBe(ORIENTATION_PORTRAIT);
  });
  it('Should throw Error if input orientation is invalid', () => {
    try {
      orientationValidator('stretch');
    } catch (e) {
      expect(e.message).toEqual(expect.stringContaining('(ER01)'));
    }
  });
});
