// module.exports = {
//   parser: 'sugarss',
//   plugins: {
//     // 'postcss-import': {},
//     // 'postcss-preset-env': {},
//     'cssnano': {} // 
//   }
// }


// module.exports = {
//   plugins: {
//     Autoprefixer: true
//     // 'postcss-cssnext': {}, // 下一代css语法 cssnext包含了 autoprefixer ，都安装会报错
//   }
// };

// postcss.config.js
// 自动添加css兼容属性
module.exports = {
  plugins: [
    require('autoprefixer')({
      "browsers": [
        "defaults",
        "not ie < 11",
        "last 2 versions",
        "> 1%",
        "iOS 7",
        "last 3 iOS versions"
      ]
    })
  ]
}