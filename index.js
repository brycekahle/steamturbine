'use strict';

var pkg = require('./package.json')
  , React = require('react')
  ;

var Main = require('./components/main')
  ;

React.render(<Main />, document.getElementById('content'));
