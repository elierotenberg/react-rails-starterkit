var R = require("react-rails");

var _ = require("lodash");

var UplinkServer = function UplinkServer() {
    return R.SimpleUplinkServer.createServer({
        bootstrap: function *bootstrap() {
            yield [
                // yield this.setStore(...)
            ];
        },
        sessionCreated: function *sessionCreated(guid) {
            yield [
                // do something with session
            ];
        },
        sessionDestroyed: function *sessionDestroyed(guid) {
            yield: [
            ];
        },
        store: [
            // <whitelisted key>
        ],
        events: [
            // <whitelisted room>
        ],
        actions: {
            // <path>: function*(params)
        },
    });
};

module.exports = UplinkServer;
