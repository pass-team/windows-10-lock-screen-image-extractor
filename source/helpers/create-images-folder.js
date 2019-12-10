const fs = require('fs');

module.exports = function (path) {
  try {
    fs.mkdirSync(path);
  } catch (e) {
    if (e.code !== 'EEXIST') return false;
  }
  return true;
};
