/** @jsx React.DOM */
var R = require("react-rails");
var React = R.React;
var _ = require("lodash");
var co = require("co");
var assert = require("assert");

var Pages = require("./Pages");

var Root = React.createClass(/** @lends Root.prototype */{displayName: 'Root',
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
        return (React.DOM.div({className: "Root"}, 
            this.props.children ? this.children : Pages(null)
        ));
    },
});

module.exports = Root;
