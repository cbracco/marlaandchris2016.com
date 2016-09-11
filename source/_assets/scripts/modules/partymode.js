var move = require('move-js')
require('howler')

module.exports = function () {
  // Cache selectors
  var partymodeOpen = $('.js-partymode-open'),
      partymodeClose = $('.js-partymode-overlay'),
      partymode = '.js-partymode',
      partymodeOverlay = '.js-partymode-overlay',
      partymodeDiscoball = '.js-partymode-discoball',
      partymodeDancers = '.js-partymode-dancers',
      partymodeMusic = new Howl({
        src: [
          '/assets/audio/partymode-music.mp3',
          '/assets/audio/partymode-music.ogg'
        ],
        loop: true,
        volume: 0.8,
        rate: 1
      })

  // Create animations
  var showOverlay = move(partymodeOverlay)
    .set('opacity', 0.5)
    .set('visibility', 'visible')

  var hideOverlay = move(partymodeOverlay)
    .set('opacity', 0)
    .set('visibility', 'hidden')

  var hideDancers = move(partymodeDancers)
    .y('100%')
    .delay(0)

  // Activate Party Mode
  partymodeOpen.on('click', function () {
    move(partymode)
      .set('opacity', 1)
      .set('visibility', 'visible')
      .end()
    move(partymodeDiscoball)
      .y(0)
      .then(showOverlay)
      .end(function () {
        partymodeMusic.play()
      })
    move(partymodeDancers)
      .y(0)
      .delay('9s')
      .end()
  });

  // Deactivate Party Mode
  partymodeClose.on('click', function () {
    move(partymodeDiscoball)
      .y('-100%')
      .then(hideDancers)
      .then(hideOverlay)
      .end(function () {
        partymodeMusic.pause()
      })
  })
}
