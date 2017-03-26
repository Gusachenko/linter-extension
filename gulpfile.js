'use strict';

// include gulp
const gulp = require('gulp');

var minifyHtml = require("gulp-minify-html");

var sass         = require('gulp-sass');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

var rename          = require("gulp-rename");
var imageResize     = require("gulp-image-resize");
var resolutionArray = [1920, 1366, 800, 480];

const runSequence = require('run-sequence');
const stripDebug = require('gulp-strip-debug');
const imagemin = require('gulp-imagemin');
const clean = require('gulp-clean');

// minify HTML
gulp.task('minify-html', function () {
	var srcPath = "./app/*/*.html",
	destPath = "./dist";
    gulp.src(srcPath) // path to your files
    .pipe(minifyHtml())
    .pipe(gulp.dest(destPath));
});

//generate CSS from SASS
gulp.task('sass', function () {
    var processors = [
        autoprefixer({ 
            browsers: ["> 0%"]
        })
    ];

    return gulp.src(['./app/*/*.scss','./app/*/*/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest('./dist'));
});
gulp.task('sass:watch', function () {
  gulp.watch('./app/styles/*.scss', ['sass']);
});

//
gulp.task("imgsToResponsive", function () {
    
  resolutionArray.forEach(function(item,i){
      
    gulp.src("./app/images/*.{jpg,png}")
    .pipe(imageResize({
      width : item
    }))
    .pipe(rename(function (path) {
      path.basename+="-"+item
    }))
    .pipe(gulp.dest("./dist/images"));
      
       gulp.src("./app/images/*.{jpg,png}")
    .pipe(imageResize({
      width : item*2
    }))
    .pipe(rename(function (path) {
      path.basename+="-"+item+"-x2"
    }))
    .pipe(gulp.dest("./dist/images"));
      
  });    
});


//
gulp.task('stripDebug', function () {
    return gulp.src(['./app/*/*.js','./app/*/*/*.js'])
        .pipe(stripDebug())
        .pipe(gulp.dest('./dist'));
});


//
gulp.task('imagemin', () =>
    gulp.src('./app/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist'))
);


//copy of unmodifided files
gulp.task('copy', function() {
    gulp.src('./app/manifest.json')
        .pipe(gulp.dest('./dist'))
});


//
gulp.task('build-test', function() {
  runSequence('sass',
              'minify-html',
              'stripDebug',
              'imagemin',
              'copy');
});


//
gulp.task('clean-dist', function () {
    return gulp.src(['./dist/*', '!./dist/vendor'], {read: false})
        .pipe(clean());
});