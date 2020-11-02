const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    watch: true,

    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
              test: /\.(png|jpe?g|gif|glb|gltf|typeface.json)$/i,
              loader: 'file-loader',
              options: {
                  publicPath: './',
                  name: '[name].[ext]'
              },
          },
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html'
        })
    ]
}