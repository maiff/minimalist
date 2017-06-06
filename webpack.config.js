const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const rm = require('rimraf').sync
const DEV = process.env.NODE_ENV !== 'production';

const config = {
  context: path.resolve(__dirname, 'src'),/*?*/
  entry: [
    './index.js'
  ],
  node: {
    __dirname: true,/*?*/
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: 'http://localhost:8888/dist/'/*?*/
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: ['babel-loader']
      }
    ]
  },
};

config.module.rules.push({
  test: /\.(jpe?g|png|gif|ttf)$/i,
  loaders: DEV ? "url-loader" : 'file-loader',/*?*/
  query: DEV ? {} : {
    name: 'static/[name]-[hash:8].[ext]',/*?*/
    publicPath: config.output.publicPath,/*?*/
  }
});


if (DEV) {
  config.devtool = '#cheap-module-eval-source-map';
  config.entry.unshift(
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8888',
    'webpack/hot/only-dev-server'
  );
  config.output.publicPath = 'http://localhost:8888/dist/';
  config.plugins.push(new webpack.HotModuleReplacementPlugin());

} else {
  rm('./dist/*')
  config.output.filename = "index.js";
}


module.exports = config;