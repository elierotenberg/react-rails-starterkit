/** @jsx React.DOM */
var R = require("react-rails");
var React = require("react");
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

var Pages = React.createClass(/** @lends Pages.prototype */{
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
            case "home": return <HomePage />;
            case "about": return <AboutPage />;
            default: return <NotFoundPage  splat={matchedRoute.props.splat} />;
        }
    },
    render: function render() {
        return (<div className="Pages">
            <h1>React on Rails Starterkit</h1>
            <TotalVisitorsCount />
            <CurrentVisitorsCount />
            {this.getCurrentPage()}
            <HistoryLink pathname="/home">Home</HistoryLink>
            <HistoryLink pathname="/about">About</HistoryLink>
            <HistoryLink pathname="/nothing-relevant">Nothing relevant</HistoryLink>
        </div>);
    },
});

module.exports = Pages;
