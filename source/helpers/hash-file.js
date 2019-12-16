const hasha = require('hasha');

module.exports = function (filePath) {
  return hasha.fromFileSync(filePath, { algorithm: 'md5' });
};
