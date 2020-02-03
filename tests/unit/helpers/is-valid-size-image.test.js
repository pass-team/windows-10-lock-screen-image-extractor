const isValidSizeImage = require('../../../source/helpers/is-valid-size-image');

describe('Helper - function is-valid-size-image', () => {
  it('Should return true if image has a valid resolution', () => {
    expect(isValidSizeImage({
      width: 1366,
      height: 768
    })).toEqual(true);

    expect(isValidSizeImage({
      width: 768,
      height: 1366
    })).toEqual(true);
  });
  it('Should return false if otherwise', () => {
    expect(isValidSizeImage({
      width: 1000,
      height: 768
    })).toEqual(false);
  });
});
