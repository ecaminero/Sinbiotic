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
    style: webroot + "assets/styles/**/*.css"
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
    const moduleSrc = gulp.src(paths.ngModule, { read: false });
    const routeSrc = gulp.src(paths.ngRoute, { read: false });
    const controllerSrc = gulp.src(paths.ngController, { read: false });
    const scriptSrc = gulp.src(paths.script, { read: false });
    const styleSrc = gulp.src(paths.style, { read: false });

    gulp.src(webroot + 'app/index.html')
        .pipe(wiredep({
            optional: 'configuration',
            goes: 'here',
            ignorePath: '..'
        }))
        .pipe(inject(series(scriptSrc, moduleSrc, routeSrc, controllerSrc), { ignorePath: '/wwwroot' }))
        .pipe(inject(series(styleSrc), { ignorePath: '/wwwroot' }))
        .pipe(gulp.dest(webroot + 'app'));
});
