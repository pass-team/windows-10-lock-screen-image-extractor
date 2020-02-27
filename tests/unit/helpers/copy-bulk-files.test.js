import hashFile from '../../../source/helpers/hash-file';
import creatImagesFolder from '../../../source/helpers/create-images-folder';
import copyBulkFiles from '../../../source/helpers/copy-bulk-files';
import deleteFolderRecursive from '../../mock-data/delete-folder-recursive';

describe('Helper - Function copy-bulk-files', () => {
  let files;
  let mockSource = `${process.cwd()}/tests/mock-assets/`;
  const mockDestination = `${process.cwd()}/tests/mock-destination/`;
  const mockNamePattern = 'origin';
  const mockLogger = {
    log: () => jest.fn(),
  };

  beforeEach(() => {
    /** Mock file meta objects represent mock assets folder
     * to avoid having to run other helpers */
    files = new Array(6).fill().map((e, index) => {
      const originalFileName = String.fromCharCode(97 + index);
      return {
        name: originalFileName,
        path: `${process.cwd()}/tests/mock-assets\\`,
        height: 1920,
        width: 1080,
        type: 'jpg',
        origin: originalFileName,
        hash: hashFile(`${process.cwd()}/tests/mock-assets/${originalFileName}`),
        date: 'February 5 2020',
      };
    });
    creatImagesFolder(mockDestination);
  });

  afterEach(() => {
    deleteFolderRecursive(mockDestination);
  });

  it('Should return the number of copied files', () => {
    // Copy first time
    const copyCount = copyBulkFiles(files, mockSource, mockDestination, mockNamePattern, mockLogger);
    expect(copyCount).toEqual(6);

    // Copy second time, duplicated files so return 0
    const copyCountSecond = copyBulkFiles(files, mockSource, mockDestination, mockNamePattern, mockLogger);
    expect(copyCountSecond).toEqual(0);
  });

  it('Should ignores counting files that failed to copy', () => {
    mockSource = '';
    const copyCount = copyBulkFiles(files, mockSource, mockDestination, mockNamePattern, mockLogger);
    expect(copyCount).toEqual(0);
  });
});
