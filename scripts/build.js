process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const webpackConfig = require('../config/webpack.config');

console.log('开始打包...');
webpack(webpackConfig, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.log(`error`, err);
  }
  // Done processing
});
// compiler.run();
