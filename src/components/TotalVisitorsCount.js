/** @jsx React.DOM */
var R = require("react-rails");
var React = R.React;
var _ = require("lodash");
var co = require("co");
var assert = require("assert");

var TotalVisitorsCount = React.createClass(/** @lends TotalVisitorsCount.prototype */{displayName: 'TotalVisitorsCount',
    mixins: [R.Component.Mixin],
    propTypes: {
    },
    statics: {
        getStylesheetRules: function getStylesheetRules() {
            return {
                "components": {
                    ".TotalVisitorsCount": {
                    },
                },
            };
        },
    },
    getFluxStoreSubscriptions: function getFluxStoreSubscriptions(props) {
        return {
            "uplink://totalVisitorsCount": "totalVisitorsCount",
        };
    },
    render: function render() {
        return (React.DOM.div({className: "TotalVisitorsCount"}, 
            "TotalVisitorsCount: ", this.state.totalVisitorsCount
        ));
    },
});

module.exports = TotalVisitorsCount;
