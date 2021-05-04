const webpack = require('webpack');
const path = require ('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const NgElementsWebpackPlugin = require('./ngelements-webpack-plugin');
// Compiler hook used to capture runtime.js AND main.js for concatanation
// into each component.

module.exports = {
  mode: 'production',
  context: process.cwd(),
  resolve: {
    extensions: ['.ts'],
  },
  entry: {
    'ui-checkbox': path.resolve(__dirname, 'src/ui-checkbox/compile.ts'),
    'ui-loader': path.resolve(__dirname, 'src/ui-loader/compile.ts')
  },
  output: {
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: [
          path.resolve(__dirname, 'projects/ng-elements'),
          path.resolve(__dirname, 'dist'),
          path.resolve(__dirname, 'src'),
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'web-components',
          chunks: 'initial',
        }
      }
    }
  },
  plugins: [
    // // Settings to inject JS and CSS into HTML
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html'
    }),
    // Copy package.json AND wc.typings.d.ts file to dist_wc directory
    new CopyWebpackPlugin({
      patterns: [
        './projects/web-components/package.json',
        './projects/web-components/src/web-components.d.ts'
      ]
    }),
    // Merge files: runtime.js, main.js, polyfills.js
    new NgElementsWebpackPlugin({
      basePath: path.resolve(__dirname, 'dist_wc')
    }),
  ],
}
