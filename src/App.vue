<template>
  <div id="app">
    <test></test>
    <p>
      <!-- 使用 router-link 组件来导航. -->
      <!-- 通过传入 `to` 属性指定链接. -->
      <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
      <router-link to="/foo">Go to Foo</router-link>
      <router-link to="/bar">Go to Bar</router-link>
      <!-- <img :src="imgUrl" alt="图片加载中"> -->
      <img v-lazy="imgUrl" class="page-user-img" alt="图片缺失">
    </p>
     <router-view></router-view>
  </div>
</template>

<script>

import test from './components/test.vue'
export default {
  name: 'app',
  data() {
    return {
      imgUrl: require("@/assets/images/P_00.jpg")
    }
  },
  components: {
    test: test
  },
  created() {
    console.log('app c');
    console.log(this.imgUrl)
  },
  mounted() {
    let self = this;
    setTimeout(()=> {
      // self.imgUrl = ;
    }, 2000)
    console.log('app m');
    // fetch('http://localhost:3000')
    // .then(function(response) {
    //   console.log(response.body)
    //   return response;
    // })
    // .then(function(myJson) {
    //   console.log(myJson);
    // });
    // this.$ajax.get('/api/page/helloworld') // api 代表localhost:3000
    // .then(function (response) {
    //   // handle success
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   // handle error
    //   console.log(error);
    // })
    // .finally(function () {
    //   // always executed
    // });
  }
}
</script>
<style scoped src="./style.css"></style>
<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  transform: rotate(0deg);
}
</style>
