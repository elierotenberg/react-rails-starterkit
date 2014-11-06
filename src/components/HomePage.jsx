var R = require("react-rails");
var React = R.React;
var _ = require("lodash");
var co = require("co");
var assert = require("assert");
var styles = require("../styles");

var HomePage = React.createClass(/** @lends HomePage.prototype */{
    mixins: [R.Component.Mixin],
    propTypes: {
    },
    statics: {
        getStylesheetRules: function getStylesheetRules() {
            return {
                "components": {
                    ".HomePage": {
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
        return (<div className="HomePage">
            <h2>Home page</h2>
            More information in the github repos:
            <ul>
                <li key="react-rails"><a href="https://github.com/elierotenberg/react-rails">github.com/elierotenberg/react-rails</a></li>
                <li key="react-rails-starterkit"><a href="https://github.com/elierotenberg/react-rails-starterkit">github.com/elierotenberg/react-rails-starterkit</a></li>
            </ul>
        </div>);
    },
});

module.exports = HomePage;
