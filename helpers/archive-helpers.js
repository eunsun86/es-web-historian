var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/* 이 sprint에서는 동일한 경로를 여러 번 다시 사용하게 됩니다.
  아래의 `paths` Object를 사용하여 자주 사용되는 파일 경로를 저장하는 것을 고려하십시오.
  이렇게하면 파일을 옮길시 한 곳에서 코드를 변경하면됩니다! 
  아래 경로는 여러분이 원하는대로 고치셔도 됩니다. */
exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// 이곳은 건들지 마세요. stubbing을 사용한 test입니다.
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// 다음 function name은 code를 module화 하는 방법을 제안하기 위해 제공되었습니다. 깨끗하게 쓰세요!
exports.readListOfUrls = function() {
};

exports.isUrlInList = function() {
};

exports.addUrlToList = function() {
};

exports.isUrlArchived = function() {
};

exports.downloadUrls = function() {
};
