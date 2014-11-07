var R = require('react-rails');
var React = R.React;

var NotFoundPage = React.createClass({
  mixins: [R.Component.Mixin],

  propTypes: {
    splat: React.PropTypes.string.isRequired,
  },

  render() {
    return (
      <div className="NotFoundPage">
        <h2>Not found page</h2>
        <div>Requested splat: {this.props.splat}</div>
      </div>
    );
  },
});

module.exports = NotFoundPage;
