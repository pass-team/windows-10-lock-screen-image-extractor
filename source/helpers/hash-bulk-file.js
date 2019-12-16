const hashFile = require('./hash-file');

module.exports = function (folder, files) {
  const filePaths = files.map((file) => folder + file);

  return filePaths.map((e) => hashFile(e));
};
