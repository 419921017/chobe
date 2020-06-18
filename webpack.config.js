const path = require('path');
const html_config = require('./config/index.js');
const WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//提取css到单独文件的插件

const config = {
  mode: WEBPACK_ENV === 'dev' ? "development" : "production",
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
  },
  externals: {
    'jquery': 'window.jQuery',
  },
  module: {
    rules: [{
      test: /\.js/,
      use: {
        loader: 'babel-loader',
      }
    }, {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        // 'style-loader',
        'css-loader'
      ],
    }, {
      test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)\??.*$/,
      loader: 'file-loader?limit=100&name=images/[name].[ext]',
    }, {
      test: /\.template$/,
      use: ['html-loader']
    }]
  },
  resolve: {
    alias: {
      images: __dirname + '/src/public/images',
      utils: __dirname + '/src/utils'
    }
  },
  devServer: {
    port: 8080,
    inline: true,
    noInfo: true,
    open: true,
    contentBase: path.join(__dirname, 'dist'),
  }
}
config.entry = html_config.entryList();
config.plugins = html_config.pluginList();
config.plugins.push(new CopyWebpackPlugin({
  patterns: [
    { from: 'src/public/js/', to: 'js/' },
    { from: 'src/public/css/', to: 'css/' },
    { from: 'src/public/images/', to: 'images/' },
  ],
}));
// config.plugins.push(new MiniCssExtractPlugin({
//   // 类似 webpackOptions.output里面的配置 可以忽略
//   filename: '[name].css',
//   chunkFilename: '[id].css',
// }))
module.exports = config;