'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const inline = require('gulp-inline-source');
const htmlmin = require('gulp-htmlmin');
const server = require('gulp-server-livereload');
const imagemin = require('gulp-imagemin');

gulp.task('imagemin', () => {
  gulp.src('./assets/*')
    .pipe(imagemin())
    .pipe(gulp.dest(''))
});

gulp.task('styles', () => {
  return gulp.src('./styles/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./page/'));
});

gulp.task('minify', () => {
  gulp.src('./scripts/app.js')
  .pipe(uglify())
  .pipe(gulp.dest('./page/'));
});

gulp.task('inline', () => {
  return gulp.src('./page/index.html')
    .pipe(inline())
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(''));
});

gulp.task('serve', () => {
  gulp.src('')
    .pipe(server({
      defaultFile: './page/index.html',
      livereload: true,
      open: true
    }));
});

gulp.task('default', ['imagemin', 'styles', 'inline', 'minify']);
