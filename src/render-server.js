var config = require("../config");
require("regenerator/runtime");
var R = require("react-rails");
var express = require("express");
var cors = require("cors");
var App = require("./App");

express()
.use(cors())
.use(express.static(__dirname + "/../static"))
.use(new R.RenderServer(App).middleware)
.listen(config.renderServer.port);

console.warn("Render Server listening on http://" + config.renderServer.hostname + ":" + config.renderServer.port);
