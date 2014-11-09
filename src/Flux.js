var MemoryDispatcher = require('./dispatchers/MemoryDispatcher');
var MemoryEventEmitter = require('./eventEmitters/MemoryEventEmitter');
var MemoryStore = require('./stores/MemoryStore');
var R = require('react-rails');
var Uplink = require('./Uplink');
var UplinkDispatcher = require('./dispatchers/UplinkDispatcher');
var UplinkEventEmitter = require('./eventEmitters/UplinkEventEmitter');
var UplinkStore = require('./stores/UplinkStore');

var Flux = R.Flux.createFlux({
  bootstrap: function* bootstrap(uplink) {
    this.registerStore('memory', new MemoryStore());
    this.registerStore('uplink', new UplinkStore(uplink));
    yield Promise.resolve(void 0);
  },

  bootstrapInClient: function* bootstrapInClient(window, headers, guid) {
    var uplink = new Uplink(guid);
    yield uplink.ready;
    yield this.bootstrap(uplink);
    this.registerEventEmitter('memory', new MemoryEventEmitter());
    this.registerEventEmitter('uplink', new UplinkEventEmitter(uplink));
    this.registerDispatcher('memory', new MemoryDispatcher(this));
    this.registerDispatcher('uplink', new UplinkDispatcher(this, uplink));
  },

  bootstrapInServer: function* bootstrapInServer(req, headers, guid) {
    var uplink = new Uplink(guid);
    yield uplink.ready;
    yield this.bootstrap(uplink);
  },
});

module.exports = Flux;
