'use strict'

const gulp = require('gulp');
const concat = require('gulp-concat');
const del = require('del');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
// const static = require('node-static');


gulp.task('styles', function(){
    return (
        gulp.src('src/styles/**/*.*')
            .pipe(sass().on('error', sass.logError))
            .pipe(concat('main.css'))
            .pipe(gulp.dest('public'))
    )

});

gulp.task('clean', function(){
    return(
        del('public')
    );

});

gulp.task('assets', function () {
    return (
        gulp.src('src/assets/**', {since: gulp.lastRun('assets')})
        .pipe(gulp.dest('public'))
        
        )
});

gulp.task('js', function(){
    return (
        gulp.src('src/js/**/*.*')
            .pipe(concat('main.js'))
            .pipe(gulp.dest('public'))
    )

});

gulp.task('watch', function (){
    gulp.watch('src/styles/**/*.*', gulp.series('styles'))    
    gulp.watch('src/assets/**/*.*', gulp.series('assets'))    
});

gulp.task('serve', function(){
    browserSync.init({
        server: 'public'
    });
    browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});

gulp.task('build', gulp.series('clean', gulp.parallel('assets','styles','js')));
gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')));