var R = require("react-rails");
var _ = require("lodash");

var NavigationRouter = function NavigationRouter() {
    R.Router.call(this);
    _.each({
        "/": {
            title: "Home",
            description: "Home page",
            name: "home",
        },
        "/home": {
            title: "Home",
            description: "Home page",
            name: "home",
        },
        "/about": {
            title: "About",
            description: "About page",
            name: "about",
        },
    }, R.scope(function(val, route) {
        this.route(route, _.constant(_.extend(val, { props: {} })));
    }, this));
    this.route("/*splat", function(splat) {
        return {
            title: "Not found",
            description: "Not found",
            name: "notfound",
            props: {
                splat: splat,
            },
        };
    });
    this.def(_.constant({
        title: "Not found",
        description: "Not found",
        name: "notfound",
    }));
};

_.extend(NavigationRouter.prototype, R.Router.prototype);

module.exports = NavigationRouter;
