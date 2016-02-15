import path from 'path'
import webpack from 'webpack'
//var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    './src/main'
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.scss'],
    // alias: {
    //   'react': pathToReact
    // }
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  module: {
    loaders: [
      {
        test: /\.(js)$/,
        loaders: ['babel'],
        //exclude: /node_modules/,
        //include: __dirname
      },
      {
        test: /\.css$/,
        loaders: ['style','css?sourceMap','autoprefixer'],
        exclude: /node_modules/,
        //include: __dirname
      },
      {
        test: /\.scss$/,
        loaders: ['style','css?sourceMap','sass'],
        exclude: /node_modules/,
        //include: __dirname
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&name=font/[hash].[ext]&mimetype=application/font-woff"
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&name=font/[hash].[ext]&mimetype=application/font-woff"
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&name=font/[hash].[ext]&mimetype=application/octet-stream"
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file?&name=font/[hash].[ext]"
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&name=font/[hash].[ext]&mimetype=image/svg+xml"
      },
      {
        test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
        loader: 'url'
      },
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),//热替换模块(非webpack-dev模式)
    new webpack.NoErrorsPlugin(),
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   jQuery:'jquery'
    // })
  ],
  // externals: {
  //   "jquery": 'window.jQuery',
  //   "jquery": 'window.$',
  // },
}


// When inside Redux repo, prefer src to compiled version.
// You can safely delete these lines in your project.
// var reduxSrc = path.join(__dirname, '..', '..', 'src')
// var reduxNodeModules = path.join(__dirname, '..', '..', 'node_modules')
// var fs = require('fs')
// if (fs.existsSync(reduxSrc) && fs.existsSync(reduxNodeModules)) {
//   // Resolve Redux to source
//   module.exports.resolve = { alias: { 'redux': reduxSrc } }
//   // Compile Redux from source
//   module.exports.module.loaders.push({
//     test: /\.js$/,
//     loaders: ['babel'],
//     include: reduxSrc
//   })
// }
