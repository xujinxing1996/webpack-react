const { merge } = require('webpack-merge');
const parts = require('./webpack.parts');
const paths = require('./paths');

module.exports = merge([
  {
    entry: paths.appIndexJs,
    resolve: {
      modules: ['node_modules'],
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.less', '.css'],
    },
    performance: {
      hints: false,
    },
    stats: 'minimal',
  },
  parts.page({ title: 'cli-demo' }),
  parts.loadJavaScript(),
  parts.loadFont(),
  parts.loadImg(),
]);
