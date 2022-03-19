<template>
  <div id="ui">
    <div id="mobile-bar">
      <a class="menu-button"></a>
      <a class="logo" href="/"></a>
    </div>
    <header-nav :isActiveIndex="3"></header-nav>
    <div id="main" class="fix-sidebar">
      <div class="sidebar">
        <div class="sidebar-inner">
          <div class="list">
            <ul class="menu-root"></ul>
          </div>
        </div>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderNav from "@/components/header.vue"
export default {
  name: 'Ui',
  props: {

  },
  data () {
    return {

    }
  },
  components () {
    HeaderNav
  },
  // 在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用
  beforeCreate () {

  },
  // 然而，挂载阶段还没开始，$el property 目前尚不可用。
  created () {

  },
  // 在挂载开始之前被调用：相关的 render 函数首次被调用。该钩子在服务器端渲染期间不被调用。
  beforeMount () {

  },
  // 实例被挂载后调用，这时 el 被新创建的 vm.$el 替换了
  mounted () {

  },
  // 数据更新时调用，发生在虚拟 DOM 打补丁之前
  beforeUpdate () {

  },
  // 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
  updated () {

  },
  // 被 keep-alive 缓存的组件激活时调用。
  activated () {

  },
  // 被 keep-alive 缓存的组件停用时调用。
  deactivated () {

  },
  // 实例销毁之前调用。在这一步，实例仍然完全可用。
  beforeDestroy () {

  },
  // 实例销毁后调用。该钩子被调用后，对应 Vue 实例的所有指令都被解绑，所有的事件监听器被移除，所有的子实例也都被销毁
  destroyed () {

  },
  errorCaptured () {

  },
  methods: {

  },
  watch: {
    // 该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深
    a: {
      handler: function (val, oldVal) { /* ... */ },
      deep: true
    },
  },
  computed: {
    // 读取和设置
    aPlus: {
      get: function () {
        return this.a + 1
      },
      set: function (v) {
        this.a = v - 1
      }
    }
  }

}
</script >