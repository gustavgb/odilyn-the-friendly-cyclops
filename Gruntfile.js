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
    copy: {
      files: {
        expand: true,
        cwd: 'public',
        src: ['**/*'],
        dest: 'dist/'
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
      },
      public: {
        files: 'public/*',
        tasks: ['copy'],
        options: {
          debounceDelay: 250,
          atBegin: true
        }
      }
    },
    clean: ['dist/*'],
    wait: {
      options: {
        delay: 1000
      },
      pause: {}
    }
  })

  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-babel')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-wait')

  grunt.registerTask('build', ['clean', 'wait', 'concat', 'babel', 'copy'])
  grunt.registerTask('start', ['clean', 'wait', 'watch'])
}
