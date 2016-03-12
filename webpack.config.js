var webpack = require('webpack');
var path = require('path');

var providePlugin = new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
});

var vendor = new webpack.optimize.CommonsChunkPlugin('vendor', 'bundle.vendor.js');
//这是第三方库打包生成

var env = new webpack.DefinePlugin({
  "process.env": {
    NODE_ENV: JSON.stringify("production")
  }
});

var compressjs = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false
  }
});

var ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.production = {
  entry: {
    index: './src/index.js',
    vendor: [
      'jquery',
    ]
  },
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.(css|scss)$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader?minimize")
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }, {
        test: /\.(png|jpg|gif|woff)$/,
        loader: 'url-loader?limit=8192'
      }, {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      }
    ]
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js', '.json', '.scss', '.png', 'jpg']
  },
  plugins: [
    providePlugin,
    vendor,
    compressjs,
    new ExtractTextPlugin('assets.css', {allChunks: true})
  ]
};