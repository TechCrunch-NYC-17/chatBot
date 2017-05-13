const webpack = require('webpack');
const path = require('path');
// module.exports = {
//   entry: {
//     app: path.join(__dirname, "/server")
//   },
//   output: {
//     path: path.resolve(__dirname, "dist"),
//     filename: "app.js"
//   }
// };
const BUILD_DIR = path.resolve(__dirname, './dist');
const APP_DIR = path.join(__dirname,'./server/');

const config = {
  devtool: '#eval-source-map',
  entry: APP_DIR +'server.js',
  output: {
    path: BUILD_DIR,
    filename: 'app.js',
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel'
      }
    ]
  }
 };

module.exports = config;