const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ClearWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    mode : 'production',
    devtool:'none',
    entry : __dirname + "/app/main.js",  //入口文件
    output : {
        path : path.join(__dirname + "/build"),//输出文件的目标路径
        // filename : "bundle-[hash].js"
    },
    devServer : {
        contentBase : "./build", //本地服务器所加载的页面所在目录
        historyApiFallback : true,//不跳转，对html5单页面应用非常有用
        inline : true
    },
    module : {
        //模块配置
        rules : [
            //规则
            {
                test : /(\.jsx|\.js)$/,
                use : {
                    loader : "babel-loader",
                },
                //排除匹配文件
                exclude : /node_modules/
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
            }
        ]
    },
    plugins :[
        new webpack.BannerPlugin({
            banner : "测试！请随意修改",
            entryOnly: true
        }),
        new HtmlWebpackPlugin({
            template : __dirname + "/app/index.tmpl.html"
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new UglifyJsPlugin(),
        new ClearWebpackPlugin('build/*.*',{
            root: __dirname,
            verbose: true,
            dry: false
        }),
        new ExtractTextPlugin({
            filename : "[name].[contenthash].css",
            disable: process.env.NODE_ENV === "development"
        }),
        new webpack.HotModuleReplacementPlugin()//热加载插件
    ]
}
