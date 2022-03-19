## markdown转html
### 一：
+ marked
+ markdown-loader
+ html-loader

### markdown使用这个
+ npm install hyperdown prismjs -D

## webpack5
+ npm install html-webpack-plugin@next --save-dev 解决webpack5bug
+ 遗留问题。修改公共样式，需要保存两次才能生效

## 修改webpack5 module.js源码
```
// this.needRebuild === Module.prototype.needRebuild ||
// deprecatedNeedRebuild(this, context)
this.neewBuild === Module.prototype.neewBuild ||
deprecatedNeedRebuild(this, context)


// return module.needRebuild(
// 	context.fileSystemInfo.getDeprecatedFileTimestamps(),
// 	context.fileSystemInfo.getDeprecatedContextTimestamps()
// );
return module.needBuild(
  context.fileSystemInfo.getDeprecatedFileTimestamps(),
  context.fileSystemInfo.getDeprecatedContextTimestamps()
);
```


## sass
+ sass-loader将sass代码编译成css（默认通过node-sass），然后css-loader将编译出来的代码编译成符合CommonJS的代码，最后style-loader将编译后的代码再转为js代码，
+ 先补全浏览器前缀，再解析sass、less，再使用css加载器处理@import,最后使用style加载器将样式文件插入head标签


## 
+ npm install highlight.js --save
+ 后面没有使用

## css
+ 组件的css单独抽离
+ about.vue和about.js引入的一起抽离
+ 第三方的单独打包一个

## 按参数打包不同页面不起作用
+ 修改webpack-cli截取about参数

## watch
+ 启用 Watch 模式。这意味着在初始构建之后，webpack 将继续监听任何已解析文件的更改

## hot
+ webpac-dev-server支持Hot Module Replacement，即模块热替换，在前端代码变动的时候无需整个刷新页面，只把变化的部分替换掉。
+ inline选项会为入口页面添加“热加载”功能，即代码改变后重新加载页面。
  
## webpack-dev-serve
+ hot: WDS默认配置是自动刷新浏览器，因此在你开发的时候，不用自己设置。此外，它也支持webpack的高级功能——模块热替换（HMR）
  + HMR 允许修改浏览器的状态是部分刷新，而不是全部
+ webpack-dev-server 和 webpack-dev-middleware 里 Watch 模式默认开启。不需要重复开启

## npm install image-webpack-loader --save-dev 没看到作用,看到了生成了base64，但是找不到图片

## define-plugin怎么使用没看到生效

## copy-plugin原理

## 修改webpack-cli.js使其满足单独打包某个项目
```
async createCompiler (options, callback) {
    for (let i in options) {
      if (i === 'config') {
        options[i] = options[i].slice(0, 1)
      }
    }

const loadCommandByName = async (commandName, allowToInstall = false) => {
      if (commandName === bundleCommandOptions.name || commandName === bundleCommandOptions.alias) {
        // Make `bundle|b [options]` command
        this.makeCommand(bundleCommandOptions, this.getBuiltInOptions(), async (program) => {
          const options = program.opts();
          for (let i in options) {
            if (i === 'config') {
              options[i] = options[i].slice(0, 1)
            }
          }
```

## window.onload比mounted后执行

## watchOptions 