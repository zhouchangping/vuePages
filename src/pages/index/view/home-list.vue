<template>
  <div id="home-list">123</div>
</template>
<script>
export default {
  name: 'Ui',
  props: {

  },
  data () {
    return {

    }
  },
  components () {
  },
  // 在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用
  beforeCreate () {
    console.log("homeList beforeCreate")
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
  },
  computed: {
  }

}
</script >