import pathValidator from '../../../source/helpers/path-validator';

describe('Helper - Function path-validator', () => {
  it('Should return path if input path is valid', () => {
    expect(pathValidator('D:/images')).toBe('D:/images');
  });

  it('Should throw Error if input path is invalid', () => {
    try {
      pathValidator('D:');
    } catch (e) {
      expect(e.message).toEqual(expect.stringContaining('(ER01)'));
    }

    try {
      pathValidator('D:\\');
    } catch (e) {
      expect(e.message).toEqual(expect.stringContaining('(ER01)'));
    }

    try {
      pathValidator('D:/zxczxc***');
    } catch (e) {
      expect(e.message).toEqual(expect.stringContaining('(ER01)'));
    }
  });
});
