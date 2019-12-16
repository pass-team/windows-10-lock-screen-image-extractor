const hashFile = require('./hash-file');
const { normalizePath } = require('../helpers');

module.exports = function (folder, files) {
  const filePaths = files.map((file) => normalizePath(folder) + file);
  return filePaths.map((e) => hashFile(e));
};
