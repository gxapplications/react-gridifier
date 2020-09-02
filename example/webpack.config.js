const HtmlWebpackPlugin = require('html-webpack-plugin')
const Path = require('path')

module.exports = {
  entry: './example/bootstrap.jsx',
  devtool: 'source-map',
  mode: 'development',
  resolve: {
    extensions: ['.jsx', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(js)x?$/,
        exclude: /node_modules/,
        include: Path.join(__dirname, '..'),
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }]
      },
      {
        // Preprocess your css files
        test: /\.css$/,
        exclude: /node_modules/,
        include: Path.join(__dirname, '..'),
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  devServer: {
    port: 4000,
    open: true,
    compress: true,
    historyApiFallback: true,
    hot: true
  },
  output: {
    path: Path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'WebDevServer',
      filename: 'index.html',
      template: './example/index.html'
    })
  ]
}
