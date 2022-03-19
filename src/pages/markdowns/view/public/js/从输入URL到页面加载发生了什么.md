# 从输入URL到页面加载发生了什么

## 过程
+ URL解析：地址栏网址缓存
+ 检查HSTS 预加载列表
+ DNS查询： DNS 缓存 一个网址到IP地址的转换，这个过程就是DNS解析
+ ARP（地址解析协议）缓存
+ TCP 连接： TCP 发送缓冲区 & 接收缓冲区
+ 处理请求： HTTP请求缓存（ CDN 节点缓存、代理服务器缓存、浏览器缓存、后端动态计算结果缓存等 ）
+ 接受响应,渲染页面

## URL解析
### 地址栏网址缓存
+ 根据用户的输入url后遇到的第一个缓存环节就是地址栏网址缓存，我们只是输入了几个字母，浏览器就自动补全了该网址。当我们使用这个自动补全的网址时，你会发现请求的相关的静态资源也是从缓存中取得的
> 不论什么时候，我们获取的主页面资源 timeline, 都应该是重新请求服务器而获得的，不可以使用本地浏览器的缓存。至于为什么？你看到静态资源文件名的 hash 值你就应该清楚了
+ 转换非 ASCII 的 Unicode 字符
> 浏览器检查输入是否含有不是 a-z，A-Z，0-9，- 或者 . 的字符；如果有的话，浏览器会对主机名部分使用 Punycode 编码

### HSTS预加载列表
> HSTS:HTTP严格传输安全(HTTP Strict Transport Security ）国际互联网工程组织 IETE 正在推行一种新的Web安全协议，作用是强制客户端（如浏览器）使用 HTTPS 与服务器创建连接。
+ 采用HSTS后：[HSTS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/HTTP_Strict_Transport_Security) 支持这个协议的浏览器，在输入URL后会检查自带的HSTS预加载列表（这个列表里包含了那些请求浏览器只使用HTTPS进行连接的域名），若网站在这个列表里，浏览器会使用HTTPS协议并且返回码为 307。而不支持HSTS的浏览器访问我们的网站，则不会产生跳转，从而提高了兼容性。
+ 如掘金输入 http://juejin.im/timeline 会跳转到 https://juejin.im/timeline:

### 其他操作
+ 浏览器还会进行一些额外的操作，比如安全检查、访问限制（之前国产浏览器限制 996.icu）

## DNS解析过程（输入 juejin.im 按下回车后，就开始对 juejin.im 进行域名解析）
> DNS解析的过程就是寻找哪台机器上有你需要资源的过程,也是一个获取目标域名ip的过程。基于域名到ip的查找过程太耗时间，步骤也多。所以需要对dns做优化。DNS存在着多级缓存，从离浏览器的距离排序的话，有以下几种: 浏览器缓存，系统缓存，路由器缓存，IPS服务器缓存，根域名服务器缓存，顶级域名服务器缓存，主域名服务器缓存 浏览器搜索自己的 DNS 缓存（浏览器维护一张域名与 IP 地址的对应表）；如果没有命中，进入下一步；搜索操作系统中的 DNS 缓存；如果没有命中，进入下一步；搜索操作系统的 hosts 文件（ Windows 环境下，维护一张域名与 IP 地址的对应表）；如果没有命中，进入下一步

### 浏览器的DNS缓存
+ 在你的chrome浏览器中输入:chrome://dns/，你可以看到chrome浏览器的DNS缓存。
+ 系统缓存主要存在/etc/hosts(Linux系统)中:
+ 虽然 DNS 缓存可以提高获取 DNS 的速度，但缓存时间过长也会影响 DNS 在 IP 变更时不能及时解析到最新的IP；所以浏览器dns缓存不会太长，一分钟左右左右

### 操作系统DNS缓存
+ 操作系统将域名发送至 LDNS （本地区域名服务器），LDNS 查询自己的 DNS 缓存（一般命中率在 80% 左右），查找成功则返回结果，失败则发起一个迭代 DNS 解析请求：
+ LDNS向 Root Name Server（根域名服务器，如com、net、im 等的顶级域名服务器的地址）发起请求，此处，Root Name Server 返回 im 域的顶级域名服务器的地址；
+ LDNS 向 im 域的顶级域名服务器发起请求，返回 juejin.im 域名服务器地址；
+ LDNS 向 juejin.im 域名服务器发起请求，得到 juejin.im 的 IP 地址；
+ LDNS 将得到的 IP 地址返回给操作系统，同时自己也将 IP 地址缓存起来；操作系统将 IP 地址返回给浏览器，同时自己也将 IP 地址缓存起来。

### DNS Prefetch
> 默认情况下浏览器会对页面中和当前域名（正在浏览网页的域名）不在同一个域的域名进行预获取，并且缓存结果，这就是隐式的 DNS Prefetch；在前端优化中与 DNS 有关的有两点
+ 减少 DNS 的请求次数
+ 进行 DNS 预获取
+ DNS Prefetch 应该尽量的放在网页的前面，推荐放在 <meta charset="UTF-8"> 后面。具体使用方法如下：
  ```
  <meta http-equiv="x-dns-prefetch-control" content="on">
  <link rel="dns-prefetch" href="//www.img.com">
  <link rel="dns-prefetch" href="//www.api.com">
  <link rel="dns-prefetch" href="//www.test.com">
  ```
  如果需要禁止隐式的 DNS Prefetch，可以使用以下的标签：
  ```
  <meta http-equiv="x-dns-prefetch-control" content="off">
  ```

### DNS负载均衡
> 大家耳熟能详的CDN(Content Delivery Network)就是利用DNS的重定向技术，DNS服务器会返回一个跟用户最接近的点的IP地址给用户，CDN节点的服务器负责响应用户的请求，提供所需的内容。

### ARP（地址解析协议）缓存
> ARP 是一种用以解释地址的协议，根据通信方的 IP 地址就可以反查出对应方的 MAC 地址。
> ARP 缓存是个用来储存 IP 地址和 MAC 地址的缓冲区，其本质就是一个 IP 地址与 MAC 地址的对应表，表中每一个条目分别记录了其他主机的 IP 地址和对应的 MAC 地址。
> 当地址解析协议被询问一个已知 IP 地址节点的 MAC 地址时，先在 AR 缓存中查看，若存在，就直接返回与之对应的MAC地址；若不存在，才发送 ARP 请求查询

## TCP连接
HTTP协议是使用TCP作为其传输层协议的;TCP创建过程和链接折除过程是由TCP/IP协议栈自动创建的
### TCP的三次握手四次挥手
+ TCP报文格式
  + 1）序号：Seq序号，占32位，用来标识从TCP源端向目的端发送的字节流，发起方发送数据时对此进行标记。
  + 2）确认序号：Ack序号，占32位，只有ACK标志位为1时，确认序号字段才有效，Ack=Seq+1。
  + 3）标志位：共6个，即URG、ACK、PSH、RST、SYN、FIN等，具体含义如下：（A）URG：紧急指针（urgent pointer）有效。（B）ACK：确认序号有效。（C）PSH：接收方应该尽快将这个报文交给应用层。（D）RST：重置连接。（E）SYN：发起一个新连接。（F）FIN：释放一个连接。
+ TCP三次握手
  + 建立一个TCP连接时，需要客户端和服务器总共发送3个包。三次握手的目的是连接服务器指定端口，建立TCP连接,并同步连接双方的序列号和确认号并交换
+ TCP 四次挥手:
  + TCP的连接的拆除需要发送四个包，因此称为四次挥手(four-way handshake)。客户端或服务器均可主动发起挥手动作，在socket编程中，任何一方执行close()操作即可产生挥手操作

## HTTP请求
> 发送HTTP请求的过程就是构建HTTP请求报文并通过TCP协议中发送到服务器指定端口(HTTP协议80/8080, HTTPS协议443)。HTTP请求报文是由三部分组成: 请求行, 请求报头和请求正文。
+ HTTPS过程: HTTPS在传输数据之前需要客户端与服务器进行一个握手(TLS/SSL握手)，在握手过程中将确立双方加密传输数据的密码信息,TLS/SSL使用了非对称加密，对称加密以及hash等
+ HTTP 请求缓存（ CDN 节点缓存、代理服务器缓存、浏览器缓存、后端动态计算结果缓存等 ）
  + 强缓存 ( Cache-Control 和 Expires )强缓存主要是采用响应头中的 Cache-Control 和 Expires 两个字段进行控制的。可用在请求头和响应头
    + Cache-Control 的优先级会更高一点
    + 请求头：no-cache no-store
    + 响应头：no-cache no-store public
  + 协商缓存 ( Last-Modified 和 Etag )
    + 当客户端再次请求该资源的时候，会在其请求头上附带上 If-Modified-Since 字段（值就是第一次获取请求资源时响应头中返回的 Last-Modified 值）
    + 当客户端再次请求该资源的时候，会在其请求头上附带上 If-None-Match 字段（值就是第一次获取请求资源时响应头中返回的 Etag 值）
+ 状态码
  + 1xx：指示信息–表示请求已接收，继续处理。
  + 2xx：成功–表示请求已被成功接收、理解、接受。
  + 3xx：重定向–要完成请求必须进行更进一步的操作。
  + 4xx：客户端错误–请求有语法错误或请求无法实现。
  + 5xx：服务器端错误–服务器未能实现合法的请求。
  + 平时遇到比较常见的状态码有:200, 204, 301（永久重定向）, 302(临时重定向), 304(缓存), 400, 401, 403, 404, 422, 502(网关)

## 浏览器解析渲染页面
+ DOM Tree：浏览器将HTML解析成树形的数据结构。(https://segmentfault.com/a/1190000014520786)
+ CSS Rule Tree：浏览器将CSS解析成树形的数据结构。
+ Render Tree: DOM和CSSOM合并后生成Render Tree。
+ layout(布局): 有了Render Tree，浏览器已经能知道网页中有哪些节点、各个节点的CSS定义以及他们的从属关系，从而去计算出每个节点在屏幕中的位置。
+ painting(绘制): 按照算出来的规则，通过显卡，把内容画到屏幕上。
+ Composite(渲染层合并): 对页面中 DOM 元素的绘制是在多个层上进行的。在每个层上完成绘制过程之后，浏览器会将所有层按照合理的顺序合并成一个图层，然后显示在屏幕上。对于有位置重叠的元素的页面，这个过程尤其重要，因为一旦图层的合并顺序出错，将会导致元素显示异常
  + javascript -style- layout- paint- composite
  + javascript -style- paint- composite
  + javascript -style- composite
  + RenderObject变成了LayoutObject，RenderLayer变成了PaintLayer渲染层）
    + RenderObjects 保持了树结构，一个 RenderObjects 知道如何绘制一个 node 的内容， 他通过向一个绘图上下文（GraphicsContext）发出必要的绘制调用来绘制 nodes。
    + DOM 树中得每个 Node 节点都有一个对应的 LayoutObject 。LayoutObject 知道如何在屏幕上 paint Node 的内容。
  + PaintLayer（渲染层）->GraphicsLayers(合成层)
    + 某些特殊的渲染层会被认为是合成层（Compositing Layers），合成层拥有单独的 GraphicsLayer，而其他不是合成层的渲染层，则和其第一个拥有 GraphicsLayer 父层公用一个
    + 每个 GraphicsLayer 都有一个 GraphicsContext，GraphicsContext 会负责输出该层的位图，位图是存储在共享内存中，作为纹理上传到 GPU 中，最后由 GPU 将多个位图进行合成，然后 draw 到屏幕上，此时，我们的页面也就展现到了屏幕上
    + 渲染层提升为合成层有一个先决条件，该渲染层必须是 SelfPaintingLayer
      + 硬件加速的 iframe 元素（比如 iframe 嵌入的页面中有合成层）
      + 3D 或者 硬件加速的 2D Canvas 元素
      + 覆盖在 video 元素上的视频控制栏
      + video 元素
      + 有 3D transform
      + backface-visibility 为 hidden
      + 对 opacity、transform、fliter、backdropfilter 应用了 animation 或者 transition
+ reflow(回流):当浏览器发现某个部分发生了点变化影响了布局，需要倒回去重新渲染，内行称这个回退的过程叫reflow
  ```
  display:none
  添加或者删除可见的DOM元素；
  元素位置改变；
  元素尺寸改变——边距、填充、边框、宽度和高度
  内容改变——比如文本改变或者图片大小改变而引起的计算值宽度和高度改变；
  页面渲染初始化；
  浏览器窗口尺寸改变——resize事件发生时
  offsetTop, offsetLeft, offsetWidth, offsetHeight
  scrollTop/Left/Width/Height
  clientTop/Left/Width/Height
  width,height
  请求了getComputedStyle(), 或者 IE的 currentStyle
  添加css样式而不是利用js控制样式（我就是想到这种办法解决回流问题的）
  尽量将需要改变DOM的操作一次完成
  直接改变className，如果动态改变样式，则使用cssText（考虑没有优化的浏览器）
  不要经常访问会引起浏览器flush队列的属性，如果你确实要访问，利用缓存
  让元素脱离动画流，减少回流的Render Tree的规模
  将需要多次重排的元素，position属性设为absolute或fixed，这样此元素就脱离了文档流，它的变化不会影响到其他元素。例如有动画效果的元素就最好设置为绝对定位；
  尽量不要使用表格布局，如果没有定宽表格一列的宽度由最宽的一列决定，那么很可能在最后一行的宽度超出之前的列宽，引起整体回流造成table可能需要多次计算才能确定好其在渲染树中节点的属性，通常要花3倍于同等元素的时间。
  ```
+ repaint（重绘）：改变某个元素的背景色、文字颜色、边框颜色等等不影响它周围或内部布局的属性时，屏幕的一部分要重画，但是元素的几何尺寸没有变
  + visibility:hidden 只会触发 repaint，因为没有发现位置变化

## 参考

- [1] [无线性能优化：Composite] https://fed.taobao.org/blog/taofed/do71ct/performance-composite/
- [2] [渲染器/核心/绘画]https://chromium.googlesource.com/chromium/src/+/master/third_party/blink/renderer/core/paint/README.md
- [3] [Chrome中的GPU加速合成]http://www.chromium.org/developers/design-documents/gpu-accelerated-compositing-in-chrome?spm=taofed.bloginfo.blog.1.19585ac8R41jpV

