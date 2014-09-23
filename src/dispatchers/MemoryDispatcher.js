var R = require("react-rails");

var MemoryDispatcher = function MemoryDispatcher(flux) {
    var dispatcher = new R.Dispatcher.createDispatcher({
        displayName: "MemoryDispatcher",
        actions: {
            // <name>: function*(params)
        },
    });
    return dispatcher;
};

module.exports = MemoryDispatcher;
