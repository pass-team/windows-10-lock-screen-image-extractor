import fs from 'fs';
import path from 'path';
import nixt from 'nixt/lib/nixt/runner';
import wallpaper from 'wallpaper';
import deleteFolderRecursive from '../mock-data/delete-folder-recursive';

describe('Feature random-desktop', () => {
  // Run test inside build folder
  const cwd = path.join(process.cwd(), '/build');
  // Remove user settings to avoid side effect on other test cases
  afterEach(() => {
    if (fs.existsSync(path.join(cwd, '\\.userconfig'))) {
      fs.unlinkSync(path.join(cwd, '\\.userconfig'));
    }
  });

  it('Should show "No existing images..." on first run', (done) => {
    nixt()
      .cwd(cwd)
      .run('get-lock-screen random-desktop')
      .stderr(/.*No existing images*/)
      .end(done);
  });

  it('Should change desktop wallpaper', (done) => {
    const folderName = 'D:\\w10-startup-lock-screen-extractor-get-image-folder\\'
    + `${Math.floor(Math.random() * Math.floor(10000))}\\`;
    nixt()
      .cwd(cwd)
      .exec(`get-lock-screen get-images -p ${folderName}`)
      .run('get-lock-screen random-desktop')
      .stdout(/.*New desktop background.*/)
      .end(async () => {
        const images = fs.readdirSync(folderName);
        const wallpaperName = path.basename(await wallpaper.get());
        expect(images.includes(wallpaperName)).toBe(true);
        done();
      });
    // Clean up trash files created by test case
    deleteFolderRecursive('D:\\w10-startup-lock-screen-extractor-get-image-folder\\');
  });
});
