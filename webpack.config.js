
var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
    //项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
    entry: './app/index.js',
    //输出的文件名 合并以后的js会命名为bundle.js
    output: {
       // path: BUILD_PATH,
        filename: './bundle.js'
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style', 'css'],
                //include: APP_PATH
            },
            {
                test: /\.less$/,
                loaders: ['style', 'css', 'less'],
                //include: APP_PATH
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=4000'
            },
            {
                test: /\.js$/,
                loader: 'jsx?harmony',
                //include: APP_PATH,
               // query: {
                //    presets: ['es2015']
               // }
            }
        ]
    },
    //添加我们的插件 会自动生成一个html文件
    plugins: [
        new HtmlwebpackPlugin({
            title: 'Welcome to Nerona!',
            template: 'template.html', // Load a custom template
            inject: 'body' // Inject all scripts into the body
        })
    ]
};
