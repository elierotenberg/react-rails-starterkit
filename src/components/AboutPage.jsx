/** @jsx React.DOM */
var R = require("react-rails");
var React = R.React;
var _ = require("lodash");
var co = require("co");
var assert = require("assert");

var AboutPage = React.createClass(/** @lends AboutPage.prototype */{
    mixins: [R.Component.Mixin],
    propTypes: {
    },
    statics: {
        getStylesheetRules: function getStylesheetRules() {
            return {
                "components": {
                    ".AboutPage": {
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
        return (<div className="AboutPage">
            <h2>About page</h2>
        </div>);
    },
});

module.exports = AboutPage;
