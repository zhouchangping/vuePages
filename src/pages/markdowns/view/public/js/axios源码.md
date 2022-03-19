# axios源码分析
## 整体思路: 按代码流程，依次下层标题
+ axios构造函数： var axios = createInstance(defaults);
  + Axios构造函数： function Axios (){}
    + InterceptorManager构造函数：用于收集instance.interceptors.request和instance.interceptors.request内的中间件函数
    + dispatchRequest构造函数，用于执行请求
      + config.adapter(): 用于适配不同情况的请求，分http和xhr形式
        + xhr.js
        + http.js
```
// axios.js
function createInstance (defaultConfig) {
  var context = new Axios(defaultConfig);
  // 用context去执行Axios.prototype.request，返回待执行函数
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance,将Axios.prototype的方法，扩展到instance上
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);
  return instance;
}
// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// 用于自定义createInstance实例
axios.create = function create (instanceConfig) {
  // 合并default和自定义config，从而得到适配器adapter
  return createInstance(utils.merge(defaults, instanceConfig));
};
module.exports = axios;
```

## Axios.js代码逻辑: 
+ 初始化Axios,提供interceptors对象用于收集中间件函数，提供request方法
```
function Axios (instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}
Axios.prototype.request = function request (config) { // 开始执行请求
  ...
  ...
  // 合并自定义的config配置
  config = utils.merge(defaults, { method: 'get' }, this.defaults, config);
  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);
  // 任务编排：往chain数组头部收集interceptors.request上通过InterceptorManager.use方法添加的中间件函数
  this.interceptors.request.forEach(function unshiftRequestInterceptors (interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });
  // 任务编排： 往chain数组尾部收集interceptors.request上通过InterceptorManager.use方法添加的中间件函数
  this.interceptors.response.forEach(function pushResponseInterceptors (interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });
  // 任务调度：遍历数组，将请求参数合并后，传递给dispatchRequest执行请求
  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());  // 等待请求结果
  }
  // 返回响应结果给页面的调用.then
  return promise;
}
```

## InterceptorManager构造函数
+ 用于收集instance.interceptors.request和instance.interceptors.request内的中间件函数
```
function InterceptorManager () {
  // 用于收集请求和响应中间件函数
  this.handlers = [];
}
InterceptorManager.prototype.use = function use (fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};
```

## dispatchRequest构造器
```
module.exports = function dispatchRequest (config) {
  ...
  ...
  var adapter = config.adapter || defaults.adapter;
  // 通过适配器方法调用请求
  return adapter(config).then(function onAdapterResolution (response) {
    throwIfCancellationRequested(config);
    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );
    // console.log(response)
    return response;
  }, function onAdapterRejection (reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }
    return Promise.reject(reason);
  });
};
```

## adapter： 适配器
+ xhr.js: 适配浏览器
```
module.exports = function xhrAdapter (config) {
  return new Promise(function dispatchXhrRequest (resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;
    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;
    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);
    // Set the request timeout in MS
    request.timeout = config.timeout;
    // Listen for ready state
    request[loadEvent] = function handleLoad () {
      // 处理响应
      settle(resolve, reject, response);
    }
    // Handle low level network errors
    request.onerror = function handleError () {
    };
    // Handle timeout
    request.ontimeout = function handleTimeout () {
    };
    // Add xsrf header---使用双重cookies防御
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = require('./../helpers/cookies');
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;
      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }
    // Send the request
    request.send(requestData);
```
+ http.js

## 总结：
+ 支持promise API
+ 提供拦截请求和响应
+ 转换请求数据和响应数据
+ 同时支持浏览器和node环境
+ 取消请求和自动转换JSON数据
+ 客户端支持防御csrf攻击
+ axios对队列chain使用
+ 提供create()方法给使用者
+ 提供适配器处理不同场景，并支持自定义适配器。
  