// {
//   test: /\.html$/,
//   use: ['html-loader', 'html-minify-loader'] // 处理顺序 html-minify-loader => html-loader => webpack
// }
var Minimize = require('minimize');
var loaderUtils = require('loader-utils');

module.exports = function(source) {
  console.log(source)
    var callback = this.async();
    if (this.cacheable) {
        this.cacheable();
    }
    var opts = loaderUtils.getOptions(this) || {};
    var minimize = new Minimize(opts);
    let result = minimize.parse(source, callback);
    return result;
};