const path = require('path');

module.exports = {
  entry: './get-screen.js',

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  externals: {
    os: 'commonjs os',
    fs: 'commonjs fs',
  },
  mode: 'production',
};
