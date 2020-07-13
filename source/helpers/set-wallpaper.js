import fs from 'fs';
import { execFileSync } from 'child_process';
import findUp from 'find-up';

export default function (imagePath) {
  /**
   *   Extract binary file from module wallpaper or the fake file system inside pkg build file
   *   Then expose the binary to the real windows file system
   */
  console.log(__dirname);
  const pathToBinary = `${findUp.sync('node_modules', { type: 'directory', cwd: __dirname })}`
    + '\\wallpaper\\source\\win-wallpaper.exe';
  console.log(pathToBinary);
  const wallpaperBinary = `${process.cwd()}/wallpaper-setter.exe`;
  /**
   *   For debugging the pkg file system
   *   function walkDir(dir, callback) {
        fs.readdirSync(dir).forEach((f) => {
          const dirPath = path.join(dir, f);
          if (/.+wallpaper.+/.test(dirPath)) {
            console.log(dirPath);
          }
          const isDirectory = fs.statSync(dirPath).isDirectory();
          isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
        });
      }
   walkDir(path.join(__dirname, '../../..'), callback);
   */
  try {
    const fileBuffer = fs.readFileSync(pathToBinary);
    fs.writeFileSync(wallpaperBinary, fileBuffer);
  } catch (e) {
    console.log(e);
    return false;
  }
  // Execute binary with path argument to set the windows wallpaper then immediately delete it
  execFileSync(wallpaperBinary, [imagePath]);
  fs.unlinkSync(wallpaperBinary);
  return true;
}
