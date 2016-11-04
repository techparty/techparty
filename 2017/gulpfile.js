'use strict';

const gulp = require('gulp');
const stylus = require('gulp-stylus');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const jade = require('gulp-jade');
const fs = require('fs');

gulp.task('jade', () => {
  let languages = ['pt', 'en'];

  for (let i = 0; i < languages.length; i++) {
    let lang = languages[i];
    let data = JSON.parse(fs.readFileSync(`data/languages/${lang}.json`));

    gulp.src('views/index.jade')
      .pipe(jade({
        data: data
      }))
      .pipe(gulp.dest(lang === 'pt' ? './' : `./${lang}/`));
  }
});

gulp.task('stylus', () => {
  gulp.src('assets/stylus/main.styl')
    .pipe(stylus({
      'compress': true,
      'include css': true
    }))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('js', () => {
  gulp.src('assets/js/**/*.js')
    .pipe(uglify({
      output: {
        comments: /^!|@preserve|@license|@cc_on/i
      }
    }))
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('watch', () => {
  gulp.watch('assets/stylus/**/*.styl', ['stylus']);
  gulp.watch('assets/js/**/*.js', ['js']);
  gulp.watch('views/**/*.jade', ['jade']);
  gulp.watch('data/languages/*.json', ['jade']);
});

gulp.task('build', ['jade', 'stylus', 'js']);
gulp.task('dev', ['build', 'watch']);
