const fs = require('fs');
const { normalizePath } = require('../helpers');

module.exports = function (path) {
  const filePath = normalizePath(path);
  const files = fs.readdirSync(filePath);
  return files.map((file) => ({
    name: file,
    path: filePath,
  }));
};
