/* eslint-disable no-console */
import fs from 'fs';
import logger from 'caporal/lib/logger';
import chalk from 'chalk';
import {
  IMAGE_NAME_FORMAT_HASH,
  ORIENTATION_ALL,
  DEFAULT_SAVE_PATH,
} from '../../../source/constants';
import {
  getImages,
} from '../../../source/actions';
import hashFile from '../../../source/helpers/hash-file';
import argumentsPrompt from '../../../source/helpers/arguments-prompt';
import deleteFolderRecursive from '../../mock-data/delete-folder-recursive';

jest.mock('caporal/lib/logger');
jest.mock('../../../source/helpers/arguments-prompt');
jest.mock('../../../source/constants');
// jest.mock('../../../source/helpers/get-files');

let infoRecord = '';
// eslint-disable-next-line no-unused-vars
let warnRecord = '';
// eslint-disable-next-line no-unused-vars
let errorRecord = '';

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
  error: jest.fn(
    (data) => {
      errorRecord += data;
    },
  ),
}));

describe('Action - Feature get-images', () => {
  const myLogger = mockLogger();
  // const path = `${process.cwd()}\\tests\\mock-assets\\`;
  it('Should be able to get images with provided cli arguments', async () => {
    const folder = 'D://screen-images';
    const answers = {
      path: folder, orientation: ORIENTATION_ALL, namePattern: IMAGE_NAME_FORMAT_HASH,
    };
    process.argv = ['a', 'b'];
    argumentsPrompt.mockImplementation(() => answers);
    await getImages({}, {}, myLogger);
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
    process.argv = ['a', 'b'];
    argumentsPrompt.mockImplementation(() => answers);
    await getImages({}, {}, myLogger);
    expect(fs.readdirSync(folder).length).toEqual(6);
    fs.readdirSync(folder).forEach((file, index) => {
      expect(file).toEqual(`${hashFile(`${folder}/${fs.readdirSync(folder)[index]}`)}.jpg`);
    });
    deleteFolderRecursive(folder);
  });

  it('Should be able to get images that satisfy user’s answer', async () => {
    const folder = 'D://screen-images';
    const answers = {
      path: folder, orientation: ORIENTATION_ALL, namePattern: IMAGE_NAME_FORMAT_HASH,
    };
    await getImages({}, answers, myLogger);
    expect(fs.readdirSync(folder).length).toEqual(6);
    fs.readdirSync(folder).forEach((file, index) => {
      expect(file).toEqual(`${hashFile(`${folder}/${fs.readdirSync(folder)[index]}`)}.jpg`);
    });
    deleteFolderRecursive(folder);
  });

  it('Should avoid saving duplicate images', async () => {
    const folder = 'D://screen-images';
    const answers = {
      path: folder, orientation: ORIENTATION_ALL, namePattern: IMAGE_NAME_FORMAT_HASH,
    };
    argumentsPrompt.mockImplementation(() => false);
    await getImages({}, answers, myLogger);
    await getImages({}, answers, myLogger);
    expect(fs.readdirSync(folder).length).toEqual(6);
    deleteFolderRecursive(folder);
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
    await getImages({}, answers, myLogger);
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
