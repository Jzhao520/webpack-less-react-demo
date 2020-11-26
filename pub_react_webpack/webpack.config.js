const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ClearWebpackPlugin = require('clean-webpack-plugin');
// const extractLess = new ExtractTextPlugin({
//     filename: "[name].[contenthash].css",
//     disable: process.env.NODE_ENV === "development"
// });
let config = {
    mode : 'development',
    devtool:"eval-source-map",
    // 这里应用程序开始执行
    // webpack 开始打包
    entry : {
         
        index : __dirname + "/app/main.js",//入口文件
        vendor : ['react','react-dom'], //需要分离出去的插件包
    },
    output : {
        // webpack 如何输出结果的相关选项
         // 所有输出文件的目标路径
         // 必须是绝对路径（使用 Node.js 的 path 模块）
        path : path.join(__dirname + "/build"),
        /* 
            对于单个入口起点，filename 会是一个静态名称。 
                filename: "bundle.js"
            然而，当通过多个入口起点(entry point)、代码拆分(code splitting)或
            各种插件(plugin)创建多个 bundle，应该使用以下一种替换方式，来赋予每个 bundle 一个唯一的名称……

            使用入口名称：
                filename: "[name].bundle.js"
            使用内部 chunk id 
                filename: "[id].bundle.js"
            使用每次构建过程中，唯一的 hash 生成
                filename: "[name].[hash].bundle.js"
            使用基于每个 chunk 内容的 hash：
         */
        filename : "[name].[hash].bundle.js", 
        
    },
    devServer : {
        contentBase : path.resolve(__dirname),
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
                    loader:'url-loader', //解析所有图片路径
                    options:{
                        limit:8192,
                    }
                }
            },{
                test : /\.(less|css)$/,
                use:ExtractTextPlugin.extract({
                    use :[
                        {
                            loader : "css-loader",
                            options : {
                                sourceMap : true,
                                modules : true, //启用css模块化
                                localIdentName: '[name]__[local]__[hash:base64:5]',
                                minimize: true,  //启用/禁用 压缩css
                                camelCase: 'dashesOnly' //以驼峰化式命名导出类名
                               /* 
                                        true    {Boolean}  类名将被骆驼化
                                     'dashes'   {String}   只有类名中的破折号将被骆驼化
                                       'only'   {String}   在 0.27.1 中加入。类名将被骆驼化，初始类名将从局部移除
                                 'dashesOnly'   {String}   在 0.27.1 中加入。类名中的破折号将被骆驼化，初始类名将从局部移除 
                                */
                            }
                        },{
                            loader : "less-loader",
                            options: {
                                minimize : true //启用/禁用 压缩css
                            }
                        },{
                            loader : "postcss-loader"
                        }
                    ],
                    fallback : "style-loader"
                }),
                
            },
        ]
    },
    plugins :[
        //添加版权信息插件
        new webpack.BannerPlugin({
            banner : "hash:[hash],name:[name],file:[file]",
            entryOnly: false   //如果值为 true，将只在入口 chunks 文件中添加
        }),
        new HtmlWebpackPlugin({
            template : __dirname + "/app/index.tmpl.html",
            excludeChunks:['bootstrap.css']
        }),
        new ClearWebpackPlugin('build/*.*',{ //清除build文件下所有需要重新生成的文件
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
          name: () => {},              // 名称，此选项可接收 function
          cacheGroups: {                 // 这里开始设置缓存的 chunks
            priority: "0",                // 缓存组优先级 false | object |
            vendor: {                   // key 为entry中定义的 入口名称
              chunks: "initial",        // 必须三选一： "initial" | "all" | "async"(默认就是异步)
              test: /react|react\-dom|react\-redux/,     // 正则规则验证，如果符合就提取 chunk
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


module.exports = config;

/**
 * 动态查找所有入口文件
 */
// var files = glob.sync('./app/*/index.js');
// var newEntries = {};
// files.forEach(function(f){
//     var name = /.*\/(app\/.*?\/index)\.js/.exec(f)[1]; //得到apps/question/index 这样的文件名
//     newEntries[name] = f;
//     console.log(name)
//     var plug =  new HtmlWebpackPlugin({
//         filename: __dirname + "/build/" + name + ".html",
//         template: __dirname + "/app/view/index.tmpl.html",
//         chunks: ['vendor', name],
//         hash:true,
//         inject: true
//     });
//     config.plugins.push(plug);
// });
// config.entry = Object.assign({}, this, newEntries);