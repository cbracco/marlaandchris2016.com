// Define Dependencies
var browserSync = require('browser-sync')
var config = require('../../config').watch
var gulp = require('gulp')

// Ensure browser reloads after required tasks are complete
gulp.task('watch:jekyll', ['jekyll'], browserSync.reload)
gulp.task('watch:styles', ['styles'])
gulp.task('watch:scripts', ['scripts'])
gulp.task('watch:images', ['images'], browserSync.reload)
gulp.task('watch:icons', ['icons'], browserSync.reload)
gulp.task('watch:favicons', ['favicons'], browserSync.reload)
gulp.task('watch:fonts', ['fonts'], browserSync.reload)
gulp.task('watch:audio', ['audio'], browserSync.reload)

// Watch (gulp watch)
gulp.task('watch', ['serve'], function () {
  gulp.watch(config.jekyll, ['watch:jekyll'])
  gulp.watch(config.styles, ['watch:styles'])
  gulp.watch(config.scripts, ['watch:scripts'])
  gulp.watch(config.images, ['watch:images'])
  gulp.watch(config.icons, ['watch:icons'])
  gulp.watch(config.favicons, ['watch:favicons'])
  gulp.watch(config.fonts, ['watch:fonts'])
  gulp.watch(config.audio, ['watch:audio'])
})
