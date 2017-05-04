const gulp = require('gulp');
const stylus = require('gulp-stylus');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const pug = require('gulp-pug');
const fs = require('fs');
const connect = require('gulp-connect');

gulp.task('pug', () => {
  const languages = fs.readdirSync('data/languages');
  for (let i = 0; i < languages.length; i++) {
    const lang = languages[i].replace(/\..*/, '');
    const data = JSON.parse(fs.readFileSync(`data/languages/${lang}.json`));

    gulp.src('views/index.pug')
      .pipe(pug({ data }))
      .pipe(gulp.dest(`./dist/${ lang === 'pt' ? '' : lang }`));
  }
});

gulp.task('stylus', () => {
  gulp.src('assets/stylus/main.styl')
    .pipe(stylus({
      'compress': true,
      'include css': true,
    }))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('js', () => {
  gulp.src(['node_modules/cpf_cnpj/build/cpf.js', 'assets/js/**/*.js'])
    .pipe(uglify({
      output: {
        comments: /^!|@preserve|@license|@cc_on/i
      }
    }))
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('img', () => {
  gulp.src('assets/img/**/')
    .pipe(gulp.dest('dist/img'));
});

gulp.task('webserver', () => {
  connect.server({
    root: 'dist',
    port: 3000,
  });
});

gulp.task('watch', () => {
  gulp.watch('assets/stylus/**/*.styl', ['stylus']);
  gulp.watch('assets/js/**/*.js', ['js']);
  gulp.watch('assets/img/**', ['img']);
  gulp.watch('views/**/*.pug', ['pug']);
  gulp.watch('data/languages/*.json', ['pug']);
});

gulp.task('dist', ['pug', 'stylus', 'js', 'img']);

gulp.task('dev', ['dist', 'watch', 'webserver']);
