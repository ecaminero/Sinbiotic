/// <binding BeforeBuild='inject:index' />
"use strict";

const gulp = require("gulp"),
    series = require('stream-series'),
    inject = require('gulp-inject'),
    minify = require('gulp-minify'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rimraf = require('gulp-rimraf'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
    ngAnnotate = require('gulp-ng-annotate'),
    closure = require('gulp-jsclosure'),
    p = require('path'),
    wiredep = require('wiredep').stream;

const webroot = "./wwwroot/";

const distSrc = webroot + "dist/";

const paths = {
    ngModule: webroot + "app/**/*.module.js",
    ngRoute: webroot + "app/**/*.route.js",
    ngController: webroot + "app/**/*.controller.js",
    script: webroot + "assets/scripts/**/*.js",
    style: webroot + "assets/styles/**/*.css",
    minDist: webroot + "dist/.js"
};

const moduleSrc = gulp.src(paths.ngModule, { read: false });
const routeSrc = gulp.src(paths.ngRoute, { read: false });
const controllerSrc = gulp.src(paths.ngController, { read: false });
const scriptSrc = gulp.src(paths.script, { read: false });
const styleSrc = gulp.src(paths.style, { read: false });

function handleError(result){
  console.log("Error Complile", result);
};


gulp.task('empty-dist', function() {
  return gulp.src(distSrc, { read: false })
    .pipe(rimraf());
});

gulp.task('compile-js', ['empty-dist'], function() {
  gulp.src([paths.ngModule, paths.ngRoute, paths.ngController])
    .pipe(closure({angular: true}))
    .pipe(ngAnnotate({ add: true, single_quotes: true })).on('error', handleError)
    .pipe(gulp.dest(webroot + 'dist/'))
});

gulp.task('build:dev', ['compile-js'], function () {
    gulp.src(webroot + 'app/index.html')
        .pipe(wiredep({
            optional: 'configuration',
            goes: 'here',
            ignorePath: '..'
        }))
        .pipe(inject(series(moduleSrc, routeSrc, controllerSrc, scriptSrc), { ignorePath: '/wwwroot' }))
        .pipe(inject(series(styleSrc), { ignorePath: '/wwwroot' }))
        .pipe(gulp.dest(webroot + 'app'));
});


// Task For Minify files 

gulp.task('compile-js-prod', ['empty-dist'], function() {
  gulp.src([paths.ngModule, paths.ngRoute, paths.ngController])
     .pipe(concat('app.js'))
     .pipe(closure({angular: true}))
     .pipe(ngAnnotate({ add: true, single_quotes: true })).on('error', handleError)
     .pipe(gulp.dest(webroot + 'dist'))
     .pipe(uglify({mangle: false}))
     .pipe(rename('main.min.js'))
     .pipe(gulp.dest(webroot + 'dist/'))
});

gulp.task('build:prod', ['compile-js-prod'], function () {
    const minDist = gulp.src(paths.minDist, { read: false });
    const scriptSrc = gulp.src(paths.script, { read: false });
    const styleSrc = gulp.src(paths.style, { read: false });
    
    gulp.src(webroot + 'app/index.html')
        .pipe(wiredep({
            optional: 'configuration',
            goes: 'here',
            ignorePath: '..'
        }))
        .pipe(inject(series(scriptSrc, minDist), { ignorePath: '/wwwroot' }))
        .pipe(inject(series(styleSrc), { ignorePath: '/wwwroot' }))
        .pipe(gulp.dest(webroot + 'app'));
});

