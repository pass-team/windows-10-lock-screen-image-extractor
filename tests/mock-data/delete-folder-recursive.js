import fs from 'fs';

const deleteFolderRecursive = (path) => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file) => {
      const recursivePath = `${path}/${file}`;
      if (fs.lstatSync(recursivePath).isDirectory()) { // recurse
        deleteFolderRecursive(recursivePath);
      } else { // delete file
        fs.unlinkSync(recursivePath);
      }
    });
    fs.rmdirSync(path);
  }
};

export default deleteFolderRecursive;
