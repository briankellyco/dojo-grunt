/*global module, require */
/*jshint camelcase: false */

module.exports = function (grunt) {
    'use strict';

    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    var yoConfig = {
            src: 'src',
            app: 'src/app',
            components: 'bower_components'
        },
        LIVERELOAD_PORT = 35729,
        lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT}),
        mountFolder = function (connect, dir) {
            return connect['static'](require('path').resolve(dir));
        };

    grunt.initConfig({
        config: yoConfig,
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= config.app %>/modules/{,*/}*.js',
                '!<%= config.app %>/common/{,*/}*.js'
            ]
        },
        htmlhint: {
            options: {
                'id-unique': true,
                'tag-pair': true,
                'spec-char-escape': true,
                'attr-value-not-empty': true,
                'attr-value-double-quotes': true,
                'attr-lowercase': true,
                'style-disabled': true
            },

            html: {
                src: [
                    '<%= config.app %>*.html',
                    '<%= config.app %>/modules/{,*/}*.html',
                    '!<%= config.app %>/common/{,*/}*.html'
                ]
            }
        },
        less: {
            dev: {
                files: {
                    // option #1 - compile less to single css file
                    '<%= config.app %>/styles.min.css': [
                        '<%= config.app %>/modules/{,*/}*.less',
                        '<%= config.app %>/common/{,*/}*.less',
                    ]

                    // option #2 - compile less to multiple css files
                    //files: [
                    //    {"modules/quick-start-example/styles.css" : "modules/quick-start-example/styles.less"},
                    //    {"modules/dummy-top-line-metrics/styles.css" : "modules/dummy-top-line-metrics/styles.less"}
                    //]
                },
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                }
            }
        },
        watch: {
            less: {
                files: [
                    '<%= config.app %>/modules/{,*/}*.less',
                    '<%= config.app %>/common/{,*/}*.less'
                ],
                tasks: ['less:dev']
            },
            js: {
                files: [
                    '<%= jshint.all %>'
                ],
                tasks: ['jshint']
            },
            html: {
                files: [
                    '<%= htmlhint.html.src %>'
                ],
                options: {
                    livereload: true
                },
                tasks: ['htmlhint']
            },
            livereload: {
                // Here we watch the files the less task will compile to
                // These files are sent to the live reload server after less compiles them
                // https://github.com/gruntjs/grunt-contrib-watch#live-reloading
                options: {
                    livereload: true
                },
                files: [
                    '<%= config.app %>/{,*/}*.html',
                    '<%= config.app %>/{,*/}*.css'
                ]
            }
        },

        connect: {
                options: {
                    port: 9000,
                    base: '<%= config.src %>',
                    hostname: 'localhost'
                },
                livereload: {
                    options: {
                        middleware: function (connect) {
                            return [
                                lrSnippet,
                                mountFolder(connect, '.')
                            ];
                        }
                    }
                }
        },

        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>/src/app/index.html'
            },
            dist: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        }
    });

    grunt.registerTask('default', [
        'jshint',
        'htmlhint',
        'less:dev',
        'connect:livereload',
        'open:server',
        'watch'
    ]);

};