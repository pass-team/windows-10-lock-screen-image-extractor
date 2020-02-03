const { isValidSizeImage } = require('../../../source/helpers');

describe('Helper - Function is-valid-size-image', () => {
  it('Should return true if image has a valid resolution', () => {
    expect(isValidSizeImage({
      width: 1366,
      height: 768
    })).toEqual(true);
  });
  it('Should return false if otherwise', () => {
    expect(isValidSizeImage({
      width: 1000,
      height: 768
    })).toEqual(false);
  });
});
