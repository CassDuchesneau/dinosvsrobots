var projectSlug = 'ct-base';
var gulp = require('gulp'),
watch = require('gulp-watch');


require('es6-promise').polyfill();



/* -----------------------------
 Dev Tasks without minification
 ------------------------------- */

 gulp.task('scripts-dev', function() {
    var jshint = require('gulp-jshint'),
    rename = require("gulp-rename");

    return gulp.src('assets/js/app.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(rename({
        basename:"main",
        extname: ".min.js"
    }))
    .pipe(gulp.dest('assets/js/'));
});

 gulp.task('sass-main-dev', function() {
    //var scsslint = require('gulp-scss-lint');
    var sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require("gulp-rename");

    return gulp.src(['assets/scss/app.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(rename({
        basename:"main",
        extname: ".min.css"
    }))
    .pipe(gulp.dest('assets/css/'));
});


 gulp.task('sass-various-dev',function() {
    var sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require("gulp-rename");

    return gulp.src(['assets/scss/admin.scss','assets/scss/print.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(rename({
        extname: ".min.css"
    }))
    .pipe(gulp.dest('assets/css/'));
});

/* -----------------------------
   Build Tasks with minifcation
   ------------------------------- */

   gulp.task('scripts', function() {
    var jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require("gulp-rename");

    return gulp.src('assets/js/app.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(rename({
        basename:"main",
        extname: ".min.js"
    }))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js/'));
});

   gulp.task('sass-main', function() {
    var sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCss = require('gulp-cssnano'),
    rename = require("gulp-rename");

    return gulp.src(['assets/scss/app.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(rename({
        basename:"main",
        extname: ".min.css"
    }))
    .pipe(minifyCss())
    .pipe(gulp.dest('assets/css/'));
});

   gulp.task('sass-various',function() {
    var sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCss = require('gulp-cssnano'),
    rename = require("gulp-rename");

    return gulp.src(['assets/scss/admin.scss','assets/scss/print.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(rename({
        extname: ".min.css"
    }))
    .pipe(minifyCss())
    .pipe(gulp.dest('assets/css/'));
});


gulp.task('watch', function() {
  gulp.watch(['assets/js/app.js'], gulp.series('scripts-dev'));
  gulp.watch(['assets/scss/app.scss', 'assets/scss/responsive.scss', 'assets/scss/global/*.scss', 'assets/scss/section/*.scss'], gulp.series('sass-main-dev'));
  gulp.watch(['assets/scss/admin.scss', 'assets/scss/print.scss'], gulp.series('sass-various-dev'));
});

gulp.task('build', gulp.series('scripts', 'sass-main','sass-various'));
