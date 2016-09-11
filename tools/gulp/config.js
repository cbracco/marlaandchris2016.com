// Define Paths
var src = 'source/'
var srcAssets = 'source/_assets/'
var build = 'build/'
var development = 'build/development/'
var developmentAssets = 'build/assets/'
var production = 'build/production/'
var productionAssets = 'build/production/assets/'

// Define Configuration
module.exports = {
  watch: {
    jekyll: [
      '_config.yml',
      '_config.production.yml',
      src + '_data/**/*',
      src + '_includes/**/*',
      src + '_layouts/**/*',
      src + '_plugins/**/*',
      src + '_posts/**/*',
      src + '/**/*.{html,markdown,md,yml,json,txt,xml}',
      src + '/*'
    ],
    styles: srcAssets + '/styles/**/*',
    scripts: srcAssets + '/scripts/**/*',
    images: srcAssets + '/images/**/*',
    icons: srcAssets + '/icons/**/*',
    favicons: srcAssets + '/favicons/**/*',
    fonts: srcAssets + '/fonts/**/*',
    audio: srcAssets + '/audio/**/*'
  },
  serve: {
    development: {
      server: {
        baseDir: [development, build, src]
      },
      files: [
        developmentAssets + '/audio/**',
        developmentAssets + '/styles/*.css',
        developmentAssets + '/scripts/*.js',
        developmentAssets + '/images/**',
        developmentAssets + '/icons/**',
        developmentAssets + '/favicons/*',
        developmentAssets + '/fonts/*',
        developmentAssets + '/audio/*'
      ],
      port: 9999,
      xip: false,
      notify: {
        styles: ['display: hidden; padding: 12px; font-family: sans-serif; position: fixed; font-size: 14px; z-index: 10000; left: 0; bottom: 0; width: 200px; margin: 0; border-top-left-radius: 0; border-top-right-radius: 3px; color: #fff; text-align: center; background-color: rgba(0, 0, 0, 0.75);']
      }
    },
    production: {
      server: {
        baseDir: [production]
      },
      port: 9998,
      xip: true
    }
  },
  build: {},
  clean: {
    src: developmentAssets
  },
  jekyll: {
    development: {
      src: src,
      dest: development,
      config: '_config.yml'
    },
    production: {
      src: src,
      dest: production,
      config: '_config.yml,_config.production.yml'
    }
  },
  styles: {
    src: srcAssets + 'styles/styles.css',
    dest: developmentAssets + 'styles/',
    processors: {
      cssnext: {
        browsers: [
          'last 2 versions'
        ]
      },
      mqpacker: {
        sort: true
      }
    }
  },
  scripts: {
    debug: true,
    extensions: ['.coffee', '.hbs'],
    bundleConfigs: [
      {
        entries: srcAssets + 'scripts/scripts.js',
        dest: developmentAssets + 'scripts/',
        outputName: 'scripts.js'
      },
      {
        entries: srcAssets + 'scripts/head.js',
        dest: developmentAssets + 'scripts/',
        outputName: 'head.js'
      }
    ]
  },
  images: {
    src: srcAssets + 'images/**/*',
    dest: developmentAssets + 'images/',
    processors: {
      imageResize: {
        src: srcAssets + '/images/site-section/**',
        dest: developmentAssets + '/images/site-section/',
        small: {
          width: 360,
          quality: 0.8,
          progressive: true
        },
        smallDest: '/small',
        medium: {
          width: 768,
          quality: 0.8,
          progressive: true
        },
        mediumDest: '/medium',
        large: {
          width: 1140,
          quality: 0.8,
          progressive: true
        },
        largeDest: '/large'
      }
    }
  },
  icons: {
    src: srcAssets + 'icons/**/*.svg',
    dest: developmentAssets + 'icons',
    processors: {
      sprite: {
        mode: {
          symbol: {
            dest: './',
            sprite: 'sprite.svg'
          }
        }
      }
    }
  },
  favicons: {
    src: srcAssets + 'favicons/**/*',
    dest: developmentAssets + 'favicons/'
  },
  fonts: {
    src: srcAssets + 'fonts/**/*',
    dest: developmentAssets + 'fonts/'
  },
  audio: {
    src: srcAssets + 'audio/**/*',
    dest: developmentAssets + 'audio/'
  },
  optimize: {
    styles: {
      src: developmentAssets + '/styles/*.css',
      dest: productionAssets + '/styles/',
      processors: {
        rename: {
          suffix: '.min'
        }
      }
    },
    scripts: {
      src: developmentAssets + '/scripts/*.js',
      dest: productionAssets + '/scripts/',
      processors: {
        rename: {
          suffix: '.min'
        },
        uglify: {}
      }
    },
    images: {
      src: developmentAssets + '/images/**/*.{jpg,jpeg,png,gif,svg}',
      dest: productionAssets + '/images/',
      processors: {
        imagemin: {
          optimizationLevel: 3,
          progessive: true,
          interlaced: true,
          svgoPlugins: [{
            removeViewBox: false
          }]
        }
      }
    },
    icons: {
      src: developmentAssets + '/icons/**/*',
      dest: productionAssets + '/icons/'
    },
    favicons: {
      src: developmentAssets + '/favicons/**/*',
      dest: productionAssets + '/favicons/'
    },
    fonts: {
      src: developmentAssets + '/fonts/**/*',
      dest: productionAssets + '/fonts/'
    },
    audio: {
      src: developmentAssets + '/audio/**/*',
      dest: productionAssets + '/audio/'
    },
    html: {
      src: production + '/**/*.html',
      dest: production,
      processors: {
        htmlmin: {
          collapseWhitespace: true
        },
        htmlreplace: {
          styles: {
            src: '/assets/styles/',
            tpl: '<link rel="stylesheet" href="%sstyles.min.css">'
          },
          head: {
            src: '/assets/scripts/',
            tpl: '<script src="%shead.min.js"></script>'
          },
          scripts: {
            src: '/assets/scripts/',
            tpl: '<script src="%sscripts.min.js"></script>'
          }
        }
      }
    }
  },
  revision: {
    src: {
      assets: [
        productionAssets + '/styles/*.css',
        productionAssets + '/scripts/*.js',
        productionAssets + '/images/**/*'
      ],
      base: production
    },
    dest: {
      assets: production,
      manifest: {
        name: 'manifest.json',
        path: productionAssets
      }
    },
    collect: {
      src: [
        productionAssets + '/manifest.json',
        production + '/**/*.{html,xml,txt,json,css,js}',
        '!' + production + '/feed.xml'
      ],
      dest: production
    }
  },
  gzip: {
    src: production + '/**/*.{html,xml,json,css,js}',
    dest: production,
    options: {}
  },
  rsync: {
    src: production + '/**',
    options: {
      destination: '/var/www/marlaandchris2016.com/public_html/www/',
      root: production,
      hostname: 'cbracco.me',
      username: 'chris',
      port: 415,
      incremental: true,
      progress: true,
      relative: true,
      emptyDirectories: true,
      recursive: true,
      clean: true,
      exclude: ['.DS_Store'],
      include: [],
      command: true
    }
  }
}
