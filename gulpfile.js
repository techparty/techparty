var gulp = require('gulp');
var del = require('del');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');

var current = 2014;
var years = [2014, 2015];

function _each (array, cb) {
  if (array) {
    for (var i = 0, l = array.length; i < l; i++) {
      cb(array[i]);
    }
  }
}

gulp.task('clean', function (cb) {
  del(['dist'], cb);
});

gulp.task('dist-minify', ['clean'], function() {
  _each(years, function (year) {
    gulp.src(year + '/assets/css/*.css')
      .pipe(minifyCSS({ keepBreaks:true }))
      .pipe(gulp.dest('dist/' + year + '/assets/css'));
  });
});

gulp.task('dist-uglify', ['clean'], function() {
  _each(years, function (year) {
    gulp.src(year + '/assets/js/*.js')
      .pipe(uglify())
      .pipe(gulp.dest('dist/' + year + '/assets/js'));
  });
});

gulp.task('dist-img', ['clean'], function () {
  _each(years, function (year) {
    gulp.src(year + '/assets/img/**')
      .pipe(gulp.dest('dist/' + year + '/assets/img'));
  });
});

gulp.task('dist-font', ['clean'], function () {
  _each(years, function (year) {
    gulp.src(year + '/assets/font/*')
      .pipe(gulp.dest('dist/' + year + '/assets/font'));
  });
});

gulp.task('dist-assets', ['dist-minify', 'dist-uglify', 'dist-img', 'dist-font'])

gulp.task('dist-certificado', ['clean'], function () {
  gulp.src('certificado/**')
    .pipe(gulp.dest('dist/certificado'));
});

gulp.task('dist-html', ['clean'], function () {
  _each(years, function (year) {
    gulp.src(year + '/*.html')
      .pipe(gulp.dest('dist/' + year));
  });
});

gulp.task('dist', ['dist-assets', 'dist-certificado', 'dist-html'], function () {
  gulp.src(current + '/assets/css/*.css')
      .pipe(minifyCSS({ keepBreaks:true }))
      .pipe(gulp.dest('dist/assets/css'));

  gulp.src(current + '/assets/js/*.js')
      .pipe(uglify())
      .pipe(gulp.dest('dist/assets/js'));

  gulp.src(current + '/assets/img/**')
      .pipe(gulp.dest('dist/assets/img'));

  gulp.src(current + '/assets/font/*')
      .pipe(gulp.dest('dist/assets/font'));

  gulp.src(current + '/*.html')
    .pipe(gulp.dest('dist/'));
});
