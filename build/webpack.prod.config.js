const path = require('path');
const glob = require("glob");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 提取入口css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 打包清空
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin'); // 友好显示
const ProgressBarPlugin = require('progress-bar-webpack-plugin'); //  过程
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 复制文件
const VueLoaderPlugin = require('vue-loader/lib/plugin') // 必须引入
const FileSize = require("../plugins/fileSize.js");
// 分析打包时间
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

// const { library } = require("../dll.config.js"); // webpack将第三方js默认打成一个包，导致该js文件越来越庞大，严重影响首屏加载 。配置需要抽取的第三方js
// dll文件存放的目录
// let dllPath = "../dist/public/vendor";
const webpack = require("webpack");
const env = require("../config/prod.env");
process.env.NODE_ENV = "production";

const baseWebpackConfig = require("./webpack.base.config.js");
const config = require("../config");
const { merge } = require('webpack-merge');
const webpackProd = merge(baseWebpackConfig, {
  /* 模式 */
  mode: 'production',
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  plugins: [
    new webpack.DefinePlugin({
      "process.env": env // 定义全局变量，这里是NODE_ENV
    }),
    new MiniCssExtractPlugin({ // 提取压缩
      filename: "css/[name].[md5:contenthash:hex:8].css",
      chunkFilename: "css/[id].[md5:contenthash:hex:8].css"
    }),
    new OptimizeCssAssetsPlugin(),
    new CleanWebpackPlugin(), // 每次打包前清空
    new FriendlyErrorsWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, '../static'),
          to: 'static',
        }
      ],
    }),
    new ProgressBarPlugin(),
    // 请确保引入这个插件！它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。例如，如果你有一条匹配 /\.js$/ 的规则，那么它会应用到 .vue 文件里的 <script> 块。
    new VueLoaderPlugin(),
    // new webpack.DefinePlugin({
    //   // "windowArgs": require(envConfigFile),
    //   "process.env": require("../config/prod.env") // 定义全局变量，这里是NODE_ENV
    // }),
    new FileSize()
    // new webpack.DllPlugin({ // 使用DLLPlugin进行分包，DllReferencePlugin对manifest.json引用
    //   name: '[name]',
    //   path: '../dist/library/[name].json'
    // })
    // new webpack.NoEmitOnErrorsPlugin(),
    // new webpack.DllPlugin({
    //   path: path.join(__dirname, dllPath, "[name]-manifest.json"),
    //   name: "[name]_[hash]"
    // })
  ],
})

// module.exports = smp.wrap(webpackProd)
module.exports = webpackProd;

