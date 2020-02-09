import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';

function callback() {
  return true;
}

export default function (imagePath) {
  /**
   *   Extract binary file from module wallpaper or the fake file system inside pkg build file
   *   Then expose the binary to the real windows file system
   */
  console.log('__dirname');
  console.log(__dirname);
  console.log('wallpaper');
  console.log('CWD');

  // Construct relative path to required binary file base on __dirname
  // const relPathToBinary = `${/snapshot\\.+\\build\\source\\helpers/.test(__dirname) ? '../' : ''}`
  //   + '../../node_modules/wallpaper/source/win-wallpaper.exe';

  const relPathToBinary = '../../../node_modules/wallpaper/source/win-wallpaper.exe';
  const wallpaperBinary = `${process.cwd()}/wallpaper-setter.exe`;

  function walkDir(dir, callback) {
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

  try {
    const fileBuffer = fs.readFileSync(path.join(__dirname, relPathToBinary));
    console.log("Doc duoc file")
    fs.writeFileSync(wallpaperBinary, fileBuffer);
    console.log("Ghi duoc file")
  } catch (e) {
    console.log(e)
    return false;
  }
  // Execute binary with path argument to set the windows wallpaper then immediately delete it
  execFileSync(wallpaperBinary, [imagePath]);
  fs.unlinkSync(wallpaperBinary);
  return true;
}
