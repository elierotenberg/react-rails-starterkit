var R = require("react-rails");

var MemoryStore = function MemoryStore() {
    return new R.Store.createMemoryStore();
};

module.exports = MemoryStore;
