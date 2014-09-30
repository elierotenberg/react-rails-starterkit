var R = require("react-rails");

var _ = require("lodash");

var UplinkServer = R.SimpleUplinkServer.createServer({
    sessionTimeout: 10000,
    _locks: {
        totalVisitorsCount: new R.Lock(),
        currentVisitorsCount: new R.Lock(),
    },
    bootstrap: function *bootstrap() {
        yield [
            this._locks.totalVisitorsCount.perform(R.scope(function*() {
                yield this.setStore("/totalVisitorsCount", 0);
            }, this)),
            this._locks.currentVisitorsCount.perform(R.scope(function*() {
                yield this.setStore("/currentVisitorsCount", 0);
            }, this)),
        ];
    },
    sessionCreated: function *sessionCreated(guid) {
        yield [
            this._locks.totalVisitorsCount.perform(R.scope(function*() {
                var totalVisitorsCount = yield this.getStore("/totalVisitorsCount");
                yield this.setStore("/totalVisitorsCount", totalVisitorsCount + 1);
            }, this)),
            this._locks.currentVisitorsCount.perform(R.scope(function*() {
                var currentVisitorsCount = yield this.getStore("/currentVisitorsCount");
                yield this.setStore("/currentVisitorsCount", currentVisitorsCount + 1);
            }, this)),
        ];
    },
    sessionDestroyed: function *sessionDestroyed(guid) {
        yield this._locks.currentVisitorsCount.perform(R.scope(function*() {
            var currentVisitorsCount = yield this.getStore("/currentVisitorsCount");
            yield this.setStore("/currentVisitorsCount", currentVisitorsCount - 1);
        }, this));
    },
    store: [
        "/totalVisitorsCount",
        "/currentVisitorsCount",
    ],
    events: [
        // <whitelisted room>
    ],
    actions: {
        // <path>: function*(params)
    },
});

module.exports = UplinkServer;
