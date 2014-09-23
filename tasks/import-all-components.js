var fs = require("fs");
var _ = require("lodash");

var components = ["module.exports = {"];
var ext = ".jsx";
var count = 0;
_.each(fs.readdirSync(__dirname + "/../src/components"), function(fileName) {
    if(!fileName.slice(-ext.length) === ext) {
        return;
    }
    var componentName = fileName.slice(0, -ext.length);
    console.log("Importing: " + componentName);
    ++count;
    components.push(componentName + ': require("./' + componentName + '");');
});

var src = components.join("\n    ") + "\n};\n";

fs.writeFileSync(__dirname + "/../src/componentsClasses.js", src);

console.log("Imported " + count + " components classes.");
