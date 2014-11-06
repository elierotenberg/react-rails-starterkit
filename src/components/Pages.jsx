
var R = require("react-rails");
var React = R.React;
var _ = require("lodash");
var co = require("co");
var assert = require("assert");
var styles = require("../styles");

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
                        width: "100%",
                    },
                    ".Pages-header": {
                        height: 300,
                        backgroundColor: styles.swatch.TextGrey,
                        textAlign: "center",
                    },
                    ".Pages-header h1": {
                        color: styles.swatch.ReactBlue,
                        fontFamily: styles.fonts.Helvetica,
                        fontWeight: 400,
                        fontSize: 64,
                        paddingTop: 60,
                        width: styles.pageWidth,
                        margin: "0 auto",
                    },
                    ".Pages-header h2": {
                        color: styles.swatch.TitleGrey,
                        textTransform: "uppercase",
                        fontSize: 24,
                        lineHeight: "33px",
                        width: styles.pageWidth,
                        margin: "0 auto",
                    },
                    ".Pages-ReactLogo": {
                        width: 25,
                        height: 25,
                        display: "inline-block",
                        marginBottom: -4,
                    },
                    ".Pages-main": {
                        width: styles.pageWidth,
                        margin: "20px auto",
                    },
                    ".Pages-footer": {
                        width: styles.pageWidth,
                        margin: "0 auto",
                    },
                    ".Pages-links": {
                        listStyleType: "none",
                        padding: 0,
                        margin: 0,
                        display: "table",
                        width: "100%",
                        textAlign: "center",
                    },
                    ".Pages-links > li": {
                        display: "table-cell",
                        width: 100/3 + "%",
                    },
                    ".Pages-counters": {
                        position: "fixed",
                        bottom: 0,
                        right: 0,
                        padding: 20,
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
            <header className="Pages-header">
                <h1>React on Rails</h1>
                <h2>A <a href="http://reactjs.org"><img className="Pages-ReactLogo" src="/ReactLogo.svg" />React</a> Framework for building Real-World WebApps</h2>
            </header>
            <main className="Pages-main">
                {this.getCurrentPage()}
            </main>
            <footer className="Pages-footer">
                <ul className="Pages-links">
                    <li key="home"><HistoryLink pathname="/home">Home</HistoryLink></li>
                    <li key="about"><HistoryLink pathname="/about">About</HistoryLink></li>
                    <li key="nothing-relevant"><HistoryLink pathname="/nothing-relevant">Nothing relevant</HistoryLink></li>
                </ul>
            </footer>
            <aside className="Pages-counters">
                <TotalVisitorsCount />
                <CurrentVisitorsCount />
            </aside>
        </div>);
    },
});

module.exports = Pages;
