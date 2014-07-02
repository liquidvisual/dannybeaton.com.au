module.exports = function (grunt) {

   // load time-grunt and all grunt plugins found in the package.json
   require('time-grunt')(grunt);
   require('load-grunt-tasks')(grunt);

   grunt.initConfig({
      //-----------------------------------------------------
      // Configure Paths
      //-----------------------------------------------------
      config: {
         app: '.',
         dist: 'dist'
      },
      //-----------------------------------------------------
      // TAKANA - live Sass refreshing
      //-----------------------------------------------------
      takana: {
         options: {
            path: '<%= config.app %>'
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
               cwd: 'scss',
               src: '**/*.{scss,sass}',
               dest: 'css',
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
                '<%= config.app %>/js/**/*.js'
                // '<%= config.app %>/img/**/*.{gif,jpg,jpeg,png,svg,webp}'
                //'!<%= config.app %>/**/_s/**'
            ]
            //, tasks: ['shell:jekyllBuild', 'sass']
         }
      }
   //-- end initConfig
   });
   //-----------------------------------------------------
   // Register Tasks
   //-----------------------------------------------------
   grunt.registerTask('serve', [
      'sass',
      'connect:livereload',
      'watch'
   ]);

   // Build only
   grunt.registerTask('default', [
      'sass'
   ]);

//-- end module.exports
};