# vue-router
+ vue.use(vueRouter)
+ vue-router install  ->vue.mixin
+ vue.mixin
  + beforeCreate
  + $router
  + $route
+ VueRouter
+ 
## 路由注册：vue.use
```
Vue.use = function (plugin) {
  var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
  if (installedPlugins.indexOf(plugin) > -1) {
    return this
  }

  // additional parameters
  var args = toArray(arguments, 1);
  args.unshift(this);
  if (typeof plugin.install === 'function') {
    plugin.install.apply(plugin, args);
  } else if (typeof plugin === 'function') {
    plugin.apply(null, args);
  }
  installedPlugins.push(plugin);
  return this
};
```

## vue-router install方法
```
export let _Vue
export function install (Vue) {
  if (install.installed && _Vue === Vue) return
  install.installed = true // 为了确保 install 逻辑只执行一次

  _Vue = Vue

  const isDef = v => v !== undefined

  const registerInstance = (vm, callVal) => {
    let i = vm.$options._parentVnode
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal)
    }
  }

  Vue.mixin({ // Vue.mixin 去把 beforeCreate 和 destroyed 钩子函数注入到每一个组件中
    beforeCreate () {
      if (isDef(this.$options.router)) { // Vue根实例
        this._routerRoot = this // Vue或则VueComponent
        this._router = this.$options.router // vue-router实例，只有Vue根实例上有this.$options.router
        this._router.init(this) // 初始化vue-router实例
        Vue.util.defineReactive(this, '_route', this._router.history.current) // 用 defineReactive 方法把 this._route 变成响应式对象,后续使用，给history.listen方法执行。触发this._route,从而触发
      } else {
        // 对于子组件而言，由于组件是树状结构，在遍历组件树的过程中，它们在执行该钩子函数的时候 ，this // this._routerRoot 始终指向的离它最近的传入了 router 对象作为配置而实例化的父实例。
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this // 使用父实例
      }
      registerInstance(this, this)
    },
    destroyed () {
      registerInstance(this)
    }
  })

  Object.defineProperty(Vue.prototype, '$router', { // 组件实例上可以访问 this.$router 以及 this.$route
    get () { return this._routerRoot._router }
  })

  Object.defineProperty(Vue.prototype, '$route', { // parent.$route -> this._routerRoot._route->this._route->this._router.history.current
    get () { return this._routerRoot._route } // Vue.util.defineReactive(this, '_route', this._router.history.current) // 也就是当前的路由线路
  })

  // Vue.component 方法定义了全局的 <router-link> 和 <router-view> 2 个组件
  Vue.component('RouterView', View)
  Vue.component('RouterLink', Link)

  const strats = Vue.config.optionMergeStrategies
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created
}
```

## Vue.mixin
```
export function initMixin (Vue: GlobalAPI) { 
  // 要混入的对象通过 mergeOptions 合并到 Vue 的 options 中，由于每个组件的构造函数都会在 extend 阶段合并 Vue.options 到自身的 options 中，
  // 所以也就相当于每个组件都定义了 mixin 定义的选项
  Vue.mixin = function (mixin: Object) {
    this.options = mergeOptions(this.options, mixin)
    return this
  }
}
```

## VueRouter 对象: 在组件的初始化阶段，执行到 beforeCreate 钩子函数的时候会执行 router.init 方法，然后又会执行 history.transitionTo 方法做路由过渡，进而引出了 matcher 的概念
```
export default class VueRouter {
  static install: () => void;
  static version: string;

  app: any;
  apps: Array<any>;
  ready: boolean;
  readyCbs: Array<Function>;
  options: RouterOptions;
  mode: string;
  history: HashHistory | HTML5History | AbstractHistory;
  matcher: Matcher;
  fallback: boolean;
  beforeHooks: Array<?NavigationGuard>;
  resolveHooks: Array<?NavigationGuard>;
  afterHooks: Array<?AfterNavigationHook>;

  constructor (options: RouterOptions = {}) {
    this.app = null
    this.apps = [] // this.app 表示根 Vue 实例，this.apps 保存持有 $options.router 属性的 Vue 实例
    this.options = options // 路由配置
    this.beforeHooks = []
    this.resolveHooks = []
    this.afterHooks = []
    this.matcher = createMatcher(options.routes || [], this) // this.matcher 表示路由匹配器

    let mode = options.mode || 'hash'
    // this.fallback 表示在浏览器不支持 history.pushState 的情况下，根据传入的 fallback 配置参数，决定是否回退到hash模式
    this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false 
    if (this.fallback) {
      mode = 'hash'
    }
    if (!inBrowser) {
      mode = 'abstract'
    }
    this.mode = mode

    switch (mode) {
      case 'history':
        this.history = new HTML5History(this, options.base)
        break
      case 'hash':
        this.history = new HashHistory(this, options.base, this.fallback) // this.history 表示路由历史的具体的实现实例
        break
      case 'abstract':
        this.history = new AbstractHistory(this, options.base)
        break
      default:
        if (process.env.NODE_ENV !== 'production') {
          assert(false, `invalid mode: ${mode}`)
        }
    }
  }

  match (
    raw: RawLocation,
    current?: Route,
    redirectedFrom?: Location
  ): Route {
    return this.matcher.match(raw, current, redirectedFrom)
  }

  get currentRoute (): ?Route {
    return this.history && this.history.current
  }

  init (app: any) { 
    process.env.NODE_ENV !== 'production' && assert(
      install.installed,
      `not installed. Make sure to call \`Vue.use(VueRouter)\` ` +
      `before creating root instance.`
    )

    this.apps.push(app) // // this.app 表示根 Vue 实例，this.apps 保存持有 $options.router 属性的 Vue 实例

    if (this.app) {
      return
    }

    this.app = app

    const history = this.history

    if (history instanceof HTML5History) {
      history.transitionTo(history.getCurrentLocation())
    } else if (history instanceof HashHistory) {
      const setupHashListener = () => {
        history.setupListeners()
      }
      history.transitionTo( // 首次进入home页面，自动调用路由切换
        history.getCurrentLocation(), “/” “/bg"
        setupHashListener,
        setupHashListener
      )
    }

    history.listen(route => {
      this.apps.forEach((app) => {
        app._route = route // transitionTo->confirmTransition->updateRoute->history.listen->route-view render
      })
    })
  }

  beforeEach (fn: Function): Function {
    return registerHook(this.beforeHooks, fn)
  }

  beforeResolve (fn: Function): Function {
    return registerHook(this.resolveHooks, fn)
  }

  afterEach (fn: Function): Function {
    return registerHook(this.afterHooks, fn)
  }

  onReady (cb: Function, errorCb?: Function) {
    this.history.onReady(cb, errorCb)
  }

  onError (errorCb: Function) {
    this.history.onError(errorCb)
  }

  push (location: RawLocation, onComplete?: Function, onAbort?: Function) {
    this.history.push(location, onComplete, onAbort)
  }

  replace (location: RawLocation, onComplete?: Function, onAbort?: Function) {
    this.history.replace(location, onComplete, onAbort)
  }

  go (n: number) {
    this.history.go(n)
  }

  back () {
    this.go(-1)
  }

  forward () {
    this.go(1)
  }

  getMatchedComponents (to?: RawLocation | Route): Array<any> {
    const route: any = to
      ? to.matched
        ? to
        : this.resolve(to).route
      : this.currentRoute
    if (!route) {
      return []
    }
    return [].concat.apply([], route.matched.map(m => {
      return Object.keys(m.components).map(key => {
        return m.components[key]
      })
    }))
  }

  resolve (
    to: RawLocation,
    current?: Route,
    append?: boolean
  ): {
    location: Location,
    route: Route,
    href: string,
    normalizedTo: Location,
    resolved: Route
  } {
    const location = normalizeLocation(
      to,
      current || this.history.current,
      append,
      this
    )
    const route = this.match(location, current)
    const fullPath = route.redirectedFrom || route.fullPath
    const base = this.history.base
    const href = createHref(base, fullPath, this.mode)
    return {
      location,
      route,
      href,
      normalizedTo: location,
      resolved: route
    }
  }

  addRoutes (routes: Array<RouteConfig>) {
    this.matcher.addRoutes(routes)
    if (this.history.current !== START) {
      this.history.transitionTo(this.history.getCurrentLocation())
    }
  }
}
```

## 导航守卫：history.transitionTo 和match
```
// src/history/base.js
transitionTo (location: RawLocation, onComplete?: Function, onAbort?: Function) {
  // location: "/bg"
  var route = { // route示例
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: query,
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery),
    matched: record ? formatMatch(record) : []
  };
  const route = this.router.match(location, this.current) // this.router在new histroy传入， route将要取得路由
  this.confirmTransition(route, () => { // confirmTransition 方法去做真正的切换   // History.prototype.confirmTransition
    this.updateRoute(route)
    onComplete && onComplete(route)
    this.ensureURL()
    if (!this.ready) {
      this.ready = true
      this.readyCbs.forEach(cb => { cb(route) })
    }
  }, err => {
    if (onAbort) {
      onAbort(err)
    }
    if (err && !this.ready) {
      this.ready = true
      this.readyErrorCbs.forEach(cb => { cb(err) })
    }
  })
}
// src/create-matcher.js
match (
  raw: RawLocation,
  current?: Route,
  redirectedFrom?: Location
): Route {
  return this.matcher.match(raw, current, redirectedFrom)
}


// this.router.match() = return this.matcher.match(raw, current, redirectedFrom) 
// this.matcher = createMatcher(options.routes || [], this) = return {match: match(raw,currentRoute,redirectedFrom), addRoutes: addRoutes} // new Router的时候就定义了this.matcher,构建routes映射表
// this.matcher.match = match() = return _createRoute(null, location)->_createRoute-> createRoute =  return Object.freeze(route)，用于transtionTo跳转


function createMatcher ( // new Router的时候就定义了this.matcher,构建routes映
  routes,
  router
) {
  // createRouteMap 函数的目标是把用户的路由配置转换成一张路由映射表，
  // 它包含 3 个部分，pathList 存储所有的 path，pathMap 表示一个 path 到 RouteRecord 的映射关系，
  // 而 nameMap 表示 name 到 RouteRecord 的映射关系

  // pathList 是为了记录路由配置中的所有 path，而 pathMap 和 nameMap 都是为了通过 path 和 name 能快速查到对应的 RouteRecord
  // 我们配置的时候有时候会配置子路由，所以整个 RouteRecord 也就是一个树型结构。
  var ref = createRouteMap(routes); ->得到的就是 pathList、pathMap 和 nameMap
  // createRouteMap->
  var pathList = ref.pathList;
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes (routes) {
    createRouteMap(routes, pathList, pathMap, nameMap);
  }


  function match ( // 方法返回的是一个路径，它的作用是根据传入的 raw 和当前的路径 currentRoute 计算出一个新的路径并返回
    raw,
    currentRoute,
    redirectedFrom
  ) {
    var location = normalizeLocation(raw, currentRoute, false, router);
    var name = location.name;

    if (name) {
      var record = nameMap[name];
      if (process.env.NODE_ENV !== 'production') {
        warn(record, ("Route with name '" + name + "' does not exist"));
      }
      if (!record) { return _createRoute(null, location) }
      var paramNames = record.regex.keys
        .filter(function (key) { return !key.optional; })
        .map(function (key) { return key.name; });

      if (typeof location.params !== 'object') {
        location.params = {};
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }

      location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""));
      return _createRoute(record, location, redirectedFrom)
    } else if (location.path) {
      location.params = {};
      for (var i = 0; i < pathList.length; i++) {
        var path = pathList[i];
        var record$1 = pathMap[path];
        if (matchRoute(record$1.regex, location.path, location.params)) {
          return _createRoute(record$1, location, redirectedFrom)
        }
      }
    }
    // no match
    return _createRoute(null, location)
  }
  // match->_createRoute-> createRoute =  return Object.freeze(route)
  function createRoute ( // Vue-Router 中，所有的 Route 最终都会通过 createRoute 函数创建，并且它最后是不可以被外部修改的
    record,
    location,
    redirectedFrom,
    router
  ) {
  var stringifyQuery = router && router.options.stringifyQuery;

  var query = location.query || {};
  try {
    query = clone(query);
  } catch (e) { }

  var route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: query,
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery),
    matched: record ? formatMatch(record) : [] // 最终返回的就是 record 的数组，它记录了一条线路上的所有 record。matched 属性非常有用，它为之后渲染组件提供了依据
  };
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery);
  }
  return Object.freeze(route)
}


// createRouteMap
function createRouteMap (
  routes,
  oldPathList,
  oldPathMap,
  oldNameMap
) {
  // the path list is used to control path matching priority
  var pathList = oldPathList || [];
  // $flow-disable-line
  var pathMap = oldPathMap || Object.create(null);
  // $flow-disable-line
  var nameMap = oldNameMap || Object.create(null);

  routes.forEach(function (route) {
    addRouteRecord(pathList, pathMap, nameMap, route);
  });
  return {
    pathList: pathList,
    pathMap: pathMap,
    nameMap: nameMap
  }
}
```

## confirmTransition
> 因为 route.matched 是一个 RouteRecord 的数组，由于路径是由 current 变向 route，那么就遍历对比 2 边的 RouteRecord，找到一个不一样的位置 i，那么 next 中从 0 到 i 的 RouteRecord 是两边都一样，则为 updated 的部分；
> 从 i 到最后的 RouteRecord 是 next 独有的，为 activated 的部分；而 current 中从 i 到最后的 RouteRecord 则没有了，为 deactivated 的部分。
> 拿到 updated、activated、deactivated 3 个 ReouteRecord 数组后，接下来就是路径变换后的一个重要部分，执行一系列的钩子函数。

```
confirmTransition (route: Route, onComplete: Function, onAbort?: Function) { // 官方的说法叫导航守卫，实际上就是发生在路由路径切换的时候，执行的一系列钩子函数。
  const current = this.current
  const abort = err => {
    if (isError(err)) {
      if (this.errorCbs.length) {
        this.errorCbs.forEach(cb => { cb(err) })
      } else {
        warn(false, 'uncaught error during route navigation:')
        console.error(err)
      }
    }
    onAbort && onAbort(err)
  }
  if (
    isSameRoute(route, current) &&
    route.matched.length === current.matched.length
  ) {
    this.ensureURL()
    return abort()
  }

  const {
    updated,
    deactivated,
    activated
  } = resolveQueue(this.current.matched, route.matched) // current.matched 和 route.matched 执行了 resolveQueue 方法解析出 3 个队列：

  // 首先构造一个队列 queue，它实际上是一个数组；然后再定义一个迭代器函数 iterator；最后再执行 runQueue 方法来执行这个队列
  const queue: Array<?NavigationGuard> = [].concat(
    extractLeaveGuards(deactivated),
    this.router.beforeHooks,
    extractUpdateHooks(updated),
    activated.map(m => m.beforeEnter),
    resolveAsyncComponents(activated)
  )
  在失活的组件里调用离开守卫。
  调用全局的 beforeEach 守卫。
  在重用的组件里调用 beforeRouteUpdate 守卫
  在激活的路由配置里调用 beforeEnter。
  解析异步路由组件。??
  在被激活的组件里调用 beforeRouteEnter。
  调用全局的 beforeResolve 守卫。
  调用全局的 afterEach 钩子。

  导航被触发。
  在失活的组件里调用 beforeRouteLeave 守卫。
  调用全局的 beforeEach 守卫。
  在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
  在路由配置里调用 beforeEnter。
  解析异步路由组件。
  在被激活的组件里调用 beforeRouteEnter。
  调用全局的 beforeResolve 守卫 (2.5+)。
  导航被确认。
  调用全局的 afterEach 钩子。
  触发 DOM 更新。
  调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。

  this.pending = route
  const iterator = (hook: NavigationGuard, next) => { // 用来执行queen, hook: 勾子； next
    if (this.pending !== route) {
      return abort()
    }
    try {
      hook(route, current, (to: any) => {
        if (to === false || isError(to)) {
          this.ensureURL(true)
          abort(to)
        } else if (
          typeof to === 'string' ||
          (typeof to === 'object' && (
            typeof to.path === 'string' ||
            typeof to.name === 'string'
          ))
        ) {
          abort()
          if (typeof to === 'object' && to.replace) {
            this.replace(to)
          } else {
            this.push(to)
          }
        } else {
          next(to)
        }
      })
    } catch (e) {
      abort(e)
    }
  }

  runQueue(queue, iterator, () => { // 先执行queue，后面再执行后enterGuards的queue
    const postEnterCbs = []
    const isValid = () => this.current === route
    const enterGuards = extractEnterGuards(activated, postEnterCbs, isValid)
    const queue = enterGuards.concat(this.router.resolveHooks) // 钩子
    runQueue(queue, iterator, () => {
      if (this.pending !== route) {
        return abort()
      }
      this.pending = null
      onComplete(route)
      if (this.router.app) {
        this.router.app.$nextTick(() => {
          postEnterCbs.forEach(cb => { cb() })
        })
      }
    })
  })
}
// runQueue
function runQueue (queue, fn, cb) {
  var step = function (index) {
    if (index >= queue.length) { // cb()
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };
  step(0);
}

// extractEnterGuards
function extractEnterGuards (
  activated,
  cbs,
  isValid
) {
  return extractGuards(
    activated,
    'beforeRouteEnter',
    function (guard, _, match, key) {
      return bindEnterGuard(guard, match, key, cbs, isValid)
    }
  )
}
```

## url: router-link


## 组件：router-view