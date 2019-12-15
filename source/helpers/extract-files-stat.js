const fs = require('fs');
const { PATH_TO_IMAGE } = require('../constants');

module.exports = function (files) {
  const stats = [];
  for (let i = 0; i < files.length; i += 1) {
    const stat = fs.statSync(PATH_TO_IMAGE + files[i]);
    stats.push({
      name: files[i],
      mtime: stat.mtime,
      size: stat.size,
    });
  }
  return stats;
};
