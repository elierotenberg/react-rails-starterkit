/** @jsx React.DOM */

var AboutPage = require('./AboutPage');
var CurrentVisitorsCount = require('./CurrentVisitorsCount');
var HistoryLink = require('./HistoryLink');
var HomePage = require('./HomePage');
var NavigationRouter = require('../routers/NavigationRouter');
var NotFoundPage = require('./NotFoundPage');
var R = require('react-rails');
var React = R.React;
var TotalVisitorsCount = require('./TotalVisitorsCount');

var styles = require('../styles');

var navigationRouter = new NavigationRouter();

var Pages = React.createClass({
  mixins: [R.Component.Mixin],

  statics: {
    getStylesheetRules() {
      return {
        'components': {
          '.Pages': {
            width: '100%',
          },
          '.Pages-header': {
            backgroundColor: styles.swatch.TextGrey,
            height: 300,
            textAlign: 'center',
          },
          '.Pages-header h1': {
            color: styles.swatch.ReactBlue,
            fontFamily: styles.fonts.Helvetica,
            fontSize: 64,
            fontWeight: 400,
            margin: '0 auto',
            paddingTop: 60,
            width: styles.pageWidth,
          },
          '.Pages-header h2': {
            color: styles.swatch.TitleGrey,
            fontSize: 24,
            lineHeight: '33px',
            margin: '0 auto',
            textTransform: 'uppercase',
            width: styles.pageWidth,
          },
          '.Pages-ReactLogo': {
            display: 'inline-block',
            height: 25,
            marginBottom: -4,
            width: 25,
          },
          '.Pages-main': {
            margin: '20px auto',
            width: styles.pageWidth,
          },
          '.Pages-footer': {
            margin: '0 auto',
            width: styles.pageWidth,
          },
          '.Pages-links': {
            display: 'table',
            listStyleType: 'none',
            margin: 0,
            padding: 0,
            textAlign: 'center',
            width: '100%',
          },
          '.Pages-links > li': {
            display: 'table-cell',
            width: 100 / 3 + '%',
          },
          '.Pages-counters': {
            bottom: 0,
            padding: 20,
            position: 'fixed',
            right: 0,
          },
        },
      };
    },
  },
  getFluxStoreSubscriptions(props) {
    return {
      'memory://History/pathname': 'pathname',
    };
  },

  fluxStoreDidUpdate() {
    var route = navigationRouter.match(this.state.pathname);
    document.querySelector('title').innerHTML = route.title;
    document.querySelector('meta[name="description"]')
      .setAttribute('description', route.description);
  },

  getCurrentPage() {
    var matchedRoute = navigationRouter.match(this.state.pathname);
    switch (matchedRoute.name) {
      case 'home': return <HomePage />;
      case 'about': return <AboutPage />;
      default: return <NotFoundPage splat={matchedRoute.props.splat} />;
    }
  },

  render() {
    return (
      <div className="Pages">
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
      </div>
    );
  },
});

module.exports = Pages;
