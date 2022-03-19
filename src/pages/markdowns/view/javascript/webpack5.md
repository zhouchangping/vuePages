## webpack5新特性
+ 尝试用持久性缓存来提高构建性能。
  + 在webpack5之前，可以使用cache-loader将编译结构写入硬盘缓存，还可以使用babel-loader，设置option.cacheDirectory将babel-loader编译的结果写进磁盘
  ```
  cache: {
    type: 'filesystem',
    // cacheDirectory 默认路径是 node_modules/.cache/webpack
    cacheDirectory: path.resolve(__dirname, '.temp_cache')
  }
  ```
+ 尝试用更好的算法和默认值来改进长期缓存。
  ```
  
  ```
+ 尝试用更好的 Tree Shaking 和代码生成来改善包大小。
  ```
  // a.js
  export const a =22;
  export const b = 33;
  // b.js
  import * as a from './a.js'
  export {a};
  // index.js
  import * as b from './b.js'
  console.log(b.a.a)  // 输出22
  webpack4：打包时，会把const b =33也打包进去
  ```
+ 尝试改善与网络平台的兼容性。
+ 尝试在不引入任何破坏性变化的情况下，清理那些在实现 v4 功能时处于奇怪状态的内部结构。
+ 试图通过现在引入突破性的变化来为未来的功能做准备，使其能够尽可能长时间地保持在 v5 版本上。
+ require.include已被废弃，使用时默认会发出警告,可以通过 Rule.parser.requireInclude 将行为改为允许、废弃或禁用。
+ 不再为 Node.js 模块 自动引用 Polyfills
+ Module Federation--待深入分析
  ```
    new ModuleFederationPlugin({
    name: "app2", // 应用名称 唯一
    library: { type: "var", name: "app2" }, // UMD标准导出，和name保持一致即可。
    filename: "remoteEntry.js", 暴露出去的chunkname
    exposes: {  要暴露出去的模块
      "./Button": "./src/Button",
    },
    // 与app1共享的依赖，如果app1中有，则会优先使用app1中的依赖。
    // (注：被app1引用)时候会按照app1的/package.json中的版本要求来加载
    shared: ["react", "react-dom"], 
    }),
    new ModuleFederationPlugin({
    name: "app1",  // 应用名称 唯一
    library: { type: "var", name: "app1" },
    remotes: { // 需要引用远程应用，与app2中library的name字段保持一致
      app2: "app2",
    },
    // 先判断存不再存这个包，如果不存在就使用app2里的依赖
    shared: ["react", "react-dom"], 
    }),
  ```
