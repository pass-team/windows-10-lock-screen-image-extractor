import fs from 'fs';
import path from 'path';
import {
  IMAGE_NAME_FORMAT_HASH,
  ORIENTATION_LANDSCAPE,
  PATH_TO_CONFIG
} from '../../../source/constants';
import getImages from '../../../source/actions/get-images';
import showSettings from '../../../source/actions/show-settings';
import normalizePath from '../../../source/helpers/normalize-path';
import deleteFolderRecursive from '../../mock-data/delete-folder-recursive';

describe('Feature show-settings', () => {
  // Run test inside build folder
  // Remove user settings to avoid side effect on other test cases
  afterEach(() => {
    if(fs.existsSync(path.join(process.cwd(), '\\.userconfig'))) {
      fs.unlinkSync(path.join(process.cwd(), '\\.userconfig'));
    }
  });

  it('Should return path to image saving folder', async () => {
    const folder = 'D://screen-images';
    const answers = {
      path: folder,
      orientation: ORIENTATION_LANDSCAPE,
      namePattern: IMAGE_NAME_FORMAT_HASH
    };
    const logger = {
      info: jest.fn().mockReturnValue(''),
      warn: jest.fn().mockReturnValue(''),
      error: jest.fn().mockReturnValue(''),
    };

    await getImages({}, answers, logger);
    await showSettings({}, answers, logger);

    const currentSavePath = await fs.readFileSync(PATH_TO_CONFIG).toString();

    expect(currentSavePath).toEqual(normalizePath(folder));
    // Clean up trash files created by test case
    deleteFolderRecursive(folder);
  });
});
