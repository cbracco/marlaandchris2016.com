// Define Dependencies
var browserSync = require('browser-sync')
var config = require('../../config').audio
var gulp = require('gulp')
var handleErrors = require('../../utilities/handleErrors')
var plumber = require('gulp-plumber')

// Audio (gulp audio)
gulp.task('audio', function () {
  browserSync.notify('Rebuilding Audio&hellip;')

  return gulp.src(config.src)
    .pipe(plumber({ errorHandler: handleErrors }))
    .pipe(gulp.dest(config.dest))
})
