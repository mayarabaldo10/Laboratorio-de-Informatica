module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            test: [
                "tests/api/controllers/TestController.js",
                "tests/assets/js/modules/test/index.js",
                "tests/views/test/index.ejs",
            ],

            plugin: [
                "tests/node_modules/sails-generate-ng-curd/*.js",
                "tests/node_modules/sails-generate-ng-curd/templates/*.js"
            ]

        },

        copy: {
            test: {
                files: [
                    // includes files within path and its sub-directories
                    {
                        expand: true,
                        src: ['**'],
                        cwd: 'src',
                        dest: 'tests/node_modules/sails-generate-ng-curd'
                    },
                ],
            },
        },

        shell: {
            test: {
                command: 'cd tests && sails generate ng-curd test att_id att1 att2'
            }
        },

        file_compare: {
            //check_suite1: ['expected/foo.js', 'suite1/actual/foo.js']
        }
    })



    grunt.loadNpmTasks('grunt-contrib-copy')
    grunt.loadNpmTasks('grunt-shell')
    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-file-compare')

    // Default task(s).
    grunt.registerTask('default', ['clean:plugin', 'clean:test', 
                                    'copy:test', 'shell:test']);

};
