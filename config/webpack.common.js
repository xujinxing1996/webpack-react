const { merge } = require('webpack-merge');
const parts = require('./webpack.parts');

module.exports = merge([
  {
    entry: ['./src'],
    resolve: {
      extensions: ['.js', '.jsx'],
    },
  },

  parts.page({ title: 'Demo' }),
  parts.extractCss(),
  parts.loadJavaScript(),
  parts.clean(),
]);
