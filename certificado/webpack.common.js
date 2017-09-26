const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './index.html',
  filename: 'index.html',
  inject: 'body'
});

const paths = {
  entry: path.join(__dirname, 'src', 'Application.js'),
  output: path.join(__dirname, 'dist')
}

module.exports = {

  entry: paths.entry,

  output: {
    filename: 'bundle.js',
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
    new CleanWebpackPlugin([paths.output]),
    HtmlWebpackPluginConfig
  ]
}
