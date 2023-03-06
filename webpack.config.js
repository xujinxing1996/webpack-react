const { mode } = require('webpack-nano/argv');
const { merge } = require('webpack-merge');
const commonConfig = require('./config/webpack.common');
const developmentConfig = require('./config/webpack.development');
const productionConfig = require('./config/webpack.production');

const getConfig = (mode) => {
  switch (mode) {
    case 'production':
      return merge([commonConfig, productionConfig, { mode }]);
    case 'development':
      return merge([commonConfig, developmentConfig, { mode }]);
    default:
      throw new Error(`Trying to use an unknown mode, ${mode}`);
  }
};

module.exports = getConfig(mode);
