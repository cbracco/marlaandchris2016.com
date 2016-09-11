var debounce = require('./debounce')
var gumshoe = require('gumshoe')
var smoothScroll = require('smooth-scroll')
require('jquery-sticky-kit')

module.exports = function () {
  // Cache selectors
  var htmlBody = $('html, body'),
      siteNavigation = $('.js-site-navigation'),
      siteNavigationItem = $('.js-site-navigation .nav-item')
      siteNavigationLink = $('.js-site-navigation .nav-link'),
      siteNavigationToggle = $('.js-site-navigation-toggle')

  // Set data attribute on navigation toggle
  siteNavigationToggle.data('text-original', siteNavigationToggle.text())

  // Toggle navigation visibility with a button
  siteNavigationToggle.on('click', function () {
    var $this = $(this)

    htmlBody.toggleClass('overflow-hidden')
    $this.toggleClass('is-active')
    siteNavigation.toggleClass('is-visible')

    if ($this.text() == $this.data('text-swap')) {
      $this.text($this.data('text-original'))
    } else {
      $this.data('text-original', $this.text())
      $this.text($this.data('text-swap'))
    }
  })

  // Close navigation when link is clicked
  siteNavigationLink.on('click', function () {
    htmlBody.removeClass('overflow-hidden')
    siteNavigationToggle.removeClass('is-active')
    siteNavigation.removeClass('is-visible')

    if (siteNavigationToggle.text() == siteNavigationToggle.data('text-swap')) {
      siteNavigationToggle.text(siteNavigationToggle.data('text-original'))
    } else {
      siteNavigationToggle.data('text-original', siteNavigationToggle.text())
      siteNavigationToggle.text(siteNavigationToggle.data('text-swap'))
    }
  })

  var buildSiteNavigation = function () {
    // If navigation is positioned static (aka for larger devices),
    if ($(window).width() >= 900) {
      // Initialize scrollspy
      gumshoe.init({
        offset: siteNavigation.height(),
        activeClass: 'is-active'
      })

      // Initialize smooth scrolling
      smoothScroll.init({
        offset: siteNavigation.height(),
        updateURL: false
      })

      // Initialize sticky navigation
      siteNavigation.stick_in_parent({
        sticky_class: 'is-stuck'
      })
    } else {
      // Destroy scrollspy
      gumshoe.destroy()
      // Destroy smooth scrolling
      smoothScroll.destroy()
      // Detach sticky navigation
      siteNavigation.trigger('sticky_kit:detach')
      // Remove any active classes that may have been added
      siteNavigationItem.removeClass('is-active')
      siteNavigationLink.removeClass('is-active')
    }
  }

  buildSiteNavigation()
  window.addEventListener('resize', debounce(buildSiteNavigation, 66))
}
