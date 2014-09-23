var config = require("./config");
var R = require("react-rails").install(config.install);
var express = require("express");
var cors = require("cors");
var App = require("./App");

express()
.use(cors())
.use("/static", express.static(__dirname + "/../dist/public"))
.use(new R.RenderServer(App).middleware)
.listen(config.renderServer.port);

console.log("Render Server listening on " config.renderServer.hostname + ":" + config.renderServer.port);
