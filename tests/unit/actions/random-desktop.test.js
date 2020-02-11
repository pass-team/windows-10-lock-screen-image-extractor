import fs from 'fs';
import path from 'path';
import os from 'os';
import wallpaper from 'wallpaper';
import {IMAGE_NAME_FORMAT_HASH, ORIENTATION_LANDSCAPE} from '../../../source/constants';
import getImages from '../../../source/actions/get-images';
import randomDesktop from '../../../source/actions/random-desktop';
import deleteFolderRecursive from './../../mock-data/delete-folder-recursive';

describe('Feature random-desktop', () => {
  // Run test inside build folder
  // Remove user settings to avoid side effect on other test cases
  afterEach(() => {
    if(fs.existsSync(path.join(process.cwd(), '\\.userconfig'))) {
      fs.unlinkSync(path.join(process.cwd(), '\\.userconfig'));
    }
  });

  it('Should set new desktop wallpaper', async () => {
    const folder = `D:/w10-startup-lock-screen-extractor-random-desktop-folder/${Math.floor(Math.random() * Math.floor(10000))}/`;
    console.log('Folder exist:' + fs.existsSync(folder));
    const cacheWallpaperFolder = `${os.homedir()}/AppData/Roaming/Microsoft/Windows/Themes/`;
    const logger = {
      info: jest.fn().mockReturnValue(''),
      warn: jest.fn().mockReturnValue(''),
      error: jest.fn().mockReturnValue(''),
    };

    await getImages({}, { path: folder, orientation: ORIENTATION_LANDSCAPE, namePattern: IMAGE_NAME_FORMAT_HASH }, logger);
    await randomDesktop({}, { path: folder, orientation: ORIENTATION_LANDSCAPE, namePattern: IMAGE_NAME_FORMAT_HASH }, logger);

    const images = fs.readdirSync(folder);
    const wallpaperName = path.basename(await wallpaper.get());
    console.log('images');
    console.log(images);
    console.log('wallpaperName');
    console.log(wallpaperName);
    console.log('fs.readdirSync(cacheWallpaperFolder)');
    console.log(fs.readdirSync(cacheWallpaperFolder));
    expect(images.includes(wallpaperName)).toBe(true);
    // Clean up trash files created by test case
    deleteFolderRecursive(folder);
  });
});
