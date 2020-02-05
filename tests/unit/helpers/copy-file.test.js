const fs = require('fs');
const copyFile = require('../../../source/helpers/copy-file');
const createImagesFolder = require('../../../source/helpers/create-images-folder');
const normalizePath = require('../../../source/helpers/normalize-path');
const mockPathToImages = `${process.cwd()}/tests/mock-assets/`;
const deleteFolderRecursive = require('../../mock-data/delete-folder-recursive');

describe('Helper - Function copy-file', () => {
  const path = 'D://images';

  beforeEach(() => {
    createImagesFolder(path);
  })

  afterEach(() => {
    deleteFolderRecursive(path);
  });
  it('Should copy file with correct name pattern', () => {
    const images = {
      name: 'a',
      path: mockPathToImages,
      height: 1920,
      width: 1080,
      type: 'jpg',
      origin: 'a',
      hash: 'db7ee7b47dd509ac37bc930322e0f1b3',
      date: 'February 5 2020'
    };

    copyFile(images, mockPathToImages, path, 'origin')
    const copyImages = fs.readdirSync(normalizePath(path));
    
    expect(copyImages).toEqual(['a.jpg']);
  });
});
