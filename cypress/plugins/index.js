const webpack = require('@cypress/webpack-preprocessor');

module.exports = (on, config) => {
  const options = {
    ...config,
    webpackOptions: require('../cypress/webpack.config'),
  };

  on('file:preprocessor', webpack(options));

  return config;
};
