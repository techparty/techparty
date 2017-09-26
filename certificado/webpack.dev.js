const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common');

module.exports = merge(common, {

  devtool: 'inline-source-map',

  devServer: {
    contentBase: common.output.path
  },

  plugins: [
    new webpack.NamedModulesPlugin()
  ]

});
