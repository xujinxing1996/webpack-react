const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const developmentConfig = require('./webpack.development');
const productionConfig = require('./webpack.production');

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

module.exports = getConfig(process.env.NODE_ENV);
