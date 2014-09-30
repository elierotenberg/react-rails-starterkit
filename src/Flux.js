var R = require("react-rails");
var Promise = require("bluebird");
var config = require("../config");
var Uplink = require("./Uplink");
var MemoryStore = require("./stores/MemoryStore");
var UplinkStore = require("./stores/UplinkStore");
var MemoryEventEmitter = require("./eventEmitters/MemoryEventEmitter");
var UplinkEventEmitter = require("./eventEmitters/UplinkEventEmitter");
var MemoryDispatcher = require("./dispatchers/MemoryDispatcher");
var UplinkDispatcher = require("./dispatchers/UplinkDispatcher");

var Flux = R.Flux.createFlux({
    bootstrap: function* bootstrap(uplink) {
        this.registerStore("memory", new MemoryStore());
        this.registerStore("uplink", new UplinkStore(uplink));
        this.registerStylesheet("components", new R.Stylesheet());
        yield Promise.resolve(void 0);
    },
    bootstrapInClient: function* bootstrapInClient(window, headers, guid) {
        var uplink = new Uplink(guid);
        yield uplink.ready;
        yield this.bootstrap(uplink);
        this.registerEventEmitter("memory", new MemoryEventEmitter());
        this.registerEventEmitter("uplink", new UplinkEventEmitter(uplink));
        this.registerDispatcher("memory", new MemoryDispatcher(this));
        this.registerDispatcher("uplink", new UplinkDispatcher(this, uplink));
    },
    bootstrapInServer: function* bootstrapInServer(req, headers, guid) {
        var uplink = new Uplink(guid);
        yield uplink.ready;
        yield this.bootstrap(uplink);
    },
});

module.exports = Flux;
