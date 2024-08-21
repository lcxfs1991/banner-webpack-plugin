# banner-webpack-plugin

### Introduction

append content before or after js bundle


### Usage
if entry key in webpack config is like this:
const jsDirectory = path.join(__dirname, "build-prod/static/js");
const filename = main.js;
```
entry: {
    "main": [path.join(jsDirectory, filename)],
  },
```

then, please use the same key for chunks in banner-webpack-plugin


```
new BannerWebpackPlugin({
      chunks: {
        "main": {
          afterContent: `"/** Hello World */"`,
        },
      },
    }),
```

### Default of ```chunks``` key
```
* beforeContent
    - [String] 
    - append content before
* afterContent
    - [String] 
    - append content after
```

### Result
```
var React = /******/ function(modules) { // webpackBootstrap
	/** some code here */
/******/ }); /** Hello World */;
```
