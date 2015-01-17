'use strict';

var React = require('react')
  ;

var SteamLogin = React.createClass({
  render: function() {
    return (
      <form method="get" action="https://steamcommunity.com/openid/login">
        <input type="hidden" name="openid.ns" value="http://specs.openid.net/auth/2.0" />
        <input type="hidden" name="openid.mode" value="checkid_setup" />
        <input type="hidden" name="openid.return_to" value="http://steamturbine.brycekahle.com/" />
        <input type="hidden" name="openid.realm" value="http://steamturbine.brycekahle.com/" />
        <input type="hidden" name="openid.identity" value="http://specs.openid.net/auth/2.0/identifier_select" />
        <input type="hidden" name="openid.claimed_id" value="http://specs.openid.net/auth/2.0/identifier_select" />

        <input type="image" alt="Login to Steam" src="http://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_large_noborder.png" />
      </form>
    );
  }
});

module.exports = SteamLogin;
