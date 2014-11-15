module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Test settings
    karma: {
      options: {
        preprocessors: {
          'src/**/*.js': 'coverage'
        },
        reporters: ['coverage', 'progress'],
        coverageReporter: { 
          reporters: [
            {type: 'html', dir:'coverage/', file : 'index.html'},
            {type: 'text-summary'}
          ]
        }
      },
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    }
  });

  grunt.registerTask('default', [
    'karma'
  ]);
};