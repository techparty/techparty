'use strict';

const gulp = require('gulp');
const browserify = require("browserify");
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const connect = require('gulp-connect');
const minifyCSS = require('gulp-minify-css');
const minifyHTML = require('gulp-htmlmin');

gulp.task('transform', () => {
  return browserify('./src/Application.js')
    .transform('babelify', {presets: ['es2015', 'react']})
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./assets/js/'));
});

gulp.task('webserver', () => {
  connect.server({
    port: 3000,
  });
});

gulp.task('watch', () => {
  return gulp.watch('./src/*.js', ['transform']);	
})

gulp.task('dev', ['watch', 'webserver']);

gulp.task('minify', () => {
  const path = './assets/css';
  gulp
    .src(path)
    .pipe(minifyCSS({ advanced: true }))
    .pipe(gulp.dest(`dist/${path}`))
});

gulp.task('uglify', () => {
  const path = './assets/js';
  gulp
    .src(path)
    .pipe(gulp.dest(`dist/${path}`))
});

gulp.task('html', () => {
  gulp
    .src('**.html')
    .pipe(minifyHTML({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/'))
});

gulp.task('build', ['transform', 'minify', 'uglify', 'html']);