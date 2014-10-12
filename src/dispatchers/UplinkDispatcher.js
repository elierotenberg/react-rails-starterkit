var R = require('react-rails');

function UplinkDispatcher(flux, uplink) {
  return new (R.Dispatcher.createDispatcher({
    displayName: 'UplinkDispatcher',
    actions: {
      // <name>: function*(params)
    },
  }))();
}

module.exports = UplinkDispatcher;
