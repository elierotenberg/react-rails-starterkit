var fs = require("fs");
var _ = require("lodash");
var config = require("../config");
var R = require("react-rails");
var requireDir = require("require-dir");


module.exports = function createAllComponentsStylesheets() {
    var stylesheets = {};
    var components = requireDir("../dist/components");
    _.each(components, function(Component, componentName) {
        if(Component.getStylesheetRules) {
            _.each(Component.getStylesheetRules(), function(rules, stylesheetName) {
                if(!stylesheets[stylesheetName]) {
                    stylesheets[stylesheetName] = new R.Stylesheet();
                }
                try {
                    _.each(rules, function(style, selector) {
                        try {
                            stylesheets[stylesheetName].registerRule(selector, style);
                        }
                        catch(err) {
                            throw R.Debug.extendError(err, "Error while parsing '" + selector + "'");
                        }
                    });
                }
                catch(err) {
                    throw R.Debug.extendError(err, "Error while parsing '" + componentName + "'");
                }
            });
        }
    });
    _.each(stylesheets, function(stylesheet, stylesheetName) {
        var css = stylesheet.getProcessedCSS();
        fs.writeFileSync(__dirname + "/../static/" + stylesheetName + ".css", css);
    });
};
