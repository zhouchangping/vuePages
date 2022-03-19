import Vue from "vue";
import features from "./features.vue";
import router from "./router";
import "@/assets/css/page.scss";
import "@/assets/css/reset.scss";
import Vuex from "vuex";
Vue.use(Vuex);
// import AFRAME from 'aframe'
// Vue.use(AFRAME)
new Vue({
  el: "#features",
  router,
  render: h => h(features)
});

