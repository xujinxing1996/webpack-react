const { merge } = require('webpack-merge');
const parts = require('./webpack.parts');

module.exports = merge([
  parts.minifyCSS({ options: { preset: ['default'] } }),
  {
    output: {
      filename: '[name].[contenthash].js',
    },
  },
]);
