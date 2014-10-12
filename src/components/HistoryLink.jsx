var R = require('react-rails');

var HistoryLink = R.History.createLinkClass({
  dispatcherName: 'memory',
});

module.exports = HistoryLink;
