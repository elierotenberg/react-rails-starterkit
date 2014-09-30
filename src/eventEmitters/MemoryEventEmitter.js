var R = require("react-rails");

var MemoryEventEmitter = R.EventEmitter.createMemoryEventEmitter();

module.exports = MemoryEventEmitter;
