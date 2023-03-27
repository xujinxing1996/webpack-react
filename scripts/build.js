process.env.NODE_ENV = 'production';

const fs = require('fs');
const chalk = require('chalk');
const webpack = require('webpack');
const webpackConfig = require('../config/webpack.config');
const {
  measureFileSizesBeforeBuild,
  printFileSizesAfterBuild,
} = require('react-dev-utils/FileSizeReporter');

// 超过以下尺寸的包会发出警告。
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

console.log('开始打包...');
const cleanAndRebuild = () =>
  new Promise((resolve, reject) => {
    webpack(webpackConfig, (err, stats) => {
      if (err || stats.hasErrors()) {
        console.log(`error`, err);
        reject(err);
      }
      resolve(stats);
      // Done processing
    });
  });

measureFileSizesBeforeBuild('dist').then((previousFileSizes) => {
  console.log('gzip 压缩后大小:\n');
  fs.rmSync('dist', { recursive: true, force: true });
  return cleanAndRebuild().then((webpackStats) => {
    printFileSizesAfterBuild(
      webpackStats,
      previousFileSizes,
      'dist',
      WARN_AFTER_BUNDLE_GZIP_SIZE,
      WARN_AFTER_CHUNK_GZIP_SIZE
    );

    console.log(chalk.bgGreen('\n构建完成\n'));
  });
});
// compiler.run();
