// Define Dependencies
var gutil = require('gulp-util')
var prettyHrtime = require('pretty-hrtime')
var startTime

// Log Bundles
module.exports = {
  start: function (filepath) {
    startTime = process.hrtime()
    gutil.log('Bundling', gutil.colors.green(filepath))
  },

  end: function (filepath) {
    var taskTime = process.hrtime(startTime)
    var prettyTime = prettyHrtime(taskTime)
    gutil.log('Bundled', gutil.colors.green(filepath), 'in', gutil.colors.magenta(prettyTime))
  }
}
