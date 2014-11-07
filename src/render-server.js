/*global __dirname: false*/

require('regenerator/runtime');

var App = require('./App');
var R = require('react-rails');

var config = require('../config');
var cors = require('cors');
var express = require('express');

express()
  .use(cors())
  .use(express.static(__dirname + '/../static'))
  .use(new R.RenderServer(App).middleware)
  .listen(config.renderServer.port);

var path = 'http://' + config.renderServer.hostname + ':' + config.renderServer.port;
console.warn('Render Server listening on', path);
