/** @jsx React.DOM */
var R = require("react-rails");
var React = R.React;
var _ = require("lodash");
var co = require("co");
var assert = require("assert");
var styles = require("../styles");

var Pages = require("./Pages");

var Root = React.createClass(/** @lends Root.prototype */{
    mixins: [R.Root.Mixin],
    statics: {
        getStylesheetRules: function getStylesheetRules() {
            return {
                "components": {
                    ".Root": {
                        width: "100%",
                    },
                    "html, body": {
                        fontFamily: styles.fonts.Helvetica,
                        color: styles.swatch.TextGrey,
                    },
                    "a, a:hover, a:visited, a:active": {
                        textDecoration: "none",
                    },
                    "a": {
                        color: styles.swatch.LinkGrey,
                    },
                    "a:hover": {
                        color: styles.swatch.LinkHoverGrey,
                    },
                    "a:active": {
                        color: "#fff",
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
