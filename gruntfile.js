module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        bitwise: true,
        camelcase: true,
        indent: 2,
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        white: true,
        validthis: true,
        quotmark: 'single',
        globals: {
          'window': true,
          'jQuery': true,
          'clearTimeout': true,
          'setTimeout': true
        }
      },
      files: {
        src: ['./src/*.js']
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      my_target: {
        files: {
          './wHumanMsg.min.js': ['./src/wHumanMsg.js']
       }
      }
    },
    stylus: {
      compile: {
        options: {
          import: ['nib', '../lib/mixins'],
        },
        files: {
          './wHumanMsg.min.css': './src/wHumanMsg.css'
        }
      }
    },
    watch: {
      files: [
        './src/wHumanMsg.css',
        './src/wHumanMsg.js'
      ],
      tasks: ['uglify']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['jshint', 'stylus', 'uglify']);
};