var R = require('react-rails');
var React = R.React;

var TotalVisitorsCount = React.createClass({
  mixins: [R.Component.Mixin],

  getFluxStoreSubscriptions(props) {
    return {
      'uplink://counters': 'counters',
    };
  },

  render() {
    return (
      <div className='TotalVisitorsCount'>
        TotalVisitorsCount: {this.state.counters ? this.state.counters.total : null}
      </div>
    );
  },
});

module.exports = TotalVisitorsCount;
