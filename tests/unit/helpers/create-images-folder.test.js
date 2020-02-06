const createImagesFolder = require('../../../source/helpers/create-images-folder');

describe('Helper - Function create-images-folder', () => {
  it('Should return true if create successfully', () => {
    expect(createImagesFolder('D://lock-screen-images')).toEqual(true);
  });

  it('Should return false if fail to create', () => {
    expect(createImagesFolder('D:/')).toEqual(false);
  });
});
