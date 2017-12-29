var fs = require('fs');

// 이것은 시작시 한 번만 호출되기 때문에 Sync function을 사용해도 괜찮습니다.
module.exports = function (basePath) {
  // 보관 폴더가 없으면 만듭니다.
  if (!fs.existsSync(basePath)) {
    // fs.mkdirSync를 사용하여 폴더를 만듭니다.
    fs.mkdirSync(basePath);
  }

  // 파일이 없으면 만듭니다.
  if (!fs.existsSync(basePath + '/sites.txt')) {
    // fs.openSync를 사용하여 파일을 만듭니다.
    var file = fs.openSync(basePath + '/sites.txt', 'w');
    fs.closeSync(file);
  }

  // 폴더가 없으면 만듭니다.
  if (!fs.existsSync(basePath + '/sites')) {
    // fs.mkdirSync를 사용하여 폴더를 만듭니다.
    fs.mkdirSync(basePath + '/sites');
  }
};
