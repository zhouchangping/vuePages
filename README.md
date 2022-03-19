##  安装webpack 
+ npm install --save-dev webpack
+ npm install --save-dev webpack-cli 使用 webpack 4+ 版本，你还需要安装 CLI // 此工具用于在命令行中运行 webpack
+ dev: 开发时的依赖 --save 安装依赖包，这代表了运行时依赖

## 新建src/index.js index.html

## 修改删除"main": "index.js", 新增"private": true,以便确保我们安装包是私有的(private)，并且移除 main 入口。这可以防止意外发布你的代码。

## 安装 loadsh.js // https://www.webpackjs.com/guides/getting-started/#%E5%9F%BA%E6%9C%AC%E5%AE%89%E8%A3%85
+ npm install --save lodash
+ npx webpack // 执行输出
  
## 新建config目录-NPM 脚本
+ webpack.common.config.js
+ 修改page.json 加 // "start": "webpack --config ./config/webpack.common.config.js", --config选项来指定配置文件
+ npm run start 构建;
  + 使用 npm 的 scripts，我们可以像使用 npx 那样通过模块名引用本地安装的 npm 包
  + 通过向 npm run build 命令和你的参数之间添加两个中横线，可以将自定义参数传递给 webpack，例如：npm run build -- --colors

## webpack-merge
+ npm install --save-dev webpack-merge

## 新建prod dev config.js

## 安装webpack-dev-server html-webpack-plugin  
+ npm install html-webpack-plugin --save-dev
+ npm install webpack-dev-server --save-dev

## dist清空再生成
+ npm install clean-webpack-plugin --save-dev

## output
+ filename: 每个输出 bundle 的名称。这些 bundle 将写入到 output.path 选项指定的目录下。
```
使用入口名称：
filename: "[name].bundle.js"

使用内部 chunk id
filename: "[id].bundle.js"

使用每次构建过程中，唯一的 hash 生成
filename: "[name].[hash].bundle.js"

使用基于每个 chunk 内容的 hash：
filename: "[chunkhash].bundle.js"
```

## 重入口提取css 
+ mini-css-extract-plugin

## 压缩css optimize-css-assets-webpack-plugin: css压缩，主要使用 cssnano 压缩器(webpack4的执行环境内置了cssnano，所以不用安装)
+ optimize-css-assets-webpack-plugin

## MiniCssExtractPlugin提取CSS: 从 bundle 中提取文本（CSS）到单独的文件

## postcss
+ 它提供了一种方式用 JavaScript 代码来处理 CSS。它负责把 CSS 代码解析成抽象语法树结构（Abstract Syntax Tree，AST），再交由插件来进行处理。插件基于 CSS 代码的 AST 所能进行的操作是多种多样的，比如可以支持变量和混入（mixin），增加浏览器相关的声明前缀，或是把使用将来的 CSS 规范的样式规则转译（transpile）成当前的 CSS 规范支持的格
  
## cssnano
+ cssnano执行各种优化，删除空白和注释，并且压缩代码

## cssnext

## post-cssloader需要配合postcss.config.js,不然会报错
+ npm install postcss-loader --save-dev
+ postcss-next插件 cssnext包含了 autoprefixer ，都安装会报错，
+ postcss-pxtorem
+ autoprefixer：  配合post-loader加后缀
+ cssnano : cssnano执行各种优化，删除空白和注释，并且压缩代码
+ cssmoudle
+ postcss-import : 遵循@import规则，你可以将normalize.css样式合并到你的主样式表中，如此一来，加载相同的CSS就只需要一个http请求就够了。@import 'normalize.css';
  + 安装好postcss-import插件，它会检测到主样式表中@import引入的normalize.css文件，并且会自动将normalize.css样式合并到你的样式表中

## babel-loader 和babel区别
+ npm install -D babel-loader @babel/core @babel/preset-env webpack

## 支持vue
+ npm install -D vue-loader vue-template-compiler
  + style-loader 负责将 css 以内联的方式插入文档中
  + vue-style-loader 功能和style-loader 类似，只不过它更专注于 vue 中的 css 提取
  + 'vue-style-loader', //暂时没搞明白，好像也不需要
  + Vue Loader v15 不再默认应用 PostCSS 变换。你需要通过 postcss-loader 使用 PostCSS
+ npm install vue --save

## css-loader style-loader
+ npm install style-loader --save-dev
+ npm install css-loader --save-dev
+ 因为 css-loader 的作用是 resolve css 文件中的 @import 和 属性值 url() 中的依赖关系
+ style-loader 才是处理 css, 并将其打包到 js 中, 最后以 <style> 标签的形式插入到 head (插入位置可配置)中的 loader
+ @import "../import.css"; 使用@引入的是全局的;通过这种引入<style scoped src="../import.css"></style>


## fileloader urlloader
+ url-loader 功能类似于 file-loader，但是在文件大小（单位 默认情况下，生成的文件的文件名就是文件内容的 MD5 哈希值并会保留所引用资源的原始扩展名。
+ file-loader 默认情况下，生成的文件的文件名就是文件内容的 MD5 哈希值并会保留所引用资源的原始扩展名。
```
file-loader 可以指定要复制和放置资源文件的位置，以及如何使用版本哈希命名以获得更好的缓存。此外，这意味着 你可以就近管理图片文件，可以使用相对路径而不用担心部署时 URL 的问题。使用正确的配置，webpack 将会在打包输出中自动重写文件路径为正确的 URL。

url-loader 允许你有条件地将文件转换为内联的 base-64 URL (当文件小于给定的阈值)，这会减少小文件的 HTTP 请求数。如果文件大于该阈值，会自动的交给 file-loader 处理。
url-loader只会编译html和css中的图片。可以通过import导入图片，通过一个变量去接收
```

## sass-loader
```
"node-sass": "^4.9.2",
"sass-loader": "^7.1.0",
```

## image-webpack-loader

## happypack 多进程加快编译速度

## const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

## hash
```
hash是跟整个项目的构建相关，只要项目里有文件更改，整个项目构建的hash值都会更改，并且全部文件都共用相同的hash值

chunkhash和hash不一样，它根据不同的入口文件(Entry)进行依赖文件解析、构建对应的chunk，生成对应的哈希值。

contenthash 更细致地根据内容更改，生成对应的哈希值。解决chunkhash 文件中引入的文件名因 chunkhash 变动而变动的问题
```

## 使用HappyPack开启多进程Loader转换
+ npm i -D happypack

## webpack-parallel-uglify-plugin 增强代码压缩
+ loader转换已经做优化，那么下面还有另一个难点就是优化代码的压缩时间

## 因为Babel的预案（preset）默认会将任何模块类型都转译成CommonJS类型，这样会导致tree-shaking失效。修正这个问题也很简单
+ tree-shaking的主要作用是用来清除代码中无用的部分。目前在webpack4 我们设置mode为production的时候已经自动开启了tree-shaking。但是要想使其生效，生成的代码必须是ES6模块。

## speed-measure-webpack-plugin来检测webpack打包过程中各个部分所花费的时间，在终端输入以下命令进行安装
+ npm install speed-measure-webpack-plugin -D 

## progress-bar-webpack-plugin: 打包编译的时候以进度条的形式反馈打包进度

## friendly-errors-webpack-plugin: 能够更好在终端看到webapck运行的警告和错误

## HotModuleReplacementPlugin: 实现局部热加载(刷新)，区别与在webpack-dev-server的全局刷新(webpack的内置插件)

## yargs-parser: 用于将我们的npm scripts中的命令行参数转换成键值对的形式如 --mode development会被解析成键值对的形式mode: "development"，便于在配置文件中获取参数

## webpack-merge: 用于合并webpack的公共配置和环境配置(合并webpack.config.js和webpack.development.js或者webpack.production.js)

## npm install --save-dev copy-webpack-plugin

## vue-css热启动： { loader: process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'vue-style-loader' },

## 需要安装core.js，新版的polyfill can't resolve 'core-js/modules/es6.promise' webpack编译es6报错
