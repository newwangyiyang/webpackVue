const { resolve } = require('path')
// 4、动态引入打包后的css、js及压缩html
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 5、清除上一次打包目录
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 6、配置文件合并
const merge = require('webpack-merge')
// 7、获取命令携带参数
const argv = require('yargs-parser')(process.argv.slice(2))
const mode = argv.mode || 'development'
// 8、解析vue文件
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const webpackConfig = require(`./config/webpack.${mode}.js`)

const webpackCommonConfig = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            cacheDirectory: true
                        }
                    }, {
                        loader: 'eslint-loader',
                    }
                ],
                include: resolve(__dirname, 'src/'),
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.(jpg|jpeg|png|gif)$/,
                include: [resolve(__dirname, 'src/')],
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            outputPath: 'imgs', // 定义file-loader的输出文件夹
                            // publicPath: '../imgs'
                        }
                    },
                    { // window7系统下无法压缩， window10没问题
                        loader: 'image-webpack-loader',
                        options: {
                          mozjpeg: {
                            progressive: true,
                            quality: 65
                          },
                          // optipng.enabled: false will disable optipng
                          optipng: {
                            enabled: false,
                          },
                          pngquant: {
                            quality: [0.65, 0.90],
                            speed: 4
                          },
                          gifsicle: {
                            interlaced: false,
                          },
                          // the webp option will enable WEBP
                          webp: {
                            quality: 75
                          }
                        }
                    },
                ]
            }, {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                include: [resolve(__dirname, 'src/')],
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'font',
                            // publicPath: '../font'
                        }
                    }
                ]
            }, {
                test: /\.vue$/,
                include: [resolve(__dirname, 'src/')],
                use: ['vue-loader']
            }
        ]
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src/')
        },
        extensions: ['.vue', '.js', '.json']
    },
    externals: {
        jQuery: 'jQuery'
    },
    plugins: [
        // 解析vue
        new VueLoaderPlugin(),
        // 动态引入打包文件
        new HtmlWebpackPlugin({
            title: 'wangyiyang',
            filename: 'index.html',
            template: './src/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeAttributeQuotes: true
            }
        }),
        // 清除目录插件
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: resolve(__dirname, 'dist')
        })
    ]
}

module.exports = merge(webpackCommonConfig, webpackConfig)