const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const lodash = require('lodash')
const CopyPkgJsonPlugin = require('copy-pkg-json-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CheckNodeEnv = require('./internals/scripts/CheckNodeEnv');
const isProd = process.env.NODE_ENV === 'production';
CheckNodeEnv(isProd ? 'production' : 'development');
//#region common
const common = {
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? 'source-map' : 'inline-source-map',
  output: { path: path.resolve(__dirname, './dist') },
  node: { __dirname: false, __filename: false },
  devServer: {
    hot: isProd ? false : true,
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
    !isProd && new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
  ].filter(Boolean),
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
//#endregion


const mainConfig = lodash.cloneDeep(common);
mainConfig.entry =  './main.js';
mainConfig.target = 'electron-main';
mainConfig.output.filename = '[name].bundle.js';
mainConfig.plugins = [
  new CopyPkgJsonPlugin({
    remove: ['scripts', 'devDependencies', 'build'],
    replace: {
      main: './main.bundle.js',
      scripts: { start: 'electron ./dist/main.bundle.js' },
      postinstall: 'electron-builder install-app-deps',
    },
  }),
];

const rendererConfig = lodash.cloneDeep(common);
rendererConfig.entry =  ['react-hot-loader/patch','./src/index.js'];
rendererConfig.target = 'electron-renderer';
rendererConfig.output.filename = 'renderer.bundle.js';
rendererConfig.plugins = [
 
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, './index.html'),
  }),
];





module.exports = [mainConfig, rendererConfig];