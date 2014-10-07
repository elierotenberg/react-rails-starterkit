var R = require("react-rails");
var config = require("../config");
var fs = require("fs");
var _ = require("lodash");
var NavigationRouter = require("./routers/NavigationRouter");
var tpl = _.template(fs.readFileSync(__dirname + "/index.tpl", "utf-8"));

var router = new NavigationRouter();

var App = R.App.createApp({
    fluxClass: require("./Flux"),
    rootClass: require("./components/Root"),
    bootstrapTemplateVarsInServer: function bootstrapTemplateVarsInServer(req) {
        return function(fn) {
            _.defer(function() {
                fn(null, _.extend({
                    lang: R.Localize.extractLocale(req.headers, config.supportedLocales),
                }, router.match(req.path)));
            });
        };
    },
    vars: {
        stylesheets: [
            "/normalize.css",                                                   // normalize.css
            "/components.css",                                                  // generated components CSS
            "http://fonts.googleapis.com/css?family=Open+Sans+Condensed:300",   // Google WebFonts: Open Sans Condensed
            "http://fonts.googleapis.com/css?family=Roboto",                    // Google WebFonts: Roboto
        ],
        scripts: ["/client.js"],
    },
    template: function template(vars, libs) {
        return tpl({ vars: vars, libs: libs });
    },
    templateLibs: {
        _: _,
    },
    plugins: {
        "Window": R.Window.createPlugin("memory", "memory"),
        "History": R.History.createPlugin("memory", "memory", "memory"),
        "Localize": R.Localize.createPlugin("memory", "memory", config.supportedLocales),
        "Fullscreen": R.Fullscreen.createPlugin("memory", "memory"),
        "XWindow": R.XWindow.createPlugin("memory", "memory"),
    },
});

R.Style.registerCSSProcessor(R.Style.Processors.autoprefix);
R.Debug.prod(function() {
    R.Style.registerCSSProcessor(R.Style.Processors.min);
});

module.exports = App;
