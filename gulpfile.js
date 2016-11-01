var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');

//未压缩JS与CSS路径
var cssPath = 'www/static/home/css/nomin/';
var jsPath  = 'www/static/home/js/nomin/';

//压缩后路径
var minCssPath = 'www/static/home/css/min/';
var minJsPath = 'www/static/home/js/min/';

gulp.task('default', function() {
    gulp.start('watch');
});

gulp.task('minifyjs', function(){
    return gulp.src(jsPath + '*.js')
        // 这会输出一个未压缩过的版本
        .pipe(gulp.dest(jsPath))
        // 这会输出一个压缩过的并且重命名未 foo.min.js 的文件
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest(minJsPath));  //输出到文件夹
});

gulp.task('minifycss', function() {
    return gulp.src(cssPath + '*.css')      //压缩的文件
        .pipe(minifycss())   //执行压缩
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest(minCssPath));   //输出文件夹
});

gulp.task('watch', function() {
    gulp.watch([jsPath + '*.js', cssPath + '*.css'],function(){
        gulp.start('minifycss', 'minifyjs');
    });
});