'use strict';

var React = require('react')
  , qs = require('querystring')
  , Nanobar = require('nanobar')
  , _ = require('lodash')
  ;

var SteamLogin = require('./steam-login')
  , config = require('../config.json')
  , api = require('../lib/steam-web-api')(config.steam.key)
  ;

var Main = React.createClass({
  getInitialState: function() {
    return {};
  }

, renderContent: function() {
    if (!this.state.steamId) {
      return <SteamLogin />;
    }

    if (!this.state.games) return null;

    return this.state.games.map(function (g) {
      return (
        <img key={g.appid} className='game-logo' src={'http://media.steampowered.com/steamcommunity/public/images/apps/' + g.appid + '/' + g.img_logo_url +'.jpg'} />
      );
    });
  }

, render: function() {
    var content = this.renderContent();
    return (
      <div>
        <h1>Steam Turbine</h1>
        <div className='clearfix'>
          {content}
        </div>
        <p>Version {this.props.version} - <a href='http://steampowered.com'>Powered by Steam</a></p>
      </div>
    );
  }

, componentDidMount: function() {
    if (document.cookie) {
      var cookies = qs.parse(document.cookie, '; ');
      if (cookies.steamId) {
        this.setState({ steamId: cookies.steamId });
        return;
      }
    }

    if (!location.search) return;
    
    var query = qs.parse(location.search.substr(1)) || {};
    var id = query['openid.claimed_id'];
    if (query['openid.mode'] !== 'id_res' || !id) return;

    var steamId = id.replace('http://steamcommunity.com/openid/id/', '');
    this.setState({
      steamId: steamId
    });
    document.cookie = 'steamId=' + steamId;

    var nb = new Nanobar({
      bg: '#6E8758'
    , id: 'nb'
    });

    api.ownedGames({ include_appinfo: '1' }).then(function (resp) {
      nb.go(100);
      var games = _.sortBy(resp.data, function (g) { return -g.playtime_forever; });
      this.setState({
        games: games
      });
    }, function (e) {
      console.error(e);
    });
  }
});

module.exports = Main;
