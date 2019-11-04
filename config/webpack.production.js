const { resolve, join } = require('path')
// 1、抽离css
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 2、压缩css
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
// 3、压缩js
// const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
// 4、打包分析
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// 5、css tree shaking
const glob = require('glob')
const PurifyCSSPlugin = require('purifycss-webpack')
// 6、js压缩 
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
// 7、js scope tree shaking
const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default
// 8、清除上一次打包目录
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const argv = require('yargs-parser')(process.argv.slice(2))
const mode = argv.mode || 'development'

module.exports = {
    output: {
        filename: 'js/[name].[hash].js',
        path: resolve(__dirname, '../dist'),
        publicPath: './'
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../', // 处理打包图片或字体路径问题
                            // hmr: mode === 'development',
                            reloadAll: true
                        }
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: loader => [
                                require('autoprefixer')(),
                                // require('postcss-cssnext')(),
                                // require('postcss-import')(),
                            ]
                        }
                    },
                    'sass-loader',
                ]
            },
        ]
    },
    optimization: {
        minimizer: [
            // 压缩css
            new OptimizeCssAssetsWebpackPlugin(),
            // webpack官方压缩js
            // new UglifyjsWebpackPlugin({
            //     cache: true,
            //     sourceMap: true,
            //     parallel: true
            // }),
            // 压缩js、es6
            new WebpackParallelUglifyPlugin({
                uglifyJS: {
                    output: {
                        beautify: false, // 不需要格式化
                        comments: false // 不保留注释
                    },
                    warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
                    compress: {
                        drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
                        collapse_vars: true, // 内嵌定义了但是只用到一次的变量
                        reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
                    }
                }
            }),
        ],
        namedChunks: true,
        // 将chunk映射list从main.js进行抽离，防止缓存cache无效
        runtimeChunk: {
            name: 'manifest'
        },
        noEmitOnErrors: true, // 编译错误时不生成
        // 将公共代码抽离
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: false,
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    chunks: 'initial',
                    priority: -10,
                    reuseExistingChunk: false,
                    test: /node_modules\/(.*)\.js/
                },
            }
        }
    },
    plugins: [
        // 抽离css为单独文件
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css',
            chunkFilename: 'css/[id].[hash].css'
        }),
        // css tree shaking
        new PurifyCSSPlugin({
            // node 路径扫描
            paths: glob.sync(join(__dirname, '../src/**/*.vue'))
        }),
        // js scope tree shaking
        new WebpackDeepScopeAnalysisPlugin(),
        
        // 打包分析
        // new BundleAnalyzerPlugin()

        // 清除目录插件
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: resolve(__dirname, 'dist')
        })
    ]
}