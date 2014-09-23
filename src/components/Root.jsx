/** @jsx React.DOM */
var R = require("react-rails");
var React = require("react");
var _ = require("lodash");

var Root = React.createClass(/** @lends Root.prototype */{
    mixins: [R.Root.Mixin],
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

module.exports = Root;
