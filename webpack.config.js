const env = process.env.WEBPACK_MODE;
const PRODUCTION = 'production';

const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const targetPath = path.resolve(__dirname, 'build/bin');

const config = {
  entry: './bin/get-lock-screen-image.js',
  target: 'node',
  output: {
    path: targetPath,
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
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'node_modules/wallpaper/source/win-wallpaper.exe',
          to: '../node_modules/wallpaper/source/win-wallpaper.exe',
        },
      ],
    }),
  ],
};

module.exports = config;
