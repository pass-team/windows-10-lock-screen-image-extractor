/* eslint-disable no-throw-literal, no-console */
import fs from 'fs';
import path from 'path';
import wallpaper from 'wallpaper';
import chalk from 'chalk';
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

let infoRecord = '';
let warnRecord = '';

const mockLogger = extendLogger();
mockLogger.info = (data) => {
  infoRecord += data;
};
mockLogger.warn = (data) => {
  warnRecord += data;
};
mockLogger.log = jest.fn();

describe('Action - Function random-desktop', () => {
  // Reset logging recorder
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
    expect(infoRecord.includes('New desktop background has been set')).toBeTruthy();
  });

  it('Should display “No existing images…“ when image folder does not exist', async () => {
    // Mock an empty .userconfig file, which should be containing path to image folder
    fs.writeFileSync(PATH_TO_CONFIG, '');
    await randomDesktop({}, {}, mockLogger);
    expect(infoRecord).toEqual(`${chalk.cyan('\nStart processing')}Type get-lock-screen get-images to get images`);
    expect(warnRecord)
      .toEqual(chalk.redBright(`\n${ERROR_CODES.RUNTIME_ERROR_004}: No existing images, try getting the images first`));
  });

  it('Should display “No existing images…“ when found no image to use', async () => {
    const folder = `D:/w10-startup-lock-screen-extractor/${Math.floor(Math.random() * Math.floor(10000))}/`;
    // Mock an empty .userconfig file, which should be containing path to image folder
    fs.writeFileSync(PATH_TO_CONFIG, folder);
    await randomDesktop({}, {}, mockLogger);
    expect(warnRecord)
      .toEqual(chalk.redBright(`\n${ERROR_CODES.RUNTIME_ERROR_003}: No existing images, try getting the images first`));
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
    expect(warnRecord).toEqual(chalk.redBright(`\n${ERROR_CODES.RUNTIME_ERROR_002}: `
      + 'Error setting new desktop wallpaper!'));
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
      infoRecord += data;
    });
    const oldProcessExit = process.exit;
    process.exit = jest.fn(() => {
      infoRecord += 'Exit';
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
