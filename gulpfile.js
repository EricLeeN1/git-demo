/**
 * Created by Eric on 2017/4/8.
 */
// 1.less 编译 压缩 合并
// 2.js 合并 压缩 混淆
// 3.img 复制
// 4.html 压缩

//在gulpfile中先载入gulp的包，因为这个包提供了一些API
var gulp = require('gulp');

// 1.less 编译 压缩 合并  --合并没有必要，一般预处理css都可以导包

var less = require('gulp-less');
var cssnano = require('gulp-cssnano');

gulp.task('style', function () {
    // 这里实在执行style任务时自动执行的
    gulp.src('src/styles/*.less','!src/styles/ _*.less')
        .pipe(less())
        .pipe(cssnano())
        .pipe(gulp.dest('dist/styles'))
        .pipe(browserSync.reload({
            stream:true
        }));
});

// 2.js 合并 压缩 混淆

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('scripts', function () {
    gulp.src('src/scripts/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(browserSync.reload({
            stream:true
        }));
});

// 3.img 复制
gulp.task('images', function () {
    gulp.src('src/images/*.*')
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.reload({
            stream:true
        }));
});

// 4.html 压缩
var htmlmin = require('gulp-htmlmin');
    gulp.task('html', function () {
    gulp.src('src/*.html')
        .pipe(htmlmin({
            // collapseWhitespace:true,                //清除空格
            removeComments:true,                    //清除注释
            // removeAttributeQuotes:true,             //清除引号
            removeStyleLinkTypeAttributes:true,     //清除link的type
            removeScriptTypeAttributes:true,        //清除script的type
            useShortDoctype:true                    //替换为html5文档类型
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream:true
            }));
});

var browserSync = require("browser-sync");
gulp.task('serve', function () {
    browserSync({
        server: {
            baseDir: ['dist']
        }
    }, function(err, bs) {
        console.log(bs.options.getIn(["urls", "local"]));
    });

    gulp.watch('src/styles/*.less',['style']);
    gulp.watch('src/scripts/*.js',['scripts']);
    gulp.watch('src/images/*.*',['images']);
    gulp.watch('src/*.html',['html']);
});