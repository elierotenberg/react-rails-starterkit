/** @jsx React.DOM */
var R = require("react-rails");
var React = R.React;
var _ = require("lodash");
var co = require("co");
var assert = require("assert");

var TotalVisitorsCount = require("./TotalVisitorsCount");
var CurrentVisitorsCount = require("./CurrentVisitorsCount");
var HistoryLink = require("./HistoryLink");
var HomePage = require("./HomePage");
var AboutPage = require("./AboutPage");
var NotFoundPage = require("./NotFoundPage");

var NavigationRouter = require("../routers/NavigationRouter");

var navigationRouter = new NavigationRouter();

var Pages = React.createClass(/** @lends Pages.prototype */{displayName: 'Pages',
    mixins: [R.Component.Mixin],
    propTypes: {
    },
    statics: {
        getStylesheetRules: function getStylesheetRules() {
            return {
                "components": {
                    ".Pages": {
                    },
                },
            };
        },
    },
    getFluxStoreSubscriptions: function getFluxStoreSubscriptions(props) {
        return {
            "memory://History/pathname": "pathname",
        };
    },
    fluxStoreDidUpdate: function fluxStoreDidUpdate() {
        var route = navigationRouter.match(this.state.pathname);
        document.querySelector("title").innerHTML = route.title;
        document.querySelector("meta[name='description']").setAttribute("description", route.description);
    },
    getCurrentPage: function getCurrentPage() {
        var matchedRoute = navigationRouter.match(this.state.pathname);
        switch(matchedRoute.name) {
            case "home": return HomePage(null);
            case "about": return AboutPage(null);
            default: return NotFoundPage({splat: matchedRoute.props.splat});
        }
    },
    render: function render() {
        return (React.DOM.div({className: "Pages"}, 
            React.DOM.h1(null, "React on Rails Starterkit"), 
            TotalVisitorsCount(null), 
            CurrentVisitorsCount(null), 
            this.getCurrentPage(), 
            HistoryLink({pathname: "/home"}, "Home"), 
            HistoryLink({pathname: "/about"}, "About"), 
            HistoryLink({pathname: "/nothing-relevant"}, "Nothing relevant")
        ));
    },
});

module.exports = Pages;
