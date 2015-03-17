var gulp = require('gulp'); 

var changed = require('gulp-changed'),
	sass = require('gulp-sass'),
	jshint = require ('gulp-jshint'),
	concat = require ('gulp-concat'),
	uglify = require ('gulp-uglify'),
	rename = require('gulp-rename'),
	imagemin = require ('gulp-imagemin'),
	clean = require('gulp-clean'),
	minifyhtml = require ('gulp-minify-html'),
	autoprefixer = require ('gulp-autoprefixer'),
	minifyCSS = require ('gulp-minify-css');

gulp.task('images', function() {
	var imgSrc = './src/images/**/*',
		imgDst = './build/images';

	gulp.src(imgSrc)
		.pipe(changed(imgDst))
		.pipe(imagemin())
		.pipe(gulp.dest(imgDst));
});

gulp.task('sass', function () {
    gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./build/css'));
});

gulp.task('default', ["images", "sass"]);