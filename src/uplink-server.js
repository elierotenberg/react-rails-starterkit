require("regenerator/runtime");
var config = require("../config");
var R = require("react-rails");
var express = require("express");
var cors = require("cors");
var UplinkServer = require("./UplinkServer");
var co = require("co");

co(function*() {
    return yield new UplinkServer().installHandlers(express().use(cors()), config.uplinkServer.prefix);
}).call(null, function(err, server) {
    if(err) {
        throw err;
    }
    else {
        server.listen(config.uplinkServer.port);
        console.log("Uplink Server listening on http://" + config.uplinkServer.hostname + ":" + config.uplinkServer.port);
    }
});
