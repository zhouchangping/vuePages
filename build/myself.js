const config = require("../config");
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 提取js, html到dist
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 提取入口css
const TerserPlugin = require('terser-webpack-plugin') // 压缩js

const glob = require("glob");
const minimist = require("minimist"); // 分析参数
const { all } = require("axios/lib/axios");

const isDev = process.env.NODE_ENV == "devlopment";
console.log(isDev+ "-------------")
let HtmlWebpackPlugins = [];
const args = minimist(process.argv);
let srcDir = path.resolve(process.cwd(), 'src');


let pages;
if (isDev) {
  let allEntryInputs = args["_"].slice(2); // 新增分模块打包
  let newArr = allEntryInputs.map(function (item) {
    return srcDir + "/" + "pages" + "/" + item + "/" + item + ".html"
  })
  pages = getEntry("/pages/**?/*.html", newArr);
} else {
  let allEntryInputs = args["_"].slice(2).length ? args["_"].slice(2) :  ; // 新增分模块打包
  let newArr = allEntryInputs.map(function (item) {
    return srcDir + "/" + "pages" + "/" + item + "/" + item + ".html"
  })
  pages = getEntry("/pages/**?/*.html", newArr);
}

// //配置pages多页面获取当前文件夹下的html和js
function getEntry(allEntrys, newArr) {
  let entries = {};
  // let somes;
  newArr.forEach(function (entry) {
    entry = entry.split("/").splice(-3)[1];
    console.log(entry)
    HtmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        chunks: [entry], // 引入自己的
        title: '从零配置webpack4+vue脚手架',
        filename: entry + '.html', // 在dist下生成index.html
        template: path.join(__dirname, "../src/" + "pages" + "/" + entry + "/" + entry+ ".html") // 插件将会自动向这个模版文件中注入打包后的 js 'css' 文件资源
        // inject: 'body',                                                                     
      })
    )
    entries[entry] = path.join(__dirname, "../src/" + "pages" + "/" + entry + "/" + entry);
  });
  console.log(entries)
  return entries;
}


// console.log(pages)

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}



const webpacks = {    
  /* 入口 */
  // entry: {
  //   app: [
  //     // '@babel/polyfill', 由于使用了entry，在入口文件引入，
  //     path.join(__dirname, '../src/index.js'),
  //   ],
  //   // vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux'], // 提取公共代码
  // },
  entry: pages,
  /* 输出到dist目录 */
  output: {
    path: config.build.assetsRoot, // 生成的目录；output 目录对应一个绝对路径。
    // 涉及到打包后的文件后缀路由，以localhost为基础：localhost:8080+/bundle.js; 但是如果dev-serve配置了publicPath，则静态资源需要publicpath/bundle.js   webpack-dev-server 也会默认从 publicPath 为基准，使用它来决定在哪个目录下启用服务，来访问 webpack 输出的文件。
    publicPath: process.env.NODE_ENV === "production" ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: 'js/[name].js', // 此选项决定了每个输出 bundle 的名称。这些 bundle 将写入到 output.path 选项指定的目录下   publicPath + /js/name.///
    chunkFilename: 'js/[name].[contenthash].js' // 此选项决定了非初始（non-initial）chunk 文件的名称,这些文件名需要在运行时根据 chunk 发送的请求去生成。因此，需要在 webpack runtime 输出 bundle 值时，将 chunk id 的值对应映射到占位符(如 [name] 和 [chunkhash])。这会增加文件大小，并且在任何 chunk 的占位符值修改后，都会使 bundle 失效。各页面的chunkjs
  },
  externals: { // index.html cdn方式引入,运行时再去查找，不构建；防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖(external dependencies)。
    // 'vue': 'Vue',
    // 'vue-router': 'VueRouter' // 一：在externals加入 二：在index.html中加入 三：删除引入的vue vue-router; 如： import vue from Vue
  },
  resolve: {
    extensions: [".js", ".vue", ".json"], // 减少文件查找
    alias: {
      "@": resolve("src"),
    }
  },
  module: {
    rules: [
      /* config.module.rule('vue') */
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        // options: {
        //   hotReload: false // 关闭热重载  可以关闭------》当手动设置你的工程时，热重载会在你启动 webpack-dev-server --hot 服务时自动开启
        // }
      },
      /* config.module.rule('js') */
      { 
      // 它会应用到普通的 `.js` 文件
      // 以及 `.vue` 文件中的 `<script>` 块
        test: /\.js$/,
        use: ['babel-loader?cacheDirectory=true'], // cacheDirectory：默认值为 false。当有设置时，指定的目录将用来缓存 loader 的执行结果。之后的 webpack 构建，将会尝试读取缓存，来避免在每次执行时，可能产生的、高性能消耗的 Babel 重新编译过程(recompilation process)
        include: path.join(__dirname, '../src')
      }, 
      /* config.module.rule('css') */
      {
        test: /\.css$/,
        use: [
          // 它会应用到普通的 `.css` 文件
          // 以及 `.vue` 文件中的 `<style>` 块
          'vue-style-loader', //暂时没搞明白
          {
            loader: MiniCssExtractPlugin.loader // 提取 关闭无法提取vue和index.css
          },
          
            
          // { loader: process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'vue-style-loader' },
          // "style-loader", // 和min冲突
          // 'css-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          // {
          //   loader: 'css-loader',
          //   options: {
          //     modules: true,
          //     // localIdentName: '[local]--[hash:base64:5]'
          //     localIdentName: '[path][name]__[local]--[hash:base64:5]',
          //   }
          // }, 
          'postcss-loader' // No PostCSS Config found in: /Users/zhouchangping/myself/vueWebpackCliDemo/src;    配合插件加后缀
        ]
      },
      /* config.module.rule('svg') */
      {
        test: /\.(svg)(\?.*)?$/,
        use: [
          /* config.module.rule('svg').use('file-loader') */
          {
            loader: 'file-loader',
            options: {
              name: 'assets/images/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      // /* config.module.rule('media') */
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          /* config.module.rule('media').use('url-loader') */
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'assets/media/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('fonts') */
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          /* config.module.rule('fonts').use('url-loader') */
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'assets/fonts/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('images') */
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: [
          /* config.module.rule('images').use('url-loader') */
          {
            loader: 'url-loader',
            options: {
              limit: 30720, // 30kb
              esModule: false,
              fallback: {
                loader: 'file-loader', // 超过了limit就使用
                options: {
                  name: 'assets/images/[name].[hash:8].[ext]'  
                }
              }
            }
          }
        ]
      },
    ]
  },
  optimization: {
    runtimeChunk: "single", // 将 optimization.runtimeChunk 设置为 true 或 'multiple'，会为每个只含有 runtime 的入口添加一个额外 chunk。值 "single" 会创建一个在所有生成 chunk 之间共享的运行时文件
    // runtimeChunk: {
    //   // manifest文件用来引导所有模块的交互。manifest文件包含了加载和处理模块的逻辑。
    //   // 当webpack编译器处理和映射应用代码时，它把模块的详细的信息都记录到了manifest文件中。当模块被打包并运输到浏览器上时，
    //   name: 'manifest2' // mainfest2 --注释就生成runtime-app
    // },
    // runtimeChunk: { // 运行时
    //   name: entrypoint => `runtime~${entrypoint.name}`
    // },
    minimizer: [ // 允许你通过提供一个或多个定制过的 TerserPlugin 实例，覆盖默认压缩工具(minimizer)。
      // 压缩JS
      // new UglifyJsPlugin({ // 不可以压缩es6
      //   uglifyOptions: {
      //     compress: {
      //       // warnings: false, // 去除警告
      //       drop_debugger: true, // 去除debugger
      //       drop_console: true // 去除console.log
      //     },
      //   },
      //   cache: true, // 开启缓存
      //   parallel: true, // 平行压缩
      //   sourceMap: false // set to true if you want JS source maps
      // }),
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false, // 如果在生产环境中使用 source-maps，必须设置为 true
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        }
      }),
    ],
    // 需要开启，不能被重写
    minimize: true, // 告知 webpack 使用 TerserPlugin 压缩 bundle,production 模式下，这里默认是 true。
    // moduleIds: "hashed",
    noEmitOnErrors: false, // 在编译出错时，使用 optimization.noEmitOnErrors 来跳过生成阶段(emitting phase)。这可以确保没有生成出错误资源
    // splitChunks: { // 提供的全新的通用分块策略(common chunk strategy)
        //   cacheGroups: { 
        //     vendor: { // 第三方库,整个应用
        //       test: /[\\/]node_modules[\\/]/,
        //       // filename: "[name].bundle.js",
        //       name: "chunk-vendors",
        //       chunks: "initial",
        //       // name: "zhouzhou", // 从node_MOdules生成chunk vendor包
        //       priority: -10, // 一个模块可以属于多个缓存组。优化将首选具有较高的缓存组priority。默认组的优先级为负，以允许自定义组获得更高的优先级（默认值适用0于自定义组）
        //       // reuseExistingChunk: false, // 前块包含已从主捆绑包中拆分出的模块，则将重用该模块，而不是生成新的模块。这可能会影响块的结果文件名
        //     },
        //   },

        // },
    splitChunks: {
      minSize: 30000,  //提取出的chunk的最小大小
      chunks: "all", // 有效值为all，async和initial。提供all可能特别强大，因为它意味着即使在异步和非异步块之间也可以共享块
      minChunks: 1, // 拆分前必须共享模块的最小块数
      maxAsyncRequests: 2, // 按需加载时并行请求的最大数量
      maxInitialRequests: 3, // 入口点的最大并行请求数
      automaticNameDelimiter: "-", // 默认情况下，webpack将使用块的来源和名称生成名称（例如vendors~main.js）。此选项使您可以指定用于生成名称的定界符
      cacheGroups: { // 缓存组可以继承和/或覆盖splitChunks.*;中的任何选项。但是test，priority并且reuseExistingChunk只能在高速缓存组级别配置。要禁用任何默认缓存组，请将它们设置为false
        vendor: { // 第三方库,整个应用
          minSize: 30000, // 生成块的最小大小（以字节为单位）。
          // maxSize: 300, // 会导致拆分很多细小的
          maxSize: 40000,
          // test: /[\\/]node_modules[\\/]/,
          test: /[\\/]node_modules[\\/](vue|vuex|vue-router)[\\/]/,
          chunks: "all",
          // name: "zhouzhou", // 从node_MOdules生成chunk vendor包
          priority: 20, // 一个模块可以属于多个缓存组。优化将首选具有较高的缓存组priority。默认组的优先级为负，以允许自定义组获得更高的优先级（默认值适用0于自定义组）
          reuseExistingChunk: true, // 前块包含已从主捆绑包中拆分出的模块，则将重用该模块，而不是生成新的模块。这可能会影响块的结果文件名
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
  
            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace("@", "")}`;
          }
        },
        // vue: { // 单独抽离vue
        //   name: function () {
        //     return "chunk-vue";
        //   },
        //   priority: 20,
        //   test: /[\\\/]node_modules[\\\/]vue/
        // },
        // styles: {
        //   name: 'styles',
        //   test: /\.(sa|sc|c)ss$/,
        //   chunks: 'all',
        //   enforce: true,
        // },
        // vendor: { // 和名字没关系
        //   // test: /[\\/]node_modules[\\/]/, // 不能单独抽出来，会和commons冲突，换下面的方式
        //   test: /[\\/]node_modules[\\/](vue|vuex)[\\/]/,
        //   name: 'vendors', // 和名字没关系
        //   chunks: 'all',
        //   priority: 20
        // },
        commons: {
          // test: /[\\/]src[\\/]common[\\/]/, // 内包含vue代码，所以不能test，src
          name: 'commons', 
          chunks: 'all', // 需要all和initial，因为是异步引入
          minChunks: 2, //模块被引用2次以上的才抽离
          priority: -10
        }
      },
      //   name: "hahah", // 会被vendor内覆盖; 拆分块的名称
      //   chunks: "all", // 有效值为all，async和initial。提供all可能特别强大，因为它意味着即使在异步和非异步块之间也可以共享块s
      //   minSize: 3000, // 形成最小代码快，超过会生产新的
      //   maxSize: 0,
      //   minChunks: 1, // 拆分前必须共享模块的最小块数
      //   maxAsyncRequests: 5, // 按需加载时并行请求的最大数量
      //   maxInitialRequests: 3, // 入口点的最大并行请求数
      //   automaticNameDelimiter: "~", // 默认情况下，webpack将使用块的来源和名称生成名称（例如vendors~main.js）。此选项使您可以指定用于生成名称的定界符
      //   name (module, chunks, cacheGroupKey) {
      //      // generate a chunk name...
      //      return; //...
      //   }
    }
  },
  plugins: []
}
webpacks.plugins = HtmlWebpackPlugins
module.exports = webpacks;