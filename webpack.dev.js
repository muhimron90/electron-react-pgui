const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CheckNodeEnv = require('./internals/scripts/CheckNodeEnv');
const isDev = process.env.NODE_ENV === 'development';
CheckNodeEnv(isDev ? 'development' :  'production' );
module.exports = {
  mode: 'development',
  entry: ['react-hot-loader/patch', './src/index.js'],
  devtool: 'inline-source-map',
  target: 'electron-renderer',
  devServer: {
    hot: true,
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: [/\.s[ac]ss$/i, /\.css$/i],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1, sourceMap: true },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(jpg|png|ico|icons|gif|svg)%/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
  ],
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  externals: {
    fsevents: "require('fsevents')",
  },
};