var config = require("./config");
var R = require("react-rails").install(config.install);

var App = require("./App");

var client = new R.Client(App);
client.mount(function(err) {
    if(err) {
        throw err;
    }
});
