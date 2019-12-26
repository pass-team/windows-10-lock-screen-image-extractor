const copyFile = require('./copy-file');

module.exports = function (files, src, dest, pattern) {
  return files.reduce((count, file, index) => {
    try {
      copyFile(file, src, dest, pattern, index);
      return count + 1;
    } catch (e) {
      if (e.code !== 'EEXIST') console.log(e);
      else return count;
    }
    return count;
  }, 0);
};
