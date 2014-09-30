var gulp = require("gulp");
var gutil = require("gulp-util");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var cache = require("gulp-cached");
var rename = require("gulp-rename");
var browserify = require("browserify");
var envify = require("envify/custom");
var watchify = require("watchify");
var jshint = require("gulp-jshint");
var stylish = require("jshint-stylish");
var uglify = require("gulp-uglify");
var regenerator = require("gulp-regenerator");
var esnext = require("gulp-esnext");
var react = require("gulp-react");
var del = require("del");
var exec = require("child_process").exec;

var _ = require("lodash");
var merge = require("merge-stream");

var createComponent = require("./tasks/createComponent");
var createAllComponentsStylesheets = require("./tasks/createAllComponentsStylesheets");


var config = require("./config");

var dev = config.install.mode !== "production";
var prod = !dev;

var paths = {
    js: "src/**/*.js",
    jsx: "src/**/*.jsx",
    allSources: ["src/**/*"],
    compiledComponents: "src/components/**/*.js",
    templates: ["src/**/*.tpl"],
    topLevelFiles: ["src/client.js", "src/render-server.js", "src/uplink-server.js", "src/server.js"],
    internalFiles: ["src/**/*.js", "!src/client.js", "!src/render-server.js", "!src/uplink-server.js", "!src/server.js"],
    src: "src",
    dist: "dist",
    static: "static",
    client: "./dist/client.js",
    server: "dist/server.js",
    forever: "node_modules/forever/bin/forever",
    logs: "logs",
    bundle: "./static/client.js",
    statics: [
        "node_modules/normalize.css/normalize.css",
    ],
};

var isWatchifying = false;

var browserifyTask = function() {
    var b = browserify({
        cache: {},
        packageCache: {},
        fullPaths: isWatchifying || dev,
        entries: [paths.client],
        debug: true,
    });

    b.transform("brfs");
    b.transform(envify({
        NODE_ENV: prod ? "production" : "development",
    }));

    var count = 0;

    var bundle = function() {
        gutil.log("Browserifying... (" + ++count + ")");
        return b.bundle()
        .on("error", gutil.log.bind(gutil, "Browserify error."))
        .pipe(source("client.js"))
        .pipe(buffer())
        .pipe(prod ? uglify() : gutil.noop())
        .pipe(gulp.dest(paths.static))
        .on("end", gutil.log.bind(gutil, "Browserifying done. (" + --count + ")"));
    };

    if(isWatchifying) {
        b = watchify(b);
        b.on("update", bundle);
    }

    return bundle();
};

gulp.task("browserify", ["before-browserify"], function() {
    isWatchifying = false;
    return browserifyTask();
});

gulp.task("watchify", ["before-browserify"], function(done) {
    isWatchifying = true;
    return browserifyTask();
});

gulp.task("jshint", ["before-jshint"], function() {
    return gulp.src(paths.js)
    .pipe(cache("jshint"))
    .pipe(jshint({
        esnext: true,
        globals: {
            Promise: true,
        },
    }))
    .pipe(jshint.reporter(stylish));
});

gulp.task("source-transform", ["before-source-transform"], function() {
    return merge(
        gulp.src(paths.internalFiles)
        .pipe(cache("regenerator"))
        .pipe(regenerator({ includeRuntime: false })),
        gulp.src(paths.topLevelFiles)
        .pipe(cache("regenerator"))
        .pipe(regenerator({ includeRuntime: true }))
    )
    .pipe(cache("esnext"))
    .pipe(esnext({ generator: false }))
    .pipe(gulp.dest(paths.dist));
});

gulp.task("clean", function(done) {
    del([
        paths.dist,
        paths.compiledComponents,
        paths.bundle
    ]);
});

gulp.task("react-transform", function() {
    return gulp.src(paths.jsx)
    .pipe(react())
    .pipe(rename({
        extname: ".js",
    }))
    .pipe(gulp.dest(paths.src));
});

gulp.task("templates", ["jshint"], function() {
    return gulp.src(paths.templates)
    .pipe(cache("templates"))
    .pipe(gulp.dest(paths.dist));
});

gulp.task("statics", function() {
    return gulp.src(paths.statics)
    .pipe(cache("statics"))
    .pipe(gulp.dest("static"));
});

gulp.task("before-jshint", ["react-transform"]);
gulp.task("before-source-transform", ["jshint", "templates", "statics"]);
gulp.task("before-browserify", ["source-transform", "styles"]);

gulp.task("build", ["source-transform", "browserify"]);
gulp.task("styles", ["source-transform"], function() {
    createAllComponentsStylesheets();
});
gulp.task("component", function() {
    createComponent(gutil.env.displayName, gutil.env.tagName);
});

gulp.task("watch", ["watchify"], function() {
    gulp.watch(paths.allSources, ["source-transform"]);
});

gulp.task("default", ["build"]);
