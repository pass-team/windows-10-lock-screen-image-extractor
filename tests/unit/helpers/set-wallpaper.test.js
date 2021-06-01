import wallpaper from 'wallpaper';
import fs from 'fs';
import path from 'path';
import setWallpaper from '../../../source/helpers/set-wallpaper';

describe('Helper - Function set-wallpaper', () => {
  it('Should be able to set new desktop wallpaper', async () => {
    const mockPath = `${process.cwd()}/tests/mock-assets/`;
    const image = `${mockPath}/a`;
    const images = fs.readdirSync(mockPath);
    await setWallpaper(image);
    const wallpaperName = path.basename(await wallpaper.get());
    expect(images.includes(wallpaperName)).toBeTruthy();
  });
});
