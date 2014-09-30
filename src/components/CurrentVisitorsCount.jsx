/** @jsx React.DOM */
var R = require("react-rails");
var React = require("react");
var _ = require("lodash");
var co = require("co");
var assert = require("assert");

var CurrentVisitorsCount = React.createClass(/** @lends CurrentVisitorsCount.prototype */{
    mixins: [R.Component.Mixin],
    propTypes: {
    },
    statics: {
        getStylesheetRules: function getStylesheetRules() {
            return {
                "components": {
                    ".CurrentVisitorsCount": {
                    },
                },
            };
        },
    },
    getFluxStoreSubscriptions: function getFluxStoreSubscriptions(props) {
        return {
            "uplink://currentVisitorsCount": "currentVisitorsCount",
        };
    },
    render: function render() {
        return (<div className="CurrentVisitorsCount">
            CurrentVisitorsCount: {this.state.currentVisitorsCount}
        </div>);
    },
});

module.exports = CurrentVisitorsCount;
