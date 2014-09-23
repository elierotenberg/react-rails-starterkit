var config = require("./config");
var R = require("react-rails").install(config.install);
var express = require("express");
var cors = require("cors");
var App = require("./App");
var UplinkServer = require("./UplinkServer");

new UplinkServer()
.installHandlers(express().use(cors()), config.uplinkServer.prefix)
.listen(config.uplinkServer.port);

console.log("Uplink Server listening on " + config.uplinkServer.hostname + ":" + config.uplinkServer.port);
