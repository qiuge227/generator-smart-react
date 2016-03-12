var gulp = require('gulp');
var webpack = require('gulp-webpack');
var clean = require('gulp-clean');
var webpackConfig = require('./webpack.config');
// 引入跟版本号控制相关的插件
var rename = require('gulp-rename'); // 文件重命名
var rev = require('gulp-rev'); // 更改版本号
var revCollector = require('gulp-rev-collector'); 
// 控制某型任务串行处理（因为gulp是并行处理任务的！）
var gulpSequence = require('gulp-sequence');
// 合并流，处理多个copy任务
var merge = require('merge-stream');
// 配置变量替换
var preprocess = require('gulp-preprocess');
// 将browser-sync嵌入到gulp-watch中
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
// 引入配置文件
var config = require('./src/common/config');

// browder-sync创建静态服务器
gulp.task('browser-sync', function () {
  browserSync.init({
    proxy: 'localhost:5580',
    // 需要根据不同的Hosts来修改
    host: 'devss.smartstudy.com',
    port: '5580',
    open: 'external'
  });
  gulp.watch("public/**/*.*").on('change', reload);
});

// 正式环境webpack 完成js、sass的编译、压缩、打包和添加版本号
gulp.task('webpack', function () {
  return webpack(webpackConfig.production)
    .pipe(rev())
    .pipe(gulp.dest('public'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('public'));
});

// 测试环境webpack 完成js、sass的编译、打包
gulp.task('webpack-dev', function () {
  return webpack(webpackConfig.dev)
    .pipe(gulp.dest('public'));
});

gulp.task('rev', function () {
  return gulp.src(['public/*.json', 'src/app.html'])
    .pipe(preprocess({
      context: config
    }))
    .pipe(revCollector({
      replaceReved: true
    }))
    .pipe(gulp.dest('public'));
});

gulp.task('watch', function () {
  gulp.watch([
    'src/**/**/*.*'
  ], ['webpack-dev']);
});

gulp.task('clean', function () {
  return gulp.src('public')
    .pipe(clean());
});

// 复制文件
gulp.task('copy', function () {
  gulp.src('src/lib/**')
    .pipe(gulp.dest('public/'));
    return merge(
    gulp.src('src/app.html')
    .pipe(preprocess({
      context: config
    }))
    .pipe(gulp.dest('public')),
    gulp.src(['src/images/*'])
    .pipe(gulp.dest('public/images')),
    gulp.src('src/common/config.static.scss')
    .pipe(preprocess({
      context: config
    }))
    .pipe(gulp.dest('src/components/common/base'))
  );
});

// 正式环境执行这个
gulp.task('default', gulpSequence('clean', 'copy', 'webpack', 'rev'));

// 使用Webpack watch + browser-sync，有些异步的问题
gulp.task('sync', function (cb) {
  webpackConfig.dev.watch = true;
  gulpSequence('clean', 'copy', ['browser-sync', 'webpack-dev'], cb);
});
