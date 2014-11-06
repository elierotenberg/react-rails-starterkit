var R = require("react-rails");
var React = R.React;
var _ = require("lodash");
var co = require("co");
var assert = require("assert");
var styles = require("../styles");

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
            "uplink://counters": "counters",
        };
    },
    render: function render() {
        return (<div className="CurrentVisitorsCount">
            CurrentVisitorsCount: {this.state.counters ? this.state.counters.current : null}
        </div>);
    },
});

module.exports = CurrentVisitorsCount;
