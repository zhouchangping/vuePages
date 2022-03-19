{
  "presets": [
    [
      "@babel/env", // 我们不需要一个接一个地添加所有需要的插件，我们可以使用一个 "preset" （即一组预先设定的插件）
      {
        "targets": { // 名为 env 的 preset 只会为目标浏览器中没有的功能加载转换插件
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1"
        },
        "modules": false,
        "useBuiltIns": "usage",
        "corejs": "3", // 声明corejs版本, 警告在使用useBuiltIns选项时，需要声明core-js的版本
      }
    ]
  ],
    "plugins": [
      [
        "@babel/plugin-transform-runtime", // plugin-transform-runtime 已经默认包括了 @babel/polyfill，因此不用在独立引入
        // @babel/plugin-transform-runtime和@babel/runtime两个包引入的范围不一样：一个在开发时引入，一个在运行时引入。
        {
          "corejs": 2
        }
      ]
    ]
}