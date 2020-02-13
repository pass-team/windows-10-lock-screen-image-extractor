/* eslint-disable no-console */
import fs from 'fs';
import chalk from 'chalk';
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
  const myLogger = mockLogger();
  const folder = 'D://screen-images';

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
    await showSettings({}, {}, myLogger);

    expect(warnRecord.includes('No user settings has been recorded yet')).toBeTruthy();
  });

  it('Should print out path to images', async () => {
    const answers = {
      path: folder,
      orientation: ORIENTATION_LANDSCAPE,
      namePattern: IMAGE_NAME_FORMAT_HASH,
    };
    await getImages({}, answers, myLogger);
    await showSettings({}, {}, myLogger);

    expect(infoRecord.includes(`file://${folder}`)).toBeTruthy();
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
      infoRecord += data;
    });
    const oldProcessExit = process.exit;
    process.exit = jest.fn(() => {
      infoRecord += 'Exit';
    });
    // Get images
    await getImages({}, answers, myLogger);
    // Run show-settings
    await showSettings({}, {}, myLogger);
    // Expect output from function wait-key-to-exit
    expect(infoRecord.includes(chalk.cyan('\nPress any key to exit..'))).toBeTruthy();
    // Restore mock
    console.log = oldConsoleLog;
    process.argv = oldProcessArgv;
    process.title = oldProcessTitle;
    process.exit = oldProcessExit;
  });
});
