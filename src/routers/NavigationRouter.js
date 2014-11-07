var R = require('react-rails');
var _ = require('lodash');

class NavigationRouter extends R.Router {
  constructor() {
    super();

    _.each({
      '/': {
        title: 'Home',
        description: 'Home page',
        name: 'home',
      },
      '/home': {
        title: 'Home',
        description: 'Home page',
        name: 'home',
      },
      '/about': {
        title: 'About',
        description: 'About page',
        name: 'about',
      },
    }, (val, route) => {
      this.route(route, () => _.extend(val, { props: {} }));
    });

    this.route('/*splat', (splat) => ({
      title: 'Not found',
      description: 'Not found',
      name: 'notfound',
      props: {
        splat: splat,
      },
    }));

    this.def(() => ({
      title: 'Not found',
      description: 'Not found',
      name: 'notfound',
    }));
  }
}

module.exports = NavigationRouter;
