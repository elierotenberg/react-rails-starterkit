var _ = require("lodash");
var assert = require("assert");

module.exports = function(grunt) {
    grunt.initConfig({
        jshint: {
            options: {
                esnext: true,
                globals: {
                    Promise: true,
                },
            },
            files: ["*.js", "src/**/*.js"],
        },
        regenerator: {
            default: {
                files: [{
                    expand: true,
                    cwd: "src",
                    src: ["**/*.js"],
                    dest: "tmp/",
                }],
                options: {
                    includeRuntime: false,
                },
            },
            client: {
                files: {
                    "tmp/client.js": "src/client.js",
                },
                options: {
                    includeRuntime: true,
                },
            },
            "render-server": {
                files: {
                    "tmp/render-server.js": "src/render-server.js",
                },
                options: {
                    includeRuntime: true,
                },
            },
            "uplink-server": {
                files: {
                    "tmp/uplink-server.js": "src/uplink-server.js",
                },
                options: {
                    includeRuntime: true,
                },
            },
        },
        react: {
            default: {
                files: [{
                    expand: true,
                    cwd: "src/components",
                    src: ["**/*.jsx"],
                    dest: "src/components",
                    ext: ".js",
                }],
            },
        },
        browserify: {
            default: {
                options: {
                    browserifyOptions: {
                        debug: true,
                        deps: true,
                    },
                },
                files: {
                    "dist/public/client.js": "tmp/client.js",
                },
            },
        },
        uglify: {
            default: {
                options: {
                    mangle: true,
                    compress: true,
                    sourceMap: false,
                },
                files: {
                    "dist/public/client.min.js": "dist/public/client.js",
                },
            },
        },
        clean: {
            "jsx-output": ["src/components/**/*.js"],
            dist: ["dist"],
            tmp: ["tmp"],
        },
        copy: {
            tmpToDistServer: {
                files: [{
                    expand: true,
                    cwd: "tmp",
                    src: ["**", "!client.js", "**/*.jsx"],
                    dest: "dist/",
                }],
            },
            normalizeToPublic: {
                files: {
                    "dist/public/normalize.css": "node_modules/normalize.css/normalize.css",
                },
            },
        },
        exec: {
            "component": {
                cmd: function(displayName) {
                    console.warn("displayName:", displayName);
                    return 'node tasks/create-component.js "' + displayName + '"';
                },
            },
            "import-all-components": {
                cmd: "node tasks/import-all-components.js",
            },
        },
    });
    _.each([
        "grunt-contrib-jshint",
        "grunt-react",
        "grunt-contrib-copy",
        "grunt-contrib-clean",
        "grunt-exec",
        "grunt-browserify",
        "grunt-contrib-uglify",
        "grunt-regenerator",
    ], function(pack) {
        grunt.loadNpmTasks(pack);
    });

    grunt.registerTask("import-all-components", "Import all components into /src/componentsClasses.js.", function() {
        require("./tasks/importAllComponents")(grunt);
    });

    grunt.registerTask("component", "Creates a new component into /src/components.", function() {
        var opt = require("node-getopt").create([
            ["h", "help", "display this help"],
            ["L", "displayName=ARG", "displayName and base fileName for the component."],
        ])
        .bindHelp()
        .parseSystem();
        assert(opt.options.displayName, "displayName is required.");
        require("./tasks/createComponent")(grunt, opt.options.displayName);
    });

    grunt.registerTask("begin", ["clean", "import-all-components", "react", "jshint", "regenerator"]);
    grunt.registerTask("end", ["clean:tmp"]);
    grunt.registerTask("make-client", ["browserify", "copy:normalizeToPublic"]);
    grunt.registerTask("make-server", ["copy:tmpToDistServer"]);
    grunt.registerTask("min-client", ["uglify"]);
    grunt.registerTask("default", ["begin", "make-client", "make-server", "end"]);
    grunt.registerTask("client", ["begin", "make-client", "end"]);
    grunt.registerTask("server", ["begin", "make-server", "end"]);
};
