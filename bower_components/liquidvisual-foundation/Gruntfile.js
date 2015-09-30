module.exports = function (grunt) {

	// load time-grunt and all grunt plugins found in the package.json
   require('time-grunt')(grunt);
   require('jit-grunt')(grunt, {
   		buildcontrol: 'grunt-build-control' // plugin can't be resolved in automatic mapping
   });

	grunt.initConfig({
		//-----------------------------------------------------
		// Configure Paths
		//-----------------------------------------------------
		config: {
			app: '.',
			port: '6969',
			takanaOn: true, // see notes in 'Watch'
			git: 'git@github.com:liquidvisual/liquidvisual-foundation.git'
		},
		//-----------------------------------------------------
		// TAKANA - live Sass refreshing
		//-----------------------------------------------------
		takana: {
			options: {
				path: '<%= config.app %>/scss'
			}
		},
		//-----------------------------------------------------
		// BUILD CONTROL (GIT)
		//-----------------------------------------------------
		buildcontrol: {
			options: {
				commit: true,
				connectCommits: false,
				push: true,
				message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
			},
			master: {
				options: {
					dir: './',
					remote: '<%= config.git %>',
					branch: 'master'
				}
			},
			local: {
				options: {
					remote: '<%= config.app %>',
					branch: 'build'
				}
			}
		},
		//-----------------------------------------------------
		// SASS
		//-----------------------------------------------------
		sass: {
			dist: {
				options: {
					outputStyle: 'compressed'
				},
				files: {
					'<%= config.app %>/css/foundation.css' : '<%= config.app %>/scss/foundation/foundation.scss',
					'<%= config.app %>/css/liquidvisual.css' : '<%= config.app %>/scss/liquidvisual.scss',
					'<%= config.app %>/css/styleguide.css' : '<%= config.app %>/scss/liquidvisual/styleguide/styleguide.scss'
				}
			}
		},
		//-----------------------------------------------------
		// A. CONNECT
		//-----------------------------------------------------
		connect: {
			options: {
				port: '<%= config.port %>',
				livereload: 35729,
				hostname: '0.0.0.0'
			},
			livereload: {
				options: {
					open: true,
					base: '<%= config.app %>/'
				}
			},
			dist: {
				options: {
					open: true,
					base: '<%= config.app %>/',
					livereload: false
				}
			}
		},
		//-----------------------------------------------------
		// B. WATCH
		//-----------------------------------------------------
		watch: {

			sass: {
				files: ['<%= config.app %>/scss/**/*.{scss,sass}'],
				tasks: ['sass:dist'],
				options : {
					livereload: '<%= config.takanaOn %>' // SWITCH true to live inject but BREAK Takana
				}
			},

			css: {
				files: ['<%= config.app %>/css/**/*.css'],
				tasks: [],
				reload: true
			},

			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
			},

			files: [
				'<%= config.app %>/**/*.html',
				'<%= config.app %>/js/**/*.js'
				// '<%= config.app %>/img/**/*.{gif,jpg,jpeg,png,svg,webp}'
				//'!<%= config.app %>/**/_s/**'
				]
			}
		}
	//-- end initConfig
	});
	//-----------------------------------------------------
	// Register Tasks
	//-----------------------------------------------------

	// Serve
	grunt.registerTask('serve', [
		'sass:dist',
		'connect:livereload',
		'watch'
	]);

	// Deploy
	grunt.registerTask('deploy', [
		'sass:dist',
		'buildcontrol:master'
	]);

	// Build only
	grunt.registerTask('default', [
		'sass:dist'
	]);

//-- end module.exports
};