const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'example/index.ts'),
  devtool: 'inline-source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
  },
};
