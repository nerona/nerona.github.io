var gulp = require('gulp');
var browserSync = require('browser-sync').create(); //通过流的方式创建任务流程, 这样您就可以在您的任务完成后调用reload，所有的浏览器将被告知的变化并实时更新
var sass = require('gulp-sass'); //sass转css
var reload = browserSync.reload;
var minifyCSS = require('gulp-clean-css') //css压缩
var uglify = require('gulp-uglify') //js压缩
var imagemin = require('gulp-imagemin') //图片压缩
var rename = require('gulp-rename') //文件重命名
var autoprefixer = require('gulp-autoprefixer') //自动添加前缀

// 设置默认文件地址
var src = {
    scss: 'code/scss/*.scss',
    css: 'code/css/*.css',
    html: 'code/*.html',
    js: 'code/js/*.js',
    images: 'code/images/*.{png,jpg,gif,ico}'
};

// name: 任务的名字
// deps: 一个包含任务列表的数组，这些任务会在你当前任务运行之前完成。
// fn: 该函数定义任务所要执行的一些操作。通常来说，它会是这种形式：gulp.src().pipe(someplugin())。
// 静态服务器 + 监听 scss/html 文件
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "./code"
    });
    gulp.watch(src.scss, ['sass']);
    gulp.watch(src.css, ['css']);
    gulp.watch(src.images, ['images'])
    gulp.watch(src.js, ['js-watch']);
    gulp.watch(src.js, ['js']);
    gulp.watch(src.html).on('change', reload);
});

// scss编译后的css将注入到浏览器里实现更新
gulp.task('sass', function() {
    return gulp.src(src.scss)
        .pipe(sass())
        .pipe(minifyCSS({
            advanced: false, //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie7', //保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: true, //类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'
                //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(autoprefixer())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest("code/css"))
        .pipe(reload({ stream: true }));
});

// 雪碧图
var spritesmith = require('gulp.spritesmith');

gulp.task('sprite', function() {
    return gulp.src('code/images/*.png')
        .pipe(spritesmith({
            imgName: 'images/sprite20161010.png', //保存合并后图片的地址
            cssName: 'css/sprite.css', //保存合并后对于css样式的地址
            padding: 20,
            algorithm: 'binary-tree',
        }))
        .pipe(gulp.dest('code/scss'));
});

// 监听css文件
gulp.task('css', function() {
    return gulp.src(src.css)
        .pipe(minifyCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest("code/css"))
        .pipe(reload({ stream: true }));
});

// 监听js文件
gulp.task('js', function() {
        // 1. 找到文件
        return gulp.src(src.js)
            //2. 压缩文件
            .pipe(uglify())
            .pipe(rename({ suffix: '.min' }))
            //3. 另存压缩后的文件
            .pipe(gulp.dest('code/dest'))
            .pipe(reload({ stream: true }));
    })
    //监听js文件变化实现热加载
gulp.task('js-watch', ['js'], browserSync.reload);

// 压缩图片任务
// 在命令行输入 gulp images 启动此任务
gulp.task('images', function() {
    // 1. 找到图片
    gulp.src(src.images)
        // 2. 压缩图片
        .pipe($.imagemin())
        // 3. 另存图片
        .pipe(gulp.dest('images'))
        .pipe(reload({ stream: true }));
});

// 
gulp.task('default', ['serve']);