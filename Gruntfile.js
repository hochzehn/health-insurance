module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            public: {
                // have to use public/* instead of just public because this dir is mounted into docker container.
                // removing the whole dir leaves docker container in a messed up state.
                src: ["dist/*"]
            }
        },

        uglify: {
            options: {
                banner: '/* <%= pkg.name %> v<%= pkg.version %> <%= pkg.repository %> */\n'
            },
            pretty: {
                options: {
                    beautify: true,
                    mangle: false,
                    compress: false
                },
                files: {
                    'dist/health-insurance.js': ['src/**/*.js']
                }
            },
            minified: {
                options: {
                    compress: {
                        drop_console: true
                    }
                },
                files: {
                    'dist/health-insurance.min.js': ['dist/health-insurance.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('dist', ['clean', 'uglify']);
};
