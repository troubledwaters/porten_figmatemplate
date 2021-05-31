'use strict'

const gulp = require('gulp');
const concat = require('gulp-concat');
const del = require('del');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
var pug = require('gulp-pug');
// const static = require('node-static');


gulp.task('styles', function () {
    return (
        gulp.src('src/styles/**/*.*')
            .pipe(sass().on('error', sass.logError))
            .pipe(concat('main.css'))
            .pipe(gulp.dest('public'))
    )

});

gulp.task('clean', function () {
    return (
        del('public')
    );

});

gulp.task('html', function buildHTML() {
    return gulp.src('src/**/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('src'))
});

gulp.task('assets', function(){
    return (
        gulp.src(['src/assets/**', '!src/assets/**/*.pug'], { since: gulp.lastRun('assets') })
            .pipe(gulp.dest('public'))

    )
});


gulp.task('js', function () {
    return (
        gulp.src('src/js/**/*.*')
            .pipe(concat('main.js'))
            .pipe(gulp.dest('public'))
    )

});

gulp.task('watch', function () {
    gulp.watch('src/assets/**/*.pug', gulp.series('html'))
    gulp.watch('src/styles/**/*.*', gulp.series('styles'))
    gulp.watch('src/assets/**/*.*', gulp.series('assets'))
    gulp.watch('src/js/**/*.*', gulp.series('js'))
});

gulp.task('serve', function () {
    browserSync.init({
        server: 'public'
    });
    browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});

gulp.task('build', gulp.series('clean', gulp.parallel('assets', 'styles', 'js')));
gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')));