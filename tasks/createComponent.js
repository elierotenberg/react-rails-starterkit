var assert = require("assert");
var fs = require("fs");
var _ = require("lodash");

module.exports = function createComponent(displayName, tagName) {
    tagName = tagName || "div";
    assert(displayName && _.isString(displayName), "displayName should be a String.");
    assert(/^[A-Z][a-zA-Z0-9]*$/.exec(displayName) !== null, "displayName should match /^[A-Z][a-zA-Z0-9]*$/.");
    var tpl = _.template(fs.readFileSync(__dirname + "/createComponent.tpl"));
    fs.writeFileSync(__dirname + "/../src/components/" + displayName + ".jsx", tpl({ displayName: displayName, tagName: tagName }));
};
