const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const paths = {
  entry: path.join(__dirname, 'src', 'Application.js'),
  output: path.join(__dirname, 'dist')
};

const CleanWebpackPluginConfig = new CleanWebpackPlugin([paths.output]);

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './index.html',
  filename: 'index.html',
  inject: 'body'
});

const CommonsChunkPluginConfig = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor'
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'runtime'
  })
];

module.exports = {

  entry: {
    main: paths.entry,
    vendor: [
      'react',
      'react-dom'
    ]
  },

  output: {
    path: paths.output
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        }
      },

      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },

      {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },

  plugins: [
    ...CommonsChunkPluginConfig,
    CleanWebpackPluginConfig,
    HtmlWebpackPluginConfig
  ]
}
