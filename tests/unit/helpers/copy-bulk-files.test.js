import hashFile from '../../../source/helpers/hash-file';
import creatImagesFolder from '../../../source/helpers/create-images-folder';
import copyBulkFiles from '../../../source/helpers/copy-bulk-files';
import deleteFolderRecursive from './../../mock-data/delete-folder-recursive';

describe('Helper - Function copy-bulk-files', () => {
  const mockSource = `${process.cwd()}/tests/mock-assets/`
  const mockDestination = `${process.cwd()}/tests/mock-destination/`;
  const mockNamePatter = 'origin';

  it('Should return the number of copied files', () => {
    creatImagesFolder(mockDestination);

    /** Mock file meta objects represent mock assets folder
     * to avoid having to run other helpers */
    const files = new Array(6).fill().map((e, index) => {
      const originalFileName = String.fromCharCode(97 + index);
      return {
        name: originalFileName,
        path: `${process.cwd()}/tests/mock-assets\\`,
        height: 1920,
        width: 1080,
        type: 'jpg',
        origin: originalFileName,
        hash: hashFile(`${process.cwd()}/tests/mock-assets/${originalFileName}`),
        date: 'February 5 2020'
      }
    });

    // Copy first time
    const copyCount = copyBulkFiles(files, mockSource, mockDestination, mockNamePatter);
    expect(copyCount).toEqual(6);

    // Copy second time, duplicated files so return 0
    const copyCountSecond = copyBulkFiles(files, mockSource, mockDestination, mockNamePatter);
    expect(copyCountSecond).toEqual(0);
  });

  afterEach(() => {
    deleteFolderRecursive(mockDestination);
  })
});

