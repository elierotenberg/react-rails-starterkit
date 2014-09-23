var R = require("react-rails");
var config = require("./config");
var Uplink = require("./Uplink");

var Flux = R.Flux.createFlux({
    bootstrap: function bootstrap(uplink) {
        this.registerStore("memory", new MemoryStore());
        this.registerStore("uplink", new UplinkStore());
        this.registerStylesheet("main", new R.Stylesheet());
    },
    bootstrapInClient: function* bootstrapInClient(window, headers, guid) {
        var uplink = new Uplink(guid);
        yield uplink.ready;
        this.bootstrap(uplink);
        this.registerEventEmitter("memory", new MemoryEventEmitter());
        this.registerEventEmitter("uplink", new UplinkEventEmitter(uplink));
        this.registerDispatcher("memory", new MemoryDispatcher(this));
        this.registerDispatcher("uplink", new UplinkDispatcher(this, uplink));
    },
    bootstrapInServer: function* bootstrapInServer(req, headers, guid) {
        var uplink = new Uplink(guid);
        yield uplink.ready;
        this.bootstrap(uplink);
    },
});

module.exports = Flux;
