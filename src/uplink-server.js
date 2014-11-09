var UplinkServer = require('./UplinkServer');

var co = require('co');
var config = require('../config');
var cors = require('cors');
var express = require('express');

co(function*() {
  return yield new UplinkServer().installHandlers(
    express()
      .use(cors()),
    config.uplinkServer.prefix
  );
}).call(null, function(err, server) {
  if (err) {
    throw err;
  }
  server.listen(config.uplinkServer.port);
  var path = 'http://' + config.uplinkServer.hostname + ':' + config.uplinkServer.port;
  console.log('Uplink Server listening on', path);
});
