import namePatternValidator from '../../../source/helpers/validate-name-pattern';

describe('Helper - Function name-pattern-validator', () => {
  it('Should throw Error if input name-pattern is invalid', () => {
    try {
      namePatternValidator('uppercase');
    } catch (e) {
      expect(e.message).toEqual(expect.stringContaining('ER01'));
    }
  });
});
