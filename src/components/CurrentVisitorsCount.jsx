var R = require('react-rails');
var React = R.React;

var CurrentVisitorsCount = React.createClass({
  mixins: [R.Component.Mixin],

  statics: {
    getStylesheetRules() {
      return {
        'components': {
          '.CurrentVisitorsCount': {
          },
        },
      };
    },
  },

  getFluxStoreSubscriptions(props) {
    return {
      'uplink://counters': 'counters',
    };
  },

  render() {
    return (
      <div className='CurrentVisitorsCount'>
        CurrentVisitorsCount: {this.state.counters ? this.state.counters.current : null}
      </div>
    );
  },
});

module.exports = CurrentVisitorsCount;
