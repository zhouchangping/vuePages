const path = require('path');
const utils = require("./utils");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 提取入口css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin'); // 友好显示
// const ProgressBarPlugin = require('progress-bar-webpack-plugin'); //  过程
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 复制
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin"); // 导入速度分析插件
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const portfinder = require("portfinder"); // 配合FriendlyErrorsWebpackPlugin
// const smp = new SpeedMeasurePlugin(); // 导入速度分析插件
process.env.NODE_ENV = "development"
const VueLoaderPlugin = require('vue-loader/lib/plugin') // 必须引入
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin; // 分析
const webpack = require("webpack");

const baseWebpackConfig = require("./webpack.base.config.js");
const config = require("../config");
const { merge } = require('webpack-merge');
const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);
const webpackDev = merge(baseWebpackConfig, {
  /* 模式 */
  mode: 'development',
  devtool: config.dev.devtool,
  /* 本地IP + 端口访问 */
  devServer: {
    index: "/index.html", // 默认启动serve 打开page1页面
    clientLogLevel: "warning",
    historyApiFallback: true,
    contentBase: false, // 告诉服务器内容的来源。仅在需要提供静态文件时才进行配置
    // contentBase: false, // 告诉服务器从哪个目录中提供内容。只有在你想要提供静态文件时才需要。   src/index.html src/index.css
    // compress: true, // 为每个静态文件开启 gzip compression：
    host: HOST || config.dev.host, // 指定要使用的 host。如果你希望服务器可从外部访问，请按以下方式进行配置
    port: PORT || config.dev.port,
    quiet: false, // necessary for FriendlyErrorsPlugin 启用 devServer.quiet 后，除了初始启动信息外，什么都不会写入控制台。 这也意味着来自webpack的错误或警告是不可见的
    // historyApiFallback: {
    //   rewrites: [{
    //     from: /.*/,
    //     to: path.posix.join(config.dev.assetsPublicPath, "index.html")
    //   }, ],
    // },
    hot: true, // 局部热更新需要启用webpack的Hot Module Replacement 功能：
    // historyApiFallback: true, // 解决启动后刷新404
    // dev显示需配置
    publicPath: config.dev.assetsPublicPath, // 此路径下的打包文件可在浏览器中访问。 localhost:8080/dists/ 包括静态页面,静态资源全在这里
    proxy: config.dev.proxyTable,
    // before: app => {
    //   app.get("/", (req, res, next) => {
    //     let html = "";
    //     for (let i in pages) {
    //       // res.setHeader("Content-Type", "text/html");
    //       html+=`<a target="_self" href="/${i}.html">/${i}</a></br>`;
    //     }
    //     res.write(html)
    //     next();
    //   });
    //   // app.get('/goods/list', (req, res, next) => {  //mock数据
    //   // 	res.status(299).json(mock)
    //   // })
    // },
    open: true, // 浏览器打开
    inline: false, // 在开发服务器的两种不同模式之间切换。,默认情况下，应用程序启用内联模式(inline mode)。这意味着一段处理实时重载的脚本被插入到你的包(bundle)中，并且构建消息将会出现在浏览器控制台。
    // watchOptions: { // webpack 使用文件系统(file system)获取文件改动的通知。
    //   poll: config.dev.poll,
    // },
    // watchContentBase: false, // 告诉 dev-server 监听 [devServer.contentBase]（＃devservercontentbase）选项提供的文件。 默认情况下禁用。 启用后，文件更改将触发整个页面重新加载
    // liveReload: false // 检测到文件更改时，开发服务器将重新加载/刷新页面。 必须禁用 devServer.hot 选项或必须启用 devServer.watchContentBase 选项，才能使 liveReload 生效,通过将其设置为 false 来禁用 devServer.liveReload
  },
  plugins: [
    // new MiniCssExtractPlugin({ // 提取压缩
    //   filename: devMode ? 'css/[name].css' : 'css/[name].[contenthash].css',
    //   chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[contenthash].css',
    // }),
    new MiniCssExtractPlugin({ // 用于dev环境抽离
      filename: "css/[name].min.css", // 此选项决定了输出的每个 CSS 文件的名称
      // filename: '[name].css',
      // chunkFilename: '[id].css',
      // filename: 'css/[name][contenthash].css' // 输出文件名和地址
    }),
    new OptimizeCssAssetsPlugin(),
    // new FriendlyErrorsWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, '../static'),
          to: 'static',
        }
      ],
    }),
    // new ProgressBarPlugin(),
    // 请确保引入这个插件！它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。例如，如果你有一条匹配 /\.js$/ 的规则，那么它会应用到 .vue 文件里的 <script> 块。
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      "process.env": require("../config/dev.env.js") // 定义全局变量，这里是NODE_ENV
    }),
    // new webpack.HotModuleReplacementPlugin(), // 开启HMR,局部热替换,和dev-server配置hot: true重复
    // new webpack.NamedModulesPlugin(), // 当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。
    new webpack.NoEmitOnErrorsPlugin(), // 在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段
    // new BundleAnalyzerPlugin({
    //   analyzerMode: "server",
    //   analyzerHost: "127.0.0.1",
    //   analyzerPort: 8888,
    //   reportFilename: "report.html",
    //   defaultSizes: "parsed",
    //   openAnalyzer: true,
    //   generateStatsFile: false,
    //   statsFilename: "stats.json",
    //   statsOptions: null,
    //   logLevel: "info"
    // }),
  ],
});

// const webpackConfig = smp.wrap({
//   plugins: [
//     new MyPlugin(),
//     new MyOtherPlugin()
//   ]
// });

// module.exports = webpackDev;

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port;
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port;
      // add port to devServer config
      webpackDev.devServer.port = port;
      // Add FriendlyErrorsWebpackPlugin
      webpackDev.plugins.push(new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${webpackDev.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors ?
          utils.createNotifierCallback() :
          undefined
      }));
      resolve(webpackDev);
    }
  });
});

