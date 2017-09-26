const merge = require('webpack-merge');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const common = require('./webpack.common');

module.exports = merge(common, {

  devtool: 'inline-source-map',

  devServer: {
    contentBase: common.output.path
  },

  output: {
    filename: '[name].bundle.js'
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new BundleAnalyzerPlugin()
  ]

});
