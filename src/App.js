/* global __dirname: false */

var R = require('react-rails');
var NavigationRouter = require('./routers/NavigationRouter');

var _ = require('lodash');
var config = require('../config');
var fs = require('fs');

var tpl = _.template(fs.readFileSync(__dirname + '/index.tpl', 'utf-8'));
var router = new NavigationRouter();

var App = R.App.createApp({
  fluxClass: require('./Flux'),
  rootClass: require('./components/Root'),

  bootstrapTemplateVarsInServer(req) {
    return (fn) => {
      _.defer(() => {
        fn(null, _.extend({
          lang: R.Localize.extractLocale(req.headers, config.supportedLocales),
        }, router.match(req.path)));
      });
    };
  },

  vars: {
    stylesheets: [
      // normalize.css
      '/normalize.css',
      // generated components CSS
      '/components.css',
      // Google WebFonts: Open Sans Condensed
      'http://fonts.googleapis.com/css?family=Open+Sans+Condensed:300',
      // Google WebFonts: Roboto
      'http://fonts.googleapis.com/css?family=Roboto',
    ],
    scripts: ['/client.js'],
  },

  template(vars, libs) {
    return tpl({ vars: vars, libs: libs });
  },

  templateLibs: {
    _: _,
  },

  plugins: {
    'Window': R.Window.createPlugin('memory', 'memory'),
    'History': R.History.createPlugin('memory', 'memory', 'memory'),
    'Localize': R.Localize.createPlugin('memory', 'memory', config.supportedLocales),
    'Fullscreen': R.Fullscreen.createPlugin('memory', 'memory'),
    'XWindow': R.XWindow.createPlugin('memory', 'memory'),
  },
});

R.Style.registerCSSProcessor(R.Style.Processors.autoprefix);
R.Debug.prod(() => {
  R.Style.registerCSSProcessor(R.Style.Processors.min);
});

module.exports = App;
