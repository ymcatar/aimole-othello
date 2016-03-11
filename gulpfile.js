var gulp = require('gulp');

var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');

var uglify = require('gulp-uglify');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var gutil = require('gulp-util');
var watch = require('gulp-watch');

var livereload = require('gulp-livereload');

/* both */
gulp.task('static', () => {
	gulp.src(['./src/index.html', './src/*.*'])
		.pipe(gulp.dest('./dist'));
});

/* dev */
gulp.task('jsx', () => {
	var bundler = browserify('./src/jsx/App.jsx', {
		debug: true,
		paths: ['./src/jsx'],
		cache: {},
		packageCache: {},
		fullPaths: true
	}).transform(babelify, {
		presets: ["es2015", "react"],
		ignore: /(bower_components)|(node_modules)/
	});
	var rebundle = function() {
		gutil.log('jsx starting.');
		bundler
			.bundle()
			.on('error', err => { gutil.log(err.message); })
			.pipe(source('bundle.js'))
			.pipe(gulp.dest('./dist'))
			.pipe(livereload())
			.on('end', () => { gutil.log('jsx completed.'); });
	};
	bundler = watchify(bundler);
	rebundle();
	bundler.on('update', rebundle);
});

gulp.task('watch', () => {
	watch(['./src/index.html', './src/*.*'], () => { gulp.start('static'); });
});

/* build */
gulp.task('jsx_env', () => {
	gutil.log('build starting.');
	browserify('./src/jsx/App.jsx', {
		debug: false,
		paths: ['./src/jsx'],
		cache: {},
		packageCache: {},
		fullPaths: true
	})
		.transform(babelify, {
			presets: ["es2015", "react"],
			ignore: /(bower_components)|(node_modules)/
		})
		.bundle()
		.on('error', err => { gutil.log(err.message); })
		.pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest('./dist'))
		.on('end', () => { gutil.log('build completed.'); });
});

gulp.task('default', ['watch', 'jsx', 'static']);
gulp.task('build', ['jsx_env', 'static']);
