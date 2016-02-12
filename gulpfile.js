'use strict';

const gulp = require('gulp');
const del = require('del');
const uglify = require('gulp-uglify');
const minifyCSS = require('gulp-minify-css');
const minifyHTML = require('gulp-htmlmin');

const years = [2014, 2015, 2016];
const current = 2016;

let _move = (src_path, dest_path) => {
  gulp
    .src(src_path)
    .pipe(gulp.dest(dest_path))
};

let _minifyCss = (src_path, dest_path) => {
  gulp
    .src(src_path)
    .pipe(minifyCSS({ advanced: true }))
    .pipe(gulp.dest(dest_path))
};

let _uglify = (src_path, dest_path) => {
  gulp
    .src(src_path)
    .pipe(uglify())
    .pipe(gulp.dest(dest_path))
};

let _minifyHtml = (src_path, dest_path) => {
  gulp
    .src(src_path)
    .pipe(minifyHTML({collapseWhitespace: true}))
    .pipe(gulp.dest(dest_path))
};

let _moveYear = year => {
  _move(`${year}/assets/fonts/**`, `dist/${year}/assets/fonts`);
  _move(`${year}/assets/data/**`, `dist/${year}/assets/data`);
  _move(`${year}/assets/img/**`, `dist/${year}/assets/img`);
};

let _minifyCssYear = year => {
  _minifyCss(`${year}/assets/css/*.css`, `dist/${year}/assets/css`);
  _minifyCss(`${year}/certificado/assets/css/*.css`, `dist/${year}/certificado/assets/css`);
};

let _uglifyYear = year => {
  _uglify(`${year}/assets/js/*.js`, `dist/${year}/assets/js`);
  _uglify(`${year}/certificado/assets/js/*.js`, `dist/${year}/certificado/assets/js`);
};

let _minifyHtmlYear = year => {
  _minifyHtml(`${year}/*.html`, `dist/${year}`);
  _minifyHtml(`${year}/certificado/*.html`, `dist/${year}/certificado`);
  _minifyHtml(`${year}/certificado/palestrante/*.html`, `dist/${year}/certificado/palestrante`);
  _minifyHtml(`${year}/en/*.html`, `dist/${year}/en`);
};

gulp.task('clean', cb => {
  del(['dist'], cb);
});

gulp.task('dist-move', ['clean'], () => {
  years.forEach(_moveYear);
});

gulp.task('dist-minify', ['clean'], () => {
  years.forEach(_minifyCssYear);
});

gulp.task('dist-uglify', ['clean'], () => {
  years.forEach(_uglifyYear);
});

gulp.task('dist-html', ['clean'], () => {
  years.forEach(_minifyHtmlYear);
});

gulp.task('dist', ['dist-move', 'dist-minify', 'dist-uglify', 'dist-html'], () => {
    _move(`${current}/assets/fonts/**`, 'dist/assets/fonts');
    _move(`${current}/assets/data/**`, 'dist/assets/data');
    _move(`${current}/assets/img/**`, 'dist/assets/img');

    _minifyCss(`${current}/assets/css/*.css`, 'dist/assets/css');
    _minifyCss(`${current}/certificado/assets/css/*.css`, 'dist/certificado/assets/css');

    _uglify(`${current}/assets/js/*.js`, 'dist/assets/js');
    _uglify(`${current}/certificado/assets/js/*.js`, 'dist/certificado/assets/js');

    _minifyHtml(`${current}/*.html`, 'dist');
    _minifyHtml(`${current}/certificado/*.html`, 'dist/certificado');
    _minifyHtml(`${current}/certificado/palestrante/*.html`, 'dist/certificado/palestrante');
    _minifyHtml(`${current}/en/*.html`, `dist/en`);
});
