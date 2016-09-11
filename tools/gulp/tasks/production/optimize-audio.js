// Define Dependencies
var config = require('../../config').optimize.audio
var gulp = require('gulp')
var handleErrors = require('../../utilities/handleErrors')
var plumber = require('gulp-plumber')

// Optimize audio (gulp optimize:audio)
gulp.task('optimize:audio', function () {
  return gulp.src(config.src)
    .pipe(plumber({ errorHandler: handleErrors }))
    .pipe(gulp.dest(config.dest))
})
