var http = require('http');
var handler = require('./request-handler');
var initialize = require('./initialize.js');

// 왜 여기에 이런것이 있는거죠?
// HINT: .gitignore에 있는 무언가 때문입니다.
initialize('./archives');

var port = 8080;
var ip = '127.0.0.1';
var server = http.createServer(handler.handleRequest);

if (module.parent) {
  module.exports = server;
} else {
  server.listen(port, ip);
  console.log('Listening on http://' + ip + ':' + port);
}

