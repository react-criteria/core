'use strict'

const ESLintPlugin = require('eslint-webpack-plugin')
const babelOptions = require('./babel.config')

module.exports = {
  output: {
    library: {
      type: 'umd',
      name: 'ReactCriteria'
    }
  },
  externals: ['react'],
  plugins: [new ESLintPlugin()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions
        }
      }
    ]
  }
}
