"use strict";

var ConcatSource = require("webpack-core/lib/ConcatSource");

function BannerWebpackPlugin(options) {
    this.options = options || {};
    this.chunks = this.options.chunks || {};
}
 
BannerWebpackPlugin.prototype.apply = function(compiler) {
    compiler.plugin("emit", (compilation, callback) => {
        let chunkKey = Object.keys(this.chunks);
        chunkKey.map((chunk, key) => {
            let distChunk = this.findAsset(compilation, chunk),
                beforeContent = this.chunks[chunk].beforeContent || '',
                afterContent = this.chunks[chunk].afterContent || '',
                removeBefore = this.chunks[chunk].removeBefore || '',
                removeAfter = this.chunks[chunk].removeAfter || '';

            let source = compilation.assets[distChunk].source();
            source = (removeBefore) ? source.replace(new RegExp('^' + removeBefore), "") : source;
            source = (removeAfter) ? source.replace(new RegExp(removeAfter + '$'), "") : source;

            compilation.assets[distChunk].source = () => {
                return source;
            };

            compilation.assets[distChunk] = new ConcatSource(beforeContent, compilation.assets[distChunk], afterContent);
        });
        callback();
    });

};

BannerWebpackPlugin.prototype.findAsset = function(compilation, chunk) {
    let chunks = compilation.chunks;
    for (let i = 0, len = chunks.length; i < len; i++) {
        if (chunks[i].name === chunk) {
            return chunks[i].files[0];
        }
    }

    return null;
};

module.exports = BannerWebpackPlugin;