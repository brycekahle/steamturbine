'use strict';

var React = require('react')
  , qs = require('querystring')
  ;

var SteamLogin = require('./steam-login')
  ;

var Main = React.createClass({
  getInitialState: function() {
    return {};
  }

, render: function() {
    if (!this.state.steamId) {
      return <SteamLogin />;
    }

    return <h1>{this.state.steamid}</h1>;
  }

, componentDidMount: function() {
    if (!location.search) return;
    
    var query = qs.parse(location.search.substr(1)) || {};
    var id = query['openid.claimed_id'];
    if (!id) return;

    var steamId = id.replace('http://steamcommunity.com/openid/id/', '');
    this.setState({
      steamId: steamId
    });
  }
});

module.exports = Main;
