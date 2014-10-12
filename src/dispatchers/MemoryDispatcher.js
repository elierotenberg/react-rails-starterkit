var R = require('react-rails');

function MemoryDispatcher(flux) {
  return new (R.Dispatcher.createDispatcher({
    displayName: 'MemoryDispatcher',
    actions: {
      // <name>: function*(params)
    },
  }))();
}

module.exports = MemoryDispatcher;
