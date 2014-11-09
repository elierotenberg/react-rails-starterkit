require('6to5/polyfill');
var _ = require('lodash-next');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var del = require('del');
var envify = require('envify/custom');
var es6to5 = require('gulp-6to5');
var gulp = require('gulp');
var gutil = require('gulp-util');
var imagemin = require('gulp-imagemin');
var insert = require('gulp-insert');
var jshint = require('gulp-jshint');
var merge = require('merge-stream');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var Promise = require('bluebird');
var R = require('react-rails');
var react = require('gulp-react');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var stylish = require('jshint-stylish');
var uglify = require('gulp-uglify');

var createComponent = require('./tasks/createComponent');

var config = require('./config');

var dev = config.install.mode !== 'production';
var prod = !dev;
var style = require('gulp-react-rails-style')(R, dev ? [R.Style.Processors.autoprefixer] : [R.Style.Processors.autoprefixer, R.Style.Processors.min]);

var statics = [
    'node_modules/normalize.css/normalize.css',
];

var jshintOptions = {
    globals: {
        Promise: true,
    },
    esnext: true,
    sub: true,
};

var bustConfig = function bustConfig() {
    var module = require.resolve('./config');
    if(require.cache[module]) {
        delete require.cache[module];
        require('./config');
    };
    return Promise.resolve(void 0);
};

var browserifyClient = function browserifyClient() {
    var b = browserify({
        fullPaths: false,
        entries: ['./dist/client.js'],
        debug: dev,
        ignoreMissing: ['promise'],
    });

    var NODE_ENV = prod ? 'production': 'development';

    b.transform('brfs');
    b.transform(envify({
        NODE_ENV: NODE_ENV,
    }));

    return b.bundle()
    .pipe(plumber())
    .pipe(source('client.js'))
    .pipe(buffer())
    .pipe(prod ? uglify() : gutil.noop())
    .pipe(gulp.dest('./static'));
};

var lintJS = function lintJS() {
    return gulp.src('src/**/*.js')
    .pipe(plumber())
    .pipe(jshint(jshintOptions))
    .pipe(jshint.reporter(stylish));
};

var lintJSX = function lintJSX() {
    return gulp.src('src/**/*.jsx')
    .pipe(plumber())
    .pipe(react())
    .pipe(jshint(jshintOptions))
    .pipe(jshint.reporter(stylish));
};

var lint = function lint() {
    return merge(lintJS(), lintJSX());
};

var compileSources = function compileSources() {
    return gulp.src(['src/**/*.js', 'src/**/*.jsx'])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(react())
    .pipe(insert.prepend('require(\'6to5/polyfill\');\nconst Promise = require(\'bluebird\');\n'))
    .pipe(rename({
        extname: '.js',
    }))
    .pipe(es6to5({ }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
};

var copyTemplates = function copyTemplates() {
    return gulp.src('src/**/*.tpl')
    .pipe(plumber())
    .pipe(gulp.dest('dist'));
};

var copyStatics = function copyStatics() {
    return gulp.src(statics)
    .pipe(plumber())
    .pipe(gulp.dest('static'));
};

var compileStyles = function compileStyles() {
    return gulp.src('dist/components/*.js')
    .pipe(plumber())
    .pipe(style(__dirname + '/dist/styles'))
    .pipe(postcss([]))
    .pipe(gulp.dest('static'))
};

var promisify = function promisify(stream, name) {
    return new Promise(function(resolve, reject) {
        gutil.log('Starting ' + name + '...');
        stream
        .on('error', reject)
        .on('end', function() {
            gutil.log('Finished ' + name + '.');
        })
        .on('end', resolve);
    });
};

gulp.task('build', function(done) {
    promisify(lint(), 'lint')
    .then(function() {
        return bustConfig();
    })
    .then(function() {
        return Promise.all([
            promisify(compileSources(), 'compileSources'),
            promisify(copyTemplates(), 'copyTemplates'),
            promisify(copyStatics(), 'copyStatics'),
        ]);
    })
    .then(function() {
        return Promise.all([
            promisify(compileStyles(), 'compileStyles'),
            promisify(browserifyClient(), 'browserifyClient'),
        ]);
    })
    .then(function() {
        done(null);
    })
    .catch(function(err) {
        gutil.log('Build error', err);
        done(null);
    });
});

gulp.task('clean', function() {
    del(['dist']);
});

gulp.task('watch', function() {
    gulp.watch(['src/**/*', 'config.js'], ['build']);
    gulp.watch('images/**/*', ['imagemin']);
});

gulp.task('component', function() {
    createComponent(gutil.env.displayName, gutil.env.tagName);
});

gulp.task('imagemin', function() {
    gulp.src(['images/*.{png,jpg,gif,svg}'])
    .pipe(plumber())
    .pipe(imagemin())
    .pipe(gulp.dest('static'));
});

gulp.task('default', ['build', 'imagemin']);
