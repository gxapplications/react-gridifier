'use strict'

const Path = require('path')

module.exports = {
  entry: './example/bootstrap.jsx',
  output: {
    path: Path.join(__dirname, 'example/build'),
    filename: 'bundle.js',
    publicPath: '/example/build'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: __dirname,
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        include: __dirname,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  devtool: 'cheap-module-source-map'
}
