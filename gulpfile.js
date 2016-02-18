/**
 * Author :  neron
 * time   : 2016/2/18
 * description: ...
 */
var gulp = require('gulp');
var webpack = require('webpack-stream');
var webpackDev = require('webpack-dev-server');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var through = require('through2');

gulp.task('webpack', function (callback) {
    return gulp.src('src/entry.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(through.obj(function (file, enc, cb) {
            // Dont pipe through any source map files as it will be handled
            // by gulp-sourcemaps
            var isSourceMap = /\.map$/.test(file.path);
            if (!isSourceMap) this.push(file);
            cb();
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/'));
});

gulp.task("webpack-dev-server", function (callback) {
    // Start a webpack-dev-server
    var compiler = webpack({
        // configuration
    });

    new WebpackDevServer(compiler, {
        // server and middleware options
    }).listen(8080, "localhost", function (err) {
        if (err) throw new gutil.PluginError("webpack-dev-server", err);
        // Server listening
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");

        // keep the server alive or continue?
        // callback();
    });
});