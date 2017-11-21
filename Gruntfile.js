// Gruntfile.js
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: ['js/configuration.js', 'js/main.js', 'js/building.js', 'js/permits.js', 'js/schools.js']
    },
    concat: {
		options: {
		  separator: ';',
		},
		dist: {
		  src: ['js/configuration.js', 'js/main.js', 'js/permits.js', 'js/buildings.js', 'js/schools.js'], //, 'js/clusterfeaturelayer.js', 'js/Chart.js'
		  dest: 'js/app.js',
		}
    },
    uglify: {
    	my_target: {
    		files: {
    			'js/app.min.js': ['js/app.js']
    		}
    	}
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'css/style.min.css': 'css/page.css'
        }
      }
    }
  });

  // Load the plugin   
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
};