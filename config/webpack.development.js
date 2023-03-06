const { merge } = require('webpack-merge');
const parts = require('./webpack.parts');

module.exports = merge([
  { entry: ['webpack-plugin-serve/client'], devtool: 'inline-source-map' },
  parts.devServer(),
]);
