module.exports = function(grunt) {
	var config;
	
	require('load-grunt-tasks')(grunt);

	config = {
		pkg: grunt.file.readJSON('package.json'),
		paths: {
			src: 'src',
			release: 'release',
			build: 'build',
			bower_components: 'bower_components',
			main_style: 'aamc-styles'
		},
		connect: {
			options: {
				hostname: 'localhost',
				livereload: true
			},
			dev: {
				options: {
					port: 8888,
					base: '<%= paths.build %>',
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
						bower_components_path: '"../bower_components"',
						"icon-font-path": '"/fonts/"',
						"fa-font-path": '"/fonts"'
					}
				},
				files: [{
					expand: true,
					cwd: '<%= paths.src %>/',
					src: 'aamc-styles.less',
					dest: '<%= paths.build %>/',
					ext: '.css'
					//rename: function(src, dest) {return dest;}
				}]
			}/*,
			release: {
				options: {
					compress: true,
					yuicompress: true,
					sourceMap: false,
				},
				files: [{
					expand: true,
					cwd: '<%= paths.src %>/less',
					src: '<%= paths.main_style %>.less',
					dest: '<%= paths.release %>/css/',
					ext: '.css'
				}]
			}*/
		},
		copy: {
			html: {
				options: {
					process: function(content, srcpath) {
						return grunt.template.process(content);
					}
				},
				expand: true,
				cwd: '<%= paths.src %>/',
				src: '**/*.html',
				dest: '<%= paths.build %>/',
				filter: 'isFile'
			},
			fonts_dev: {
				expand: true,
				src: ['<%= paths.bower_components %>/bootstrap/fonts/*', '<%= paths.bower_components%>/font-awesome/fonts/*'],
				flatten: true,
				filter: 'isFile',
				dest: '<%= paths.build %>/fonts/'
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
				tasks: ['less:development'],
				options: {
					livereload: true
				}
			}
		}
	};

	//
	grunt.initConfig(config);
	grunt.registerTask('default', ['connect:dev', 'watch']);
	grunt.registerTask('dev-watch', ['copy:fonts_dev', 'connect:dev', 'watch']);
	grunt.registerTask('release', ['copy:less_release']);
};