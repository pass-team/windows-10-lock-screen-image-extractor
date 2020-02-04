const isValidSizeImage = require('../../../source/helpers/is-valid-size-image');

describe('Helper - Function is-valid-size-image', () => {
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
  it('Should return false if image has an invalid resolution', () => {
    expect(isValidSizeImage({
      width: 1000,
      height: 768
    })).toEqual(false);
  });
});
