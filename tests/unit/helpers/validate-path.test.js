import pathValidator from '../../../source/helpers/validate-path';

describe('Helper - Function path-validator', () => {
  it('Should throw Error if input path is invalid', () => {
    try {
      pathValidator('D:');
    } catch (e) {
      expect(e.message).toEqual(expect.stringContaining('ER01'));
    }

    try {
      pathValidator('D:\\');
    } catch (e) {
      expect(e.message).toEqual(expect.stringContaining('ER01'));
    }

    try {
      pathValidator('D:/zxczxc***');
    } catch (e) {
      expect(e.message).toEqual(expect.stringContaining('ER01'));
    }
  });
});
