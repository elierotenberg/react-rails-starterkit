var R = require("react-rails");

var UplinkStore = function UplinkStore(uplink) {
    return new R.Store.createUplinkStore(uplink.fetch, uplink.subscribeTo, uplink.unsubscribeFrom);
};
