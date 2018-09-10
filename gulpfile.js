const gulp = require('gulp')
const head = require('gulp-header')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const qunit = require('node-qunit-phantomjs')

const pkg = require('./package.json')

const banner = [
  '/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @author <%= pkg.author %>',
  ' * @license <%= pkg.license %>',
  '**/',
  '',
].join('\n')

gulp.task('test', () => {
  qunit('tests/auto/index.html')
  qunit('tests/standard/index.html')
  qunit('tests/off/index.html')
})

gulp.task('default', ['test'])
