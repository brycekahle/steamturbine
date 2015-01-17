'use strict';
var http = require('browser-http')
  , _ = require('lodash')
  ;

module.exports = function(key) {

  function steamApi(ns, method, version, params) {
    var qs = Object.keys(params).map(function (k) {
      return k + '=' + params[k];
    }).join('&');

    return http.getJson(['http://api.steampowered.com/', ns, method, 'v000' + version, '?key=' + key].join('/') + '&' + qs);
  }

  return {
    ownedGames: function(id, opts) {
      return steamApi('IPlayerService', 'GetOwnedGames', '1', _.extend({ steamid: id }, opts));
    }
  }
};
