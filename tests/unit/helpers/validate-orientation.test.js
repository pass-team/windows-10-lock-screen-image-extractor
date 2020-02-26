import orientationValidator from '../../../source/helpers/validate-orientation';

describe('Helper - Function orientation-validator', () => {
  it('Should throw Error if input orientation is invalid', () => {
    try {
      orientationValidator('stretch');
    } catch (e) {
      expect(e.message).toEqual(expect.stringContaining('ER01'));
    }
  });
});
