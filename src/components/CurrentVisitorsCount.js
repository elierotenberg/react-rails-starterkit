/** @jsx React.DOM */
var R = require("react-rails");
var React = R.React;
var _ = require("lodash");
var co = require("co");
var assert = require("assert");

var CurrentVisitorsCount = React.createClass(/** @lends CurrentVisitorsCount.prototype */{displayName: 'CurrentVisitorsCount',
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
        return (React.DOM.div({className: "CurrentVisitorsCount"}, 
            "CurrentVisitorsCount: ", this.state.currentVisitorsCount
        ));
    },
});

module.exports = CurrentVisitorsCount;
