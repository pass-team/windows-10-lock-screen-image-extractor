const filterImages = require('../../../source/helpers/filter-images');
const mockFiles = require('../../mock-data/mock-files');
const rootDir = process.cwd();

describe('Helper - Function filter-images', () => {
  it('Should be able to filter all images from image meta objects', () => {
    const constraint = { orientation: 'all' };
    const images = [{
       "height": 1920,
       "name": "a.jpg",
       "path": `${rootDir}/tests/mock-assets/`,
       "type": "jpg",
       "width": 1080
    },
    {
       "height": 1080,
       "name": "b.jpg",
       "path": `${rootDir}/tests/mock-assets/`,
       "type": "jpg",
       "width": 1920
    },
    {
       "height": 1920,
       "name": "c.jpg",
       "path": `${rootDir}/tests/mock-assets/`,
       "type": "jpg",
       "width": 1080
    },
    {
       "height": 1080,
       "name": "d.jpg",
       "path": `${rootDir}/tests/mock-assets/`,
       "type": "jpg",
       "width": 1920
    },
    {
       "height": 1080,
       "name": "e.jpg",
       "path": `${rootDir}/tests/mock-assets/`,
       "type": "jpg",
       "width": 1920
    },
    {
       "height": 1920,
       "name": "f.jpg",
       "path": `${rootDir}/tests/mock-assets/`,
       "type": "jpg",
       "width": 1080
    }
  ]
    expect(filterImages(mockFiles, constraint)).toEqual(images);
  });

  it('Should be able to filter landscape images from image meta objects', () => {
    const constraint = { orientation: 'landscape' };
    const images = [
      {
          "height": 1080,
          "name": "b.jpg",
          "path": `${rootDir}/tests/mock-assets/`,
          "type": "jpg",
          "width": 1920
      },
      {
          "height": 1080,
          "name": "d.jpg",
          "path": `${rootDir}/tests/mock-assets/`,
          "type": "jpg",
          "width": 1920
      },
      {
          "height": 1080,
          "name": "e.jpg",
          "path": `${rootDir}/tests/mock-assets/`,
          "type": "jpg",
          "width": 1920
      },
    ];
    expect(filterImages(mockFiles, constraint)).toEqual(images);
  });

  it('Should be able to filter portrait images from image meta objects', () => {
    const constraint = { orientation: 'portrait' };
    const images = [
      {
        "height": 1920,
        "name": "a.jpg",
        "path": `${rootDir}/tests/mock-assets/`,
        "type": "jpg",
        "width": 1080
      },
      {
        "height": 1920,
        "name": "c.jpg",
        "path": `${rootDir}/tests/mock-assets/`,
        "type": "jpg",
        "width": 1080
      },
      {
        "height": 1920,
        "name": "f.jpg",
        "path": `${rootDir}/tests/mock-assets/`,
        "type": "jpg",
        "width": 1080
      }
    ];
    expect(filterImages(mockFiles, constraint)).toEqual(images);
  });
});
