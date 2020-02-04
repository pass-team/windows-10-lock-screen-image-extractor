const isLandscapeImage = require('../../../source/helpers/is-landscape-image');

describe('Helper - Function is-landscape-image', () => {
  it('Should return true if an image is landscape', () => {
    expect(isLandscapeImage({
      width: 1366,
      height: 768
    })).toEqual(true);
  });
  it('Should return false if an image is not landscape', () => {
    expect(isLandscapeImage({
      width: 768,
      height: 1366
    })).toEqual(false);
  });
});
