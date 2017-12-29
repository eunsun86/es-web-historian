var path = require('path');
var archive = require('../helpers/archive-helpers');
// 여기에 더 많은 module/foler가 필요합니다!

exports.handleRequest = function (req, res) {
  res.end(archive.paths.list);
};
