const env = process.env.WEBPACK_MODE;
const PRODUCTION = 'production';

const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const config = {
  entry: './bin/get-lock-screen-image.js',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'get-lock-screen-image.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        loader: 'shebang-loader',
      },
    ],
  },
  optimization: (env === PRODUCTION ? {
    minimize: true,
    minimizer: [new TerserPlugin(
      {
        terserOptions: {
          output: {
            comments: false,
          },
        },
        test: /\.js(\?.*)?$/i,
        extractComments: false,
      },
    )],
    splitChunks: {
      chunks: 'async',
      minChunks: 1,
    },
  } : {}),
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
};

module.exports = config;
