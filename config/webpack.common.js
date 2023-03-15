const { merge } = require('webpack-merge');
const parts = require('./webpack.parts');

module.exports = merge([
  {
    entry: './src/index',
    resolve: {
      modules: ['node_modules'],
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.less', '.css'],
    },
    devtool: 'eval-cheap-module-source-map',
    performance: {
      hints: false,
    },
    stats: 'minimal',
  },
  parts.page({ title: 'Cli-Demo' }),
  parts.loadJavaScript(),
  parts.loadFont(),
  parts.loadImg(),
]);
