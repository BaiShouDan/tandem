var fs = require('fs');
var path = require('path');

var packageDir = __dirname + '/../../src';
module.exports = fs.readdirSync(packageDir).map(function(basename) {
  return !/\./.test(basename) ? path.join(packageDir, basename, 'package.json') : void 0;
}).filter(function(filePath) {
  return !!filePath;
});