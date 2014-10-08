require("regenerator/runtime");
var _ = require("lodash");
var spawn = require("child_process").spawn;
var watch = require("node-watch");

var childs = [];

_.each(["render-server", "uplink-server"], function(name) {
    var spawnWorker = function spawnWorker() {
        var child = spawn("node", [__dirname + "/" + name + ".js"]);
        child.stdout.setEncoding("utf-8");
        child.stdout.on("data", function(data) {
            console.log(name, ":", data.slice(0, -1));
        });
        child.stderr.setEncoding("utf-8");
        child.stderr.on("data", function(data) {
            console.warn(name, ":", data.slice(0, -1));
        });
        child.on("close", function(code) {
            console.error(name, ":", "exited with code", code);
            _.defer(spawnWorker);
        });

        childs.push(child);
    };
    spawnWorker();
});

watch(__dirname, _.debounce(function restart() {
    console.warn("Restarting children processes.");
    _.each(childs, function(child) {
        child.kill();
    });
}, 1000));
