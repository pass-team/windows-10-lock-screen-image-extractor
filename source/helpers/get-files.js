const fs = require('fs');

module.exports = function (folder) {
  return fs.readdirSync(folder);
};
