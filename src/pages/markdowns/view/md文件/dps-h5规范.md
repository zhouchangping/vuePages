+ 项目代码相关
    + UI框架选择：
      + 移动端使用vant(dps-h5)
      + pc 使用ant-design-vue（后管理) || element-ui
    + vue组件使用及组件命名规范（包含全局组件和局部组件）
      + 组件命名规范
        + 组件命名遵循小驼峰，有意义的名词、简短、具有可读性
        + 公共组件，公司名或项目名开头-paButton.vue
        + 基础组件名： baseButton.vue
        + 页面组件： 页面名+组件名  safeBoxButton.vue
        + 紧密耦合的组件名
          + TodoList.vue TodoListItem.vue TodoListItemButton.vue
        + 组件名中的单词顺序: searchButtonClear.vue searchButtonRun.vue 描述+功能+描述
        + 完整单词的组件名
        + 页面内部组件以组件模块名简写为开头，Item 为结尾 staffBenchToChargeItem
        + 使用遵循 kebab-case(短横线分隔命名) 约定
        + 必须符合自定义元素规范: 切勿使用保留字
      + 注释规范
        + 注释类型：
          + 单行注释 css js 使用//    html使用<!-- Comment Text -->
          + 多行注释
          + 函数注释
          + 文件头注释
          + 条件注释
        + 1.公共组件使用说明
          ```
          公用组件：数据表格
          /**
          * @desc 组件名称
          * @module 组件存放位置
          * @desc 组件描述
          * @author 组件作者
          * @date 2018年8月13日17:22:43
          * @param {Object} [title]    - 参数说明
          * @param {String} [columns] - 参数说明
          * @example 调用示例
          *  <Table :title="title" :columns="columns" :tableData="tableData"></Table>
          */
          属性变量-注释：  //
          方法-注释：  /**
                     * @desc 解释
                     * @param {数据类型} 参数名 参数解释
                     */
          class注释举例：/**
                        * @desc 查询所有消息
                        * @param {Object} pageInfo     分页对象
                        * @property {int} pageNum      页号
                        * @property {int} pageSize     每页条数
                        */
          ```
        + 2.各组件中重要函数或者类说明
        + 3.复杂的业务逻辑处理说明
        + 4.特殊情况的代码处理说明,对于代码中特殊用途的变量、存在临界值、函数中使用的hack、使用了某种算法或思路等需要进行注释描述
        + 5.注释块必须以/**（至少两个星号）开头**/；
        + 6.单行注释使用//；
        + 7.多重if判断语句
      + 编码规范
        + html文件格式：
          + 页面布局标签：
            + 优先使用h5语义化标签：header main nav side footer
          + 前缀规范
            + g-    全局 g-mod
            + m-    模块命名方式(m-popup)
            + ui-   组件命名方式（sz-header sz-pop sz-alert)
            + js-   所有用于纯交互的命名，不涉及任何样式规则;js-switch
          + utf-8编码
          + 自闭合（self-closing）标签，无需闭合 ( 例如： img input br hr 等 )；
          + 嵌套: <li>用于<ul>或 <ol>下；
          + 使用 HTML5 doctype，不区分大小写。<!DOCTYPE html>
          + meta title header
            ```
            // 声明文档使用的字符编码
            <meta charset="utf-8">
            // 优先使用 IE 最新版本和 Chrome
            <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
            // 页面描述
            <meta name="description" content="不超过150个字符">
            <title>标题</title>
            // 定义网页作者
            <meta name="author" content="name, email@gmail.com">
            // 搜索引擎抓取
            <meta name="robots" content="index,follow">
            // 为移动设备添加 viewport
            <meta name ="viewport" content ="initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=no">
            页面窗口自动调整到设备宽度，并禁止用户缩放页面
            <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            // 电话号码识别:OS Safari ( Android 或其他浏览器不会) 会自动识别看起来像电话号码的数字，将其处理为电话号码链接
            <meta name="format-detection" content="telephone=no">
            // 邮箱地址的识别
            <meta name="format-detection" content="email=no">
            // 禁止 Chrome 浏览器中自动提示翻译
            <meta name="google" value="notranslate">
            ```
          + css 样式表在head标签内引用，js 脚本引用在 body 结束标签之前引用。
        + 图片规范
          + 图片业务（wx,qq,jd,可选） +（mod_）图片功能类别(btn,icon,logo,bg...)（必选）+ 图片模块名称（goodslist, goodsinfo可选） + 图片精度（@1x @2x @3x可选）    wx_btn_goodlist@2x.png
          + 内容图：颜色较为丰富，文件体积较大；优先考虑 JPEG 格式，条件允许的话优先考虑 WebP 格式；尽量不使用PNG格式，PNG8 色位太低，PNG24 压缩率低，文件体积大
          + 背景图： 背景图多为图标等颜色比较简单、文件体积不大、起修饰作用的图片；PNG 与 GIF 格式，优先考虑使用 PNG 格式,PNG格式允许更多的颜色并提供更好的压缩率
          + CSS Sprites 使用建议
          + 转换成 Base64 编码的图片应小于 2KB；移动端不使用 Base64 编码，要兼容 IE6/IE7 的不使用，转换文件体积大，大约比原始的二进制大33%
          + alt 属性应该写上
          + 中国普通家庭的宽带基本能达到8Mbps，实际速率大约为500—900KB/s，全国3G/4G用户占有比超过了50%，为了保证图片能更好地加载展示给用户看： PC平台单张的图片的大小不应大于 200KB。移动平台单张的图片的大小不应大于 100KB。
        + js规范
          + 项目标准js优化性能-js插件
            + 滚动加载
            + 大数据处理
            + 防抖节流
            + 统一工具，组件，更新
            + localStorage: 命名使用命名空间，区分不同页面
            + ....各仓库整理各自公共方法，重构等
          + 使用ES6风格编码源码
            + 定义变量使用 let ,定义常量使用 const
            + 静态字符串一律使用单引号或反引号，动态字符串使用反引号
            + 解构赋值
            + 箭头函数
            + 拷贝数组
            + 解构赋值
            + 请使用字面量值创建对象;请使用字面量值创建数组
            + 向数组中添加元素时，请使用 push 方法
            + 使用数组的 map 等方法时，请使用 return 声明，如果是单一声明语句的情况，可省略 return
            + 字符串统一使用单引号的形式 ''
            + 程序化生成字符串时，请使用模板字符串``
            + 请使用函数声明，而不是函数表达式
            + 使用 class，避免直接操作 prototype
            + 使用标准的 ES6 模块语法 import 和 export
            + 不要使用 import 的通配符 *，这样可以确保你只有一个默认的 export
            + 声明变量时，请使用 const、let 关键字，如果没有写关键字，变量就会暴露在全局上下文中
            + 将所有的 const 和 let 分组
            + 由于 with 方法会产生神奇的作用域，所以我们也是禁止使用该方法的
            + 由于 eval 方法比较 evil，所以我们约定禁止使用该方法
            + 不要修改内置对象，如 Object 和 Array
            + 别使用保留字作为对象的键值，这样在 IE8 下不会运行；如：default：{}
            + 请使用对象方法的简写方式addValue(val) {}
            + 使用多行写代码块
            + 约定最大连续空行数为 2；避免无意义空行，影响代码结构。
            + function test() {}
            + class标准
              + 大写命名
              + constructor
            + let test = 123;
              ```
                if (true) {

                } else {

                }
            ```
          + vue部分规范
            + 1.通用约定
              + 变量, 使用驼峰命名。
              + 私有属性、变量和方法以下划线 _ 开头。
              + 常量, 使用全部字母大写。
              + 枚举变量 使用 Pascal 命名法；枚举的属性， 使用全部字母大写，单词间下划线分隔的命名方式。
              + 如果模块默认输出一个对象，对象名的首字母应该大写
              + 如果模块默认输出一个函数，函数名的首字母应该小写
              + 指令有缩写一律采用缩写形式
              + 不要扩充内置原型（虽然给Object(), Function()之类的内置原型增加属性和方法很巧妙，但是会破坏可维护性）
              + v-for 循环必须加上 key 属性，在整个 for 循环中 key 需要唯一
              + 避免 v-if 和 v-for 同时用在一个元素上（性能问题）
              + 如果模块只有一个输出值，就使用 export default，如果模块有多个输出值，就不使用 export default，export default 与普通的 export 不要同时使用
              + 应该优先通过 prop 和事件进行父子组件之间的通信，而不是 this.$parent 或改变 prop。
              + 调试信息 console.log() debugger 使用完及时删除
              + 除了三目运算，if,else 等禁止简写
              + 尽量使用===代替==
              + promise.then().catch();
              + 全局变量的位置 如无特殊情况，变量统一放到 data 内，避免组件重用时代码不被执行
              + boolean 类型的变量使用 is 或 has 开头。
              + 三元操作符用于替代 if 条件判断语句
              + 声明提升；使用let const
              + 命名的函数表达式的变量名会被提升，但函数名和函数函数内容并不会。
              + 匿名函数表达式的变量名会被提升，但函数内容并不会。
              + 函数声明的名称和函数体都会被提升。
            + 函数设计
              + 一个函数的长度控制在 50 行以内。 将过多的逻辑单元混在一个大函数中，易导致难以维护。
              + 一个函数的参数控制在 6 个以内
            + 应该优先通过 Vuex 管理全局状态，而不是通过 this.$root 或一个全局事件总线。
            + Props 规范
              + 组件props原子化,描述详细
              + 提供默认值
              + 使用type属性校验类型
              + 使用props之前先检查该prop是否存在
            + Data必须是一个函数,使用data里的变量时请先在 data 里面初始化。
            + 无特殊情况不允许使用原生API操作dom,谨慎使用this.$refs直接操作dom。
            + components
              + 声明的时候，其命名应该始终使用 camelCase，而在模板中应该始终使用 kebab-case
            + computed
              + 注释描述应该出现的是什么，而非如何计算那个值
        + css/sass（使用sass）
          + 使用统一的reset.css;在index.html中引入，统一处理。
          + 使用展开格式，换行
          + 样式选择器，属性名，属性值关键字全部使用小写字母书写，属性字符串允许使用大小写
          + 不使用无具体语义定义的标签选择器；使用 p li i a
          + 代码缩进：四个空格 || 或两个空格
          + 每个属性声明末尾都要加分号；
          + 左括号与类名之间一个空格，冒号与属性值之间一个空格
          + 为单个css选择器或新申明开启新行
          + 颜色值 rgb() rgba() hsl() hsla() rect() 中不需有空格，且取值不要带有不必要的 0
          + css属性值需要用到引号时，统一使用单引号
          + 运算符之间空出一个空格
          + CSS3 浏览器私有前缀在前，标准前缀在后
          + 注释：
            + 单行注释： /*Comment Text*/
            + 模块注释 /* Module A --------------------------------------------------------------- */
            + 文件信息注释 @charset "UTF-8";
            ```
            @charset "UTF-8";
            /**
            * @desc File Info
            * @author Author Name
            * @date 2015-10-10
            */
            ```
          + 声明顺序（定位（positioning）可以从正常的文档流中移除元素，并且还能覆盖盒模型（box model）相关的样式，因此排在首位。盒模型排在第二位，因为它决定了组件的尺寸和位置。 其他属性只是影响组件的 内部 或者是不影响前两组属性，因此排在后面）
            + Positioning定位 (position: absolute;)
            + Box model盒模型(display: block;)
            + Typographic版式(line-height: 1.5; )
            + Visual视觉效果（background-color: #f5f5f5;
            + Misc杂项（opacity: 1;）
          + 链接的样式顺序：a:link -> a:visited -> a:hover -> a:active（LoVeHAte）
          + CSS预处理器选择
            + 使用sass，我们使用sass-后面有sass使用标准
              + 定义全局的变量，1px选择器，clearfix选择器等，使用混入，传参数
              + 代码组织 代码按一下顺序组织： @import 变量声明 样式声明
            + less
            + stylus
          + Web字体规范
            + 优先使用框架中的字体图标，比如element ui中的
            + 使用iconfont字体图标代替图片
            + 字体粗细采用具体数值，粗体bold写成700，正常normal写成400。
            + 为了防止文件合并及编码转换时造成问题，建议将样式中文字体名字改成对应的英文名字，如：黑体(SimHei)、宋体(SimSun)、微软雅黑(Microsoft Yahei)
            + font-size必须以px为单位; 使用pxTorem 转化
            + font-family不允许在业务代码中随意设置。
          + 使用scoped关键字，约束样式生效的范围。 通用sass引入,定义全局颜色等
          + 使用bem风格；块（header)-小块(top)__元素（button）--修饰（成功，失败）
            + header-img header-title--success  main-container__button--error main-container__button--left
          + 避免使用标签选择器（效率低、损耗性能）
          + 属性值书写尽量使用缩写
          + 省略URI外的引号
          + 十六进制尽可能使用3个字符
          + 省略0后面的单位
          + 避免使用通用选择器
          + 避免使用多层标签选择器。使用 class 选择器替换，减少css查找
          + 避免使用子选择器
          + 避免不必要的嵌套
          + CSS 属性书写顺序：先决定定位宽高显示大小，再做局部细节修饰！推荐顺序：定位属性(或显示属性，display)->宽高属性->边距属性(margin, padding)->字体，背景，颜色等，修饰属性的定义。
          + 非特殊情况下，禁止使用ID选择器定义样式。有JS逻辑的情况除外。
        + 工具使用规范
          + vscode自动修复
            + vscode
              + 配置vscode settings
            + eslint
              + npm install eslint --save-dev
              + 添加eslint修复命令 "lint-fix": "eslint --fix --ext .js src/"
          + git预检查（目前通过配置commit方式）
            + npm install husky --save-dev
            + husky 是一个 npm 模块，可以在 git 提交前做拦截，如果拦截返回异常信息，将取消提交
            + packge.json内部   "precommit": "npm run lint-fix"
          + git
          + eslintrc.js
          + postcssrc.js
          + 使用Babel 在项目根目录创建.babelrc 文件
            ```
            /* 根目录 .babelrc 文件 */
            {
              // 此项指明，转码的规则
              "presets": [
                // env项是借助插件babel-preset-env，下面这个配置说的是babel对es6,es7,es8进行转码，并且设置amd,commonjs这样的模块化文件，不进行转码
                ["env", {
                  "modules": false,
                  "targets": {
                    "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
                  }
                }],
                // 下面这个是不同阶段出现的es语法，包含不同的转码插件
                "stage-2"
              ],
              // 下面这个选项是引用插件来处理代码的转换，transform-runtime用来处理全局函数和优化babel编译
              "plugins": ["transform-vue-jsx", "transform-runtime"],
              // 下面指的是在生成的文件中，保留注释
              "comments": true,
              // 下面这段是在特定的环境中所执行的转码规则，当环境变量是下面的test就会覆盖上面的设置
              "env": {
                "test": {
                  "presets": ["env", "stage-2"],
                  "plugins": ["transform-vue-jsx", "istanbul"]
                }
              }
            }
            ```
        + 文件夹命名/组件/js命名：文件夹名称应统一格式，大驼峰
    + 文件夹: 描述
      + page: 描述 + page + .vue
      + 组件：
        + 公共组件： 公司/项目（pa + 描述 + .vue）
        + 基础组件： 描述 + Button + .vue
        + 子组件命名：描述 + 父组件 + Item + .vue
      + js: 功能描述+ .js
    + 上线部署前端查漏检查：
      + 密钥：生产和测试不同
      + url跳转地址：生产和测试不同
      + 关联方部署：是否同步部署生产
      + 环境变量：区分测试和生产
      + 定时任务。是否执行
    + vscode使用
      + Auto Rename Tag   // 自动重命名配对的HTML / XML标签
      + Chinese (Simplified) Language Pack for Visual Studio Code   // ide汉化
      + Color Highlight   // css 颜色高亮
      + CSS Peek    // 能够查看CSS ID和类的字符串作为HTML文件中相应的CSS定义
      + Debugger for Chrome   // 让 vscode 映射 chrome 的 debug功能，用 vscode 来打断点调试
      + Markdown All in One   // 拓展md
      + Markdown Preview Enhanced  // md 预览
      + open in browser  // 浏览器打开html
      + px2rem  // rem配置
      + TODO Highlight  // TODO 高亮
      + TypeScript Importer  // TS拓展
      + Vetur // vue 格式化配置 高亮
      + vscode-icons  // 文件图标
      + Vue VSCode Snippets  // vue 代码提示
      + filesize
    + git使用
    + 分支使用
      + master->feature
      + master-> release
    + commit规则
      + git commit -m "feat(所属功能): 提交信息描述"
    + 监控平台使用
    + 埋点方式和地址
    + 项目地址记录及常用网站记录
    + 工具使用，调试，优化，监控
    + 后台地址
    + 架构设计
      + 前端设计
      + 后端架构
    + 其他工具使用
    + 仓库介绍（各仓库功能描述）
    + http使用
    + 加解密使用
    + 安全注意
    + Vuex的拆分方案
      + 提交mutation是更改状态的唯一方法，并且这个过程是同步的。
      + 分modules
      + mutation-types里面的常量、常量值全部用大写+英文单词配合下划线的形式：例如：export const UPDATE_USERINFO = “UPDATE_USERINFO”。
      + mutation-types.js的常量可以用于action中commit, mutations中的方法名
      + vuex 的dispatch和commit提交mutation的区别：dispatch=>actions用来触发异步操作，commit=>mutation用来触发同步操作的方法。当操作行为中含有异步操作，比如向后台发送请求获取数据，就需要使用action的dispatch去完成，其他使用commit即可。
      ```
      new Vuex.Store({
        state: state,
        mutations: {},
        actions: {},
        modules: {
          user,
          ...
        }
      })

      export default {
        namespaced: true,
        state: { // 状态
          num: 0
        },
        actions: { // 异步
          setCurrent({ commit, store}, to) {
            commit("setCurrent", 1)
          }
        },
        mutations: { // 同步 提交 mutation 是更改状态的唯一方法，并且这个过程是同步的。
          setCurrent(num) {
            state.num += num;
          }
        },
        getters: {
          getNum(state) {
            return state.num;
          }
        }
      }
      ```
    + vue-router的拆分方案
    + 业务逻辑与UI应该是分离开的、松耦合的；
      + 展示组件 : 只负责展示UI，不负责业务逻辑，任何与业务相关的数据、回调都通过组件接口（如：props、event、slot等等）传递；
    + 原生方案
      + 原生方法总数统计
      + 公共方法说明。注释
      + 更新方式-共同维护
