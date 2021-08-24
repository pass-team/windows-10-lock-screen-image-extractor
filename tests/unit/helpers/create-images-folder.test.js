import createImagesFolder from '../../../source/helpers/create-images-folder.js';

describe('Helper - Function create-images-folder', () => {
  it('Should return true if create successfully', () => {
    expect(createImagesFolder('D://lock-screen-images')).toEqual(true);
  });

  it('Should return false if fail to create', () => {
    expect(createImagesFolder('D:/')).toEqual(false);
  });
});
