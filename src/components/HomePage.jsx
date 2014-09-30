/** @jsx React.DOM */
var R = require("react-rails");
var React = require("react");
var _ = require("lodash");
var co = require("co");
var assert = require("assert");

var HomePage = React.createClass(/** @lends HomePage.prototype */{
    mixins: [R.Component.Mixin],
    propTypes: {
    },
    statics: {
        getStylesheetRules: function getStylesheetRules() {
            return {
                "components": {
                    ".HomePage": {
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
        return (<div className="HomePage">
            <h2>Home page</h2>
        </div>);
    },
});

module.exports = HomePage;
