const hasha = require('hasha');

module.exports = function (uri) {
  return hasha.fromFileSync(uri, { algorithm: 'md5' });
};
