// Define Dependencies
var $ = require('jquery')
require('lazysizes')
require('lazysizes/plugins/bgset/ls.bgset')
var navigation = require('./modules/navigation')
var partymode = require('./modules/partymode')

// Initialize Navigation
navigation()

// Initialize Partymode
partymode()

// Print success message to console
console.log('</body> scripts loaded.')
