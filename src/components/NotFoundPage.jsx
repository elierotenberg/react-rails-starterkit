/** @jsx React.DOM */
var R = require("react-rails");
var React = R.React;
var _ = require("lodash");
var co = require("co");
var assert = require("assert");

var NotFoundPage = React.createClass(/** @lends NotFoundPage.prototype */{
    mixins: [R.Component.Mixin],
    propTypes: {
        splat: React.PropTypes.string.isRequired,
    },
    statics: {
        getStylesheetRules: function getStylesheetRules() {
            return {
                "components": {
                    ".NotFoundPage": {
                    },
                },
            };
        },
    },
    getFluxStoreSubscriptions: function getFluxStoreSubscriptions(props) {
        return {
        };
    },
    render: function render() {
        return (<div className="NotFoundPage">
            <h2>Not found page</h2>
            <div>Requested splat: {this.props.splat}</div>
        </div>);
    },
});

module.exports = NotFoundPage;
