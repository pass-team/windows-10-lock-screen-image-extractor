import fs from 'fs';
import path from 'path';
import {
  IMAGE_NAME_FORMAT_HASH,
  ORIENTATION_LANDSCAPE
} from '../../../source/constants';
import getImages from '../../../source/actions/get-images';
import showSettings from '../../../source/actions/show-settings';
import logger from 'caporal/lib/logger';
import deleteFolderRecursive from '../../mock-data/delete-folder-recursive';

jest.mock('caporal/lib/logger');

let infoRecord = '';
let warnRecord = '';
let errorRecord = '';

const mockLogger = logger.createLogger.mockImplementation(() => {
  return {
    info: jest.fn(
      function (data) {
        infoRecord += data;
      }
    ),
    warn: jest.fn(
      function (data) {
        warnRecord += data;
      }
    ),
    error: jest.fn(
      function (data) {
        errorRecord += data;
      }
    )
  }
});

describe('Feature show-settings', () => {
  beforeEach(() => {
    infoRecord = '';
    warnRecord = '';
  });
  // Run test inside build folder
  // Remove user settings to avoid side effect on other test cases
  afterEach(() => {
    if(fs.existsSync(path.join(process.cwd(), '\\.userconfig'))) {
      fs.unlinkSync(path.join(process.cwd(), '\\.userconfig'));
    }
  });

  it('Should display "No user settings has been recorded yet.." when .userconfig does not exist', async () => {
    const logger = mockLogger();
    await showSettings({}, {}, logger);

    expect(warnRecord.includes('No user settings has been recorded yet')).toBeTruthy();
  });

  it('Should print out path to images', async () => {
    const logger = mockLogger();
    const folder = 'D://screen-images';
    const answers = {
      path: folder,
      orientation: ORIENTATION_LANDSCAPE,
      namePattern: IMAGE_NAME_FORMAT_HASH
    };
    await getImages({}, answers, logger);
    await showSettings({}, {}, logger);

    expect(infoRecord.includes(`file://${folder}`)).toBeTruthy();
    // Clean up trash files created by test case
    deleteFolderRecursive(folder);
  });
});
