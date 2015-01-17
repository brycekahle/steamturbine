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

, renderContent: function() {
    if (!this.state.steamId) {
      return <SteamLogin />;
    }

    return <h2>{this.state.steamId}</h2>;
  }

, render: function() {
    var content = this.renderContent();
    return (
      <div>
        <h1>Steam Turbine</h1>
        {content}
        <p>Version {this.props.version}</p>
      </div>
    );
  }

, componentDidMount: function() {
    if (document.cookie) {
      var cookies = qs.parse(document.cookie, ';');
      if (cookies.steamId) {
        this.setState({ steamId: cookies.steamId });
        return;
      }
    }

    if (!location.search) return;
    
    var query = qs.parse(location.search.substr(1)) || {};
    var id = query['openid.claimed_id'];
    if (!id) return;

    var steamId = id.replace('http://steamcommunity.com/openid/id/', '');
    this.setState({
      steamId: steamId
    });
    document.cookie = 'steamId=' + steamId;
  }
});

module.exports = Main;
