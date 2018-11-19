module.exports = (grunt) => {
  grunt.initConfig({
    concat: {
      options: {
        sourceMap: true
      },
      js: {
        src: ['src/**/*.js'],
        dest: 'dist/script.js'
      }
    },
    babel: {
      dist: {
        options: {
          sourceMap: true,
          inputSourceMap: true,
          presets: ['@babel/preset-env']
        },
        files: {
          'dist/script.js': 'dist/script.js'
        }
      }
    },
    watch: {
      scripts: {
        files: 'src/**/*.js',
        tasks: ['concat', 'babel'],
        options: {
          debounceDelay: 250,
          atBegin: true
        }
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-babel')

  grunt.registerTask('default', ['concat', 'babel'])
}
