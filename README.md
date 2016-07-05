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
            afterContent: ');/**heyman*/',              
            removeBefore: "!",                           
            removeAfter: "\\);"
        },
        'libs/react-dom': {
            beforeContent: 'var ReactDOM = ',
            afterContent: ');/**heyman*/',
            removeBefore: "!",
            removeAfter: "\\);"
        }
    }
})
```

### Defailt of ```chunks``` key
```
* beforeContent
    - [String] 
    - append content before
* afterContent
    - [String] 
    - append content after
* removeBefore
    - [String] 
    - replace content before, this string will input in a Regex Object
* removeAfter
    - [String]
    - replace content after, this string will input in a Regex Object

```

### Result
```
var React = /******/ function(modules) { // webpackBootstrap
	/** some code here */
/******/ }); /** heyman */;
```
