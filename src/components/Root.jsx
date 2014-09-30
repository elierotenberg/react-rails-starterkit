/** @jsx React.DOM */
var R = require("react-rails");
var React = require("react");
var _ = require("lodash");
var co = require("co");
var assert = require("assert");

var Pages = require("./Pages");

var Root = React.createClass(/** @lends Root.prototype */{
    mixins: [R.Root.Mixin],
    propTypes: {
    },
    statics: {
        getStylesheetRules: function getStylesheetRules() {
            return {
                "components": {
                    ".Root": {
                        width: 980,
                        marginLeft: "auto",
                        marginRight: "auto",
                    },
                },
            };
        },
    },
    render: function render() {
        return (<div className="Root">
            {this.props.children ? this.children : <Pages />}
        </div>);
    },
});

module.exports = Root;
