var R = require("react-rails");

var UplinkDispatcher = function UplinkDispatcher(flux, uplink) {
    var dispatcher = new R.Dispatcher.createDispatcher({
        displayName: "UplinkDispatcher",
        actions: {
            // <name>: function*(params)
        },
    });
    return dispatcher;
};

module.exports = UplinkDispatcher;
