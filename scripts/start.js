process.env.NODE_ENV = 'development';

const parts = require('../config/webpack.parts');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../config/webpack.config');
const compiler = webpack(webpackConfig);

const devServer = new WebpackDevServer(parts.devServer(), compiler);

const runServer = async () => {
  console.log('Starting server...');
  await devServer.start();
};

runServer();
