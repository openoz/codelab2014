module.exports = function (grunt) {
  var config;

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-conventional-changelog');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-coffeelint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-ngmin');
  grunt.loadNpmTasks('grunt-html2js');

  /**
   * Load in our build configuration file.
   */
  var userConfig = require('./build.config.js');

  require('load-grunt-tasks')(grunt);

  config = {
    pkg: grunt.file.readJSON('package.json'),
    paths: {
      src: 'src',
      release: 'release',
      build: 'bin',
      bower_components: 'src/vendor',
      main_style: 'codelab-styles',
      scripts: {
        jQuery: 'jquery/dist/jquery.min.js',
        bootstrap_js: 'bootstrap/dist/js/bootstrap.min.js'
      }
    },
    connect: {
      options: {
        hostname: 'localhost',
        livereload: true
      },
      dev: {
        options: {
          port: 8888,
          base: ['src/', 'vendor/'],
          open: true,
          livereload: true
        }
      }
    },
    less: {
      development: {
        options: {
          compress: false,
          yuicompress: false,
          optimization: 2,
          sourceMap: true,
          modifyVars: {
            bower_components_path: '"vendor"',
            "icon-font-path": '"/fonts"',
            "fa-font-path": '"/fonts"'
          }
        },
        files: [{
          expand: true,
          cwd: '<%= paths.src %>/',
          src: 'codelab-styles.less',
          dest: '<%= paths.build %>/',
          ext: '.css'
          //rename: function(src, dest) {return dest;}
        }]
      },
      compile: {
        options: {
          optimization: 2,
          modifyVars: {
            "bower_components_path": '"vendor"',
            "icon-font-path": '"fonts/"',
            "fa-font-path": '"fonts"'
          }
        },
        files: {
          'src/.tmp/codelab-styles.css': 'src/codelab-styles.less'
        }
      }
    },
    copy: {
      build_appjs: {
        files: [
          {
            src: ['**/*.js'],
            dest: '<%= paths.build %>/',
            cwd: '.',
            expand: true
          }
        ]
      },
      html: {
        expand: true,
        cwd: '<%= paths.src %>/',
        src: ['**/*.html'],
        dest: '<%= paths.build %>/',
        filter: 'isFile'
      },
      vendor: {
        cwd: '<%= paths.src %>/vendor/',
        src: '**/*',
        dest: '<%= paths.build %>/vendor',
        expand: true
      },
      css: {
        expand: true,
        cwd: '<%= paths.src %>/.tmp',
        src: ['**/*.css'],
        dest: '<%= paths.build %>/.tmp'
      },
      fonts_dev: {
        expand: true,
        src: ['<%= paths.bower_components %>/bootstrap/fonts/*', '<%= paths.bower_components%>/font-awesome/fonts/*'],
        flatten: true,
        filter: 'isFile',
        dest: '<%= paths.src %>/.tmp/fonts/'
      },
      fonts_build: {
        expand: true,
        src: ['<%= paths.bower_components %>/bootstrap/fonts/*', '<%= paths.bower_components%>/font-awesome/fonts/*'],
        flatten: true,
        filter: 'isFile',
        dest: '<%= paths.build %>/.tmp/fonts/'
      },
      less_release: {
        expand: true,
        cwd: '<%= paths.src %>/',
        src: '**/*.less',
        dest: '<%= paths.release %>/'
      }
    },
    watch: {
      options: {
        livereload: true
      },
      html_src: {
        files: '<%= paths.src %>/**/*.html',
        tasks: ['copy:html'],
        options: {
          livereload: true
        }
      },
      less: {
        files: '<%= paths.src%>/**/*.less',
        tasks: ['less:compile'],
        options: {
          livereload: true
        }
      }
    }
  };

  //
  grunt.initConfig(config);
  grunt.registerTask('default', ['connect:dev', 'watch']);
  grunt.registerTask('build', ['copy:html', 'less:compile', 'copy:css', 'copy:fonts_dev', 'copy:build_appjs', 'copy:fonts_build', 'copy:vendor', 'copy:less_release']);
  grunt.registerTask('serve', ['build', 'connect:dev', 'watch']);
  grunt.registerTask('release', ['copy:less_release']);
};