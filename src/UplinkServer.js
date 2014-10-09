var R = require("react-rails");

var _ = require("lodash");

var UplinkServer = R.SimpleUplinkServer.createServer({
    sessionTimeout: 10000,
    _locks: {
        counters: new R.Lock(),
    },
    bootstrap: function *bootstrap() {
        yield this._locks.counters.acquire();
        yield this.setStore("/counters", {
            total: 0,
            current: 0,
        });
        this._locks.counters.release();
    },
    sessionCreated: function *sessionCreated(guid) {
        yield this._locks.counters.acquire();
        var counter = yield this.getStore("/counters");
        yield this.setStore("/counters", {
            total: counter.total + 1,
            current: counter.current + 1,
        });
        this._locks.counters.release();
    },
    sessionDestroyed: function *sessionDestroyed(guid) {
        yield this._locks.counters.acquire();
        var counters = yield this.getStore("/counters");
        yield this.setStore("/counters", _.extend(counters, {
            current: counters.current - 1,
        }));
        this._locks.counters.release();
    },
    store: [
        "/counters",
    ],
    events: [
        // <whitelisted room>
    ],
    actions: {
        // <path>: function*(params)
    },
});

module.exports = UplinkServer;
