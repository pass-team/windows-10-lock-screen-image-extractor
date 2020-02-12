import fs from 'fs';
import {
  IMAGE_NAME_FORMAT_HASH,
  ORIENTATION_ALL,
} from '../../../source/constants';
import {
  getImages,
} from '../../../source/actions';
import deleteFolderRecursive from '../../mock-data/delete-folder-recursive';

describe('Action get-images', () => {
  it('Should get images with additional arguments', async () => {
    const folder = 'D://screen-images';
    const answers = {
      path: folder, orientation: ORIENTATION_ALL, namePattern: IMAGE_NAME_FORMAT_HASH,
    };
    const mockLogger = {
      info: jest.fn().mockReturnValue('console log'),
      warn: jest.fn().mockReturnValue('console warning'),
      error: jest.fn().mockReturnValue('console error'),
    };
    await getImages(
      {},
      answers,
      mockLogger,
    );
    expect(fs.readdirSync(folder).length).toBeGreaterThan(0);
    deleteFolderRecursive(folder);
  }, 10000);
});
