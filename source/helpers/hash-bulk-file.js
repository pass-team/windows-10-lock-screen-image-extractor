const hashFile = require('./hash-file');

module.exports = function (files) {
  return files.map(({ path, name }) => hashFile(path + name));
};
