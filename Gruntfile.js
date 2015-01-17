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
          transform: ['reactify']
        }
      , files: {
          'public/app.js': ['index.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('build', [
    'bump:git'
  , 'browserify:dist'
  ]);
  grunt.registerTask('pages', [
    'gh-pages:travis'
  ]);
};
