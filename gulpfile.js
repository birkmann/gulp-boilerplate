var gulp 		= require('gulp'); 

var server 		= require('gulp-server-livereload');
	sass 		= require('gulp-sass'),
	imagemin 	= require ('gulp-imagemin'),
	changed 	= require('gulp-changed'),
	jshint 		= require ('gulp-jshint'),
	concat 		= require ('gulp-concat'),
	uglify 		= require ('gulp-uglify'),
	rename 		= require('gulp-rename'),
	clean 		= require('gulp-clean'),
	minifyhtml 	= require ('gulp-minify-html'),
	minifycss 	= require ('gulp-minify-css'),
	autoprefixer 	= require ('gulp-autoprefixer');

gulp.task('server', function() {
	gulp.src('build')
		.pipe(server({
			livereload: true,
	 		open: true
		}));
});

gulp.task('html', function() {
    return gulp.src('src/*.html')
    	.pipe(connect.reload())
        .on('error', gutil.log);
});

gulp.task('files-deploy', function() {
	
    gulp.src('src/*')
        .pipe(gulp.dest('build'));

    gulp.src('src/.*')
        .pipe(gulp.dest('build'));

    gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('build/fonts'));

});

/*
gulp.task('sass', function () {
	gulp.src('./src/scss/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('./build/css'));
});
*/

gulp.task('sass', function() {
	gulp.src('./src/scss/*.scss')
		.pipe(sass({ style: 'expanded' }))
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest('./build/css'));
});

gulp.task('images', function(tmp) {
    console.log(tmp);
    gulp.src(['app/images/*.jpg', 'app/images/*.png'])
        .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }));
});

gulp.task('images-deploy', function() {
    gulp.src(['src/img/**/*'])
        .pipe(gulp.dest('build/img'));
});

gulp.task('default', ["files-deploy", "sass", "images", "images-deploy", "server"], function() {
    gulp.watch('src/js/src/**', ['files-deploy']);
    gulp.watch('src/scss/**', ['sass']);
    gulp.watch('src/img/**', ['images']);
    gulp.watch('src/*.html', ['files-deploy']);
});