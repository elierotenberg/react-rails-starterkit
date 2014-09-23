var R = require("react-rails");
var config = require("./config");
var fs = require("fs");
var _ = require("lodash");
var NavigationRouter = require("./routers/NavigationRouter");

var router = new NavigationRouter();

var App = R.createApp({
    fluxClass: require("./Flux"),
    rootClass: require("./components/Root"),
    componentsClasses: require("./componentsClasses"),
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
        stylesheets: ["/static/normalize.css"],
        scripts: ["/static/client.js"],
    },
    template: _.template(fs.readFileSync(__dirname + "/index.tpl")),
    templateLibs: {
        _: _,
    },
    plugins: _.map(["Window", "History", "Localize", "Fullscreen", "XWindow"], function(plugin) {
        return R[plugin].Plugin("memory", "memory");
    }),
});

module.exports = App;
