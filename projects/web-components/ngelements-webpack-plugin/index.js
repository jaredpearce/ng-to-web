const { sources, Compilation } = require('webpack');
const {
  SyncHook,
  AsyncSeriesHook
} = require('tapable');
const path = require('path');

const fs = require('fs');
// const Multistream = require('multistream');
const { pipeline } = require('stream');
// const util = require('util');

const HtmlWebpackPlugin = require('safe-require')('html-webpack-plugin');

/**
 * Here's what I need:
 * - baseAssets: A list of files required for all 'ui-'components:
 *   runtime.js, main.js, polyfills.js
 * - entryAsset: entryFile for the exported angular component
 * - index.html: updated with all exported components
 *
 */


class NgElementsWebpackPlugin {
  constructor(options) {
    this.validateOptions(options);
    this.options = options;
    this.baseAssetFiles = {};
  }

  validateOptions(options) {
    if (!options || !options.basePath) {
      const msg = 'Specify a basePath to continue.';
      throw new Error(console.error(msg));
    }
  }

  apply(compiler) {
    // Gather webpack defaults
    compiler.hooks.done.tapAsync('NgElementsWebpackPlugin', (stats, cb) => {
      // const cachedAssets = stats.compilation.emittedAssets;
      const compiledBasePath = `${stats.compilation.outputOptions.path}/web-components.js`;
      const basePath = `${stats.compilation.outputOptions.path}`;
      const baseAssets = new Set();
      // const uiAssets = [...cachedAssets].filter(asset => asset.includes('ui-'));
      // console.log('cachedAssets', Object.keys(stats.compilation));
      // console.log('----------');
      for (const assetName in stats.compilation.assets) {
        if (assetName === 'runtime.js' || assetName === 'main.js' || assetName === 'polyfills.js' || assetName === 'polyfills-es5.js') {
          baseAssets.add(assetName);
          // pipe to new file...
          let reader = fs.createReadStream(`${basePath}/${assetName}`);
          pipeline(
            reader,
            fs.createWriteStream(compiledBasePath, { flags: 'a+' }),
            (err) => {
              err
                ? console.error('pipeline failed', err)
                : console.log('success!!!!')
            }
          );

        }
      }

      cb();
    });
  }
}

//  Statistics:
/**
 * The major version of this plugin
 */
NgElementsWebpackPlugin.version = 1;

module.exports = NgElementsWebpackPlugin;
