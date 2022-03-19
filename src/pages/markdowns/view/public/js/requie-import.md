## 各种模块工具的区别
+ node的module遵循CommonJS规范，requirejs遵循AMD，seajs遵循CMD，虽各有不同，但总之还是希望保持较为统一的代码风格
+ export / import : 只有es6 支持的导出引入
+ require: node 支持的引入
+ module.exports / exports: 只有 node 支持的导出
+ CommonJs模块是运行时加载，ES6模块是编译时输出接口。
+  CommonJS 加载的是一个对象（即module.exports属性）。该对象只有在脚本运行完才会生成。而ES6模块不是对象，它的对外接口只是一种静态定义，在代码静态编译阶段就会生成
+  在传统编译语言的流程中，程序中的一段源代码在执行之前会经历三个步骤，统称为编译。”分词/词法分析“ -> ”解析/语法分析“ -> "代码生成
+  CommonJs模块输出的是一个值的拷贝，ES6模块输出的是值的引用

## Commonjs
+ CommonJS定义的模块分为: 模块标识(module)、模块定义(exports) 、模块引用(require)
+ module代表当前的模块，module变量是一个对象，module有一个exports属性（module.exports),是对外的接口，加载某个模块，其实是加载该模块的module.exports属性。
+ module.exports和exports的的关系如下图，都指向一块{}内存区域。
```
语法说明：
exports = module.exports = {};
```
### 语法使用代码
```
var x = 5;
var addX = function (value) {
  return value + x;
}
module.exports.x = x;
module.exports.addX = addX;

var example = require("./example.js");
console.log(example.x);
console.log(example.addX);

// module.exports.count = count; // module.exports = { count: 0}
// module.exports = count; // module.exports = 0
// exports.count = count; // // module.exports = { count: 0}
// exports.a = 30; { a: 30}
exports = count; // {}
```
### 案例代码：
```
//utils.js
let a = 100;
console.log(module.exports); //能打印出结果为：{}
console.log(exports); //能打印出结果为：{}
exports.a = 200; //这里辛苦劳作帮 module.exports 的内容给改成 {a : 200}
exports = '指向其他内存区'; //这里把exports的指向指走

//test.js
var a = require('./utils');
console.log(a) // 打印为 {a : 200}
```
> 如上代码可知： 其实require导出的内容是module.exports的指向的内存块内容，并不是exports的。 简而言之，区分他们之间的区别就是 exports 只是 module.exports的引用，辅助后者添加内容用的。
>
> exports只辅助module.exports操作内存中的数据，辛辛苦苦各种操作数据完，累得要死，结果到最后真正被require出去的内容还是module.exports的

> 为了避免糊涂，尽量都用 module.exports 导出，然后用require导入
### CommonJs特点：
+ 所有代码运行在模块作用域，不会污染全局作用域，比如++count,并不影响外部引用的count值
+ 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。
+ 模块的加载顺序，按照其在代码中出现的顺序。

## ES中的模块导出导入
### export 和 export default
+ export与export default均可用于导出常量、函数、文件、模块等
+ 在一个文件或模块中，export、import可以有多个，export default仅有一个
+ 通过export方式导出，在导入时要加{ }，export default则不需要
+ export能直接导出变量表达式，export default不行。
+ export default就是输出一个叫做default的变量或方法
+ export default a的含义是将变量a的值赋给变量default
### 使用代码：
```
'use strict'
//导出变量
export const a = '100';
//导出方法
export const dogSay = function(){
    console.log('wang wang');
}
//导出方法第二种
function catSay(){
   console.log('miao miao');
}
function catSay1(){
   console.log('miao miao1');
}
export { catSay， catSay1 };


// export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系,以下方式不符合
export 1
var m = 1;
export m;



//export default导出
const m = 100;
export default m;

//export default const m = 100;// 这里不能写这种格式。
```

### import
+ import命令输入的变量都是只读的
+ import是静态执行，所以不能使用表达式和变量
+ import命令具有提升效果
+ import语句是 Singleton 模式

```
1. import命令输入的变量都是只读的，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面，改写接口。
import {a} from'./xxx.js'
a = {}; // Syntax Error : 'a' is read-only;

2. 如果a是一个对象，改写a的属性是允许的。
import {a} from'./xxx.js'
a.foo = 'hello'; // 合法操作

3. import命令具有提升效果，会提升到整个模块的头部，首先执行。import命令是编译阶段执行的，在代码运行之前。
foo();
import { foo } from'my_module';

4. 如果多次重复执行同一句import语句，那么只会执行一次，而不会执行多次。
import { foo } from'my_module';
import { bar } from'my_module';
// 等同于
import { foo, bar } from'my_module';
// 虽然foo和bar在两个语句中加载，但是它们对应的是同一个my_module实例。也就是说，import语句是 Singleton 模式
```

