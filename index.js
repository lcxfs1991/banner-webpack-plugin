"use strict";

const { ConcatSource } = require("webpack-sources");

function BannerWebpackPlugin(options) {
  this.options = options || {};
  this.chunks = this.options.chunks || {};
}

BannerWebpackPlugin.prototype.apply = function (compiler) {
  compiler.hooks.compilation.tap("BannerWebpackPlugin", (compilation) => {
    compilation.hooks.processAssets.tap(
      {
        name: "BannerWebpackPlugin",
        stage: compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
      },
      (assets) => {
        const chunkKeys = Object.keys(this.chunks);

        chunkKeys.forEach((chunk) => {
          const distChunk = this.findAsset(compilation, chunk);

          const { afterContent = "" } = this.chunks[chunk];

          const originalSource = assets[distChunk].source();

          const updatedSource = new ConcatSource(originalSource, afterContent);

          compilation.updateAsset(distChunk, updatedSource);
        });
      }
    );
  });
};

BannerWebpackPlugin.prototype.findAsset = function (compilation, chunk) {
  for (const chunkItem of compilation.chunks) {
    if (chunkItem.name === chunk) {
      return chunkItem.files.values().next().value;
    }
  }
  return null;
};

module.exports = BannerWebpackPlugin;
