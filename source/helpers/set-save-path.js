const fs = require('fs');
const { PATH_TO_CONFIG } = require('../constants');
const { normalizePath } = require('../helpers');

module.exports = function (path) {
  fs.writeFileSync(PATH_TO_CONFIG, normalizePath(path));
};
