const { resolve } = require('path')
const webpack = require('webpack')
module.exports = {
    output: {
        filename: 'main.js',
        path: resolve(__dirname, '../dist'),
        publicPath: '/'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: resolve(__dirname, 'dist'), // 本地服务器所加载的页面资源目录
        clientLogLevel: 'warning', // none、error、warning 或者 info
        hot: true, // 启动热更新替换特性，需要配合webpack.HotModuleReplacementPlugin插件
        host: 'localhost', // 服务器的host
        port: 3000, // 服务器端口号
        compress: true, // 未服务启用gzip压缩
        overlay: true, // 在浏览器中显示全屏覆盖
        stats: 'errors-only', // 编译的时候只显示包中的错误
        open: true, // 是否默认打开浏览器
        proxy: {
            // 设置服务代理
            'api/': {
                target: 'http://www.baidu.com',
                pathRewrite: {'^/api': ''}
            }
        },
        before(app) {
            app.get('/wyyApi/test', (req, res) => {
                res.json({code: 0, msg: '请求成功', data: [{name: '王一扬'}]})
            })
        }
    },
    optimization: {
        // 将公共代码抽离
        runtimeChunk: {
            name: 'runtime'
        }
    },
    module: {
        rules: [{
            test: /\.(sa|sc|c)ss$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        ident: 'postcss',
                        sourceMap: true,
                        plugins: loaders => [require('autoprefixer')]
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                },
            ]
        }]
    },
    plugins: [
        new webpack.NamedModulesPlugin(), // 更容易查看(patch)的来源
        new webpack.HotModuleReplacementPlugin(), // 热替换插件 
    ]
}