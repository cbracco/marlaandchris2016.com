// Define Dependencies
var gulp = require('gulp')
var runSequence = require('run-sequence')

// Build (gulp build:production)
gulp.task('build:production', function (callback) {
  runSequence(
    'clean',
    [
      'styles',
      'scripts',
      'images',
      'icons',
      'favicons',
      'fonts',
      'audio'
    ],
    'jekyll:production',
    [
      'optimize:styles',
      'optimize:scripts',
      'optimize:images',
      'optimize:icons',
      'optimize:favicons',
      'optimize:fonts',
      'optimize:audio',
      'optimize:html'
    ],
    'revision',
    'revision:collect',
    [
      'gzip'
    ],
    callback
  )
})
