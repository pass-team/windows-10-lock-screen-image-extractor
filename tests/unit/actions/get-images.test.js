/* eslint-disable no-console */
import fs from 'fs';
import chalk from 'chalk';
import path from 'path';
import stripAnsi from 'strip-ansi';
import {
  IMAGE_NAME_FORMAT_HASH,
  ORIENTATION_ALL,
  DEFAULT_SAVE_PATH,
} from '../../../source/constants';
import {
  getImages,
} from '../../../source/actions';
import hashFile from '../../../source/helpers/hash-file';
import extendLogger from '../../../source/helpers/extend-logger';
import argumentsPrompt from '../../../source/helpers/arguments-prompt';
import deleteFolderRecursive from '../../mock-data/delete-folder-recursive';

jest.mock('../../../source/helpers/arguments-prompt');
jest.mock('../../../source/constants');

let infoRecord = '';
let errorRecord = '';

const mockLogger = extendLogger();
mockLogger.info = (data) => {
  infoRecord += data;
};
mockLogger.error = (data) => {
  errorRecord += data;
};
mockLogger.log = jest.fn();

describe('Action - Function get-images', () => {
  beforeEach(() => {
    infoRecord = '';
    errorRecord = '';
  });

  afterEach(() => {
    if (fs.existsSync(path.join(process.cwd(), '\\.userconfig'))) {
      fs.unlinkSync(path.join(process.cwd(), '\\.userconfig'));
    }
  });

  it('Should be able to get images that satisfy user’s answer', async () => {
    const folder = 'D://screen-images';
    const answers = {
      path: folder, orientation: ORIENTATION_ALL, namePattern: IMAGE_NAME_FORMAT_HASH,
    };
    await getImages({}, answers, mockLogger);
    expect(fs.readdirSync(folder).length).toEqual(6);
    fs.readdirSync(folder).forEach((file, index) => {
      expect(file).toEqual(`${hashFile(`${folder}/${fs.readdirSync(folder)[index]}`)}.jpg`);
    });
    deleteFolderRecursive(folder);
  });

  it('Should be able to get images with default arguments', async () => {
    const folder = DEFAULT_SAVE_PATH;
    const answers = {
      namePattern: IMAGE_NAME_FORMAT_HASH,
    };
    const oldProcessArgv = process.argv;
    process.argv = ['a', 'b'];
    argumentsPrompt.mockImplementation(() => answers);
    await getImages({}, {}, mockLogger);
    expect(fs.readdirSync(folder).length).toEqual(6);
    fs.readdirSync(folder).forEach((file, index) => {
      expect(file).toEqual(`${hashFile(`${folder}/${fs.readdirSync(folder)[index]}`)}.jpg`);
    });

    process.argv = oldProcessArgv;
    deleteFolderRecursive(folder);
  });

  it('Should be able to get images with provided cli arguments', async () => {
    const folder = 'D://screen-images';
    const answers = {
      path: folder, orientation: ORIENTATION_ALL, namePattern: IMAGE_NAME_FORMAT_HASH,
    };
    const oldProcessArgv = process.argv;
    process.argv = ['a', 'b'];
    argumentsPrompt.mockImplementation(() => answers);
    await getImages({}, {}, mockLogger);
    expect(fs.readdirSync(folder).length).toEqual(6);
    fs.readdirSync(folder).forEach((file, index) => {
      expect(file).toEqual(`${hashFile(`${folder}/${fs.readdirSync(folder)[index]}`)}.jpg`);
    });
    process.argv = oldProcessArgv;
    deleteFolderRecursive(folder);
  });

  it('Should avoid saving duplicate images', async () => {
    const folder = 'D://screen-images';
    const answers = {
      path: folder, orientation: ORIENTATION_ALL, namePattern: IMAGE_NAME_FORMAT_HASH,
    };
    argumentsPrompt.mockImplementation(() => false);
    await getImages({}, answers, mockLogger);
    await getImages({}, answers, mockLogger);
    expect(fs.readdirSync(folder).length).toEqual(6);
    deleteFolderRecursive(folder);
  });

  it('Should print "Error while creating images folder" when fail to create saved folder', async () => {
    const folder = 'D:/"';
    const answers = {
      path: folder, orientation: ORIENTATION_ALL, namePattern: IMAGE_NAME_FORMAT_HASH,
    };
    const oldProcessArgv = process.argv;
    process.argv = ['a', 'b'];
    argumentsPrompt.mockImplementation(() => answers);
    await getImages({}, {}, mockLogger);
    expect(
      stripAnsi(errorRecord)
        .includes('Error while creating images folder! The path provided is invalid or being used by other processes.'),
    ).toBeTruthy();
    process.argv = oldProcessArgv;
  });

  it('Should throw an error when the path is invalid', async () => {
    const folder = 'D:/';
    const answers = {
      path: folder, orientation: ORIENTATION_ALL, namePattern: IMAGE_NAME_FORMAT_HASH,
    };
    const oldProcessArgv = process.argv;
    process.argv = ['a', 'b'];
    argumentsPrompt.mockImplementation(() => answers);
    try {
      await getImages({}, {}, mockLogger);
    } catch (e) {
      expect(e.message).toEqual(expect.stringContaining('ER01'));
    }
    process.argv = oldProcessArgv;
  });

  it('Should require keypress to exit when not run from cli', async () => {
    const folder = `D:/w10-startup-lock-screen-extractor/${Math.floor(Math.random() * Math.floor(10000))}/`;
    const answers = {
      path: folder,
      orientation: ORIENTATION_ALL,
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
    await getImages({}, answers, mockLogger);
    // Expect output from function wait-key-to-exit
    expect(infoRecord.includes(chalk.cyan('\nPress any key to exit..'))).toBeTruthy();
    // Restore mock
    console.log = oldConsoleLog;
    process.argv = oldProcessArgv;
    process.title = oldProcessTitle;
    process.exit = oldProcessExit;
    deleteFolderRecursive(folder);
  });
});
