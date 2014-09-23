/** @jsx React.DOM */
var R = require("react-rails");
var React = require("react");
var _ = require("lodash");

var <%= displayName %> = React.createClass(/** @lends <%= displayName %>.prototype */{
    mixins: [R.Component.Mixin],
    propTypes: {
    },
    statics: {
        getStylesheetRules: function getStylesheetRules() {
            return {
            };
        },
    },
    getFluxStoreSubscriptions: function getFluxStoreSubscriptions(props) {
        return {
        };
    },
    render: function render() {
    },
});

module.exports = <%= displayName %>;
