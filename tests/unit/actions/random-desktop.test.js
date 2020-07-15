/* eslint-disable no-throw-literal, no-console */
import fs from 'fs';
import path from 'path';
import wallpaper from 'wallpaper';
import chalk from 'chalk';
import stripAnsi from 'strip-ansi';
import {
  ERROR_CODES,
  IMAGE_NAME_FORMAT_HASH,
  ORIENTATION_LANDSCAPE,
  PATH_TO_CONFIG,
} from '../../../source/constants';
import getImages from '../../../source/actions/get-images';
import randomDesktop from '../../../source/actions/random-desktop';
import deleteFolderRecursive from '../../mock-data/delete-folder-recursive';
import extendLogger from '../../../source/helpers/extend-logger';

let infoRecord = [];
let warnRecord = [];
let errorRecord = [];

const mockLogger = extendLogger();
mockLogger.info = (data, meta) => {
  infoRecord.push({
    data,
    meta,
  });
};
mockLogger.warn = (data, meta) => {
  warnRecord.push({
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

describe('Action - Function random-desktop', () => {
  // Reset logging recorder
  beforeEach(() => {
    infoRecord = [];
    warnRecord = [];
    errorRecord = [];
  });

  // Run test inside build folder
  // Remove user settings to avoid side effect on other test cases
  afterEach(() => {
    if (fs.existsSync(path.join(process.cwd(), '\\.userconfig'))) {
      fs.unlinkSync(path.join(process.cwd(), '\\.userconfig'));
    }
    deleteFolderRecursive('D:/w10-startup-lock-screen-extractor/');
  });

  it('Should be able to set new desktop wallpaper after successfully get images ', async () => {
    const folder = `D:/w10-startup-lock-screen-extractor/${Math.floor(Math.random() * Math.floor(10000))}/`;
    await getImages({}, {
      path: folder,
      orientation: ORIENTATION_LANDSCAPE,
      namePattern: IMAGE_NAME_FORMAT_HASH,
    }, mockLogger);
    await randomDesktop({}, {}, mockLogger);
    const images = fs.readdirSync(folder);
    const wallpaperName = path.basename(await wallpaper.get());
    // Expect images exists images folder
    // And it display success message
    expect(images.includes(wallpaperName)).toBeTruthy();
    expect(
      infoRecord.some((record) => stripAnsi(record.data) === '\nNew desktop background has been set!'
        && record.meta?.isMessage === true),
    ).toBeTruthy();
  });

  it('Should display “No existing images…“ when image folder does not exist', async () => {
    // Mock an empty .userconfig file, which should be containing path to image folder
    fs.writeFileSync(PATH_TO_CONFIG, '');
    await randomDesktop({}, {}, mockLogger);
    expect(
      errorRecord.some((record) => stripAnsi(record.data) === 'No existing images, try getting the images first.'
        + '\nType get-lock-screen get-images to get images'
        && record.meta?.errorCode === ERROR_CODES.RUNTIME_ERROR_003),
    ).toEqual(true);
  });

  it('Should display “No existing images…“ when found no image to use', async () => {
    const folder = `D:/w10-startup-lock-screen-extractor/${Math.floor(Math.random() * Math.floor(10000))}/`;
    // Mock an empty .userconfig file, which should be containing path to image folder
    fs.writeFileSync(PATH_TO_CONFIG, folder);
    await randomDesktop({}, {}, mockLogger);
    expect(
      errorRecord.some((record) => stripAnsi(record.data) === 'No existing images, try getting the images first.'
        + '\nType get-lock-screen get-images to get images'
        && record.meta?.errorCode === ERROR_CODES.RUNTIME_ERROR_003),
    ).toEqual(true);
  });

  it('Should display “Unexpected errors…“ when fail to set wallpaper for some reasons', async () => {
    const folder = `D:/w10-startup-lock-screen-extractor/${Math.floor(Math.random() * Math.floor(10000))}/`;
    // Mock process.argv to bypass prompt which leads to timeOut
    const oldProcessArgv = process.argv;
    process.argv = [...oldProcessArgv, '', ''];
    await getImages({}, {
      path: folder,
      orientation: ORIENTATION_LANDSCAPE,
      namePattern: IMAGE_NAME_FORMAT_HASH,
    }, mockLogger);
    // Mock error while retrieving setWallpaper binary
    const old = fs.writeFileSync;
    fs.writeFileSync = jest.fn(() => {
      throw 'Unexpected Error';
    });
    await randomDesktop({}, {}, mockLogger);
    // Mock an empty .userconfig file, which should be containing path to image folder
    expect(
      errorRecord.some((record) => stripAnsi(record.data) === 'Error setting new desktop wallpaper!'
        + '\nType get-lock-screen random-desktop --help for help'
        && record.meta?.errorCode === ERROR_CODES.RUNTIME_ERROR_002),
    ).toEqual(true);
    fs.writeFileSync = old;
    process.argv = oldProcessArgv;
  });

  it('Should require keypress to exit when not run from cli', async () => {
    const folder = `D:/w10-startup-lock-screen-extractor/${Math.floor(Math.random() * Math.floor(10000))}/`;
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
      infoRecord.push(infoRecord);
    });
    // Get images
    await getImages({}, {
      path: folder,
      orientation: ORIENTATION_LANDSCAPE,
      namePattern: IMAGE_NAME_FORMAT_HASH,
    }, mockLogger);
    // Run random-desktop
    await randomDesktop({}, {}, mockLogger);
    // Expect output from function wait-key-to-exit
    expect(infoRecord.includes(chalk.cyan('\nPress any key to exit..'))).toBeTruthy();
    // Restore mock
    console.log = oldConsoleLog;
    process.argv = oldProcessArgv;
    process.title = oldProcessTitle;
    process.exit = oldProcessExit;
  });
});
