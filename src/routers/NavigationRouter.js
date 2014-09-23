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
        "/about": {
            title: "About",
            description: "About page",
            name: "about",
        },
    }, R.scope(function(val, route) {
        this.route(route, _.constant(val));
    }, this));
};

_.extend(NavigationRouter.prototype, R.Router.prototype);
