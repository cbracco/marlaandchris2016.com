// Define Dependencies
var browserSync = require('browser-sync')
var changed = require('gulp-changed')
var config = require('../../config').images
var gulp = require('gulp')
var handleErrors = require('../../utilities/handleErrors')
var imageResize = require('gulp-image-resize')
var plumber = require('gulp-plumber')

// Images (gulp imageResize)
gulp.task('imageResize', function () {
  browserSync.notify('Resizing Images&hellip;')

  return gulp.src(config.processors.imageResize.src)
    .pipe(plumber({ errorHandler: handleErrors }))
    .pipe(changed(config.processors.imageResize.dest))

    // Large
    .pipe(imageResize(config.processors.imageResize.large))
    .pipe(gulp.dest(config.processors.imageResize.dest + config.processors.imageResize.largeDest))

    // Medium
    .pipe(imageResize(config.processors.imageResize.medium))
    .pipe(gulp.dest(config.processors.imageResize.dest + config.processors.imageResize.mediumDest))

    // Small
    .pipe(imageResize(config.processors.imageResize.small))
    .pipe(gulp.dest(config.processors.imageResize.dest + config.processors.imageResize.smallDest))
})

// Images (gulp images)
gulp.task('images', ['imageResize'], function () {
  browserSync.notify('Rebuilding Images&hellip;')

  return gulp.src(config.src)
    .pipe(plumber({ errorHandler: handleErrors }))
    .pipe(changed(config.dest))
    .pipe(gulp.dest(config.dest))
})
