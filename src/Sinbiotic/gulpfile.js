/// <binding BeforeBuild='inject:index' />
"use strict";

const gulp = require("gulp"),
    series = require('stream-series'),
    inject = require('gulp-inject'),
    minify = require('gulp-minify'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    wiredep = require('wiredep').stream;

const webroot = "./wwwroot/";

const paths = {
    ngModule: webroot + "app/**/*.module.js",
    ngRoute: webroot + "app/**/*.route.js",
    ngController: webroot + "app/**/*.controller.js",
    script: webroot + "assets/scripts/**/*.js",
    style: webroot + "assets/styles/**/*.css",
    dist: webroot + "dist/**.js"
};

gulp.task('compress', function() {
  gulp.src([paths.ngModule, paths.ngRoute, paths.ngController])
    .pipe(concat('app.js' ))
    .pipe(minify({
        ext:{
            min:'.min.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest(webroot + 'dist'))
    
});

gulp.task('inject:index', function () {
    const minDist = gulp.src(paths.dist, { read: false });
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
