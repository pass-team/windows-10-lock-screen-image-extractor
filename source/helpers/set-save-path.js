const fs = require('fs');
const { PATH_TO_CONFIG } = require('../constants');

module.exports = function (path) {
  fs.writeFileSync(PATH_TO_CONFIG, path);
};
