# banner-webpack-plugin

### Introduction

append content before or after js bundle


### Usage
if entry key in webpack config is like this:
```
entry: {
    "libs/react": [path.join(config.path.src, "/libs/react.js")],
    "libs/react-dom": [path.join(config.path.src, "/libs/react-dom.js")],
},
```

then, please use the same key for chunks in banner-webpack-plugin


```
new BannerWebpackPlugin({
    chunks: {
        'libs/react': {
            beforeContent: 'var React = ',
            afterContent: '/** authored by heyli */'
        },
        'libs/react-dom': {
            beforeContent: 'var ReactDOM = ',
        }
    }
})
```

### Result
```
var React = /******/ (function(modules) { // webpackBootstrap
	/** some code here */
/******/ }) /** authored by heyli */;
```
