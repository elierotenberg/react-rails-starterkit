var R = require("react-rails");

var UplinkEventEmitter = function UplinkEventEmitter(uplink) {
    return new R.EventEmitter.createUplinkEventEmitter(uplink.listenTo, uplink.unlistemFrom);
};

module.exports = UplinkEventEmitter;
