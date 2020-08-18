const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundled.js',
        path: path.resolve(__dirname,'app')
    },
    mode:'development',
    watch:false,
    module:{
        rules:[
            {
                test: /\.css$/i,
                use: ['style-loader','css-loader'] /* Style loader applies the style in browser, css loader just bundled css file together */
            }
        ]
    }

}