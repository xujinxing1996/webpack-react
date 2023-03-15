const { merge } = require('webpack-merge');
const parts = require('./webpack.parts');

module.exports = merge([
  {
    output: {
      filename: 'js/[name].[contenthash:8].js',
      chunkFilename: 'js/[name].chunk.[chunkhash:8].js',
    },
    optimization: {
      splitChunks: {
        chunks: 'async',
        minSize: 20000,
        minRemainingSize: 0,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        enforceSizeThreshold: 50000,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
      // splitChunks: {
      //   chunks: 'all',
      //   minSize: 30000,
      //   minChunks: 2,
      //   maxAsyncRequests: 5,
      //   maxInitialRequests: 3,
      //   automaticNameDelimiter: '~',
      //   name: true,
      //   cacheGroups: {
      //     vendor: {
      //       // node_modules内的依赖库
      //       chunks: 'all',
      //       test: /[\\/]node_modules[\\/]/,
      //       name: 'vendor',
      //     },
      //     styles: {
      //       name: 'styles',
      //       test: /(\.css|\.less)$/,
      //       chunks: 'all',
      //     },
      //   },
      // },
    },
    plugins: [parts.extractCss().plugin],
  },
  parts.loadCSS(parts.extractCss().loader),
]);
