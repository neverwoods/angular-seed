'use strict';

module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sourceFolder: 'src',
        appFolder: 'app',

        watch: {
            options: {
                interrupt: true,
                livereload: true
            },

            js: {
                files: ['<%= sourceFolder %>/js/**/*.js', 'Gruntfile.js'],
                tasks: ['jshint', 'concat:js']
            },

            vendorJs: {
                files: ['<%= sourceFolder %>/vendor/**/*.js'],
                tasks: ['concat:vendorJs']
            },

            vendorCss: {
                files: ['<%= sourceFolder %>/vendor/**/*.css'],
                tasks: ['concat:vendorCss']
            },

            gruntfile: {
                files: ['Gruntfile.js'],
                tasks: ['concat']
            }
        },

        connect: {
            options: {
                port: 1337,
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '<%= appFolder %>'
                    ]
                }
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },

            all: ['Gruntfile.js', '<%= appFolder %>/js/app.js']
        },

        concat: {
            options: {
                separator: ''
            },

            vendorJs: {
                options: {
                    banner: '/* VendorJS */\n'
                },

                src: ['<%= sourceFolder %>/vendor/**/*.js', '!<%= sourceFolder %>/vendor/**/*.min.js', '!<%= sourceFolder %>/js/**/*.concat.js'],
                dest: '<%= appFolder %>/js/vendor.js'
            },
            vendorCss: {
                options: {
                    banner: '/* VendorCSS */\n'
                },

                src: [
                      '<%= sourceFolder %>/vendor/**/*.css',
                      '!<%= sourceFolder %>/vendor/**/*.min.css',
                      '!<%= sourceFolder %>/css/**/*.concat.css'
                ],
                dest: '<%= appFolder %>/css/vendor.css'
            },

            js: {
                options: {
                    banner: '/* AppJS */\n'
                },

                src: ['<%= sourceFolder %>/js/**/*.js', '!<%= sourceFolder %>/js/**/*.min.js', '!<%= sourceFolder %>/js/**/*.concat.js'],
                dest: '<%= appFolder %>/js/app.js'
            },
            css: {
                options: {
                    banner: '/* AppCSS */\n'
                },

                src: ['<%= sourceFolder %>/css/**/*.css', '!<%= sourceFolder %>/css/**/*.min.css', '!<%= sourceFolder %>/css/**/*.concat.css'],
                dest: '<%= appFolder %>/css/app.css'
            }
        },

        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= sourceFolder %>',
                    dest: '<%= appFolder %>',
                    src: [
                        'images/{,*/}*.*',
                        'partials/{,*/}*.html',
                        'index.html'
                    ]
                }]
            }
        }
    });

    //*** Load NPM modules
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');

    //*** Register default task
    grunt.registerTask('build', ['copy', 'concat']);
    grunt.registerTask('default', ['build', 'connect', 'watch']);
};