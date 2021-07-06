import filterImages from '../../../source/helpers/filter-images.js';
import mockFiles from '../../mock-data/mock-files.js';

describe('Helper - Function filter-images', () => {
  const mockPathToImages = `${process.cwd()}/tests/mock-assets/`;

  it('Should be able to filter both landscape and portrait imags', () => {
    const constraint = { orientation: 'all' };
    const images = [{
      height: 1920,
      name: 'a',
      path: mockPathToImages,
      type: 'jpg',
      width: 1080,
    },
    {
      height: 1080,
      name: 'b',
      path: mockPathToImages,
      type: 'jpg',
      width: 1920,
    },
    {
      height: 1920,
      name: 'c',
      path: mockPathToImages,
      type: 'jpg',
      width: 1080,
    },
    {
      height: 1080,
      name: 'd',
      path: mockPathToImages,
      type: 'jpg',
      width: 1920,
    },
    {
      height: 1080,
      name: 'e',
      path: mockPathToImages,
      type: 'jpg',
      width: 1920,
    },
    {
      height: 1920,
      name: 'f',
      path: mockPathToImages,
      type: 'jpg',
      width: 1080,
    },
    ];
    expect(filterImages(mockFiles, constraint)).toEqual(images);
  });

  it('Should be able to filter landscape images only', () => {
    const constraint = { orientation: 'landscape' };
    const images = [
      {
        height: 1080,
        name: 'b',
        path: mockPathToImages,
        type: 'jpg',
        width: 1920,
      },
      {
        height: 1080,
        name: 'd',
        path: mockPathToImages,
        type: 'jpg',
        width: 1920,
      },
      {
        height: 1080,
        name: 'e',
        path: mockPathToImages,
        type: 'jpg',
        width: 1920,
      },
    ];
    expect(filterImages(mockFiles, constraint)).toEqual(images);
  });

  it('Should be able to filter portrait images only', () => {
    const constraint = { orientation: 'portrait' };
    const images = [
      {
        height: 1920,
        name: 'a',
        path: mockPathToImages,
        type: 'jpg',
        width: 1080,
      },
      {
        height: 1920,
        name: 'c',
        path: mockPathToImages,
        type: 'jpg',
        width: 1080,
      },
      {
        height: 1920,
        name: 'f',
        path: mockPathToImages,
        type: 'jpg',
        width: 1080,
      },
    ];
    expect(filterImages(mockFiles, constraint)).toEqual(images);
  });
});
