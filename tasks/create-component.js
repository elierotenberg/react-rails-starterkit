var assert = require("assert");
var fs = require("fs");
var _ = require("lodash");
assert(process.argv.length > 2, "Not enought arguments.");

var componentName = process.argv[2];
var tpl = _.template(fs.readFileSync(__dirname + "/create-component.tpl"));
fs.writeFileSync(__dirname + "/../src/components/" + componentName + ".jsx", tpl({ displayName: componentName }));
