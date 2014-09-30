/** @jsx React.DOM */
var R = require("react-rails");
var React = require("react");
var _ = require("lodash");
var co = require("co");
var assert = require("assert");

var NotFoundPage = React.createClass(/** @lends NotFoundPage.prototype */{displayName: 'NotFoundPage',
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
        return (React.DOM.div({className: "NotFoundPage"}, 
            React.DOM.h2(null, "Not found page"), 
            React.DOM.div(null, "Requested splat: ", this.props.splat)
        ));
    },
});

module.exports = NotFoundPage;
