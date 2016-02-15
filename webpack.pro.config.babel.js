import path from 'path'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
// import devConfig from './webpack.dev.config'

module.exports = {
  //devtool: 'cheap-module-eval-source-map',
  entry: {
    bundle : './src/main',
    //jquery : ['jquery'],
    //'webpack-hot-middleware/client?reload=true',
    //'./src/main'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.scss'],
    // alias: {
    //   'react': pathToReact
    // }
  },
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'js/bundle.js',
    publicPath: '../'
  },
  module: {
    loaders: [
      {
        test: /\.(js)$/,
        loaders: ['babel'],
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css?sourceMap&-restructuring!autoprefixer'),
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css?sourceMap&-restructuring!autoprefixer!sass'),
        exclude: /node_modules/,
        include: __dirname
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
        loader: 'url?limit=1&name=images/[name].[ext]'
      },
    ]
  },
  plugins: [
    // new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.HotModuleReplacementPlugin(),//热替换模块(非webpack-dev模式)
    // new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('css/style.css', {
      disable: false,
      allChunks: true
    }),
    //new webpack.optimize.CommonsChunkPlugin('jquery', 'js/jquery.js'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false
      }
    }),
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   jQuery:'jquery'
    // })
  ],
  externals: {
    // "jquery": 'window.jQuery',
    // "jquery": 'window.$',
  },
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
