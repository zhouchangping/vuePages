## Performance
    + navigation: 对象提供了在指定的时间段里发生的操作相关信息，包括页面是加载还是刷新、发生了多少次重定向
    + memory: 这个属性提供了一个可以获取到基本内存使用情况的对象
    + timeOrigin : 返回性能测量开始时的时间的高精度时间戳。
    + timing: 对象包含延迟相关的性能信息。

    + Performance.clearMarks() 将给定的 mark 从浏览器的性能输入缓冲区中移除。
    + Performance.clearMeasures() 将给定的 measure 从浏览器的性能输入缓冲区中移除。
    + Performance.clearResourceTimings() 从浏览器的性能数据缓冲区中移除所有 entryType 是 "resource" 的  performance entries
    + Performance.getEntries() 基于给定的 filter 返回一个 PerformanceEntry 对象的列表。
    + Performance.getEntriesByName() 基于给定的 name 和 entry type 返回一个 PerformanceEntry 对象的列表。
    + Performance.getEntriesByType() 基于给定的 entry type 返回一个 PerformanceEntry 对象的列表
    + Performance.mark() 根据给出 name 值，在浏览器的性能输入缓冲区中创建一个相关的timestamp
    + Performance.measure() 在浏览器的指定 start mark 和 end mark 间的性能输入缓冲区中创建一个指定的 timestamp
    + Performance.now() 返回一个表示从性能测量时刻开始经过的毫秒数 DOMHighResTimeStamp
    + Performance.toJSON() 其是一个 JSON 格式转化器，返回 Performance 对象的 JSON 对象
    + Performance.setResourceTimingBufferSize() 将浏览器的资源 timing 缓冲区的大小设置为 "resource" type performance entry 对象的指定数量
  + Performance Timeline Level 2标准: PerformanceObserver
    + 扩展了Performance接口的基本定义
    + 在Web Workers中暴露了PerformanceEntry
    + 增加了PerformanceObserver的支持

## 实例代码
```
// 创建一些标记。
performance.mark("squirrel");
performance.mark("squirrel");
performance.mark("monkey");
performance.mark("monkey");
performance.mark("dog");
performance.mark("dog");

// 获取所有的 PerformanceMark 条目。
const allEntries = performance.getEntriesByType("mark");
console.log(allEntries.length);
// 6

// 获取所有的 "monkey" PerformanceMark 条目。
const monkeyEntries = performance.getEntriesByName("monkey");
console.log(monkeyEntries.length);
// 2

// 删除所有标记。
performance.clearMarks();
```

```
// 以一个标志开始。
performance.mark("mySetTimeout-start");

// 等待一些时间。
setTimeout(function() {
  // 标志时间的结束。
  performance.mark("mySetTimeout-end");

  // 测量两个不同的标志。
  performance.measure(
    "mySetTimeout",
    "mySetTimeout-start",
    "mySetTimeout-end"
  );

  // 获取所有的测量输出。
  // 在这个例子中只有一个。
  var measures = performance.getEntriesByName("mySetTimeout");
  var measure = measures[0];
  console.log("setTimeout milliseconds:", measure.duration)

  // 清除存储的标志位
  performance.clearMarks();
  performance.clearMeasures();
}, 1000);
```

```
//entryType,name,initiatorType  Examples
var p = performance.getEntries();

var ptyps = p.map((ele) => {return(ele.entryType)});
//Array(94) [ "navigation", "resource", "resource", "resource", "resource", "resource", "resource", "resource", "resource", "resource", … ]

var pnms = p.map((ele) => {return(ele.name)});
//Array(94) [ "document", "https://csdnimg.cn/public/static/css/avatar.css", "https://csdnimg.cn/public/common/libs/jquery/jquery-1.9.1.min.js", "https://csdnimg.cn/rabbit/exposure-click/main-1.0.5.js", "https://csdnimg.cn/release/phoenix/production/main-e96db8abdf.js", "https://csdnimg.cn/pubfooter/js/tracking-1.0.2.js", "https://csdnimg.cn/public/common/toolbar/js/content_toolbar.js", "https://csdnimg.cn/release/phoenix/production/markdown_views-ea0013b516.css", "https://csdnimg.cn/search/baidu_search-1.1.2.js?v=201802071056&autorun=true&install=true&keyword=%E5%B0%8F%E7%A8%8B%E5%BA%8F%E6%89%A7%E8%A1%8C%E9%A1%BA%E5%BA%8F", "https://csdnimg.cn/release/phoenix/production/main-f869aa95a4.css", … ]

var pityps = p.map((ele) => {return(ele.initiatorType)});
//Array(94) [ "navigation", "link", "script", "script", "script", "script", "script", "link", "script", "link", … ]
```

## PerformanceObserver 用于监测性能度量事件，在浏览器的性能时间轴记录下一个新的 performance entries  的时候将会被通知
+ PerformanceObserver.observe(): 指定监测的 entry types 的集合;当 performance entry 被记录并且是指定的 entryTypes 之一的时候，性能观察者对象的回调函数会被调用
+ PerformanceObserver.disconnect()
```
var observer = new PerformanceObserver(function(list) {
    var perfEntries = list.getEntries();
    for (var i = 0; i < perfEntries.length; i++) {
        // Process long task notifications:
        // report back for analytics and monitoring
        // ...
    }
});
// register observer for long task notifications
observer.observe({entryTypes: ["longtask"]});
// Long script execution after this will result in queueing
// and receiving "longtask" entries in the observer.
```

## LCP FID CLS
+ FCP: First Contentful Paint，只有首次绘制文本、图片（包含背景图）、非白色的canvas或SVG时才被算作FCP。
+ FP是当浏览器开始绘制内容到屏幕上的时候，只要在视觉上开始发生变化，无论是什么内容触发的视觉变化，在这一刻，这个时间点，叫做FP
+ LCP: largest contentful paint(页面首次开始加载2.5秒内发生)表示可视区“内容”最大的可见元素开始出现在屏幕上的时间点。
+ FID: First input Delay(衡量可交互性，页面FID应该小于100毫秒)
+ CLS: cumulative layout shift,应小于0.1
+ FMP: First meaningful paint；FMP（全称“First Meaningful Paint”，翻译为“首次有效绘制”） 表示页面的“主要内容”开始出现在屏幕上的时间点。它是我们测量用户加载体验的主要指标
+ SI: speed Index (lightouse)
+ TTFP: 首字节相应的时间，从请求到响应
+ cls：  cumulative layout shift: 会测量在页面的整个生命周期中发生的每个意外的样式移动所单独布局更改得分的总和
  + core web vitals
  +  npm web-vitals
  +  谷歌web-vitals-extension
+ tti: 
+ Start Render，顾名思义指的是浏览器开始渲染的时间，从用户角度出发则可以定义为用户在页面上看到的第一个内容的时间。
  + Time To Start Render = TTFB + TTDD + TTHE
  + TTFB(Time To First Byte)：发起请求到服务器返回数据的时间
  + TTDD(Time To Document Download)：从服务器加载HTML文档的时间
  + TTHE(Time To Head End)：HTML文档头部解析完成所需要的时间
+ DOM Ready，指的是页面解析完成的时间，在高级浏览器里有对应的DOM事件 - DOMContentLoaded
  + DOMContentLoaded事件触发时是所有DOM节点可以进行操作的时候，比如添加事件、增删改节点等，因此用Javascript实现的一些交互功能往往会在DOMContentLoaded事件中去初始化，也只有在DOMContentLoaded事件触发后这项功能才可用
  + Time To Dom Ready = TTSR + TTDC + TTST
  +  Start Render指标直接决定着用户对页面速度的体验，与此不同，DOM Ready指标并不直接影响感官体验，往往影响的是交互功能何时可用
+ Page Load时间指的就是window.onload事件触发的时间。与DOM Ready时间相比，Page Load的时间往往要更靠后一些，因为Page Load不仅仅是HTML文档解析完毕还包括了所有资源加载所需要的时间，例如图片资源的加载、iframe的加载等
+ TTI(Time To Interact)指的是页面可交互的时间。页面中的交互包括很多方面，例如点击一个链接、点击一个搜索按钮都属于页面交互的范畴，但是对于衡量性能的TTI则主要指核心功能可以交互的时间。
  + 通过TTI的定义可以知道，TTI的长短对于用户体验的影响是十分重要的，它影响着用户对核心功能的使用。