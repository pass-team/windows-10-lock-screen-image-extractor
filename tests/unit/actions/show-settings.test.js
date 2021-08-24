/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import stripAnsi from 'strip-ansi';
import {
  ERROR_CODES,
  IMAGE_NAME_FORMAT_HASH,
  ORIENTATION_LANDSCAPE,
} from '../../../source/constants/index.js';
import getImages from '../../../source/actions/get-images.js';
import showSettings from '../../../source/actions/show-settings.js';
import deleteFolderRecursive from '../../mock-data/delete-folder-recursive.js';
import extendLogger from '../../../source/helpers/extend-logger.js';

jest.mock('caporal/lib/logger.js');

let infoRecord = [];
let errorRecord = [];

const mockLogger = extendLogger();
mockLogger.info = (data, meta) => {
  infoRecord.push({
    data,
    meta,
  });
};
mockLogger.error = (data, meta) => {
  errorRecord.push({
    data,
    meta,
  });
};
mockLogger.log = jest.fn();

describe('Action - Function show-settings', () => {
  const folder = 'D://screen-images';

  beforeEach(() => {
    infoRecord = [];
    errorRecord = [];
  });

  // Run test inside build folder
  // Remove user settings to avoid side effect on other test cases
  afterEach(() => {
    if (fs.existsSync(path.join(process.cwd(), '\\.userconfig'))) {
      fs.unlinkSync(path.join(process.cwd(), '\\.userconfig'));
    }
  });

  it('Should display "No user settings has been recorded yet.." when .userconfig does not exist', async () => {
    await showSettings({}, {}, mockLogger);
    expect(
      errorRecord.some((record) => stripAnsi(record.data)
          === 'No user settings has been recorded yet, try getting the images first.'
          + '\nType "get-lock-screen -h" for help'
          && record.meta?.errorCode === ERROR_CODES.RUNTIME_ERROR_004),
    ).toBeTruthy();
  });

  it('Should print out path to images', async () => {
    const answers = {
      path: folder,
      orientation: ORIENTATION_LANDSCAPE,
      namePattern: IMAGE_NAME_FORMAT_HASH,
    };
    await getImages({}, answers, mockLogger);
    await showSettings({}, {}, mockLogger);

    expect(
      infoRecord.some((record) => stripAnsi(record.data)
        .includes(`\nImage saved folder(Ctrl + click to open): file://${folder}`)
          && record.meta?.isMessage === true),
    ).toBeTruthy();
    // Clean up trash files created by test case
    deleteFolderRecursive(folder);
  });

  it('Should require keypress to exit when not run from cli', async () => {
    const answers = {
      path: folder,
      orientation: ORIENTATION_LANDSCAPE,
      namePattern: IMAGE_NAME_FORMAT_HASH,
    };
    // Mock process.argv and process title to trigger Enter key to exit
    const oldProcessTitle = process.title;
    process.title = `${process.cwd()}\\get-lock-screen.exe`;
    const oldProcessArgv = process.argv;
    process.argv = [...oldProcessArgv, '', ''];
    const oldConsoleLog = console.log;
    console.log = jest.fn((data) => {
      infoRecord.push(data);
    });
    const oldProcessExit = process.exit;
    process.exit = jest.fn(() => {
      infoRecord.push('Exit');
    });
    // Get images
    await getImages({}, answers, mockLogger);
    // Run show-settings
    await showSettings({}, {}, mockLogger);
    // Expect output from function wait-key-to-exit
    expect(
      infoRecord.some((record) => stripAnsi(record) === '\nPress any key to exit..'),
    ).toBeTruthy();
    // expect(infoRecord.includes(chalk.cyan('\nPress any key to exit..'))).toBeTruthy();
    // Restore mock
    console.log = oldConsoleLog;
    process.argv = oldProcessArgv;
    process.title = oldProcessTitle;
    process.exit = oldProcessExit;
  });
});
