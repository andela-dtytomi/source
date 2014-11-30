'use strict';

var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  watch = require('gulp-watch'),
  jshint = require('gulp-jshint'),
  karma = require('gulp-karma'),
  jasmine = require('gulp-jasmine'),
  livereload = require('gulp-livereload'),
  app = require('./app');

var testFiles = [

  'spec/front-end/*.js'
];

gulp.task('dev-server',  function() {
  app.listen(3000);
});

gulp.task('test-server', function() {
  app.listen(3001);
});



//register nodemon task
gulp.task('nodemon', function () {
  nodemon({ script: './bin/www', env: { 'NODE_ENV': 'development' }})
    .on('restart');
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    var server = livereload();
    gulp.src(['*.js','routes/*.js', 'public/*.js'], { read: true })
        .pipe(watch({ emit: 'all' }))
        .pipe(jshint())
        .pipe(jshint.reporter('default'));

    gulp.watch(['*.js','routes/*.js', 'views/**/*.*', 'public/**/*.*']).on('change', function(file) {
      server.changed(file.path);
  });
});

//karma js files
gulp.task('karma-test', function() {
  // Be sure to return the stream
  return gulp.src(testFiles)
         .pipe(karma({
          configFile: 'karma.conf.js',
          action: 'run'
    }))
    .on('end', function() {
      process.exit();
    })
    .on('error', function() {
      // Make sure failed tests cause gulp to exit non-zero
      this.emit();
    });
});

//jasmine js files
gulp.task('test', function () {
    return gulp.src('spec/test.js')
        .pipe(jasmine());
});

//lint js files
gulp.task('lint', function() {
    gulp.src(['*.js','routes/*.js', 'public/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('default'));
});


// The default task (called when you run `gulp` from cli)
gulp.task('default', ['dev-server']);
// gulp.task('default', ['lint','nodemon', 'watch']);