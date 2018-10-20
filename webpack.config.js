const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/client/index.js',
  devServer: {
    port: 8080,
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
}