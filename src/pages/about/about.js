import Vue from "vue";
import about from "./about.vue";
import "@/assets/css/page.scss";
import "@/assets/css/reset.scss";
import Vuex from "vuex";
Vue.use(Vuex);
console.log('about')
new Vue({
  el: "#about",
  render: h => h(about)
});