const { merge } = require('webpack-merge');
const parts = require('./webpack.parts');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = merge([
  {
    plugins: [
      new ReactRefreshWebpackPlugin({
        overlay: false,
      }),
    ],
  },
  parts.loadCSS('style-loader'),
  parts.generateSourceMaps('cheap-module-source-map'),
  parts.errorOverlay(),
  parts.progressBar(),
]);
