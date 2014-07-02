module.exports = function (grunt) {

   // load time-grunt and all grunt plugins found in the package.json
   require('time-grunt')(grunt);
   require('load-grunt-tasks')(grunt);

   grunt.initConfig({
      //-----------------------------------------------------
      // Configure Paths
      //-----------------------------------------------------
      config: {
         app: 'client',
         dist: 'dist'
      },
      //-----------------------------------------------------
      // TAKANA - live Sass refreshing
      //
      // Sometimes Takana screws up with Foundation's 'functions.scss'.
      // To fix, remove '/_scss' below. Run grunt takana, then quit..
      // add '/scss' back onto it and re-run. Don't ask.
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
         jekyllBuild: {
            command: 'jekyll build --source <%= config.app %>  --destination <%= config.dist %>'
         }
      },
      //-----------------------------------------------------
      // BUILD CONTROL (GIT)
      //-----------------------------------------------------
      buildcontrol: {
        options: {
          dir: './',
          commit: true,
          connectCommits: true,
          push: true,
          message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
        },
        master: {
          options: {
            remote: 'git@github.com:liquidvisual/dannybeaton.com.au.git',
            branch: 'master',
            connectCommits: true
          }
        }
      },
      //-----------------------------------------------------
      // SASS - Compiles sass only, leaves .css alone
      //-----------------------------------------------------
      sass: {
         dist: {
            options: {
               style: 'compressed'
            },
            files: [{
               expand: true,
               cwd: '<%= config.app %>/_scss',
               src: '**/*.{scss,sass}',
               dest: '<%= config.dist %>/css',
               ext: '.css'
            }]
         }
      },
      //-----------------------------------------------------
      // A. CONNECT
      //-----------------------------------------------------
      connect: {
         options: {
            port: 9000,
            livereload: 35729,
            hostname: '0.0.0.0'
         },
         livereload: {
            options: {
               open: true,
               base: '<%= config.dist %>'
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

         sass: {
            files: ['<%= config.app %>/_scss/**/*.{scss,sass}'],
            tasks: ['sass'],
            options : {
               spawn: false,
               livereload: true
            }
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
                '<%= config.app %>/css/**/*.css',
                '<%= config.app %>/scripts/**/*.js',
                '<%= config.app %>/img/**/*.{gif,jpg,jpeg,png,svg,webp}'
                //'!<%= config.app %>/**/_s/**'
            ],
            tasks: ['shell:jekyllBuild', 'sass']
         }
      }
   //-- end initConfig
   });
   //-----------------------------------------------------
   // Register Tasks
   //-----------------------------------------------------
   grunt.registerTask('serve', [
      'shell:jekyllBuild',
      'sass',
      'connect:livereload',
      'watch'
   ]);

   // Build only
   grunt.registerTask('deploy', [
      'buildcontrol:master'
   ]);

   // Build only
   grunt.registerTask('default', [
      'shell:jekyllBuild',
      'sass'
   ]);

//-- end module.exports
};