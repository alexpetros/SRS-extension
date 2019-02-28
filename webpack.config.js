// set up for chrome extensions with a little help from these code samples:
// https://gist.github.com/ayastreb/8f094c7ea17eb36cb1e6b5b9db9042c0
// https://github.com/checkly/puppeteer-recorder/blob/master/package.json

// set to 'production' or 'development' in your env
const env = process.env.NODE_ENV || 'development'

require('dotenv').config()
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const finalCSSLoader = (env === 'production') ? MiniCssExtractPlugin.loader : { loader: 'style-loader' }

module.exports = {
  mode: env,
  entry: ['babel-polyfill', './src/app.js'], // this is where our app lives
  devtool: 'source-map', // this enables debugging with source in chrome devtools
  node: { fs: 'empty' }, // weird env2 + webpack bug
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.jsx', '.json'],
  },
  module: {
    rules: [

      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
          { loader: 'eslint-loader' },
        ],
      },
      {
        test: /\.s?css/,
        use: [
          finalCSSLoader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg|woff(2)?|ttf|eot|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              useRelativePath: true,
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: require.resolve('./src/api/index.js'),
        use: [{
          loader: 'expose-loader',
          options: 'API',
        }],
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin(['APP_ACCESS_KEY', 'APP_SECRET']),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
    new CopyWebpackPlugin([
      { from: './src/manifest.json' },
      { from: './src/background.js' },
      { from: './src/img', to: './img/' },
    ]),
  ],
}

