var assert = require("assert");
var fs = require("fs");
var _ = require("lodash");

module.exports = function createComponent(grunt, displayName) {
    var tpl = _.template(fs.readFileSync(__dirname + "/createComponent.tpl"));
    fs.writeFileSync(__dirname + "/../src/components/" + displayName + ".jsx", tpl({ displayName: displayName }));
    grunt.log.writeln("Created component: " + displayName);
};
