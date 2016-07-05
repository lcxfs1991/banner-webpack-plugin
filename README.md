* banner-webpack-plugin

*** Introduction

append content before or after js bundle


*** Usage

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
