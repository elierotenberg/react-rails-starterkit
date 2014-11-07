var R = require('react-rails');

var config = require('../config');

function Uplink(guid) {
  var url = 'http://' + config.uplinkServer.hostname + ':' + config.uplinkServer.port + config.uplinkServer.prefix;

  if(R.isClient()) {
    return new R.Uplink(url, url, guid, true);
  }

  if(R.isServer()) {
    return new R.Uplink(url, null, guid, false);
  }
}

module.exports = Uplink;
