'use strict';

var pkg = require('./package.json')
  , React = require('react')
  ;

React.render(React.createElement('h1', null, pkg.version), document.getElementById('content'));
