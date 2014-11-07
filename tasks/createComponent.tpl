var R = require('react-rails');
var React = R.React;
var _ = require('lodash');
var co = require('co');
var styles = require('../styles');

var <%= displayName %> = React.createClass(/** @lends <%= displayName %>.prototype */{
    mixins: [R.Component.Mixin],

    propTypes: {
    },

    statics: {
        getStylesheetRules() {
            return {
                'components': {
                    '.<%= displayName %>': {
                    },
                },
            };
        },
    },

    getFluxStoreSubscriptions(props) {
        return {
        };
    },

    render() {
        return (<<%= tagName %> className='<%= displayName %>'>
        </<%= tagName %>>);
    },
});

module.exports = <%= displayName %>;
