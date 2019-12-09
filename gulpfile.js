/*
Copyright 2019 Myles Borins

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
'use strict';

const path = require('path');

const {
  series,
  parallel,
  watch,
  src,
  dest
} = require('gulp');

const autoprefixer = require('gulp-autoprefixer');
const browserify = require('gulp-bro');
const connect = require('gulp-connect');
const csso = require('gulp-csso');
const del = require('del');
const jade = require('gulp-pug');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const stylus = require('gulp-stylus');
const through = require('through');
const uglify = require('gulp-uglify');

const isDist = process.argv.indexOf('serve') === -1;

async function cleanJS() {
  await del('dist/build/build.js');
}

function buildJS() {
  return src('src/scripts/main.js')
    .pipe(isDist ? through() : plumber())
    .pipe(browserify({ debug: !isDist }))
    .pipe(isDist ? uglify() : through())
    .pipe(rename('build.js'))
    .pipe(dest('dist/build'))
    .pipe(connect.reload());
}

exports.js = series(cleanJS, buildJS);

async function cleanHTML() {
  await del('dist/index.html');
}

function buildHTML() {
  return src('src/index.jade')
    .pipe(isDist ? through() : plumber())
    .pipe(jade({ pretty: true }))
    .pipe(rename('index.html'))
    .pipe(dest('dist'))
    .pipe(connect.reload());
}

exports.html = series(cleanHTML, buildHTML);

async function cleanCSS() {
  await del('dist/build/build.css');
}

function buildCSS() {
  return src('src/styles/main.styl')
    .pipe(isDist ? through() : plumber())
    .pipe(stylus({
      // Allow CSS to be imported from node_modules and bower_components
      'include css': true,
      'paths': ['./node_modules', './bower_components']
    }))
    .pipe(autoprefixer('last 2 versions', { map: false }))
    .pipe(isDist ? csso() : through())
    .pipe(rename('build.css'))
    .pipe(dest('dist/build'))
    .pipe(connect.reload());
}

exports.css = series(cleanCSS, buildCSS);

async function cleanImages() {
  await del('dist/images');
}

function copyImages() {
  return src('src/images/**/*')
    .pipe(dest('dist/images'))
    .pipe(connect.reload());
}

exports.images = series(cleanImages, copyImages)

async function cleanTask () {
  await del('dist');
}
exports.clean = cleanTask;

function connectTask(done) {
  connect.server({
    root: 'dist',
    livereload: true
  });
  done();
}

function watchTask(done) {
  watch('src/**/*.jade', exports.html);
  watch('src/styles/**/*.styl', exports.css);
  watch('src/images/**/*', exports.images);
  watch([
    'src/scripts/**/*.js',
    'bespoke-theme-*/dist/*.js' // Allow themes to be developed in parallel
  ], exports.js);
  done();
}

exports.build = parallel(exports.js, exports.html, exports.css, exports.images);

exports.connect = series(exports.build, connectTask)

exports.serve = parallel(exports.connect, watchTask);

exports.default = exports.build;

