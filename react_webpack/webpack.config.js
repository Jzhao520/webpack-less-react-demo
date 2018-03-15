const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ClearWebpackPlugin = require('clean-webpack-plugin');

// const extractLess = new ExtractTextPlugin({
//     filename: "[name].[contenthash].css",
//     disable: process.env.NODE_ENV === "development"
// });
module.exports = {
    mode : 'development',
    devtool:"eval-source-map",
    entry : {
        index : __dirname + "/app/main.js",//入口文件
        vendor : ['react','react-dom'] //需要分离出去的插件包
    },
    output : {
        path : path.join(__dirname + "/build"),
        // filename : "bundle.[hash].js", //此处和path 不能同时开启 否则会出现 "Multiple assets emit to the same filename" 错误
    },
    devServer : {
        contentBase : "./build",
        historyApiFallback : true,
        inline : true
    },
    module : {
        rules : [
            {
                test : /(\.jsx|\.js)$/,
                use : {
                    loader : "babel-loader",
                },
                exclude : /node_modules/
            },{
                test :/\.(png|jpg|gif|jpeg)$/,
                use :{
                    loader:'url-loader' //解析所有图片路径
                }
            },{
                test : /\.(less|css)$/,
                use:ExtractTextPlugin.extract({
                    use :[{
                            loader : "css-loader",
                            options : {
                                modules : true,
                                minimize: true,  //启用/禁用 压缩css
                                localIdentName: '[name]__[local]__[hash:base64:5]'
                            }
                        },{
                            loader : "less-loader",
                            options: {
                                minimize : true //启用/禁用 压缩css
                            }
                        },{
                            loader : "postcss-loader"
                        }],
                        fallback : "style-loader"
                })
            },
            // {
            //     test : /\.less$/,
            //     use:ExtractTextPlugin.extract({
                    
            //         use : [{
            //             loader : "css-loader"
            //         },{
            //             loader : "less-loader",
            //         }],
            //         fallback : "style-loader",
                    
            //     })
            // }
        ]
    },
    plugins :[
        new webpack.BannerPlugin({
            banner : "测试",
            entryOnly: true
        }),
        new HtmlWebpackPlugin({
            template : __dirname + "/app/index.tmpl.html"
        }),
        new ClearWebpackPlugin('build/*.*',{
            root: __dirname,
            verbose: true,
            dry: false
        }),
        new ExtractTextPlugin({
            filename : "[name].[contenthash].css",
            disable: process.env.NODE_ENV === "development"
        }),
        // extractLess,
        new webpack.HotModuleReplacementPlugin()//热加载插件
    ],
    optimization: {
        splitChunks: {
          chunks: "initial",         // 必须三选一： "initial" | "all"(默认就是all) | "async"
          minSize: 0,                // 最小尺寸，默认0
          minChunks: 1,              // 最小 chunk ，默认1
          maxAsyncRequests: 1,       // 最大异步请求数， 默认1
          maxInitialRequests: 1,    // 最大初始化请求书，默认1
          name: () => {},              // 名称，此选项课接收 function
          cacheGroups: {                 // 这里开始设置缓存的 chunks
            priority: "0",                // 缓存组优先级 false | object |
            vendor: {                   // key 为entry中定义的 入口名称
              chunks: "initial",        // 必须三选一： "initial" | "all" | "async"(默认就是异步)
              test: /react|react-dom/,     // 正则规则验证，如果符合就提取 chunk
              name: "vendor",           // 要缓存的 分隔出来的 chunk 名称
              minSize: 0,
              minChunks: 1,
              enforce: true,
              maxAsyncRequests: 1,       // 最大异步请求数， 默认1
              maxInitialRequests: 1,    // 最大初始化请求书，默认1
              reuseExistingChunk: true   // 可设置是否重用该chunk（查看源码没有发现默认值）
            }
          }
        }
      },
}
