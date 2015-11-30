var fs = require('fs');
var gulp = require('gulp');
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');

gulp.task('transform', () => {
  browserify('./assets/js/Application.js')
    .transform('babelify', {presets: ['es2015', 'react']})
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('dev', () => {
  gulp.watch('./assets/js/*.js', ['transform']);
});