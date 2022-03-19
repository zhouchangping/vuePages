## javascript实现call
### call函数特点：
+ 作为函数的方法，Function.prototype.call
+ 有返回值;
+ 将this，当作context的属性； context.fn = this;
+ 使用参数;
+ this可能为null;
+ 删除添加到context上的属性fn;

使用示例：
```
var b = {
  value: 1;
}
// 无返回值情况
function a(name, age) {
  console.log(this.value);
  console.log(name);
  console.log(name);
}
// 有返回值情况
function a(name, age) {
    return {
        value: this.value,
        name: name,
        age: age
    }
}
var result = a.callMe(b, arg1, arg2);
```

### 实现
```
Function.prototype.callMe = function (context) { // 作为函数的方法，Function.prototype.call
  var context = context || window; // this可以为null，此时context为window
  var args = [];
  context.fn = this; // 将this，当作context的属性； context.fn = this;
  for (var i = 1; i < arguments.length; i++) { // 使用参数;
    args.push('arguments['+ i +']');
  }
  var result = eval('context.fn('+ args+')');
  delete context.fn; // 删除添加到context上的属性fn;
  return result; // 有返回值;
}
```
## javascript实现apply
apply的实现和call类似

### 实现
```
Function.prototype.applyMe = function (context, arr) {
  var context = context || window;
  context.fn = this;
  var result;
  if (!arr) {
    result = context.fn();
  } else {
    var args = [];
    for (var i = 0; i < arr.length; i++) {
      args.push('arr['+i+']');
    }
    result = eval('context.fn('+args+')');
  }
  delete context.fn;
  return result;
}
```

## javascript实现bind
### bind特点
+ 返回一个函数
+ 可以传入参数
+ 一个绑定函数也能使用new操作符创建对象
  > 一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。

使用示例：
```
var value = 2;

var foo = {
    value: 1
};

function bar(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}

bar.prototype.friend = 'kevin';

var bindFoo = bar.bind(foo, 'daisy');

var obj = new bindFoo('18');
// undefined
// daisy
// 18
console.log(obj.habit);
console.log(obj.friend);
// shopping
// kevin
```
### 实现
```
// 第一版： 满足返回一个函数和可以传入参数
Function.prototype.bindMe = function (context) {
  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);
  return function () {
    var bindArgs = Array.prototype.slice.call(arguments);
    self.apply(context, args.concat(bindArgs));
  }
}

// 第二版：实现构造函数效果
Function.prototype.bindMe = function (context) {
  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);
  var funcO = function () {}; // 直接将 fbound.prototype = this.prototype，我们直接修改 fbound.prototype 的时候，也会直接修改函数bar的 prototype
  var func = function () {
    var bindArgs = Array.prototype.slice.call(arguments);
    // 当作为构造函数时，this 指向实例，self 指向绑定函数，因为下面一句 `fbound.prototype = this.prototype;`，已经修改了 fbound.prototype 为 绑定函数的 prototype，此时结果为 true，当结果为 true 的时候，this 指向实例。this为self，也就是bar的实例
    // 当作为普通函数时，this 指向 window，self 指向绑定函数，此时结果为 false，当结果为 false 的时候，this 指向绑定的 context。
    self.apply(this instanceof self ? this : context, args.concat(bindArgs))
  }
  funcO.prototype = self.prototyep; // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承函数的原型中的值；从而使得this instanceof self成立；
  func.prototype = new funcO();
  return func;
}
```
## javascript实现new
### new特点
+ new 的结果是一个新对象obj
+ obj拥有构造函数里和原型链上的属性
+ 返回的值如果是一个对象，我们就返回这个对象，如果没有，我们该返回什么就返回什么

### 实现
```
function objectNewFactory() {
  var obj = new Object();
  Constructor = [].shift.call(arguments); // 获取第一个参数，即构造函数，修改数组，删除第一项
  obj.__proto__ = Constructor.prototype; // 使得obj获得构造函数原型上的方法
  var result = Constructor.apply(obj, arguments); // 使用 apply，改变构造函数 this 的指向到新建的对象，这样 obj 就可以访问到构造函数中的属性，并赋值
  return typeof result === 'object' ? result : obj; // 还需要判断返回的值是不是一个对象，如果是一个对象，我们就返回这个对象，如果没有，我们该返回什么就返回什么
}
```
