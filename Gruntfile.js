module.exports = function(grunt) {
	var config;
	
	require('load-grunt-tasks')(grunt);

	config = {
		pkg: grunt.file.readJSON('package.json'),
		paths: {
			src: 'src',
			release: 'release',
			build: 'build'
		},
		connect: {
			options: {
				hostname: 'localhost',
				livereload: true
			},
			dev: {
				options: {
					port: 8000,
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
					sourceMap: true
				},
				files: [{
					expand: true,
					cwd: '<%= paths.src %>',
					src: '**/index.less',
					dest: '<%= paths.build %>',
					ext: '.css',
					rename: function(src, dest) {
						console.log(src);
						console.log(dest);
						console.log('\n');
						return dest;
					}
				}]
			}
		},
		copy: {
			options: {
				process: function(content, srcpath) {
					return grunt.template.process(content);
				}
			},
			html: {
				expand: true,
				cwd: '<%= paths.src %>/',
				src: '**/*.html',
				dest: '<%= paths.build %>/',
				filter: 'isFile',
			},
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
};