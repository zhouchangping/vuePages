import Vue from "vue";
import home from "./index.vue";
import router from "./router";
import "@/assets/css/page.scss";
import "@/assets/css/reset.scss";
import Vuex from "vuex";
Vue.use(Vuex);
import "@/assets/js/remHtml.js"; // reset rem全局文件
new Vue({
  el: "#home",
  router,
  render: h => h(home)
});

