var R = require('react-rails');
var React = R.React;

var AboutPage = React.createClass({
  mixins: [R.Component.Mixin],

  statics: {
    getStylesheetRules() {
      return {
        'components': {
          '.AboutPage': {
          },
        },
      };
    },
  },

  render() {
    return (
      <div className='AboutPage'>
        <h2>About page</h2>
      </div>
    );
  },
});

module.exports = AboutPage;
