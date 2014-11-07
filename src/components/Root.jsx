var Pages = require('./Pages');
var R = require('react-rails');
var React = R.React;

var styles = require('../styles');

var Root = React.createClass({
  mixins: [R.Root.Mixin],

  statics: {
    getStylesheetRules() {
      return {
        'components': {
          '.Root': {
            width: '100%',
          },
          'html, body': {
            color: styles.swatch.TextGrey,
            fontFamily: styles.fonts.Helvetica,
          },
          'a, a:hover, a:visited, a:active': {
            textDecoration: 'none',
          },
          'a': {
            color: styles.swatch.LinkGrey,
          },
          'a:hover': {
            color: styles.swatch.LinkHoverGrey,
          },
          'a:active': {
            color: '#fff',
          },
        },
      };
    },
  },

  render() {
    return (
      <div className="Root">
        {this.props.children ? this.props.children : <Pages />}
      </div>
    );
  },
});

module.exports = Root;
