var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var htmlReplace = require('gulp-html-replace');
var uglify = require('gulp-uglify');
var usemin = require('gulp-usemin');
var cssmin = require('gulp-cssmin');

gulp.task('clean', function() {
    return gulp.src('dist')
        .pipe(clean());
});

gulp.task('copy', ['clean'], function() {
    return gulp.src('src/**/*')
        .pipe(gulp.dest('dist'));
});

gulp.task('build-img', function() {
    gulp.src('src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});

gulp.task('build-js', function() {
    gulp.src([
	    	'src/js/jquery.js', 
	    	'src/js/home.js', 
	    	'src/js/produto.js'
		])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('build-html', function() {
    gulp.src('src/**/*.html')
        .pipe(htmlReplace({
        	js: 'js/all.js'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('usemin', function() {
	gulp.src('src/**/*.html')
		.pipe(usemin({
			'js': [uglify],
			'css': [cssmin]
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('default', ['clean'], function() {
	// gulp.start('build-img', 'build-js', 'build-html');
	gulp.start('build-img','usemin');
});
