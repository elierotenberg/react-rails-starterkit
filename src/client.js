var R = require('react-rails');
var co = require('co');

var App = require('./App');

var client = new R.Client(App);
co(client.mount).call(client);
