/* eslint-disable no-throw-literal, no-console */
import fs from 'fs';
import path from 'path';
import wallpaper from 'wallpaper';
import chalk from 'chalk';
import logger from 'caporal/lib/logger';
import {
  IMAGE_NAME_FORMAT_HASH,
  ORIENTATION_LANDSCAPE,
  PATH_TO_CONFIG,
} from '../../../source/constants';
import getImages from '../../../source/actions/get-images';
import randomDesktop from '../../../source/actions/random-desktop';
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

describe('Action - Function random-desktop', () => {
  const myLogger = mockLogger();
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
    }, myLogger);
    await randomDesktop({}, {}, myLogger);
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
    await randomDesktop({}, {}, myLogger);
    expect(infoRecord).toEqual(chalk.cyan('\nStart processing'));
    expect(warnRecord)
      .toEqual(chalk.yellow('\nNo existing images, try getting the images first, run "get-lock-screen -h" for usage'));
  });

  it('Should display “No existing images…“ when found no image to use', async () => {
    const folder = `D:/w10-startup-lock-screen-extractor/${Math.floor(Math.random() * Math.floor(10000))}/`;
    // Mock an empty .userconfig file, which should be containing path to image folder
    fs.writeFileSync(PATH_TO_CONFIG, folder);
    await randomDesktop({}, {}, myLogger);
    expect(warnRecord)
      .toEqual(chalk.yellow('\nNo existing images, try getting the images first, run "get-lock-screen -h" for usage'));
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
    }, myLogger);
    // Mock error while retrieving setWallpaper binary
    const old = fs.writeFileSync;
    fs.writeFileSync = jest.fn(() => {
      throw 'Unexpected Error';
    });
    await randomDesktop({}, {}, myLogger);
    // Mock an empty .userconfig file, which should be containing path to image folder
    expect(warnRecord).toEqual(chalk.yellow('\nUnexpected errors!'));
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
    }, myLogger);
    // Run random-desktop
    await randomDesktop({}, {}, myLogger);
    // Expect output from function wait-key-to-exit
    expect(infoRecord.includes(chalk.cyan('\nPress any key to exit..'))).toBeTruthy();
    // Restore mock
    console.log = oldConsoleLog;
    process.argv = oldProcessArgv;
    process.title = oldProcessTitle;
    process.exit = oldProcessExit;
  });
});
