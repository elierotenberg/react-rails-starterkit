var fs = require("fs");
var _ = require("lodash");
var visitors = _.reduce([
    "es6-arrow-function", 
    "es6-class",
    "es6-destructuring",
    "es6-object-concise-method",
    "es6-object-short-notation",
    "es6-rest-param",
    "es6-template",
    "es7-spread-property",
], function(acc, visitorName) {
    return acc.concat(require("jstransform/visitors/" + visitorName + "-visitors").visitorList);
}, []);
var jstransform = require("jstransform");
var regenerator = require("regenerator");
var Promise = require("bluebird");
Promise.longStackTraces();
var readFile = Promise.promisify(fs.readFile);
var writeFile = Promise.promisify(fs.writeFile);
var globule = require("globule");

var transformFile = function transformFile(filename, includeRegeneratorRuntime) {
    var failed = null;
    var source = null;
    return readFile(filename, "utf-8")
    .then(function(contents) {
        source = contents;
    })
    .catch(function(err) {
        failed = new Error("Error while reading '" + filename + "': ", err.toString());
    })
    .then(function() {
        if(!failed) {
            source = jstransform.transform(visitors, source).code;
        }
    })
    .catch(function(err) {
        failed = new Error("Error while applying jstransform to '" + filename + ": " + err.toString());
    })
    .then(function() {
        if(!failed) {
            source = regenerator.compile(source, {
                includeRuntime: includeRegeneratorRuntime,
            }).code;
        }
    })
    .catch(function(err) {
        failed = new Error("Error while applying regenerator to '" + filename + "': " + err.toString());
    })
    .then(function() {
        if(!failed) {
            return writeFile(filename, source);            
        }
    })
    .catch(function(err) {
        failed = new Error("Error while saving '" + filename + "':" + err.toString());
    })
    .then(function() {
        if(failed) {
            throw failed;
        }
        else {
            console.warn("[SourceTransform]", filename,  "(" + source.length + ")");
        }
    });
};

var nonTopLevelFiles = globule.find(["tmp/**/*.js", "!tmp/client.js", "!tmp/server.js", "!tmp/render-server.js", "!tmp/uplink-server.js"]);
var topLevelFiles = globule.find(["tmp/client.js", ["tmp/server.js"], ["tmp/render-server.js"], ["tmp/uplink-server.js"]]);

_.each(nonTopLevelFiles, function(filename) {
    transformFile(filename, false);
});

_.each(topLevelFiles, function(filename) {
    transformFile(filename, true);
});
