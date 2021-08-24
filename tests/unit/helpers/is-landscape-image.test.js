import isPortraitImage from '../../../source/helpers/is-portrait-image.js';

describe('Helper - Function is-portrait-image', () => {
  it('Should return true if an image is portrait', () => {
    expect(isPortraitImage({
      height: 1366,
      width: 768,
    })).toEqual(true);
  });
  it('Should return false if an image is not portrait', () => {
    expect(isPortraitImage({
      height: 768,
      width: 1366,
    })).toEqual(false);
  });
});
