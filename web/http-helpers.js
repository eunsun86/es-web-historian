var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback) {
  // static 파일을 제공하는 데 도움이되는 코드를 여기에 작성하십시오!
  // (static 파일은 html,(너의 것 또는 다른 사람들의 아카이브 ...) css, 등등 자주 안바뀌는 파일들입니다.
};

// 진행하면서, 여기에 넣을 수있는 helper function에 대해 계속 생각해보십시오!
