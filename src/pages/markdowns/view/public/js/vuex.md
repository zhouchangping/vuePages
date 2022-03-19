## Vuex 初始化: Vue.use(Vuex);
```
import Vuex from 'vuex'
var Vuex = export default {
  Store,
  install,
  version: '__VERSION__',
  mapState,
  mapMutations,
  mapGetters,
  mapActions,
  createNamespacedHelpers
}

export function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      )
    }
    return
  }
  Vue = _Vue
  applyMixin(Vue)
}

// applyMixin
export default function (Vue) {
  const version = Number(Vue.version.split('.')[0])
  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit }) // 合并到组件的beforeCreate
  } else {
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */
  function vuexInit () {
    const options = this.$options
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store // 初始化this.$store
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store // 
    }
  }
}
```

## Store 实例化: 
+ ModuleCollection
  + new Module(rawModule, runtime)
+ installModule
  + makeLocalContext： 构造了一个本地上下文环境
+ resetStoreVM
```
export default new Vuex.Store({
  actions, // 函数形式，提交state到mutation,(context.commit('increment'))修改
  getters, // 函数形式,获取state
  state, // 对象形式
  mutations, // 函数形式，修改state
  strict: debug,
  // plugins: debug ? [createLogger()] : []
});

export class Store {
  constructor (options = {}) {
    // Auto install if it is not done yet and `window` has `Vue`.
    // To allow users to avoid auto-installation in some cases,
    // this code should be placed here. See #731
    if (!Vue && typeof window !== 'undefined' && window.Vue) {
      install(window.Vue)
    }
    // 初始化模块: 模块的设计就是一个树型结构，store 本身可以理解为一个 root module，它下面的 modules 就是子模块
    this._modules = new ModuleCollection(options)
    this._modulesNamespaceMap = Object.create(null)
    this._subscribers = []
    this._watcherVM = new Vue()

    // 安装模块： 它的目标就是对模块中的 state、getters、mutations、actions 做初始化工作
    installModule(this, state, [], this._modules.root)

    // initialize the store vm, which is responsible for the reactivity
    // (also registers _wrappedGetters as computed properties)
    resetStoreVM(this, state) // 初始化 store._vm

    // apply plugins
    plugins.forEach(plugin => plugin(this))
    if (Vue.config.devtools) {
      devtoolPlugin(this)
    }
  }
}  

// ModuleCollection
export default class ModuleCollection {
  constructor (rawRootModule) {
    // register root module (Vuex.Store options)
    this.register([], rawRootModule, false)
  }
  update (rawRootModule) {
    update([], this.root, rawRootModule)
  }

  register (path, rawModule, runtime = true) {
    if (process.env.NODE_ENV !== 'production') {
      assertRawModule(path, rawModule)
    }
    // Module 是用来描述单个模块的类
    const newModule = new Module(rawModule, runtime)
    if (path.length === 0) {
      this.root = newModule // 根模块
    } else {
      const parent = this.get(path.slice(0, -1))
      parent.addChild(path[path.length - 1], newModule)
    }

    // register nested modules
    if (rawModule.modules) {
      forEachValue(rawModule.modules, (rawChildModule, key) => { // 注册子模块
        this.register(path.concat(key), rawChildModule, runtime)
      })
    }
  }
  unregister (path) {
  }
}


// installModule：安装模块： 它的目标就是对模块中的 state、getters、mutations、actions 做初始化工作
function installModule (store, rootState, path, module, hot) {
  const isRoot = !path.length
  const namespace = store._modules.getNamespace(path)

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module // 缓存，便于获取
  }

  // set state
  if (!isRoot && !hot) {
    const parentState = getNestedState(rootState, path.slice(0, -1))
    const moduleName = path[path.length - 1]
    store._withCommit(() => {
      Vue.set(parentState, moduleName, module.state)
    })
  }
  const local = module.context = makeLocalContext(store, namespace, path) // 构造了一个本地上下文环境
  module.forEachMutation((mutation, key) => {
    const namespacedType = namespace + key
    registerMutation(store, namespacedType, mutation, local) // root store 上的 _mutations[types] 添加 wrappedMutationHandler 方
  })
  module.forEachAction((action, key) => {
    const type = action.root ? key : namespace + key
    const handler = action.handler || action
    registerAction(store, type, handler, local) // 实际上就是给 root store 上的 _actions[types] 添加 wrappedActionHandler 方法
  })
  module.forEachGetter((getter, key) => {
    const namespacedType = namespace + key
    registerGetter(store, namespacedType, getter, local) // 给 root store 上的 _wrappedGetters[key] 指定 wrappedGetter 方法
  })
  module.forEachChild((child, key) => {
    installModule(store, rootState, path.concat(key), child, hot)
  })
}

// resetStoreVM: 初始化 store._vm;resetStoreVM 的作用实际上是想建立 getters 和 state 的联系
function resetStoreVM (store, state, hot) {
  const oldVm = store._vm

  // bind store public getters
  store.getters = {}
  const wrappedGetters = store._wrappedGetters
  const computed = {}

  // function forEachValue (obj, fn) {
  //   Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
  // }

  // store._wrappedGetters[type] = function wrappedGetter (store) {
  //   return rawGetter( // rawGetter 就是用户定义的 getter 函数
  //     local.state, // local state
  //     local.getters, // local getters
  //     store.state, // root state
  //     store.getters // root getters
  //   )
  // };


  forEachValue(wrappedGetters, (fn, key) => { // fn == function wrappedGetter (store) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = () => fn(store) === rawGetter()
    Object.defineProperty(store.getters, key, { // store.getters[key]-> store._vm[key]->computed[key]
      get: () => store._vm[key],
      enumerable: true // for local getters
    })
  })

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  const silent = Vue.config.silent
  Vue.config.silent = true
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed
  })
  Vue.config.silent = silent

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store)
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(() => {
        oldVm._data.$$state = null
      })
    }
    Vue.nextTick(() => oldVm.$destroy())
  }
}
```

