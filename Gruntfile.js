module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
  , 'gh-pages': {
      options: {
        base: 'public'
      , message: 'v<%= pkg.version %>'
      }
    , travis: {
        options: {
          repo: 'https://' + process.env.GH_TOKEN + '@github.com/brycekahle/steamturbine.git'
        , silent: true
        , user: {
            name: 'Travis CI'
          , email: 'bkahle@gmail.com'
          }
        }
      , src: ['**']
      }
    }
  , bump: {
      options: {
        commit: false
      , createTag: false
      , push: false
      , updateConfigs: ['pkg']
      }
    }
  , browserify: {
      dist: {
        options: {
          browserifyOptions: {
            debug: true
          }
        , transform: [
            'reactify'
          ]
        , plugin: [
            ['minifyify', {
              output: 'public/js/app.js.map'
            , map: '/js/app.js.map'
            , compressPath: __dirname
            }]
          ]
        }
      , files: {
          'public/js/app.js': ['index.js']
        }
      }
    }
  , sass: {
      options: {
        sourceMap: true
      }
    , dist: {
        files: {
          'public/css/app.css': 'sass/app.scss'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-sass');

  grunt.registerTask('build', [
    'bump:git'
  , 'browserify:dist'
  , 'sass:dist'
  ]);
  grunt.registerTask('pages', [
    'gh-pages:travis'
  ]);
};
