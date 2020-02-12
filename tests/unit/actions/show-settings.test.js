import fs from 'fs';
import path from 'path';
import logger from 'caporal/lib/logger';
import {
  IMAGE_NAME_FORMAT_HASH,
  ORIENTATION_LANDSCAPE,
} from '../../../source/constants';
import getImages from '../../../source/actions/get-images';
import showSettings from '../../../source/actions/show-settings';
import deleteFolderRecursive from '../../mock-data/delete-folder-recursive';

jest.mock('caporal/lib/logger');

let infoRecord = '';
let warnRecord = '';

const mockLogger = logger.createLogger.mockImplementation(() => ({
  info: jest.fn(
    (data) => {
      infoRecord += data;
    },
  ),
  warn: jest.fn(
    (data) => {
      warnRecord += data;
    },
  ),
}));

describe('Feature show-settings', () => {
  beforeEach(() => {
    infoRecord = '';
    warnRecord = '';
  });
  // Run test inside build folder
  // Remove user settings to avoid side effect on other test cases
  afterEach(() => {
    if (fs.existsSync(path.join(process.cwd(), '\\.userconfig'))) {
      fs.unlinkSync(path.join(process.cwd(), '\\.userconfig'));
    }
  });

  it('Should display "No user settings has been recorded yet.." when .userconfig does not exist', async () => {
    // eslint-disable-next-line no-shadow
    const logger = mockLogger();
    await showSettings({}, {}, logger);

    expect(warnRecord.includes('No user settings has been recorded yet')).toBeTruthy();
  });

  it('Should print out path to images', async () => {
    // eslint-disable-next-line no-shadow
    const logger = mockLogger();
    const folder = 'D://screen-images';
    const answers = {
      path: folder,
      orientation: ORIENTATION_LANDSCAPE,
      namePattern: IMAGE_NAME_FORMAT_HASH,
    };
    await getImages({}, answers, logger);
    await showSettings({}, {}, logger);

    expect(infoRecord.includes(`file://${folder}`)).toBeTruthy();
    // Clean up trash files created by test case
    deleteFolderRecursive(folder);
  });
});
