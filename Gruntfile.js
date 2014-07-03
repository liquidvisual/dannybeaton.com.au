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
         app: 'client',
         dist: 'dist',
         port: '9000',
         takanaOn: true, // see notes in 'Watch'
         git: 'git@github.com:liquidvisual/dannybeaton.com.au.git'
      },
      //-----------------------------------------------------
      // TAKANA - live Sass refreshing
      //
      // Sometimes Takana screws up with Foundation's 'functions.scss'.
      // To fix, remove '/_scss' below. Run grunt takana, then quit..
      // add '/_scss' back onto it and re-run. Don't ask.
      //-----------------------------------------------------
      takana: {
         options: {
            path: '<%= config.app %>/_scss'
         }
      },
      //-----------------------------------------------------
      // JEKYLL
      //-----------------------------------------------------
      shell: {
        jekyllServe: {
            command: "jekyll build --source <%= config.app %>  --destination .tmp"
         },
         jekyllBuild: {
            command: "jekyll build --source <%= config.app %>  --destination <%= config.dist %> --config <%= config.app %>/_config.build.yml"
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
        pages: {
          options: {
            dir: '<%= config.dist %>',
            remote: '<%= config.git %>',
            branch: 'gh-pages'
          }
        },
        local: {
          options: {
            remote: '../',
            branch: 'build'
          }
        }
      },
      //-----------------------------------------------------
      // SASS - Compiles sass only, leaves .css alone
      //-----------------------------------------------------
      //-----------------------------------------------------
      // SASS - Compiles sass only, leaves .css alone
      //-----------------------------------------------------
      sass: {
        temp: {
            files: {
                '.tmp/css/main.css' : '<%= config.app %>/_scss/main.scss',
                '.tmp/css/liquidvisual.css' : '<%= config.app %>/_scss/liquidvisual/liquidvisual.scss',
                '.tmp/css/foundation.css' : '<%= config.app %>/_scss/foundation/foundation.scss'
            }
        },
        dist: {
          options: {
            outputStyle: 'compressed'
          },
          files: {
              '<%= config.dist %>/css/main.css' : '<%= config.app %>/_scss/main.scss',
              '<%= config.dist %>/css/liquidvisual.css' : '<%= config.app %>/_scss/liquidvisual/liquidvisual.scss',
              '<%= config.dist %>/css/foundation.css' : '<%= config.app %>/_scss/foundation/foundation.scss'
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
               base: ['.tmp', '<%= config.app %>']
            }
         },
         dist: {
            options: {
               open: true,
               base: '<%= config.dist %>',
               livereload: false
            }
         }
      },
      //-----------------------------------------------------
      // B. WATCH
      //-----------------------------------------------------
      watch: {

        options: {
          livereload: true,
          spawn: true
        },

         sass: {
            files: ['<%= config.app %>/_scss/**/*.{scss,sass}'],
            tasks: ['sass:temp'],
            options : {
               livereload: '<%= config.takanaOn %>' // SWITCH true to live inject but BREAK Takana
            }
         },

         css: {
            files: ['.tmp/css/**/*.css'],
            tasks: [],
            reload: true
         },

         // If any of these files change:
         // 1. Run Jekyll Build
         // 2. Compile Sass and drop into _site

         livereload: {
            options: {
               livereload: '<%= connect.options.livereload %>'
            },
            // files: ['<%= config.app %>/index.html'],
            files: [
                '<%= config.app %>/**/*.html',
                '<%= config.app %>/**/*.yml',
                '<%= config.app %>/**/*.md',
                '<%= config.app %>/scripts/**/*.js',
                '<%= config.app %>/img/**/*.{gif,jpg,jpeg,png,svg,webp}'
                //'!<%= config.app %>/**/_s/**'
            ],
            tasks: ['shell:jekyllServe', 'sass:temp']
         }
      }
   //-- end initConfig
   });
   //-----------------------------------------------------
   // Register Tasks
   //-----------------------------------------------------
   grunt.registerTask('serve', [
      'shell:jekyllServe',
      'sass:temp',
      'connect:livereload',
      'watch'
   ]);

   // Build only
   grunt.registerTask('deploy', [
      'shell:jekyllBuild',
      'sass:dist',
      'buildcontrol:master',
      'buildcontrol:pages'
   ]);

   // Build only
   grunt.registerTask('default', [
      'shell:jekyllBuild',
      'sass:dist'
   ]);

//-- end module.exports
};