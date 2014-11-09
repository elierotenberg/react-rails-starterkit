var R = require('react-rails');
var React = R.React;

var HomePage = React.createClass({
  mixins: [R.Component.Mixin],

  render() {
    return (
      <div className='HomePage'>
        <h2>Home page</h2>
        More information in the github repos:
        <ul>
          <li key='react-rails'>
            <a href='https://github.com/elierotenberg/react-rails'>
              github.com/elierotenberg/react-rails
            </a>
          </li>
          <li key='react-rails-starterkit'>
            <a href='https://github.com/elierotenberg/react-rails-starterkit'>
              github.com/elierotenberg/react-rails-starterkit
            </a>
          </li>
        </ul>
      </div>
    );
  },
});

module.exports = HomePage;
