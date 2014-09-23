var R = require("react-rails");

var MemoryEventEmitter = function MemoryEventEmitter() {
    return new R.EventEmitter.createMemoryEventEmitter();
};

module.exports = MemoryEventEmitter;
