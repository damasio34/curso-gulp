var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var htmlReplace = require('gulp-html-replace');
var uglify = require('gulp-uglify');
var usemin = require('gulp-usemin');
var cssmin = require('gulp-cssmin');
var browserSync = require('browser-sync');
var jshint = require('gulp-jshint');
var jshintStylish = require('jshint-stylish');
var csslint = require('gulp-csslint');

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

gulp.task('serve', function() {
	browserSync.init({
		server: {
			baseDir: 'src'
		}		
	});

	gulp.watch('src/js/*.js').on('change', function(event) {
		// console.log(event.path);
		gulp.src(event.path)
			.pipe(jshint())
			.pipe(jshint.reporter(jshintStylish));
	});

	gulp.watch('src/css/*.css').on('change', function(event) {		
		gulp.src(event.path)
			.pipe(csslint())
			.pipe(csslint.reporter());
	});

	gulp.watch('src/**/*').on('change', browserSync.reload);
})

gulp.task('default', ['clean'], function() {
	// gulp.start('build-img', 'build-js', 'build-html');
	gulp.start('build-img','usemin');
});
	