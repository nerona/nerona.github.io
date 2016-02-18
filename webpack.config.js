
var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var AssetsPlugin = require('assets-webpack-plugin');
var assetsPluginInstance = new AssetsPlugin({filename: 'assets.json'});
var autoprefixer = require('autoprefixer');

//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var node_modules_dir = path.join(__dirname, 'node_modules');


var deps = [
    'react/dist/react.min.js',
    'react-router/dist/react-router.min.js',
    'moment/min/moment.min.js',
    'underscore/underscore-min.js'
];

deps.forEach(function (dep) {
    var depPath = path.resolve(node_modules_dir, dep);
    config.resolve.alias[dep.split(path.sep)[0]] = depPath;
    config.module.noParse.push(depPath);
});

var config = {
    //项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
    entry: {
        app: './app/index.js',
        vendors: ['react']
    },
    //输出的文件名 合并以后的js会命名为bundle.js
    output: {
        path: path.join(__dirname, "build", "js"),
        publicPath: '/js/',
        filename: 'bundle-[hash].js',
        libraryTarget: 'umd',
        library: 'MyLibrary'
    },
    devtool: 'source-map',
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
                loaders: ['style', 'css', 'postcss'],
                //include: APP_PATH
            },
            {
                test: /\.less$/,
                loaders: ['style', 'css', 'postcss','less'],
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
               // }
            },
            {
                test: /\.jsx?$/,
                // query: {
                //    presets: ['es2015']
                exclude: /(node_modules|bower_components)/,
                loaders: ['react-hot', 'babel'], // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: path.resolve(node_modules_dir, deps[0]),
                loader: "expose?React"
            }
        ],
        noParse: []
    },
    postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],
    resolve: {
        extensions: ['', '.js', '.jsx', '.css', '.less'],
        alias: []
    },
    externals: {
        react: 'react',
        'react/addons': 'react'
    },
    //添加我们的插件 会自动生成一个html文件
    plugins: [
        assetsPluginInstance,
        new HtmlwebpackPlugin({
            title: 'Nerona',
            template: 'template.html', // Load a custom template
            inject: 'body' // Inject all scripts into the body
        }),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        function() {
            this.plugin("done", function(stats) {
                require("fs").writeFileSync(
                    path.join(__dirname, "...", "stats.json"),
                    JSON.stringify(stats.toJson()));
            });
        }
    ]
};

module.exports = config;