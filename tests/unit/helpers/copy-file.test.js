import fs from 'fs';
import copyFile from '../../../source/helpers/copy-file.js';
import createImagesFolder from '../../../source/helpers/create-images-folder.js';
import normalizePath from '../../../source/helpers/normalize-path.js';
import deleteFolderRecursive from '../../mock-data/delete-folder-recursive.js';

describe('Helper - Function copy-file', () => {
  const mockSource = `${process.cwd()}/tests/mock-assets/`;
  const mockDestination = `${process.cwd()}/tests/mock-destination/`;
  let mockNamePattern = 'origin';
  const images = {
    name: 'a',
    path: mockDestination,
    height: 1920,
    width: 1080,
    type: 'jpg',
    origin: 'a',
    hash: 'db7ee7b47dd509ac37bc930322e0f1b3',
    date: 'February 5 2020',
  };

  beforeEach(() => {
    createImagesFolder(mockDestination);
  });

  afterEach(() => {
    deleteFolderRecursive(mockDestination);
  });
  it('Should copy file with name pattern is origin', () => {
    copyFile(images, mockSource, mockDestination, mockNamePattern);
    const copyImages = fs.readdirSync(normalizePath(mockDestination));

    expect(copyImages).toEqual([`${images.name}.${images.type}`]);
  });

  it('Should copy file with name pattern is date', () => {
    mockNamePattern = 'date';
    copyFile(images, mockSource, mockDestination, mockNamePattern, 1);
    const copyImages = fs.readdirSync(normalizePath(mockDestination));

    expect(copyImages).toEqual([`${images.date}_1.${images.type}`]);
  });

  it('Should copy file with name pattern is hash', () => {
    mockNamePattern = 'hash';
    copyFile(images, mockSource, mockDestination, mockNamePattern, 1);
    const copyImages = fs.readdirSync(normalizePath(mockDestination));

    expect(copyImages).toEqual([`${images.hash}.${images.type}`]);
  });
});
