const { exec } = require('pkg');

const {
} = require('../helpers');

/* Action that pack the app into one single Windows executable file */
module.exports = async function (args, options, logger) {
  await exec(['app.js', '--target', 'host', '--output', 'app.exe']);
};
